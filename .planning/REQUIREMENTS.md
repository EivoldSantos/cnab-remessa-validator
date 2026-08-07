# Requirements: Validador CNAB Remessa / Retorno

**Defined:** 2026-08-07
**Core Value:** Detectar erros CNAB antes do envio ao banco

## v1 Requirements

### Bug Fixes

- [x] **BUG-02**: Emitir issue quando linha/registro não possui spec
- [x] **BUG-03**: Suportar CNAB240 multi-lote em parse240() e validação estrutural

### Testing

- [x] **TEST-01**: Testes unitários para detect.ts, parse-240.ts, parse-400.ts, validate-shared.ts

### Infrastructure

- [x] **INFRA-01**: Pipeline CI (GitHub Actions) com npm test, build, audit

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BUG-02 | Phase 1 | Complete |
| BUG-03 | Phase 1 | Complete |
| TEST-01 | Phase 1 | Complete |
| INFRA-01 | Phase 1 | Complete |

---
*Requirements defined: 2026-08-07*
