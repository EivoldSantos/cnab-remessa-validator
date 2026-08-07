import { parseAndValidateLine } from './field-engine'
import { classifyLine, getRecordSpec } from './spec-registry'
import type {
  CnabKind,
  CnabLayout,
  LineValidationResult,
  ParsedLine,
  ValidationIssue,
} from './types'

export interface ValidateLinesContext {
  layout: CnabLayout
  bankId?: string
  bankCode?: string | null
  kind?: CnabKind
}

function unspecResult(
  line: ParsedLine,
  recordType: string,
  code: 'UNKNOWN_RECORD' | 'NO_SPEC',
  message: string,
): LineValidationResult {
  const issue: ValidationIssue = {
    severity: 'warning',
    code,
    message,
    line: line.index,
  }
  return {
    lineIndex: line.index,
    recordType,
    recordLabel:
      code === 'UNKNOWN_RECORD'
        ? 'Registro não classificado'
        : `Registro sem spec (${recordType})`,
    fields: [],
    issues: [issue],
  }
}

export function validateLine(
  line: ParsedLine,
  ctx: ValidateLinesContext,
  lineCount: number,
): LineValidationResult {
  const recordType = classifyLine(line.raw, ctx.layout)
  if (!recordType) {
    return unspecResult(
      line,
      '?',
      'UNKNOWN_RECORD',
      `Tipo de registro não classificado (layout ${ctx.layout}, linha ${line.index})`,
    )
  }

  const kind = ctx.kind ?? 'remessa'
  const spec = getRecordSpec(ctx.layout, recordType, ctx.bankId, kind)
  if (!spec) {
    const bankHint = ctx.bankId ? `, banco ${ctx.bankId}` : ''
    return unspecResult(
      line,
      recordType,
      'NO_SPEC',
      `Spec ausente para registro ${recordType} (${kind}/${ctx.layout}${bankHint})`,
    )
  }

  const { fields, issues } = parseAndValidateLine(line.raw, spec, {
    lineIndex: line.index,
    layout: ctx.layout,
    kind,
    bankId: ctx.bankId,
    lineCount,
    recordType,
  })

  return {
    lineIndex: line.index,
    recordType,
    recordLabel: spec.label,
    fields,
    issues,
  }
}

export function validateFileLines(
  lines: ParsedLine[],
  ctx: ValidateLinesContext,
): { issues: ValidationIssue[]; lineDetails: LineValidationResult[] } {
  const lineDetails: LineValidationResult[] = []
  const issues: ValidationIssue[] = []
  const lineCount = lines.length

  for (const line of lines) {
    const result = validateLine(line, ctx, lineCount)
    lineDetails.push(result)
    issues.push(...result.issues)
  }

  return { issues, lineDetails }
}
