# User Story: NM-963 - Integration Balance BU Poolfund Plan

| Field | Value |
|-------|-------|
| **Jira ID** | NM-963 |
| **Type** | Story |
| **Parent Epic** | NM-961 |
| **Project** | New MiCare - Claim |
| **Status** | REVIEW |
| **Priority** | High |
| **Sprint** | Claim Operation Sprint 26 |
| **Story Points** | 5 |
| **Reporter** | pujiyanto255 |
| **Assignee** | elmira.akmala |
| **Created** | 17/Mar/2026 |
| **Updated** | 22/Jul/2026 |

---

## User Story

**Sebagai** User EXSO, Provider Portal, MICC, dan Klaim  
**Saya ingin** sistem mengintegrasikan perhitungan balance Poolfund terhadap semua transaksi dari berbagai aplikasi  
**Sehingga** saldo yang ditampilkan tetap konsisten di level BU (corporate) dan Plan, serta tidak terjadi anomali perhitungan

---

## Background

### Kondisi Sebelumnya (AS-IS)
- Perhitungan balance poolfund mengacu pada table **AKTUW**
- Hanya berlaku pada **aplikasi Klaim** saja
- Table AKTUW berfungsi sebagai:
  - Initiator deposit
  - Konfigurasi poolfund level BU (apakah BU memiliki poolfund atau tidak)

### Enhancement (TO-BE)
- **Semua aplikasi** yang mengandung transaksional dan proses discharge akan melakukan proses perhitungan poolfund
- Aplikasi yang terdampak: **Klaim, Provider Portal, HCCM, EXSO, MICC**
- Metode perhitungan disediakan oleh **service EXSO** (centralized) — **termasuk pembuatan service-nya**
- Aplikasi lain akan **consume** service tersebut
- Table AKTUW tetap digunakan sebagai konfigurasi & initiator, bukan sebagai sumber perhitungan runtime

---

## Acceptance Criteria

| AC# | Criteria |
|-----|----------|
| AC-1 | Setiap transaksi yang mengandung poolfund (dari aplikasi manapun: Klaim, Provider Portal, HCCM, MICC) harus mengurangi balance poolfund di level BU secara konsisten |
| AC-2 | Sistem memiliki validasi untuk memastikan tidak ada selisih antara jumlah transaksional dengan saldo poolfund. Jika terjadi ketidaksesuaian, sistem menampilkan error dan **tidak memotong deposit** |
| AC-3 | Perubahan hanya pada integrasi dan perhitungan balance poolfund (berlaku apabila transaksi mengandung poolfund). Logic existing yang tidak terkait poolfund tidak terpengaruh |

---

## Definition of Done

- [ ] Balance BU dan Plan selalu konsisten setelah setiap transaksi dari semua aplikasi
- [ ] Tidak ditemukan selisih saldo pada skenario normal (transaksi dari Klaim, Provider Portal, HCCM, MICC)
- [ ] Validasi error ditampilkan saat terjadi ketidaksesuaian balance
- [ ] Deposit tidak terpotong saat terjadi anomali/ketidaksesuaian
- [ ] Integrasi service EXSO berfungsi di semua aplikasi consumer
- [ ] Regression: fitur existing yang tidak terkait poolfund tidak terdampak
- [ ] Telah diverifikasi dan disetujui sebelum rilis

---

## Technical Context

### Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Klaim     │     │  Provider   │     │    HCCM     │     │    MICC     │
│   App       │     │  Portal     │     │             │     │             │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       └───────────────────┴───────────────────┴───────────────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │   EXSO Service        │
                        │   (Poolfund Balance   │
                        │    Calculation)       │
                        └───────────┬───────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │   Database            │
                        │   - Balance Poolfund  │
                        │   - AKTUW (config)    │
                        └───────────────────────┘
```

### Flow Poolfund Process

```
┌─────────────────────────────────┐
│     API Triggered (claim no)    │
└────────────────┬────────────────┘
                 │
                 ▼
        ┌────────────────┐
       ╱  Check setting   ╲───── no ──→ Done
       ╲  poolfund plan   ╱
        └───────┬────────┘
                │ yes
                ▼
┌─────────────────────────────────┐
│  Move total amount approved     │
│  as Poolfund amount             │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Calculate poolfund balance     │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│             Done                │
└─────────────────────────────────┘
```

### Flow Description

1. **API Triggered** — Service dipanggil dengan parameter `claim_no` setelah proses discharge
2. **Check setting poolfund plan** — Cek konfigurasi di AKTUW apakah BU/Plan memiliki poolfund
   - Jika **NO** → langsung Done (tidak ada perhitungan poolfund)
   - Jika **YES** → lanjut ke proses berikutnya
3. **Move total amount approved as Poolfund amount** — Total amount yang di-approve dipindahkan sebagai poolfund amount (mengurangi balance poolfund)
4. **Calculate poolfund balance** — Hitung sisa balance poolfund setelah dikurangi
5. **Done** — Proses selesai, balance ter-update

### Data Source
- **AKTUW table**: Konfigurasi BU (is_poolfund flag), initiator deposit
- **Balance Poolfund**: Saldo real-time yang di-maintain oleh service EXSO
- **Level hierarchy**: BU (corporate) → Plan

### Aplikasi Consumer
| Aplikasi | Trigger Perhitungan |
|----------|-------------------|
| Klaim | Proses discharge claim |
| Provider Portal | Proses discharge dari provider |
| HCCM | Transaksi yang mengandung poolfund |
| MICC | Transaksi yang mengandung poolfund |

### Testing Approach
- Testing dilakukan melalui **UI** (bukan direct API testing)
- Validasi balance melalui UI setelah transaksi di masing-masing aplikasi

---

## Functional Requirements

| FR# | Requirement |
|-----|-------------|
| FR-01 | Semua aplikasi (Klaim, Provider Portal, HCCM, MICC) yang melakukan discharge/transaksi mengandung poolfund harus mengurangi balance poolfund |
| FR-02 | Perhitungan poolfund disediakan secara centralized oleh service EXSO |
| FR-03 | Balance poolfund dihitung di level BU (corporate) dan Plan |
| FR-04 | Jika terjadi ketidaksesuaian/selisih antara transaksional dan saldo poolfund, sistem menampilkan pesan error |
| FR-05 | Saat terjadi ketidaksesuaian, sistem tidak boleh memotong deposit |
| FR-06 | Transaksi yang TIDAK mengandung poolfund tidak terpengaruh oleh perubahan ini |
| FR-07 | Konfigurasi apakah BU memiliki poolfund atau tidak tetap mengacu pada table AKTUW |
| FR-08 | Balance harus konsisten di seluruh level (BU dan Plan) setelah transaksi dari aplikasi manapun |

---

## Edge Cases

| # | Scenario | Expected Behavior |
|---|----------|-------------------|
| EC-01 | Dua aplikasi berbeda melakukan transaksi poolfund secara bersamaan (race condition) | Balance harus konsisten, tidak terjadi over-deduction. Salah satu transaksi harus menunggu atau ditolak jika balance tidak cukup |
| EC-02 | Transaksi dari Provider Portal saat service EXSO down/timeout | Sistem menampilkan error, deposit tidak terpotong, transaksi tidak diproses |
| EC-03 | BU tidak memiliki konfigurasi poolfund di AKTUW tapi ada transaksi masuk | Transaksi diproses tanpa perhitungan poolfund (flag is_poolfund = FALSE) |
| EC-04 | Balance poolfund = 0, lalu ada transaksi baru dari aplikasi manapun | Sesuai logic existing di NM-960: approve = 0, seluruh amount jadi excess |
| EC-05 | Void/reversal claim di satu aplikasi, lalu transaksi baru dari aplikasi lain | Balance harus ter-restore setelah void, transaksi baru menggunakan balance restored |
| EC-06 | Transaksi sangat besar melebihi balance poolfund yang tersedia | Poolfund partial, sisa mengikuti logic distribution (Deposit/Excess) sesuai NM-960 |
| EC-07 | Network latency menyebabkan delay update balance antar aplikasi | Balance yang ditampilkan di UI harus reflect state terbaru setelah refresh |

---

## Assumptions

| # | Assumption |
|---|---|
| A-01 | Scope mencakup pembuatan service di EXSO DAN integrasi consume di semua aplikasi consumer |
| A-02 | Table AKTUW tetap sebagai master konfigurasi (is_poolfund per BU/Plan), tidak dihapus |
| A-03 | Logic perhitungan poolfund yang sudah divalidasi di NM-960 (MIN logic, distribution Poolfund → Deposit → Excess) tetap berlaku |
| A-04 | Testing dilakukan melalui UI di masing-masing aplikasi, bukan direct API call |
| A-05 | Balance poolfund bersifat shared di level BU (semua member dalam 1 BU share pool yang sama) |
| A-06 | Threshold anomali belum didefinisikan — untuk saat ini menggunakan exact match (selisih = 0) |
| A-07 | Flow: API triggered by claim_no → check setting poolfund plan → move amount → calculate balance |
| A-08 | Jika BU/Plan tidak memiliki setting poolfund (check = NO), maka proses langsung selesai tanpa perhitungan |
| A-09 | E2E testing (NM-1113) akan mengintegrasikan test dari Klaim, Provider, dan HCCM |

---

## Impact Analysis

| Area | Impact | Severity |
|------|--------|----------|
| Klaim App | Perubahan source perhitungan (AKTUW → Service EXSO) | High |
| Provider Portal | Baru mengintegrasikan perhitungan poolfund (sebelumnya tidak ada) | High |
| HCCM | Baru mengintegrasikan perhitungan poolfund | High |
| MICC | Baru mengintegrasikan perhitungan poolfund | Medium |
| NM-960 (existing) | Logic perhitungan detail tetap, tapi source balance berubah | Medium |
| Balance consistency | Multi-app access ke shared resource → risk race condition | High |
| Regression | Fitur non-poolfund tidak boleh terdampak | Medium |

---

## Risk Assessment

| # | Risk | Probability | Impact | Level | Mitigation |
|---|------|-------------|--------|-------|------------|
| R-01 | Race condition: multiple apps update balance bersamaan | High | High | Critical | Locking mechanism di service EXSO, test concurrent scenario |
| R-02 | Service EXSO down menyebabkan semua aplikasi tidak bisa proses discharge | Medium | High | High | Error handling graceful, fallback behavior defined |
| R-03 | Selisih balance karena timing issue antar aplikasi | Medium | High | High | Validasi konsistensi, reconciliation mechanism |
| R-04 | Regression pada fitur existing Klaim (NM-960) | Medium | Medium | Medium | Regression testing NM-960 scenarios |
| R-05 | Anomali threshold belum terdefinisi → false positive/negative | Medium | Medium | Medium | Gunakan exact match untuk initial, refine kemudian |

---

## Sub-tasks

| Key | Summary | Priority | Assignee | Status |
|-----|---------|----------|----------|--------|
| NM-973 | API - [Claim] Bridging Balance (Poolfund) | Medium | Unassigned | To Do |
| NM-974 | API - [HCCM] Integrasi dengan bridging klaim | Medium | Unassigned | To Do |
| NM-975 | API - [Provider] Integrasi dengan bridging balance poolfund claim | Medium | Unassigned | To Do |
| NM-981 | API - [Claim] Enhance discharge proses hit service Claim bridging saldo poolfund | Medium | elmira.akmala | In Progress |
| NM-1113 | E2E Test Integration Balance BU Poolfund Plan | Medium | syaiful gauci | To Do |

---

## Related Stories

| Key | Relationship | Description |
|-----|-------------|-------------|
| NM-961 | Parent | Parent epic |
| NM-960 | Relates to | Perhitungan Claim Rawat Jalan (Poolfund, Deposit Excess, Balance Management) — logic dasar |
| NM-993 | Blocked by | Blocking story (NM-963 is blocked by NM-993) |
| ITQ-928 | Causes | Problem/Incident yang terkait |

---

## Missing Details / Open Questions

| # | Question | Status |
|---|----------|--------|
| MD-01 | Threshold/tolerance untuk deteksi anomali balance — apakah exact match atau ada margin? | Open (belum terdefinisi, asumsi exact match) |
| MD-02 | Apakah ada retry mechanism jika service EXSO timeout/error? | Open |
| MD-03 | Error message spesifik yang ditampilkan saat terjadi ketidaksesuaian balance? Wording? | Open |
| MD-04 | Apakah ada UI perubahan di masing-masing aplikasi consumer untuk menampilkan balance/error? | Open |
| MD-05 | Bagaimana monitoring/alert jika terjadi anomali balance di production? | Open |
| MD-06 | Apakah validasi anomali dilakukan synchronously (blocking) saat discharge, atau async (background check)? | Open |

---

## Testing Strategy

### Scope per Aplikasi (UI Testing)

| Aplikasi | Subtask | Test Scope | Priority |
|----------|---------|-----------|----------|
| Klaim | NM-973, NM-981 | Discharge → bridging balance poolfund → verify balance berkurang | High |
| Provider Portal | NM-975 | Discharge → bridging balance poolfund → verify balance berkurang | High |
| HCCM | NM-974 | Transaksi → integrasi bridging klaim → verify balance berkurang | High |
| E2E Integration | NM-1113 | Cross-app integration test | High |

### Cross-Application Scenarios (E2E - NM-1113)

| Scenario | Description |
|----------|-------------|
| Sequential cross-app | Klaim discharge → Provider discharge → verify total balance konsisten |
| Balance exhaustion cross-app | App A habiskan balance → App B harus dapat error/partial |
| Void di App A, claim di App B | Restore balance di A harus visible untuk B |
| Setting poolfund = NO | Verify semua app skip perhitungan poolfund |

### Flow-Based Test Scenarios

Berdasarkan flowchart:

| Step | Test Focus |
|------|-----------|
| API Triggered (claim_no) | Valid claim_no, invalid claim_no, null claim_no |
| Check setting poolfund plan | Setting YES → lanjut, Setting NO → skip (Done) |
| Move total amount approved | Amount correct, amount = 0, boundary values |
| Calculate poolfund balance | Balance dikurangi correct, balance tidak negatif |
| Validasi anomali | Selisih terdeteksi → error + tidak potong deposit |

### Regression Scope

- Full regression NM-960 test cases (SC-1 s.d SC-11)
- Verify non-poolfund transactions tidak terdampak
- Verify existing Klaim discharge masih berfungsi setelah enhancement

---

## References

- Related Story Test Cases: [NM-960 Test Cases](../test-cases/NM-960.md)
- Traceability: [Traceability Matrix](../traceability.md)
- Feature File: TBD (pending test case design)
