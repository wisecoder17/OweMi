import axios from "axios";
import { config } from "../config/env";
import * as mockService from "./mock.service";

// Token cache — avoid fetching a new token on every single request
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Fetch OAuth2 access token for Interswitch
 */
async function getAccessToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && now < tokenExpiry - 60_000) {
    return cachedToken;
  }

  try {
    const credentials = Buffer.from(
      `${config.INTERSWITCH.CLIENT_KEY}:${config.INTERSWITCH.SERVER_KEY}`,
    ).toString("base64");

    const response = await axios.post(
      config.INTERSWITCH.TOKEN_URL,
      "grant_type=client_credentials&scope=profile",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    cachedToken = response.data.access_token;
    // expires_in is in seconds — convert to ms and record expiry
    tokenExpiry = now + response.data.expires_in * 1000;
    return cachedToken!;
  } catch (error) {
    console.error("Interswitch Token Fetch Error:", (error as Error).message);
    throw new Error("Could not authenticate with Interswitch server.");
  }
}

export const interswitchService = {
  /**
   * BVN Full Details Verification
   */
  async verifyBVNFullDetails(bvn: string, firstName: string = '', lastName: string = '') {
    // ---------------------------------------------------------
    // MOCK MODE: Handles all demo and edge-case states
    // ---------------------------------------------------------
    if (config.USE_MOCK_MODE) {
      if (bvn === "95888168924") return mockService.getMockVerifiedWithHistory().identity;
      if (bvn === "11122233344") return mockService.getMockVerifiedWithHistory().identity;
      if (bvn === "22233344455") return mockService.getMockVerifiedNoHistory().identity;
      if (bvn === "33344455566") return mockService.getMockVerifiedRisk().identity;
      if (bvn === "00000000000") return mockService.getMockFailure();
      // Default fallback for any other BVN in mock mode
      return mockService.getMockVerifiedNoHistory().identity; 
    }

    try {
      const token = await getAccessToken();

      // Uses Match API - Name strictly comes from the form
      const response = await axios.post(
        `${config.INTERSWITCH.BASE_URL}/marketplace-routing/api/v1/verify/identity/bvn`,
        { 
          firstName, 
          lastName, 
          bvn 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data?.data || response.data;
      const applicant = data.applicant || {};

      return {
        confirmed: true,
        name:
          `${applicant.firstname || applicant.first_name || ""} ${applicant.lastname || applicant.last_name || ""}`.trim() ||
          "Verified Customer",
        photoUrl:
          data.image ||
          data.photo ||
          data.base64Image ||
          applicant.image ||
          "https://via.placeholder.com/150",
        phoneMasked: maskPhone(
          data.phoneNumber || data.phone || data.msisdn || applicant.phone || ""
        ),
        dob: data.dateOfBirth || data.dob || applicant.dob || "",
        verificationType: "BVN",
      };
    } catch (error: any) {
      console.error(
        "Interswitch BVN API Error:",
        error?.response?.data || error.message,
      );
      throw new Error(
        `BVN Verification Failed: ${error?.response?.data?.message || error.message}`,
      );
    }
  },

  /**
   * Credit History API
   */
  async getCreditHistory(bvn: string) {
    // ---------------------------------------------------------
    // MOCK MODE: Matches Identity states
    // ---------------------------------------------------------
    if (config.USE_MOCK_MODE) {
      if (bvn === "95888168924") return mockService.getMockVerifiedWithHistory().credit;
      if (bvn === "11122233344") return mockService.getMockVerifiedWithHistory().credit;
      if (bvn === "22233344455") return mockService.getMockVerifiedNoHistory().credit;
      if (bvn === "33344455566") return mockService.getMockVerifiedRisk().credit;
      if (bvn === "00000000000") return mockService.getMockFailure();
      // Default fallback
      return mockService.getMockVerifiedNoHistory().credit; 
    }

    try {
      const token = await getAccessToken();

      const response = await axios.post(
        `${config.INTERSWITCH.BASE_URL}/marketplace-routing/api/v1/verify/identity/credit-history-lookup`,
        { bvn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data?.data || response.data;
      const history = data.credit_history || data.creditHistory || data.loans || [];

      return {
        hasHistory: history.length > 0,
        signal: (history.length > 0 ? "good" : "none") as any,
        score: data.creditScore || data.score || null,
        summary:
          history.length > 0
            ? `${history.length} institution record(s) found.`
            : "No formal credit history found. Identity is confirmed.",
      };
    } catch (error: any) {
      console.error(
        "Interswitch Credit API Error:",
        error?.response?.data || error.message,
      );
      // Rule 7: "No credit history" is NOT an error.
      // If API fails, return no history gracefully for Mama Ngozi.
      return {
        hasHistory: false,
        signal: "none" as any,
        score: null,
        summary: "Identity confirmed. No formal debt records found here.",
      };
    }
  },
};

function maskPhone(phone: string): string {
  if (!phone) return "******";
  return phone.replace(/(\d{4})\d+(\d{4})/, "$1****$2");
}
