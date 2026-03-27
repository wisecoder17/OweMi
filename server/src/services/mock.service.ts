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
    name: "John Doe",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    phoneMasked: "******1144",
    dob: "1992-04-11",
    verificationType: "BVN"
  },
  credit: {
    hasHistory: true,
    signal: "good",
    score: 71,
    summary: "2 formal records found. History is positive."
  },
  message: "Identity confirmed"
});

export const getMockVerifiedNoHistory = (): MockResponse => ({
  identity: {
    confirmed: true,
    name: "Jane Smith",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    phoneMasked: "******2255",
    dob: "1998-07-12",
    verificationType: "BVN"
  },
  credit: {
    hasHistory: false,
    signal: "none",
    score: null,
    summary: "No formal credit history found. Identity is confirmed."
  },
  message: "Identity confirmed"
});

export const getMockVerifiedRisk = (): MockResponse => ({
  identity: {
    confirmed: true,
    name: "Mike Jones",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    phoneMasked: "******3366",
    dob: "1985-11-20",
    verificationType: "BVN"
  },
  credit: {
    hasHistory: true,
    signal: "risk",
    score: 32,
    summary: "High risk. Multiple recent defaults detected."
  },
  message: "Identity confirmed"
});

export const getMockLiveHero = (): MockResponse => ({
  identity: {
    confirmed: true,
    name: "Bunch Dillon",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bunch",
    phoneMasked: "******1234",
    dob: "1990-01-01",
    verificationType: "BVN"
  },
  credit: {
    hasHistory: true,
    signal: "good",
    score: 85,
    summary: "Premium low-risk borrower. 5+ records."
  },
  message: "Identity confirmed"
});

export const getMockFailure = () => {
  throw new Error("Identity verification failed. Name or BVN mismatch.");
};
