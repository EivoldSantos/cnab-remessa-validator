export type CnabLayout = 'c240' | 'c400'

export type FieldType =
  | 'numeric'
  | 'alpha'
  | 'alphanumeric'
  | 'date'
  | 'time'
  | 'money'
  | 'enum'
  | 'filler'

export type IssueSeverity = 'error' | 'warning' | 'info'

export interface ValidationIssue {
  severity: IssueSeverity
  code: string
  message: string
  line?: number
  field?: string
  position?: [number, number]
  expected?: string
  actual?: string
}

export interface FieldDefinition {
  id: string
  label: string
  start: number
  end: number
  type: FieldType
  required?: boolean
  pad?: 'left' | 'right' | 'numeric'
  fillChar?: string
  enum?: string[]
  enumRef?: string
  format?: string
  issueCode?: string
  bankOverride?: boolean
  notes?: string
}

export interface RecordSpec {
  id: string
  layout: CnabLayout
  recordType: string
  label: string
  lineLength: 240 | 400
  fields: FieldDefinition[]
  extends?: string
  bankId?: string
  acbrRef?: string
}

export interface ParsedField {
  id: string
  label: string
  start: number
  end: number
  raw: string
  value: string | null
  valid: boolean
}

export interface LineValidationResult {
  lineIndex: number
  recordType: string
  recordLabel: string
  fields: ParsedField[]
  issues: ValidationIssue[]
}

export interface BankDefinition {
  id: string
  nome: string
  compe: string
  layouts: CnabLayout[]
  aliases?: string[]
  compeExtras?: string[]
  notes?: string
}

export interface ParsedLine {
  index: number
  raw: string
  length: number
}

export interface DetectResult {
  layout: CnabLayout | null
  bankCode: string | null
  remessaNumber: string | null
  lineLength: number | null
  lines: ParsedLine[]
}

export interface RemessaSummary {
  layout: CnabLayout | null
  bankCode: string | null
  bankName: string | null
  bankIds: string[]
  remessaNumber: string | null
  lineCount: number
  detailCount: number
  titleEstimate: number
  fieldsValidated?: number
  invalidFields?: number
}

export interface ValidationResult {
  ok: boolean
  summary: RemessaSummary
  issues: ValidationIssue[]
  lines: ParsedLine[]
  preview: Array<{ index: number; tipo: string; raw: string }>
  lineDetails?: LineValidationResult[]
}

export type ValidationLevel = 'A' | 'B' | 'AB'

export interface ValidateOptions {
  expectedCompe?: string
  level?: ValidationLevel
}

export interface FieldContext {
  lineIndex: number
  layout: CnabLayout
  bankId?: string
  lineCount?: number
  recordType?: string
}
