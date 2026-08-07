# Plano 01-01 — SUMMARY

**Status:** complete
**Commit:** (wave 1)

## O que foi feito

- `validateLine` deixa de retornar `null` silenciosamente
- Emite warning `UNKNOWN_RECORD` quando `classifyLine()` falha
- Emite warning `NO_SPEC` quando spec não existe no registry
- Todas as linhas aparecem em `lineDetails` com label sintético quando aplicável
- Testes em português cobrindo ambos os códigos e nível A sem warnings

## Self-Check: PASSED

- [x] npm test -- validate-line
- [x] validate-line.ts contém UNKNOWN_RECORD e NO_SPEC

## key-files.created

- src/lib/cnab/validate-line.ts
- src/lib/cnab/validate-line.test.ts
