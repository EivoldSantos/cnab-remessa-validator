import { describe, expect, it } from 'vitest'
import { extractFields, validateFields } from './field-engine'
import { FEBRABAN_C400_HEADER_0 } from './specs/febraban/c400'

describe('field-engine', () => {
  it('extrai campos do header 400', () => {
    const line = '0'.padEnd(400, ' ')
    line.split('')
    const sample =
      '0' +
      '1' +
      'REMESSA' +
      '01' +
      'COBRANCA       ' +
      '0'.repeat(20) +
      'EMPRESA'.padEnd(30) +
      '237' +
      'BRADESCO'.padEnd(15) +
      '010825' +
      ' '.repeat(7) +
      '000' +
      '0000001' +
      ' '.repeat(277) +
      '000001'

    const padded = sample.padEnd(400, ' ').slice(0, 400)
    const fields = extractFields(padded, FEBRABAN_C400_HEADER_0)
    expect(fields.find((f) => f.id === 'tipo_registro')?.value).toBe('0')
    expect(fields.find((f) => f.id === 'literal_remessa')?.value).toBe('REMESSA')
    expect(fields.find((f) => f.id === 'codigo_banco')?.value).toBe('237')
  })

  it('rejeita data inválida', () => {
    const fields = extractFields('x'.repeat(400), FEBRABAN_C400_HEADER_0)
    const dataField = fields.find((f) => f.id === 'data_geracao')!
    dataField.value = '320825'
    dataField.raw = '320825'

    const issues = validateFields(fields, FEBRABAN_C400_HEADER_0, {
      lineIndex: 1,
      layout: 'c400',
      lineCount: 1,
      recordType: '0',
    })
    expect(issues.some((i) => i.field === 'data_geracao')).toBe(true)
  })

  it('rejeita enum inválido', () => {
    const line =
      '2' +
      '1REMESSA01COBRANCA'.padEnd(400).slice(1)
    const padded = line.slice(0, 400).padEnd(400, ' ')
    const fields = extractFields(padded, FEBRABAN_C400_HEADER_0)
    const issues = validateFields(fields, FEBRABAN_C400_HEADER_0, {
      lineIndex: 1,
      layout: 'c400',
      recordType: '0',
    })
    expect(issues.some((i) => i.code === 'F400_HDR_TIPO_REG')).toBe(true)
  })
})
