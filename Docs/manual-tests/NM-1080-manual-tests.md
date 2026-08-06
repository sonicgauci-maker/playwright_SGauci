# Manual Test Cases: NM-1080 - Enhancement Invoice Payment

## Why Manual?

These test cases cannot be automated within this repo because they depend on upstream systems (AKTUW, HCCM) that are outside the scope of EXSO/SATRIA invoice payment automation.

| Flagging | Upstream System | Reason |
|----------|----------------|--------|
| EX01 (Initial Deposit Excess) | AKTUW | Requires creating corporate proposal and processing through underwriting |
| EX03 (Initial Deposit ASO) | HCCM | Requires ASO transaction creation and monitoring |
| EX04 (Topup Deposit ASO) | HCCM | Requires ASO monitoring to trigger topup |

> If AKTUW or HCCM automation repos are created in the future, these test cases can be migrated to cross-system E2E tests orchestrated via CI pipeline.

---

## Test Case Information

| Field | Value |
|-------|-------|
| **Application** | AKTUW / HCCM → EXSO |
| **Jira Reference** | NM-1080 (AC-1, AC-3) |
| **Parent Epic** | NM-1078 |
| **Test Design by** | Indra Kurniawan |
| **Test Priority** | Medium |
| **Test Type** | Manual |
| **Version** | TC.2026.02 |

---

## Manual Test Cases (7 TCs)

### MT-01: Verify flagging EX01 (Initial Deposit Excess) pada invoice header

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify flagging tipe invoice EX01 (Initial Deposit Excess) tampil pada invoice header setelah corporate proposal diproses di AKTUW |
| **Pre Conditions** | - Corporate proposal sudah dibuat di AKTUW<br>- Proposal sudah diproses melalui underwriting<br>- Policy sudah aktif dan menggunakan benefit excess<br>- Claim sudah diproses dan invoice ter-trigger |
| **Test Data** | - Member number dengan benefit excess aktif<br>- Corporate proposal number dari AKTUW |
| **Type** | Positive |
| **Priority** | Medium |

**Test Steps:**

1. Login ke AKTUW
2. Buat corporate proposal baru untuk member dengan benefit excess
3. Proses proposal melalui underwriting hingga approved
4. Pastikan policy aktif
5. Proses claim yang menggunakan benefit excess (di EXSO/New MiCare)
6. Tunggu hingga discharge process selesai dan invoice ter-trigger
7. Login ke EXSO
8. Navigasi ke Invoice List
9. Cari invoice yang baru ter-create
10. Klik detail invoice

**Expected Results:**
- Invoice ter-create dengan flagging = "EX01" (Initial Deposit Excess)
- Invoice header menampilkan property flagging tipe invoice
- Status invoice = "Draft" (INV01) pada saat pertama kali dibuat

---

### MT-02: Verify flagging EX03 (Initial Deposit ASO) pada invoice header

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify flagging tipe invoice EX03 (Initial Deposit ASO) tampil pada invoice header setelah ASO transaction diproses di HCCM |
| **Pre Conditions** | - ASO transaction sudah dibuat di HCCM<br>- ASO monitoring menunjukkan initial deposit diperlukan<br>- Invoice ASO ter-trigger dari HCCM ke EXSO |
| **Test Data** | - ASO transaction ID dari HCCM<br>- Member/corporate dengan ASO benefit |
| **Type** | Positive |
| **Priority** | Medium |

**Test Steps:**

1. Login ke HCCM
2. Buat ASO transaction baru
3. Proses transaction hingga initial deposit diperlukan
4. Tunggu trigger ke EXSO (via Kafka consumer)
5. Login ke EXSO
6. Navigasi ke Invoice List
7. Cari invoice ASO yang baru ter-create
8. Klik detail invoice

**Expected Results:**
- Invoice ter-create dengan flagging = "EX03" (Initial Deposit ASO)
- Invoice header menampilkan property flagging tipe invoice
- Status invoice = "Draft" (INV01)

---

### MT-03: Verify flagging EX04 (Topup Deposit ASO) pada invoice header

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify flagging tipe invoice EX04 (Topup Deposit ASO) tampil pada invoice header ketika ASO monitoring mendeteksi kebutuhan topup |
| **Pre Conditions** | - Initial Deposit ASO (EX03) sudah ter-create dan diproses<br>- ASO monitoring di HCCM mendeteksi balance rendah<br>- Topup invoice ter-trigger |
| **Test Data** | - Existing ASO invoice ID<br>- ASO transaction dengan balance rendah |
| **Type** | Positive |
| **Priority** | Medium |

**Test Steps:**

1. Pastikan initial deposit ASO sudah pernah dilakukan
2. Login ke HCCM
3. Verifikasi ASO monitoring menunjukkan balance memerlukan topup
4. Tunggu trigger topup ke EXSO
5. Login ke EXSO
6. Navigasi ke Invoice List
7. Cari invoice topup ASO yang baru ter-create
8. Klik detail invoice

**Expected Results:**
- Invoice ter-create dengan flagging = "EX04" (Topup Deposit ASO)
- Invoice header menampilkan property flagging tipe invoice
- Status invoice = "Draft" (INV01)

---

### MT-04: Verify invoice EX01 mengikuti flow Initial Deposit Excess

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify bahwa invoice dengan flagging EX01 mengikuti flow Initial Deposit Excess dari awal hingga payment |
| **Pre Conditions** | - Invoice EX01 sudah ter-create (via MT-01) |
| **Test Data** | - Invoice ID dari MT-01 |
| **Type** | Positive (E2E) |
| **Priority** | High |

**Test Steps:**

1. Dari MT-01, pastikan invoice EX01 sudah ter-create dengan status Draft
2. Verifikasi invoice berubah ke status Open setelah kondisi terpenuhi
3. Login ke SATRIA
4. Verifikasi notif top up diterima
5. Review invoice di SATRIA
6. Lakukan Pengajuan Bayar
7. Login ke EXSO
8. Approve pengajuan
9. Kembali ke SATRIA, upload bukti bayar
10. Login ke EXSO, approve bukti bayar
11. Verifikasi saldo updated

**Expected Results:**
- Flow: Claim Created → Benefit Excess → Discharge → Balance Calculation → Verification → Approved → Trigger Invoice → Invoice Created (EX01) → Draft → Open → Payment
- Setiap status transition terjadi dengan benar
- Tidak ada error di seluruh flow

---

### MT-05: Verify invoice EX03 mengikuti flow Initial Deposit ASO

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify bahwa invoice dengan flagging EX03 mengikuti flow Initial Deposit ASO |
| **Pre Conditions** | - Invoice EX03 sudah ter-create (via MT-02) |
| **Test Data** | - Invoice ID dari MT-02 |
| **Type** | Positive (E2E) |
| **Priority** | High |

**Test Steps:**

1. Dari MT-02, pastikan invoice EX03 sudah ter-create
2. Verifikasi status Draft → Open
3. Login ke SATRIA
4. Review invoice ASO
5. Lakukan Pengajuan Bayar
6. Login ke EXSO
7. Approve pengajuan
8. SATRIA upload bukti bayar
9. EXSO approve bukti bayar
10. Verifikasi saldo updated

**Expected Results:**
- Flow mengikuti alur yang sama dengan Deposit Ekses (sesuai note: ASO secara garis besar mengikuti Deposit Ekses)
- Status transitions: Draft → Open → INV03 → INV04 → Bukti Bayar → Approved
- Saldo ASO terupdate dengan benar

---

### MT-06: Verify invoice EX04 mengikuti flow Topup Deposit ASO

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify bahwa invoice dengan flagging EX04 mengikuti flow Topup Deposit ASO (sama dengan Topup Deposit Excess) |
| **Pre Conditions** | - Invoice EX04 sudah ter-create (via MT-03)<br>- Initial deposit ASO sudah pernah dilakukan |
| **Test Data** | - Invoice ID dari MT-03 |
| **Type** | Positive (E2E) |
| **Priority** | High |

**Test Steps:**

1. Dari MT-03, pastikan invoice EX04 sudah ter-create
2. Verifikasi status Draft → Open (dipicu oleh notif dari EXSO ke Satria)
3. Login ke SATRIA
4. Review invoice topup ASO
5. Jika ada revisi → kembalikan ke Inhealth
6. Jika tidak ada revisi → Pengajuan Bayar
7. Login ke EXSO → Approve
8. SATRIA upload bukti bayar
9. EXSO approve bukti bayar
10. Verifikasi saldo updated

**Expected Results:**
- Flow sama dengan Topup Deposit Excess (EX02): Draft → Open → Notif → Review → Bayar → Approve
- Validasi approval: flagging EX04 + status INV03
- Action decision: approved → INV04, rejected → INV05

---

### MT-07: Verify kombinasi EX04 + INV04 berjalan tanpa error

| Field | Detail |
|-------|--------|
| **Test Scenario** | Verify bahwa kombinasi flagging EX04 dan status INV04 (Pengajuan Disetujui) berjalan tanpa error dan notifikasi terkirim |
| **Pre Conditions** | - Invoice EX04 sudah disetujui (status INV04) |
| **Test Data** | - Invoice EX04 yang sudah di-approve |
| **Type** | Positive |
| **Priority** | Medium |

**Test Steps:**

1. Dari MT-06, pastikan invoice EX04 sudah di-approve (status INV04)
2. Login ke EXSO
3. Filter invoice flagging EX04 + status INV04
4. Buka detail invoice
5. Verifikasi data tampil tanpa error
6. Verifikasi notifikasi ke Satria sudah terkirim

**Expected Results:**
- Data invoice EX04 + INV04 tampil dengan benar
- Notifikasi ke Satria terkirim
- Tidak ada error atau inkonsistensi data

---

## Execution Checklist

| MT | Scenario | Executed | Date | Tester | Result | Notes |
|----|----------|----------|------|--------|--------|-------|
| MT-01 | Flagging EX01 pada header | [ ] | | | | |
| MT-02 | Flagging EX03 pada header | [ ] | | | | |
| MT-03 | Flagging EX04 pada header | [ ] | | | | |
| MT-04 | Flow EX01 Initial Deposit Excess | [ ] | | | | |
| MT-05 | Flow EX03 Initial Deposit ASO | [ ] | | | | |
| MT-06 | Flow EX04 Topup Deposit ASO | [ ] | | | | |
| MT-07 | Kombinasi EX04 + INV04 | [ ] | | | | |

---

## Dependencies

| Manual Test | Depends On | System |
|---|---|---|
| MT-01 | Corporate proposal creation & underwriting | AKTUW |
| MT-02 | ASO transaction creation | HCCM |
| MT-03 | ASO monitoring + balance detection | HCCM |
| MT-04 | MT-01 completed | AKTUW → EXSO → SATRIA |
| MT-05 | MT-02 completed | HCCM → EXSO → SATRIA |
| MT-06 | MT-03 completed | HCCM → EXSO → SATRIA |
| MT-07 | MT-06 completed | EXSO |

---

## Future Automation Opportunity

If separate automation repos are created for AKTUW and HCCM, these manual tests can be converted to cross-system E2E via CI orchestration:

```
Pipeline: invoice-e2e-cross-system
  Step 1: Run AKTUW automation → create proposal → output: policyId
  Step 2: Run HCCM automation → create ASO transaction → output: invoiceId
  Step 3: Run this repo (inhealth-new-micare-claim-pw) → verify invoice in EXSO/SATRIA
```

Until then, these remain manual test cases executed during sprint testing.
