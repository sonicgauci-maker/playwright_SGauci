# Automation Framework Bible
## InHealth MiCare Claim — Playwright + Cucumber BDD

> Panduan lengkap untuk membuat dan menjalankan automation test pada sistem New MiCare Claim.
> Ditujukan untuk seluruh anggota tim QA agar mengikuti standar yang konsisten.

---

## Daftar Isi

1. [Gambaran Arsitektur](#1-gambaran-arsitektur)
2. [Tech Stack & Prerequisites](#2-tech-stack--prerequisites)
3. [Setup Lingkungan](#3-setup-lingkungan)
4. [Struktur Folder Project](#4-struktur-folder-project)
5. [Alur Kerja (Workflow)](#5-alur-kerja-workflow)
6. [Membuat Feature File (Gherkin)](#6-membuat-feature-file-gherkin)
7. [Membuat Page Object](#7-membuat-page-object)
8. [Membuat Step Definitions](#8-membuat-step-definitions)
9. [Test Data Management](#9-test-data-management)
10. [Helper Functions](#10-helper-functions)
11. [Custom World & State Management](#11-custom-world--state-management)
12. [Timeout Management](#12-timeout-management)
13. [Menjalankan Test](#13-menjalankan-test)
14. [Reporting](#14-reporting)
15. [Best Practices & Conventions](#15-best-practices--conventions)
16. [Checklist Sebelum Commit](#16-checklist-sebelum-commit)
17. [Troubleshooting](#17-troubleshooting)

---

## 1. Gambaran Arsitektur

Framework ini menggunakan pola **Page Object Model (POM)** dengan pemisahan ketat antar layer:

```
┌─────────────────────────────────────────────────────────────┐
│                    Feature Files (.feature)                   │
│              Ditulis dalam Gherkin (Given/When/Then)          │
└──────────────────────────┬──────────────────────────────────┘
                           │ di-mapping oleh
┌──────────────────────────▼──────────────────────────────────┐
│                   Step Definitions (.steps.ts)                │
│          Glue code: menghubungkan Gherkin → Page Object      │
└──────────────────────────┬──────────────────────────────────┘
                           │ menggunakan
┌──────────────────────────▼──────────────────────────────────┐
│                     Page Objects (.page.ts)                   │
│           Logic/Action: method yang merepresentasikan aksi    │
└──────────────────────────┬──────────────────────────────────┘
                           │ mengakses
┌──────────────────────────▼──────────────────────────────────┐
│                     Elements (.elements.ts)                   │
│              Locator: selector/element dari UI                │
└─────────────────────────────────────────────────────────────┘
```

**Layer tambahan:**
- **Support** (`src/support/`): Hooks, World, Timeouts — framework bootstrap
- **Helpers** (`src/helpers/`): Utility functions (API calls, credentials, data setup)
- **Data** (`src/data/`): Centralized test data (corporates, providers, benefits)

### Kenapa Arsitektur Ini?

| Benefit | Penjelasan |
|---------|-----------|
| Separation of Concerns | Setiap layer punya tanggung jawab sendiri |
| Reusability | Page Object bisa dipakai di banyak step/scenario |
| Maintainability | Perubahan UI hanya perlu update di Elements file |
| Readability | Feature file bisa dibaca oleh non-technical stakeholder |
| Scalability | Mudah menambah page/feature baru tanpa conflict |

---

## 2. Tech Stack & Prerequisites

| Tool | Versi | Fungsi |
|------|-------|--------|
| Node.js | >= 18.18.0 | Runtime |
| TypeScript | ^5.9 | Language |
| Playwright | ^1.61 | Browser automation engine |
| Cucumber.js | ^11.0 | BDD framework (Gherkin runner) |
| ts-node | ^10.9 | TypeScript execution tanpa compile |
| dotenv | ^17.2 | Environment variable management |

**Install sebelum mulai:**
- Node.js v18+
- Visual Studio Code + Playwright Extension
- Git

---

## 3. Setup Lingkungan

### 3.1. Clone & Install

```bash
git clone <repository-url>
cd inhealth-new-micare-claim-pw
npm install
npx playwright install chromium
```

### 3.2. Konfigurasi Environment (.env)

Buat file `.env` di root project:

```env
WEB_BASE_URL=https://claim.dev.inhealth.co.id
API_BASE_URL=https://development.inhealth.co.id/new-micare-claim-api

ADMIN_USERNAME=admin1.semarang
ADMIN_PASSWORD=<password>
VERIFIKATOR_USERNAME=Verificator.semarang
VERIFIKATOR_PASSWORD=<password>
KANIT_USERNAME=kanit1.semarang
KANIT_PASSWORD=<password>
VERIFIKATOR_PUSAT_USERNAME=verifikator.pusat
VERIFIKATOR_PUSAT_PASSWORD=<password>
```

> **PENTING:** Jangan commit file `.env` ke repository!

### 3.3. Verifikasi Setup

```bash
npm run test:dry
```

Jika semua step terdefinisi, tidak ada error "undefined step".

---

## 4. Struktur Folder Project

```
inhealth-new-micare-claim-pw/
├── .env                          # Environment variables (JANGAN commit)
├── .github/workflows/            # CI/CD pipeline
├── cucumber.js                   # Konfigurasi cucumber runner
├── playwright.config.ts          # Konfigurasi Playwright (untuk tests/ native)
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & npm scripts
│
├── src/
│   ├── features/                 # Feature files (Gherkin)
│   │   ├── login/
│   │   ├── reimbursement/
│   │   ├── register/
│   │   ├── claim/
│   │   ├── e2e/
│   │   ├── scoring/
│   │   └── invoice/
│   │
│   ├── steps/                    # Step definitions
│   │   ├── login.steps.ts
│   │   ├── navigate.steps.ts
│   │   ├── reimbursement.steps.ts
│   │   ├── claim.steps.ts
│   │   ├── scoring.steps.ts
│   │   └── ...
│   │
│   ├── pages/                    # Page Objects (POM)
│   │   ├── login/
│   │   │   ├── login.elements.ts
│   │   │   └── login.page.ts
│   │   ├── configClaimScore/
│   │   │   ├── configClaimScore.elements.ts
│   │   │   └── configClaimScore.page.ts
│   │   ├── sideBarMenu/
│   │   │   ├── sideBarMenu.elements.ts
│   │   │   └── sideBarMenu.page.ts
│   │   ├── components/           # Shared components (modals, topbar)
│   │   └── ...
│   │
│   ├── support/                  # Framework support layer
│   │   ├── hooks.ts              # Before/After hooks (browser lifecycle)
│   │   ├── world.ts              # Custom World (state management)
│   │   └── timeouts.ts           # Centralized timeout constants
│   │
│   ├── helpers/                  # Utility/helper functions
│   │   ├── credentials.ts        # Role-based credential retrieval
│   │   ├── dataHelper.ts         # API helper (create claims, get data)
│   │   ├── register.helper.ts    # Register workflow helpers
│   │   └── reimbursement.helper.ts
│   │
│   └── data/                     # Test data
│       └── testData.ts           # Centralized typed test data
│
├── docs/                         # Documentation
├── reports/                      # Generated HTML reports
└── tests/                        # Native Playwright tests (optional)
```

---

## 5. Alur Kerja (Workflow)

Ketika menambahkan test scenario baru, ikuti langkah ini:

```
1. Identifikasi requirement/test case (dari Jira)
       │
2. CEK step yang SUDAH ADA (navigate.steps.ts, login.steps.ts, dll)
       │
3. Tulis Feature File (.feature) ← Gherkin syntax
       │
4. Buat/update Page Object ← Elements + Page class
       │
5. Buat Step Definition ← Mapping Gherkin → Page Object
       │
6. Dry Run → npm run test:dry (pastikan semua step terdefinisi)
       │
7. Run Test → pastikan passing
       │
8. Commit & Push
```

**Aturan penting:**
- Selalu cek apakah step yang ingin dipakai **sudah ada** sebelum membuat baru
- Reuse step sebanyak mungkin!

---

## 6. Membuat Feature File (Gherkin)

### 6.1. Lokasi File

Simpan di: `src/features/<module>/namaFeature.feature`

### 6.2. Contoh Lengkap Feature File

```gherkin
@NM-1267 @scoring-setting
Feature: Setting Klasifikasi Scoring Klaim
  As a user Staff Klaim HO (kantor pusat)
  I want to configure and save claim scoring classification (bobot case)
  So that the score becomes a parameter for automatic assignment

  # Reference:
  # Story: NM-1267
  # Test Cases: docs/test-cases/NM-1267-test-cases.md
  # Pages: src/pages/configClaimScore/
  # Steps: src/steps/scoring.steps.ts

  Background:
    Given user is on login page
    When user logs in as "verifikator_pusat"
    And user navigates to config claim score page

  @AC-access @smoke
  Scenario: TC01 - User berhasil mengakses halaman Config Claim Score
    Then config claim score page should be displayed
    And claim score table should display correct column headers

  @AC-save @e2e
  Scenario Outline: TC16 - User berhasil menyimpan setting bobot case baru
    When user clicks add claim score button
    And user fills claim score form with TKP "<tkp>" TKP Group "<tkpGroup>" Facility "<facility>" Transaction Type "<transactionType>" Score "<score>"
    And user clicks add button on claim score form
    Then claim score success notification should be displayed

    Examples:
      | tkp  | tkpGroup | facility | transactionType | score |
      | RJTP | RJ       | CASHLESS | ManagedCare     | 3     |

  @AC-save @negative
  Scenario: TC17 - Sistem menampilkan error saat form kosong
    When user clicks add claim score button
    And user clicks add button on claim score form
    Then claim score error notification should be displayed
```

### 6.3. Konvensi Penulisan Feature

| Aspek | Konvensi | Contoh |
|-------|----------|--------|
| Tag Module | `@NM-xxxx` (Jira ticket) | `@NM-1267` |
| Tag Type | `@smoke`, `@e2e`, `@negative` | `@smoke` |
| Tag AC | `@AC-<acceptance-criteria>` | `@AC-access` |
| Scenario Name | Diawali TC ID | `TC01 - Deskripsi singkat` |
| Background | Login + navigasi ke page | `Given...When user logs in...` |
| Given | Setup/precondition | `Given user is on login page` |
| When | Action yang dilakukan user | `When user clicks add button` |
| Then | Expected result/assertion | `Then page should be displayed` |
| Bahasa | Inggris, perspektif user | `user clicks...` |

### 6.4. Step-step yang Sudah Tersedia (REUSABLE)

**Login (login.steps.ts):**
```gherkin
Given user is on login page
When user logs in as "<role>"
# role: admin, verifikator, kanit, verifikator_pusat
Then user should be redirected to dashboard page
```

**Navigation (navigate.steps.ts — 30+ steps tersedia):**
```gherkin
When user navigates to config claim score page
When user navigates to config kops score page
When user navigates to list register page
When user navigates to claims list page
When user navigates to register approval page
When user navigates to payment request page
When user navigates to claim reimbursement page
When user navigates to profile BU ekses page
When user navigates to monitoring deposit ekses page
When user navigates to report SLA page
```

**Claim Flow (claim.steps.ts):**
```gherkin
Given a reimbursement claim has been created via API with memberNo "<memberNo>"
Given register number is retrieved from the claim
Given register is assigned to "<verifikator>" via API
When user assigns the register to "<verifikator>"
When user receives the register
When user edits the register
When user adjusts the claim with plan code "<planCode>" qty "<qty>" and amount "<amount>"
When user completes the claim
When user submits the register
When user approves the register
When user requests payment for the register
Then register should be successfully assigned to "<verifikator>"
Then register should be successfully received
Then claim should be saved successfully
Then register should be submitted successfully
Then register should be approved successfully
Then payment request should be submitted successfully
```

---

## 7. Membuat Page Object

### 7.1. Konsep: Setiap Page Punya 2 File

```
src/pages/<pageName>/
├── <pageName>.elements.ts    ← Locator definitions SAJA
└── <pageName>.page.ts        ← Action methods (logic)
```

### 7.2. Template: Elements File

```typescript
// src/pages/myNewPage/myNewPage.elements.ts
import { Page, Locator } from '@playwright/test';

export class MyNewPageElements {
    // === PAGE HEADER ===
    readonly pageTitle: Locator;

    // === SEARCH SECTION ===
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    // === TABLE ===
    readonly table: Locator;
    readonly tableBody: Locator;
    readonly tableRows: Locator;

    // === FORM ===
    readonly nameInput: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;

    // === NOTIFICATIONS ===
    readonly successToast: Locator;
    readonly errorToast: Locator;

    constructor(private page: Page) {
        this.pageTitle = page.locator('h4.text-primary');
        this.searchInput = page.locator('input[placeholder="Search..."]');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.table = page.locator('#table-test');
        this.tableBody = page.locator('#table-body');
        this.tableRows = page.locator('#table-body tr');
        this.nameInput = page.locator('input[name="name"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.cancelButton = page.locator('button.btn-danger:has-text("Cancel")');
        this.successToast = page.locator(
            '.Toastify__toast--success .Toastify__toast-body div:last-child'
        );
        this.errorToast = page.locator(
            '.Toastify__toast--error .Toastify__toast-body div:last-child'
        );
    }

    // Dynamic locator (untuk element yang butuh parameter)
    getEditButton(rowIndex: number): Locator {
        return this.page.locator(`#action${rowIndex}0`);
    }

    getRowByContent(text: string): Locator {
        return this.tableBody.locator(`tr:has-text("${text}")`);
    }
}
```

### 7.3. Template: Page File

```typescript
// src/pages/myNewPage/myNewPage.page.ts
import { Page, expect } from '@playwright/test';
import { MyNewPageElements } from './myNewPage.elements';

export class MyNewPage {
    private elements: MyNewPageElements;

    constructor(private page: Page) {
        this.elements = new MyNewPageElements(page);
    }

    // === PAGE VERIFICATION ===

    async verifyPageIsDisplayed(): Promise<void> {
        await expect(this.elements.pageTitle).toBeVisible();
        await expect(this.elements.pageTitle).toHaveText('My Page Title');
    }

    // === SEARCH ===

    async search(keyword: string): Promise<void> {
        await this.elements.searchInput.fill(keyword);
        await this.elements.searchButton.click();
    }

    // === FORM ACTIONS ===

    async fillName(value: string): Promise<void> {
        await this.elements.nameInput.fill(value);
    }

    async clickSubmit(): Promise<void> {
        await this.elements.submitButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.elements.cancelButton.click();
    }

    // === React Select Dropdown Pattern ===

    async selectFromDropdown(container: any, value: string): Promise<void> {
        const input = container.getByRole('combobox');
        await input.click();
        await input.fill(value);
        await this.page.getByRole('option', { name: new RegExp(value) }).click();
    }

    // === TABLE ===

    async getRowCount(): Promise<number> {
        return this.elements.tableRows.count();
    }

    async verifyTableContainsRow(text: string): Promise<void> {
        const row = this.elements.getRowByContent(text);
        await expect(row).toBeVisible();
    }

    // === NOTIFICATIONS ===

    async getSuccessToastText(): Promise<string> {
        await expect(this.elements.successToast).toBeVisible();
        return (await this.elements.successToast.textContent()) || '';
    }

    async verifySuccessNotification(): Promise<void> {
        await expect(this.elements.successToast).toBeVisible();
    }

    async verifyErrorNotification(): Promise<void> {
        await expect(this.elements.errorToast).toBeVisible();
    }
}
```

### 7.4. Locator Strategy (Urutan Prioritas)

| Prioritas | Method | Kapan Digunakan | Contoh |
|-----------|--------|-----------------|--------|
| 1 (BEST) | `getByRole()` | Button, link, heading | `page.getByRole('button', { name: 'Submit' })` |
| 2 | `getByText()` | Element dengan text unik | `page.getByText('Claim', { exact: true })` |
| 3 | `getByLabel()` | Form field dengan label | `page.getByLabel('Username')` |
| 4 | `locator('css')` | ID atau class stabil | `page.locator('#table-body')` |
| 5 (LAST) | XPath | TIDAK ADA alternatif | `page.locator("//a[@href='/register']")` |

---

## 8. Membuat Step Definitions

### 8.1. Lokasi File

Simpan di: `src/steps/<module>.steps.ts`

### 8.2. Template Step Definition

```typescript
// src/steps/myModule.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { TIMEOUTS } from '../support/timeouts';
import { MyNewPage } from '../pages/myNewPage/myNewPage.page';

// === Page Verification ===

Then('my page should be displayed', async function (this: CustomWorld) {
    const myPage = new MyNewPage(this.page);
    await myPage.verifyPageIsDisplayed();
});

// === Actions ===

When('user searches with keyword {string}', async function (this: CustomWorld, keyword: string) {
    const myPage = new MyNewPage(this.page);
    await myPage.search(keyword);
});

When('user clicks submit button', async function (this: CustomWorld) {
    const myPage = new MyNewPage(this.page);
    await myPage.clickSubmit();
});

// === Dengan Custom Timeout ===

When('user performs complex operation', { timeout: TIMEOUTS.UI_COMPLEX },
    async function (this: CustomWorld) {
        const myPage = new MyNewPage(this.page);
        await myPage.doSomethingComplex();
    }
);

// === Assertions ===

Then('success notification should contain {string}',
    async function (this: CustomWorld, expected: string) {
        const myPage = new MyNewPage(this.page);
        const text = await myPage.getSuccessToastText();
        expect(text).toContain(expected);
    }
);

Then('table should have {int} rows', async function (this: CustomWorld, expectedCount: number) {
    const myPage = new MyNewPage(this.page);
    const count = await myPage.getRowCount();
    expect(count).toBe(expectedCount);
});

// === Menyimpan State ke World ===

Then('claim number is stored', async function (this: CustomWorld) {
    // Simpan untuk digunakan step selanjutnya
    this.claimNumber = 'value from page';
    console.log(`Stored claim: ${this.claimNumber}`);
});
```

### 8.3. Konvensi Step Definitions

| Aturan | Penjelasan |
|--------|-----------|
| `this: CustomWorld` | WAJIB di setiap step function |
| Page Object init di step | `const page = new MyPage(this.page)` |
| Timeout untuk operasi berat | `{ timeout: TIMEOUTS.XX }` |
| 1 step = 1 tanggung jawab | Jangan campurkan banyak aksi |
| Simpan state di World | `this.claimNumber`, `this.registerNumber` |
| Parameter types | `{string}`, `{int}`, `{float}` |

---

## 9. Test Data Management

### 9.1. Centralized Test Data (`src/data/testData.ts`)

```typescript
// Types yang tersedia
export type Product = 'MC' | 'IDM';

export interface CorporateData {
    id: number;
    insuranceCode: string;
    flags: CorporateFlags;
    corporateCode: string;
    corporateName: string;
    memberNo: string;
}

// Data corporate
export const mcCorporates: CorporateData[] = [ ... ];

// Providers
export const providers = {
    rsTelogorejo: { name: 'RS TELOGOREJO', code: '1101R003' },
    rsiaAnugerah: { name: 'RSIA ANUGERAH SEMARANG', code: '1101R012' },
};

// Benefits
export const benefits = {
    rj001: { planCode: 'RJ 001', description: 'Biaya Konsultasi dokter umum', ... },
};

// Helper functions
export function getMemberByCondition(condition: string): CorporateData { }
export function getMcCorporate(flags: Partial<CorporateFlags>): CorporateData { }
```

### 9.2. Kapan Pakai Data dari Mana?

| Sumber | Kapan Digunakan | Contoh |
|--------|----------------|--------|
| `.env` | Credentials, URLs | `ADMIN_USERNAME` |
| `testData.ts` | Member numbers, providers | `mcCorporates[0].memberNo` |
| Feature Examples | Scenario parameters | `\| RJTP \| RJ \| CASHLESS \|` |
| API (DataHelper) | Dynamic data on-the-fly | `createReimbursementClaim()` |

---

## 10. Helper Functions

### 10.1. DataHelper (`src/helpers/dataHelper.ts`)

```typescript
const dataHelper = new DataHelper(this.request);

// Authenticate
const token = await dataHelper.getAuthToken(username, password);

// Create claim via API (lebih cepat dari UI)
const claimId = await dataHelper.createReimbursementClaim(memberNo);

// Get claim details
const detail = await dataHelper.getclaimDetails(claimNumber);
// detail.register_no, detail.claim_status

// Upload document
const tempFileName = await dataHelper.uploadDocument(token, docRefId);

// Get member info
const memberDetails = await dataHelper.getMemberDetails(token, memberNo);
```

### 10.2. Credentials Helper

```typescript
import { getCredentials } from '../helpers/credentials';

const { username, password } = getCredentials('admin');
const { username, password } = getCredentials('verifikator');
const { username, password } = getCredentials('kanit');
const { username, password } = getCredentials('verifikator_pusat');
```

### 10.3. Kapan Membuat Helper Baru?

- Workflow digunakan di **lebih dari 1 feature**
- Setup via API **lebih cepat** dari UI
- Ada **business logic** complex (date calc, etc.)
- Ada **polling** yang perlu dilakukan

---

## 11. Custom World & State Management

### 11.1. File: `src/support/world.ts`

```typescript
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page, APIRequestContext } from '@playwright/test';

export class CustomWorld extends World {
  context!: BrowserContext;      // Browser context
  page!: Page;                   // Current browser page
  request!: APIRequestContext;   // API request context
  claimNumber!: string;          // Shared state
  registerNumber!: string;       // Shared state
}

setWorldConstructor(CustomWorld);
```

### 11.2. Penggunaan di Step

```typescript
// Menyimpan state
this.claimNumber = await page.getClaimNumber();

// Menggunakan state di step berikutnya
await listPage.searchRegister(this.registerNumber);
```

### 11.3. Menambah Property Baru

```typescript
export class CustomWorld extends World {
  // existing...
  invoiceNumber!: string;    // tambahkan property baru sesuai kebutuhan
}
```

---

## 12. Timeout Management

### 12.1. File: `src/support/timeouts.ts`

```typescript
export const TIMEOUTS = {
    DEFAULT: 30000,         // Default cucumber step timeout
    LOGIN: 120000,          // Login flow (clear + login + dashboard + modals)
    API: 180000,            // API operations (multi-call)
    UI_COMPLEX: 60000,      // Complex UI interactions
    NAVIGATION: 30000,      // URL change waits
    POLLING: 30000,         // Async backend polling
} as const;

export const POLLING_INTERVALS = [2000, 3000, 5000, 5000, 5000];
```

### 12.2. Kapan Override Timeout

```typescript
// Gunakan untuk operasi yang butuh waktu lama
When('step berat', { timeout: TIMEOUTS.API }, async function() { });

// Default 30 detik sudah cukup untuk kebanyakan step
When('step biasa', async function() { });  // tidak perlu override
```

---

## 13. Menjalankan Test

### 13.1. NPM Scripts

| Script | Command | Fungsi |
|--------|---------|--------|
| Semua test | `npm run test:bdd` | Jalankan semua feature |
| Login | `npm run test:login` | Hanya feature login |
| Reimbursement | `npm run test:reimbursement` | Hanya reimbursement |
| E2E Claim | `npm run test:create-claim` | E2E claim flow |
| Scoring | `npm run test:scoring` | Scoring setting |
| Smoke | `npm run test:smoke` | Tag @smoke saja |
| Dry Run | `npm run test:dry` | Cek tanpa execute |
| Debug | `npm run test:debug` | Dengan PW Inspector |

### 13.2. Run by Tag

```bash
npx cucumber-js --config cucumber.js --tags "@smoke" src/features/
npx cucumber-js --config cucumber.js --tags "@e2e and not @excess" src/features/e2e/
npx cucumber-js --config cucumber.js --tags "@NM-1267" src/features/
```

### 13.3. Run Specific Feature

```bash
npx cucumber-js --config cucumber.js src/features/scoring/settingKlasifikasiScoring.feature
```

### 13.4. Debug Mode

```bash
npm run test:debug
# atau
set PWDEBUG=1 && npx cucumber-js --config cucumber.js src/features/login/
```

---

## 14. Reporting

### 14.1. Cucumber HTML Report

Report otomatis di-generate setiap test run:
```
reports/cucumber-report-<timestamp>.html
```

### 14.2. Screenshot on Failure

Otomatis diambil (dikonfigurasi di `src/support/hooks.ts`):

```typescript
After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
});
```

---

## 15. Best Practices & Conventions

### 15.1. Naming Conventions

| Item | Convention | Contoh |
|------|-----------|--------|
| Feature file | camelCase.feature | `settingKlasifikasiScoring.feature` |
| Step file | camelCase.steps.ts | `scoring.steps.ts` |
| Page folder | camelCase | `configClaimScore/` |
| Elements class | PascalCase + Elements | `ConfigClaimScoreElements` |
| Page class | PascalCase + Page | `ConfigClaimScorePage` |
| Method | camelCase | `verifyPageIsDisplayed()` |
| Locator property | camelCase | `searchButton`, `tableBody` |
| Constants | UPPER_SNAKE_CASE | `TIMEOUTS.API` |
| Test data variable | camelCase | `mcCorporates`, `providers` |

### 15.2. Step Reusability

- **SELALU** cek step yang sudah ada sebelum membuat baru
- Step yang generic (login, navigate, click button) harus reusable
- Gunakan parameter `{string}`, `{int}` agar step fleksibel
- Hindari hardcode value di step definition — terima sebagai parameter

### 15.3. Page Object Rules

- **1 Page = 1 Elements file + 1 Page file** — tidak boleh digabung
- Elements hanya berisi locator (tidak ada logic/action)
- Page file berisi semua method/action terkait halaman tersebut
- Method di Page harus atomic (1 method = 1 aksi jelas)
- Gunakan `Promise<void>` untuk action, `Promise<string>` untuk getter

### 15.4. Assertion Guidelines

- Assertion **HANYA** di `Then` step (bukan di `When` atau `Given`)
- Gunakan `expect` dari `@playwright/test` untuk assertion
- Prefer `toBeVisible()` over `toHaveCount(1)` untuk single element check
- Selalu beri pesan error yang jelas jika memungkinkan

### 15.5. Wait Strategy

- **JANGAN** gunakan hardcoded `page.waitForTimeout(5000)` kecuali benar-benar terpaksa
- Prefer Playwright auto-wait (built-in di `click()`, `fill()`, dll)
- Gunakan `waitForURL()` untuk navigasi
- Gunakan `waitForResponse()` untuk menunggu API response
- Gunakan `expect(...).toBeVisible()` sebagai implicit wait

### 15.6. Error Handling

- Biarkan error bubble up — Cucumber akan catch dan report
- Jangan wrap step dalam try-catch kecuali ada logic recovery
- Gunakan meaningful locator names agar error message mudah dipahami
- Screenshot otomatis diambil saat failure (via hooks)

---

## 16. Checklist Sebelum Commit

Gunakan checklist ini sebelum push kode:

- [ ] **Dry run passing** — `npm run test:dry` tidak ada undefined step
- [ ] **Test run passing** — Scenario baru berjalan hijau (passing)
- [ ] **Reuse existing steps** — Tidak membuat step baru yang sudah ada
- [ ] **Naming convention** — File dan class mengikuti konvensi (section 15.1)
- [ ] **No hardcoded waits** — Tidak ada `waitForTimeout()` tanpa alasan
- [ ] **No credentials di kode** — Semua credential via `.env` / `getCredentials()`
- [ ] **Elements terpisah** — Locator di `.elements.ts`, logic di `.page.ts`
- [ ] **Tag lengkap** — Feature punya `@NM-xxxx` dan scenario punya tag type
- [ ] **No console.log** — Hapus debug log sebelum commit (kecuali intentional)
- [ ] **Feature file readable** — Non-technical person bisa memahami scenario

---

## 17. Troubleshooting

### 17.1. Common Errors

| Error | Penyebab | Solusi |
|-------|----------|--------|
| `Undefined step` | Step belum dibuat di `.steps.ts` | Buat step definition atau cek typo di feature file |
| `Target closed` | Browser ditutup sebelum step selesai | Periksa timeout, tambahkan `{ timeout: TIMEOUTS.XX }` |
| `Strict mode violation` | Locator match lebih dari 1 element | Perjelas locator (tambah filter, `nth()`, atau `has-text()`) |
| `Element not visible` | Element belum muncul / hidden | Gunakan `waitFor()` atau periksa conditional rendering |
| `Navigation timeout` | Halaman tidak load dalam waktu | Periksa URL, network, atau tambah timeout |
| `ECONNREFUSED` | API server tidak jalan | Periksa `.env` URL atau VPN connection |

### 17.2. Debug Tips

1. **Gunakan PW Inspector:**
   ```bash
   set PWDEBUG=1 && npx cucumber-js --config cucumber.js src/features/login/
   ```

2. **Tambahkan screenshot manual:**
   ```typescript
   await this.page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
   ```

3. **Console log di step:**
   ```typescript
   console.log('Current URL:', this.page.url());
   console.log('Claim number:', this.claimNumber);
   ```

4. **Slow down execution:**
   ```typescript
   // Di hooks.ts, tambahkan slowMo saat launch
   const browser = await chromium.launch({ headless: false, slowMo: 500 });
   ```

5. **Check element state:**
   ```typescript
   const isVisible = await this.page.locator('#my-element').isVisible();
   console.log('Element visible:', isVisible);
   ```

### 17.3. Kapan Minta Bantuan?

- Error yang sama muncul berulang setelah 3x percobaan fix
- Locator tidak bisa ditemukan karena dynamic rendering
- API response berubah format tanpa notice
- Environment (dev/staging) down atau tidak stabil

---

> **Dokumen ini adalah living document.** Update setiap kali ada perubahan arsitektur, konvensi baru, atau lesson learned dari tim.
