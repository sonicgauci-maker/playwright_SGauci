// ═══════════════════════════════════════════════════════════════
// E-CLAIM ONE BY IFG — Insert via API (Encrypt → Decrypt → Submit)
// Sekali jalan: encrypt data lalu langsung kirim ke NWPengajuanKlaim
// ═══════════════════════════════════════════════════════════════

// 📌 EDIT INPUT DISINI:
const baseUrl               = 'https://development.inhealth.co.id/sa-stsht-svc/api';
const nomorKartuInhealth    = '1101703768029';       // NOKA📌
const nomorRekening         = '1390094033549';
const kodeBank              = '014';
const namaPemilikRekening   = 'DIMAS';
const sourceClaim           = 'ONE';
const kodeProduk            = 'I';
const email                 = 'syaiful.gauci@inhealth.co.id';
const jenisManfaat          = 'RJ 05';
const isProviderInhealth    = '1';
const totalBiayaKwitansi    = '755004';              // Amount📌
const kodeBadanUsaha        = '01120715';
const kdlo                  = '0901';                // KDLO📌
const kodeProvider          = '00021048';            // Kode Provider📌
const namaProvider          = '3K DENTAL CARE SEMARANG - KPM JAKARTA PUSAT';
const keteranganPenyakit    = 'Tester-SGC';
const phoneNumber           = '+6289662284227';
const username              = '+628668603321';
const tanggalPelayanan      = '20/07/2026';          // Tgl Pelayanan📌
const saveTp                = 'SAVE_TP_01';
const status                = 'PREPROP_ST_01';
// ═══════════════════════════════════════════════════════════════

import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('E-Claim ONE by IFG - Insert via API', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Encrypt & Submit E-Claim ONE (sekali jalan)', async () => {
    // ── Step 1: Generate Encrypted Data ──
    const encryptResponse = await test.step('Encrypt - GeneratorInhealthEncryptDataWithPub', async () => {
      const response = await apiContext.post(`${baseUrl}/GeneratorInhealthEncryptDataWithPub`, {
        data: {
          notes: '',
          preProposalNumber: null,
          nomorRekening,
          kodeBank,
          nomorKartuInhealth,
          sourceClaim,
          poli: '',
          tanggalPelayanan,
          fileClaims: { list: [], empty: true },
          saveTp,
          kodeProduk,
          email,
          jenisManfaat,
          isProviderInhealth,
          totalBiayaKwitansi,
          kodeBadanUsaha,
          namaPemilikRekening,
          proposalNumber: null,
          preProposalId: '',
          kdlo,
          kodeProvider,
          keteranganPenyakit,
          phoneNumber,
          namaProvider,
          namaDokter: '',
          username,
          status,
          kotaProvider: '',
          preProposalTanggal: '',
          preProposalStatusCd: '',
          preProposalStatusNm: '',
          trxClaimNo: '',
          offset: 0,
          limit: 10,
          keyword: '',
          card_no: '',
          latitude: '',
          longitude: '',
          provider_rating: '',
        },
      });

      const httpStatus = response.status();
      const body = await response.text();

      const step1Status = httpStatus === 200 ? '✅ PASSED' : '❌ FAILED';
      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  STEP 1: Encrypt (GeneratorInhealthEncryptDataWithPub)  │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Result      : ${step1Status}`);
      console.log(`│  HTTP Status : ${httpStatus}`);
      console.log(`│  Body Length : ${body.length} chars`);
      console.log(`│  Preview     : ${body.substring(0, 50)}...`);
      if (httpStatus !== 200) {
        console.log('├─────────────────────────────────────────────────────────┤');
        console.log(`│  ERROR: API returned ${httpStatus} instead of 200`);
        console.log(`│  Response: ${body.substring(0, 200)}`);
      }
      console.log('└─────────────────────────────────────────────────────────┘\n');

      expect(httpStatus, 'Encrypt API harus return 200').toBe(200);
      expect(body.length, 'Encrypted data tidak boleh kosong').toBeGreaterThan(0);

      return body;
    });

    // ── Step 2: Decrypt & Submit (langsung pakai encrypted data) ──
    await test.step('Decrypt & Submit - NWPengajuanKlaim', async () => {
      // Kirim sebagai text/plain sesuai curl
      const response = await apiContext.post(`${baseUrl}//NWPengajuanKlaim`, {
        data: encryptResponse,
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      const httpStatus = response.status();
      const responseText = await response.text();
      let responseBody: any;

      try {
        responseBody = JSON.parse(responseText);
      } catch {
        responseBody = responseText;
      }

      const metadata = responseBody?.metadata || {};
      const data = responseBody?.data || {};

      const isSuccess = httpStatus === 200 && metadata.code !== '400';
      const step2Status = isSuccess ? '✅ PASSED' : '❌ FAILED';

      console.log('\n┌─────────────────────────────────────────────────────────┐');
      console.log('│  STEP 2: Decrypt & Submit (NWPengajuanKlaim)            │');
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  Result      : ${step2Status}`);
      console.log(`│  HTTP Status : ${httpStatus}`);
      console.log(`│  Code        : ${metadata.code || '-'}`);
      console.log(`│  Message     : ${metadata.message || '-'}`);
      console.log('├─────────────────────────────────────────────────────────┤');
      console.log(`│  preProposalId     : ${data.preProposalId || '-'}`);
      console.log(`│  preProposalNumber : ${data.preProposalNumber || '-'}`);
      console.log(`│  proposalNumber    : ${data.proposalNumber || '-'}`);
      console.log(`│  namaPengaju       : ${data.namaPengaju || '-'}`);
      console.log(`│  pkskd             : ${data.pkskd || '-'}`);
      console.log(`│  ppkpst            : ${data.ppkpst || '-'}`);
      if (!isSuccess) {
        console.log('├─────────────────────────────────────────────────────────┤');
        console.log(`│  ⚠️  FAILURE DETAIL:`);
        console.log(`│  HTTP ${httpStatus} | Code: ${metadata.code} | ${metadata.message}`);
        console.log(`│  Full Response: ${JSON.stringify(responseBody).substring(0, 200)}`);
      }
      console.log('└─────────────────────────────────────────────────────────┘\n');

      expect(httpStatus, 'Submit API harus return 200').toBe(200);
      expect(responseBody, 'Response body tidak boleh null').not.toBeNull();
    });
  });
});
