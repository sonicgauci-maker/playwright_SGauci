# QA Automation Standards

## Project Overview
- Framework: Playwright (TypeScript)
- Target: Web application testing untuk Inhealth Claim Verification
- Environment: `.env` untuk credentials dan konfigurasi sensitif

## Struktur Project

```
tests/
├── 00_Login_KLAIM.spec.ts    # Login flow
├── example.spec.ts           # Sample test
playwright.config.ts          # Konfigurasi Playwright
.env                          # Credentials (JANGAN commit)
```

## Konvensi Penamaan File Test

- Format: `XX_NamaModul_Fitur.spec.ts`
- Prefix angka `XX_` untuk urutan eksekusi
- PascalCase atau snake_case untuk nama modul
- Selalu gunakan ekstensi `.spec.ts`

## Konvensi Penulisan Test

- Gunakan `test.describe()` untuk mengelompokkan test per modul/fitur
- Gunakan `test.beforeEach()` untuk setup berulang (navigasi, login)
- Nama test harus deskriptif dengan format: `should <expected behavior>`
- Setiap test WAJIB punya minimal 1 assertion (`expect`)
- Pisahkan test data dari logic test (gunakan konstanta atau fixtures)

## Selector Strategy (Prioritas)

1. `getByRole()` — paling stabil, accessible
2. `getByTestId()` — untuk elemen tanpa role yang jelas
3. `getByText()` / `getByLabel()` — untuk form dan teks
4. `locator('[name="..."]')` — fallback untuk input forms
5. **HINDARI**: XPath, CSS class yang dinamis, index-based selector

## Environment & Credentials

- Semua credentials disimpan di `.env`
- Akses via `process.env.VARIABLE_NAME`
- `.env` WAJIB masuk `.gitignore`
- Gunakan `dotenv` di `playwright.config.ts` untuk load otomatis
- Contoh variabel: `PASSWORD`, `USERNAME`, `BASE_URL`

## Assertion Best Practices

- Gunakan `toHaveURL()` untuk verifikasi navigasi
- Gunakan `toBeVisible()` untuk verifikasi elemen tampil
- Gunakan `toHaveText()` untuk verifikasi konten
- Gunakan `not.toHaveURL()` untuk verifikasi redirect berhasil
- Hindari `waitForTimeout()` — gunakan auto-waiting Playwright

## Reporting & Evidence

- Reporter: HTML + List (konfigurasi di `playwright.config.ts`)
- Screenshot: otomatis saat test gagal
- Video: direkam saat test gagal
- Trace: aktif saat first retry
- Hasil report ada di folder `playwright-report/`

## Commands

| Perintah | Fungsi |
|----------|--------|
| `npm test` | Jalankan semua test (headless) |
| `npm run test:headed` | Jalankan dengan browser terlihat |
| `npm run test:ui` | Buka Playwright UI mode |
| `npm run codegen` | Buka code generator |

## Page Object Model (Opsional)

Untuk project yang berkembang, gunakan POM:

```
tests/
├── pages/
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── fixtures/
│   └── testData.ts
├── 00_Login.spec.ts
└── 01_Dashboard.spec.ts
```

## Rules

1. JANGAN hardcode credentials di file test
2. JANGAN commit file `.env`
3. SELALU tambahkan assertion di setiap test case
4. SELALU gunakan `await` untuk semua interaksi Playwright
5. JANGAN gunakan `page.waitForTimeout()` kecuali benar-benar perlu
6. GUNAKAN `test.slow()` untuk test yang memang butuh waktu lama
7. PISAHKAN test per fitur/modul dalam file terpisah
8. BERI komentar pada langkah-langkah penting dalam test
