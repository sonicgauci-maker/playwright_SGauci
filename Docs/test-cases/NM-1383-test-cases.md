# Test Cases: NM-1383 - Mengelola Setting Auto Distribute per KOPS

## Test Case Information

| Field | Value |
|-------|-------|
| **No** | |
| **Requested App Testing No** | |
| **Test Requested date** | |
| **Test Priority** | Medium |
| **Application Address** | https://development.inhealth.co.id/newmicare |
| **Description** | Mengelola Setting Auto Distribute per KOPS |
| **Test Design by** | |
| **Test Execute by** | |
| **Test Execution date** | |
| **Follow Up Test By** | |
| **Follow Up Date** | |
| **Number Page** | 1 Of 1 |
| **Jira Reference** | NM-1383 |
| **Parent** | NM-1250 |
| **Sprint** | Claim Operation Sprint 25, Sprint 26 |
| **Version** | TC.2026.03 |

---

## Test Cases

### AC-1: Admin Pusat dapat melihat daftar KOPS beserta status auto distribute

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Verify user Verifikator Pusat dapat mengakses menu KOPS Management | User role: Verifikator Pusat | User sudah login dengan role Verifikator Pusat | TC01 - Akses menu KOPS Management oleh user HO | Positive | 1. Login ke New MiCare sebagai Verifikator Pusat<br>2. Klik menu Management di sidebar<br>3. Verifikasi sub menu "KOPS Management" tampil<br>4. Klik sub menu "KOPS Management" | Sub menu "KOPS Management" tampil dan dapat diakses, halaman "Kops Score" terbuka dengan benar | | | High | `@NM-1383 @AC-1 @smoke` Scenario: TC01 - User Verifikator Pusat berhasil mengakses menu KOPS Management | Automated | |
| 2 | Verify user non-Verifikator Pusat TIDAK dapat mengakses menu KOPS Management | User role: Verifikator Cabang (e.g., Verificator.semarang) | User sudah login dengan role non-Verifikator Pusat | TC02 - Akses menu KOPS Management ditolak untuk user non-HO | Negative | 1. Login ke New MiCare sebagai user Verifikator Cabang<br>2. Klik menu Management di sidebar<br>3. Verifikasi apakah sub menu "KOPS Management" tampil | Sub menu "KOPS Management" TIDAK tampil di sidebar, atau jika tampil tidak bisa diakses | | | High | `@NM-1383 @AC-1 @negative @security` Scenario: TC02 - User non-Verifikator Pusat tidak dapat mengakses menu KOPS Management | Automated | |
| 3 | Verify halaman Kops Score menampilkan tabel dengan kolom yang benar | User role: Verifikator Pusat | User sudah berada di halaman KOPS Management | TC03 - Tampilan kolom tabel Kops Score | Positive | 1. Login sebagai Verifikator Pusat<br>2. Navigasi ke Management > KOPS Management<br>3. Verifikasi kolom tabel yang ditampilkan | Tabel menampilkan kolom: Action, Kops Code, Kops Name, Timezone Code, Timezone Offset, Is Autodistribution | | | Medium | `@NM-1383 @AC-1 @smoke` Scenario: TC03 - Halaman Kops Score menampilkan kolom tabel yang benar | Automated | |
| 4 | Verify data KOPS tampil di tabel dengan informasi lengkap | User role: Verifikator Pusat | Data master KOPS sudah tersedia di database | TC04 - Data KOPS tampil lengkap di tabel | Positive | 1. Navigasi ke halaman Kops Score<br>2. Verifikasi setiap baris menampilkan: kode KOPS, nama KOPS, timezone code, timezone offset<br>3. Verifikasi kolom Is Autodistribution menampilkan badge status (hijau/merah) | Semua KOPS tampil dengan data lengkap. Badge hijau (✓) untuk aktif, badge merah (X) untuk nonaktif | | | Medium | `@NM-1383 @AC-1` Scenario: TC04 - Data KOPS tampil lengkap di tabel dengan badge status | Automated | |
| 5 | Verify default status auto distribute semua KOPS adalah nonaktif | User role: Verifikator Pusat | KOPS baru ditambahkan ke sistem / fresh state | TC05 - Default status auto distribute adalah nonaktif | Positive | 1. Navigasi ke halaman Kops Score<br>2. Verifikasi KOPS yang baru ditambahkan<br>3. Cek status Is Autodistribution | KOPS baru memiliki status Is Autodistribution = nonaktif (badge merah/X) secara default | | | High | `@NM-1383 @AC-4` Scenario: TC05 - Default status auto distribute KOPS adalah nonaktif | Manual | |

### AC-2: Admin Pusat dapat mengaktifkan atau menonaktifkan auto distribute

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Verify user dapat mengaktifkan auto distribute untuk KOPS yang nonaktif | User role: Verifikator Pusat, KOPS: MEDAN (0201) status nonaktif | KOPS target memiliki status Is Autodistribution = nonaktif | TC06 - Aktifkan auto distribute KOPS | Positive | 1. Navigasi ke halaman Kops Score<br>2. Cari KOPS MEDAN (0201) dengan status nonaktif<br>3. Klik icon power button (⏻) pada baris MEDAN<br>4. Dialog konfirmasi aktivasi muncul<br>5. Klik "Ya, Aktifkan" | Dialog konfirmasi muncul. Setelah konfirmasi, status KOPS berubah menjadi aktif (badge hijau ✓). Notifikasi sukses tampil | | | High | `@NM-1383 @AC-2 @e2e` Scenario: TC06 - User berhasil mengaktifkan auto distribute untuk KOPS | Automated | |
| 7 | Verify user dapat menonaktifkan auto distribute untuk KOPS yang aktif | User role: Verifikator Pusat, KOPS: SEMARANG (1101) status aktif | KOPS target memiliki status Is Autodistribution = aktif | TC07 - Nonaktifkan auto distribute KOPS | Positive | 1. Navigasi ke halaman Kops Score<br>2. Cari KOPS SEMARANG (1101) dengan status aktif<br>3. Klik icon power button (⏻) pada baris SEMARANG<br>4. Dialog konfirmasi deactivation muncul dengan preview dampak<br>5. Klik "Ya, Nonaktifkan" | Dialog konfirmasi muncul dengan info jumlah klaim terdampak. Setelah konfirmasi, status berubah menjadi nonaktif (badge merah X). Notifikasi sukses tampil | | | High | `@NM-1383 @AC-2 @e2e` Scenario: TC07 - User berhasil menonaktifkan auto distribute untuk KOPS | Automated | |
| 8 | Verify dialog konfirmasi aktivasi menampilkan informasi yang benar | User role: Verifikator Pusat, KOPS nonaktif | KOPS target status nonaktif | TC08 - Konten dialog konfirmasi aktivasi | Positive | 1. Klik icon power button pada KOPS yang nonaktif<br>2. Verifikasi konten dialog konfirmasi | Dialog menampilkan: judul konfirmasi, nama KOPS yang akan diaktifkan, tombol "Ya, Aktifkan" dan "Batal" | | | Medium | `@NM-1383 @AC-2` Scenario: TC08 - Dialog konfirmasi aktivasi menampilkan informasi yang benar | Automated | |
| 9 | Verify dialog konfirmasi deactivation menampilkan preview dampak | User role: Verifikator Pusat, KOPS aktif dengan klaim di queue | KOPS target status aktif, ada klaim berstatus SCORED dan READY_TO_DISTRIBUTE | TC09 - Konten dialog konfirmasi deactivation dengan preview dampak | Positive | 1. Pastikan KOPS aktif memiliki klaim di queue (SCORED/READY_TO_DISTRIBUTE)<br>2. Klik icon power button pada KOPS aktif tersebut<br>3. Verifikasi konten dialog | Dialog menampilkan: nama KOPS, jumlah klaim yang akan diubah ke MANUAL_PROCESS, info klaim DISTRIBUTED tidak terpengaruh, tombol "Ya, Nonaktifkan" dan "Batal" | | | High | `@NM-1383 @AC-9 @AC-2` Scenario: TC09 - Dialog konfirmasi deactivation menampilkan preview jumlah klaim terdampak | Automated | |
| 10 | Verify user dapat membatalkan dialog konfirmasi (klik Batal) | User role: Verifikator Pusat | Dialog konfirmasi sedang terbuka | TC10 - Batal pada dialog konfirmasi | Positive | 1. Klik icon power button pada KOPS manapun<br>2. Dialog konfirmasi muncul<br>3. Klik tombol "Batal" | Dialog tertutup, status KOPS TIDAK berubah, UI kembali ke state semula | | | Medium | `@NM-1383 @AC-2 @negative` Scenario: TC10 - User membatalkan dialog konfirmasi dan status tidak berubah | Automated | |

### AC-3 & AC-4: Setting bersifat permanen dan default nonaktif

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Verify setting auto distribute tetap aktif setelah periode waktu berlalu (permanen) | User role: Verifikator Pusat, KOPS yang sudah diaktifkan | KOPS sudah diaktifkan sebelumnya (misal kemarin/minggu lalu) | TC11 - Setting permanen tidak reset per periode | Positive | 1. Aktifkan auto distribute untuk KOPS tertentu<br>2. Tunggu waktu tertentu (atau verifikasi di hari berbeda)<br>3. Navigasi kembali ke halaman Kops Score<br>4. Verifikasi status KOPS tersebut | Status auto distribute tetap aktif (tidak reset otomatis per hari/bulan/periode) | | | Medium | `@NM-1383 @AC-3` Scenario: TC11 - Setting auto distribute bersifat permanen tidak reset per periode | Manual | |
| 12 | Verify setting hanya berubah jika diubah secara eksplisit oleh user | User role: Verifikator Pusat | KOPS sudah aktif, tidak ada aksi perubahan | TC12 - Setting tidak berubah tanpa aksi eksplisit | Positive | 1. Verifikasi status KOPS aktif<br>2. Logout dan login kembali<br>3. Navigasi ke halaman Kops Score<br>4. Verifikasi status KOPS sama | Status auto distribute tidak berubah tanpa aksi eksplisit dari user | | | Low | `@NM-1383 @AC-3` Scenario: TC12 - Setting tidak berubah tanpa aksi eksplisit dari user | Manual | |

### AC-5 & AC-6: Klaim di queue diproses auto distribute setelah aktivasi

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 13 | Verify klaim READY_TO_DISTRIBUTE diproses auto distribute setelah KOPS diaktifkan | KOPS: target KOPS, klaim dengan status READY_TO_DISTRIBUTE | KOPS baru diaktifkan, ada klaim berstatus READY_TO_DISTRIBUTE di KOPS tersebut | TC13 - Klaim READY_TO_DISTRIBUTE diproses setelah aktivasi | Positive | 1. Pastikan ada klaim berstatus READY_TO_DISTRIBUTE di KOPS target<br>2. Aktifkan auto distribute untuk KOPS tersebut<br>3. Tunggu trigger auto distribute berikutnya<br>4. Verifikasi status klaim berubah | Klaim yang berstatus READY_TO_DISTRIBUTE berhasil diproses oleh auto distribute engine dan statusnya berubah menjadi DISTRIBUTED | | | High | `@NM-1383 @AC-5 @e2e` Scenario: TC13 - Klaim READY_TO_DISTRIBUTE diproses auto distribute setelah KOPS diaktifkan | Manual / API | |
| 14 | Verify klaim SCORED yang sudah ada di queue tetap mengikuti flow auto distribute setelah aktivasi | KOPS: target KOPS, klaim dengan status SCORED | KOPS baru diaktifkan, ada klaim berstatus SCORED di queue | TC14 - Klaim SCORED existing tetap ikut flow auto distribute | Positive | 1. Pastikan ada klaim berstatus SCORED di KOPS target<br>2. Aktifkan auto distribute untuk KOPS tersebut<br>3. Tunggu proses scoring selesai → status READY_TO_DISTRIBUTE<br>4. Tunggu trigger auto distribute<br>5. Verifikasi klaim diproses | Klaim yang sudah berstatus SCORED sebelum aktivasi tetap mengikuti flow: SCORED → READY_TO_DISTRIBUTE → DISTRIBUTED | | | High | `@NM-1383 @AC-6 @e2e` Scenario: TC14 - Klaim SCORED existing tetap mengikuti flow auto distribute setelah aktivasi | Manual / API | |

### AC-7: Sweep saat deactivation — klaim SCORED/READY_TO_DISTRIBUTE diubah ke MANUAL_PROCESS

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 15 | Verify klaim SCORED diubah ke MANUAL_PROCESS saat KOPS dinonaktifkan | KOPS aktif dengan klaim berstatus SCORED | KOPS aktif, ada klaim berstatus SCORED di queue KOPS tersebut | TC15 - Sweep: klaim SCORED → MANUAL_PROCESS | Positive | 1. Pastikan KOPS aktif memiliki klaim berstatus SCORED<br>2. Klik icon power button untuk menonaktifkan<br>3. Konfirmasi deactivation<br>4. Verifikasi status klaim di database/API | Semua klaim berstatus SCORED di KOPS tersebut berubah statusnya menjadi MANUAL_PROCESS | | | High | `@NM-1383 @AC-7 @e2e` Scenario: TC15 - Klaim SCORED diubah ke MANUAL_PROCESS saat KOPS dinonaktifkan | Manual / API | |
| 16 | Verify klaim READY_TO_DISTRIBUTE diubah ke MANUAL_PROCESS saat KOPS dinonaktifkan | KOPS aktif dengan klaim berstatus READY_TO_DISTRIBUTE | KOPS aktif, ada klaim berstatus READY_TO_DISTRIBUTE di queue | TC16 - Sweep: klaim READY_TO_DISTRIBUTE → MANUAL_PROCESS | Positive | 1. Pastikan KOPS aktif memiliki klaim berstatus READY_TO_DISTRIBUTE<br>2. Klik icon power button untuk menonaktifkan<br>3. Konfirmasi deactivation<br>4. Verifikasi status klaim di database/API | Semua klaim berstatus READY_TO_DISTRIBUTE di KOPS tersebut berubah statusnya menjadi MANUAL_PROCESS | | | High | `@NM-1383 @AC-7 @e2e` Scenario: TC16 - Klaim READY_TO_DISTRIBUTE diubah ke MANUAL_PROCESS saat KOPS dinonaktifkan | Manual / API | |
| 17 | Verify sweep menangani KOPS tanpa klaim di queue (0 klaim terdampak) | KOPS aktif tanpa klaim di queue | KOPS aktif, tidak ada klaim SCORED/READY_TO_DISTRIBUTE | TC17 - Deactivation KOPS tanpa klaim di queue | Positive | 1. Pastikan KOPS aktif tidak memiliki klaim di queue<br>2. Klik icon power button untuk menonaktifkan<br>3. Dialog konfirmasi menampilkan "0 klaim terdampak"<br>4. Konfirmasi deactivation | Deactivation berhasil dengan 0 klaim di-sweep. Status KOPS berubah menjadi nonaktif | | | Medium | `@NM-1383 @AC-7` Scenario: TC17 - Deactivation berhasil pada KOPS tanpa klaim di queue | Automated | |

### AC-8: Klaim DISTRIBUTED tidak terpengaruh saat deactivation

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 18 | Verify klaim DISTRIBUTED tetap berjalan setelah KOPS dinonaktifkan | KOPS aktif dengan klaim berstatus DISTRIBUTED (sudah di-assign ke verifikator) | KOPS aktif, ada klaim DISTRIBUTED dan klaim SCORED/READY_TO_DISTRIBUTE | TC18 - Klaim DISTRIBUTED tidak terpengaruh oleh deactivation | Positive | 1. Pastikan KOPS aktif memiliki klaim berstatus DISTRIBUTED<br>2. Nonaktifkan auto distribute untuk KOPS tersebut<br>3. Konfirmasi deactivation<br>4. Verifikasi status klaim DISTRIBUTED di database/API | Klaim yang berstatus DISTRIBUTED TIDAK berubah statusnya — tetap DISTRIBUTED dan bisa diproses verifikator sampai selesai | | | High | `@NM-1383 @AC-8 @e2e` Scenario: TC18 - Klaim DISTRIBUTED tidak terpengaruh oleh deactivation KOPS | Manual / API | |
| 19 | Verify hanya klaim SCORED dan READY_TO_DISTRIBUTE yang di-sweep (bukan status lain) | KOPS aktif dengan klaim berbagai status: SCORED, READY_TO_DISTRIBUTE, DISTRIBUTED, dan status lain | KOPS aktif, ada campuran status klaim | TC19 - Sweep hanya mempengaruhi SCORED dan READY_TO_DISTRIBUTE | Positive | 1. Pastikan KOPS aktif memiliki klaim dengan berbagai status<br>2. Nonaktifkan auto distribute<br>3. Konfirmasi deactivation<br>4. Verifikasi: SCORED → MANUAL_PROCESS, READY_TO_DISTRIBUTE → MANUAL_PROCESS, DISTRIBUTED → tetap DISTRIBUTED, status lain → tidak berubah | Hanya klaim berstatus SCORED dan READY_TO_DISTRIBUTE yang berubah ke MANUAL_PROCESS. Klaim dengan status lain tidak terpengaruh | | | High | `@NM-1383 @AC-8 @AC-7` Scenario: TC19 - Sweep hanya mempengaruhi klaim SCORED dan READY_TO_DISTRIBUTE | Manual / API | |

### AC-9: Konfirmasi jumlah klaim yang diubah ke MANUAL_PROCESS

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | Verify jumlah klaim di dialog konfirmasi sesuai dengan data aktual | KOPS aktif dengan N klaim SCORED dan M klaim READY_TO_DISTRIBUTE | KOPS aktif, ada klaim di queue yang diketahui jumlahnya | TC20 - Akurasi jumlah klaim di dialog konfirmasi deactivation | Positive | 1. Catat jumlah klaim SCORED dan READY_TO_DISTRIBUTE di KOPS via API/DB<br>2. Klik icon power button untuk menonaktifkan<br>3. Verifikasi jumlah yang ditampilkan di dialog konfirmasi | Jumlah klaim yang ditampilkan di dialog konfirmasi sesuai dengan jumlah aktual klaim SCORED + READY_TO_DISTRIBUTE di database | | | High | `@NM-1383 @AC-9` Scenario: TC20 - Jumlah klaim di dialog konfirmasi sesuai data aktual | Manual / API | |
| 21 | Verify user mendapat feedback setelah deactivation berhasil dengan jumlah klaim yang diubah | KOPS aktif dengan klaim di queue | KOPS aktif, ada klaim yang akan di-sweep | TC21 - Feedback sukses deactivation dengan info jumlah | Positive | 1. Nonaktifkan KOPS yang memiliki klaim di queue<br>2. Konfirmasi deactivation<br>3. Verifikasi notifikasi/feedback setelah proses selesai | User mendapat notifikasi sukses yang menyertakan informasi jumlah klaim yang berhasil diubah ke MANUAL_PROCESS | | | Medium | `@NM-1383 @AC-9` Scenario: TC21 - User mendapat feedback jumlah klaim yang diubah setelah deactivation | Automated | |

### AC-10: Audit log tercatat untuk setiap perubahan setting

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | Verify audit log tercatat saat mengaktifkan auto distribute | User: Verifikator Pusat, KOPS: target KOPS | KOPS nonaktif, siap diaktifkan | TC22 - Audit log tercatat saat aktivasi | Positive | 1. Aktifkan auto distribute untuk KOPS tertentu<br>2. Verifikasi audit log di database/API<br>3. Cek record: siapa, kapan, KOPS mana, aksi apa | Audit log mencatat: user yang melakukan aksi, timestamp, kode KOPS, action = ACTIVATE | | | Medium | `@NM-1383 @AC-10` Scenario: TC22 - Audit log tercatat saat mengaktifkan auto distribute | Manual / API | |
| 23 | Verify audit log tercatat saat menonaktifkan auto distribute | User: Verifikator Pusat, KOPS: target KOPS | KOPS aktif, siap dinonaktifkan | TC23 - Audit log tercatat saat deactivation | Positive | 1. Nonaktifkan auto distribute untuk KOPS tertentu<br>2. Verifikasi audit log di database/API<br>3. Cek record: siapa, kapan, KOPS mana, aksi apa | Audit log mencatat: user yang melakukan aksi, timestamp, kode KOPS, action = DEACTIVATE, jumlah klaim terdampak | | | Medium | `@NM-1383 @AC-10` Scenario: TC23 - Audit log tercatat saat menonaktifkan auto distribute | Manual / API | |
| 24 | Verify audit log mencatat user yang benar (siapa yang melakukan aksi) | Multiple user: Verifikator Pusat A dan B | Dua user berbeda melakukan perubahan setting | TC24 - Audit log mencatat user identity dengan benar | Positive | 1. User A mengaktifkan KOPS X<br>2. User B menonaktifkan KOPS Y<br>3. Verifikasi audit log untuk kedua aksi | Masing-masing record audit log mencatat user identity yang benar (user A untuk aksi pertama, user B untuk aksi kedua) | | | Medium | `@NM-1383 @AC-10` Scenario: TC24 - Audit log mencatat user identity yang benar | Manual / API | |

### Filter & UI Functionality

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | Verify filter KOPS berfungsi dengan pencarian by nama | Keyword: "SEMARANG" | Halaman Kops Score terbuka, data KOPS tersedia | TC25 - Filter KOPS by nama | Positive | 1. Navigasi ke halaman Kops Score<br>2. Klik dropdown "Search KOPS..."<br>3. Pilih/ketik "SEMARANG"<br>4. Klik tombol [Search] | Tabel hanya menampilkan KOPS yang sesuai filter (SEMARANG). Data lain tersembunyi | | | Medium | `@NM-1383 @filter` Scenario: TC25 - Filter KOPS by nama berfungsi dengan benar | Automated | |
| 26 | Verify filter KOPS berfungsi dengan pencarian by kode | Keyword: "0201" | Halaman Kops Score terbuka | TC26 - Filter KOPS by kode | Positive | 1. Navigasi ke halaman Kops Score<br>2. Klik dropdown "Search KOPS..."<br>3. Pilih/ketik "0201"<br>4. Klik tombol [Search] | Tabel hanya menampilkan KOPS dengan kode 0201 (MEDAN) | | | Medium | `@NM-1383 @filter` Scenario: TC26 - Filter KOPS by kode berfungsi dengan benar | Automated | |
| 27 | Verify tombol Reset Filter mengembalikan tampilan semua KOPS | Filter aktif (sudah ada pencarian) | Tabel sedang menampilkan hasil filter | TC27 - Reset Filter | Positive | 1. Lakukan pencarian KOPS (filter aktif)<br>2. Klik tombol [Reset Filter]<br>3. Verifikasi tampilan tabel | Tabel kembali menampilkan semua KOPS (filter dihapus) | | | Medium | `@NM-1383 @filter` Scenario: TC27 - Reset Filter mengembalikan tampilan semua KOPS | Automated | |
| 28 | Verify filter dengan keyword yang tidak match menampilkan empty state | Keyword: "XYZNOTEXIST" | Halaman Kops Score terbuka | TC28 - Filter dengan keyword tidak match | Negative | 1. Klik dropdown "Search KOPS..."<br>2. Ketik keyword yang tidak ada<br>3. Klik [Search] | Tabel kosong atau menampilkan pesan "Data tidak ditemukan" / no data | | | Low | `@NM-1383 @filter @negative` Scenario: TC28 - Filter dengan keyword tidak match menampilkan empty state | Automated | |
| 29 | Verify icon power button menampilkan tooltip saat hover | User role: Verifikator Pusat | Halaman Kops Score terbuka | TC29 - Tooltip icon action power button | Positive | 1. Navigasi ke halaman Kops Score<br>2. Hover mouse pada icon power button (⏻) di kolom Action | Tooltip "Aktif/Nonaktif" muncul saat hover | | | Low | `@NM-1383 @ui` Scenario: TC29 - Icon power button menampilkan tooltip saat hover | Automated | |
| 30 | Verify pagination tabel berfungsi | Data: Lebih dari 1 halaman KOPS | Data KOPS cukup banyak untuk pagination | TC30 - Pagination list KOPS | Positive | 1. Navigasi ke halaman Kops Score<br>2. Verifikasi informasi pagination "Showing 1-X of Y entries"<br>3. Jika multi-page, navigasi ke halaman berikutnya | Pagination menampilkan informasi jumlah data yang benar, navigasi antar halaman berfungsi | | | Low | `@NM-1383 @ui` Scenario: TC30 - Pagination tabel KOPS berfungsi dengan benar | Automated | |

### Edge Cases & Negative Scenarios

| No | Test Scenario | Test Data | Pre Conditions | Test Case | Type | Test Case Steps | Expected Results | Actual Result | Status | Priority | Gherkin Scenario | Notes | Attachment |
|----|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 31 | Verify user non-HO tidak dapat mengakses halaman via direct URL | User role: Verifikator Cabang, URL langsung ke halaman KOPS Management | User login sebagai non-Verifikator Pusat | TC31 - Direct URL access oleh user non-HO | Negative | 1. Login sebagai user Verifikator Cabang<br>2. Akses URL halaman KOPS Management secara langsung via browser address bar | User diredirect ke halaman unauthorized/forbidden, atau halaman tidak termuat | | | High | `@NM-1383 @negative @security` Scenario: TC31 - User non-HO tidak dapat mengakses halaman via direct URL | Automated | |
| 32 | Verify klaim MANUAL_PROCESS tidak kembali ke queue saat KOPS diaktifkan kembali (reactivation) | KOPS yang pernah dinonaktifkan (ada klaim MANUAL_PROCESS), kemudian diaktifkan lagi | KOPS nonaktif, ada klaim berstatus MANUAL_PROCESS dari sweep sebelumnya | TC32 - Reactivation tidak mengembalikan klaim MANUAL_PROCESS ke queue | Negative | 1. Pastikan ada klaim MANUAL_PROCESS di KOPS (hasil sweep sebelumnya)<br>2. Aktifkan kembali auto distribute untuk KOPS tersebut<br>3. Verifikasi status klaim yang sudah MANUAL_PROCESS | Klaim yang sudah berstatus MANUAL_PROCESS TIDAK otomatis kembali ke queue. Tetap berstatus MANUAL_PROCESS | | | High | `@NM-1383 @edge-case` Scenario: TC32 - Reactivation tidak mengembalikan klaim MANUAL_PROCESS ke queue | Manual / API | |
| 33 | Verify klaim baru yang masuk setelah deactivation langsung menjadi MANUAL_PROCESS | KOPS nonaktif, klaim baru masuk dari proses scoring | KOPS sudah dinonaktifkan, proses scoring masih berjalan dan menghasilkan klaim baru | TC33 - Klaim baru setelah deactivation langsung MANUAL_PROCESS | Negative | 1. Nonaktifkan KOPS<br>2. Trigger proses scoring yang menghasilkan klaim baru untuk KOPS tersebut<br>3. Verifikasi status klaim baru | Klaim baru yang masuk ke KOPS yang nonaktif langsung berstatus MANUAL_PROCESS (tidak masuk queue auto distribute) | | | High | `@NM-1383 @edge-case` Scenario: TC33 - Klaim baru setelah deactivation langsung berstatus MANUAL_PROCESS | Manual / API | |
| 34 | Verify double-click pada button action tidak menyebabkan error | User role: Verifikator Pusat | Halaman Kops Score terbuka | TC34 - Double click / spam click pada action button | Negative | 1. Klik icon power button dengan cepat berulang kali (double click)<br>2. Observasi behavior sistem | Tidak terjadi error. Button di-disable saat request sedang berjalan (debounce), atau request kedua diabaikan | | | Medium | `@NM-1383 @edge-case @negative` Scenario: TC34 - Double click pada action button tidak menyebabkan error | Automated | |
| 35 | Verify concurrent access: 2 admin mengubah KOPS yang sama | 2 session browser berbeda, user A dan user B | Kedua user login sebagai Verifikator Pusat, mengakses halaman yang sama | TC35 - Concurrent update pada KOPS yang sama | Negative | 1. User A buka dialog konfirmasi untuk KOPS X<br>2. User B juga buka dialog konfirmasi untuk KOPS X yang sama<br>3. User A konfirmasi duluan<br>4. User B konfirmasi setelahnya | Salah satu aksi berhasil, yang lain mendapat error/notifikasi bahwa status sudah berubah. Tidak terjadi inconsistency data | | | Medium | `@NM-1383 @edge-case @negative` Scenario: TC35 - Concurrent update pada KOPS yang sama ditangani dengan benar | Manual | |
| 36 | Verify behavior saat network error/timeout selama proses sweep | KOPS aktif dengan klaim di queue, simulasi network issue | Koneksi internet tidak stabil / simulasi timeout | TC36 - Network error saat proses sweep deactivation | Negative | 1. Nonaktifkan KOPS yang memiliki banyak klaim<br>2. Simulasi network timeout (disconnect network saat proses berjalan)<br>3. Verifikasi status KOPS dan klaim | Proses bersifat transactional (all or nothing). Jika gagal: status KOPS tetap aktif, klaim tidak berubah. User mendapat error message | | | Medium | `@NM-1383 @edge-case @negative` Scenario: TC36 - Network error saat sweep tidak menyebabkan partial update | Manual | |

---

## Gherkin Scenarios (Automation Ready)

```gherkin
@NM-1383 @auto-distribute @kops-management
Feature: Setting Auto Distribute per KOPS
  As a Staff Klaim HO (Kantor Pusat) / Kadep Klaim
  I want to activate or deactivate auto distribute feature for each KOPS permanently
  So that only KOPS that are ready and approved use automatic distribution

  # Reference:
  # Story: NM-1383
  # Test Cases: docs/test-cases/NM-1383-test-cases.md
  # Pages: src/pages/kopsManagement/
  # Steps: src/steps/kopsManagement.steps.ts

  Background:
    Given user is on login page
    When user logs in as "verifikator_pusat"
    And user navigates to KOPS Management page

  # ============================================================
  # AC-1: Admin Pusat dapat melihat daftar KOPS
  # ============================================================

  @AC-1 @smoke
  Scenario: TC01 - User Verifikator Pusat berhasil mengakses menu KOPS Management
    Then KOPS Management page should be displayed
    And page title should be "Kops Score"

  @AC-1 @negative @security
  Scenario: TC02 - User non-Verifikator Pusat tidak dapat mengakses menu KOPS Management
    Given user is on login page
    When user logs in as "verifikator"
    Then sidebar menu should not display "KOPS Management" under "Management"

  @AC-1 @smoke
  Scenario: TC03 - Halaman Kops Score menampilkan kolom tabel yang benar
    Then KOPS table should display correct column headers
    And KOPS table headers should contain "Action, Kops Code, Kops Name, Timezone Code, Timezone Offset, Is Autodistribution"

  @AC-1
  Scenario: TC04 - Data KOPS tampil lengkap di tabel dengan badge status
    Then KOPS table should display data rows
    And each KOPS row should display kops code, kops name, timezone code, and timezone offset
    And active KOPS should display green badge in Is Autodistribution column
    And inactive KOPS should display red badge in Is Autodistribution column

  @AC-4
  Scenario: TC05 - Default status auto distribute KOPS adalah nonaktif
    Then newly added KOPS should have Is Autodistribution status as inactive

  # ============================================================
  # AC-2: Admin Pusat dapat mengaktifkan/menonaktifkan auto distribute
  # ============================================================

  @AC-2 @e2e
  Scenario: TC06 - User berhasil mengaktifkan auto distribute untuk KOPS
    Given KOPS "MEDAN" with code "0201" has auto distribute status "inactive"
    When user clicks power button on KOPS "0201"
    Then activation confirmation dialog should be displayed
    And dialog should show KOPS name "MEDAN"
    When user clicks "Ya, Aktifkan" button on dialog
    Then KOPS "0201" status should change to active
    And success notification should be displayed

  @AC-2 @e2e
  Scenario: TC07 - User berhasil menonaktifkan auto distribute untuk KOPS
    Given KOPS "SEMARANG" with code "1101" has auto distribute status "active"
    When user clicks power button on KOPS "1101"
    Then deactivation confirmation dialog should be displayed
    And dialog should show KOPS name "SEMARANG"
    And dialog should show number of claims to be changed to MANUAL_PROCESS
    When user clicks "Ya, Nonaktifkan" button on dialog
    Then KOPS "1101" status should change to inactive
    And success notification should be displayed

  @AC-2
  Scenario: TC08 - Dialog konfirmasi aktivasi menampilkan informasi yang benar
    Given KOPS "MEDAN" with code "0201" has auto distribute status "inactive"
    When user clicks power button on KOPS "0201"
    Then activation confirmation dialog should be displayed
    And dialog title should contain "Konfirmasi"
    And dialog should show KOPS name "MEDAN"
    And dialog should have "Ya, Aktifkan" button
    And dialog should have "Batal" button

  @AC-9 @AC-2
  Scenario: TC09 - Dialog konfirmasi deactivation menampilkan preview jumlah klaim terdampak
    Given KOPS "SEMARANG" with code "1101" has auto distribute status "active"
    And KOPS "1101" has claims in queue with status SCORED or READY_TO_DISTRIBUTE
    When user clicks power button on KOPS "1101"
    Then deactivation confirmation dialog should be displayed
    And dialog should show KOPS name "SEMARANG"
    And dialog should show count of SCORED claims to be affected
    And dialog should show count of READY_TO_DISTRIBUTE claims to be affected
    And dialog should show info that DISTRIBUTED claims are not affected
    And dialog should have "Ya, Nonaktifkan" button
    And dialog should have "Batal" button

  @AC-2 @negative
  Scenario: TC10 - User membatalkan dialog konfirmasi dan status tidak berubah
    Given KOPS "MEDAN" with code "0201" has auto distribute status "inactive"
    When user clicks power button on KOPS "0201"
    Then activation confirmation dialog should be displayed
    When user clicks "Batal" button on dialog
    Then dialog should be closed
    And KOPS "0201" status should remain "inactive"

  # ============================================================
  # AC-3 & AC-4: Setting bersifat permanen dan default nonaktif
  # ============================================================

  @AC-3
  Scenario: TC11 - Setting auto distribute bersifat permanen tidak reset per periode
    Given KOPS "SEMARANG" with code "1101" has been activated previously
    When user navigates to KOPS Management page
    Then KOPS "1101" status should still be "active"

  @AC-3
  Scenario: TC12 - Setting tidak berubah tanpa aksi eksplisit dari user
    Given KOPS "SEMARANG" with code "1101" has auto distribute status "active"
    When user logs out
    And user logs in as "verifikator_pusat"
    And user navigates to KOPS Management page
    Then KOPS "1101" status should still be "active"

  # ============================================================
  # AC-5 & AC-6: Klaim di queue diproses setelah aktivasi
  # ============================================================

  @AC-5 @e2e
  Scenario: TC13 - Klaim READY_TO_DISTRIBUTE diproses auto distribute setelah KOPS diaktifkan
    Given KOPS "0201" has claims with status "READY_TO_DISTRIBUTE"
    And KOPS "0201" auto distribute is activated
    When auto distribute engine triggers next cycle
    Then claims with status "READY_TO_DISTRIBUTE" in KOPS "0201" should be processed
    And claims status should change to "DISTRIBUTED"

  @AC-6 @e2e
  Scenario: TC14 - Klaim SCORED existing tetap mengikuti flow auto distribute setelah aktivasi
    Given KOPS "0201" has claims with status "SCORED"
    And KOPS "0201" auto distribute is activated
    When scoring process completes for those claims
    Then claims status should change to "READY_TO_DISTRIBUTE"
    When auto distribute engine triggers next cycle
    Then claims should be distributed to verifikator

  # ============================================================
  # AC-7: Sweep saat deactivation
  # ============================================================

  @AC-7 @e2e
  Scenario: TC15 - Klaim SCORED diubah ke MANUAL_PROCESS saat KOPS dinonaktifkan
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has claims with status "SCORED"
    When user deactivates auto distribute for KOPS "1101"
    Then all claims with status "SCORED" in KOPS "1101" should change to "MANUAL_PROCESS"

  @AC-7 @e2e
  Scenario: TC16 - Klaim READY_TO_DISTRIBUTE diubah ke MANUAL_PROCESS saat KOPS dinonaktifkan
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has claims with status "READY_TO_DISTRIBUTE"
    When user deactivates auto distribute for KOPS "1101"
    Then all claims with status "READY_TO_DISTRIBUTE" in KOPS "1101" should change to "MANUAL_PROCESS"

  @AC-7
  Scenario: TC17 - Deactivation berhasil pada KOPS tanpa klaim di queue
    Given KOPS "PEKANBARU" with code "0401" has auto distribute status "active"
    And KOPS "0401" has no claims in queue
    When user clicks power button on KOPS "0401"
    Then deactivation confirmation dialog should be displayed
    And dialog should show "0" claims to be affected
    When user clicks "Ya, Nonaktifkan" button on dialog
    Then KOPS "0401" status should change to inactive
    And success notification should be displayed

  # ============================================================
  # AC-8: Klaim DISTRIBUTED tidak terpengaruh
  # ============================================================

  @AC-8 @e2e
  Scenario: TC18 - Klaim DISTRIBUTED tidak terpengaruh oleh deactivation KOPS
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has claims with status "DISTRIBUTED"
    When user deactivates auto distribute for KOPS "1101"
    Then claims with status "DISTRIBUTED" in KOPS "1101" should remain "DISTRIBUTED"
    And distributed claims should continue to be processed by verifikator

  @AC-8 @AC-7
  Scenario: TC19 - Sweep hanya mempengaruhi klaim SCORED dan READY_TO_DISTRIBUTE
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has claims with mixed statuses:
      | status                | count |
      | SCORED                | 5     |
      | READY_TO_DISTRIBUTE   | 3     |
      | DISTRIBUTED           | 2     |
    When user deactivates auto distribute for KOPS "1101"
    Then claims with status "SCORED" should change to "MANUAL_PROCESS"
    And claims with status "READY_TO_DISTRIBUTE" should change to "MANUAL_PROCESS"
    And claims with status "DISTRIBUTED" should remain "DISTRIBUTED"

  # ============================================================
  # AC-9: Konfirmasi jumlah klaim
  # ============================================================

  @AC-9
  Scenario: TC20 - Jumlah klaim di dialog konfirmasi sesuai data aktual
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has exactly "5" claims with status "SCORED"
    And KOPS "1101" has exactly "3" claims with status "READY_TO_DISTRIBUTE"
    When user clicks power button on KOPS "1101"
    Then deactivation confirmation dialog should show total "8" claims to be affected

  @AC-9
  Scenario: TC21 - User mendapat feedback jumlah klaim yang diubah setelah deactivation
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has claims in queue
    When user deactivates auto distribute for KOPS "1101"
    Then success notification should display count of claims changed to MANUAL_PROCESS

  # ============================================================
  # AC-10: Audit log
  # ============================================================

  @AC-10
  Scenario: TC22 - Audit log tercatat saat mengaktifkan auto distribute
    Given KOPS "0201" has auto distribute status "inactive"
    When user activates auto distribute for KOPS "0201"
    Then audit log should record entry with:
      | field         | value              |
      | kops_code     | 0201               |
      | action        | ACTIVATE           |
      | performed_by  | verifikator_pusat  |

  @AC-10
  Scenario: TC23 - Audit log tercatat saat menonaktifkan auto distribute
    Given KOPS "1101" has auto distribute status "active"
    When user deactivates auto distribute for KOPS "1101"
    Then audit log should record entry with:
      | field                  | value              |
      | kops_code              | 1101               |
      | action                 | DEACTIVATE         |
      | performed_by           | verifikator_pusat  |
      | affected_claims_count  | > 0                |

  @AC-10
  Scenario: TC24 - Audit log mencatat user identity yang benar
    Given user "admin_pusat_A" activates KOPS "0201"
    And user "admin_pusat_B" deactivates KOPS "1101"
    Then audit log for KOPS "0201" should record performed_by as "admin_pusat_A"
    And audit log for KOPS "1101" should record performed_by as "admin_pusat_B"

  # ============================================================
  # Filter & UI Functionality
  # ============================================================

  @filter
  Scenario: TC25 - Filter KOPS by nama berfungsi dengan benar
    When user selects "SEMARANG" from KOPS filter dropdown
    And user clicks Search button
    Then KOPS table should only display rows containing "SEMARANG"

  @filter
  Scenario: TC26 - Filter KOPS by kode berfungsi dengan benar
    When user selects "0201" from KOPS filter dropdown
    And user clicks Search button
    Then KOPS table should only display rows with kops code "0201"

  @filter
  Scenario: TC27 - Reset Filter mengembalikan tampilan semua KOPS
    Given KOPS filter is applied with keyword "SEMARANG"
    When user clicks Reset Filter button
    Then KOPS table should display all KOPS data
    And filter dropdown should be cleared

  @filter @negative
  Scenario: TC28 - Filter dengan keyword tidak match menampilkan empty state
    When user types "XYZNOTEXIST" in KOPS filter
    And user clicks Search button
    Then KOPS table should display no data message

  @ui
  Scenario: TC29 - Icon power button menampilkan tooltip saat hover
    When user hovers on power button icon of any KOPS row
    Then tooltip "Aktif/Nonaktif" should be displayed

  @ui
  Scenario: TC30 - Pagination tabel KOPS berfungsi dengan benar
    Then KOPS table should display pagination info "Showing X-Y of Z entries"
    When user navigates to next page
    Then KOPS table should display next set of data

  # ============================================================
  # Edge Cases & Negative Scenarios
  # ============================================================

  @negative @security
  Scenario: TC31 - User non-HO tidak dapat mengakses halaman via direct URL
    Given user is on login page
    When user logs in as "verifikator"
    And user navigates directly to KOPS Management URL
    Then user should be redirected to unauthorized page
    Or KOPS Management page should not be accessible

  @edge-case
  Scenario: TC32 - Reactivation tidak mengembalikan klaim MANUAL_PROCESS ke queue
    Given KOPS "1101" was previously deactivated
    And KOPS "1101" has claims with status "MANUAL_PROCESS" from previous sweep
    When user activates auto distribute for KOPS "1101"
    Then claims with status "MANUAL_PROCESS" should remain "MANUAL_PROCESS"
    And those claims should NOT be re-queued for auto distribution

  @edge-case
  Scenario: TC33 - Klaim baru setelah deactivation langsung berstatus MANUAL_PROCESS
    Given KOPS "1101" has auto distribute status "inactive"
    When a new claim is scored for KOPS "1101"
    Then the new claim should have status "MANUAL_PROCESS"
    And the claim should NOT enter auto distribute queue

  @edge-case @negative
  Scenario: TC34 - Double click pada action button tidak menyebabkan error
    Given KOPS "0201" has auto distribute status "inactive"
    When user double-clicks power button on KOPS "0201" rapidly
    Then only one confirmation dialog should appear
    And no error should be displayed

  @edge-case @negative
  Scenario: TC35 - Concurrent update pada KOPS yang sama ditangani dengan benar
    Given user A opens activation dialog for KOPS "0201"
    And user B opens activation dialog for KOPS "0201" simultaneously
    When user A confirms activation
    And user B confirms activation after user A
    Then one action should succeed
    And the other should receive an appropriate error or be handled gracefully

  @edge-case @negative
  Scenario: TC36 - Network error saat sweep tidak menyebabkan partial update
    Given KOPS "1101" has auto distribute status "active"
    And KOPS "1101" has claims in queue
    When user attempts to deactivate KOPS "1101"
    And network error occurs during sweep process
    Then KOPS "1101" status should remain "active"
    And all claims should remain in their original status
    And error notification should be displayed to user
```

---

## Coverage Summary

| Acceptance Criteria | TC Count | TC IDs | Type Coverage |
|-----|-----------|---------|---------|
| AC-1: View list KOPS & status | 5 | TC01-TC05 | Positive + Negative |
| AC-2: Activate/Deactivate | 5 | TC06-TC10 | Positive + Negative |
| AC-3 & AC-4: Permanen & default nonaktif | 2 | TC11-TC12 | Positive |
| AC-5 & AC-6: Klaim di queue diproses setelah aktivasi | 2 | TC13-TC14 | Positive |
| AC-7: Sweep saat deactivation | 3 | TC15-TC17 | Positive |
| AC-8: Klaim DISTRIBUTED tidak terpengaruh | 2 | TC18-TC19 | Positive |
| AC-9: Konfirmasi jumlah klaim | 2 | TC20-TC21 | Positive |
| AC-10: Audit log | 3 | TC22-TC24 | Positive |
| Filter & UI | 6 | TC25-TC30 | Positive + Negative |
| Edge Cases & Negative | 6 | TC31-TC36 | Negative |
| **Total** | **36** | | |

---

## Feature File Mapping

| TC Range | Feature Scenario | Tag |
|----------|---|---|
| TC01-TC05 | Access & display halaman KOPS Management | `@NM-1383 @AC-1 @smoke` |
| TC06-TC10 | Activate & deactivate auto distribute | `@NM-1383 @AC-2 @e2e` |
| TC11-TC12 | Permanent setting validation | `@NM-1383 @AC-3` |
| TC13-TC14 | Post-activation claim processing | `@NM-1383 @AC-5 @AC-6 @e2e` |
| TC15-TC17 | Deactivation sweep behavior | `@NM-1383 @AC-7 @e2e` |
| TC18-TC19 | DISTRIBUTED claim protection | `@NM-1383 @AC-8` |
| TC20-TC21 | Deactivation confirmation feedback | `@NM-1383 @AC-9` |
| TC22-TC24 | Audit log recording | `@NM-1383 @AC-10` |
| TC25-TC30 | Filter & UI functionality | `@NM-1383 @filter @ui` |
| TC31-TC36 | Edge cases & negative scenarios | `@NM-1383 @edge-case @negative` |

**Feature File:** `src/features/autoDistribute/settingAutoDistributeKops.feature`

---

## Test Priority Summary

| Priority | Count | TC IDs |
|----------|-------|--------|
| High | 16 | TC01, TC02, TC05, TC06, TC07, TC09, TC13, TC14, TC15, TC16, TC18, TC19, TC20, TC31, TC32, TC33 |
| Medium | 14 | TC03, TC04, TC08, TC10, TC11, TC17, TC21, TC22, TC23, TC24, TC25, TC26, TC27, TC34, TC35, TC36 |
| Low | 6 | TC12, TC28, TC29, TC30 |

---

## Automation Scope

| Category | TC IDs | Approach |
|----------|--------|----------|
| Automated (UI) | TC01-TC04, TC06-TC10, TC17, TC21, TC25-TC31, TC34 | Playwright + Cucumber BDD |
| Manual / API Validation | TC05, TC11-TC16, TC18-TC20, TC22-TC24, TC32, TC33, TC35, TC36 | Manual testing + API/DB verification |

**Reasoning:**
- UI interactions (access, filter, dialog, button clicks) → automated
- Backend behavior (sweep, state transition, audit log, engine trigger) → manual + API/DB check karena bergantung pada kondisi data dan timing engine

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | | |
| Tester | | | |
| Squad Lead | | | |
| BA / PO | | | |

---

## Attachment

| Test Case ID | Attachment |
|---|---|
| TC01 | |
| TC02 | |
| TC03 | |
| TC04 | |
| TC05 | |
| TC06 | |
| TC07 | |
| TC08 | |
| TC09 | |
| TC10 | |
| TC11 | |
| TC12 | |
| TC13 | |
| TC14 | |
| TC15 | |
| TC16 | |
| TC17 | |
| TC18 | |
| TC19 | |
| TC20 | |
| TC21 | |
| TC22 | |
| TC23 | |
| TC24 | |
| TC25 | |
| TC26 | |
| TC27 | |
| TC28 | |
| TC29 | |
| TC30 | |
| TC31 | |
| TC32 | |
| TC33 | |
| TC34 | |
| TC35 | |
| TC36 | |
