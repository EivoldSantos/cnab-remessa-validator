# Plano 01-03 — SUMMARY

**Status:** complete

## O que foi feito

- `detect.test.ts` — bordas 239/241/399/401, dominante 240/400, linhas vazias
- `parse-400.test.ts` — header/detail/trailer, tipos 0/1/9
- `validate-shared.test.ts` — push, validateCommon, validateBankRules, checkKindMismatch
- `.github/workflows/ci.yml` — npm test, npm run build, npm audit (continue-on-error)

## Self-Check: PASSED

- [x] npm test (69 testes)
- [x] npm run build
- [x] CI workflow YAML válido

## key-files.created

- src/lib/cnab/detect.test.ts
- src/lib/cnab/parse-400.test.ts
- src/lib/cnab/validate-shared.test.ts
- .github/workflows/ci.yml
