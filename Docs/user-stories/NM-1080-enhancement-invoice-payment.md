# User Story: NM-1080 - Enhancement Invoice Payment

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1080 |
| **Type** | Story |
| **Parent Epic** | NM-1078 - Invoice Deposit Ekses, Ekses Penalangan & ASO ft SATRIA |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 24 |
| **Story Points** | 3 |
| **Reporter** | pujiyanto255 |
| **Assignee** | Muhammad Taufiqul Rahman |
| **Created** | 16/Apr/2026 |
| **Updated** | 21/Jun/2026 |

---

## User Story

**Sebagai** user EXSO dan SATRIA  
**Saya ingin** sistem mendukung perubahan struktur dan flagging pada invoice payment topup deposit excess  
**Sehingga** proses pembayaran dan penagihan dapat dilakukan sesuai kategori serta dapat termonitoring dengan lebih transparan

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Sistem menambahkan property flagging tipe invoice pada invoice header |
| AC-2 | Sistem menambahkan property status invoice pada invoice header |
| AC-3 | Sistem dapat membaca dan memproses invoice berdasarkan tipe flagging yang baru |
| AC-4 | Sistem menyesuaikan proses pembayaran berdasarkan status invoice yang berlaku |
| AC-5 | Pada invoice detail, sistem menambahkan field `isChecked` untuk setiap item |

---

## Definition of Done

- [ ] Property baru pada invoice header (flagging tipe invoice & status invoice) sudah tersedia dan tersimpan dengan benar
- [ ] Field `isChecked` pada invoice detail sudah tampil dan dapat digunakan
- [ ] Sistem mampu menangani kombinasi tipe flagging dan status invoice tanpa error
- [ ] Tidak ada inkonsistensi data antara header dan detail invoice
- [ ] Sudah dilakukan testing untuk:
  - [ ] Berbagai tipe flagging invoice
  - [ ] Perubahan status invoice
  - [ ] Skenario item checked dan unchecked
- [ ] Tidak ada bug mayor pada proses invoice payment
- [ ] Sudah diverifikasi oleh QA

---

## Sub-tasks

| Key | Summary | Type | Status | Assignee |
|-----|---------|------|--------|----------|
| NM-1083 | API - Enhance Get Invoice Header (menambahkan flagging & status) | Subtask | To Do | - |
| NM-1084 | API - Enhance Get Invoice Detail (menambahkan isChecked) | Subtask | To Do | - |
| NM-1129 | E2E Test Enhancement Invoice Payment | Subtask | REVIEW | Indra Kurniawan |
| NM-1236 | E2E Test Enhancement Invoice Payment | Subtask | REVIEW | Indra Kurniawan |

---

## Technical Context

### API Changes

**Invoice Header (GET):**
- Added: `flagingInvoice` (VARCHAR 4) — references master param EX01–EX05
- Added: `statusInvoice` — references master param INV01–INV08

**Invoice Detail (GET):**
- Added: `isChecked` (BIT) — indicates whether detail item is selected for payment

### Relevant Flows
- Flow Top Up Deposit Ekses (EX02)
- Flow Top Up Deposit ASO (EX04)
- Invoice Payment flow (Satria → EXSO approval)

### Systems Impacted
- **EXSO**: Get Invoice Header API, Get Invoice Detail API, Approval UI
- **SATRIA**: Invoice Header API, Invoice Detail API, List Invoice UI, Pengajuan Pembayaran UI

---

## References

- Epic: [NM-1078](../requirements/NM-1078-invoice-deposit-ekses.md)
- Test Cases: [NM-1080 Test Cases](../test-cases/NM-1080-test-cases.md)
- Feature File: `src/features/invoice/enhancementInvoicePayment.feature`
