# User Story: NM-1267 - Setting Klasifikasi Scoring Klaim

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1267 |
| **Type** | Story |
| **Parent** | NM-1250 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 24 |
| **Story Points** | 3 |
| **Reporter** | Elisabet Sihite |
| **Assignee** | imam.nugroho |
| **Created** | 05/Jun/2026 |
| **Updated** | 30/Jun/2026 |

---

## User Story

**Sebagai** user Staff Klaim HO (kantor pusat)  
**Saya ingin** mengatur dan menyimpan bobot case (klasifikasi scoring) setiap klaim  
**Sehingga** bobot case menjadi parameter assigns otomatis ke setiap verifikator claim

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Dapat melakukan dan menyimpan settingan bobot case |
| AC-2 | Parameter dalam kategori scoring klaim adalah TKP (Pilihan RJTP/RITP/RJTL/RITL), Group (RJ/RI), Product (MC/IDM), Facility (Reimbursement/Cashless), dan Total Score yang ditentukan (input manual) |
| AC-3 | Hanya user kantor pusat yang dapat mengakses setting bobot case |
| AC-4 | Settingan bobot diterapkan di sistem menjadi parameter perhitungan point |
| AC-5 | Bobot Case dapat diubah sewaktu-waktu jika diperlukan |
| AC-6 | Bobot case akan tampil dalam list setting klasifikasi skoring |

### Acceptance Criteria (Out of Scope / Dicoret)

| AC# | Criteria | Reason |
|-----|----------|--------|
| ~~AC-7~~ | ~~Sistem dapat menampilkan dashboard monitoring untuk menampilkan keterangan load dan achieved verifikator~~ | Removed from scope |
| ~~AC-8~~ | ~~Detail Kolom Dashboard (Nama Verifikator, Date, Daily Load, Target Achieved, Achieved, Status)~~ | Removed from scope |
| ~~AC-9~~ | ~~Penetapan Bobot Case bersifat statis setiap hari sehingga tidak diperlukan dilakukan update~~ | Contradicted by AC-5 |

---

## Definition of Done

- [ ] Semua Acceptance Criteria telah terpenuhi dan diverifikasi
- [ ] Tidak ada bug terkait setting bobot case
- [ ] Sudah dilakukan testing oleh QA

---

## Score Pattern

Berikut adalah pola scoring yang telah didefinisikan berdasarkan kombinasi parameter:

| TKP | Group | Facility | Transaction Type | Score |
|-----|-------|----------|-----------------|-------|
| RJTP | RJ | CASHLESS | ManagedCare | 3 |
| RJTP | RJ | CASHLESS | Indemnity | 5 |
| RJTP | RJ | REIMBURSE | ManagedCare | 4 |
| RJTP | RJ | REIMBURSE | Indemnity | 6 |
| RITP | RI | CASHLESS | ManagedCare | 7 |
| RITP | RI | CASHLESS | Indemnity | 8 |
| RITP | RI | REIMBURSE | ManagedCare | 6 |
| RITP | RI | REIMBURSE | Indemnity | 9 |
| RJTL | RJ | CASHLESS | ManagedCare | 4 |
| RJTL | RJ | CASHLESS | Indemnity | 5 |
| RJTL | RJ | REIMBURSE | ManagedCare | 5 |
| RJTL | RJ | REIMBURSE | Indemnity | 7 |
| RITL | RI | CASHLESS | ManagedCare | 8 |
| RITL | RI | CASHLESS | Indemnity | 10 |
| RITL | RI | REIMBURSE | ManagedCare | 7 |
| RITL | RI | REIMBURSE | Indemnity | 9 |

**Measurement:** minutes/case

### Standard Waktu Pengerjaan

**MC Kolektif Verifikator:**

| TKP | Waktu |
|-----|-------|
| RJTP | 2 per kasus |
| RJTL | 3 menit/kasus |
| RITP | 7 menit/kasus |
| RITL | 10 menit/kasus |
| O RITL | 6 menit/kasus |
| O RJTL/RJTP | 3 menit/kasus |

**MC Individu Verifikator / REIMBURSE:**

| TKP | Waktu |
|-----|-------|
| RITL | 10 menit/kasus |
| RJTL | 5 menit/kasus |

**IDM Kolektif Verifikator:**

| TKP | Waktu |
|-----|-------|
| RJTL / RJTP | 5 menit/kasus |
| RITL / RITP | 10 menit/kasus |

---

## Wireframe Description

### 1. Navigasi - Sub Menu Baru

- Penambahan sub menu **"Setting Score Parameter"** di sidebar kiri
- Lokasi: di bawah menu "Manajemen Klaim", sejajar dengan "Cross Verification"

### 2. Halaman List - Claim Scoring Setting

```
┌──────────────────────────────────────────────────────────────────────┐
│  CLAIM SCORING SETTING                                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [+ Tambah Setting]                                                  │
│                                                                      │
├──────────┬───────┬───────┬───────────┬─────────────┬───────┬────────┤
│  Action  │  TKP  │ Group │ Facility  │ Transaction │ Score │ Measurement │
├──────────┼───────┼───────┼───────────┼─────────────┼───────┼────────┤
│  [Edit]  │ RJTP  │  RJ   │ CASHLESS  │ ManagedCare │   3   │ minutes/case │
│  [Edit]  │ RJTP  │  RJ   │ CASHLESS  │ Indemnity   │   5   │ minutes/case │
│  [Edit]  │ ...   │ ...   │ ...       │ ...         │  ...  │ ...          │
├──────────┴───────┴───────┴───────────┴─────────────┴───────┴────────┤
│  Showing 1-16 of 16 entries                                          │
└──────────────────────────────────────────────────────────────────────┘
```

### 3. Form Input - Claim Score Setting

```
┌──────────────────────────────────────────────────────────────────────┐
│  FORM - CLAIM SCORING SETTING                                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TKP                                                                 │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih TKP                    │                                  │
│  └────────────────────────────────┘                                  │
│  ( RJTP / RITP / RJTL / RITL )                                      │
│                                                                      │
│  Group                                                               │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih Group                  │                                  │
│  └────────────────────────────────┘                                  │
│  ( RJ / RI )                                                         │
│                                                                      │
│  Facility                                                            │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih Facility               │                                  │
│  └────────────────────────────────┘                                  │
│  ( CASHLESS / REIMBURSE )                                            │
│                                                                      │
│  Transaction Type                                                    │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih Transaction            │                                  │
│  └────────────────────────────────┘                                  │
│  ( ManagedCare / Indemnity )                                         │
│                                                                      │
│  Score                                                               │
│  ┌────────────────────────────────┐                                  │
│  │ [ number input, max: 10 ]      │                                  │
│  └────────────────────────────────┘                                  │
│                                                                      │
│  Measurement                                                         │
│  ┌────────────────────────────────┐                                  │
│  │ ▼ Pilih Measurement            │                                  │
│  └────────────────────────────────┘                                  │
│  ( minutes/case )                                                    │
│                                                                      │
│  ┌──────────┐  ┌──────────┐                                         │
│  │  Simpan  │  │  Batal   │                                         │
│  └──────────┘  └──────────┘                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Technical Context

### Database Schema

**Table:** `public.config_claim_score`

| Column | Type | Description |
|--------|------|-------------|
| tkp | VARCHAR | Tipe Klaim Perawatan (RJTP/RITP/RJTL/RITL) |
| tkp_group | VARCHAR | Group (RJ/RI) |
| facility | VARCHAR | Facility type (CASHLESS/REIMBURSE) |
| transaction_type | VARCHAR | Transaction type (ManagedCare/Indemnity) |
| score | INTEGER | Bobot case (1-10) |
| measurement | VARCHAR | Satuan pengukuran (nullable, e.g., minutes/case) |
| created_at | TIMESTAMP | Timestamp pembuatan record |
| created_by | VARCHAR | User yang membuat record |
| modified_at | TIMESTAMP | Timestamp modifikasi terakhir (nullable) |
| modified_by | VARCHAR | User yang terakhir memodifikasi (nullable) |

### Seed Data (Initial Insert)

```sql
INSERT INTO public.config_claim_score
  (tkp, tkp_group, facility, transaction_type, score, measurement, created_at, created_by, modified_at, modified_by)
VALUES
  ('RJTP', 'RJ', 'CASHLESS', 'ManagedCare', 3, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTP', 'RJ', 'CASHLESS', 'Indemnity', 5, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTP', 'RJ', 'REIMBURSE', 'ManagedCare', 4, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTP', 'RJ', 'REIMBURSE', 'Indemnity', 6, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITP', 'RI', 'CASHLESS', 'ManagedCare', 7, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITP', 'RI', 'CASHLESS', 'Indemnity', 8, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITP', 'RI', 'REIMBURSE', 'ManagedCare', 6, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITP', 'RI', 'REIMBURSE', 'Indemnity', 9, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTL', 'RJ', 'CASHLESS', 'ManagedCare', 4, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTL', 'RJ', 'CASHLESS', 'Indemnity', 5, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTL', 'RJ', 'REIMBURSE', 'ManagedCare', 5, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RJTL', 'RJ', 'REIMBURSE', 'Indemnity', 7, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITL', 'RI', 'CASHLESS', 'ManagedCare', 8, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITL', 'RI', 'CASHLESS', 'Indemnity', 10, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITL', 'RI', 'REIMBURSE', 'ManagedCare', 7, NULL, NOW(), 'SYSTEM', NULL, NULL),
  ('RITL', 'RI', 'REIMBURSE', 'Indemnity', 9, NULL, NOW(), 'SYSTEM', NULL, NULL);
```

### Access Control

- **Allowed:** User kantor pusat (HO) — role Verifikator Pusat
- **Denied:** User cabang / non-HO

### Relationship to Other Features

- Bobot case digunakan sebagai parameter untuk **auto-assign klaim ke verifikator**
- Score menjadi faktor dalam kalkulasi **daily load** dan distribusi kerja verifikator

---

## Sub-tasks

| Key | Summary | Status |
|-----|---------|--------|
| NM-1287 | Subtask 1 | - |
| NM-1288 | Subtask 2 | - |
| NM-1289 | Subtask 3 | - |
| NM-1290 | Subtask 4 | - |
| NM-1291 | Subtask 5 | - |
| NM-1331 | Subtask 6 | - |
| NM-1360 | Subtask 7 | - |

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sistem menampilkan halaman "Claim Scoring Setting" dengan tabel list berisi kolom: Action, TKP, Group, Facility, Transaction, Score, Measurement |
| FR-02 | Terdapat tombol [+ Tambah Setting] untuk menambah entry scoring baru |
| FR-03 | Form input berisi field: TKP (dropdown), Group (dropdown), Facility (dropdown), Transaction Type (dropdown), Score (number input max 10), Measurement (dropdown) |
| FR-04 | Form memiliki tombol Simpan dan Batal |
| FR-05 | Data yang disimpan langsung muncul di list setting klasifikasi scoring |
| FR-06 | Setiap baris memiliki tombol [Edit] untuk mengubah bobot case |
| FR-07 | Hanya user kantor pusat (HO) yang dapat mengakses halaman ini |
| FR-08 | Perubahan bobot case berlaku langsung sebagai parameter perhitungan point untuk assign klaim |
| FR-09 | Terdapat penambahan sub menu "Setting Score Parameter" di sidebar navigasi |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Score > 10 | Validasi error, input ditolak |
| EC-02 | Score = 0 atau negatif | Validasi error |
| EC-03 | Input non-numerik pada field Score | Input ditolak |
| EC-04 | Duplikat kombinasi TKP+Group+Facility+Transaction | Error, tidak boleh duplikat |
| EC-05 | User non-HO akses via direct URL | Redirect ke unauthorized |
| EC-06 | Submit form dengan field kosong | Validasi mandatory field |
| EC-07 | Klik Batal setelah isi form | Data tidak tersimpan |
| EC-08 | Concurrent edit oleh 2 user | TBD — perlu klarifikasi handling |
| EC-09 | Score diubah saat klaim sedang diproses | TBD — perlu klarifikasi |
| EC-10 | Kombinasi TKP dan Group tidak konsisten | Perlu validasi mapping |

---

## Assumptions

1. Mapping TKP ↔ Group bersifat tetap: RJTP/RJTL → RJ, RITP/RITL → RI
2. Measurement saat ini hanya 1 opsi: `minutes/case`
3. Score bersifat integer (1-10)
4. Tidak ada fitur Delete — hanya Add dan Edit
5. Role "kantor pusat" sudah terdefinisi di user management existing
6. Dashboard monitoring (dicoret) tidak termasuk scope
7. 16 kombinasi adalah set lengkap (4 TKP × 2 Facility × 2 Transaction)
8. Perubahan score berlaku real-time untuk assign klaim berikutnya

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Validasi minimum score — boleh 0? | Open |
| MD-02 | Apakah kombinasi TKP+Group+Facility+Transaction harus unik? | Assumed: Yes |
| MD-03 | Apakah ada fitur Delete? | Assumed: No |
| MD-04 | Apakah Group otomatis terisi berdasarkan TKP? | Open |
| MD-05 | Apa terjadi jika score diubah saat klaim sedang ter-assign? | Open |
| MD-06 | Apakah ada audit trail/history perubahan? | Open |
| MD-07 | Relasi score vs Standard Waktu Pengerjaan? | Open |
| MD-08 | Apakah ada konfirmasi sebelum Simpan? | Open |
| MD-09 | Role apa saja yang termasuk "kantor pusat"? | Open |
| MD-10 | Apakah ada notifikasi setelah simpan/gagal? | Open |
| MD-11 | Field measurement nullable — wajib diisi di form? | Open |
| MD-12 | Tombol Tambah aktif/disabled jika semua 16 kombinasi terisi? | Open |

---

## References

- Test Cases: [NM-1267 Test Cases](../test-cases/NM-1267-test-cases.md)
- Feature File: `src/features/scoring/settingKlasifikasiScoring.feature`
- Traceability: [Traceability Matrix](../traceability.md)
