# REQ: NM-1078 - Invoice Deposit Ekses, Ekses Penalangan & ASO ft SATRIA

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1078 |
| **Type** | Epic |
| **Project** | New MiCare - Claim |
| **Status** | To Do |
| **Priority** | Medium |
| **Reporter** | pujiyanto255 |
| **Created** | 16/Apr/2026 |
| **Updated** | 23/Jun/2026 |

---

## Description

Scope meliputi integrasi Invoice Deposit Ekses dan ASO dari EXSO ke SATRIA.

> Flow chart sudah tidak berlaku, bisa di check pada V2

---

## Scope

### Systems Involved
- **EXSO** — Invoice management system (Inhealth side)
- **SATRIA** — Payment/billing system (client/corporate side)

### Invoice Flagging Types (Master Param)

| Code | Name | Group | Subgroup |
|------|------|-------|----------|
| EX01 | Initial Deposit Excess | EXSO | Invoice Excess Deposit |
| EX02 | Topup Deposit Excess | EXSO | Invoice Excess Deposit |
| EX03 | Initial Deposit ASO | EXSO | Invoice ASO |
| EX04 | Topup Deposit ASO | EXSO | Invoice ASO |
| EX05 | Penagihan Excess Non Deposit | EXSO | Invoice Excess Non Deposit |

### Invoice Status (Master Param)

| Code | Name | Subgroup | Context |
|------|------|----------|---------|
| INV01 | Draft | Excess Non Deposit / ASO | Invoice baru dibuat |
| INV02 | Open | Excess Non Deposit / ASO | Invoice siap diproses |
| INV03 | Pengajuan Pembayaran | Excess Non Deposit / ASO | Satria mengajukan bayar |
| INV04 | Pengajuan Disetujui | Excess Non Deposit / ASO | EXSO approve pengajuan |
| INV05 | Pengajuan Ditolak | Excess Non Deposit / ASO | EXSO reject pengajuan |
| INV06 | Permintaan Approval Bukti Bayar | Excess Non Deposit | Menunggu approval bukti bayar |
| INV07 | Approved | Excess Non Deposit / ASO | Bukti bayar disetujui |
| INV08 | Rejected | Excess Non Deposit / ASO | Bukti bayar ditolak |

### Invoice Payment Status (Ekses Non Deposit)

| Code | Name |
|------|------|
| INV09 | Belum Bayar |
| INV10 | Sudah Bayar |
| INV11 | Lebih Bayar |
| INV12 | Kurang Bayar |

---

## DB Changes

```sql
-- Add Column FlagingInvoice
ALTER TABLE transactions.TransactionInvoice
ADD FlagingInvoice VARCHAR(4) NULL;

-- Add Column IsChecked on InvoiceDetail
ALTER TABLE transactions.TransactionInvoiceDetail
ADD IsChecked BIT NULL;
```

---

## Flow General

### 1. Flow Ekses Non Deposit

#### a. Flow Claim Integrasi Create Invoice
```
Claim Created
  → Using Benefit Excess
  → Discharge Process
  → Balance Excess Calculation
  → Claim Verification
  → Verification Approved
  → Trigger Create Invoice
  → Invoice Created
```

**Keterangan:** Selama status invoice open, maka setiap transaksi klaim dengan benefit excess akan diakumulasikan ke invoice tersebut. Ketika status invoice sudah bergerak, maka akan membentuk nomor invoice baru.

#### b. Flow Invoice Payment (Ekses Non Deposit)
```
Invoice Created
  → Invoice Status Open
  → Balance Deposit Ekses <= 50%
  → Kirim Notif Top Up Exso to Satria
  → Satria Pengajuan Bayar
  → Checklist All?
    → YES: Kirim Notif to Exso Approval
    → NO: Kirim Notif to Exso Approval → Split Invoice
  → Approve Invoice
  → Status Invoice Pengajuan Disetujui
  → Kirim Notif to Satria
  → Satria Upload Bukti Bayar
  → Exso Approve Bukti Bayar
  → Saldo Updated
  → Notif to Satria Approved
```

#### c. Flow Invoice Ekses Non Deposit
```
Invoice Created
  → Flag Invoice Non Deposit: EX05
  → Invoice Status Draft
  → Tanggal Cut off >= 21 bulan ini
  → Status Invoice Open
  → Kirim Notif Top Up Exso to Satria
  → Satria Review Invoice
  → Ada Revisi?
    → YES: Kembalikan ke Inhealth Untuk Revisi
    → NO: Satria Pengajuan Bayar
  → Checklist All Detail?
    → NO: Kirim Notif to Exso Approval → Approve Invoice → Split Invoice / Buat Invoice Baru
    → YES: Kirim Notif to Exso Approval → Approve Invoice
  → Status Invoice Pengajuan Disetujui
  → Kirim Notif to Satria
  → Satria Upload Bukti Bayar
  → Exso Approve Bukti Bayar
  → Notif to Satria Approved
```

### 2. Flow Top Up Deposit Ekses dan ASO
```
Invoice Created
  → Flag Invoice Topup: EX02 / EX04
  → Invoice Status Draft
  → Status Invoice Open
  → Kirim Notif Top Up Exso to Satria
  → Satria Review Invoice
  → Ada Revisi?
    → YES: Kembalikan ke Inhealth Untuk Revisi
    → NO: Satria Pengajuan Bayar
  → Kirim Notif to Exso Approval
  → Approve Invoice
  → Status Invoice Pengajuan Disetujui
  → Kirim Notif to Satria
  → Satria Upload Bukti Bayar
  → Exso Approve Bukti Bayar
  → Saldo Updated
  → Notif to Satria Approved
```

### 3. ASO
Secara garis besar flow akan mengikuti Deposit Ekses.

---

## Scope Enhancement

- **Enhance Invoice Generate**
  - Enhance Exso Kafka Consumer Invoice
- **Enhance Invoice Payment**
  - Enhance Exso Get Invoice Header (penambahan invoice flaging & status terbaru)
  - Enhance Exso Get Invoice Detail (penambahan property isChecked)
  - Satria Enhance API Invoice Header (penambahan invoice flaging & status terbaru)
  - Satria Enhance API Invoice Detail (penambahan property isChecked)
- **Pengajuan Pembayaran**
  - Satria Enhance UI List Invoice (penyesuaian invoice flaging & status)
  - Satria UI Pengajuan Pembayaran (select multiple detail invoice)
  - Satria API Pengajuan Pembayaran
  - Exso API Pengajuan Pembayaran
  - Exso UI Approval Pengajuan Pembayaran
  - Exso API Approval Pengajuan Pembayaran (logic split bill ada disini)
- **Approval Bukti Bayar**
  - Enhance Satria UI Submit Bukti Bayar berdasarkan status setelah pengajuan di setujui untuk deposit ekses

---

## Notes (29 April 2026)

- Flow split billing dibatalkan untuk deposit ekses dan ASO
- Split billing akan dipakai untuk ekses penalangan / ekses non deposit
- Penambahan flow review invoice di Satria sebagai evidence revisi transaksi klaim
- Deposit Ekses dan deposit ASO tidak membatasi minimal nominal topup
- Akan di assess selanjutnya untuk flow proses revisi transaksi klaim
- Penambahan halaman lampiran penggunaan Ekses (untuk deposit ekses)
- Penambahan lihat berkas untuk transaksional klaim dengan Poolfund

### Validasi Approval

| Context | Flaging Invoice | Status Invoice |
|---------|----------------|----------------|
| Pengajuan Ekses Deposit | EX04 | INV03 |
| Pengajuan Deposit ASO | EX02 | INV03 |

### Action Decision

| Context | Approved | Rejected |
|---------|----------|----------|
| Pengajuan Invoice Ekses Deposit | INV04 | INV05 |
| Pengajuan Invoice Deposit ASO | INV04 | INV05 |

---

## Related Issues

| Key | Summary | Status |
|-----|---------|--------|
| NM-1257 | Initial Invoice menggunakan format de... | Done |
| NM-1271 | Invoice Amount tidak sesuai dengan de... | Done |
| NM-1273 | Tanggal Bayar dan status BU tidak terisi | Done |
| NM-1346 | Double Invoice Initial Deposit Ekses | Done |

---

## Child Stories

| Key | Summary | Status |
|-----|---------|--------|
| NM-1080 | Enhancement Invoice Payment | TEST |
| ... | ... | ... |
