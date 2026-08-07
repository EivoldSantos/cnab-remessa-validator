# Roadmap: Validador CNAB Remessa / Retorno

## Phases

- [x] **Phase 1: Base confiável** - Bugs críticos, testes core, CI (completed 2026-08-07)
- [ ] **Phase 2: Specs bancos prioritários**
- [ ] **Phase 3: Bradesco 240 e retorno avançado**
- [ ] **Phase 4: UX operacional**
- [ ] **Phase 5: Performance e polish**

## Phase Details

### Phase 1: Base confiável

**Mode:** mvp
**Goal**: Motor sem silêncio + multi-lote + testes core + CI.
**Depends on**: Nothing
**Requirements**: BUG-02, BUG-03, TEST-01, INFRA-01
**Success Criteria**:

  1. Issue explícito quando linha não possui spec
  2. CNAB240 multi-lote parseado e validado com contadores corretos
  3. CI verde com test, build, audit
  4. Testes unitários para detect/parse/validate-shared

**Plans**: 3/3 plans executed

- [x] 01-01-PLAN.md — Tracer: linha sem spec emite warning (BUG-02)
- [x] 01-02-PLAN.md — Multi-lote CNAB240 remessa e retorno (BUG-03)
- [x] 01-03-PLAN.md — Testes ampliados + CI GitHub Actions (TEST-01, INFRA-01)
