export interface MockResponse {
  identity: {
    confirmed: boolean;
    name: string;
    photoUrl: string;
    phoneMasked: string;
    dob: string;
    verificationType: string;
  };
  credit: {
    hasHistory: boolean;
    signal: "good" | "caution" | "risk" | "none";
    score: number | null;
    summary: string;
  };
  message: string;
}

export const getMockVerifiedWithHistory = (): MockResponse => ({
  identity: {
    confirmed: true,
    name: "Chukwuemeka Obi",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka",
    phoneMasked: "******5678",
    dob: "1992-04-11",
    verificationType: "BVN"
  },
  credit: {
    hasHistory: true,
    signal: "good",
    score: 71,
    summary: "2 formal loans. Both repaid."
  },
  message: "Identity confirmed"
});

export const getMockVerifiedNoHistory = (): MockResponse => ({
  identity: {
    confirmed: true,
    name: "Tunde Ade",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde",
    phoneMasked: "******1234",
    dob: "1998-07-12",
    verificationType: "BVN"
  },
  credit: {
    hasHistory: false,
    signal: "none",
    score: null,
    summary: "No formal credit history. Identity is real and traceable."
  },
  message: "Identity confirmed"
});

export const getMockFailure = () => {
  throw new Error("Identity not found or API failure");
};
