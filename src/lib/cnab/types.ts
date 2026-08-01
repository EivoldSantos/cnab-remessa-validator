export type CnabLayout = 'c240' | 'c400'

export type IssueSeverity = 'error' | 'warning' | 'info'

export interface ValidationIssue {
  severity: IssueSeverity
  code: string
  message: string
  line?: number
}

export interface BankDefinition {
  id: string
  nome: string
  /** Código COMPE (3 dígitos). Vazio se só API/WS sem CNAB arquivo. */
  compe: string
  layouts: CnabLayout[]
  /** Outros ids ACBr que compartilham a mesma classe/COMPE */
  aliases?: string[]
  /** Códigos COMPE adicionais (ex. Santander 033/353/008) */
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
}

export interface ValidationResult {
  ok: boolean
  summary: RemessaSummary
  issues: ValidationIssue[]
  lines: ParsedLine[]
  preview: Array<{ index: number; tipo: string; raw: string }>
}

export interface ValidateOptions {
  /** Filtra/exige COMPE específico (manual) */
  expectedCompe?: string
}
