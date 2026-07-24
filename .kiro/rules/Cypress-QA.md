# Cypress QA Rules (Referensi Migrasi)

## Perbedaan Cypress vs Playwright

| Aspek | Cypress | Playwright |
|-------|---------|------------|
| Async | Otomatis chaining | Explicit `await` |
| Multi-tab | Tidak support | Support penuh |
| Multi-browser | Terbatas | Chromium, Firefox, Webkit |
| API Testing | `cy.request()` | `request` context |
| Selector | `cy.get()` | `page.locator()` / `getByRole()` |

## Migrasi dari Cypress ke Playwright

- `cy.visit(url)` → `await page.goto(url)`
- `cy.get(selector)` → `await page.locator(selector)`
- `cy.contains(text)` → `await page.getByText(text)`
- `cy.intercept()` → `await page.route()`
- `cy.wait()` → Playwright auto-waiting (tidak perlu explicit wait)
- `cy.fixture()` → Import JSON langsung atau gunakan `test.use()`

## Best Practices Migrasi
- Jangan translate 1:1, manfaatkan fitur Playwright yang lebih baik
- Ganti `cy.get('[data-testid="..."]')` dengan `page.getByTestId('...')`
- Ganti `cy.contains()` dengan `page.getByRole()` jika memungkinkan
- Hapus semua `cy.wait(ms)` — Playwright sudah auto-wait
