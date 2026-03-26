# OweMi MVP Todo List

## Phase 0: Setup & Infrastructure
- [x] Initialize Git repository
- [x] Create folder structure (`/client`, `/server`)
- [x] Initialize root `package.json` for unified workflow
- [x] Create root `.env` with mandatory variables
- [x] Advice user on git commit strategy (stable features/fixes)

## Phase 1: Dependencies Installation
- [x] Setup Client dependencies (Vite, React, Tailwind, Router, Hook Form, Axios)
- [x] Setup Server dependencies (Express, Mongoose, Axios, Dotenv, Cors, etc.)
- [x] Setup `concurrently` for root dev script

## Phase 2: Design System & Global Styles
- [x] Configure Tailwind for client
- [x] Implement `index.css` with handoff design tokens (Greens, Amber, Red)
- [x] Ensure mobile-first typography and spacing

## Phase 3: Backend Foundation
- [x] Setup Express app skeleton
- [x] Setup MondoDB connection (Mongoose)
- [x] Implement basic route structure

## Phase 4: Database Models
- [x] Implement `Trader` model
- [x] Implement `Customer` model
- [x] Implement `Debt` model

## Phase 5: Service Layer (Non-Negotiable)
- [x] Implement `interswitch.service.ts` (BVN/Credit API)
- [x] Implement `mock.service.ts` (Deterministic scenarios)
- [x] Implement `customer.service.ts` (Orchestration logic)
- [x] Implement `debt.service.ts`

## Phase 6: Customer Verify Endpoint
- [x] Implement `POST /api/customer/verify`
- [x] Ensure proper response shape for history vs no-history

## Phase 7: Debt Routes
- [x] Implement `POST /api/debts` (Create)
- [x] Implement `GET /api/debts` (List + Summary)
- [x] Implement `PATCH /api/debts/:id/status` (Update)

## Phase 8: Frontend Routing & Root
- [ ] Setup React Router (`/`, `/verify`, `/result`, `/debts/:id`)
- [ ] Setup basic API client (Axios instance)

## Phase 9: Core Components
- [ ] `TopBar`
- [ ] `TotalOwedCard`
- [ ] `DebtorList` & `DebtorRow`
- [ ] `StatusBadge`
- [ ] `VerifyInputToggle`
- [ ] `ResultCard` (Crucial)
- [ ] `DebtForm`
- [ ] `EmptyLedgerState`, `LoadingState`, `Toast`

## Phase 10: Pages Implementation
- [ ] `LedgerPage` (Dashboard)
- [ ] `VerifyCustomerPage` (BVN Entry)
- [ ] `ResultRecordDebtPage` (Verdict + Record)
- [ ] `CollectPaymentPage` (Overdue view)

## Phase 11: Polish & Demo Safety
- [ ] Implement Demo Seed path/data
- [ ] Final UI/UX audit (one-thumb, high contrast)
- [ ] Error handling review (no-history state check)

## Phase 12: Final Validation
- [ ] End-to-end flow test
- [ ] Mock mode verification
- [ ] Submission cleanup
