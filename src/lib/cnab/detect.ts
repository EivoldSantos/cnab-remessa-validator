import type { CnabKind, DetectResult, ParsedLine } from './types'
import { CNAB240, CNAB400, field } from './positions'

export function splitLines(content: string): ParsedLine[] {
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  return normalized
    .split('\n')
    .map((raw, index) => ({
      index: index + 1,
      raw: raw.replace(/\u0000/g, ''),
      length: raw.length,
    }))
    .filter((line) => line.raw.length > 0)
}

export function detectKindFromHeader(header: string, layout: DetectResult['layout']): CnabKind | null {
  if (!layout || !header) return null

  if (layout === 'c400' && header.length >= 9) {
    const prefix = field(header, [1, 9]).toUpperCase()
    if (prefix === '02RETORNO') return 'retorno'
    if (prefix === '01REMESSA') return 'remessa'
    const tipo = field(header, CNAB400.tipoArquivo)
    const literal = field(header, CNAB400.literalArquivo).trim().toUpperCase()
    if (tipo === '2' || literal === 'RETORNO') return 'retorno'
    if (tipo === '1' || literal === 'REMESSA') return 'remessa'
    return null
  }

  if (layout === 'c240' && header.length >= 143) {
    const remRet = field(header, CNAB240.codigoRemessaRetorno)
    if (remRet === '2') return 'retorno'
    if (remRet === '1') return 'remessa'
  }

  return null
}

export function detectLayout(lines: ParsedLine[]): DetectResult {
  if (lines.length === 0) {
    return {
      layout: null,
      kind: null,
      bankCode: null,
      remessaNumber: null,
      lineLength: null,
      lines,
    }
  }

  const lengths = new Set(lines.map((l) => l.length))
  const dominant =
    [...lengths].sort(
      (a, b) =>
        lines.filter((l) => l.length === b).length - lines.filter((l) => l.length === a).length,
    )[0] ?? null

  let layout: DetectResult['layout'] = null
  if (dominant === 240) layout = 'c240'
  else if (dominant === 400) layout = 'c400'
  else if (dominant !== null && dominant >= 230 && dominant <= 250) layout = 'c240'
  else if (dominant !== null && dominant >= 390 && dominant <= 410) layout = 'c400'

  const header = lines[0]?.raw ?? ''
  let bankCode: string | null = null
  let remessaNumber: string | null = null

  if (layout === 'c400' && header.length >= 117) {
    bankCode = field(header, CNAB400.codigoBanco).trim()
    remessaNumber = field(header, CNAB400.numeroRemessa).replace(/^0+/, '') || '0'
  } else if (layout === 'c240' && header.length >= 163) {
    bankCode = field(header, CNAB240.codigoBanco).trim()
    remessaNumber =
      field(header, CNAB240.numeroSequencialArquivo).replace(/^0+/, '') || '0'
  }

  const kind = detectKindFromHeader(header, layout)

  return {
    layout,
    kind,
    bankCode,
    remessaNumber,
    lineLength: dominant,
    lines,
  }
}

export function detectRemessa(content: string): DetectResult {
  return detectLayout(splitLines(content))
}

export function detectRetorno(content: string): DetectResult {
  return detectLayout(splitLines(content))
}
