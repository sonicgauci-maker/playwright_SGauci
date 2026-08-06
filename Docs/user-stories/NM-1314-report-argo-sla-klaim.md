# User Story: NM-1314 - New Sub-menu Report Argo & SLA Klaim

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1314 |
| **Type** | Story |
| **Parent** | NM-137 |
| **Project** | New MiCare - Claim |
| **Status** | TEST |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 25 |
| **Story Points** | 3 |
| **Reporter** | Feby Janiar |
| **Assignee** | Idellia Muthia Nurbaisa |
| **Created** | 22/Jun/2026 |
| **Updated** | 07/Jul/2026 |

---

## User Story

**Sebagai** user internal (Admin, Verifikator, Kanit / Ka. KLY / SPV, Kepala Departemen, Kepala Divisi, dan user HO)  
**Saya ingin** mengakses halaman Report SLA Klaim melalui menu Monitoring  
**Sehingga** saya dapat melihat dan menganalisis data SLA klaim berdasarkan filter yang saya butuhkan untuk mendukung evaluasi dan pengambilan keputusan operasional

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Sub menu "Report SLA" tersedia di dalam menu Monitoring pada sidebar aplikasi Claim Verification, sejajar dengan menu COB Letter dan Pending Claim |
| AC-2 | Sub menu "Report SLA" hanya dapat diakses oleh user dengan role: Admin, Verifikator, Ka. KLY, Kanit, SPV, Kepala Departemen, Kepala Divisi, dan user HO |
| AC-3 | User di luar role yang disebutkan tidak dapat melihat atau mengakses sub menu Report SLA, termasuk melalui URL langsung |
| AC-4 | Halaman menampilkan area filter/search di bagian atas dan area tabel hasil inquiry di bagian bawah |
| AC-5 | Secara default (tanpa filter), halaman menampilkan seluruh data klaim sesuai cakupan wilayah dan hak akses user |
| AC-6 | Ketika filter diisi dan tombol Search diklik, data yang tampil menyesuaikan dengan filter yang dipilih |
| AC-7 | Tombol Reset Filter mengembalikan semua field ke kondisi default dan menampilkan ulang seluruh data sesuai cakupan wilayah user |
| AC-8 | Tombol "Export SLA Report" tersedia dan menghasilkan file Excel yang isinya konsisten dengan data yang sedang tampil di tabel inquiry (mengikuti filter yang aktif) |
| AC-9 | Jika tidak ada filter aktif, file Excel berisi seluruh data sesuai hak akses user. Jika ada filter aktif, file Excel hanya berisi data hasil filter tersebut |
| AC-10 | File Excel memuat semua 12 kolom output yang sama dengan tabel inquiry di halaman |

---

## Definition of Done

- [ ] Sub menu Report SLA tampil di dalam menu Monitoring dan hanya bisa diakses oleh role yang berwenang
- [ ] User di luar role yang ditentukan tidak dapat melihat sub menu maupun mengaksesnya via URL
- [ ] Field filter KOPS dan KLY muncul sesuai tiering role yang sudah ditetapkan
- [ ] Dropdown KLY untuk Kanit/SPV hanya menampilkan KLY dalam cakupan KOPS user yang login
- [ ] Dropdown KOPS untuk Kadept/Kadiv/HO menampilkan semua KOPS seluruh Indonesia
- [ ] Dropdown KLY untuk Kadept/Kadiv/HO menyesuaikan pilihan KOPS yang dipilih
- [ ] Tabel output menampilkan semua 12 kolom yang ditentukan dengan nama kolom dalam Bahasa Inggris
- [ ] Tombol Export SLA Report menghasilkan file Excel konsisten dengan data yang tampil di tabel
- [ ] QA memvalidasi tiering akses untuk setiap role terhadap filter KOPS dan KLY
- [ ] QA memvalidasi skenario export: tanpa filter, dengan filter wilayah, kombinasi filter, dan saat tidak ada data
- [ ] Dokumen user story sudah diperbarui dan disetujui oleh Product Owner

---

## Wireframe Description

### 1. Navigasi - Sub Menu Report SLA

- Penambahan sub menu **"Report SLA"** di dalam menu **Monitoring** pada sidebar kiri
- Lokasi: sejajar dengan menu COB Letter dan Pending Claim

### 2. Halaman Report SLA - Layout

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  REPORT ARGO & SLA KLAIM                                                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─── FILTER AREA ─────────────────────────────────────────────────────────────┐ │
│  │                                                                             │ │
│  │  Facility              Range Tanggal                                        │ │
│  │  ┌──────────────┐     ┌──────────────┐  ┌──────────────┐                   │ │
│  │  │ ▼ Select     │     │ From Date    │  │ To Date      │                   │ │
│  │  └──────────────┘     └──────────────┘  └──────────────┘                   │ │
│  │                                                                             │ │
│  │  No Claim / No Register                                                     │ │
│  │  ┌──────────────────────────┐                                               │ │
│  │  │ [ text input ]           │                                               │ │
│  │  └──────────────────────────┘                                               │ │
│  │                                                                             │ │
│  │  KOPS (Kadept/Kadiv/HO only)       KLY (Kanit/SPV/Kadept/Kadiv/HO)         │ │
│  │  ┌──────────────┐                  ┌──────────────┐                         │ │
│  │  │ ▼ Select     │                  │ ▼ Select     │                         │ │
│  │  └──────────────┘                  └──────────────┘                         │ │
│  │                                                                             │ │
│  │  [Search]  [Reset Filter]                                                   │ │
│  │                                                                             │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                  │
│  [Export SLA Report]                                                             │
│                                                                                  │
├────────┬────────────┬──────────────┬─────────────────┬──────────────┬───────────┤
│No Claim│Date of     │Receive Date  │Verifikator      │Kanit Approve │Send to    │
│        │Service     │Claim         │Receive Date     │Date          │FIS Date   │
├────────┼────────────┼──────────────┼─────────────────┼──────────────┼───────────┤
│CLM001  │01/06/2026  │03/06/2026    │04/06/2026       │06/06/2026    │07/06/2026 │
│CLM002  │02/06/2026  │04/06/2026    │05/06/2026       │07/06/2026    │09/06/2026 │
│...     │...         │...           │...              │...           │...        │
├────────┴────────────┴──────────────┴─────────────────┴──────────────┴───────────┤
│                                                                                  │
│  (continued columns)                                                             │
│                                                                                  │
├──────────┬──────────────┬────────────────┬──────────┬──────────┬────────────────┤
│Paid Date │SLA Admin     │SLA Verifikator │SLA Paid  │SLA All   │Argo Claim      │
├──────────┼──────────────┼────────────────┼──────────┼──────────┼────────────────┤
│10/06/2026│ 1            │ 2              │ 1        │ 5        │ 5              │
│12/06/2026│ 1            │ 2              │ 1        │ 6        │ 6              │
│...       │...           │...             │...       │...       │...             │
├──────────┴──────────────┴────────────────┴──────────┴──────────┴────────────────┤
│  Page 1 of 10    [<] [1] [2] [3] ... [10] [>]           Showing 1-10 of 100     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Tiering Akses Filter KOPS & KLY

| Role | Filter KOPS | Filter KLY | Keterangan |
|------|-------------|------------|------------|
| Admin | Tidak tampil | Tidak tampil | Data desentralisasi sesuai wilayah user |
| Verifikator | Tidak tampil | Tidak tampil | Data desentralisasi sesuai wilayah user |
| Ka. KLY | Tidak tampil | Tidak tampil | Data desentralisasi sesuai wilayah user |
| Kanit | Tidak tampil | Tampil | KLY hanya dalam cakupan KOPS user |
| SPV | Tidak tampil | Tampil | KLY hanya dalam cakupan KOPS user |
| Kepala Departemen | Tampil | Tampil | Semua KOPS Indonesia, KLY mengikuti KOPS |
| Kepala Divisi | Tampil | Tampil | Semua KOPS Indonesia, KLY mengikuti KOPS |
| User HO | Tampil | Tampil | Semua KOPS Indonesia, KLY mengikuti KOPS |

### 4. Modal Loading

```
┌──────────────────────────────────────┐
│                                      │
│          ⏳ Loading...               │
│                                      │
│    Memproses data, mohon tunggu      │
│                                      │
└──────────────────────────────────────┘
```

Modal loading ditampilkan saat:
- Halaman pertama kali di-load
- Klik tombol Search
- Klik tombol Export SLA Report

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sub menu "Report SLA" tersedia di dalam menu Monitoring pada sidebar, sejajar dengan COB Letter dan Pending Claim |
| FR-02 | Sub menu hanya visible dan accessible oleh role: Admin, Verifikator, Ka. KLY, Kanit, SPV, Kepala Departemen, Kepala Divisi, User HO |
| FR-03 | User tanpa role yang berwenang tidak dapat melihat menu maupun akses via direct URL (redirect 403) |
| FR-04 | Halaman memiliki 2 area utama: Filter/Search area (atas) dan Tabel Inquiry (bawah) |
| FR-05 | Default load (tanpa filter) menampilkan seluruh data klaim yang sudah diterima sesuai cakupan wilayah dan hak akses user |
| FR-06 | Filter Facility berupa dropdown single select dengan opsi: Reimburse, Cashless. Default: blank |
| FR-07 | Filter Range Tanggal berupa date picker (from - to), filter berdasarkan kolom Receive Date Claim |
| FR-08 | Filter No Claim / No Register berupa text input dengan pencarian partial match (contains) |
| FR-09 | Filter KOPS berupa dropdown single select, hanya tampil untuk Kadept, Kadiv, HO. Berisi semua KOPS Indonesia |
| FR-10 | Filter KLY berupa dropdown single select, tampil untuk Kanit, SPV, Kadept, Kadiv, HO |
| FR-11 | Untuk Kanit/SPV: dropdown KLY hanya menampilkan KLY dalam cakupan KOPS user yang login |
| FR-12 | Untuk Kadept/Kadiv/HO: dropdown KLY menyesuaikan KOPS yang dipilih. Jika KOPS belum dipilih, KLY menampilkan semua |
| FR-13 | Jika Kadept/Kadiv/HO memilih KOPS tapi KLY kosong, data yang tampil adalah seluruh data dari KOPS tersebut lintas KLY |
| FR-14 | Jika Kadept/Kadiv/HO memilih KOPS dan KLY, data yang tampil hanya dari KLY spesifik tersebut |
| FR-15 | Tidak ada opsi "Semua/All" di dropdown. Default state dropdown adalah blank (kosong) |
| FR-16 | Tombol Search mengeksekusi filter dan menampilkan data sesuai kriteria. Modal loading muncul selama proses |
| FR-17 | Tombol Reset Filter mengembalikan semua field ke blank (default) dan menampilkan ulang seluruh data sesuai cakupan wilayah user |
| FR-18 | Tabel inquiry menampilkan 12 kolom: No Claim, Date of Service, Receive Date Claim, Verifikator Receive Date, Kanit Approve Date, Send to FIS Date, Paid Date, SLA Admin, SLA Verifikator, SLA Paid, SLA All, Argo Claim |
| FR-19 | Semua nilai SLA dan Argo Claim diambil langsung dari database (sudah dihitung di task/service lain) |
| FR-20 | Tabel menggunakan pagination dengan max 10 row per page |
| FR-21 | Tabel menggunakan default sort dari backend (tidak ada custom sort per kolom) |
| FR-22 | Modal loading ditampilkan saat data sedang di-fetch dan saat proses export |
| FR-23 | Tombol "Export SLA Report" menghasilkan file Excel (.xlsx) konsisten dengan data yang tampil di tabel |
| FR-24 | Tanpa filter aktif: file Excel berisi seluruh data sesuai hak akses user |
| FR-25 | Dengan filter aktif: file Excel hanya berisi data hasil filter |
| FR-26 | Tidak ada limit jumlah row yang di-export |
| FR-27 | Naming file Excel: ReportArgoSLA_YYYYMMDDHHmmss.xlsx (contoh: ReportArgoSLA_20260708110803.xlsx) |
| FR-28 | File Excel memuat semua 12 kolom yang sama dengan tabel inquiry |
| FR-29 | Dropdown KLY di-reset saat user mengganti pilihan KOPS (dependent dropdown behavior) |

---

## Filter Fields Detail

| No | Field | Tipe Input | Visible untuk Role | Keterangan |
|----|-------|------------|-------------------|------------|
| 1 | Facility | Dropdown (single select) | Semua role | Opsi: Reimburse, Cashless. Default: blank |
| 2 | Range Tanggal | Date Picker (from - to) | Semua role | Basis filter: Receive Date Claim |
| 3 | No Claim / No Register | Text Input | Semua role | Pencarian contains (partial match) |
| 4 | KOPS | Dropdown (single select) | Kadept, Kadiv, HO | Daftar seluruh KOPS Indonesia |
| 5 | KLY | Dropdown (single select) | Kanit, SPV, Kadept, Kadiv, HO | Isi sesuai tiering role |

---

## Output Columns

| No | Nama Kolom | Keterangan | Source |
|----|-----------|------------|--------|
| 1 | No Claim | Nomor klaim | DB |
| 2 | Date of Service | Tanggal layanan | DB |
| 3 | Receive Date Claim | Tanggal klaim diterima sistem | DB |
| 4 | Verifikator Receive Date | Tanggal klaim diterima Verifikator | DB |
| 5 | Kanit Approve Date | Tanggal disetujui Kepala Unit | DB |
| 6 | Send to FIS Date | Tanggal kirim ke Finance | DB |
| 7 | Paid Date | Tanggal klaim dibayar | DB |
| 8 | SLA Admin | Total SLA Admin (hari kerja): Receive Date → Verifikator Receive Date | DB (pre-calculated) |
| 9 | SLA Verifikator | Total SLA Verifikator (hari kerja): Verifikator Receive Date → Kanit Approve Date | DB (pre-calculated) |
| 10 | SLA Paid | Total SLA Paid (hari kerja): Send to FIS Date → Paid Date | DB (pre-calculated) |
| 11 | SLA All | Total hari kerja dari Receive Date Claim sampai Paid Date | DB (pre-calculated) |
| 12 | Argo Claim | Counter hari kerja sejak klaim diterima (berhenti saat Paid) | DB (pre-calculated) |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | User tanpa role authorized akses via direct URL | Redirect ke halaman 403 / unauthorized |
| EC-02 | Kanit/SPV login tapi KOPS-nya tidak punya KLY | Dropdown KLY kosong / disabled, tabel kosong |
| EC-03 | Kadept/Kadiv/HO pilih KOPS yang tidak punya KLY | Dropdown KLY kosong, data KOPS tetap tampil |
| EC-04 | Filter tanggal range terbalik (from > to) | Validasi error, search tidak dieksekusi |
| EC-05 | Filter menghasilkan 0 data | Tabel menampilkan pesan "Tidak ada data" (empty state) |
| EC-06 | Export ketika tabel kosong (0 data) | Tombol disabled atau Excel hanya berisi header |
| EC-07 | Input No Claim dengan karakter spesial (injection attempt) | Input di-sanitize, tidak error |
| EC-08 | Klaim belum Paid (Paid Date null) | Kolom Paid Date, SLA Paid, SLA All kosong/null |
| EC-09 | Klaim belum diterima Verifikator | Kolom Verifikator Receive Date, SLA Verifikator kosong |
| EC-10 | Session expired saat klik Export | Redirect ke login page |
| EC-11 | Volume data sangat besar tanpa filter | Modal loading, server handle tanpa timeout |
| EC-12 | KOPS diganti setelah KLY sudah dipilih | Dropdown KLY di-reset, isi berubah sesuai KOPS baru |
| EC-13 | Input spasi saja di No Claim | Trim input, treated sebagai blank |
| EC-14 | Filter baru di-apply saat user di page > 1 | Reset pagination ke page 1 |
| EC-15 | Export saat filter aktif lalu reset, export lagi | Export kedua berisi semua data (konsisten state tabel) |
| EC-16 | Concurrent export oleh banyak user | Server handle tanpa crash |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Menu Monitoring sudah ada di sidebar; sub menu baru ditambahkan di sana |
| A-02 | Mapping role user ke KOPS/KLY sudah tersedia di database (user management) |
| A-03 | Semua nilai SLA dan Argo Claim sudah dihitung dan disimpan di DB oleh task/service lain. Halaman ini murni reporting |
| A-04 | Filter "Range Tanggal" berbasis kolom Receive Date Claim |
| A-05 | Format file export: .xlsx |
| A-06 | Semua klaim yang sudah diterima (Receive Date Claim terisi) ditampilkan, termasuk yang belum fully processed |
| A-07 | Dropdown tidak memiliki opsi "All/Semua". Default = blank |
| A-08 | Tidak ada color coding / threshold warning pada nilai SLA |
| A-09 | Semua dropdown single select |
| A-10 | Data master KOPS dan KLY dikelola di modul master data |
| A-11 | Pagination 10 row per page, tanpa opsi ubah |
| A-12 | Tabel tidak mendukung sort per kolom, data default order dari backend |

---

## Business Rules

| # | Rule |
|---|------|
| BR-01 | Admin, Verifikator, Ka. KLY: data otomatis ter-filter sesuai wilayah user, filter KOPS & KLY tidak tampil |
| BR-02 | Kanit, SPV: filter KLY tampil (hanya KLY dalam KOPS user), filter KOPS tidak tampil |
| BR-03 | Kadept, Kadiv, HO: filter KOPS & KLY keduanya tampil. KOPS berisi semua Indonesia |
| BR-04 | Kadept/Kadiv/HO: KOPS dipilih + KLY kosong = data seluruh KLY di KOPS tersebut |
| BR-05 | Kadept/Kadiv/HO: KOPS + KLY dipilih = data hanya dari KLY spesifik |
| BR-06 | Export Excel konsisten dengan state tabel saat ini (filter aktif) |
| BR-07 | Pagination 10 per page, reset ke page 1 setelah Search atau Reset |
| BR-08 | KLY dropdown di-reset jika KOPS diganti (dependent dropdown) |

---

## Access Control

### Allowed Roles
- Admin
- Verifikator
- Ka. KLY
- Kanit
- SPV
- Kepala Departemen
- Kepala Divisi
- User HO (Head Office)

### Denied
- Semua role di luar daftar di atas
- Akses via direct URL untuk unauthorized role → 403

---

## Sub-tasks

| Key | Summary | Status |
|-----|---------|--------|
| NM-1326 | Subtask 1 | - |
| NM-1327 | Subtask 2 | - |
| NM-1328 | Subtask 3 | - |
| NM-1333 | Subtask 4 | - |
| NM-1367 | Subtask 5 | - |

---

## References

- Test Cases: [NM-1314 Test Cases](../test-cases/NM-1314-test-cases.md)
- Feature File: `src/features/monitoring/reportArgoSLA.feature` (TBD)
- Traceability: [Traceability Matrix](../traceability.md)
- Jira: [NM-1314](https://inhealth.atlassian.net/browse/NM-1314)
