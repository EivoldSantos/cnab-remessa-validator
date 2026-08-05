import { describe, expect, it } from 'vitest'
import { validateRemessa, validateRetorno, getRecordSpec } from './index'
import {
  remessa240Bradesco,
  remessa400Bradesco,
  retorno240Bradesco,
  retorno240Itau,
  retorno400Bradesco,
  retorno400Itau,
} from './fixtures'

describe('validateRetorno CNAB400', () => {
  it('aceita retorno Bradesco 400 válido', () => {
    const result = validateRetorno(retorno400Bradesco())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.kind).toBe('retorno')
    expect(result.summary.bankCode).toBe('237')
    expect(result.summary.titleEstimate).toBeGreaterThanOrEqual(1)
    expect(result.ok).toBe(true)
  })

  it('aceita retorno Itaú 400 válido', () => {
    const result = validateRetorno(retorno400Itau())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('341')
    expect(result.ok).toBe(true)
  })

  it('rejeita remessa no modo retorno (KIND_MISMATCH)', () => {
    const result = validateRetorno(remessa400Bradesco())
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.code === 'KIND_MISMATCH')).toBe(true)
  })
})

describe('validateRetorno CNAB240', () => {
  it('aceita retorno Bradesco 240 válido (T/U)', () => {
    const result = validateRetorno(retorno240Bradesco())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.kind).toBe('retorno')
    expect(result.summary.bankCode).toBe('237')
    expect(result.summary.titleEstimate).toBe(1)
    expect(result.ok).toBe(true)
    expect(result.issues.some((i) => i.code === 'D240_SEGS' && i.message.includes('T='))).toBe(
      true,
    )
  })

  it('aceita retorno Itaú 240 válido', () => {
    const result = validateRetorno(retorno240Itau())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('341')
    expect(result.ok).toBe(true)
  })

  it('rejeita remessa 240 no modo retorno', () => {
    const result = validateRetorno(remessa240Bradesco())
    expect(result.ok).toBe(false)
    expect(
      result.issues.some(
        (i) => i.code === 'KIND_MISMATCH' || i.code === 'H240_NOT_RETORNO',
      ),
    ).toBe(true)
  })
})

describe('validateRemessa rejeita retorno', () => {
  it('KIND_MISMATCH ao validar retorno como remessa', () => {
    const result = validateRemessa(retorno400Bradesco())
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.code === 'KIND_MISMATCH')).toBe(true)
  })
})

describe('specs retorno nível B', () => {
  it('resolve segmento T FEBRABAN retorno', () => {
    const spec = getRecordSpec('c240', '3T', undefined, 'retorno')
    expect(spec?.id).toBe('febraban-retorno-c240-segmento-t')
  })

  it('resolve detalhe Bradesco retorno 400', () => {
    const spec = getRecordSpec('c400', '1', 'cobBradesco', 'retorno')
    expect(spec?.bankId).toBe('cobBradesco')
    expect(spec?.kind).toBe('retorno')
  })

  it('valida campos nível B no retorno 240', () => {
    const result = validateRetorno(retorno240Bradesco(), { level: 'AB' })
    expect(result.lineDetails?.length).toBeGreaterThan(0)
    expect(result.summary.fieldsValidated).toBeGreaterThan(0)
  })
})
