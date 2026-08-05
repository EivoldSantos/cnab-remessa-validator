import { describe, expect, it } from 'vitest'
import { validateRemessa, findBanksByCompe, ACBR_BANKS } from './index'
import { remessa240BB, remessa240Bradesco, remessa240Caixa, remessa240CaixaSicob, remessa240Itau, remessa240Santander, remessa240Sicoob, remessa240Sicredi, remessa240VortxUnsupported, remessa400BB, remessa400Bradesco, remessa400Caixa, remessa400CaixaSicob, remessa400Itau, remessa400Santander, remessa400Sicoob, remessa400Sicredi } from './fixtures'

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

  it('aceita remessa Itaú 240 válida', () => {
    const result = validateRemessa(remessa240Itau())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('341')
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

describe('validateRemessa CNAB400 Santander', () => {
  it('aceita remessa Santander 400 válida', () => {
    const result = validateRemessa(remessa400Santander())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('033')
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB240 Santander', () => {
  it('aceita remessa Santander 240 válida', () => {
    const result = validateRemessa(remessa240Santander())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('033')
    expect(result.summary.titleEstimate).toBe(1)
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB400 Sicredi', () => {
  it('aceita remessa Sicredi 400 válida', () => {
    const result = validateRemessa(remessa400Sicredi())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('748')
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB240 Sicredi', () => {
  it('aceita remessa Sicredi 240 válida (FEBRABAN)', () => {
    const result = validateRemessa(remessa240Sicredi())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('748')
    expect(result.summary.titleEstimate).toBe(1)
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB400 Sicoob', () => {
  it('aceita remessa Sicoob 400 válida', () => {
    const result = validateRemessa(remessa400Sicoob())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('756')
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB240 Sicoob', () => {
  it('aceita remessa Sicoob 240 válida (FEBRABAN)', () => {
    const result = validateRemessa(remessa240Sicoob())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('756')
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB400 Caixa', () => {
  it('aceita remessa Caixa 400 válida', () => {
    const result = validateRemessa(remessa400Caixa())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('104')
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB240 Caixa', () => {
  it('aceita remessa Caixa 240 válida', () => {
    const result = validateRemessa(remessa240Caixa())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('104')
    expect(result.summary.titleEstimate).toBe(1)
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB400 BB', () => {
  it('aceita remessa BB 400 válida', () => {
    const result = validateRemessa(remessa400BB())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('001')
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB240 BB', () => {
  it('aceita remessa BB 240 válida', () => {
    const result = validateRemessa(remessa240BB())
    expect(result.summary.layout).toBe('c240')
    expect(result.summary.bankCode).toBe('001')
    expect(result.summary.titleEstimate).toBe(1)
    expect(result.ok).toBe(true)
  })
})

describe('validateRemessa CNAB400 Itaú', () => {
  it('aceita remessa Itaú 400 válida', () => {
    const result = validateRemessa(remessa400Itau())
    expect(result.summary.layout).toBe('c400')
    expect(result.summary.bankCode).toBe('341')
    expect(result.summary.titleEstimate).toBeGreaterThanOrEqual(1)
    expect(result.ok).toBe(true)
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
