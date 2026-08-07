import { describe, expect, it } from 'vitest'
import {
  checkKindMismatch,
  push,
  validateBankRules,
  validateCommon,
} from './validate-shared'
import type { ValidationIssue } from './types'
import { remessa400Bradesco } from './fixtures'
import { splitLines } from './detect'

describe('validate-shared', () => {
  it('push adiciona issue com linha opcional', () => {
    const issues: ValidationIssue[] = []
    push(issues, 'warning', 'TEST_CODE', 'mensagem teste', 5)
    expect(issues).toHaveLength(1)
    expect(issues[0]?.code).toBe('TEST_CODE')
    expect(issues[0]?.line).toBe(5)
  })

  it('validateCommon detecta arquivo vazio', () => {
    const issues: ValidationIssue[] = []
    validateCommon('', [], issues)
    expect(issues.some((i) => i.code === 'EMPTY')).toBe(true)
  })

  it('validateCommon detecta tamanhos mistos', () => {
    const issues: ValidationIssue[] = []
    const lines = [
      { index: 1, raw: 'a'.repeat(240), length: 240 },
      { index: 2, raw: 'b'.repeat(400), length: 400 },
    ]
    validateCommon('content', lines, issues)
    expect(issues.some((i) => i.code === 'MIXED_LENGTH')).toBe(true)
  })

  it('validateBankRules avisa banco desconhecido', () => {
    const issues: ValidationIssue[] = []
    const result = validateBankRules(null, 'c400', issues)
    expect(issues.some((i) => i.code === 'BANK_UNKNOWN')).toBe(true)
    expect(result.bankIds).toHaveLength(0)
  })

  it('validateBankRules encontra Bradesco 237', () => {
    const issues: ValidationIssue[] = []
    const result = validateBankRules('237', 'c400', issues)
    expect(result.bankIds).toContain('cobBradesco')
    expect(issues.some((i) => i.code === 'BANK_MATCH')).toBe(true)
  })

  it('validateBankRules detecta COMPE esperado diferente', () => {
    const issues: ValidationIssue[] = []
    validateBankRules('237', 'c400', issues, { expectedCompe: '001' })
    expect(issues.some((i) => i.code === 'BANK_MISMATCH')).toBe(true)
  })

  it('checkKindMismatch emite KIND_MISMATCH', () => {
    const issues: ValidationIssue[] = []
    const mismatch = checkKindMismatch('retorno', 'remessa', issues)
    expect(mismatch).toBe(true)
    expect(issues.some((i) => i.code === 'KIND_MISMATCH')).toBe(true)
  })

  it('checkKindMismatch passa quando kind coincide', () => {
    const issues: ValidationIssue[] = []
    const mismatch = checkKindMismatch('remessa', 'remessa', issues)
    expect(mismatch).toBe(false)
    expect(issues).toHaveLength(0)
  })

  it('validateCommon aceita remessa 400 válida sem erros estruturais', () => {
    const issues: ValidationIssue[] = []
    const lines = splitLines(remessa400Bradesco())
    validateCommon(remessa400Bradesco(), lines, issues)
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })
})
