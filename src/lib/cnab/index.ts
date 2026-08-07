export type {
  BankDefinition,
  CnabKind,
  CnabLayout,
  DetectResult,
  FieldDefinition,
  FieldType,
  IssueSeverity,
  LineValidationResult,
  ParsedField,
  ParsedLine,
  RecordSpec,
  RemessaSummary,
  ValidateOptions,
  ValidationIssue,
  ValidationLevel,
  ValidationResult,
} from './types'

export {
  ACBR_BANKS,
  bankSupportsLayout,
  findBankById,
  findBanksByCompe,
  formatBankLabel,
  listAllBanks,
} from './banks'

export { detectLayout, detectRemessa, detectRetorno, detectKindFromHeader, splitLines } from './detect'
export { parse400, lineTipo400 } from './parse-400'
export { parse240, getPrimaryLote, lineTipo240, estimateTitles240 } from './parse-240'
export type { Parsed240, Parsed240Lote } from './parse-240'
export { extractFields, validateFields, parseAndValidateLine } from './field-engine'
export { classifyLine, getRecordSpec, listAvailableSpecs } from './spec-registry'
export { validateLine, validateFileLines } from './validate-line'
export { validateRemessa } from './validate'
export { validateRetorno } from './validate-retorno'
export {
  buildMotorDebugReport,
  motorDebugReportJson,
  type MotorDebugReport,
} from './motor-debug-report'
