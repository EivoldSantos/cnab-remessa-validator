import type { CnabLayout, RecordSpec } from './types'
import { FEBRABAN_SPECS } from './specs/febraban'
import { CNAB240, CNAB400, field } from './positions'

const febrabanByKey = new Map<string, RecordSpec>()
const bankByKey = new Map<string, RecordSpec>()

for (const spec of FEBRABAN_SPECS) {
  const key = specKey(spec.layout, spec.recordType)
  if (spec.bankId) {
    bankByKey.set(bankSpecKey(spec.bankId, spec.layout, spec.recordType), spec)
  } else {
    febrabanByKey.set(key, spec)
  }
}

function specKey(layout: CnabLayout, recordType: string): string {
  return `${layout}:${recordType}`
}

function bankSpecKey(bankId: string, layout: CnabLayout, recordType: string): string {
  return `${bankId}:${layout}:${recordType}`
}

/** Bancos que compartilham layout Bradesco (COMPE 237). */
const BRADESCO_LAYOUT_BANKS = new Set([
  'cobBradesco',
  'cobBradescoSICOOB',
  'cobBancoAthenaBradesco',
  'cobBicBanco',
  'cobBancoPineBradesco',
  'cobSafraBradesco',
  'cobBancoCresolSCRS',
  'cobUnicredSC',
])

/** Bancos que compartilham layout Itaú (COMPE 341). */
const ITAU_LAYOUT_BANKS = new Set(['cobItau', 'cobBancoSofisaItau'])

/** Bancos que compartilham layout Banco do Brasil (COMPE 001). */
const BB_LAYOUT_BANKS = new Set(['cobBancoDoBrasil', 'cobBancoDoBrasilSICOOB'])

function resolveBradescoBankId(bankId?: string): string | undefined {
  if (!bankId) return undefined
  if (BRADESCO_LAYOUT_BANKS.has(bankId)) return 'cobBradesco'
  return undefined
}

function resolveItauBankId(bankId?: string): string | undefined {
  if (!bankId) return undefined
  if (ITAU_LAYOUT_BANKS.has(bankId)) return 'cobItau'
  return undefined
}

function resolveBbBankId(bankId?: string): string | undefined {
  if (!bankId) return undefined
  if (BB_LAYOUT_BANKS.has(bankId)) return 'cobBancoDoBrasil'
  return undefined
}

export function classifyLine(line: string, layout: CnabLayout): string | null {
  if (line.length < 8) return null

  if (layout === 'c400') {
    const tipo = field(line, CNAB400.registro)
    if (tipo === '0') return '0'
    if (tipo === '9') return '9'
    if (tipo === '1') return '1'
    if (tipo === '2') return '2'
    if (tipo === '7') return '7'
    return tipo || null
  }

  const lote = field(line, CNAB240.lote)
  const tipo = field(line, CNAB240.tipoRegistro)

  if (tipo === '0' && lote === '0000') return '0000-0'
  if (tipo === '1') return '0001-1'
  if (tipo === '3') {
    const seg = field(line, CNAB240.segmento)
    return seg ? `3${seg}` : '3'
  }
  if (tipo === '5') return '0001-5'
  if (tipo === '9' && lote === '9999') return '9999-9'
  return `${lote}-${tipo}`
}

export function getRecordSpec(
  layout: CnabLayout,
  recordType: string,
  bankId?: string,
): RecordSpec | null {
  if (bankId) {
    const exact = bankByKey.get(bankSpecKey(bankId, layout, recordType))
    if (exact) return exact

    const bradescoId = resolveBradescoBankId(bankId)
    if (bradescoId) {
      const bradescoSpec = bankByKey.get(bankSpecKey(bradescoId, layout, recordType))
      if (bradescoSpec) return bradescoSpec
    }

    const itauId = resolveItauBankId(bankId)
    if (itauId) {
      const itauSpec = bankByKey.get(bankSpecKey(itauId, layout, recordType))
      if (itauSpec) return itauSpec
    }

    const bbId = resolveBbBankId(bankId)
    if (bbId) {
      const bbSpec = bankByKey.get(bankSpecKey(bbId, layout, recordType))
      if (bbSpec) return bbSpec
    }
  }

  return febrabanByKey.get(specKey(layout, recordType)) ?? null
}

export function listAvailableSpecs(): RecordSpec[] {
  return [...febrabanByKey.values(), ...bankByKey.values()]
}

export function mergeRecordSpec(base: RecordSpec, override: RecordSpec): RecordSpec {
  const fields = [...base.fields]
  for (const fieldDef of override.fields) {
    const idx = fields.findIndex((f) => f.id === fieldDef.id)
    if (idx >= 0) fields[idx] = fieldDef
    else fields.push(fieldDef)
  }
  return { ...base, ...override, fields: fields.sort((a, b) => a.start - b.start) }
}
