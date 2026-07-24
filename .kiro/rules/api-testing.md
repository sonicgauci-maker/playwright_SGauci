# API Testing Rules

## Prinsip Umum
- Setiap API test WAJIB memvalidasi status code, response body, dan response time
- Gunakan `request` context dari Playwright untuk API testing
- Pisahkan base URL ke environment variable

## Request
- Selalu set header `Content-Type` yang sesuai
- Gunakan token/auth dari environment variable, JANGAN hardcode
- Validasi request payload sebelum kirim

## Response Validation
- Cek status code: 200, 201, 400, 401, 403, 404, 500
- Validasi struktur response (key/field yang diharapkan ada)
- Validasi tipe data response (string, number, array, object)
- Validasi business logic (nilai yang dikembalikan sesuai ekspektasi)

## Error Handling
- Test negative case: invalid payload, unauthorized, not found
- Pastikan error message sesuai dan informatif
- Test boundary values (min, max, empty, null)

## Naming Convention
- File: `XX_API_NamaEndpoint.spec.ts`
- Test: `should return <status> when <condition>`
