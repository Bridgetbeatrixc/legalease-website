// Generated from lib/tax.ts by scripts/build-tax-js.mjs. Edit lib/tax.ts, not this file.
window.LegalEaseTax = (function () {
/**
 * Indonesian income-tax (PPh) and VAT (PPN) calculators: pure functions, no UI.
 *
 * Rules as in force on 10 October 2026. Sources and open points are in ./tax.sources.md.
 * All money values are integer rupiah. Rates are stored as decimals (0.05 = 5%) but
 * multiplied via integer basis points so results do not suffer floating-point drift.
 *
 * UI labels deliberately live elsewhere: every option list exports stable `key`s that the
 * UI can translate (id / en / zh).
 */
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/** Clamp to a non-negative integer rupiah amount (NaN / negative -> 0). */
function rp(n) {
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}
/** amount x rate, rounded down to whole rupiah (rate given as a decimal fraction). */
function applyRate(amount, rate) {
    // Rate in micro-units (0.0025 -> 2500) and BigInt math: exact for any rupiah amount.
    const micro = BigInt(Math.round(rate * 1000000));
    return Number((BigInt(Math.floor(amount)) * micro) / BigInt(1000000));
}
// ---------------------------------------------------------------------------
// PPh 21: permanent employee
// ---------------------------------------------------------------------------
/** PTKP per year. PMK 101/PMK.010/2016 (unchanged as of Oct 2026; increase only under discussion). */
const PTKP_SELF = 54000000;
/** Extra PTKP for a married taxpayer. PMK 101/2016. */
const PTKP_MARRIED = 4500000;
/** Extra PTKP per dependent. PMK 101/2016. */
const PTKP_PER_DEPENDENT = 4500000;
/** Max dependents counted for PTKP. UU PPh Pasal 7 ayat (1) huruf c. */
const PTKP_MAX_DEPENDENTS = 3;
/** Biaya jabatan: 5% of gross. PMK 168/2023 Pasal 10 ayat (1). */
const JOB_COST_RATE = 0.05;
/** Biaya jabatan cap per year (Rp500,000/month). PMK 168/2023 Pasal 10 ayat (1). */
const JOB_COST_MAX_ANNUAL = 6000000;
const JOB_COST_MAX_MONTHLY = 500000;
/**
 * Progressive individual brackets, UU PPh Pasal 17 ayat (1) huruf a as amended by
 * UU 7/2021 (HPP). `upTo` is the inclusive upper bound of PKP; null = no limit.
 */
const PPH17_BRACKETS = [
    { upTo: 60000000, rate: 0.05 },
    { upTo: 250000000, rate: 0.15 },
    { upTo: 500000000, rate: 0.25 },
    { upTo: 5000000000, rate: 0.3 },
    { upTo: null, rate: 0.35 },
];
/** PKP is rounded down to the full thousand rupiah (DJP computation rule, applied in PMK 168/2023 Lampiran examples). */
const PKP_ROUNDING = 1000;
const PTKP_STATUSES = [
    "TK/0", "TK/1", "TK/2", "TK/3", "K/0", "K/1", "K/2", "K/3",
];
function ptkpStatus(married, dependents) {
    const d = Math.min(PTKP_MAX_DEPENDENTS, Math.max(0, Math.floor(dependents || 0)));
    return `${married ? "K" : "TK"}/${d}`;
}
function ptkpAmount(married, dependents) {
    const d = Math.min(PTKP_MAX_DEPENDENTS, Math.max(0, Math.floor(dependents || 0)));
    return PTKP_SELF + (married ? PTKP_MARRIED : 0) + d * PTKP_PER_DEPENDENT;
}
/** Tax on PKP using the Pasal 17 brackets. Also returns the marginal (top) rate reached. */
function pph17Progressive(pkp) {
    let remaining = rp(pkp);
    let lower = 0;
    let tax = 0;
    let topBracketRate = 0;
    for (const b of PPH17_BRACKETS) {
        if (remaining <= 0)
            break;
        const width = b.upTo === null ? remaining : Math.min(remaining, b.upTo - lower);
        tax += applyRate(width, b.rate);
        topBracketRate = b.rate;
        remaining -= width;
        if (b.upTo !== null)
            lower = b.upTo;
    }
    return { tax, topBracketRate };
}
/**
 * Annual PPh 21 for a permanent employee working the full year with one employer
 * (December / annualised computation, PMK 168/2023 Pasal 13-14).
 */
function pph21Annual(input) {
    const grossAnnual = rp(input.grossMonthly) * 12;
    const jobCost = Math.min(applyRate(grossAnnual, JOB_COST_RATE), JOB_COST_MAX_ANNUAL);
    const otherDeductions = rp(input.otherDeductionsMonthly ?? 0) * 12;
    const netAnnual = Math.max(0, grossAnnual - jobCost - otherDeductions);
    const ptkp = ptkpAmount(input.married, input.dependents);
    const pkp = Math.floor(Math.max(0, netAnnual - ptkp) / PKP_ROUNDING) * PKP_ROUNDING;
    const { tax: taxAnnual, topBracketRate } = pph17Progressive(pkp);
    return {
        status: ptkpStatus(input.married, input.dependents),
        grossAnnual,
        jobCost,
        otherDeductions,
        netAnnual,
        ptkp,
        pkp,
        taxAnnual,
        taxMonthly: Math.floor(taxAnnual / 12),
        effectiveRate: grossAnnual > 0 ? taxAnnual / grossAnnual : 0,
        topBracketRate: pkp > 0 ? topBracketRate : 0,
    };
}
/** PP 58/2023 Pasal 2 ayat (3): A = TK/0, TK/1, K/0; B = TK/2, TK/3, K/1, K/2; C = K/3. */
const TER_CATEGORY_BY_STATUS = {
    "TK/0": "A", "TK/1": "A", "K/0": "A",
    "TK/2": "B", "TK/3": "B", "K/1": "B", "K/2": "B",
    "K/3": "C",
};
const M = 1000000;
const TER_MONTHLY = {
    A: [
        [5.4 * M, 0], [5.65 * M, 0.25], [5.95 * M, 0.5], [6.3 * M, 0.75], [6.75 * M, 1],
        [7.5 * M, 1.25], [8.55 * M, 1.5], [9.65 * M, 1.75], [10.05 * M, 2], [10.35 * M, 2.25],
        [10.7 * M, 2.5], [11.05 * M, 3], [11.6 * M, 3.5], [12.5 * M, 4], [13.75 * M, 5],
        [15.1 * M, 6], [16.95 * M, 7], [19.75 * M, 8], [24.15 * M, 9], [26.45 * M, 10],
        [28 * M, 11], [30.05 * M, 12], [32.4 * M, 13], [35.4 * M, 14], [39.1 * M, 15],
        [43.85 * M, 16], [47.8 * M, 17], [51.4 * M, 18], [56.3 * M, 19], [62.2 * M, 20],
        [68.6 * M, 21], [77.5 * M, 22], [89 * M, 23], [103 * M, 24], [125 * M, 25],
        [157 * M, 26], [206 * M, 27], [337 * M, 28], [454 * M, 29], [550 * M, 30],
        [695 * M, 31], [910 * M, 32], [1400 * M, 33], [Infinity, 34],
    ],
    B: [
        [6.2 * M, 0], [6.5 * M, 0.25], [6.85 * M, 0.5], [7.3 * M, 0.75], [9.2 * M, 1],
        [10.75 * M, 1.5], [11.25 * M, 2], [11.6 * M, 2.5], [12.6 * M, 3], [13.6 * M, 4],
        [14.95 * M, 5], [16.4 * M, 6], [18.45 * M, 7], [21.85 * M, 8], [26 * M, 9],
        [27.7 * M, 10], [29.35 * M, 11], [31.45 * M, 12], [33.95 * M, 13], [37.1 * M, 14],
        [41.1 * M, 15], [45.8 * M, 16], [49.5 * M, 17], [53.8 * M, 18], [58.5 * M, 19],
        [64 * M, 20], [71 * M, 21], [80 * M, 22], [93 * M, 23], [109 * M, 24],
        [129 * M, 25], [163 * M, 26], [211 * M, 27], [374 * M, 28], [459 * M, 29],
        [555 * M, 30], [704 * M, 31], [957 * M, 32], [1405 * M, 33], [Infinity, 34],
    ],
    C: [
        [6.6 * M, 0], [6.95 * M, 0.25], [7.35 * M, 0.5], [7.8 * M, 0.75], [8.85 * M, 1],
        [9.8 * M, 1.25], [10.95 * M, 1.5], [11.2 * M, 1.75], [12.05 * M, 2], [12.95 * M, 3],
        [14.15 * M, 4], [15.55 * M, 5], [17.05 * M, 6], [19.5 * M, 7], [22.7 * M, 8],
        [26.6 * M, 9], [28.1 * M, 10], [30.1 * M, 11], [32.6 * M, 12], [35.4 * M, 13],
        [38.9 * M, 14], [43 * M, 15], [47.4 * M, 16], [51.2 * M, 17], [55.8 * M, 18],
        [60.4 * M, 19], [66.7 * M, 20], [74.5 * M, 21], [83.2 * M, 22], [95.6 * M, 23],
        [110 * M, 24], [134 * M, 25], [169 * M, 26], [221 * M, 27], [390 * M, 28],
        [463 * M, 29], [561 * M, 30], [709 * M, 31], [965 * M, 32], [1419 * M, 33],
        [Infinity, 34],
    ],
};
/** Monthly PPh 21 withholding for Jan-Nov: TER x monthly gross (PMK 168/2023 Pasal 13 ayat 2). */
function pph21Ter(input) {
    const gross = rp(input.grossMonthly);
    const status = ptkpStatus(input.married, input.dependents);
    const category = TER_CATEGORY_BY_STATUS[status];
    const row = TER_MONTHLY[category].find(([upper]) => gross <= upper);
    const rate = row[1] / 100;
    return { status, category, rate, taxMonthly: applyRate(gross, rate) };
}
// ---------------------------------------------------------------------------
// PPh Final UMKM 0.5%: PP 55/2022 as amended by PP 20/2026 (in force 22 April 2026)
// ---------------------------------------------------------------------------
/** PP 55/2022 Pasal 56-57, unchanged by PP 20/2026. */
const UMKM_FINAL_RATE = 0.005;
/** Annual gross-turnover ceiling, PP 55/2022 Pasal 57 ayat (1) (as amended by PP 20/2026). */
const UMKM_TURNOVER_LIMIT = 4800000000;
/**
 * Individuals: first Rp500 million of business turnover per tax year is not taxed.
 * UU HPP (UU 7/2021) Pasal 7 ayat (2a); PP 55/2022 Pasal 60 ayat (2); kept by PP 20/2026.
 */
const UMKM_INDIVIDUAL_EXEMPT_TURNOVER = 500000000;
/**
 * Who may use the 0.5% final tax after PP 20/2026:
 * - maxYears: tax years counted from the registration year (null = no time limit while criteria are met).
 * - newRegistrationsEligible: false = only bodies registered before 22 Apr 2026 may finish
 *   their original PP 55/2022 period (PP 20/2026 Pasal II transitional rule).
 * - exemptTurnover: Rp500m relief (individuals only).
 */
const UMKM_TAXPAYER_TYPES = [
    { key: "individual", rate: UMKM_FINAL_RATE, maxYears: null, newRegistrationsEligible: true, exemptTurnover: UMKM_INDIVIDUAL_EXEMPT_TURNOVER },
    { key: "pt_perorangan", rate: UMKM_FINAL_RATE, maxYears: null, newRegistrationsEligible: true, exemptTurnover: 0 },
    { key: "koperasi", rate: UMKM_FINAL_RATE, maxYears: 4, newRegistrationsEligible: true, exemptTurnover: 0 },
    { key: "legacy_cv_firma", rate: UMKM_FINAL_RATE, maxYears: 4, newRegistrationsEligible: false, exemptTurnover: 0 },
    { key: "legacy_pt", rate: UMKM_FINAL_RATE, maxYears: 3, newRegistrationsEligible: false, exemptTurnover: 0 },
    { key: "legacy_bumdes", rate: UMKM_FINAL_RATE, maxYears: 4, newRegistrationsEligible: false, exemptTurnover: 0 },
];
function pphFinalUmkm(input) {
    const type = UMKM_TAXPAYER_TYPES.find((t) => t.key === input.taxpayer) ?? UMKM_TAXPAYER_TYPES[0];
    const before = rp(input.turnoverBeforeThisPeriod ?? 0);
    const turnover = rp(input.turnover);
    const cumulative = before + turnover;
    const exemptLeft = Math.max(0, type.exemptTurnover - before);
    const exemptPortion = Math.min(turnover, exemptLeft);
    const taxableTurnover = turnover - exemptPortion;
    return {
        rate: type.rate,
        exemptPortion,
        taxableTurnover,
        tax: applyRate(taxableTurnover, type.rate),
        cumulativeTurnover: cumulative,
        exceedsLimit: cumulative > UMKM_TURNOVER_LIMIT,
    };
}
/**
 * 15%: dividends, interest, royalties, prizes/awards (other than PPh 21), Pasal 23 ayat (1) huruf a.
 * 2%: rent / use of assets other than land & buildings, and technical, management, construction,
 * consulting and other services (PMK 141/2015 list), Pasal 23 ayat (1) huruf c.
 */
const PPH23_OPTIONS = [
    { key: "dividend", rate: 0.15 },
    { key: "interest", rate: 0.15 },
    { key: "royalty", rate: 0.15 },
    { key: "prize", rate: 0.15 },
    { key: "rent", rate: 0.02 },
    { key: "services", rate: 0.02 },
];
/** Recipient without NPWP: rate is 100% higher. UU PPh Pasal 23 ayat (1a). */
const PPH23_NO_NPWP_MULTIPLIER = 2;
/** amount = gross amount (excluding PPN). */
function pph23(input) {
    const amount = rp(input.amount);
    const base = PPH23_OPTIONS.find((o) => o.key === input.kind)?.rate ?? 0;
    const rate = input.hasNpwp ? base : base * PPH23_NO_NPWP_MULTIPLIER;
    const tax = applyRate(amount, rate);
    return { rate, tax, net: amount - tax };
}
/**
 * - land_building_rent 10%: PP 34/2017 Pasal 4 (base = gross rent incl. service charges).
 * - land_building_transfer 2.5%, simple_housing_transfer 1% (rumah/rusun sederhana by a
 *   developer whose main business is property), land_transfer_to_government 0%: PP 34/2016 Pasal 2.
 *   Base = higher of deed value and NJOP.
 * - construction_*: PP 9/2022 Pasal 3 (KOP 28-409-22 ... 28-409-28):
 *   work, small-qualification business cert or individual competency cert 1.75%;
 *   work without cert 4%; work by other (medium/large) certified providers 2.65%;
 *   integrated work certified 2.65% / uncertified 4%;
 *   consulting certified 3.5% / uncertified 6%. Base = contract value excl. PPN.
 * - deposit_interest 20%: PP 131/2000, PMK 212/2018 (balances up to Rp7.5m are not withheld).
 * - dividend_individual 10%: UU PPh Pasal 17 ayat (2c) / Pasal 4 ayat (2); exempt if
 *   reinvested in Indonesia for 3 years (UU 11/2020 as amended, PMK 18/2021).
 * - lottery_prize 25%: PP 132/2000.
 */
const PPH42_OPTIONS = [
    { key: "land_building_rent", rate: 0.1 },
    { key: "land_building_transfer", rate: 0.025 },
    { key: "simple_housing_transfer", rate: 0.01 },
    { key: "land_transfer_to_government", rate: 0 },
    { key: "construction_work_small_certified", rate: 0.0175 },
    { key: "construction_work_uncertified", rate: 0.04 },
    { key: "construction_work_other", rate: 0.0265 },
    { key: "integrated_construction_certified", rate: 0.0265 },
    { key: "integrated_construction_uncertified", rate: 0.04 },
    { key: "construction_consulting_certified", rate: 0.035 },
    { key: "construction_consulting_uncertified", rate: 0.06 },
    { key: "deposit_interest", rate: 0.2 },
    { key: "dividend_individual", rate: 0.1 },
    { key: "lottery_prize", rate: 0.25 },
];
/** Deposit/savings balances not exceeding this are not withheld. PMK 212/2018 Pasal 7. */
const DEPOSIT_INTEREST_EXEMPT_BALANCE = 7500000;
function pph42(input) {
    const amount = rp(input.amount);
    const rate = PPH42_OPTIONS.find((o) => o.key === input.kind)?.rate ?? 0;
    const tax = applyRate(amount, rate);
    return { rate, tax, net: amount - tax };
}
// ---------------------------------------------------------------------------
// PPN: UU PPN Pasal 7 ayat (1) (12% from 1 Jan 2025, UU HPP) and PMK 131/2024
// ---------------------------------------------------------------------------
/** PPN rate since 1 Jan 2025. UU PPN Pasal 7 ayat (1) huruf b as amended by UU HPP. */
const PPN_RATE = 0.12;
/** Non-luxury goods/services: DPP = 11/12 x selling price (DPP nilai lain). PMK 131/2024 Pasal 3. */
const PPN_DPP_FACTOR_NORMAL = 11 / 12;
/** Luxury goods (subject to PPnBM): DPP = full selling/import value. PMK 131/2024 Pasal 2. */
const PPN_DPP_FACTOR_LUXURY = 1;
/** Resulting effective rates: 11% normal, 12% luxury. */
const PPN_EFFECTIVE_RATE_NORMAL = 0.11;
const PPN_EFFECTIVE_RATE_LUXURY = 0.12;
/**
 * PPN from a price excluding PPN (includesPpn=false) or a total including PPN (true).
 * DPP and PPN are rounded to the nearest rupiah. When back-calculating from a total, the
 * price is total / (1 + effective rate) and PPN = total - price, so the total is preserved.
 * PPnBM itself (10%-95%, by item) is NOT computed here.
 */
function ppn(input) {
    const amount = rp(input.amount);
    const dppFactor = input.luxury ? PPN_DPP_FACTOR_LUXURY : PPN_DPP_FACTOR_NORMAL;
    const effectiveRate = input.luxury ? PPN_EFFECTIVE_RATE_LUXURY : PPN_EFFECTIVE_RATE_NORMAL;
    // dpp = price * 11/12 (or *1); ppn = dpp * 12% -> integer arithmetic on twelfths.
    const num = input.luxury ? 12 : 11;
    if (!input.includesPpn) {
        const price = amount;
        const dpp = Math.round((price * num) / 12);
        const tax = Math.round((dpp * 12) / 100);
        return { price, dpp, ppn: tax, total: price + tax, rate: PPN_RATE, dppFactor, effectiveRate };
    }
    const total = amount;
    const price = Math.round((total * 100) / (100 + num)); // 111 or 112
    const dpp = Math.round((price * num) / 12);
    return { price, dpp, ppn: total - price, total, rate: PPN_RATE, dppFactor, effectiveRate };
}

return { PTKP_SELF, PTKP_MARRIED, PTKP_PER_DEPENDENT, PTKP_MAX_DEPENDENTS, JOB_COST_RATE, JOB_COST_MAX_ANNUAL, JOB_COST_MAX_MONTHLY, PPH17_BRACKETS, PKP_ROUNDING, PTKP_STATUSES, ptkpStatus, ptkpAmount, pph17Progressive, pph21Annual, TER_CATEGORY_BY_STATUS, TER_MONTHLY, pph21Ter, UMKM_FINAL_RATE, UMKM_TURNOVER_LIMIT, UMKM_INDIVIDUAL_EXEMPT_TURNOVER, UMKM_TAXPAYER_TYPES, pphFinalUmkm, PPH23_OPTIONS, PPH23_NO_NPWP_MULTIPLIER, pph23, PPH42_OPTIONS, DEPOSIT_INTEREST_EXEMPT_BALANCE, pph42, PPN_RATE, PPN_DPP_FACTOR_NORMAL, PPN_DPP_FACTOR_LUXURY, PPN_EFFECTIVE_RATE_NORMAL, PPN_EFFECTIVE_RATE_LUXURY, ppn };
})();
