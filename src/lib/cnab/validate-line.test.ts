import { describe, expect, it } from 'vitest'
import { splitLines } from './detect'
import { validateFileLines } from './validate-line'
import { remessa240Bradesco, remessa240BB, remessa240Itau, remessa400BB, remessa400Bradesco, remessa400Itau } from './fixtures'

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
