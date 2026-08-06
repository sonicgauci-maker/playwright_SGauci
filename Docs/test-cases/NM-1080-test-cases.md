# Test Cases: NM-1080 - Enhancement Invoice Payment

## Test Case Information

| Field | Value |
|-------|-------|
| **Application** | New MiCare - Claim (EXSO & SATRIA) |
| **Menu** | Invoice Payment |
| **Jira Reference** | NM-1080 |
| **Parent Epic** | NM-1078 |
| **Test Design by** | Indra Kurniawan |
| **Test Priority** | Medium |
| **Application Address** | EXSO / SATRIA |
| **Version** | TC.2026.02 |

---

## Automation Scope

| Flagging | Name | Test Type | Reason |
|----------|------|-----------|--------|
| EX01 | Initial Deposit Excess | **Manual** | Requires corporate proposal from AKTUW |
| EX02 | Topup Deposit Excess | **Automated** | Triggered within EXSO when balance ≤ 50% |
| EX03 | Initial Deposit ASO | **Manual** | Requires ASO transaction from HCCM |
| EX04 | Topup Deposit ASO | **Manual** | Requires ASO monitoring from HCCM |
| EX05 | Penagihan Excess Non Deposit | **Automated** | Cut-off based, within EXSO scope |

### Systems Boundary

```
┌─────────────────────────────────────────────────────────────────────┐
│ AUTOMATED (this repo: inhealth-new-micare-claim-pw)                 │
│                                                                     │
│   EXSO                          SATRIA                              │
│   ├── Invoice List UI           ├── Invoice List UI                 │
│   ├── Invoice Detail UI         ├── Invoice Detail UI               │
│   ├── Approval Pengajuan UI     ├── Pengajuan Bayar UI              │
│   ├── Get Invoice Header API    ├── Review Invoice UI               │
│   └── Get Invoice Detail API    └── Upload Bukti Bayar UI           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ MANUAL (separate apps / separate automation repos)                   │
│                                                                     │
│   AKTUW                         HCCM                                │
│   ├── Corporate Proposal        ├── ASO Transaction                 │
│   ├── Underwriting Process      ├── ASO Monitoring                  │
│   └── Policy Activation         └── ASO Invoice Trigger             │
│        ↓                              ↓                             │
│   Triggers EX01 (Initial        Triggers EX03/EX04 (ASO             │
│   Deposit Excess)               Initial/Topup)                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Automated Test Cases (22 TCs)

### AC-1: Flagging Tipe Invoice pada Invoice Header

> Scope: Only EX02 and EX05 verified via automation. EX01/EX03/EX04 → see [Manual Tests](../manual-tests/NM-1080-manual-tests.md)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify flagging EX02 (Topup Deposit Excess) tampil pada invoice header | Invoice dengan flagging EX02 | Invoice topup sudah ter-create karena balance ≤ 50% | TC01 - Flagging EX02 pada header | Positive | 1. Login ke EXSO sebagai admin<br>2. Navigasi ke Invoice List<br>3. Filter flagging EX02<br>4. Klik detail invoice | Invoice header menampilkan flagging = "EX02" (Topup Deposit Excess) | | Medium | Automated |
| 2 | Verify flagging EX05 (Penagihan Excess Non Deposit) tampil pada invoice header | Invoice dengan flagging EX05 | Invoice non deposit ter-create setelah cut-off | TC02 - Flagging EX05 pada header | Positive | 1. Login ke EXSO sebagai admin<br>2. Navigasi ke Invoice List<br>3. Filter flagging EX05<br>4. Klik detail invoice | Invoice header menampilkan flagging = "EX05" (Penagihan Excess Non Deposit) | | Medium | Automated |

---

### AC-2: Status Invoice pada Invoice Header

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 3 | Verify status Draft (INV01) tampil pada header | Invoice status Draft | Invoice baru ter-create | TC03 - Status Draft pada header | Positive | 1. Login ke EXSO<br>2. Navigasi ke Invoice List<br>3. Buka invoice status Draft | Header menampilkan status = "Draft" (INV01) | | Medium | Automated |
| 4 | Verify status Open (INV02) tampil pada header | Invoice status Open | Invoice melewati cut-off atau balance ≤ 50% | TC04 - Status Open pada header | Positive | 1. Login ke EXSO<br>2. Navigasi ke Invoice List<br>3. Buka invoice status Open | Header menampilkan status = "Open" (INV02) | | Medium | Automated |
| 5 | Verify status Pengajuan Pembayaran (INV03) tampil pada header | Invoice status INV03 | Satria sudah mengajukan pembayaran | TC05 - Status Pengajuan Pembayaran pada header | Positive | 1. Login ke EXSO<br>2. Navigasi ke Invoice List<br>3. Buka invoice yang diajukan | Header menampilkan status = "Pengajuan Pembayaran" (INV03) | | Medium | Automated |
| 6 | Verify status Pengajuan Disetujui (INV04) tampil pada header | Invoice status INV04 | EXSO sudah approve pengajuan | TC06 - Status Pengajuan Disetujui pada header | Positive | 1. Login ke EXSO<br>2. Navigasi ke Invoice List<br>3. Buka invoice yang disetujui | Header menampilkan status = "Pengajuan Disetujui" (INV04) | | Medium | Automated |
| 7 | Verify status Pengajuan Ditolak (INV05) tampil pada header | Invoice status INV05 | EXSO sudah reject pengajuan | TC07 - Status Pengajuan Ditolak pada header | Positive | 1. Login ke EXSO<br>2. Navigasi ke Invoice List<br>3. Buka invoice yang ditolak | Header menampilkan status = "Pengajuan Ditolak" (INV05) | | Medium | Automated |

---

### AC-3: Sistem Memproses Invoice Berdasarkan Tipe Flagging

> Scope: Only EX02 and EX05 flows verified. EX01/EX03/EX04 flows → see [Manual Tests](../manual-tests/NM-1080-manual-tests.md)

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 8 | Verify invoice EX02 mengikuti flow Topup Deposit Excess | Invoice flagging EX02 | Balance deposit ≤ 50%, topup invoice ter-create | TC08 - Flow EX02 Topup Deposit Excess | Positive | 1. Login ke EXSO<br>2. Buka invoice flagging EX02<br>3. Verifikasi flow: Draft → Open → Notif → Review → Bayar → Approve | Invoice mengikuti flow Topup Deposit Excess | | High | Automated |
| 9 | Verify invoice EX05 mengikuti flow Excess Non Deposit | Invoice flagging EX05 | Invoice ter-create setelah cut-off ≥ 21 | TC09 - Flow EX05 Excess Non Deposit | Positive | 1. Login ke EXSO<br>2. Buka invoice flagging EX05<br>3. Verifikasi flow: Draft → Cut-off → Open → Review → Bayar → Approve | Invoice mengikuti flow Penagihan Excess Non Deposit | | High | Automated |

---

### AC-4: Proses Pembayaran Berdasarkan Status Invoice

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 10 | Satria berhasil mengajukan pembayaran saat status Open | Invoice status Open (INV02) | Invoice berstatus Open | TC10 - Pengajuan bayar saat Open | Positive | 1. Login ke SATRIA<br>2. Navigasi ke Invoice List<br>3. Pilih invoice Open<br>4. Klik "Pengajuan Bayar" | Status berubah ke INV03, notif terkirim ke EXSO | | High | Automated |
| 11 | Satria tidak dapat mengajukan pembayaran saat status Draft | Invoice status Draft (INV01) | Invoice masih Draft | TC11 - Pengajuan bayar blocked saat Draft | Negative | 1. Login ke SATRIA<br>2. Navigasi ke Invoice List<br>3. Pilih invoice Draft<br>4. Coba "Pengajuan Bayar" | Tombol "Pengajuan Bayar" disabled/tidak tersedia | | High | Automated |
| 12 | EXSO approve pengajuan (INV03 → INV04) | Invoice status INV03 | Satria sudah mengajukan | TC12 - Approve pengajuan | Positive | 1. Login ke EXSO<br>2. Navigasi ke Approval Pengajuan<br>3. Pilih invoice INV03<br>4. Klik Approve | Status berubah ke INV04, notif ke Satria | | High | Automated |
| 13 | EXSO reject pengajuan (INV03 → INV05) | Invoice status INV03 | Satria sudah mengajukan | TC13 - Reject pengajuan | Negative | 1. Login ke EXSO<br>2. Navigasi ke Approval Pengajuan<br>3. Pilih invoice INV03<br>4. Klik Reject | Status berubah ke INV05 | | High | Automated |
| 14 | Validasi approval hanya untuk flagging EX02 + status INV03 | Invoice EX02, status INV03 | Invoice topup sudah diajukan | TC14 - Filter approval EX02 + INV03 | Positive | 1. Login ke EXSO<br>2. Navigasi ke Approval Pengajuan<br>3. Filter flagging EX02 | Hanya invoice EX02 + INV03 yang tersedia | | Medium | Automated |

---

### AC-5: Field isChecked pada Invoice Detail

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 15 | Verify field isChecked tampil pada setiap item detail | Invoice dengan multiple detail items | Invoice ter-create dengan detail | TC15 - isChecked field tersedia | Positive | 1. Login ke SATRIA<br>2. Navigasi ke Invoice List<br>3. Buka invoice detail | Setiap item memiliki checkbox isChecked | | Medium | Automated |
| 16 | User dapat checklist item (isChecked = true) | Invoice dengan items unchecked | Invoice status memperbolehkan checklist | TC16 - Checklist item | Positive | 1. Login ke SATRIA<br>2. Buka invoice detail<br>3. Checklist item row 1<br>4. Simpan | isChecked = true di DB untuk item row 1 | | Medium | Automated |
| 17 | User dapat un-checklist item (isChecked = false) | Invoice dengan items checked | Item sudah di-checklist | TC17 - Unchecklist item | Positive | 1. Login ke SATRIA<br>2. Buka invoice detail<br>3. Un-checklist item<br>4. Simpan | isChecked = false di DB untuk item tersebut | | Medium | Automated |
| 18 | Partial checklist memicu split invoice | Invoice 5 items, 3 checked | Invoice status Open | TC18 - Partial checklist split | Positive | 1. Login ke SATRIA<br>2. Buka invoice detail<br>3. Checklist 3 dari 5 item<br>4. Pengajuan Bayar | Hanya 3 item diproses, invoice baru untuk 2 remaining | | High | Automated, khusus ekses non deposit |
| 19 | Full checklist tanpa split invoice | Invoice semua items checked | Invoice status Open | TC19 - Full checklist no split | Positive | 1. Login ke SATRIA<br>2. Buka invoice detail<br>3. Checklist semua<br>4. Pengajuan Bayar | Seluruh item diproses, tidak ada split | | High | Automated |

---

### DoD: Konsistensi Data & Kombinasi

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Status | Priority | Notes |
|----|---|---|---|---|---|---|---|---|---|---|
| 20 | Konsistensi data header vs detail | Invoice EX02 dengan detail items | Invoice lengkap | TC20 - Data consistency header-detail | Positive | 1. GET Invoice Header API<br>2. GET Invoice Detail API<br>3. Bandingkan data | Tidak ada inkonsistensi flagging/status antara header dan detail | | High | Automated (API) |
| 21 | Kombinasi EX02 + INV03 tanpa error | Invoice EX02 status INV03 | Satria sudah submit | TC21 - Combination EX02 + INV03 | Positive | 1. Login EXSO<br>2. Filter EX02 + INV03<br>3. Buka detail | Data tampil benar, approval tersedia | | Medium | Automated |
| 22 | Tidak ada double invoice untuk satu claim | Claim dengan open invoice | Invoice EX02 sudah ada | TC22 - No duplicate invoice | Negative | 1. Trigger transaksi klaim baru dengan benefit excess<br>2. Cek invoice di DB/UI | Transaksi diakumulasi ke invoice existing, tidak buat invoice baru | | High | Automated, regression NM-1346 |

---

## Coverage Summary

| Acceptance Criteria | Automated TCs | Manual TCs | Total |
|-----|-----------|---------|-------|
| AC-1: Flagging tipe invoice pada header | 2 (EX02, EX05) | 3 (EX01, EX03, EX04) | 5 |
| AC-2: Status invoice pada header | 5 | 0 | 5 |
| AC-3: Proses berdasarkan flagging | 2 (EX02, EX05) | 3 (EX01, EX03, EX04) | 5 |
| AC-4: Proses pembayaran berdasarkan status | 5 | 0 | 5 |
| AC-5: Field isChecked | 5 | 0 | 5 |
| DoD: Konsistensi & kombinasi | 3 | 1 (EX04+INV04) | 4 |
| **Total** | **22** | **7** | **29** |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tag |
|----------|---|---|
| TC01-TC02 | Verify invoice header displays flagging type | `@AC-1 @invoice-header @smoke` |
| TC03-TC07 | Verify invoice header displays status | `@AC-2 @invoice-header @smoke` |
| TC08-TC09 | Verify invoice flow by flagging | `@AC-3 @invoice-flow @e2e` |
| TC10-TC14 | Payment process by status | `@AC-4 @payment` |
| TC15-TC19 | isChecked field operations | `@AC-5 @invoice-detail` |
| TC20-TC22 | Data consistency & regression | `@dod` |

**Feature File:** `src/features/invoice/enhancementInvoicePayment.feature`

---

## Sign-off

| Role | Name | Signature |
|------|------|-----------|
| Developer | Muhammad Taufiqul Rahman | |
| Tester | Indra Kurniawan | |
| Squad Lead | | |
| BA / PO / Tribe Lead | | |
