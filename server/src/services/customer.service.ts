import Customer from '../models/Customer';
import { config } from '../config/env';
import { interswitchService } from './interswitch.service';
import * as mockService from './mock.service';

/**
 * Customer Service orchestrates identity verification and record management.
 */

export const customerService = {
  /**
   * Verify Customer by BVN
   */
  async verifyCustomer(traderId: any, input: { type: string; value: string }) {
    try {
      let result;

      if (config.USE_MOCK_MODE) {
        // Deterministic mock scenarios based on input
        if (input.value === '11122233344') {
          result = mockService.getMockVerifiedWithHistory();
        } else if (input.value === '22233344455') {
          result = mockService.getMockVerifiedNoHistory();
        } else if (input.value === '00000000000') {
          return mockService.getMockFailure();
        } else {
          // Default to No History if any other BVN is used in mock mode
           result = mockService.getMockVerifiedNoHistory();
        }
      } else {
        // REAL API CALLS
        // Implementation notes from Phase 6:
        // 1. Verify BVN
        // 2. If success, try Credit History
        // 3. Normalize responses to the product shape { identity, credit, message }
        
        const bvnData = await interswitchService.verifyBVNFullDetails(input.value);
        const creditData = await interswitchService.getCreditHistory(input.value);

        // Map real API results to simplified internal OweMi shape...
        // For Sandbox demo:
        result = {
          identity: {
            confirmed: true,
            name: `${bvnData.FirstName || 'Sample'} ${bvnData.LastName || 'User'}`,
            photoUrl: bvnData.Image || 'https://via.placeholder.com/150',
            phoneMasked: bvnData.PhoneNumber || '******6789',
            dob: bvnData.DOB || '1990-01-01',
            verificationType: "BVN"
          },
          credit: {
            hasHistory: creditData?.Status === 'Success',
            signal: (creditData?.Payload?.length > 0 ? "good" : "none") as any,
            score: creditData?.Score || null,
            summary: creditData?.Summary || (creditData?.Payload?.length > 0 ? "Loans found" : "No formal credit history.")
          },
          message: "Identity confirmed"
        };
      }

      // Save/Update Customer in DB
      let customer = await Customer.findOne({ bvn: input.value, traderId });

      if (!customer) {
        customer = new Customer({
          traderId,
          bvn: input.value,
          name: result.identity.name,
          photoUrl: result.identity.photoUrl,
          phone: result.identity.phoneMasked,
          dob: new Date(result.identity.dob),
          verificationType: "BVN",
          identityConfirmed: result.identity.confirmed,
          creditStatus: result.credit as any
        });
      } else {
        // Update existing customer state if needed
        customer.creditStatus = result.credit as any;
        customer.identityConfirmed = result.identity.confirmed;
      }

      await customer.save();

      return {
        ...result,
        customerId: customer._id
      };
    } catch (error) {
      console.error('Customer Verification Error:', (error as Error).message);
      throw error;
    }
  }
};
