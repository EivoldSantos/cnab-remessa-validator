# Validador CNAB Remessa / Retorno

Validação **estrutural (nível A)** e **campo a campo (nível B)** de arquivos CNAB240 e CNAB400 de **remessa** e **retorno**, com catálogo dos bancos do **ACBrBoleto**.

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

## O que valida (nível A + B)

### Modos
- Toggle na UI: **Remessa** | **Retorno**
- Modo explícito: arquivo do outro tipo gera `KIND_MISMATCH`

### Nível A — estrutural
- Detecção automática CNAB240 / CNAB400 (tamanho de linha)
- Banco pelo código COMPE no header
- **Remessa:** `01REMESSA` / pos.143=`1` / segmentos P/Q / operação `R`
- **Retorno:** `02RETORNO` / pos.143=`2` / segmentos T/U / operação `T`
- Header / trailer / sequenciais
- Catálogo ACBr: layout suportado por banco

### Nível B — linha a linha
- Specs FEBRABAN + overrides (Bradesco, Itaú, BB, Santander, Caixa, Sicredi, Sicoob…)
- **Retorno:** ocorrência `CodOcorrenciaToTipo` (≠ códigos de remessa)
- UI: tabela de campos por linha
- Default: `level: 'AB'`

Arquivo processado **só no navegador** (sem upload).

## O que NÃO valida

- DV nosso número / código de barras
- Baixa/conciliação contra base de títulos
- Port completo campo-a-campo de todos os `ACBrBanco*.pas`

## Stack

Vite + React + TypeScript + shadcn/ui + Vitest

Motor em `src/lib/cnab/` — usável no browser e em Node.

```ts
import { validateRemessa, validateRetorno } from '@/lib/cnab'

validateRemessa(conteudo)
validateRetorno(conteudo)
```

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
