import type { ParsedLine } from './types'
import { CNAB240, field } from './positions'

export interface Parsed240 {
  headerArquivo: ParsedLine | null
  headerLote: ParsedLine | null
  details: ParsedLine[]
  trailerLote: ParsedLine | null
  trailerArquivo: ParsedLine | null
  other: ParsedLine[]
  segmentos: Record<string, number>
}

export function parse240(lines: ParsedLine[]): Parsed240 {
  const result: Parsed240 = {
    headerArquivo: null,
    headerLote: null,
    details: [],
    trailerLote: null,
    trailerArquivo: null,
    other: [],
    segmentos: {},
  }

  for (const line of lines) {
    const lote = field(line.raw, CNAB240.lote)
    const tipo = field(line.raw, CNAB240.tipoRegistro)

    if (tipo === '0' && lote === '0000') {
      result.headerArquivo = line
    } else if (tipo === '1') {
      result.headerLote = line
    } else if (tipo === '3') {
      result.details.push(line)
      const seg = field(line.raw, CNAB240.segmento) || '?'
      result.segmentos[seg] = (result.segmentos[seg] ?? 0) + 1
    } else if (tipo === '5') {
      result.trailerLote = line
    } else if (tipo === '9' && lote === '9999') {
      result.trailerArquivo = line
    } else {
      result.other.push(line)
    }
  }

  return result
}

export function lineTipo240(line: string): string {
  const tipo = field(line, CNAB240.tipoRegistro)
  if (tipo === '3') {
    return `3${field(line, CNAB240.segmento)}`
  }
  return tipo || '?'
}

/** Estimativa de títulos = contagem de segmento P (remessa) ou T (retorno). */
export function estimateTitles240(
  parsed: Parsed240,
  kind: 'remessa' | 'retorno' = 'remessa',
): number {
  if (kind === 'retorno') {
    return parsed.segmentos.T ?? Math.ceil(parsed.details.length / 2)
  }
  return parsed.segmentos.P ?? Math.ceil(parsed.details.length / 2)
}
