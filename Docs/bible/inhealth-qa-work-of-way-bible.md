# Inhealth QA Way of Working (WoW)

> Version: 1.1
> Last Updated: 2026-08-04
> Owner: QA Team Lead
> Status: Active

---

## Table of Contents

1. [QA Mindset & Responsibility](#1-qa-mindset--responsibility)
2. [Requirement Analysis (Shift-Left)](#2-requirement-analysis-shift-left)
3. [Test Planning](#3-test-planning)
4. [Test Design](#4-test-design)
5. [Test Execution](#5-test-execution)
6. [Defect Management](#6-defect-management)
7. [Test Environment Management](#7-test-environment-management)
8. [Automation Strategy](#8-automation-strategy)
9. [Test Reporting & Communication](#9-test-reporting--communication)
10. [Release Decision](#10-release-decision)
11. [Metrics & KPI](#11-metrics--kpi)
12. [Knowledge Transfer & Onboarding](#12-knowledge-transfer--onboarding)
13. [Continuous Improvement](#13-continuous-improvement)
14. [Standarisasi Validasi (Validation Standards)](#14-standarisasi-validasi-validation-standards)

---

## 1. QA Mindset & Responsibility

**QA is not only testing, but quality ownership.**

### Core Responsibilities

| Area | Responsibility |
|------|----------------|
| Requirements | Understand business requirements & risks |
| Prevention | Prevent defects early (shift-left approach) |
| Validation | Validate functionality, performance, security, and usability |
| Collaboration | Act as a bridge between Business, Dev, and Product |
| Confidence | Ensure release quality & confidence |
| Documentation | Maintain traceability from requirement to test evidence |

### QA Principles

- **Quality is everyone's responsibility** — QA facilitates, not gatekeeps
- **Shift-left** — find defects early, fix them cheaply
- **Data-driven decisions** — speak with metrics, not opinions
- **Continuous improvement** — every sprint is an opportunity to improve
- **Automation-first mindset** — automate repetitive work, focus human effort on exploratory and edge cases

---

## 2. Requirement Analysis (Shift-Left)

**When:** Sprint Planning / Backlog Refinement

### QA Actions

- Review BRD / User Stories / Acceptance Criteria
- Ask critical questions:
  - What are the edge cases?
  - What are the negative scenarios?
  - What are the data validation rules?
  - What is the API & integration impact?
  - What are the dependencies (upstream/downstream)?
  - What is the rollback strategy if something fails?
- Identify test impact early
- Participate in 3 Amigos session (PO + Dev + QA)

### Definition of Ready (DoR) Checklist

Story dianggap **Ready for Development / Testing** jika memenuhi:

- [ ] Acceptance Criteria ditulis dengan format Given-When-Then
- [ ] Mockup/wireframe tersedia (jika ada UI impact)
- [ ] API contract sudah didefinisikan (request/response schema)
- [ ] Dependencies sudah diidentifikasi dan dikomunikasikan
- [ ] Test data requirements sudah diketahui
- [ ] Non-functional requirements sudah disebutkan (jika ada)
- [ ] Impact analysis terhadap fitur existing sudah dilakukan

### Output

- Test Scenarios (high-level)
- Clarified Acceptance Criteria
- Risk list
- Impact analysis notes

> **Rule:** No clear AC = Not Ready for Development / Testing

---

## 3. Test Planning

**When:** Before sprint / development starts

### Activities

| Activity | Detail |
|----------|--------|
| Define test scope | In-scope dan out-of-scope harus eksplisit |
| Identify test types | Functional, API, Regression, Smoke, Performance |
| Risk-based prioritization | Gunakan risk matrix (Probability x Impact) |
| Decide testing approach | Manual vs Automation |
| Identify environments | DEV, SIT, UAT, Staging |
| Prepare test data | Data setup dan cleanup strategy |
| Estimate effort | Per test type (story point / time-box) |

### Risk Matrix

| | Low Impact | Medium Impact | High Impact |
|---|---|---|---|
| **High Probability** | Medium | High | Critical |
| **Medium Probability** | Low | Medium | High |
| **Low Probability** | Low | Low | Medium |

### Test Type Selection Guide

| Test Type | When | Mandatory |
|-----------|------|-----------|
| Smoke Test | Setiap deployment | Yes |
| Functional Test | Setiap story baru/change | Yes |
| Integration/API Test | Ada perubahan API atau integrasi | Yes (jika applicable) |
| Regression Test | Sebelum release | Yes |
| Performance Test | Fitur high-traffic atau perubahan arsitektur | Conditional |
| Security Test | Fitur auth, payment, data sensitif | Conditional |

### Exit Criteria per Test Phase

| Phase | Exit Criteria |
|-------|---------------|
| Smoke Test | Semua critical path pass, build layak di-test |
| Functional Test | Semua AC tervalidasi, no critical/high bug open |
| Integration Test | Semua endpoint tervalidasi sesuai contract |
| Regression Test | Pass rate >= 95%, no new critical/high bug |

### Output

- Test Plan / Test Strategy document
- Risk assessment
- Effort estimation

---

## 4. Test Design

**When:** During sprint / development (parallel with dev)

### QA Actions

- Create Test Scenarios (high-level)
- Create Test Cases (detailed positive & negative)
- Map test cases to user stories / requirements (Traceability Matrix)
- Prepare test data
- Peer review test cases

### Test Design Techniques

| Technique | Penggunaan |
|-----------|-----------|
| Equivalence Partitioning | Membagi input ke grup yang setara |
| Boundary Value Analysis | Test nilai batas (min, max, min-1, max+1) |
| Decision Table | Kombinasi kondisi dan aksi |
| State Transition | Flow status/state changes |
| Error Guessing | Berdasarkan pengalaman |
| Pairwise Testing | Kombinasi parameter efisien |

### Test Case Format

Gunakan bahasa yang mudah dimengerti oleh tim
Jika diperlukan gunakan atau tambahkan format **Given-When-Then**:

```gherkin
Scenario: [Nama Scenario]
  Given [precondition / context]
  When [action yang dilakukan user]
  Then [expected result]
```

### Traceability Matrix

| Requirement ID | User Story | Test Scenario ID | Test Case ID | Status |
|----------------|------------|------------------|--------------|--------|
| REQ-001 | US-001 | TS-001 | TC-001, TC-002 | Designed |

### Peer Review Process *

- Setiap test case **wajib di-review** oleh minimal 1 QA lain sebelum eksekusi*
- Review checklist:
  - [ ] Coverage terhadap AC lengkap
  - [ ] Positive dan negative scenario tercakup
  - [ ] Boundary values dipertimbangkan
  - [ ] Test data realistis dan reproducible
  - [ ] Steps jelas dan bisa dieksekusi orang lain


### Output

- Test Cases document
- Test Data
- Traceability Matrix

*jika diperlukan terlebih jika sedang subtitution

---

## 5. Test Execution

**When:** After build deployment to test environment

### Execution Order

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│ 1. Smoke    │ -> │ 2. Functional    │ -> │ 3. Integration/API  │ -> │ 4. Regression    │
│    Test     │    │    Test          │    │    Test             │    │    Test          │
└─────────────┘    └──────────────────┘    └─────────────────────┘    └──────────────────┘
```

#### 1. Smoke Test

- Validasi build deployment berhasil
- Validasi critical business flow berjalan (login, core feature)
- **Jika smoke test fail → build REJECTED, tidak lanjut ke functional test**

#### 2. Functional Test

- Validasi positive dan negative case per story
- Validasi boundary value analysis
- Validasi business rules dan acceptance criteria
- Validasi error handling dan validation messages

#### 3. Integration / API Test (If applicable)

- Validasi: HTTP Status Code, Response Body, JSON Schema
- Test scenarios: Valid payload, invalid payload, empty field, null handling, unauthorized access
- Validasi response time within acceptable threshold

#### 4. Regression Test

- Validasi semua fitur existing yang berpotensi terdampak
- Validasi business-as-usual processes
- Jalankan automated regression suite

### QA Rules During Execution

| Rule | SLA |
|------|-----|
| Blocker dikomunikasikan ke Dev & PO | < 30 menit sejak ditemukan |
| Bug card dibuat di JIRA | < 1 hari kerja setelah ditemukan |
| Re-test fixed defects | < 1 hari kerja setelah status "Fixed" |
| Test status di-update | Daily (end of day) |
| All results harus recorded | Sebelum end of sprint |
| Failed cases harus punya bug card | Mandatory |

### Output

- **Test Result** — updated pada SIT Test Cases document
  - Contoh: `[TESTCASES][SIT] - NEWMARKIS - Fee Ekses & Co Share [TEMPLATE].xlsx`
- **Bug Card** — ditulis di JIRA dengan format minimum:
  - Title (jelas dan deskriptif)
  - Description
  - Steps to Reproduce
  - Expected Result
  - Actual Result
  - Severity & Priority
  - Test Data yang digunakan
  - Environment
  - Screenshots / Video Records
  - Affected version

---

## 6. Defect Management

### Defect Lifecycle

```
┌─────┐    ┌──────┐    ┌─────────────┐    ┌───────┐    ┌────────┐    ┌────────┐
│ New │ -> │ Open │ -> │ In Progress │ -> │ Fixed │ -> │ Retest │ -> │ Closed │
└─────┘    └──────┘    └─────────────┘    └───────┘    └────────┘    └────────┘
                                                             │
                                                             v
                                                        ┌──────────┐
                                                        │ Reopened │
                                                        └──────────┘
```

### Severity & Priority Definition

| Severity | Definisi | Contoh | SLA Fix |
|----------|----------|--------|---------|
| **Critical** | System down, data loss, security breach | Aplikasi crash, data corruption | < 4 jam |
| **High** | Major function broken, no workaround | User tidak bisa submit claim | < 1 hari kerja |
| **Medium** | Function broken, ada workaround | Filter tidak bekerja tapi bisa manual search | < 3 hari kerja |
| **Low** | Cosmetic, minor UI issue | Typo, alignment off | Next sprint |

### Priority vs Severity

| | High Priority | Low Priority |
|---|---|---|
| **High Severity** | Fix immediately | Discuss with PO |
| **Low Severity** | Fix in current sprint | Backlog |

### Good Bug Report Checklist

- [ ] Title jelas dan deskriptif (apa yang broken dan di mana)
- [ ] Steps to reproduce lengkap dan reproducible
- [ ] Expected vs Actual result spesifik
- [ ] Evidence: screenshot / log / video recording
- [ ] Environment info (browser, OS, environment name)
- [ ] Test data yang digunakan
- [ ] Severity & Priority sudah di-assign
- [ ] Linked ke related story/task

> **Rule:** Quality bug > many unclear bugs

### Defect Triage

- Dilakukan daily (atau sesuai kebutuhan)
- Peserta: QA Lead, Dev Lead, PO (jika perlu)
- Keputusan: Fix now / Defer / Won't fix / Duplicate
- Semua keputusan didokumentasikan di JIRA

---

## 7. Test Environment Management

### Environment Landscape

| Environment | Purpose | Managed By | Data Type |
|-------------|---------|------------|-----------|
| DEV | Development & unit testing | Developer | Mock/dummy |
| SIT | System Integration Testing | QA Team | Test data (sanitized) |
| UAT | User Acceptance Testing | Business/PO | Realistic data |
| Staging | Pre-production validation | DevOps/QA | Production-like |
| Production | Live system | Operations | Real data |

### Environment Rules

| Rule | Detail |
|------|--------|
| Deployment request | QA mengajukan deployment request ke SIT/UAT |
| Data refresh | Dilakukan per sprint atau on-demand |
| Environment stability | Tidak boleh deploy ke SIT saat QA sedang testing tanpa konfirmasi |
| Access control | QA punya akses read + execute di SIT/UAT, tidak langsung ke DB production |
| Downtime communication | Minimal 1 jam sebelum environment maintenance |

### Test Data Management

- Test data harus **reproducible** dan **independent** antar test case
- Tidak menggunakan production data tanpa sanitization
- Test data yang dibuat harus didokumentasikan
- Cleanup strategy: data di-reset per cycle atau menggunakan unique identifiers

---

## 8. Automation Strategy

### When to Automate

| Automate | Don't Automate |
|----------|----------------|
| Regression tests | Exploratory testing |
| Stable features | Frequently changing UI |
| High-risk business flows | One-time validation |
| Repetitive scenarios | Usability testing |
| Smoke tests | Features belum stabil |
| Data-driven tests | Investigative testing |

### Automation Tools

| Category | Tool | Notes |
|----------|------|-------|
| UI Testing | Playwright | Primary framework |
| API Testing | Playwright / Postman | Integrated dalam framework |
| Performance | k6 | Load & stress testing |
| CI/CD | GitHub Actions | Automated pipeline |
| BDD Framework | Cucumber | Gherkin syntax |
| Reporting | Cucumber HTML Report | Auto-generated |

### Automation Coverage Target

| Timeline | Target |
|----------|--------|
| Q1 | 50% regression test ter-automasi |
| Q2 | 70% regression test ter-automasi |
| Q3 | 85% regression test ter-automasi |
| Q4 | 90%+ regression test ter-automasi |

### Automation Pipeline Flow

```
┌──────────────┐    ┌────────────────┐    ┌───────────────┐    ┌──────────────┐
│ Code Push /  │ -> │ Build & Deploy │ -> │ Run Automated │ -> │ Generate     │
│ PR Created   │    │ to SIT         │    │ Tests         │    │ Report       │
└──────────────┘    └────────────────┘    └───────────────┘    └──────────────┘
                                                                       │
                                                                       v
                                                               ┌──────────────┐
                                                               │ Notify Team  │
                                                               └──────────────┘
```

### Automation Run Schedule

| Trigger | Scope | Frequency |
|---------|-------|-----------|
| PR Created | Smoke + affected tests | Every PR |
| Merge to main | Full regression | On merge |
| Scheduled | Full regression | Nightly (if configured) |
| Manual | Selected suite | On-demand |

### Automation Maintenance

| Activity | Frequency | Responsible |
|----------|-----------|-------------|
| Review flaky tests | Weekly | QA Automation |
| Update selectors/locators | As needed (on failure) | QA Automation |
| Refactor page objects | Per sprint | QA Automation |
| Review & update test data | Per sprint | QA Team |
| Framework upgrade | Quarterly | QA Lead + QA Automation |

### Flaky Test Policy

- Flaky test = test yang kadang pass, kadang fail tanpa code change
- Jika test flaky > 3x dalam seminggu → quarantine dan fix dalam sprint tersebut
- Flaky tests yang di-quarantine tidak dihitung dalam pass rate
- Root cause harus dianalisis: timing issue, test data dependency, environment issue

---

## 9. Test Reporting & Communication

### Daily Reporting

Dilakukan di daily standup atau via Slack/Teams:

- Test progress (executed vs planned)
- Blocking issues
- Risks yang teridentifikasi
- Help needed

### End of Sprint Report

Template standar:

```
## Test Summary Report - Sprint [X]

### Execution Summary
| Metric | Count |
|--------|-------|
| Total Test Cases | X |
| Executed | X |
| Passed | X |
| Failed | X |
| Blocked | X |
| Not Executed | X |
| Pass Rate | X% |

### Defect Summary
| Severity | Open | Fixed | Closed | Deferred |
|----------|------|-------|--------|----------|
| Critical | X | X | X | X |
| High | X | X | X | X |
| Medium | X | X | X | X |
| Low | X | X | X | X |

### Automation Coverage
- Automated Tests: X
- Manual-only Tests: X
- Automation Coverage: X%

### Risks & Known Issues
1. [Risk/Issue description] - [Mitigation]

### Recommendation
- [ ] Go for Release
- [ ] Conditional Release (with documented risks)
- [ ] No-Go (reason: ...)
```

### Communication Channels

| Situation | Channel | Audience | SLA |
|-----------|---------|----------|-----|
| Blocker found | Slack/Teams + JIRA | Dev + PO | Immediate |
| Daily progress | Daily standup | Scrum team | Daily |
| Test report | Email / Confluence | Stakeholders | End of sprint |
| Release recommendation | Meeting + Document | PO + Dev Lead + SM | Before release |

---

## 10. Release Decision

### RACI Matrix

| Activity | QA | Product Owner | Dev Lead | Scrum Master |
|----------|-----|---------------|----------|--------------|
| Quality Assessment | **Responsible** | Informed | Consulted | Informed |
| Release Recommendation | **Responsible** | Informed | Consulted | Informed |
| Release Approval | Consulted | **Accountable** | Consulted | Informed |
| Risk Acceptance (known issues) | Informed | **Accountable** | Consulted | Informed |

### Release Criteria

| Criteria | Threshold |
|----------|-----------|
| Critical bugs open | 0 |
| High bugs open | 0 |
| Medium bugs open | Documented & accepted by PO |
| Core business flows | 100% pass |
| Regression pass rate | >= 95% |
| Smoke test | 100% pass |
| Known risks | Documented with mitigation plan |

### Release Decision Options

| Decision | Condition |
|----------|-----------|
| **Go** | Semua release criteria terpenuhi |
| **Conditional Go** | Ada known issues, PO sign-off dengan risk acceptance |
| **No-Go** | Critical/High bug open, core flow fail |

### Conditional Release Process

Jika release dengan known issues:
1. QA dokumentasikan semua known issues
2. PO memberikan sign-off tertulis (email/JIRA comment)
3. Risk acceptance dicatat di release notes
4. Monitoring plan setelah release didefinisikan
5. Hotfix timeline disepakati

---

## 11. Metrics & KPI

### QA Performance Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Defect Detection Rate | Bugs found in testing / Total bugs | >= 90% |
| Test Case Pass Rate | Passed TC / Total Executed TC | >= 95% |
| Defect Leakage | Bugs found in prod / Total bugs | < 10% |
| Automation Coverage | Automated TC / Total TC (regression) | >= 80% |
| Test Execution Efficiency | TC executed on time / Planned TC | >= 90% |
| Defect Reopen Rate | Reopened bugs / Total closed bugs | < 5% |
| Automation ROI | Time saved by automation / Time to maintain | > 3:1 |

### Sprint-level Tracking

| Metric | Tracked By | Frequency |
|--------|-----------|-----------|
| Test progress | QA | Daily |
| Bug open/close trend | QA Lead | Sprint |
| Escaped defects | QA Lead | Monthly |
| Automation stability | QA Automation | Weekly |
| Environment uptime | DevOps + QA | Sprint |

---

## 12. Knowledge Transfer & Onboarding

### QA Onboarding Checklist (New Team Member)

#### Week 1: Foundation

- [ ] Baca dokumen ini (QA Way of Working)
- [ ] Baca QA Automation Framework Bible
- [ ] Setup development environment (Node.js, Playwright, VS Code)
- [ ] Akses ke tools: JIRA, Confluence, Git repository, Test environments
- [ ] Pahami project structure dan architecture overview
- [ ] Shadow experienced QA selama test execution

#### Week 2: Hands-on

- [ ] Assign buddy/mentor
- [ ] Tulis test case untuk 1 story (dengan review)
- [ ] Eksekusi test case yang sudah ada
- [ ] Buat 1 bug card di JIRA
- [ ] Run existing automation suite
- [ ] Pahami CI/CD pipeline

#### Week 3-4: Independent

- [ ] Handle 1 story secara independent (dengan supervision)
- [ ] Kontribusi automation test case
- [ ] Participate in defect triage
- [ ] Present test result di sprint review

### Mandatory Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| QA Way of Working | `docs/bible/inhealth-qa-work-of-way-bible.md` | Process & standards |
| Automation Framework Bible | `docs/bible/inhealth-qa-automation-framework-bible.md` | Technical guide |
| Test Cases | JIRA / Excel | Test coverage |
| Traceability | `docs/traceability.md` | Requirement mapping |
| User Stories | `docs/user-stories/` | Business context |

### Knowledge Sharing

- **Brown bag session** — bi-weekly (sharing lessons learned, tools, techniques)
- **Pair testing** — minimal 1x per sprint
- **Documentation update** — setiap ada perubahan process/tools
- **Retrospective participation** — setiap sprint

---

## 13. Continuous Improvement

### After Sprint / Release — Retrospective Questions

| Category | Questions |
|----------|-----------|
| Escaped Defects | Apa yang lolos ke production? Kenapa tidak terdeteksi? |
| Automation | Apa yang bisa di-automasi dari sprint ini? |
| Bottlenecks | Apa yang memperlambat testing? |
| Tools | Apakah tools saat ini masih efektif? |
| Process | Apakah ada proses yang bisa disederhanakan? |
| Knowledge | Apakah ada knowledge gap yang perlu diisi? |

### Improvement Backlog

- Setiap improvement item dicatat di backlog terpisah
- Diprioritaskan berdasarkan impact dan effort
- Minimal 1 improvement item di-deliver per sprint
- Review improvement progress setiap quarter

### Quality Gates Evolution

- Review quality gates setiap quarter
- Adjust threshold berdasarkan maturity team
- Benchmark dengan industry standard

---

## 14. Standarisasi Validasi (Validation Standards)

**Purpose:** Checklist standar validasi + contoh praktis yang WAJIB menjadi referensi saat membuat test cases. Memastikan coverage validasi konsisten di seluruh tim QA.

**Cara Pakai:**
1. Identifikasi tipe fitur yang akan di-test
2. Lihat Decision Table (14.11) untuk tahu standar mana yang applicable
3. Gunakan checklist + contoh sebagai dasar pembuatan test cases

---

### 14.1 Validasi Form / Input Fields

Setiap form input WAJIB divalidasi dengan skenario berikut:

| Kategori Validasi | Yang Harus Dicek | Contoh |
|-------------------|------------------|--------|
| **Required field** | Field mandatory menampilkan error saat dikosongkan | "Nama Klasifikasi wajib diisi" |
| **Max length** | Input melebihi batas karakter ditolak/dipotong | Nama max 100 char → isi 101 char |
| **Min length** | Input di bawah minimum ditolak | Password min 8 char → isi 7 char |
| **Data type** | Input tipe salah ditolak | Numeric field diisi huruf |
| **Format** | Format spesifik divalidasi | Email tanpa @, tanggal invalid |
| **Boundary values** | Nilai batas (min, max, min-1, max+1) | Amount min=0, max=999999999 |
| **Special characters** | Handling karakter khusus | SQL injection, XSS: `<script>`, `' OR 1=1` |
| **Whitespace** | Leading/trailing space di-trim atau ditolak | "  nama  " → "nama" |
| **Default values** | Field memiliki default yang benar | Status default = "Draft" |
| **Dropdown/Select** | Opsi sesuai master data, bisa dipilih | List KOPS sesuai tabel referensi |
| **Date fields** | Format, range, validasi tanggal valid | 31 Feb ditolak, format DD/MM/YYYY |
| **Numeric fields** | Negative, zero, decimal, max value | Amount = -1, 0, 999999999.99 |

#### Standar Error Message Form

| Kondisi | Format Error Message |
|---------|---------------------|
| Required kosong | "[Nama Field] wajib diisi" |
| Format salah | "Format [Nama Field] tidak valid" |
| Melebihi batas | "[Nama Field] maksimal [N] karakter" |
| Nilai di luar range | "[Nama Field] harus antara [min] dan [max]" |
| Duplikat | "[Nama Field] sudah terdaftar" |

#### Example: Validasi Form Setting Klasifikasi

```gherkin
@validation @form @NM-1267
Scenario: Gagal simpan saat field wajib dikosongkan
  Given user berada di halaman Setting Klasifikasi Scoring
  When user mengosongkan field "Nama Klasifikasi"
  And user klik tombol "Simpan"
  Then tampil error message "Nama Klasifikasi wajib diisi"
  And data tidak tersimpan ke database

Scenario: Reject input melebihi max length
  Given user berada di halaman Setting Klasifikasi Scoring
  When user mengisi field "Nama Klasifikasi" dengan 101 karakter
  And user klik tombol "Simpan"
  Then tampil error "Nama Klasifikasi maksimal 100 karakter"

Scenario: Reject input numeric di field text-only
  Given user berada di halaman Setting KOPS Scoring
  When user mengisi field "Score" dengan value "abc"
  Then field hanya menerima angka
  And karakter non-numeric tidak ter-input
```

---

### 14.2 Validasi Tabel / Grid / List

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Kolom tampil** | Semua kolom sesuai requirement tampil dengan urutan benar |
| **Data accuracy** | Data yang tampil sesuai dengan data di database/API |
| **Sorting** | Default sort sesuai spec, sort ASC/DESC berfungsi per kolom |
| **Pagination** | Navigasi halaman benar, jumlah item per page sesuai |
| **Empty state** | Pesan "Data tidak ditemukan" saat data kosong |
| **Filter** | Filter berdasarkan kriteria yang tersedia berfungsi |
| **Search** | Search menampilkan hasil yang relevan |
| **Row count** | Total record yang ditampilkan sesuai (count indicator) |
| **Loading state** | Loading indicator tampil saat data di-fetch |
| **Actions per row** | Tombol aksi (edit, delete, view) sesuai permission user |

#### Standar Filter & Search

| Validasi | Detail |
|----------|--------|
| Filter single | Satu filter menghasilkan data yang sesuai |
| Filter kombinasi | Multiple filter menghasilkan interseksi yang benar |
| Filter + Pagination | Navigasi halaman tetap mempertahankan filter aktif |
| Search partial | Pencarian sebagian kata menampilkan hasil |
| Search case-insensitive | "ABC" dan "abc" menghasilkan data yang sama |
| Reset filter | Setelah reset, semua data tampil kembali |

#### Example: Validasi Tabel Invoice List

```gherkin
@validation @table @NM-1080
Scenario: Verify kolom Invoice List tampil lengkap
  Given user login ke EXSO sebagai admin
  When user navigasi ke halaman Invoice List
  Then tabel menampilkan kolom: No, No Invoice, Flagging, Status, Tanggal, Amount, Action
  And kolom tersusun sesuai urutan requirement

Scenario: Filter berdasarkan flagging EX02
  Given user berada di halaman Invoice List
  When user memilih filter Flagging = "EX02"
  Then hanya invoice dengan flagging EX02 yang tampil
  And row count menunjukkan jumlah yang sesuai

Scenario: Empty state saat tidak ada data
  Given user berada di halaman Invoice List
  When user memilih filter dengan kriteria yang tidak ada datanya
  Then tampil pesan "Data tidak ditemukan"
  And tabel tidak menampilkan row data
```

---

### 14.3 Validasi API Response

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **HTTP Status Code** | 200, 201, 400, 401, 403, 404, 409, 500 |
| **Response body structure** | JSON schema sesuai contract |
| **Response data accuracy** | Data yang dikembalikan benar dan lengkap |
| **Response time** | Dalam threshold (< 3 detik operasi normal) |
| **Error response format** | Konsisten: `{ "status": "error", "message": "...", "code": "..." }` |
| **Pagination metadata** | totalItems, totalPages, currentPage, pageSize |
| **Null/empty handling** | Field nullable → null, bukan string kosong |
| **Date format** | ISO 8601: `2026-08-01T00:00:00+07:00` |

#### Standar Skenario API Testing

| Skenario | Expected |
|----------|----------|
| Valid payload | 200/201 + data benar |
| Missing required field | 400 + error message spesifik |
| Invalid data type | 400 + validation error |
| Unauthorized (no token) | 401 |
| Forbidden (no permission) | 403 |
| Resource not found | 404 |
| Duplicate entry | 409 atau 400 + pesan duplikat |
| Server error | 500 tanpa expose stack trace |

#### Example: Validasi API Scoring Classification

```gherkin
@validation @api @NM-1267
Scenario: API sukses create klasifikasi baru
  Given endpoint POST /api/v1/scoring-classification
  And request body:
    | field        | value           |
    | name         | Klasifikasi A   |
    | min_score    | 0               |
    | max_score    | 50              |
  When request dikirim dengan token valid
  Then response status = 201
  And response body contains field "id" yang tidak null
  And response time < 3000ms

Scenario: API reject saat required field missing
  Given endpoint POST /api/v1/scoring-classification
  And request body tanpa field "name"
  When request dikirim dengan token valid
  Then response status = 400
  And response body contains "name is required"

Scenario: API reject unauthorized request
  Given endpoint GET /api/v1/scoring-classification
  When request dikirim tanpa authorization header
  Then response status = 401
  And response body contains "Unauthorized"
```

---

### 14.4 Validasi Status / State Transition

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Happy path transition** | Status berubah sesuai flow (Draft → Open → Approved) |
| **Invalid transition** | Transisi tidak diperbolehkan → error |
| **Permission per status** | Hanya role tertentu yang bisa ubah status |
| **Button availability** | Tombol aksi hanya tersedia pada status yang valid |
| **Audit trail** | Perubahan tercatat (who, when, from → to) |
| **Concurrent update** | 2 user update bersamaan → conflict handling |

#### Transition Matrix Template

| Current Status | Action | Next Status | Allowed | Role |
|----------------|--------|-------------|---------|------|
| Draft (INV01) | Submit | Open (INV02) | ✓ | Operator |
| Open (INV02) | Ajukan Bayar | Pengajuan (INV03) | ✓ | SATRIA |
| Pengajuan (INV03) | Approve | Disetujui (INV04) | ✓ | EXSO Admin |
| Pengajuan (INV03) | Reject | Ditolak (INV05) | ✓ | EXSO Admin |
| Draft (INV01) | Approve | - | ✗ | - |
| Disetujui (INV04) | Ajukan Bayar | - | ✗ | - |

#### Example: Validasi Status Invoice

```gherkin
@validation @state-transition @NM-1080
Scenario: Transisi valid - Pengajuan ke Disetujui
  Given invoice dengan status "Pengajuan Pembayaran" (INV03)
  And user login sebagai EXSO Admin
  When user klik tombol "Approve"
  Then status invoice berubah ke "Pengajuan Disetujui" (INV04)
  And audit log mencatat perubahan status

Scenario: Transisi invalid - Draft tidak bisa di-approve
  Given invoice dengan status "Draft" (INV01)
  And user login sebagai EXSO Admin
  When user melihat detail invoice
  Then tombol "Approve" tidak tersedia / disabled
```

---

### 14.5 Validasi Notifikasi & Alert

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Success message** | Tampil setelah aksi berhasil, auto-dismiss |
| **Error message** | Tampil dengan penjelasan yang actionable |
| **Warning/Confirm** | Konfirmasi sebelum aksi destruktif |
| **Toast/snackbar** | Posisi konsisten, tidak menghalangi interaksi |
| **Email notification** | Terkirim ke recipient yang benar |
| **In-app notification** | Tercatat di notification center |
| **Trigger accuracy** | Notifikasi hanya terpicu pada event yang benar |

#### Standar Format Pesan

| Tipe | Format | Auto-dismiss |
|------|--------|-------------|
| Success | "Data berhasil [disimpan/diupdate/dihapus]" | Ya (3-5 detik) |
| Error | "Gagal [aksi]. [Alasan spesifik]" | Tidak |
| Warning | "Apakah Anda yakin ingin [aksi]?" + tombol konfirmasi | Tidak |
| Info | "[Informasi yang perlu diketahui user]" | Ya (5 detik) |

#### Example: Validasi Notifikasi

```gherkin
@validation @notification
Scenario: Success message setelah simpan setting
  Given user berada di halaman Setting Klasifikasi
  When user mengisi form dengan data valid
  And user klik tombol "Simpan"
  Then tampil toast success "Data berhasil disimpan"
  And toast otomatis hilang setelah 3-5 detik

Scenario: Confirmation dialog sebelum delete
  Given user berada di halaman Setting Klasifikasi
  When user klik tombol "Hapus" pada row data
  Then tampil dialog konfirmasi "Apakah Anda yakin ingin menghapus data ini?"
  And tersedia tombol "Ya, Hapus" dan "Batal"

Scenario: Email notifikasi saat invoice diajukan
  Given SATRIA mengajukan pembayaran invoice EX02
  When status berubah ke "Pengajuan Pembayaran" (INV03)
  Then email notifikasi terkirim ke EXSO Admin
  And email berisi: No Invoice, Amount, Tanggal Pengajuan
```

---

### 14.6 Validasi Permission / Authorization

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Menu visibility** | Menu hanya tampil untuk role yang berhak |
| **Button visibility** | Tombol aksi hanya tampil sesuai permission |
| **API authorization** | Endpoint reject request tanpa permission |
| **Data scope** | User hanya lihat data sesuai scope (KOPS, regional, nasional) |
| **Cross-role testing** | Test tiap fitur dengan minimal 2 role |
| **Session expired** | Redirect ke login setelah session habis |
| **Direct URL access** | User tanpa permission tidak bisa akses via URL langsung |

#### Role-based Testing Matrix Template

| Feature / Action | Admin | Manager/Lead | Operator | Viewer |
|------------------|-------|--------------|----------|--------|
| View list | ✓ | ✓ | ✓ | ✓ |
| Create data | ✓ | ✓ | ✓ | ✗ |
| Edit data | ✓ | ✓ | ✗ | ✗ |
| Delete data | ✓ | ✗ | ✗ | ✗ |
| Approve/Reject | ✓ | ✓ | ✗ | ✗ |
| Access setting | ✓ | ✗ | ✗ | ✗ |

#### Example: Validasi Permission Approval

```gherkin
@validation @permission @NM-1080
Scenario: EXSO Admin dapat approve pengajuan
  Given user login sebagai EXSO Admin
  And ada invoice dengan status "Pengajuan Pembayaran" (INV03)
  When user navigasi ke halaman Approval Pengajuan
  Then tombol "Approve" dan "Reject" tersedia
  And user dapat melakukan approve

Scenario: Operator SATRIA tidak dapat approve
  Given user login sebagai Operator SATRIA
  When user navigasi ke halaman Invoice List
  Then menu "Approval Pengajuan" tidak tampil di sidebar
  And akses langsung via URL menampilkan "403 - Forbidden"
```

---

### 14.7 Validasi File Upload / Download

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **File type** | Hanya format yang diperbolehkan (PDF, XLSX, JPG, PNG) |
| **File size** | Melebihi batas → error message |
| **File name** | Karakter spesial di nama file tidak error |
| **Empty file** | File 0 byte ditolak |
| **Corrupted file** | File rusak ditolak dengan pesan jelas |
| **Multiple upload** | Jika diperbolehkan, semua file terupload |
| **Download** | File ter-download dengan nama & isi benar |
| **Preview** | File tampil dengan benar di preview |
| **Progress indicator** | Progress bar tampil selama upload |

#### Example: Validasi Upload Bukti Bayar

```gherkin
@validation @upload @NM-1080
Scenario: Upload bukti bayar format PDF berhasil
  Given user berada di halaman Upload Bukti Bayar
  When user memilih file "bukti-transfer.pdf" (size: 2MB)
  And user klik tombol "Upload"
  Then file berhasil terupload
  And progress bar menunjukkan 100%
  And tampil nama file yang sudah terupload

Scenario: Reject upload file melebihi batas ukuran
  Given user berada di halaman Upload Bukti Bayar
  When user memilih file "large-file.pdf" (size: 15MB)
  Then tampil error "Ukuran file maksimal 10MB"
  And file tidak terupload

Scenario: Reject upload format tidak diperbolehkan
  Given user berada di halaman Upload Bukti Bayar
  When user memilih file "document.exe"
  Then tampil error "Format file tidak didukung. Gunakan PDF, JPG, atau PNG"
```

---

### 14.8 Validasi Kalkulasi / Business Logic

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Formula accuracy** | Hasil perhitungan sesuai formula |
| **Rounding** | Pembulatan sesuai aturan bisnis |
| **Zero division** | Pembagian dengan 0 di-handle |
| **Overflow** | Nilai melebihi kapasitas field di-handle |
| **Negative result** | Jika tidak boleh negatif → 0 atau error |
| **Cascading calculation** | Perubahan satu field update field terkait |
| **Precision** | Decimal precision konsisten (2 digit untuk currency) |

#### Example: Validasi Carry-Over Scoring Verifikator

```gherkin
@validation @calculation @NM-1303
Scenario Outline: Kalkulasi carry-over load verifikator
  Given verifikator memiliki record hari kerja sebelumnya:
    | load   | achieved   |
    | <load> | <achieved> |
  When EOD job berjalan pada hari kerja berikutnya
  Then load hari ini = MAX(0, <load> - <achieved>) = <expected_load>
  And achieved_score = 0
  And score_gap = 0

  Examples:
    | load | achieved | expected_load | keterangan        |
    | 100  | 60       | 40            | Sisa kerja normal |
    | 80   | 120      | 0             | Over-perform      |
    | 100  | 100      | 0             | Tepat selesai     |
    | 0    | 0        | 0             | Zero case         |
    | 500  | 0        | 500           | Full carry-over   |

Scenario: Verifikator baru tanpa record sebelumnya
  Given verifikator baru diaktifkan hari ini
  And tidak ada record hari kerja sebelumnya
  When EOD job berjalan
  Then load = 0 (default)
  And achieved_score = 0
  And score_gap = 0
```

---

### 14.9 Validasi Scheduler / Background Job

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Trigger time** | Job berjalan pada waktu yang ditentukan |
| **Timezone** | Waktu eksekusi sesuai timezone (WIB) |
| **Idempotency** | Eksekusi ulang tidak duplikasi data |
| **Error handling** | Job gagal → alert terkirim, bisa re-trigger |
| **Logging** | Start time, end time, record count, status tercatat |
| **Transaction** | All-or-nothing, partial failure → rollback |
| **Performance** | Job selesai dalam batas waktu wajar |
| **Concurrency** | Eksekusi bersamaan tidak corrupt data |
| **Skip conditions** | Job skip pada kondisi yang sesuai (hari libur) |

#### Example: Validasi EOD Job Inisialisasi

```gherkin
@validation @scheduler @NM-1303
Scenario: Job idempotent - tidak duplikat saat re-trigger
  Given EOD job sudah berjalan sukses hari ini
  And record sudah dibuat untuk 5 verifikator
  When EOD job di-trigger ulang (manual)
  Then jumlah record tetap 5 (tidak bertambah)
  And tidak ada error/exception

Scenario: Job skip di hari libur
  Given hari ini adalah hari libur nasional (di tabel referensi)
  When EOD job terpicu pada 00:10 WIB
  Then job tidak membuat record apapun
  And log mencatat "Skipped: hari libur"

Scenario: Rollback saat partial failure
  Given ada 10 verifikator aktif
  And terjadi error saat proses verifikator ke-5
  When EOD job berjalan
  Then 0 record tersimpan (rollback semua)
  And alert terkirim ke tim
```

---

### 14.10 Validasi Report / Export

| Kategori Validasi | Yang Harus Dicek |
|-------------------|------------------|
| **Data accuracy** | Data di report = data di aplikasi/DB |
| **Filter applied** | Filter parameter tercermin di hasil report |
| **Date range** | Data sesuai range tanggal yang dipilih |
| **Format output** | File sesuai format (Excel, PDF, CSV) |
| **Column header** | Header kolom sesuai requirement |
| **Sorting** | Data di-sort sesuai spesifikasi |
| **Total/Summary** | Angka total sesuai penjumlahan detail |
| **Empty report** | Tidak ada data → pesan kosong, bukan error |
| **Large data** | Data besar tidak timeout atau corrupt |
| **Download naming** | Nama file mengandung identifikasi (tanggal, tipe) |

#### Example: Validasi Export Report SLA Klaim

```gherkin
@validation @report @NM-1314
Scenario: Export report SLA Klaim ke Excel
  Given user berada di halaman Report Argo SLA Klaim
  And user memilih filter Periode = "Juli 2026", KOPS = "Semua"
  When user klik tombol "Export Excel"
  Then file ter-download dengan nama "Report_SLA_Klaim_Juli2026.xlsx"
  And data di Excel sesuai dengan data yang tampil di UI
  And kolom header: No, KOPS, Total Klaim, SLA Met, SLA Missed, Persentase

Scenario: Report kosong tanpa error
  Given user memilih filter Periode = "Januari 2020" (tidak ada data)
  When user klik tombol "Export Excel"
  Then file ter-download dengan header kolom tanpa data row
  And tidak terjadi error/exception
```

---

### 14.11 Cara Penggunaan Standarisasi Validasi

#### Decision Table: Tipe Fitur → Standar yang Digunakan

| Tipe Fitur | Standar Wajib | Standar Conditional |
|------------|---------------|---------------------|
| Form CRUD | 14.1 + 14.3 + 14.5 + 14.6 | 14.4 (jika ada status) |
| List / Grid / Tabel | 14.2 + 14.3 + 14.6 | 14.7 (jika ada export) |
| Report / Export | 14.10 + 14.3 + 14.6 | - |
| File Management | 14.7 + 14.3 + 14.5 | - |
| Background Job | 14.9 + 14.8 + 14.5 | - |
| Status Workflow | 14.4 + 14.5 + 14.6 | 14.3 (jika API driven) |
| API-only (tanpa UI) | 14.3 + 14.6 | 14.8 (jika ada kalkulasi) |
| Scoring / Calculation | 14.8 + 14.3 + 14.9 | - |

#### Contoh Penerapan per Story

```
Story: NM-1267 (Setting Klasifikasi Scoring Klaim)
Tipe: Form CRUD + List

Standar yang digunakan:
├── 14.1 Validasi Form (create/edit klasifikasi)
├── 14.2 Validasi Tabel (list klasifikasi)
├── 14.3 Validasi API (endpoint CRUD)
├── 14.5 Validasi Notifikasi (success/error message)
└── 14.6 Validasi Permission (admin only)

Story: NM-1303 (Inisialisasi Data Harian Verifikator)
Tipe: Background Job + Calculation

Standar yang digunakan:
├── 14.8 Validasi Kalkulasi (carry-over formula)
├── 14.9 Validasi Scheduler (trigger, idempotency)
├── 14.5 Validasi Notifikasi (alert saat gagal)
└── 14.3 Validasi API (endpoint manual trigger)
```

#### Checklist Review Test Cases

Gunakan checklist berikut saat me-review test cases:

- [ ] Standar validasi yang applicable sudah diidentifikasi (lihat Decision Table)
- [ ] Positive + Negative scenario tercakup per standar
- [ ] Boundary values dipertimbangkan (min, max, zero, null)
- [ ] Error message sesuai standar format (14.1 / 14.5)
- [ ] Permission/authorization dicek minimal 2 role (14.6)
- [ ] Contoh di atas digunakan sebagai referensi format Gherkin

> **Note:** Standar ini bersifat living document. Update setiap kali ada pattern validasi baru yang ditemukan.

---

## Appendix

### A. Glossary

| Term | Definition |
|------|-----------|
| AC | Acceptance Criteria |
| BRD | Business Requirement Document |
| DoR | Definition of Ready |
| DoD | Definition of Done |
| SIT | System Integration Testing |
| UAT | User Acceptance Testing |
| RACI | Responsible, Accountable, Consulted, Informed |
| SLA | Service Level Agreement |

### B. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-22 | QA Team | Initial version |
| 1.1 | 2026-08-04 | QA Team | Added Section 14: Standarisasi Validasi (Validation Standards) |

---

> **"Quality is not an act, it is a habit." — Aristotle**
