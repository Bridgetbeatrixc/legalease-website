# Tax rules used in `lib/tax.ts`: sources

Checked 10 October 2026. These figures are for estimates only and are not tax advice.

## PPh 21 (permanent employee)
- **PTKP**: Rp54,000,000 for the taxpayer, +Rp4,500,000 if married, +Rp4,500,000 per dependent (max 3). Set by PMK 101/PMK.010/2016 and **unchanged as of Oct 2026**. An inflation-linked increase is under discussion, but no PMK has been issued.
  - https://news.ddtc.co.id/berita/nasional/1822910/ptkp-bakal-naik-intip-perubahan-besarannya-sejak-1984 (1 Oct 2026)
  - https://pajakku.com/artikel/perkembangan-dan-proyeksi-batas-ptkp-2026 (updated 27 Aug 2026)
- **Biaya jabatan**: 5% of gross, capped at Rp6,000,000/year (Rp500,000/month). Pension/JHT/JP contributions paid by the employee and zakat paid via the employer are also deductible. Source: PMK 168/2023 Pasal 10.
  - https://news.ddtc.co.id/berita/nasional/1799949/ini-pengurang-yang-diperolehkan-bagi-wajib-pajak-pegawai-tetap
  - https://news.ddtc.co.id/berita/nasional/1801594/ter-dikali-penghasilan-bruto-kapan-pengurangan-dan-ptkp-dihitung
- **Pasal 17 brackets (UU HPP 7/2021)**: 5% up to 60m, 15% for 60–250m, 25% for 250–500m, 30% for 500m–5bn, and 35% above 5bn. Worked examples on the DJP page (PKP 66m gives 3.9m tax, PKP 126m gives 12.9m) are reproduced in the tests.
  - https://pajak.go.id/sites/default/files/2023-01/SP-1%202023%20Gaji%205%20Juta%20Kena%20Pajak.pdf
- **TER bulanan (PP 58/2023 Lampiran)**: category A = TK/0, TK/1, K/0; B = TK/2, TK/3, K/1, K/2; C = K/3. Tables A (44 rows), B (40) and C (41) were transcribed from the official annex.
  - https://www.pajak.go.id/sites/default/files/lampiran/Lampiran%20PP58TAHUN2023.pdf
- **2026 note**: PMK 105/2025 provides PPh 21 DTP (government-borne) for 2026 to employees earning ≤ Rp10m/month in listed labour-intensive sectors (textiles, footwear, furniture, leather, tourism). The calculation does not change; the government bears the tax. The calculator does not model this.
  - https://aguspajak.com/2026/01/19/panduan-pph-pasal-21-ditanggung-pemerintah-dtp-2026-aturan-pmk-105-2025/

## PPh Final UMKM 0.5% (PP 55/2022 as amended by PP 20/2026, in force 22 Apr 2026)
- The rate is still 0.5% of gross turnover, and the turnover ceiling is still Rp4.8bn per tax year.
- **Eligible from 22 Apr 2026**: individuals (no time limit while the criteria are met; Pasal 59 is repealed), PT perorangan (no time limit), and koperasi (4 tax years). Newly registered CV, firma, regular PT and BUMDes **no longer qualify**. Those registered before PP 20/2026 may finish their original PP 55/2022 period (PT 3 years; CV/firma/BUMDes 4 years). Individuals and PT perorangan that fail the new criteria may use 0.5% until the end of 2026.
- **Individuals**: the first Rp500m of turnover per tax year is untaxed (UU HPP Pasal 7(2a); PP 55/2022 Pasal 60(2)), counted cumulatively from January. This is unchanged by PP 20/2026.
- The turnover of spouses and any PT perorangan they own is combined for the 4.8bn test.
  - https://pajak.go.id/id/artikel/pp-202026-tarif-pph-05-bagi-umkm-orang-pribadi-berlaku-selamanya
  - https://www.pajak.go.id/sites/default/files/2026-06/Peraturan%20Pemerintah%20nomor%2020%20Tahun%202026.pdf (DJP socialisation slides)
  - https://news.ddtc.co.id/berita/nasional/1819744/pp-berlaku-pph-final-umkm-kini-bukan-untuk-cv-pt-firma-dan-bumdes
  - https://news.ddtc.co.id/berita/nasional/1819870/terdaftar-sebelum-pp-202026-terbit-pt-masih-bisa-pakai-tarif-05
  - https://news.ddtc.co.id/berita/nasional/1819765/ada-pp-baru-omzet-hingga-rp500-juta-bebas-pajak-masih-berlaku

## PPh 23 (UU PPh Pasal 23)
- 15% applies to dividends, interest, royalties, and prizes/awards (other than PPh 21). 2% applies to rent of assets other than land/buildings and to services. Without an NPWP, the rate is 100% higher (30% / 4%).
  - https://pajak.go.id/id/pph-pasal-23
  - https://pajakku.com/nik-belum-aktif-kenaikan-tarif-pph-23-non-npwp-tetap-berlaku

## PPh 4 ayat (2) (final)
- **Land/building rent**: 10% of gross rent, including service charges (PP 34/2017).
  - https://news.ddtc.co.id/literasi/kelas-pajak/39122/pajak-atas-persewaan-tanah-danatau-bangunan
- **Transfer of land/building rights**: 2.5% in general, 1% for rumah/rusun sederhana sold by a property business, and 0% for transfers to government or BUMN/BUMD for public-interest projects (PP 34/2016). The base is the higher of the deed value and NJOP. Individuals below PTKP are exempt for transfers under Rp60m.
  - https://setkab.go.id/pp-no-342016-pph-pengalihanjual-beli-tanahbangunan-25-di-bawah-rp-60-juta-dikecualikan/
  - https://news.ddtc.co.id/literasi/kelas-pajak/10211/pajak-atas-pengalihan-hak-atas-tanah-danatau-bangunan
- **Construction (PP 9/2022)**:
  - Construction work: 1.75% for small qualification or individual competency certificate holders, 4% without a certificate, and 2.65% for other (medium/large) providers.
  - Integrated construction work: 2.65% with a certificate, 4% without.
  - Consulting: 3.5% with a certificate, 6% without.
  - The Finance Minister began evaluating these rates in 2025. No change had been enacted as of the last check.
  - https://news.ddtc.co.id/berita/nasional/1810554/daftar-kode-objek-pajak-untuk-pph-final-jasa-konstruksi-dan-tarifnya
  - https://news.ddtc.co.id/berita/nasional/1813321/pph-final-jasa-konstruksi-sudah-masuk-masa-evaluasi-menkeu
- **Deposit/savings interest**: 20% final (PP 131/2000, PMK 212/2018). Balances of Rp7.5m or less are exempt.
  - https://news.ddtc.co.id/berita/nasional/1809863/nabung-di-bank-dapat-bunga-terus-kena-pajak-begini-ketentuannya
  - https://news.ddtc.co.id/review/opini/1820916/apakah-tarif-pph-final-20-atas-bunga-deposito-masih-relevan (Jul 2026: still 20%)
- **Dividends to resident individuals**: 10% final, exempt if reinvested in Indonesia for 3 years (PMK 18/2021).
  - https://news.ddtc.co.id/tidak-investasikan-dividen-wajib-pajak-harus-setor-pph-final-sendiri-42362
- **Lottery prizes (hadiah undian)**: 25% final (PP 132/2000).
  - https://meridianhukum.com/peraturan/pp-no-132-tahun-2000 (secondary source)

## PPN (UU HPP; PMK 131/2024, effective 1 Jan 2025, unchanged for 2026)
- The rate is 12%. For non-luxury goods and services, DPP = 11/12 × price, which gives an effective rate of 11%. For luxury goods subject to PPnBM, DPP = full price, which gives 12%. PPnBM itself (10–95%) is not computed.
  - https://news.ddtc.co.id/berita/nasional/1812992/tak-berubah-tarif-ppn-12-tetap-berlaku-untuk-barang-mewah-di-2026

## Uncertain / simplified
- **TER tables** come from an OCR-extracted copy of the official annex. They were cross-checked for monotonicity and against the widely published table, but a final visual check against the PDF is recommended.
- **PKP rounding** down to Rp1,000 is standard DJP practice. I did not locate the exact article citation.
- **Rounding of tax amounts**: tax amounts are rounded down to whole rupiah. PPN DPP and PPN are rounded to the nearest rupiah. There is no explicit legal rule on fractions.
- **What counts toward the Rp4.8bn UMKM test**: DJP's article says all business and freelance turnover, including foreign. The DJP slides say only turnover from business income subject to 0.5%. The calculator just compares the turnover entered.
- **Non-NPWP surcharges**: the 20% surcharge for PPh 21 and the 100% surcharge for PPh 22 are not modelled. Only the PPh 23 doubling is.
- **PPh 23 on dividends**: dividends paid to domestic companies and to individuals who reinvest are exempt. The 15% rate is the statutory default.
- **PPh 21 annual calculation**: assumes a full year with one employer. It does not handle THR/bonus separately; add these into gross if needed.
