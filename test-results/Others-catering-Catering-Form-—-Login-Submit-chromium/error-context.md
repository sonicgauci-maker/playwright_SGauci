# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Others/catering.spec.ts >> Catering Form — Login & Submit
- Location: tests/Others/catering.spec.ts:15:5

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: 'NamaRequired to answer' })

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - img "Organization background image" [ref=e7]
    - generic [ref=e15]:
      - img "Organization banner logo" [ref=e17]
      - main [ref=e18]:
        - generic [ref=e19]:
          - generic "syaiful.gauci@inhealth.co.id" [ref=e23]
          - generic [ref=e25]:
            - heading "Verify your identity" [level=1] [ref=e26]
            - generic [ref=e27]:
              - alert [ref=e29]:
                - text: Sorry, we're having trouble verifying your account. Please try again.
                - link "View debugging details for this error" [ref=e30] [cursor=pointer]:
                  - /url: "#"
                  - text: View details
              - list "Sorry, we're having trouble verifying your account. Please try again. View debugging details for this error Verify your identity" [ref=e31]:
                - listitem [ref=e32] [cursor=pointer]:
                  - button "Approve a request on my Microsoft Authenticator app" [active] [ref=e33]:
                    - generic [ref=e38]: Approve a request on my Microsoft Authenticator app
                - listitem [ref=e39] [cursor=pointer]:
                  - button "Use a verification code" [ref=e40]:
                    - generic [ref=e45]: Use a verification code
                - listitem [ref=e46] [cursor=pointer]:
                  - button "Text +XX XXXXXXXXX27‎" [ref=e47]:
                    - generic [ref=e52]: Text +XX XXXXXXXXX27‎
                - listitem [ref=e53] [cursor=pointer]:
                  - button "Call +XX XXXXXXXXX27‎" [ref=e54]:
                    - generic [ref=e59]: Call +XX XXXXXXXXX27‎
            - generic [ref=e63]:
              - link "More information about two step verification" [ref=e65] [cursor=pointer]:
                - /url: https://go.microsoft.com/fwlink/p/?LinkId=708614
                - text: More information
              - generic [ref=e66]: Are your verification methods current? Check at https://aka.ms/mfasetup
            - button "Cancel" [ref=e69] [cursor=pointer]
  - contentinfo [ref=e70]:
    - button "Click here for troubleshooting information" [ref=e72] [cursor=pointer]: ...
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const FORM_URL = 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=dQnm9FNankm5tNiCGMnjdfIklF5tVuVInNm_SME8qHdUMDFONUVNRFRWTjhTWjhTOVZWTUQ4NU5DUi4u&route=shorturl';
  4  | 
  5  | // 📌 DATA — ubah di sini
  6  | const DATA = {
  7  |   email: 'syaiful.gauci@inhealth.co.id',
  8  |   password: process.env.PASSWORD_MS || 'Bggrlybgwpns@2020',
  9  |   nama: 'Syaiful Gauci',
  10 |   divisi: 'Teknologi Informasi',
  11 |   departemen: 'IT Applications Development',
  12 |   kehadiran: 'Hadir',
  13 | };
  14 | 
  15 | test('Catering Form — Login & Submit', async ({ page }) => {
  16 |   test.setTimeout(120000);
  17 | 
  18 |   // Buka halaman form
  19 |   await page.goto(FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  20 |   await page.waitForLoadState('networkidle');
  21 | 
  22 |   // Login Microsoft — tunggu field email muncul
  23 |   const emailField = page.getByRole('textbox', { name: 'Enter your email or phone' });
  24 |   await emailField.waitFor({ state: 'visible', timeout: 30000 });
  25 |   await emailField.fill(DATA.email);
  26 |   await page.getByRole('button', { name: 'Next' }).click();
  27 | 
  28 |   // Tunggu field password muncul
  29 |   const passwordField = page.locator('input[type="password"]');
  30 |   await passwordField.waitFor({ state: 'visible', timeout: 30000 });
  31 |   await passwordField.fill(DATA.password);
  32 |   await page.getByRole('button', { name: 'Sign in' }).click();
  33 | 
  34 |   // Handle "Stay signed in?" popup
  35 |   const dontShowCheckbox = page.getByRole('checkbox', { name: "Don't show this again" });
  36 |   if (await dontShowCheckbox.isVisible({ timeout: 10000 }).catch(() => false)) {
  37 |     await dontShowCheckbox.check();
  38 |     await page.getByRole('button', { name: 'Yes' }).click();
  39 |   }
  40 | 
  41 |   // Handle "Start now" jika muncul
  42 |   const startBtn = page.getByRole('button', { name: 'Start now' });
  43 |   if (await startBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  44 |     await startBtn.click();
  45 |   }
  46 | 
  47 |   // Handle "Next" jika muncul
  48 |   const nextBtn = page.getByRole('button', { name: 'Next' });
  49 |   if (await nextBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  50 |     await nextBtn.click();
  51 |   }
  52 | 
  53 |   // Isi Form
> 54 |   await page.getByRole('textbox', { name: 'NamaRequired to answer' }).fill(DATA.nama);
     |                                                                       ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  55 | 
  56 |   await page.getByRole('button', { name: 'DivisiRequired to answer' }).click();
  57 |   await page.getByLabel(DATA.divisi).click();
  58 | 
  59 |   await page.getByRole('button', { name: 'DepartemenRequired to answer' }).click();
  60 |   await page.getByLabel(DATA.departemen).click();
  61 | 
  62 |   await page.getByRole('radio', { name: DATA.kehadiran }).check();
  63 | 
  64 |   // Submit
  65 |   await page.getByRole('button', { name: 'Submit' }).click();
  66 | 
  67 |   // Verifikasi submit berhasil
  68 |   await expect(page.getByRole('link', { name: 'Submit another response' })).toBeVisible({ timeout: 15000 });
  69 | 
  70 |   // Browser tetap terbuka
  71 |   await page.pause();
  72 | });
  73 | 
```