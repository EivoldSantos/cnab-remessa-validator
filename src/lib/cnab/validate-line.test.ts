import { describe, expect, it } from 'vitest'
import { splitLines } from './detect'
import { validateFileLines } from './validate-line'
import { remessa240BB, remessa240Bradesco, remessa240Caixa, remessa240CaixaSicob, remessa240Itau, remessa240Santander, remessa240Sicoob, remessa240Sicredi, remessa400BB, remessa400Bradesco, remessa400Caixa, remessa400CaixaSicob, remessa400Itau, remessa400Santander, remessa400Sicoob, remessa400Sicredi } from './fixtures'

describe('validate-line', () => {
  it('valida header, detalhe e trailer CNAB400 da fixture Bradesco', () => {
    const lines = splitLines(remessa400Bradesco())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobBradesco',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Bradesco CNAB400')
    expect(lineDetails[2]?.recordLabel).toBe('Trailer CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida header, detalhe e trailer CNAB400 da fixture Itaú', () => {
    const lines = splitLines(remessa400Itau())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobItau',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header Itaú CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Itaú CNAB400')
    expect(lineDetails[2]?.recordLabel).toBe('Trailer CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos P/Q CNAB240 da fixture Itaú', () => {
    const lines = splitLines(remessa240Itau())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobItau',
    })
    expect(lineDetails.length).toBe(6)
    expect(lineDetails[2]?.recordLabel).toBe('Segmento P Itaú')
    expect(lineDetails[3]?.recordLabel).toBe('Segmento Q Itaú')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })
  it('valida header, detalhe e trailer CNAB400 da fixture BB', () => {
    const lines = splitLines(remessa400BB())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobBancoDoBrasil',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header BB CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe BB CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos P/Q CNAB240 da fixture BB', () => {
    const lines = splitLines(remessa240BB())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobBancoDoBrasil',
    })
    expect(lineDetails.length).toBe(6)
    expect(lineDetails[0]?.recordLabel).toBe('Header arquivo BB CNAB240')
    expect(lineDetails[2]?.recordLabel).toBe('Segmento P BB')
    expect(lineDetails[3]?.recordLabel).toBe('Segmento Q BB')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida header, detalhe e trailer CNAB400 da fixture Santander', () => {
    const lines = splitLines(remessa400Santander())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobSantander',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header Santander CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Santander CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos P/Q CNAB240 da fixture Santander', () => {
    const lines = splitLines(remessa240Santander())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobSantander',
    })
    expect(lineDetails.length).toBe(6)
    expect(lineDetails[0]?.recordLabel).toBe('Header arquivo Santander CNAB240')
    expect(lineDetails[2]?.recordLabel).toBe('Segmento P Santander')
    expect(lineDetails[3]?.recordLabel).toBe('Segmento Q Santander')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida header, detalhe e trailer CNAB400 da fixture Caixa', () => {
    const lines = splitLines(remessa400Caixa())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobCaixaEconomica',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header Caixa CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Caixa CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos P/Q CNAB240 da fixture Caixa', () => {
    const lines = splitLines(remessa240Caixa())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobCaixaEconomica',
    })
    expect(lineDetails.length).toBe(6)
    expect(lineDetails[0]?.recordLabel).toBe('Header arquivo Caixa CNAB240')
    expect(lineDetails[2]?.recordLabel).toBe('Segmento P Caixa')
    expect(lineDetails[3]?.recordLabel).toBe('Segmento Q Caixa')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida header, detalhe e trailer CNAB400 da fixture Sicredi', () => {
    const lines = splitLines(remessa400Sicredi())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobSicred',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header Sicredi CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Sicredi CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos CNAB240 da fixture Sicredi (FEBRABAN)', () => {
    const lines = splitLines(remessa240Sicredi())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobSicred',
    })
    expect(lineDetails.length).toBe(6)
    expect(lineDetails[0]?.recordLabel).toBe('Header arquivo CNAB240')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida header, detalhe e trailer CNAB400 da fixture Sicoob', () => {
    const lines = splitLines(remessa400Sicoob())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobBancoSicoob',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header Sicoob CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Sicoob CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos CNAB240 da fixture Sicoob (FEBRABAN)', () => {
    const lines = splitLines(remessa240Sicoob())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobBancoSicoob',
    })
    expect(lineDetails.length).toBe(6)
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida header, detalhe e trailer CNAB400 da fixture Caixa SICOB', () => {
    const lines = splitLines(remessa400CaixaSicob())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobCaixaSicob',
    })
    expect(lineDetails.length).toBe(3)
    expect(lineDetails[0]?.recordLabel).toBe('Header Caixa SICOB CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Detalhe Caixa SICOB CNAB400')
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('valida segmentos CNAB240 da fixture Caixa SICOB (FEBRABAN)', () => {
    const lines = splitLines(remessa240CaixaSicob())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c240',
      bankId: 'cobCaixaSicob',
    })
    expect(lineDetails.length).toBe(6)
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0)
  })

  it('detecta tipo arquivo inválido no header', () => {
    const content = remessa400Bradesco()
    const mutated = '02' + content.slice(2)
    const lines = splitLines(mutated)
    const { issues } = validateFileLines(lines, { layout: 'c400', bankId: 'cobBradesco' })
    expect(issues.some((i) => i.code === 'F400_HDR_TIPO_ARQ')).toBe(true)
  })
})

describe('validateRemessa nível B', () => {
  it('integra validação AB na remessa 400', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400Bradesco(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.summary.fieldsValidated).toBeGreaterThan(30)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240Bradesco(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 Itaú', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240Itau(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 Itaú', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400Itau(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 BB', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400BB(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 BB', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240BB(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 Santander', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400Santander(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 Santander', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240Santander(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 Caixa', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400Caixa(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 Caixa', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240Caixa(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 Sicredi', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400Sicredi(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 Sicredi', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240Sicredi(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 Sicoob', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400Sicoob(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 Sicoob', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240Sicoob(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 400 Caixa SICOB', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa400CaixaSicob(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(3)
    expect(result.ok).toBe(true)
  })

  it('integra validação AB na remessa 240 Caixa SICOB', async () => {
    const { validateRemessa } = await import('./validate')
    const result = validateRemessa(remessa240CaixaSicob(), { level: 'AB' })
    expect(result.lineDetails?.length).toBe(6)
    expect(result.ok).toBe(true)
  })

  it('nível A ignora validação de campos', async () => {
    const { validateRemessa } = await import('./validate')
    const content = remessa400Bradesco()
    const mutated = '02' + content.slice(2)
    const resultA = validateRemessa(mutated, { level: 'A' })
    const resultB = validateRemessa(mutated, { level: 'AB' })
    expect(resultA.issues.some((i) => i.code === 'F400_HDR_TIPO_ARQ')).toBe(false)
    expect(resultB.issues.some((i) => i.code === 'F400_HDR_TIPO_ARQ')).toBe(true)
  })
})
