import { describe, expect, it } from 'vitest'
import { validateRemessa, findBanksByCompe, ACBR_BANKS } from './index'
import { remessa240Bradesco, remessa240VortxUnsupported, remessa400Bradesco } from './fixtures'

describe('catálogo ACBr', () => {
  it('tem bancos com COMPE', () => {
    expect(ACBR_BANKS.length).toBeGreaterThan(40)
    expect(findBanksByCompe('237').some((b) => b.id === 'cobBradesco')).toBe(true)
    expect(findBanksByCompe('001').length).toBeGreaterThan(0)
  })

  it('marca Sofisa/Vortx/Votorantim sem c240', () => {
    const sofisa = findBanksByCompe('637').find((b) => b.id === 'cobBancoSofisa')
    expect(sofisa?.layouts).toEqual(['c400'])
    expect(findBanksByCompe('310')[0]?.layouts).toEqual(['c400'])
    expect(findBanksByCompe('655')[0]?.layouts).toEqual(['c400'])
  })
})

describe('validateRemessa CNAB400', () => {
  it('aceita remessa Bradesco 400 válida', () => {
    const result = validateRemessa(remessa400Bradesco())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('237')
    expect(result.summary.titleEstimate).toBeGreaterThanOrEqual(1)
    expect(result.ok).toBe(true)
  })

  it('erro se sem detalhe', () => {
    const lines = remessa400Bradesco().split('\n')
    const onlyHeaderTrailer = [lines[0], lines[lines.length - 1]].join('\n')
    const result = validateRemessa(onlyHeaderTrailer)
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.code === 'D400_EMPTY')).toBe(true)
  })
})

describe('validateRemessa CNAB240', () => {
  it('aceita remessa Bradesco 240 válida', () => {
    const result = validateRemessa(remessa240Bradesco())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('237')
    expect(result.summary.titleEstimate).toBe(1)
    expect(result.ok).toBe(true)
  })

  it('erro layout não suportado Vórtx em 240', () => {
    const result = validateRemessa(remessa240VortxUnsupported())
    expect(result.summary.layout).toBe('c240')
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.code === 'LAYOUT_UNSUPPORTED')).toBe(true)
  })
})

describe('detecção', () => {
  it('rejeita arquivo vazio', () => {
    const result = validateRemessa('   ')
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.code === 'EMPTY')).toBe(true)
  })

  it('detecta mismatch de COMPE esperado', () => {
    const result = validateRemessa(remessa400Bradesco(), { expectedCompe: '341' })
    expect(result.ok).toBe(false)
    expect(result.issues.some((i) => i.code === 'BANK_MISMATCH')).toBe(true)
  })
})
