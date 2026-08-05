import { describe, expect, it } from 'vitest'
import { ACBR_BANKS } from './banks'
import { getRecordSpec, resolveCanonicalBankId } from './spec-registry'
import type { CnabLayout } from './types'

const C400_RECORD_TYPES = ['0', '1', '9'] as const
const C240_RECORD_TYPES = ['0000-0', '0001-1', '3P', '3Q', '0001-5', '9999-9'] as const

function recordTypesForLayout(layout: CnabLayout): readonly string[] {
  return layout === 'c400' ? C400_RECORD_TYPES : C240_RECORD_TYPES
}

describe('layout-coverage', () => {
  it('cada banco ACBr resolve specs para registros-chave de remessa', () => {
    const missing: string[] = []

    for (const bank of ACBR_BANKS) {
      for (const layout of bank.layouts) {
        const bankId = resolveCanonicalBankId(bank.id) ?? bank.id
        for (const recordType of recordTypesForLayout(layout)) {
          const spec = getRecordSpec(layout, recordType, bankId)
          if (!spec) {
            missing.push(`${bank.id}/${layout}/${recordType}`)
          }
        }
      }
    }

    expect(missing, `Specs ausentes: ${missing.join(', ')}`).toEqual([])
  })

  it('aliases compartilham layout canônico', () => {
    expect(resolveCanonicalBankId('cobBradescoSICOOB')).toBe('cobBradesco')
    expect(resolveCanonicalBankId('cobBancoob')).toBe('cobBancoSicoob')
    expect(resolveCanonicalBankId('cobBancoSofisaSantander')).toBe('cobSantander')
    expect(resolveCanonicalBankId('cobMoneyPlus')).toBe('cobBradesco')
  })

  it('bancos sem layout próprio usam FEBRABAN genérico', () => {
    const spec = getRecordSpec('c400', '1', 'cobBanrisul')
    expect(spec?.id).toBe('febraban-c400-detalhe-1')
    expect(spec?.bankId).toBeUndefined()
  })
})
