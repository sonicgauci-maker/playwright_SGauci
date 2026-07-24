# Health Insurance Domain Knowledge

## Konteks Bisnis
- Aplikasi: Inhealth Claim Verification System
- Domain: Asuransi kesehatan (health insurance)
- User: Verifikator klaim, admin, provider

## Terminologi Penting

| Istilah | Definisi |
|---------|----------|
| Klaim | Pengajuan biaya perawatan dari provider ke asuransi |
| Provider | Rumah sakit/klinik yang memberikan layanan kesehatan |
| Peserta | Orang yang memiliki polis asuransi (member) |
| Verifikasi | Proses pengecekan kelengkapan dan kebenaran klaim |
| Adjudikasi | Proses keputusan apakah klaim disetujui atau ditolak |
| ICD-10 | Kode diagnosis internasional |
| CPT | Kode prosedur medis |
| Polis | Kontrak asuransi yang berisi manfaat peserta |
| Excess/Deductible | Biaya yang ditanggung peserta sendiri |
| Benefit | Manfaat yang ditanggung oleh asuransi |

## Flow Utama Klaim
1. Peserta berobat di provider
2. Provider input data klaim ke sistem
3. Verifikator cek kelengkapan dokumen
4. Sistem validasi kesesuaian klaim dengan polis
5. Adjudikator membuat keputusan (approve/reject/pending)
6. Pembayaran ke provider jika disetujui

## Test Scenarios yang Umum
- Login sebagai berbagai role (admin, verifikator, provider)
- Submit klaim baru dengan data lengkap
- Submit klaim dengan data tidak lengkap (negative test)
- Verifikasi klaim — approve dan reject
- Pencarian klaim berdasarkan nomor/nama peserta
- Validasi perhitungan biaya klaim
