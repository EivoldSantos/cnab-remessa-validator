# Validador CNAB Remessa

Validação **estrutural (nível A)** de arquivos de remessa CNAB240 e CNAB400, com catálogo dos bancos do **ACBrBoleto**.

## Rodar

```bash
npm install
npm run dev
```

Testes:

```bash
npm test
```

Build:

```bash
npm run build
```

## O que valida (nível A + B parcial)

### Nível A — estrutural
- Detecção automática CNAB240 / CNAB400 (tamanho de linha)
- Banco pelo código COMPE no header
- Header / trailer / segmentos (P, Q, R…)
- Sequenciais e contagens (warnings se banco zera campos)
- Catálogo ACBr: layout suportado por banco

### Nível B — linha a linha (Fase 0)
- `field-engine` + `spec-registry` + `validate-line`
- Specs FEBRABAN: **header 400** e **trailer 400**
- Parse e validação campo a campo (tipo, enum, data, sequencial)
- UI: tabela de campos por linha + coluna campo nos issues
- Default: `level: 'AB'` (use `{ level: 'A' }` só estrutural)

Próximo: detalhe 400 Bradesco + segmentos 240 (ver pasta `sdd/` local).

Arquivo processado **só no navegador** (sem upload).

## O que NÃO valida

- Campos posição-a-posição do manual de cada banco
- DV nosso número / código de barras
- Arquivo de retorno

## Stack

Vite + React + TypeScript + shadcn/ui + Vitest

Motor em `src/lib/cnab/` — usável no browser e em Node.

## Bancos (catálogo ACBr)

Entradas derivadas de `TACBrTipoCobranca` / `SetTipoCobranca` do ACBr. Exemplos:

| COMPE | Banco | Layouts |
|------:|-------|---------|
| 001 | Banco do Brasil | 400, 240 |
| 033 | Santander | 400, 240 |
| 104 | Caixa | 400, 240 |
| 237 | Bradesco | 400, 240 |
| 341 | Itaú | 400, 240 |
| 748 | Sicredi | 400, 240 |
| 756 | Sicoob | 400, 240 |
| 310 | Vórtx | 400 |
| 637 | Sofisa | 400 |
| 655 | Votorantim | 400 |

Lista completa: `src/lib/cnab/banks.ts`.
