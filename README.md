# OweMi: Trust-Based Informal Trade Credit 🇳🇬

> **Empowering Mama Ngozi to extend credit with confidence.**

OweMi (Yoruba for *"I am owed"*) is a mobile-first ledger designed for the Nigerian market trader. It solves the "traceability gap" in informal trade by using BVN-based identity as a trust anchor, allowing traders to verify customers and record debts in seconds.

Built for the **Interswitch × Enyata Buildathon 2026**.

---

## 🌟 The Vision
Informal credit is the lifeblood of Nigerian retail, yet billions are lost because customers become untraceable. OweMi turns a "handshake deal" into a verifiable record.
- **Identity First:** Confirm the person standing in front of you is real and traceable.
- **Credit Verdicts:** Surface formal credit history from Interswitch rails as a "signal," not a barrier.
- **Simple Ledger:** A brutal, one-thumb interface for busy traders to manage who owes what.

---

## 🚀 The OweMi Loop
1. **Verify:** Trader hands the phone to the customer to enter their BVN.
2. **Verdict:** System checks Interswitch APIs for Identity + Credit History.
3. **Record:** Trader sees a clear "Trust Verdict" and records the debt (Amount, Item, Due Date).
4. **Manage:** Trader tracks all debts in a high-contrast, mobile-optimized ledger.

---

## 🛠️ Tech Stack
- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **APIs:** 
  - **Interswitch BVN Full Details API** (Identity Verification)
  - **Interswitch Credit History Lookup API** (Financial Background)

---

## 🏗️ Project Structure
```text
/client   - React mobile-first interface
/server   - Express API & Interswitch integration
/test     - Validation & debug scripts
```

---

## 🔋 Demo Guide (Mock Scenarios)
OweMi is built with a **Resilience Layer**. Since sandbox APIs can be unstable, use the following BVNs to demo specific scenarios in `MOCK_MODE`:

| Scenario | BVN | Result |
| :--- | :--- | :--- |
| **Good History** | `11122233344` | John Doe: 2 formal loans repaid. High trust. |
| **No History** | `22233344455` | Jane Smith: Identity confirmed. No debt history. |
| **High Risk** | `33344455566` | Mike Jones: Multiple recent defaults detected. |
| **Live Sandbox** | `95888168924` | Bunch Dillon: Premium borrower record. |
| **Failure** | `00000000000` | Simulates a mismatch or record not found. |

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Environment Variables
Create a `.env` file in the root:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
USE_MOCK_MODE=true

# Interswitch Credentials (if USE_MOCK_MODE=false)
INTERSWITCH_CLIENT_KEY=...
INTERSWITCH_SERVER_KEY=...
```

### 3. Install & Run
```bash
# Install root dependencies
npm install

# Run Client & Server concurrently
npm run dev
```

---

## 🎨 Design System
- **Primary Green (#16A34A):** Represents growth and financial health.
- **Rich Dark (#0B3D2E):** Used for headers and strong elements.
- **High Contrast:** White backgrounds and 16px+ typography for outdoor readability in busy markets.

---

## 🛡️ Security & Reliability
- **Strict Validation:** BVN validation (11-digit numeric) and name-matching logic.
- **API Abstraction:** Interswitch calls are wrapped in a service layer with graceful fallbacks.
- **No Friction:** "No credit history" is treated as a successful identity confirmation, not an error.

---

**OweMi** — *Trade with Trust.*