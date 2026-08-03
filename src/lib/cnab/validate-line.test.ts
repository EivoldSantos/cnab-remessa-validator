import { describe, expect, it } from 'vitest'
import { splitLines } from './detect'
import { validateFileLines } from './validate-line'
import { remessa400Bradesco } from './fixtures'

describe('validate-line', () => {
  it('valida header e trailer CNAB400 da fixture Bradesco', () => {
    const lines = splitLines(remessa400Bradesco())
    const { issues, lineDetails } = validateFileLines(lines, {
      layout: 'c400',
      bankId: 'cobBradesco',
    })
    expect(lineDetails.length).toBe(2)
    expect(lineDetails[0]?.recordLabel).toBe('Header CNAB400')
    expect(lineDetails[1]?.recordLabel).toBe('Trailer CNAB400')
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
    expect(result.lineDetails?.length).toBe(2)
    expect(result.summary.fieldsValidated).toBeGreaterThan(0)
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
