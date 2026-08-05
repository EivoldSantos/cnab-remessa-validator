import type { ValidationIssue, ValidationResult } from './types'

/** Relatório compacto para depurar interpretação do motor (specs/engine). */
export interface MotorDebugReport {
  purpose: 'motor-interpretation-debug'
  fileName: string
  ok: boolean
  context: {
    kind: string | null
    layout: string | null
    bankCode: string | null
    bankName: string | null
    bankIds: string[]
    remessaNumber: string | null
    lineCount: number
    titleEstimate: number
    fieldsValidated: number
    invalidFields: number
  }
  errors: Array<{
    code: string
    message: string
    line?: number
    field?: string
    position?: [number, number]
    expected?: string
    actual?: string
  }>
  invalidFields: Array<{
    line: number
    recordType: string
    recordLabel: string
    fieldId: string
    label: string
    start: number
    end: number
    raw: string
    value: string | null
    issues: Array<Pick<ValidationIssue, 'code' | 'message' | 'expected' | 'actual'>>
  }>
}

function pickIssue(issue: ValidationIssue) {
  return {
    code: issue.code,
    message: issue.message,
    ...(issue.line != null ? { line: issue.line } : {}),
    ...(issue.field ? { field: issue.field } : {}),
    ...(issue.position ? { position: issue.position } : {}),
    ...(issue.expected != null ? { expected: issue.expected } : {}),
    ...(issue.actual != null ? { actual: issue.actual } : {}),
  }
}

export function buildMotorDebugReport(
  result: ValidationResult,
  fileName: string,
): MotorDebugReport {
  const { summary, issues, lineDetails } = result
  const errors = issues.filter((i) => i.severity === 'error').map(pickIssue)

  const invalidFields =
    lineDetails?.flatMap((ld) => {
      const lineIssues = ld.issues.filter((i) => i.severity === 'error' || i.severity === 'warning')
      return ld.fields
        .filter((f) => !f.valid)
        .map((f) => ({
          line: ld.lineIndex,
          recordType: ld.recordType,
          recordLabel: ld.recordLabel,
          fieldId: f.id,
          label: f.label,
          start: f.start,
          end: f.end,
          raw: f.raw,
          value: f.value,
          issues: lineIssues
            .filter((i) => i.field === f.id || i.position?.[0] === f.start)
            .map((i) => ({
              code: i.code,
              message: i.message,
              ...(i.expected != null ? { expected: i.expected } : {}),
              ...(i.actual != null ? { actual: i.actual } : {}),
            })),
        }))
    }) ?? []

  return {
    purpose: 'motor-interpretation-debug',
    fileName,
    ok: result.ok,
    context: {
      kind: summary.kind,
      layout: summary.layout,
      bankCode: summary.bankCode,
      bankName: summary.bankName,
      bankIds: summary.bankIds,
      remessaNumber: summary.remessaNumber,
      lineCount: summary.lineCount,
      titleEstimate: summary.titleEstimate,
      fieldsValidated: summary.fieldsValidated ?? 0,
      invalidFields: summary.invalidFields ?? 0,
    },
    errors,
    invalidFields,
  }
}

export function motorDebugReportJson(result: ValidationResult, fileName: string): string {
  return JSON.stringify(buildMotorDebugReport(result, fileName), null, 2)
}
