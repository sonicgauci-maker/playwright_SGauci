# User Story: NM-1383 - Mengelola Setting Auto Distribute per KOPS

| Field | Value |
|-------|-------|
| **Jira ID** | NM-1383 |
| **Type** | Story |
| **Parent** | NM-1250 |
| **Project** | New MiCare - Claim |
| **Status** | REVIEW |
| **Priority** | Medium |
| **Sprint** | Claim Operation Sprint 25, Sprint 26 |
| **Story Points** | 3 |
| **Reporter** | pujiyanto255 |
| **Assignee** | imam.nugroho |
| **Created** | 05/Jul/2026 |
| **Updated** | 30/Jul/2026 |

---

## User Story

**Sebagai** Staff Klaim HO (Kantor Pusat) / Kadep Klaim  
**Saya ingin** mengaktifkan atau menonaktifkan fitur auto distribute untuk setiap KOPS secara permanen  
**Sehingga** hanya KOPS yang sudah siap dan disetujui yang menggunakan distribusi otomatis, sementara KOPS lain tetap berjalan dengan proses manual

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Admin Pusat dapat melihat daftar seluruh KOPS beserta status auto distribute-nya (aktif/nonaktif). List menampilkan: Kode KOPS, Nama KOPS, Timezone Code, Timezone Offset, dan Is Autodistribution |
| AC-2 | Admin Pusat dapat mengaktifkan atau menonaktifkan auto distribute untuk KOPS yang dipilih |
| AC-3 | Setting bersifat permanen — sekali diaktifkan, tetap berlaku sampai dinonaktifkan secara eksplisit (bukan per periode/bulan) |
| AC-4 | Default untuk semua KOPS adalah nonaktif (auto distribute tidak berjalan sampai diaktifkan) |
| AC-5 | Setelah diaktifkan, klaim di KOPS tersebut yang berstatus READY_TO_DISTRIBUTE akan diproses oleh auto distribute pada trigger berikutnya |
| AC-6 | Klaim yang sudah ada di queue (SCORED, READY_TO_DISTRIBUTE) sebelum aktivasi tetap mengikuti flow auto distribute setelah setting aktif |
| AC-7 | Saat dinonaktifkan, sistem langsung melakukan sweep: semua klaim di queue untuk KOPS tersebut yang masih berstatus SCORED atau READY_TO_DISTRIBUTE diubah statusnya menjadi MANUAL_PROCESS |
| AC-8 | Klaim yang sudah berstatus DISTRIBUTED (sudah di-assign ke verifikator) tidak terpengaruh saat dinonaktifkan — tetap berjalan sampai selesai |
| AC-9 | Staff Klaim HO / Kadep Klaim mendapat konfirmasi jumlah klaim yang diubah menjadi MANUAL_PROCESS saat menonaktifkan |
| AC-10 | Setiap perubahan setting tercatat dalam audit log (siapa, kapan, untuk KOPS mana, aksi apa) |

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

### 1. Halaman Kops Score — List KOPS (Implementasi Aktual)

**Menu Path:** Management > KOPS Management  
**Page Title:** Kops Score  
**Login Role:** Verifikator Pusat

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Kops Score                                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  KOPS                                                                        │
│  ┌─────────────────────────────────┐                                         │
│  │ Search KOPS...              [▼] │                                         │
│  └─────────────────────────────────┘                                         │
│  [Q Search]  [⟲ Reset Filter]                                                │
│                                                                              │
├─────────┬───────────┬──────────────┬───────────────┬─────────────┬───────────┤
│ Action  │ Kops Code │ Kops Name    │ Timezone Code │ Timezone    │ Is Auto-  │
│         │           │              │               │ Offset      │distribution│
├─────────┼───────────┼──────────────┼───────────────┼─────────────┼───────────┤
│  [⏻]   │ 0201      │ MEDAN        │ WIB           │ 7           │ 🔴 (X)    │
│  [⏻]   │ 1101      │ SEMARANG     │ WIB           │ 7           │ 🟢 (✓)    │
│  [⏻]   │ 0401      │ PEKANBARU    │ WIB           │ 7           │ 🔴 (X)    │
│  [⏻]   │ 0901      │ JAKARTA      │ WIB           │ 7           │ 🟢 (✓)    │
│  [⏻]   │ 2201      │ DENPASAR     │ WITA          │ 8           │ 🔴 (X)    │
│  [⏻]   │ 0601      │ PALEMBANG    │ WIB           │ 7           │ 🟢 (✓)    │
├─────────┴───────────┴──────────────┴───────────────┴─────────────┴───────────┤
│  Showing 1-X of X entries                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Keterangan UI:**
- Action: Icon power button (⏻), hover tooltip "Aktif/Nonaktif"
- Is Autodistribution: Badge hijau (✓) = Aktif, Badge merah (X) = Nonaktif
- Filter: Dropdown search KOPS (by name/code)

### 2. Dialog Konfirmasi — Nonaktifkan Auto Distribute

```
┌──────────────────────────────────────────────────────────────────┐
│  KONFIRMASI NONAKTIFKAN AUTO DISTRIBUTE                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Anda akan menonaktifkan auto distribute untuk:                  │
│                                                                  │
│  KOPS: (1101) - SEMARANG                                         │
│                                                                  │
│  Dampak:                                                         │
│  • [X] klaim (SCORED/READY_TO_DISTRIBUTE) akan diubah            │
│    ke MANUAL_PROCESS                                             │
│  • Klaim MANUAL_PROCESS tetap bisa didistribusi manual            │
│  • [Y] klaim DISTRIBUTED tidak terpengaruh                       │
│                                                                  │
│  Apakah Anda yakin?                                              │
│                                                                  │
│  ┌────────────────┐  ┌──────────┐                                │
│  │ Ya, Nonaktifkan │  │  Batal   │                               │
│  └────────────────┘  └──────────┘                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Technical Context

### Implementasi Aktual (dari Development)

- **Page Title:** Kops Score
- **Menu Path:** Sidebar > Management > KOPS Management
- **User Role:** Verifikator Pusat
- **Versi Aplikasi:** v2.0

### Database Schema (Estimated)

**Table:** `public.config_auto_distribute_kops` atau extend pada tabel KOPS existing

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL / UUID | Primary key |
| kops_code | VARCHAR | Kode KOPS (e.g., 0201, 1101, 0401) |
| kops_name | VARCHAR | Nama KOPS (e.g., MEDAN, SEMARANG) |
| timezone_code | VARCHAR | Timezone code (WIB/WITA/WIT) |
| timezone_offset | INTEGER | UTC offset (7, 8, 9) |
| is_auto_distribution | BOOLEAN | Flag auto distribute (default: false) |
| updated_at | TIMESTAMP | Timestamp perubahan terakhir |
| updated_by | VARCHAR | User yang terakhir mengubah |

### Audit Log Schema

**Table:** `public.audit_log_auto_distribute`

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL / UUID | Primary key |
| kops_code | VARCHAR | Kode KOPS yang diubah |
| action | VARCHAR | ACTIVATE / DEACTIVATE |
| affected_claims_count | INTEGER | Jumlah klaim yang di-sweep (saat deactivate) |
| performed_by | VARCHAR | User yang melakukan aksi |
| performed_at | TIMESTAMP | Waktu aksi dilakukan |

### State Transition — Klaim saat Deactivation (Sweep)

```
┌──────────┐                           ┌─────────────────┐
│  SCORED  │ ───── (deactivate) ─────> │ MANUAL_PROCESS  │
└──────────┘                           └─────────────────┘

┌───────────────────────┐              ┌─────────────────┐
│ READY_TO_DISTRIBUTE   │ ─ (deactivate) ─> │ MANUAL_PROCESS  │
└───────────────────────┘              └─────────────────┘

┌──────────────┐
│ DISTRIBUTED  │ ─── (deactivate) ───> TIDAK TERPENGARUH (tetap berjalan)
└──────────────┘
```

### State Transition — Klaim saat Activation

```
┌──────────┐              ┌───────────────────────┐            ┌──────────────┐
│  SCORED  │ ─(trigger)─> │ READY_TO_DISTRIBUTE   │ ─(auto)─> │ DISTRIBUTED  │
└──────────┘              └───────────────────────┘            └──────────────┘
```

### API Contract (Estimated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/config/auto-distribute/kops` | List semua KOPS + flag |
| GET | `/api/v1/config/auto-distribute/kops?search={keyword}` | Filter KOPS by name/code |
| PUT | `/api/v1/config/auto-distribute/kops/{kopsCode}/activate` | Aktifkan auto distribute |
| PUT | `/api/v1/config/auto-distribute/kops/{kopsCode}/deactivate` | Nonaktifkan + sweep |
| GET | `/api/v1/config/auto-distribute/kops/{kopsCode}/preview-deactivate` | Preview dampak deactivation |

### Access Control

- **Allowed:** Verifikator Pusat (Staff Klaim HO / Kadep Klaim)
- **Denied:** User cabang, verifikator cabang, kanit cabang

### Relationship to Other Features

- Parent Epic: **NM-1250** (Auto Distribution Engine)
- Scoring parameter dari: **NM-1267** (Setting Klasifikasi Scoring Klaim)
- Flow: Klaim di-scoring (NM-1267) → masuk queue → auto distribute engine cek flag KOPS (NM-1383) → distribute ke verifikator
- Linked Issue: **ITQ-1218** (Problem/Incident)

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Sistem menampilkan halaman "Kops Score" via menu Management > KOPS Management |
| FR-02 | Halaman menampilkan tabel list KOPS dengan kolom: Action, Kops Code, Kops Name, Timezone Code, Timezone Offset, Is Autodistribution |
| FR-03 | Kolom Is Autodistribution menampilkan badge visual: hijau (aktif) / merah (nonaktif) |
| FR-04 | Kolom Action menampilkan icon power button untuk toggle status auto distribute |
| FR-05 | Hover pada icon Action menampilkan tooltip "Aktif/Nonaktif" |
| FR-06 | Terdapat filter dropdown "Search KOPS" untuk mencari KOPS by name/code |
| FR-07 | Terdapat tombol [Search] dan [Reset Filter] untuk eksekusi dan reset filter |
| FR-08 | Halaman hanya bisa diakses oleh user dengan role Verifikator Pusat (Staff Klaim HO / Kadep Klaim) |
| FR-09 | Saat klik Action pada KOPS yang aktif → tampil dialog konfirmasi deactivation dengan preview dampak |
| FR-10 | Dialog deactivation menampilkan: nama KOPS, jumlah klaim SCORED/READY_TO_DISTRIBUTE yang akan diubah ke MANUAL_PROCESS, jumlah klaim DISTRIBUTED yang tidak terpengaruh |
| FR-11 | Dialog deactivation memiliki tombol [Ya, Nonaktifkan] dan [Batal] |
| FR-12 | Setelah konfirmasi nonaktif, sistem melakukan sweep: ubah status SCORED dan READY_TO_DISTRIBUTE menjadi MANUAL_PROCESS |
| FR-13 | Klaim berstatus DISTRIBUTED tidak terpengaruh oleh deactivation |
| FR-14 | Saat klik Action pada KOPS yang nonaktif → tampil dialog konfirmasi aktivasi, lalu aktifkan auto distribute |
| FR-15 | Setelah diaktifkan, klaim berstatus READY_TO_DISTRIBUTE diproses auto distribute pada trigger berikutnya |
| FR-16 | Klaim existing di queue (SCORED, READY_TO_DISTRIBUTE) sebelum aktivasi tetap masuk flow auto distribute |
| FR-17 | Default status semua KOPS adalah nonaktif |
| FR-18 | Setting bersifat permanen — tidak reset per periode/bulan |
| FR-19 | Setiap perubahan setting tercatat dalam audit log (user, timestamp, kops_code, action) |
| FR-20 | Setelah aksi berhasil, tampil feedback/notifikasi ke user |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Deactivate KOPS yang tidak memiliki klaim di queue (0 klaim SCORED/READY_TO_DISTRIBUTE) | Dialog konfirmasi tetap muncul dengan informasi "0 klaim terdampak", proses sukses |
| EC-02 | Activate KOPS yang sudah aktif (double click cepat / race condition) | Idempotent — tidak ada perubahan, button disabled saat proses berjalan |
| EC-03 | Deactivate KOPS saat auto distribute engine sedang memproses klaim (in-flight) | Klaim yang sedang mid-transaction harus ditangani gracefully |
| EC-04 | User non-Verifikator Pusat mengakses halaman via direct URL | Redirect ke unauthorized / forbidden page, atau menu tidak tampil |
| EC-05 | Deactivation dengan jumlah klaim sangat besar (>1000 klaim) | Sweep tetap reliable, gunakan batch processing jika perlu. Response time acceptable |
| EC-06 | Network timeout saat proses sweep (deactivation) | Transactional — all or nothing. Jika gagal, status tidak berubah, user mendapat error message |
| EC-07 | 2 admin mengubah setting KOPS yang sama secara bersamaan | Optimistic locking atau last-write-wins dengan audit log tetap tercatat |
| EC-08 | Klaim baru masuk queue dengan status SCORED setelah deactivation (dari proses scoring yang berjalan parallel) | Langsung masuk MANUAL_PROCESS karena flag sudah off |
| EC-09 | Reactivation setelah deactivation — klaim yang sudah MANUAL_PROCESS | Klaim yang sudah MANUAL_PROCESS TIDAK otomatis kembali ke queue — tetap manual |
| EC-10 | KOPS baru ditambahkan ke sistem | Default flag = nonaktif, langsung muncul di list |
| EC-11 | Cancel dialog konfirmasi (klik Batal) | Tidak ada perubahan status, UI kembali ke state semula |
| EC-12 | Filter KOPS dengan keyword yang tidak match | Tabel kosong / no data, atau pesan "Data tidak ditemukan" |
| EC-13 | Reset filter setelah melakukan pencarian | Tabel kembali menampilkan semua KOPS |
| EC-14 | Klik power button icon berulang kali (spam click) | Debounce / disable button saat request sedang berjalan |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Role "Verifikator Pusat" sudah terdefinisi dan merupakan representasi dari Staff Klaim HO / Kadep Klaim |
| A-02 | Data master KOPS (kode, nama, timezone code, timezone offset) sudah tersedia di database |
| A-03 | Auto distribute engine sudah mengecek flag `is_auto_distribution` sebelum memproses klaim per KOPS |
| A-04 | Status klaim SCORED, READY_TO_DISTRIBUTE, DISTRIBUTED, dan MANUAL_PROCESS sudah didefinisikan di sistem |
| A-05 | Icon power button (⏻) bersifat toggle — satu klik untuk activate jika nonaktif, satu klik untuk deactivate jika aktif |
| A-06 | Sweep saat deactivation bersifat synchronous — user menunggu sampai selesai |
| A-07 | Audit log bisa diakses terpisah (bukan di halaman ini) |
| A-08 | Tidak ada fitur bulk activate/deactivate — perubahan per KOPS satu-satu |
| A-09 | Klaim yang sudah MANUAL_PROCESS tidak akan dikembalikan ke queue meskipun KOPS diaktifkan kembali |
| A-10 | Dialog konfirmasi memanggil API preview untuk mendapat data jumlah klaim real-time sebelum user konfirmasi |
| A-11 | Halaman menggunakan pagination (terlihat "Showing 1-X of X entries") |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Apakah dialog konfirmasi juga diperlukan untuk AKTIVASI, atau langsung aktif tanpa konfirmasi? | Resolved — Dialog muncul untuk keduanya (activate & deactivate) |
| MD-02 | Apakah filter KOPS berupa dropdown select atau free-text search? (dari dev: dropdown) | Resolved — Dropdown |
| MD-03 | Apakah ada notifikasi sukses (toast) setelah activate/deactivate? Pesan apa? | Open |
| MD-04 | Dimana audit log bisa dilihat oleh user? Apakah di halaman terpisah atau menu lain? | Open |
| MD-05 | Apakah ada loading state / spinner saat proses sweep berjalan? | Open |
| MD-06 | Berapa SLA response time yang acceptable untuk proses sweep? | Open |
| MD-07 | Apakah ada notifikasi ke user lain (misal Kadep) saat ada perubahan setting oleh admin lain? | Open |
| MD-08 | Status MANUAL_PROCESS — apakah ini status baru atau sudah existing di sistem? Bagaimana flow selanjutnya? | Resolved — Status baru yang diperkenalkan di story ini |
| MD-09 | Setelah klaim jadi MANUAL_PROCESS, bagaimana cara mendistribusikannya secara manual? Via fitur apa? | Resolved — Klaim MANUAL_PROCESS tidak akan otomatis terdistribute, harus ditangani manual |
| MD-10 | Linked issue ITQ-1218 — apa konteks problem/incident ini? Apakah berpengaruh ke requirement? | Open |
| MD-11 | Apakah halaman ini juga menampilkan timestamp terakhir kali setting diubah per KOPS? | Open |
| MD-12 | Apakah pagination default berapa rows per page? | Open |

---

## Risk Assessment

| Risk | Probability | Impact | Level | Mitigation |
|------|------------|--------|-------|------------|
| Sweep deactivation gagal di tengah proses (partial update) | Medium | High | **High** | Database transaction — all or nothing |
| Race condition: klaim baru masuk queue saat deactivation | Medium | Medium | **Medium** | Engine check flag real-time sebelum process |
| Concurrent update oleh 2 admin pada KOPS sama | Low | Medium | **Low** | Optimistic locking + audit log |
| Performance issue saat sweep klaim banyak (>1000) | Low | High | **Medium** | Batch processing + timeout handling |
| Flag tidak terbaca oleh engine (cache issue) | Low | High | **Medium** | Cache invalidation / direct DB read |
| User salah klik toggle (human error) | Medium | Medium | **Medium** | Dialog konfirmasi wajib + audit log |
| UI tidak update setelah aksi berhasil (stale state) | Low | Low | **Low** | Refresh data setelah action success |

---

## Sub-tasks

| Key | Summary | Status |
|-----|---------|--------|
| NM-1384 | Subtask 1 | - |
| NM-1385 | Subtask 2 | - |
| NM-1386 | Subtask 3 | - |
| NM-1387 | Subtask 4 | - |
| NM-1388 | Subtask 5 | - |
| NM-1395 | Subtask 6 | - |
| NM-1397 | Subtask 7 | - |
| NM-1438 | Subtask 8 | - |
| NM-1439 | Subtask 9 | - |
| NM-1440 | Subtask 10 | - |

---

## References

- Test Cases: [NM-1383 Test Cases](../test-cases/NM-1383-test-cases.md)
- Feature File: `src/features/autoDistribute/settingAutoDistributeKops.feature`
- Traceability: [Traceability Matrix](../traceability.md)
- Parent Epic: NM-1250 (Auto Distribution Engine)
- Related Story: NM-1267 (Setting Klasifikasi Scoring Klaim)
- Linked Issue: ITQ-1218 (Problem/Incident)
