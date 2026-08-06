# User Story: NM-1447 - Menampilkan Score Claim

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1447 |
| **Type** | Story |
| **Parent** | NM-1441 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | High |
| **Sprint** | Claim Operation Sprint 26 |
| **Story Points** | 3 |
| **Reporter** | pujiyanto255 |
| **Assignee** | Muhammad Taufiqul Rahman |
| **Created** | 17/Jul/2026 |
| **Updated** | 29/Jul/2026 |

---

## User Story

**Sebagai** Admin / Verifikator / SPV / Kanit Klaim / Staff HO / Kepala Departemen Klaim  
**Saya ingin** melihat score klaim pada halaman-halaman existing yang menampilkan daftar klaim  
**Sehingga** saya dapat mengetahui bobot klaim yang sedang diproses tanpa perlu membuka halaman lain

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Role Admin — kolom "Claim Score" muncul di halaman View List Reimburse, posisi setelah kolom Received Date |
| AC-2 | Role Admin — kolom "Claim Score" muncul di halaman Pending Eclaim, posisi setelah kolom Receive Date |
| AC-3 | Role Admin — kolom "Claim Score" muncul di halaman Follow Up Pending Claim, posisi setelah kolom Status |
| AC-4 | Role Verifikator, Kanit Klaim, SPV, HO, Kadep Klaim — kolom "Claim Score" muncul di halaman List Claim pada module Adjustment, posisi sebelum kolom Provider Name |
| AC-5 | Score yang ditampilkan adalah nilai angka final (integer) — tanpa breakdown detail TKP/Facility/Transaction |
| AC-6 | Klaim yang belum memiliki score (null) menampilkan tanda "-" (dash) atau kosong |
| AC-7 | Score bersifat read-only — tidak dapat diedit dari halaman-halaman ini |

---

## Definition of Done

- [ ] Semua Acceptance Criteria telah terpenuhi dan diverifikasi
- [ ] Lolos QA testing
- [ ] Fitur sudah di-review oleh PO dan disetujui
- [ ] Tidak ada bug kritikal yang belum terselesaikan
- [ ] Dokumentasi diperbarui jika ada perubahan alur atau rule bisnis
- [ ] Fitur sudah di-deploy ke development

---

## Wireframe Description

### 1. View List Reimburse (Role: Admin)

**Menu Path:** Reimbursement > List Reimbursement  
**Endpoint:** GET `/api/Reimbursement/V2/GetReimburse`

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  List Reimbursement                                                                   │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  [...existing filters...]                                                            │
│                                                                                      │
├───────┬──────────┬───────────────┬─────────────┬─────────────┬──────────────┬────────┤
│  No   │ Claim No │ ... existing  │ Received    │ Claim Score │ ... next     │ ...    │
│       │          │   columns     │ Date        │             │   columns    │        │
├───────┼──────────┼───────────────┼─────────────┼─────────────┼──────────────┼────────┤
│  1    │ CLM001   │ ...           │ 28/07/2026  │ 85          │ ...          │        │
│  2    │ CLM002   │ ...           │ 27/07/2026  │ -           │ ...          │        │
│  3    │ CLM003   │ ...           │ 26/07/2026  │ 42          │ ...          │        │
├───────┴──────────┴───────────────┴─────────────┴─────────────┴──────────────┴────────┤
│  Showing 1-X of X entries                                                            │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 2. Pending Eclaim (Role: Admin)

**Menu Path:** (Pending Eclaim menu)  
**Endpoint:** GET `/api/Reimbursement/V2/GetReimburse` (dengan parameter `is3307=true`)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  Pending Eclaim                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
├───────┬──────────┬───────────────┬─────────────┬─────────────┬──────────────┬────────┤
│  No   │ Claim No │ ... existing  │ Receive     │ Claim Score │ ... next     │ ...    │
│       │          │   columns     │ Date        │             │   columns    │        │
├───────┼──────────┼───────────────┼─────────────┼─────────────┼──────────────┼────────┤
│  1    │ ECL001   │ ...           │ 28/07/2026  │ 72          │ ...          │        │
│  2    │ ECL002   │ ...           │ 27/07/2026  │ -           │ ...          │        │
├───────┴──────────┴───────────────┴─────────────┴─────────────┴──────────────┴────────┤
│  Showing 1-X of X entries                                                            │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Follow Up Pending Claim (Role: Admin)

**Menu Path:** (Follow Up Pending Claim menu)  
**Endpoint:** GET `/api/Claim/GetClaimByProvider`

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  Follow Up Pending Claim                                                              │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
├───────┬──────────┬───────────────┬──────────┬─────────────┬──────────────┬───────────┤
│  No   │ Claim No │ ... existing  │ Status   │ Claim Score │ ... next     │ ...       │
│       │          │   columns     │          │             │   columns    │           │
├───────┼──────────┼───────────────┼──────────┼─────────────┼──────────────┼───────────┤
│  1    │ FUP001   │ ...           │ 2205     │ 90          │ ...          │           │
│  2    │ FUP002   │ ...           │ 2206     │ -           │ ...          │           │
├───────┴──────────┴───────────────┴──────────┴─────────────┴──────────────┴───────────┘
```

### 4. List Claim — Module Adjustment (Role: Verifikator, Kanit Klaim, SPV, HO, Kadep Klaim)

**Menu Path:** Claim > Claims > List > Filter Register (status 5003/5004)  
**Endpoint:** GET `/api/Claim/V3/GetClaimByProvider`

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  List Claim - Adjustment                                                              │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
├───────┬──────────┬───────────────┬─────────────┬───────────────┬─────────────────────┤
│  No   │ Claim No │ ... existing  │ Claim Score │ Provider Name │ ... next columns    │
│       │          │   columns     │             │               │                     │
├───────┼──────────┼───────────────┼─────────────┼───────────────┼─────────────────────┤
│  1    │ ADJ001   │ ...           │ 55          │ RS Siloam     │ ...                 │
│  2    │ ADJ002   │ ...           │ -           │ RS Hermina    │ ...                 │
│  3    │ ADJ003   │ ...           │ 78          │ RS Pondok     │ ...                 │
├───────┴──────────┴───────────────┴─────────────┴───────────────┴─────────────────────┤
│  Showing 1-X of X entries                                                            │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Catatan Module Adjustment:**
- Status 5003: User Verifikator harus klik "Receive" terlebih dahulu lalu "Edit"
- Status 5004: User Verifikator langsung bisa "Edit"

---

## Technical Context

### API Enhancement (dari Developer)

| # | Endpoint | Method | Enhancement |
|---|----------|--------|-------------|
| 1 | `/api/Reimbursement/V2/GetReimburse` | GET | Field `claim_score` (int, nullable) ditambahkan di response body |
| 2 | `/api/Reimbursement/V2/GetReimburse` (is3307=true) | GET | Same — field `claim_score` di response. Dibedakan parameter `is3307=true` |
| 3 | `/api/Claim/GetClaimByProvider` | GET | Field `claim_score` (int, nullable) ditambahkan di response body |
| 4 | `/api/Claim/V3/GetClaimByProvider` | GET | Field `claim_score` (int, nullable) ditambahkan di response body |

### Sample Query Parameters

| # | Halaman | Sample Params |
|---|---------|---------------|
| 1 | View List Reimburse | `?page=1&size=10&rangeType=receive_date&claimStatus=1199&productCode=IDM&isJetrules=false&is3307=false` |
| 2 | Pending Eclaim | `?page=1&size=10&claimStatus=3307&is3307=true&productCode=IDM` |
| 3 | Follow Up Pending Claim | `?page=1&size=10&status=2205&status=2206&branchCode=1101&isClaimMigration=false&useRemarkPending=true&productCode=IDM` |
| 4 | List Claim Module Adjustment | `?page=1&size=10&registerNo=1101R072600042&useRemarkPending=true` |

### Data Source

- **Table:** `transactions.claim_extend`
- **Join:** `LEFT JOIN transactions.claim_extend ON claim_no`
- **Field:** `claim_score` (integer, nullable)
- Kolom berasal dari proses scoring sebelumnya (terkait NM-1267 Setting Klasifikasi Scoring)

### Access Control per Halaman

| Halaman | Role yang Bisa Akses |
|---------|---------------------|
| View List Reimburse | Admin |
| Pending Eclaim | Admin |
| Follow Up Pending Claim | Admin |
| List Claim Module Adjustment | Verifikator, SPV, Kanit Klaim, Staff HO, Kadep Klaim |

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Kolom "Claim Score" muncul di tabel View List Reimburse setelah kolom Received Date (Role: Admin) |
| FR-02 | Kolom "Claim Score" muncul di tabel Pending Eclaim setelah kolom Receive Date (Role: Admin) |
| FR-03 | Kolom "Claim Score" muncul di tabel Follow Up Pending Claim setelah kolom Status (Role: Admin) |
| FR-04 | Kolom "Claim Score" muncul di tabel List Claim Module Adjustment sebelum kolom Provider Name (Role: Verifikator, Kanit Klaim, SPV, HO, Kadep Klaim) |
| FR-05 | Nilai yang ditampilkan adalah angka integer final (bukan breakdown per komponen) |
| FR-06 | Klaim yang belum memiliki score (claim_score = null) menampilkan tanda "-" |
| FR-07 | Kolom Claim Score bersifat read-only (tidak ada interaksi edit) |
| FR-08 | Response API endpoint GET `/api/Reimbursement/V2/GetReimburse` menyertakan field `claim_score` (int, nullable) |
| FR-09 | Response API endpoint GET `/api/Claim/GetClaimByProvider` menyertakan field `claim_score` (int, nullable) |
| FR-10 | Response API endpoint GET `/api/Claim/V3/GetClaimByProvider` menyertakan field `claim_score` (int, nullable) |
| FR-11 | Data claim_score bersumber dari `LEFT JOIN transactions.claim_extend ON claim_no` |
| FR-12 | Kolom Claim Score tetap tampil meskipun semua klaim belum memiliki score |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Semua klaim pada halaman belum memiliki score (seluruh null) | Kolom "Claim Score" tetap tampil, semua baris menampilkan "-" |
| EC-02 | Klaim memiliki score = 0 | Menampilkan angka "0" (bukan "-"), karena 0 adalah nilai valid |
| EC-03 | Klaim memiliki score sangat tinggi (misal 999 atau 9999) | Angka tampil lengkap tanpa truncate, tabel tidak pecah layout |
| EC-04 | Data claim_extend tidak ada untuk suatu claim_no (LEFT JOIN return null) | Menampilkan "-" karena claim_score = null |
| EC-05 | Pagination — score tetap konsisten saat berpindah halaman | Setiap halaman menampilkan score yang benar sesuai data masing-masing klaim |
| EC-06 | Filter diterapkan — score tetap muncul pada hasil filter | Kolom Claim Score tetap tampil dan menampilkan data yang benar pada hasil filter |
| EC-07 | Sort/ordering berdasarkan kolom lain — score tetap mengikuti row yang benar | Score menempel pada klaim masing-masing, tidak terjadi data misalignment |
| EC-08 | Response time API meningkat karena JOIN tambahan | Response time masih dalam threshold acceptable (< 3 detik) |
| EC-09 | User mencoba inspect/edit score via browser DevTools | Tidak ada input field — score bukan editable element |
| EC-10 | Kolom score pada halaman yang bukan hak akses user | User hanya melihat halaman sesuai role-nya; kolom score hanya muncul di halaman yang sesuai |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Data `claim_score` sudah tersedia di tabel `transactions.claim_extend` untuk klaim yang sudah melalui proses scoring |
| A-02 | Nilai `claim_score` berupa integer (bukan decimal/float) |
| A-03 | Kolom "Claim Score" adalah display-only, tidak ada sorting/filtering berdasarkan score di story ini (dikonfirmasi) |
| A-04 | Tidak ada perubahan pada urutan kolom existing — hanya penambahan kolom baru di posisi yang ditentukan |
| A-05 | Header kolom menggunakan label "Claim Score" (konsisten di semua halaman) |
| A-06 | Endpoint yang sama (`/api/Reimbursement/V2/GetReimburse`) digunakan untuk View List Reimburse dan Pending Eclaim, dibedakan oleh parameter `is3307` |
| A-07 | Penambahan LEFT JOIN tidak signifikan mempengaruhi performance karena `claim_no` sudah terindeks |
| A-08 | Story ini murni UI display — tidak ada logic bisnis tambahan terkait score |
| A-09 | Role "Admin" pada konteks ini merujuk pada user admin yang mengakses menu Reimbursement / Follow Up Pending |
| A-10 | Module Adjustment diakses melalui: Claim > Claims > List > Filter Register dengan status 5003 atau 5004 |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Apakah ada sorting/filtering berdasarkan Claim Score di story ini, atau hanya display? | Resolved — Tidak ada sorting by score, hanya display |
| MD-02 | Untuk null score, apakah final menggunakan "-" (dash) atau kosong (empty)? Deskripsi menyebutkan keduanya | Resolved — Tampilkan "-" (dash) |
| MD-03 | Apakah score = 0 ditampilkan sebagai "0" atau "-"? (Perlu konfirmasi apakah 0 dianggap "belum memiliki score") | Resolved — Ditampilkan sebagai "0" (valid value) |
| MD-04 | Berapa range min-max score yang valid? Apakah ada constraint? | Open |
| MD-05 | Apakah ada tooltip/hover pada nilai score yang menampilkan detail breakdown? | Open — deskripsi menyebutkan "tanpa breakdown" tapi mungkin perlu konfirmasi |
| MD-06 | Halaman Pending Eclaim — menu path-nya apa? Apakah di bawah menu Reimbursement juga? | Resolved — Menu terpisah (bukan sub-menu Reimbursement) |
| MD-07 | Follow Up Pending Claim — apakah hanya bisa diakses Role Admin atau role lain juga? | Open |
| MD-08 | Apakah kolom "Claim Score" responsive (hidden di mobile/tablet) atau selalu visible? | Open |

---

## Risk Assessment

| Risk | Probability | Impact | Level | Mitigation |
|------|------------|--------|-------|------------|
| Performance degradation karena LEFT JOIN pada 4 endpoint | Medium | Medium | **Medium** | Performance test pada data besar, pastikan index pada claim_no |
| Posisi kolom salah (misalignment dengan kolom existing) | Low | Low | **Low** | Verify posisi secara visual per halaman |
| Null handling tidak konsisten antar endpoint | Medium | Low | **Medium** | Standardisasi di API response — null → frontend display "-" |
| Role/access control salah — score tampil di halaman yang seharusnya tidak | Low | Medium | **Low** | Test per role per halaman |
| Data claim_extend belum tersedia untuk klaim lama (migrasi) | Medium | Low | **Medium** | Null handling sudah cover case ini (tampil "-") |

---

## Sub-tasks

| Key | Summary |
|-----|---------|
| NM-1449 | Subtask 1 |
| NM-1450 | Subtask 2 |
| NM-1451 | Subtask 3 |
| NM-1452 | Subtask 4 |
| NM-1453 | Subtask 5 |
| NM-1454 | Subtask 6 |
| NM-1455 | Subtask 7 |
| NM-1456 | Subtask 8 |
| NM-1533 | Subtask 9 |
| NM-1534 | Subtask 10 |
| NM-1538 | Subtask 11 |

---

## References

- Test Cases: [NM-1447 Test Cases](../test-cases/NM-1447-test-cases.md)
- Parent Epic: NM-1441
- Related Story: NM-1267 (Setting Klasifikasi Scoring Klaim) — scoring engine yang menghasilkan claim_score
- Related Story: NM-1383 (Auto Distribute per KOPS) — menggunakan score untuk distribusi
- Traceability: [Traceability Matrix](../traceability.md)
