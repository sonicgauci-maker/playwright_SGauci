# Cypress Framework Reference

## Kapan Gunakan Cypress vs Playwright
- Cypress: project legacy yang sudah berjalan, tim familiar Cypress
- Playwright: project baru, butuh multi-browser, butuh multi-tab, API testing terintegrasi

## Cypress Command Cheat Sheet (untuk referensi)
- `cy.visit()` — navigasi ke URL
- `cy.get()` — select element
- `cy.contains()` — cari element berdasarkan text
- `cy.intercept()` — mock/stub network request
- `cy.fixture()` — load test data dari file
- `cy.request()` — API request langsung

## Kelemahan Cypress yang Diatasi Playwright
1. Tidak bisa multi-tab/multi-window
2. Hanya Chromium-based (Electron)
3. Tidak bisa test iframe lintas domain dengan mudah
4. Retry logic terbatas
5. Tidak support mobile emulation native

## Catatan
- Jika menemukan test Cypress lama, prioritaskan migrasi ke Playwright
- Gunakan file `Cypress-QA.md` sebagai panduan migrasi
