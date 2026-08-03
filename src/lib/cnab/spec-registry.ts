import type { CnabLayout, RecordSpec } from './types'
import { FEBRABAN_SPECS } from './specs/febraban/c400'
import { CNAB240, CNAB400, field } from './positions'

const febrabanByKey = new Map<string, RecordSpec>()

for (const spec of FEBRABAN_SPECS) {
  febrabanByKey.set(specKey(spec.layout, spec.recordType), spec)
}

function specKey(layout: CnabLayout, recordType: string): string {
  return `${layout}:${recordType}`
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
  _bankId?: string,
): RecordSpec | null {
  return febrabanByKey.get(specKey(layout, recordType)) ?? null
}

export function listAvailableSpecs(): RecordSpec[] {
  return [...febrabanByKey.values()]
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
