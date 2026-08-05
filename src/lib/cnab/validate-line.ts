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

export function validateLine(
  line: ParsedLine,
  ctx: ValidateLinesContext,
  lineCount: number,
): LineValidationResult | null {
  const recordType = classifyLine(line.raw, ctx.layout)
  if (!recordType) return null

  const kind = ctx.kind ?? 'remessa'
  const spec = getRecordSpec(ctx.layout, recordType, ctx.bankId, kind)
  if (!spec) return null

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
    if (!result) continue
    lineDetails.push(result)
    issues.push(...result.issues)
  }

  return { issues, lineDetails }
}
