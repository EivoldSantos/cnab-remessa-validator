import { bankSupportsLayout, findBanksByCompe, formatBankLabel } from './banks'
import type { CnabKind, CnabLayout, ValidateOptions, ValidationIssue, ValidationResult } from './types'

export function push(
  issues: ValidationIssue[],
  severity: ValidationIssue['severity'],
  code: string,
  message: string,
  line?: number,
) {
  issues.push({ severity, code, message, line })
}

function hasNonAnsi(content: string): boolean {
  return /[^\x00-\xFF]/.test(content)
}

export function validateCommon(
  content: string,
  lines: ValidationResult['lines'],
  issues: ValidationIssue[],
): void {
  if (!content.trim()) {
    push(issues, 'error', 'EMPTY', 'Arquivo vazio')
    return
  }

  if (lines.length === 0) {
    push(issues, 'error', 'NO_LINES', 'Nenhuma linha útil encontrada')
    return
  }

  if (hasNonAnsi(content)) {
    push(
      issues,
      'warning',
      'ENCODING',
      'Caracteres fora do Latin-1/ANSI detectados — arquivo CNAB costuma ser ANSI',
    )
  }

  const lengths = new Set(lines.map((l) => l.length))
  if (lengths.size > 1) {
    const summary = [...lengths]
      .map((len) => `${len} (${lines.filter((l) => l.length === len).length} linhas)`)
      .join(', ')
    push(
      issues,
      'error',
      'MIXED_LENGTH',
      `Linhas com tamanhos mistos: ${summary}. Esperado uniforme 240 ou 400.`,
    )
  }
}

export function validateBankRules(
  bankCode: string | null,
  layout: CnabLayout | null,
  issues: ValidationIssue[],
  options?: ValidateOptions,
): { bankName: string | null; bankIds: string[] } {
  if (!bankCode) {
    push(issues, 'warning', 'BANK_UNKNOWN', 'Código do banco não identificado no header')
    return { bankName: null, bankIds: [] }
  }

  const banks = findBanksByCompe(bankCode)
  if (banks.length === 0) {
    push(
      issues,
      'warning',
      'BANK_NOT_IN_ACBR',
      `COMPE ${bankCode} não encontrado no catálogo ACBr`,
    )
    return { bankName: null, bankIds: [] }
  }

  push(
    issues,
    'info',
    'BANK_MATCH',
    `Banco ACBr: ${formatBankLabel(banks)} (${bankCode})`,
  )

  if (layout) {
    const unsupported = banks.filter((b) => !bankSupportsLayout(b, layout))
    const supported = banks.filter((b) => bankSupportsLayout(b, layout))
    if (supported.length === 0 && unsupported.length > 0) {
      push(
        issues,
        'error',
        'LAYOUT_UNSUPPORTED',
        `Layout ${layout} não suportado no ACBr para ${formatBankLabel(unsupported)}`,
      )
    } else if (unsupported.length > 0 && supported.length > 0) {
      push(
        issues,
        'warning',
        'LAYOUT_PARTIAL',
        `Algumas variantes ACBr não geram ${layout}: ${unsupported.map((b) => b.id).join(', ')}`,
      )
    }
  }

  if (options?.expectedCompe) {
    const expected = options.expectedCompe.replace(/\D/g, '').padStart(3, '0')
    const actual = bankCode.replace(/\D/g, '').padStart(3, '0')
    if (expected !== actual) {
      push(
        issues,
        'error',
        'BANK_MISMATCH',
        `COMPE detectado ${actual} ≠ esperado ${expected}`,
      )
    }
  }

  return {
    bankName: formatBankLabel(banks),
    bankIds: banks.map((b) => b.id),
  }
}

export function checkKindMismatch(
  detected: CnabKind | null,
  expected: CnabKind,
  issues: ValidationIssue[],
): boolean {
  if (detected && detected !== expected) {
    push(
      issues,
      'error',
      'KIND_MISMATCH',
      `Arquivo detectado como ${detected}, mas o modo selecionado é ${expected}`,
    )
    return true
  }
  return false
}
