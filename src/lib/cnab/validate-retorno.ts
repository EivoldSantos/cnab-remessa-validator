import { detectRetorno } from './detect'
import { estimateTitles240, lineTipo240, parse240 } from './parse-240'
import { lineTipo400, parse400 } from './parse-400'
import { CNAB240, CNAB400, field } from './positions'
import { validateFileLines } from './validate-line'
import {
  checkKindMismatch,
  push,
  validateBankRules,
  validateCommon,
} from './validate-shared'
import type {
  RemessaSummary,
  ValidateOptions,
  ValidationIssue,
  ValidationResult,
} from './types'

function validate400Retorno(lines: ValidationResult['lines'], issues: ValidationIssue[]) {
  const parsed = parse400(lines)
  const header = parsed.header

  if (!header) {
    push(issues, 'error', 'H400_MISSING', 'Header CNAB400 (registro 0) ausente')
  } else {
    const tipoArq = field(header.raw, CNAB400.tipoArquivo)
    const literal = field(header.raw, CNAB400.literalArquivo).trim().toUpperCase()
    const registro = field(header.raw, CNAB400.registro)

    if (registro !== '0') {
      push(issues, 'error', 'H400_REG', 'Header deve iniciar com registro tipo 0', header.index)
    }
    if (tipoArq !== '2') {
      push(
        issues,
        'error',
        'H400_TIPO',
        `Tipo de arquivo deve ser 2 (Retorno), encontrado "${tipoArq}"`,
        header.index,
      )
    }
    if (literal !== 'RETORNO') {
      push(
        issues,
        'error',
        'H400_LITERAL',
        `Literal RETORNO ausente/inválida: "${literal}"`,
        header.index,
      )
    }
  }

  if (parsed.details.length === 0) {
    push(issues, 'error', 'D400_EMPTY', 'Nenhum registro de detalhe entre header e trailer')
  } else {
    push(issues, 'info', 'D400_COUNT', `${parsed.details.length} registro(s) de detalhe/mensagem`)
  }

  if (!parsed.trailer) {
    push(issues, 'error', 'T400_MISSING', 'Trailer CNAB400 (registro 9) ausente')
  } else {
    const seq = field(parsed.trailer.raw, CNAB400.sequencial)
    const expected = String(lines.length).padStart(6, '0')
    if (seq !== expected) {
      push(
        issues,
        'warning',
        'T400_SEQ',
        `Sequencial trailer ${seq} ≠ total de linhas ${expected}`,
        parsed.trailer.index,
      )
    }
    if (parsed.trailer.index !== lines[lines.length - 1]?.index) {
      push(
        issues,
        'warning',
        'T400_NOT_LAST',
        'Trailer não é a última linha do arquivo',
        parsed.trailer.index,
      )
    }
  }

  return parsed.details.filter((d) => field(d.raw, CNAB400.registro) === '1').length
}

function validate240Retorno(lines: ValidationResult['lines'], issues: ValidationIssue[]) {
  const parsed = parse240(lines)

  if (!parsed.headerArquivo) {
    push(issues, 'error', 'H240_ARQ', 'Header de arquivo (lote 0000, tipo 0) ausente')
  } else {
    const remRet = field(parsed.headerArquivo.raw, CNAB240.codigoRemessaRetorno)
    if (remRet !== '2') {
      push(
        issues,
        'error',
        'H240_NOT_RETORNO',
        `Código remessa/retorno deve ser 2, encontrado "${remRet}"`,
        parsed.headerArquivo.index,
      )
    }
  }

  if (!parsed.headerLote) {
    push(issues, 'error', 'H240_LOTE', 'Header de lote (tipo 1) ausente')
  } else {
    const op = field(parsed.headerLote.raw, CNAB240.tipoOperacao)
    const serv = field(parsed.headerLote.raw, CNAB240.tipoServico)
    if (op !== 'T') {
      push(
        issues,
        'warning',
        'H240_OP',
        `Tipo operação esperado T (retorno), encontrado "${op}"`,
        parsed.headerLote.index,
      )
    }
    if (serv !== '01') {
      push(
        issues,
        'warning',
        'H240_SERV',
        `Tipo serviço cobrança esperado 01, encontrado "${serv}"`,
        parsed.headerLote.index,
      )
    }
  }

  if (parsed.details.length === 0) {
    push(issues, 'error', 'D240_EMPTY', 'Nenhum segmento de detalhe (tipo 3)')
  } else {
    const segs = Object.entries(parsed.segmentos)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ')
    push(issues, 'info', 'D240_SEGS', `Segmentos: ${segs}`)
    if (!parsed.segmentos.T) {
      push(issues, 'warning', 'D240_NO_T', 'Segmento T não encontrado (padrão retorno cobrança)')
    }
    if (!parsed.segmentos.U) {
      push(issues, 'info', 'D240_NO_U', 'Segmento U não encontrado (valores de liquidação)')
    }
  }

  if (!parsed.trailerLote) {
    push(issues, 'error', 'T240_LOTE', 'Trailer de lote (tipo 5) ausente')
  } else {
    const qtdRegs = Number(field(parsed.trailerLote.raw, CNAB240.qtdRegistrosLote))
    const expectedLote =
      (parsed.headerLote ? 1 : 0) + parsed.details.length + 1
    if (qtdRegs > 0 && qtdRegs !== expectedLote) {
      push(
        issues,
        'warning',
        'T240_LOTE_COUNT',
        `Qtd registros lote trailer=${qtdRegs}, calculado≈${expectedLote}`,
        parsed.trailerLote.index,
      )
    } else if (qtdRegs === 0) {
      push(
        issues,
        'info',
        'T240_LOTE_ZERO',
        'Trailer lote com contadores zerados (alguns bancos fazem isso)',
        parsed.trailerLote.index,
      )
    }
  }

  if (!parsed.trailerArquivo) {
    push(issues, 'error', 'T240_ARQ', 'Trailer de arquivo (lote 9999, tipo 9) ausente')
  } else {
    const qtdArq = Number(field(parsed.trailerArquivo.raw, CNAB240.qtdRegistrosArquivo))
    if (qtdArq > 0 && qtdArq !== lines.length) {
      push(
        issues,
        'warning',
        'T240_ARQ_COUNT',
        `Qtd registros arquivo trailer=${qtdArq}, linhas=${lines.length}`,
        parsed.trailerArquivo.index,
      )
    }
  }

  return estimateTitles240(parsed, 'retorno')
}

export function validateRetorno(
  content: string,
  options?: ValidateOptions,
): ValidationResult {
  const issues: ValidationIssue[] = []
  const detected = detectRetorno(content)
  const { lines, layout, bankCode, remessaNumber, kind } = detected

  validateCommon(content, lines, issues)
  checkKindMismatch(kind, 'retorno', issues)

  const bankInfo = validateBankRules(bankCode, layout, issues, options)

  let detailCount = 0
  let titleEstimate = 0

  if (layout === 'c400') {
    push(issues, 'info', 'LAYOUT', 'Layout detectado: CNAB400')
    titleEstimate = validate400Retorno(lines, issues)
    detailCount = titleEstimate
  } else if (layout === 'c240') {
    push(issues, 'info', 'LAYOUT', 'Layout detectado: CNAB240')
    titleEstimate = validate240Retorno(lines, issues)
    detailCount = lines.filter((l) => field(l.raw, CNAB240.tipoRegistro) === '3').length
  } else if (lines.length > 0) {
    push(
      issues,
      'error',
      'LAYOUT_UNKNOWN',
      `Não foi possível detectar CNAB240/400 (tamanho dominante: ${detected.lineLength ?? 'n/a'})`,
    )
  }

  const summary: RemessaSummary = {
    layout,
    kind: kind ?? 'retorno',
    bankCode,
    bankName: bankInfo.bankName,
    bankIds: bankInfo.bankIds,
    remessaNumber,
    lineCount: lines.length,
    detailCount,
    titleEstimate,
  }

  const preview = lines.slice(0, 12).map((line) => ({
    index: line.index,
    tipo:
      layout === 'c240'
        ? lineTipo240(line.raw)
        : layout === 'c400'
          ? lineTipo400(line.raw)
          : '?',
    raw: line.raw,
  }))

  const level = options?.level ?? 'AB'
  let lineDetails = undefined
  let fieldsValidated = 0
  let invalidFields = 0

  if (level !== 'A' && layout && bankInfo.bankIds.length > 0) {
    const bankResult = validateFileLines(lines, {
      layout,
      bankId: bankInfo.bankIds[0],
      bankCode,
      kind: 'retorno',
    })
    issues.push(...bankResult.issues)
    lineDetails = bankResult.lineDetails
    for (const ld of bankResult.lineDetails) {
      fieldsValidated += ld.fields.length
      invalidFields += ld.fields.filter((f) => !f.valid).length
    }
    if (lineDetails.length > 0) {
      push(
        issues,
        'info',
        'LEVEL_B',
        `Validação linha a linha: ${lineDetails.length} registro(s), ${fieldsValidated} campo(s)`,
      )
    }
  }

  summary.fieldsValidated = fieldsValidated
  summary.invalidFields = invalidFields

  const ok = !issues.some((i) => i.severity === 'error')

  return { ok, summary, issues, lines, preview, lineDetails }
}
