import { describe, expect, it } from 'vitest'
import { buildMotorDebugReport } from './motor-debug-report'
import type { ValidationResult } from './types'

describe('buildMotorDebugReport', () => {
  it('monta JSON compacto só com erros e campos inválidos', () => {
    const result: ValidationResult = {
      ok: false,
      summary: {
        layout: 'c400',
        kind: 'remessa',
        bankCode: '237',
        bankName: 'Bradesco',
        bankIds: ['cobBradesco'],
        remessaNumber: '0000001',
        lineCount: 3,
        detailCount: 1,
        titleEstimate: 1,
        fieldsValidated: 10,
        invalidFields: 1,
      },
      issues: [
        {
          severity: 'error',
          code: 'F400_OCORRENCIA',
          message: 'Ocorrência inválida',
          line: 2,
          field: 'ocorrencia',
          position: [109, 110],
          expected: '01|02',
          actual: '99',
        },
        {
          severity: 'info',
          code: 'LAYOUT',
          message: 'Layout detectado: CNAB400',
        },
      ],
      lines: [],
      preview: [],
      lineDetails: [
        {
          lineIndex: 2,
          recordType: '1',
          recordLabel: 'Detalhe',
          fields: [
            {
              id: 'ocorrencia',
              label: 'Ocorrência',
              start: 109,
              end: 110,
              raw: '99',
              value: '99',
              valid: false,
            },
            {
              id: 'banco',
              label: 'Banco',
              start: 1,
              end: 3,
              raw: '237',
              value: '237',
              valid: true,
            },
          ],
          issues: [
            {
              severity: 'error',
              code: 'F400_OCORRENCIA',
              message: 'Ocorrência inválida',
              field: 'ocorrencia',
              position: [109, 110],
              expected: '01|02',
              actual: '99',
            },
          ],
        },
      ],
    }

    const report = buildMotorDebugReport(result, 'remessa.rem')
    expect(report.purpose).toBe('motor-interpretation-debug')
    expect(report.errors).toHaveLength(1)
    expect(report.errors[0]?.code).toBe('F400_OCORRENCIA')
    expect(report.invalidFields).toHaveLength(1)
    expect(report.invalidFields[0]?.raw).toBe('99')
    expect(report.context.bankIds).toEqual(['cobBradesco'])
  })
})
