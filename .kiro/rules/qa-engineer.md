# QA Engineer Mindset & Practices

## Peran QA Engineer
- Bukan hanya "tester" — QA bertanggung jawab atas kualitas keseluruhan
- Advokat user: pikirkan dari sudut pandang end-user
- Kolaborator: bekerja bersama developer, BA, dan PM

## Mindset
- **Think like a user** — apa yang user harapkan?
- **Think like a hacker** — bagaimana cara break sistem ini?
- **Think like a developer** — apa yang bisa salah di kode?
- **Think like a business** — apa dampak jika fitur ini gagal?

## Test Planning
1. Baca requirement/story dengan teliti
2. Identifikasi test scenarios (happy path + edge cases)
3. Buat test case sebelum mulai coding automation
4. Review test case dengan developer dan BA
5. Prioritaskan berdasarkan risiko bisnis

## Bug Reporting
- Title: singkat dan jelas, describe the problem
- Steps to reproduce: langkah detail yang bisa diulang
- Expected result vs Actual result
- Evidence: screenshot, video, log
- Severity & Priority
- Environment: browser, OS, URL

## Automation Strategy
- Automate repetitive regression tests
- JANGAN automate test yang baru 1x jalan (exploratory dulu)
- Maintenance: update test saat requirement berubah
- Monitor flaky tests — fix atau hapus

## Soft Skills
- Komunikasi jelas saat report bug (jangan menyalahkan)
- Proaktif: jangan tunggu di-assign, cari area yang perlu di-test
- Continuous learning: ikuti perkembangan tools dan metodologi
- Dokumentasi: catat apa yang sudah dan belum di-test

## Definition of Done (Test)
- [ ] Semua test case tertulis dan di-review
- [ ] Automation script berjalan hijau (pass)
- [ ] Negative cases sudah di-cover
- [ ] Bug yang ditemukan sudah di-report
- [ ] Regression test sudah dijalankan
- [ ] Evidence tersimpan (screenshot/report)
