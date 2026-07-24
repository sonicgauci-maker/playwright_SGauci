# Locator Strategy Rules

## Prioritas Selector (dari paling stabil ke paling rapuh)

### Tier 1 — Paling Direkomendasikan
```typescript
// Role-based (accessibility-first)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Username' })
page.getByRole('link', { name: 'Dashboard' })

// Test ID (stabil, tidak berubah saat UI berubah)
page.getByTestId('login-button')
page.getByTestId('claim-form')
```

### Tier 2 — Acceptable
```typescript
// Label & text based
page.getByLabel('Username')
page.getByText('Welcome back')
page.getByPlaceholder('Enter your email')

// Attribute selector
page.locator('[name="username"]')
page.locator('[data-id="claim-123"]')
```

### Tier 3 — Hindari Jika Bisa
```typescript
// CSS class (sering berubah)
page.locator('.btn-primary')

// XPath (rapuh, sulit dibaca)
page.locator('//div[@class="form"]/input[1]')

// Index-based (rapuh)
page.locator('input').nth(2)
```

## Rules
1. SELALU coba `getByRole()` terlebih dahulu
2. Jika tidak ada role yang jelas, minta developer tambahkan `data-testid`
3. Gunakan `locator('[name="..."]')` untuk form input yang punya attribute name
4. JANGAN chain selector terlalu panjang — pecah jadi variable
5. Gunakan `filter()` untuk mempersempit scope:
   ```typescript
   page.getByRole('listitem').filter({ hasText: 'Pending' })
   ```
6. Gunakan `locator().first()` atau `.last()` hanya jika tidak ada cara lain
7. HINDARI locator yang bergantung pada posisi DOM

## Tips
- Gunakan Playwright Inspector (`npx playwright codegen`) untuk generate locator
- Test locator di browser DevTools sebelum dipakai
- Locator yang baik = tetap valid meskipun UI di-redesign
