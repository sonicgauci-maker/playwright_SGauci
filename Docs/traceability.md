# Traceability Matrix

This document maps the full pipeline from **Requirements → User Stories → Test Cases → Automated/Manual Tests** for the New MiCare - Claim project.

---

## How to Read This Matrix

```
Epic (Requirement)
  └── User Story
        └── Acceptance Criteria
              ├── Automated Test Case(s) → Feature File Scenario(s)
              └── Manual Test Case(s) → Manual Test Doc
```

### Legend

| Symbol | Meaning |
|--------|---------|
| `[A]` | Automated (in this repo) |
| `[M]` | Manual (requires external system) |
| `[API]` | API-level automated test |

---

## NM-1078: Invoice Deposit Ekses, Ekses Penalangan & ASO ft SATRIA

### Document Map

| Layer | ID | Document | Path |
|-------|-----|----------|------|
| Requirement | NM-1078 | Epic Requirement | `docs/requirements/NM-1078-invoice-deposit-ekses.md` |
| User Story | NM-1080 | Enhancement Invoice Payment | `docs/user-stories/NM-1080-enhancement-invoice-payment.md` |
| Test Cases (Automated) | TC01–TC22 | Automated Test Cases | `docs/test-cases/NM-1080-test-cases.md` |
| Test Cases (Manual) | MT-01–MT-07 | Manual Test Cases | `docs/manual-tests/NM-1080-manual-tests.md` |
| Feature File | — | Gherkin Scenarios | `src/features/invoice/enhancementInvoicePayment.feature` |

---

## Detailed Traceability: NM-1080 - Enhancement Invoice Payment

### AC-1: Flagging tipe invoice pada invoice header

| Requirement | AC | Test Case | Type | Feature Scenario / Manual Test | Tag / Ref |
|---|---|---|---|---|---|
| NM-1078 (Flagging: EX02) | AC-1 | TC01 | `[A]` | Verify invoice header displays flagging type - EX02 | `@AC-1 @invoice-header @smoke` |
| NM-1078 (Flagging: EX05) | AC-1 | TC02 | `[A]` | Verify invoice header displays flagging type - EX05 | `@AC-1 @invoice-header @smoke` |
| NM-1078 (Flagging: EX01) | AC-1 | MT-01 | `[M]` | Flagging EX01 pada header (requires AKTUW) | `docs/manual-tests/` |
| NM-1078 (Flagging: EX03) | AC-1 | MT-02 | `[M]` | Flagging EX03 pada header (requires HCCM) | `docs/manual-tests/` |
| NM-1078 (Flagging: EX04) | AC-1 | MT-03 | `[M]` | Flagging EX04 pada header (requires HCCM) | `docs/manual-tests/` |

### AC-2: Status invoice pada invoice header

| Requirement | AC | Test Case | Type | Feature Scenario | Tag |
|---|---|---|---|---|---|
| NM-1078 (Status: INV01) | AC-2 | TC03 | `[A]` | Verify invoice header displays status - INV01 (Draft) | `@AC-2 @invoice-header @smoke` |
| NM-1078 (Status: INV02) | AC-2 | TC04 | `[A]` | Verify invoice header displays status - INV02 (Open) | `@AC-2 @invoice-header @smoke` |
| NM-1078 (Status: INV03) | AC-2 | TC05 | `[A]` | Verify invoice header displays status - INV03 (Pengajuan Pembayaran) | `@AC-2 @invoice-header @smoke` |
| NM-1078 (Status: INV04) | AC-2 | TC06 | `[A]` | Verify invoice header displays status - INV04 (Pengajuan Disetujui) | `@AC-2 @invoice-header @smoke` |
| NM-1078 (Status: INV05) | AC-2 | TC07 | `[A]` | Verify invoice header displays status - INV05 (Pengajuan Ditolak) | `@AC-2 @invoice-header @smoke` |

### AC-3: Sistem memproses invoice berdasarkan tipe flagging

| Requirement | AC | Test Case | Type | Feature Scenario / Manual Test | Tag / Ref |
|---|---|---|---|---|---|
| NM-1078 (Flow: Topup Deposit) | AC-3 | TC08 | `[A]` | Verify invoice with flagging EX02 follows Topup Deposit Excess flow | `@AC-3 @invoice-flow @e2e` |
| NM-1078 (Flow: Ekses Non Deposit) | AC-3 | TC09 | `[A]` | Verify invoice with flagging EX05 follows Excess Non Deposit flow | `@AC-3 @invoice-flow @e2e` |
| NM-1078 (Flow: Initial Deposit) | AC-3 | MT-04 | `[M]` | Flow EX01 Initial Deposit Excess (requires AKTUW) | `docs/manual-tests/` |
| NM-1078 (Flow: Initial ASO) | AC-3 | MT-05 | `[M]` | Flow EX03 Initial Deposit ASO (requires HCCM) | `docs/manual-tests/` |
| NM-1078 (Flow: Topup ASO) | AC-3 | MT-06 | `[M]` | Flow EX04 Topup Deposit ASO (requires HCCM) | `docs/manual-tests/` |

### AC-4: Proses pembayaran berdasarkan status invoice

| Requirement | AC | Test Case | Type | Feature Scenario | Tag |
|---|---|---|---|---|---|
| NM-1078 (Flow: Payment) | AC-4 | TC10 | `[A]` | Satria successfully submits payment request when status Open | `@AC-4 @payment @e2e` |
| NM-1078 (Flow: Payment) | AC-4 | TC11 | `[A]` | Satria cannot submit payment when status Draft | `@AC-4 @payment @negative` |
| NM-1078 (Flow: Approval) | AC-4 | TC12 | `[A]` | EXSO approves payment request (INV03 → INV04) | `@AC-4 @payment @approval @e2e` |
| NM-1078 (Flow: Approval) | AC-4 | TC13 | `[A]` | EXSO rejects payment request (INV03 → INV05) | `@AC-4 @payment @negative` |
| NM-1078 (Notes: Validasi) | AC-4 | TC14 | `[A]` | Validate approval page for flagging EX02 + INV03 | `@AC-4 @payment @validation` |

### AC-5: Field isChecked pada invoice detail

| Requirement | AC | Test Case | Type | Feature Scenario | Tag |
|---|---|---|---|---|---|
| NM-1078 (DB: IsChecked) | AC-5 | TC15 | `[A]` | Verify isChecked field displayed on invoice detail | `@AC-5 @invoice-detail` |
| NM-1078 (DB: IsChecked) | AC-5 | TC16 | `[A]` | User can check item on invoice detail | `@AC-5 @invoice-detail` |
| NM-1078 (DB: IsChecked) | AC-5 | TC17 | `[A]` | User can uncheck item on invoice detail | `@AC-5 @invoice-detail` |
| NM-1078 (Flow: Split Invoice) | AC-5 | TC18 | `[A]` | Partial checklist triggers split invoice | `@AC-5 @invoice-detail @split @e2e` |
| NM-1078 (Flow: Payment) | AC-5 | TC19 | `[A]` | Full checklist proceeds without split | `@AC-5 @invoice-detail @e2e` |

### DoD: Konsistensi Data & Kombinasi

| Requirement | AC | Test Case | Type | Feature Scenario / Manual Test | Tag / Ref |
|---|---|---|---|---|---|
| NM-1078 (Scope Enhancement) | DoD | TC20 | `[API]` | Verify data consistency between header and detail | `@dod @consistency @api` |
| NM-1078 (Notes: Validasi) | DoD | TC21 | `[A]` | Verify combination EX02 + INV03 works without error | `@dod @combination` |
| NM-1078 (Related: NM-1346) | DoD | TC22 | `[A]` | Verify no duplicate invoice for same claim | `@dod @regression` |
| NM-1078 (Notes: Validasi) | DoD | MT-07 | `[M]` | Verify combination EX04 + INV04 (requires HCCM) | `docs/manual-tests/` |

---

## Coverage Dashboard

### By Acceptance Criteria

| AC | Description | Automated | Manual | Total | Coverage |
|----|-------------|-----------|--------|-------|----------|
| AC-1 | Flagging tipe invoice pada header | 2 | 3 | 5 | 100% (designed) |
| AC-2 | Status invoice pada header | 5 | 0 | 5 | 100% (designed) |
| AC-3 | Proses berdasarkan flagging | 2 | 3 | 5 | 100% (designed) |
| AC-4 | Proses pembayaran berdasarkan status | 5 | 0 | 5 | 100% (designed) |
| AC-5 | Field isChecked | 5 | 0 | 5 | 100% (designed) |
| DoD | Konsistensi & kombinasi | 3 | 1 | 4 | 100% (designed) |
| **Total** | | **22** | **7** | **29** | **100%** |

### By Test Type

| Type | Count | Percentage | Execution |
|------|-------|-----------|-----------|
| `[A]` Automated (UI) | 19 | 66% | `npx cucumber-js --tags @NM-1080` |
| `[API]` Automated (API) | 1 | 3% | `npx cucumber-js --tags "@NM-1080 and @api"` |
| `[M]` Manual | 7 | 24% | Manual execution checklist |
| Regression | 2 | 7% | `npx cucumber-js --tags "@NM-1080 and @regression"` |

### By System Dependency

| System | Automated | Manual | Notes |
|--------|-----------|--------|-------|
| EXSO only | 12 | 0 | Fully within scope |
| SATRIA only | 7 | 0 | Fully within scope |
| EXSO + SATRIA | 3 | 0 | Cross-system within scope |
| AKTUW → EXSO | 0 | 3 | Requires AKTUW (EX01) |
| HCCM → EXSO | 0 | 4 | Requires HCCM (EX03, EX04) |

---

## Tag Strategy

Tags in `.feature` files enable selective execution and traceability:

| Tag Pattern | Purpose | Example |
|---|---|---|
| `@NM-{id}` | Links to Jira story | `@NM-1080` |
| `@AC-{n}` | Links to acceptance criteria | `@AC-1` |
| `@{category}` | Groups by functional area | `@invoice-header`, `@payment`, `@invoice-detail` |
| `@negative` | Negative test scenarios | `@negative` |
| `@e2e` | End-to-end flow tests | `@e2e` |
| `@smoke` | Smoke test suite | `@smoke` |
| `@regression` | Regression test suite | `@regression` |
| `@dod` | Definition of Done validation | `@dod` |
| `@api` | API-level tests | `@api` |
| `@split` | Split invoice logic | `@split` |

### Running by Traceability

```bash
# Run all automated tests for story NM-1080
npx cucumber-js --config cucumber.js --tags @NM-1080 src/features/invoice/

# Run only AC-1 tests (flagging on header)
npx cucumber-js --config cucumber.js --tags "@NM-1080 and @AC-1" src/features/invoice/

# Run payment flow tests
npx cucumber-js --config cucumber.js --tags "@NM-1080 and @payment" src/features/invoice/

# Run negative tests only
npx cucumber-js --config cucumber.js --tags "@NM-1080 and @negative" src/features/invoice/

# Run smoke tests (quick verification)
npx cucumber-js --config cucumber.js --tags "@NM-1080 and @smoke" src/features/invoice/

# Run E2E flow tests
npx cucumber-js --config cucumber.js --tags "@NM-1080 and @e2e" src/features/invoice/

# Run regression tests
npx cucumber-js --config cucumber.js --tags "@NM-1080 and @regression" src/features/invoice/
```

---

## Automation Progress

| Story | Automated TCs | Implemented | Pending | Coverage |
|-------|---------------|-------------|---------|----------|
| NM-1080 | 22 | 0 | 22 | 0% |

> Update this table as step definitions are implemented.

---

## Future Stories (To Be Added)

| Epic | Story | Status | Automated TCs | Manual TCs | Feature File |
|------|-------|--------|---------------|-----------|--------------|
| NM-1078 | NM-1080 Enhancement Invoice Payment | TEST | 22 | 7 | `src/features/invoice/enhancementInvoicePayment.feature` |
| NM-1078 | (Pengajuan Pembayaran) | TBD | TBD | TBD | TBD |
| NM-1078 | (Approval Bukti Bayar) | TBD | TBD | TBD | TBD |
| NM-1078 | (Invoice Generate - Kafka) | TBD | TBD | TBD | TBD |
| NM-1130 | NM-1391 Menampilkan Suspect Document sebagai Remark | TEST | 24 | 2 | `src/features/suspectDocumentRemark/*.feature` |
| NM-1441 | NM-1447 Menampilkan Score Claim | TEST | 33 | 1 | `src/features/claimScore/*.feature` |

---

## Cross-System E2E (Future)

When AKTUW and HCCM automation repos are created, full cross-system E2E can be orchestrated:

```
┌──────────────────────────────────────────────────────────────────┐
│ CI Pipeline: invoice-e2e-cross-system                            │
│                                                                  │
│  Step 1: inhealth-aktuw-pw                                       │
│           └── Create corporate proposal → output: policyId       │
│                                                                  │
│  Step 2: inhealth-hccm-pw                                        │
│           └── Create ASO transaction → output: invoiceId         │
│                                                                  │
│  Step 3: inhealth-new-micare-claim-pw (this repo)                │
│           └── Verify invoice in EXSO/SATRIA → payment flow       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Until then:
- Automated tests in this repo use **seeded test data** (pre-existing invoices)
- Manual tests are executed during sprint testing with real cross-system flow
