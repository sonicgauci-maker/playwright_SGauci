# QA Automation Rules

1. JANGAN hardcode credentials di file test — gunakan `.env`
2. JANGAN commit file `.env` ke repository
3. SELALU tambahkan minimal 1 assertion (`expect`) di setiap test case
4. SELALU gunakan `await` untuk semua interaksi Playwright
5. JANGAN gunakan `page.waitForTimeout()` — gunakan auto-waiting Playwright
6. GUNAKAN `test.slow()` untuk test yang memang butuh waktu lama
7. PISAHKAN test per fitur/modul dalam file terpisah
8. BERI komentar pada langkah-langkah penting dalam test
9. GUNAKAN selector strategy sesuai prioritas: getByRole > getByTestId > getByText > locator
10. HINDARI XPath, CSS class dinamis, dan index-based selector
11. GUNAKAN `test.describe()` untuk mengelompokkan test per modul
12. GUNAKAN `test.beforeEach()` untuk setup berulang (navigasi, login)
13. NAMA test harus deskriptif: `should <expected behavior>`
14. FORMAT nama file: `XX_NamaModul_Fitur.spec.ts`
