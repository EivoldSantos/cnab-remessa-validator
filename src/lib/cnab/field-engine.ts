import type {
  FieldContext,
  FieldDefinition,
  ParsedField,
  RecordSpec,
  ValidationIssue,
} from './types'
import { getEnumRef } from './enums'

function issueCode(def: FieldDefinition, fallback: string): string {
  return def.issueCode ?? fallback
}

function normalizeValue(raw: string, def: FieldDefinition): string {
  if (def.type === 'filler') return raw
  if (def.type === 'numeric' || def.pad === 'numeric') return raw.trim()
  return raw.trimEnd()
}

export function extractFields(line: string, spec: RecordSpec): ParsedField[] {
  return spec.fields.map((def) => {
    const raw = line.slice(def.start - 1, def.end)
    const value = normalizeValue(raw, def)
    return {
      id: def.id,
      label: def.label,
      start: def.start,
      end: def.end,
      raw,
      value: value.length ? value : null,
      valid: true,
    }
  })
}

function isValidDate(value: string, format: string): boolean {
  if (format === 'DDMMAA' && value.length === 6) {
    const day = Number(value.slice(0, 2))
    const month = Number(value.slice(2, 4))
    const year = Number(value.slice(4, 6))
    if (month < 1 || month > 12 || day < 1 || day > 31) return false
    const fullYear = year >= 0 ? 2000 + year : 1900 + year
    const d = new Date(fullYear, month - 1, day)
    return d.getFullYear() === fullYear && d.getMonth() === month - 1 && d.getDate() === day
  }
  if (format === 'DDMMAAAA' && value.length === 8) {
    const day = Number(value.slice(0, 2))
    const month = Number(value.slice(2, 4))
    const year = Number(value.slice(4, 8))
    if (month < 1 || month > 12 || day < 1 || day > 31) return false
    const d = new Date(year, month - 1, day)
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
  }
  if (format === 'AAAAMMDD' && value.length === 8) {
    const year = Number(value.slice(0, 4))
    const month = Number(value.slice(4, 6))
    const day = Number(value.slice(6, 8))
    if (month < 1 || month > 12 || day < 1 || day > 31) return false
    const d = new Date(year, month - 1, day)
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
  }
  return /^\d+$/.test(value)
}

function isValidTime(value: string): boolean {
  if (value.length !== 6 || !/^\d+$/.test(value)) return false
  const h = Number(value.slice(0, 2))
  const m = Number(value.slice(2, 4))
  const s = Number(value.slice(4, 6))
  return h <= 23 && m <= 59 && s <= 59
}

function validateSingleField(
  parsed: ParsedField,
  def: FieldDefinition,
  ctx: FieldContext,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const code = issueCode(def, `F_${def.id.toUpperCase()}`)
  const pos: [number, number] = [def.start, def.end]
  const value = parsed.value ?? ''
  const isEmpty = parsed.raw.trim().length === 0

  if (def.required !== false && def.type !== 'filler' && isEmpty) {
    issues.push({
      severity: 'error',
      code,
      message: `${def.label}: campo obrigatório vazio`,
      line: ctx.lineIndex,
      field: def.id,
      position: pos,
      expected: '(preenchido)',
      actual: parsed.raw,
    })
    parsed.valid = false
    return issues
  }

  if (def.type === 'filler' || isEmpty) {
    return issues
  }

  // Datas zeradas = sem desconto / campo não usado
  if (def.type === 'date' && /^0+$/.test(value)) {
    return issues
  }

  switch (def.type) {
    case 'numeric':
    case 'money':
      if (!/^\d+$/.test(value)) {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: esperado numérico, encontrado "${value}"`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          expected: '0-9',
          actual: value,
        })
        parsed.valid = false
      }
      break
    case 'alpha':
      if (!/^[A-Z0-9 ]+$/i.test(value)) {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: caracteres inválidos`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          actual: value,
        })
        parsed.valid = false
      }
      if (def.id === 'literal_remessa' && value.toUpperCase() !== 'REMESSA') {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: esperado REMESSA, encontrado "${value}"`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          expected: 'REMESSA',
          actual: value,
        })
        parsed.valid = false
      }
      break
    case 'alphanumeric':
      if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(value)) {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: caracteres de controle inválidos`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          actual: value,
        })
        parsed.valid = false
      }
      break
    case 'date':
      if (!isValidDate(value, def.format ?? 'DDMMAA')) {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: data inválida "${value}" (formato ${def.format ?? 'DDMMAA'})`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          actual: value,
        })
        parsed.valid = false
      }
      break
    case 'time':
      if (!isValidTime(value)) {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: hora inválida "${value}"`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          actual: value,
        })
        parsed.valid = false
      }
      break
    case 'enum': {
      const allowed = def.enum ?? (def.enumRef ? getEnumRef(def.enumRef) : undefined)
      if (allowed && !allowed.includes(value)) {
        issues.push({
          severity: 'error',
          code,
          message: `${def.label}: valor "${value}" não permitido (${allowed.slice(0, 5).join(', ')}${allowed.length > 5 ? '…' : ''})`,
          line: ctx.lineIndex,
          field: def.id,
          position: pos,
          expected: allowed.join('|'),
          actual: value,
        })
        parsed.valid = false
      }
      break
    }
  }

  if (def.id === 'sequencial') {
    const expected =
      ctx.recordType === '0'
        ? '000001'
        : ctx.recordType === '9'
          ? String(ctx.lineCount ?? ctx.lineIndex).padStart(6, '0')
          : String(ctx.lineIndex).padStart(6, '0')
    if (value !== expected) {
      issues.push({
        severity: 'warning',
        code: issueCode(def, 'F400_SEQ'),
        message: `${def.label}: sequencial ${value} ≠ esperado ${expected}`,
        line: ctx.lineIndex,
        field: def.id,
        position: pos,
        expected,
        actual: value,
      })
      parsed.valid = false
    }
  }

  return issues
}

export function validateFields(
  fields: ParsedField[],
  spec: RecordSpec,
  ctx: FieldContext,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  for (let i = 0; i < spec.fields.length; i++) {
    const def = spec.fields[i]
    const parsed = fields[i]
    issues.push(...validateSingleField(parsed, def, ctx))
  }
  return issues
}

export function parseAndValidateLine(
  line: string,
  spec: RecordSpec,
  ctx: FieldContext,
): { fields: ParsedField[]; issues: ValidationIssue[] } {
  const fields = extractFields(line, spec)
  const issues = validateFields(fields, spec, ctx)
  return { fields, issues }
}
