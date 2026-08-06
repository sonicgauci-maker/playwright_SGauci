# User Story: NM-1391 - Menampilkan Suspect Document sebagai Remark

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1391 |
| **Type** | Story |
| **Parent** | NM-1130 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Highest |
| **Sprint** | Claim Operation Sprint 25, Claim Operation Sprint 26 |
| **Story Points** | 1 |
| **Reporter** | pujiyanto255 |
| **Assignee** | Muhammad Taufiqul Rahman |
| **Created** | 5/Jul/2026 |
| **Updated** | 31/Jul/2026 |

---

## User Story

**Sebagai** staf administrasi klaim  
**Saya ingin** remark dari setiap kategori dokumen yang di-reject digabungkan menjadi satu dan ditampilkan di kolom remark klaim saat submit pending  
**Sehingga** history penolakan dokumen dapat dilihat secara lengkap dan jelas dalam satu tempat tanpa harus membuka detail per dokumen

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Saat transaksi eClaim reimbursement di-submit pending, seluruh remark dari masing-masing kategori dokumen yang di-reject digabungkan menjadi satu string |
| AC-2 | Penggabungan remark menggunakan pemisah koma (`,`) antar remark tiap kategori dokumen |
| AC-3 | Hasil penggabungan remark disimpan dan ditampilkan pada kolom remark klaim |
| AC-4 | Jika hanya ada satu kategori dokumen yang memiliki remark, maka remark tersebut langsung ditampilkan tanpa koma tambahan |
| AC-5 | Jika tidak ada remark pada semua kategori dokumen, kolom remark klaim tetap kosong (tidak terisi karakter separator) |
| AC-6 | Remark yang sudah digabung dapat dilihat pada history klaim untuk keperluan tracking dan audit |

---

## Definition of Done

- [ ] Semua Acceptance Criteria telah terpenuhi dan diverifikasi
- [ ] Sudah dilakukan testing oleh QA
- [ ] Fitur sudah di-review oleh PO dan disetujui
- [ ] Tidak ada bug kritikal yang belum terselesaikan
- [ ] Dokumentasi diperbarui jika ada perubahan alur atau rule bisnis
- [ ] Ready pada server development

---

## Wireframe Description

### Flow Submit Pending eClaim Reimbursement

**Menu Path:** eClaim Reimbursement > Proses Klaim > Submit Pending  
**Trigger:** Staf admin melakukan submit pending pada transaksi eClaim reimbursement yang memiliki dokumen di-reject

#### Sebelum Submit Pending — Verifikasi Dokumen

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  eClaim Reimbursement - Verifikasi Dokumen                                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  Kategori Dokumen:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │ No │ Kategori Dokumen │ Status    │ Remark                                     │ │
│  ├────┼──────────────────┼───────────┼────────────────────────────────────────────│ │
│  │ 1  │ Resume Medis     │ Rejected  │ Dokumen tidak lengkap                      │ │
│  │ 2  │ Kwitansi         │ Rejected  │ Kwitansi tidak sesuai tanggal              │ │
│  │ 3  │ Hasil Lab        │ Approved  │ -                                          │ │
│  │ 4  │ Surat Rujukan    │ Rejected  │ Surat rujukan expired                      │ │
│  └────┴──────────────────┴───────────┴────────────────────────────────────────────┘ │
│                                                                                      │
│  [Submit Pending]  [Cancel]                                                          │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

#### Setelah Submit Pending — Kolom Remark Klaim

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  Detail Klaim / History Klaim                                                        │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  Claim No     : CLM-2026-001                                                         │
│  Status       : Pending                                                              │
│  Remark       : Dokumen tidak lengkap, Kwitansi tidak sesuai tanggal,                │
│                 Surat rujukan expired                                                 │
│                                                                                      │
│  ──────────────────────────────────────────────────────────────────────────────────── │
│  History:                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │ Date       │ Action         │ Remark                                            │ │
│  ├────────────┼────────────────┼──────────────────────────────────────────────────│ │
│  │ 05/07/2026 │ Submit Pending │ Dokumen tidak lengkap, Kwitansi tidak sesuai     │ │
│  │            │                │ tanggal, Surat rujukan expired                    │ │
│  └────────────┴────────────────┴──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Context

### Business Logic — Penggabungan Remark

**Trigger:** Submit Pending pada transaksi eClaim Reimbursement

**Logic:**
1. Ambil semua kategori dokumen yang berstatus **Rejected**
2. Kumpulkan remark dari setiap kategori dokumen yang rejected
3. Filter out remark yang kosong/null (hanya yang terisi)
4. Gabungkan menggunakan separator koma + spasi (`, `)
5. Simpan hasil gabungan ke kolom remark klaim
6. Catat remark gabungan di history klaim

**Pseudocode:**
```
remarks = []
for each document_category in claim.document_categories:
    if document_category.status == "Rejected" AND document_category.remark != null AND document_category.remark != "":
        remarks.append(document_category.remark)

if remarks.length > 0:
    claim.remark = remarks.join(", ")
else:
    claim.remark = "" // tetap kosong
```

### Data Flow

```
┌─────────────────────┐     ┌──────────────────────────────┐     ┌───────────────────┐
│ Verifikasi Dokumen  │ --> │ Submit Pending (concat remark)│ --> │ Kolom Remark Klaim│
│ (per kategori)      │     │ separator: koma              │     │ + History Klaim   │
└─────────────────────┘     └──────────────────────────────┘     └───────────────────┘
```

### Database Impact

| Table | Field | Type | Description |
|-------|-------|------|-------------|
| `transactions.claim` (atau equivalent) | `remark` | varchar/text | Menyimpan gabungan remark dari dokumen rejected |
| `transactions.claim_history` (atau equivalent) | `remark` | varchar/text | Menyimpan remark pada record history |
| `transactions.claim_document` (atau equivalent) | `status` | varchar | Status per kategori dokumen (Approved/Rejected) |
| `transactions.claim_document` (atau equivalent) | `remark` | varchar/text | Remark per kategori dokumen |

### API Impact

| # | Endpoint | Method | Impact |
|---|----------|--------|--------|
| 1 | Submit Pending eClaim Reimbursement | POST | Logic penggabungan remark ditambahkan saat proses submit pending |
| 2 | Get Claim Detail / History | GET | Menampilkan remark gabungan di response |

### Access Control

| Role | Akses |
|------|-------|
| Staf Administrasi Klaim | Melakukan submit pending (trigger concat remark) |
| Semua role yang bisa akses history | Melihat remark gabungan di history klaim |

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sistem mengambil semua remark dari kategori dokumen yang berstatus "Rejected" saat submit pending |
| FR-02 | Remark dari beberapa kategori dokumen digabungkan menggunakan separator koma (`, `) |
| FR-03 | Hasil penggabungan disimpan pada kolom remark klaim |
| FR-04 | Jika hanya satu kategori dokumen rejected memiliki remark, remark ditampilkan langsung tanpa koma tambahan |
| FR-05 | Jika tidak ada dokumen rejected atau semua remark kosong, kolom remark tetap kosong (empty string) |
| FR-06 | Remark gabungan tercatat di history klaim saat submit pending |
| FR-07 | Remark yang sudah digabung dapat dilihat ulang di halaman history klaim |
| FR-08 | Hanya remark dari dokumen yang berstatus "Rejected" yang diikutsertakan (dokumen Approved diabaikan) |
| FR-09 | Remark per kategori dokumen yang null/empty string tidak diikutsertakan dalam penggabungan |
| FR-10 | Tidak ada trailing comma atau leading comma pada hasil penggabungan |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Semua kategori dokumen berstatus Approved (tidak ada yang Rejected) | Kolom remark tetap kosong (empty), tidak ada separator |
| EC-02 | Hanya 1 kategori dokumen Rejected dengan remark terisi | Remark langsung ditampilkan tanpa koma (misal: "Dokumen tidak lengkap") |
| EC-03 | Multiple kategori Rejected, tapi sebagian remark-nya kosong/null | Hanya remark yang terisi yang digabungkan, remark kosong diabaikan |
| EC-04 | Semua kategori Rejected tapi semua remark kosong/null | Kolom remark tetap kosong (empty string) |
| EC-05 | Remark per kategori mengandung karakter koma (`,`) di dalamnya | Karakter koma dalam remark tetap termasuk, separator koma menambahkan koma baru antar remark |
| EC-06 | Remark per kategori mengandung karakter spesial (quotes, semicolon, etc.) | Karakter spesial tetap disimpan apa adanya tanpa escaping |
| EC-07 | Remark sangat panjang (banyak kategori rejected, masing-masing remark panjang) | Remark tetap digabungkan seluruhnya, tidak di-truncate (selama tidak melebihi limit kolom DB) |
| EC-08 | Submit pending dilakukan berulang kali pada klaim yang sama | Remark di-update sesuai state terbaru kategori dokumen saat submit |
| EC-09 | Claim yang sudah pernah submit pending, lalu ada perubahan status dokumen, lalu submit pending lagi | Remark di-regenerate berdasarkan kondisi terkini dokumen |
| EC-10 | Remark mengandung whitespace berlebihan (leading/trailing spaces) | Remark di-trim per kategori sebelum digabungkan (asumsi, perlu konfirmasi) |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Penggabungan remark hanya terjadi pada aksi "Submit Pending" — bukan otomatis saat dokumen di-reject |
| A-02 | Separator yang digunakan adalah koma diikuti spasi (`, `) — bukan hanya koma tanpa spasi |
| A-03 | Remark yang digabung berasal dari field remark masing-masing kategori dokumen yang berstatus Rejected |
| A-04 | Urutan penggabungan mengikuti urutan kategori dokumen di database (sequential) |
| A-05 | Tidak ada batasan panjang maksimum untuk remark gabungan (selama masih dalam limit kolom DB) |
| A-06 | Fitur ini hanya berlaku untuk transaksi eClaim Reimbursement (bukan tipe klaim lain) |
| A-07 | History klaim menyimpan snapshot remark pada saat submit pending (tidak berubah retroaktif) |
| A-08 | Kolom remark klaim yang dimaksud adalah kolom remark pada level klaim (bukan per dokumen) |
| A-09 | Jika klaim belum pernah di-submit pending, kolom remark tetap kosong |
| A-10 | Format tampilan remark di history sama persis dengan yang disimpan (tidak ada formatting tambahan) |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Apakah separator koma menggunakan spasi setelahnya (`, `) atau hanya koma (`,`)? Deskripsi JIRA menyebutkan "pemisah koma" | Open — asumsi menggunakan `, ` (koma + spasi) |
| MD-02 | Apakah remark per kategori di-trim (hapus whitespace berlebihan) sebelum digabungkan? | Open |
| MD-03 | Apakah ada limit panjang maksimum untuk kolom remark klaim? (varchar limit di DB) | Open |
| MD-04 | Bagaimana jika remark per kategori sendiri mengandung karakter koma? Apakah ada escaping? | Open — asumsi tidak ada escaping |
| MD-05 | Apakah urutan penggabungan remark mengikuti urutan kategori dokumen tertentu? (by ID, by nama kategori, atau by urutan tampil di UI?) | Open |
| MD-06 | Jika submit pending dilakukan ulang, apakah remark lama di-overwrite atau di-append? | Open — asumsi overwrite dengan state terbaru |
| MD-07 | Endpoint API mana yang memproses submit pending? (path & method) | Open |
| MD-08 | Apakah history menyimpan semua versi remark (jika submit pending berulang) atau hanya yang terbaru? | Open — asumsi setiap submit pending membuat record history baru |
| MD-09 | Apakah fitur ini juga berlaku untuk tipe klaim selain eClaim Reimbursement? | Open — asumsi hanya eClaim Reimbursement |
| MD-10 | Di halaman mana tepatnya remark gabungan ini bisa dilihat? (Detail klaim? List klaim? Keduanya?) | Open |

---

## Risk Assessment

| Risk | Probability | Impact | Level | Mitigation |
|------|------------|--------|-------|------------|
| Remark gabungan terlalu panjang melebihi limit kolom DB | Low | High | **Medium** | Validasi panjang sebelum simpan, gunakan TEXT type jika perlu |
| Separator koma menyebabkan ambiguitas jika remark mengandung koma | Medium | Low | **Low** | Dokumentasikan behavior, pertimbangkan separator lain di masa depan |
| Submit pending berulang menyebabkan remark tidak konsisten | Low | Medium | **Low** | Regenerate remark dari state terkini dokumen |
| Remark tidak muncul di history karena bug pada save logic | Medium | Medium | **Medium** | Test save + retrieve secara end-to-end |
| Race condition jika dokumen di-update bersamaan dengan submit pending | Low | Medium | **Low** | Gunakan transaction lock saat proses submit |
| Remark kosong semua tapi kolom terisi karakter separator | Medium | Medium | **Medium** | Pastikan logic filter null/empty sebelum join |

---

## Sub-tasks

| Key | Summary |
|-----|---------|
| NM-1392 | Subtask 1 |
| NM-1471 | Subtask 2 |

---

## Issue Links

| Type | Key | Summary |
|------|-----|---------|
| causes | ITQ-1243 | (Linked issue) |

---

## References

- Test Cases: [NM-1391 Test Cases](../test-cases/NM-1391-test-cases.md)
- Parent Epic: NM-1130
- Traceability: [Traceability Matrix](../traceability.md)
