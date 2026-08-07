# Plano 01-02 — SUMMARY

**Status:** complete

## O que foi feito

- `Parsed240.lotes[]` com `{ headerLote, details, trailerLote }`
- `getPrimaryLote()` exportado para compatibilidade legada
- `validate240` / `validate240Retorno` validam contadores T240_LOTE_COUNT por lote
- Fixtures `remessa240MultiLote()` e `retorno240MultiLote()`
- `parse-240.test.ts` com casos single e multi-lote

## Self-Check: PASSED

- [x] npm test
- [x] parse-240.ts contém lotes[] e getPrimaryLote

## key-files.created

- src/lib/cnab/parse-240.ts
- src/lib/cnab/parse-240.test.ts
- src/lib/cnab/fixtures.ts
