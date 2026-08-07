# Validador CNAB Remessa / Retorno

## What This Is

Validador web **100% client-side** de arquivos CNAB240 e CNAB400 de **remessa** e **retorno** bancário, com catálogo ACBrBoleto.

## Core Value

Detectar erros estruturais e de campo em arquivos CNAB **antes do envio ao banco**, com feedback claro por linha e campo.

## Requirements

### Validated

- ✓ Detecção CNAB240/400, nível A+B, remessa/retorno, catálogo ACBr, UI client-side — existing

### Active

- [ ] Base confiável: bugs silenciosos, multi-lote, testes core, CI

### Out of Scope

- DV nosso número, conciliação, backend/upload

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Spec-driven Level B | Manutenibilidade | ✓ Good |
| Client-side only | Privacidade | ✓ Good |

---
*Last updated: 2026-08-07 after initialization*
