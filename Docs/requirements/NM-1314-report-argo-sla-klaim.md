# REQ: NM-1314 - New Sub-menu Report Argo & SLA Klaim

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1314 |
| **Type** | Story |
| **Parent** | NM-137 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 25 |
| **Reporter** | Feby Janiar |
| **Assignee** | Idellia Muthia Nurbaisa |
| **Created** | 22/Jun/2026 |
| **Updated** | 07/Jul/2026 |

---

## Description

Penambahan sub menu "Report SLA" di dalam menu Monitoring pada aplikasi Claim Verification. Halaman ini berfungsi sebagai reporting tool untuk melihat dan menganalisis data SLA klaim (Service Level Agreement) termasuk Argo Claim (counter hari kerja berjalan). Halaman ini bersifat read-only reporting — semua data SLA dan Argo sudah dihitung dan disimpan di database oleh service lain.

---

## Scope

### Module
- **Application:** New MiCare - Claim Verification
- **Menu:** Monitoring > Report SLA
- **Type:** Reporting / Inquiry

### Features
1. Sub menu navigasi "Report SLA" dengan role-based access control
2. Filter/search area dengan tiering akses per role
3. Tabel inquiry dengan 12 kolom output
4. Pagination (10 per page)
5. Export to Excel (.xlsx)

---

## Tiering Akses Filter KOPS & KLY

| Role | Filter KOPS | Filter KLY | Scope Data |
|------|-------------|------------|------------|
| Admin | Tidak tampil | Tidak tampil | Desentralisasi sesuai wilayah user |
| Verifikator | Tidak tampil | Tidak tampil | Desentralisasi sesuai wilayah user |
| Ka. KLY | Tidak tampil | Tidak tampil | Desentralisasi sesuai wilayah user |
| Kanit | Tidak tampil | Tampil | KLY dalam KOPS user |
| SPV | Tidak tampil | Tampil | KLY dalam KOPS user |
| Kepala Departemen | Tampil | Tampil | Semua KOPS Indonesia |
| Kepala Divisi | Tampil | Tampil | Semua KOPS Indonesia |
| User HO | Tampil | Tampil | Semua KOPS Indonesia |

### Aturan Filter KOPS & KLY

1. Dropdown KOPS dan KLY adalah dua field terpisah (single select)
2. Untuk Kanit/SPV: dropdown KLY hanya menampilkan KLY dalam cakupan KOPS user yang login
3. Untuk Kadept/Kadiv/HO: dropdown KOPS berisi semua KOPS Indonesia. Jika KOPS dipilih, dropdown KLY menyesuaikan (dependent dropdown)
4. KOPS dipilih + KLY kosong = data seluruh KLY dalam KOPS tersebut
5. KOPS + KLY dipilih = data hanya dari KLY spesifik
6. Tidak ada opsi "All/Semua". Default state: blank
7. KLY dropdown di-reset ketika KOPS diganti

---

## Filter / Search Fields

| No | Field | Tipe Input | Visible untuk Role | Behaviour |
|----|-------|------------|-------------------|-----------|
| 1 | Facility | Dropdown (single select) | Semua role | Opsi: Reimburse, Cashless. Default: blank |
| 2 | Range Tanggal | Date Picker (from - to) | Semua role | Basis filter: **Receive Date Claim** |
| 3 | No Claim / No Register | Text Input | Semua role | Pencarian **contains** (partial match). Trim whitespace. |
| 4 | KOPS | Dropdown (single select) | Kadept, Kadiv, HO | Berisi semua KOPS Indonesia |
| 5 | KLY | Dropdown (single select) | Kanit, SPV, Kadept, Kadiv, HO | Isi sesuai tiering per role |

### Tombol Aksi
- **Search** — Apply filter, tampilkan data sesuai kriteria. Reset pagination ke page 1.
- **Reset Filter** — Clear semua filter ke blank, tampilkan ulang seluruh data default. Reset pagination ke page 1.

---

## Output Columns (Tabel Inquiry & Excel)

| No | Nama Kolom | Keterangan | Data Source |
|----|-----------|------------|-------------|
| 1 | No Claim | Nomor klaim | Database |
| 2 | Date of Service | Tanggal layanan | Database |
| 3 | Receive Date Claim | Tanggal klaim diterima sistem | Database |
| 4 | Verifikator Receive Date | Tanggal klaim diterima Verifikator | Database |
| 5 | Kanit Approve Date | Tanggal disetujui Kepala Unit | Database |
| 6 | Send to FIS Date | Tanggal kirim ke Finance | Database |
| 7 | Paid Date | Tanggal klaim dibayar | Database |
| 8 | SLA Admin | Total SLA Admin (hari kerja) | Database (pre-calculated) |
| 9 | SLA Verifikator | Total SLA Verifikator (hari kerja) | Database (pre-calculated) |
| 10 | SLA Paid | Total SLA Paid/pembayaran (hari kerja) | Database (pre-calculated) |
| 11 | SLA All | Total hari kerja dari diterima sampai dibayar | Database (pre-calculated) |
| 12 | Argo Claim | Counter hari kerja sejak klaim diterima | Database (pre-calculated) |

---

## Export Specification

| Attribute | Specification |
|-----------|--------------|
| Format | .xlsx (Excel) |
| File Naming | `ReportArgoSLA_YYYYMMDDHHmmss.xlsx` |
| Example | `ReportArgoSLA_20260708110803.xlsx` |
| Max Row Limit | Tidak ada limit |
| Content | Konsisten dengan data yang tampil di tabel (sesuai filter aktif) |
| Columns | 12 kolom, sama dengan tabel inquiry |
| No Filter | Seluruh data sesuai hak akses user |
| With Filter | Hanya data hasil filter |
| Loading | Modal loading ditampilkan selama proses export |

---

## UI/UX Specifications

| Aspect | Specification |
|--------|--------------|
| Pagination | 10 row per page, tidak ada opsi ubah |
| Sorting | Default sort dari backend, tidak ada custom sort per kolom |
| Loading | Modal loading saat fetch data dan saat export |
| Empty State | Pesan "Tidak ada data" saat filter menghasilkan 0 results |
| Dropdown Behavior | Single select, default blank, no "All" option |
| Dependent Dropdown | KLY di-reset saat KOPS diganti |
| SLA/Argo Display | Tidak ada color coding atau threshold warning |

---

## Functional Requirements

| FR# | Category | Requirement |
|-----|----------|-------------|
| FR-01 | Navigation | Sub menu "Report SLA" tersedia di dalam menu Monitoring pada sidebar, sejajar dengan COB Letter dan Pending Claim |
| FR-02 | Access Control | Sub menu hanya visible dan accessible oleh role: Admin, Verifikator, Ka. KLY, Kanit, SPV, Kadept, Kadiv, User HO |
| FR-03 | Access Control | User tanpa role authorized tidak dapat melihat menu maupun akses via direct URL (redirect 403) |
| FR-04 | Layout | Halaman memiliki 2 area: Filter/Search area (atas) dan Tabel Inquiry (bawah) |
| FR-05 | Default Data | Default load menampilkan seluruh data klaim yang sudah diterima sesuai cakupan wilayah dan hak akses user |
| FR-06 | Filter | Filter Facility: dropdown single select, opsi Reimburse / Cashless, default blank |
| FR-07 | Filter | Filter Range Tanggal: date picker from-to, basis kolom Receive Date Claim |
| FR-08 | Filter | Filter No Claim / No Register: text input, pencarian contains (partial match) |
| FR-09 | Filter | Filter KOPS: dropdown single select, hanya tampil untuk Kadept/Kadiv/HO, berisi semua KOPS Indonesia |
| FR-10 | Filter | Filter KLY: dropdown single select, tampil untuk Kanit/SPV/Kadept/Kadiv/HO |
| FR-11 | Tiering | Kanit/SPV: KLY hanya menampilkan data dalam cakupan KOPS user yang login |
| FR-12 | Tiering | Kadept/Kadiv/HO: KLY menyesuaikan KOPS yang dipilih (dependent dropdown) |
| FR-13 | Tiering | KOPS dipilih + KLY kosong = data seluruh KLY dalam KOPS tersebut |
| FR-14 | Tiering | KOPS + KLY dipilih = data hanya dari KLY spesifik |
| FR-15 | Filter | Tidak ada opsi "All" di dropdown. Default state: blank |
| FR-16 | Action | Tombol Search: apply filter, modal loading, reset pagination ke page 1 |
| FR-17 | Action | Tombol Reset Filter: clear semua ke blank, tampilkan data default, reset pagination |
| FR-18 | Output | Tabel menampilkan 12 kolom output sesuai spesifikasi |
| FR-19 | Data Source | Semua nilai SLA dan Argo Claim diambil dari database (pre-calculated) |
| FR-20 | Pagination | Tabel pagination max 10 row per page |
| FR-21 | Sort | Default sort dari backend, tidak ada custom sort per kolom |
| FR-22 | UX | Modal loading saat fetch data dan saat export |
| FR-23 | Export | Tombol "Export SLA Report" menghasilkan file .xlsx |
| FR-24 | Export | Tanpa filter: Excel berisi seluruh data sesuai hak akses user |
| FR-25 | Export | Dengan filter: Excel hanya berisi data hasil filter |
| FR-26 | Export | Tidak ada limit jumlah row export |
| FR-27 | Export | Naming: ReportArgoSLA_YYYYMMDDHHmmss.xlsx |
| FR-28 | Export | File Excel memuat 12 kolom sama dengan tabel inquiry |
| FR-29 | Dropdown | KLY di-reset saat KOPS diganti (dependent dropdown behavior) |

---

## Non-Functional Requirements

| NFR# | Category | Requirement |
|------|----------|-------------|
| NFR-01 | Performance | Halaman harus load dalam waktu wajar meskipun data banyak (modal loading ditampilkan) |
| NFR-02 | Performance | Export Excel tanpa limit harus handle tanpa timeout |
| NFR-03 | Security | Input No Claim/No Register harus di-sanitize terhadap SQL injection dan XSS |
| NFR-04 | Security | Role-based access control divalidasi di server-side, bukan hanya UI |
| NFR-05 | Usability | Modal loading memberikan feedback visual kepada user saat proses berlangsung |
| NFR-06 | Reliability | Concurrent export oleh multiple user harus ditangani tanpa crash |
| NFR-07 | Compatibility | File Excel (.xlsx) harus bisa dibuka di Microsoft Excel dan Google Sheets |

---

## Dependencies

| # | Dependency | Description |
|---|------------|-------------|
| DEP-01 | Data Master KOPS | Data master KOPS harus tersedia di modul master data |
| DEP-02 | Data Master KLY | Data master KLY beserta mapping ke KOPS harus tersedia |
| DEP-03 | User Role Mapping | Mapping role user ke KOPS/KLY harus tersedia di user management |
| DEP-04 | SLA Calculation Service | Service perhitungan SLA harus sudah running dan menyimpan data ke DB |
| DEP-05 | Argo Calculation Service | Service perhitungan Argo Claim harus sudah running dan menyimpan data ke DB |
| DEP-06 | Menu Monitoring | Menu Monitoring sudah ada di sidebar aplikasi |

---

## Related Issues

| Key | Summary | Relation |
|-----|---------|----------|
| NM-137 | Parent Epic | Parent |
| NM-1326 | Subtask 1 | Subtask |
| NM-1327 | Subtask 2 | Subtask |
| NM-1328 | Subtask 3 | Subtask |
| NM-1333 | Subtask 4 | Subtask |
| NM-1367 | Subtask 5 | Subtask |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | |
| Business Analyst | | | |
| Tech Lead | | | |
| QA Lead | | | |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 08/Jul/2026 | QA | Initial requirements document |
