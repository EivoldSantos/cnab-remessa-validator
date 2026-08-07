# Phase 1: Base confiável - Context

**Gathered:** 2026-08-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Tornar o motor CNAB **confiável e verificável**: eliminar silêncio quando linhas/registros não têm spec, suportar CNAB240 multi-lote com contadores corretos por lote, adicionar testes unitários nos módulos core (`detect`, `parse-240`, `parse-400`, `validate-shared`) e pipeline CI (GitHub Actions).

Fora desta fase: expansão de specs bancárias (Fase 2), UX operacional (Fase 4), performance/UI (Fase 5).

</domain>

<decisions>
## Implementation Decisions

### Linha sem spec (BUG-02)

- **D-01:** Severidade **warning** — arquivo pode ser parcialmente válido; operador decide se prossegue
- **D-02:** Dois issue codes distintos: `UNKNOWN_RECORD` quando `classifyLine()` falha; `NO_SPEC` quando spec não existe no registry — **Reversibility:** costly — códigos propagam para testes, UI e debug JSON
- **D-03:** Issue aparece **tanto** na tabela de issues quanto em `lineDetails` (entrada sintética com label indicando registro não validado)
- **D-04:** Emitir issues de linha sem spec **somente** em níveis **B** e **AB** — nível A estrutural já valida tipos de registro

### CNAB240 multi-lote (BUG-03)

- **D-05:** Modelar lotes como **`Parsed240.lotes[]`**, cada item com `{ headerLote, details, trailerLote }` — **Reversibility:** one-way — altera shape do parser consumido por validate/validate-retorno
- **D-06:** Validar **contadores por lote** (trailer de lote vs detalhes daquele lote), não só totais globais do arquivo
- **D-07:** Multi-lote aplica-se a **remessa e retorno** (mesmo parser/refatoração)
- **D-08:** Expor helper **`getPrimaryLote(parsed)`** (ou equivalente) para compatibilidade com consumidores que hoje usam `headerLote`/`trailerLote` singulares — evitar breaking change amplo

### Testes core (TEST-01)

- **D-09:** Escopo = casos documentados em CONCERNS **+** fixtures multi-lote novas
- **D-10:** **Unitários diretos** (`detect.test.ts`, `parse-240.test.ts`, `parse-400.test.ts`, `validate-shared.test.ts`) **+** pelo menos **1 teste de integração** multi-lote via `validateRemessa`/`validateRetorno`
- **D-11:** Novas fixtures em **`src/lib/cnab/fixtures.ts`** — ex.: `remessa240MultiLote()`, `retorno240MultiLote()`
- **D-12:** Labels de teste em **português** (manter padrão existente)
- **D-13:** Testes multi-lote **espelham remessa e retorno** explicitamente
- **D-14:** **`validate-line.test.ts`** cobre emissão de `UNKNOWN_RECORD` / `NO_SPEC`
- **D-15:** **`detect.test.ts`** prioriza bordas de comprimento (239, 241, 399, 401) e detecção dominante
- **D-16:** **`validate-shared.test.ts`** com cobertura **ampla** (não só KIND_MISMATCH)

### Pipeline CI (INFRA-01) — não discutido; defaults do orchestrador

- **D-17:** GitHub Actions em **push** e **pull_request** para branch `main`
- **D-18:** Jobs: `npm test`, `npm run build`; `npm audit` roda mas **não bloqueia** merge (continue-on-error)

### Claude's Discretion

- Naming exato dos issue codes e campos em `lineDetails` sintéticos (desde que `UNKNOWN_RECORD` / `NO_SPEC` sejam estáveis)
- Estrutura interna de `Parsed240Lote` (nomes de propriedades além do contrato mínimo)
- Detalhes do workflow YAML (cache npm, matrix Node version — usar LTS atual do projeto)
- Ordem de implementação dentro da fase (parser antes de validate, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope
- `.planning/ROADMAP.md` § Phase 1 — goal, requirements (BUG-02, BUG-03, TEST-01, INFRA-01), success criteria
- `.planning/REQUIREMENTS.md` — REQ definitions and traceability

### Project context
- `.planning/PROJECT.md` — core value, validated vs active requirements
- `.planning/codebase/CONCERNS.md` — bugs conhecidos (silêncio, multi-lote, gaps de teste)
- `.planning/codebase/ARCHITECTURE.md` — camadas do motor, fluxo de validação
- `.planning/codebase/TESTING.md` — padrões Vitest, fixtures, convenções de asserção

### Implementation targets
- `src/lib/cnab/validate-line.ts` — retorno silencioso `null` (BUG-02)
- `src/lib/cnab/parse-240.ts` — single-lote overwrite (BUG-03)
- `src/lib/cnab/detect.ts`, `src/lib/cnab/validate-shared.ts` — alvos TEST-01
- `src/lib/cnab/fixtures.ts` — extensão de factories de teste

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/cnab/fixtures.ts` — `buildLine240`, `buildLine400`, factories por banco
- `src/lib/cnab/validate-line.test.ts` — padrão existente para testes de linha

### Established Patterns
- Issues identificados por **`code` estável** (`F400_*`, `D240_*`), não por mensagem
- Validadores retornam issues, **nunca throw**
- Testes co-localizados `*.test.ts`, labels em português, sem mocks

### Integration Points
- `validate.ts` / `validate-retorno.ts` — consomem `parse240()` e contadores estruturais
- `validation-report.tsx` — renderiza `issues` + `lineDetails`
- Nenhum CI existente — criar `.github/workflows/ci.yml` do zero

</code_context>

<specifics>
## Specific Ideas

- Operador prefere **warnings** para linhas sem spec
- Multi-lote deve funcionar **igualmente** para remessa e retorno
- Testes devem cobrir **bordas de detect** documentadas em CONCERNS

</specifics>

<deferred>
## Deferred Ideas

- **BUG-05** parser CNAB400 trailer overwrite — Fase 4
- **LEVEL_B_PARTIAL** aviso — Fase 2

</deferred>

---

*Phase: 01-Base confiável*
*Context gathered: 2026-08-07*
