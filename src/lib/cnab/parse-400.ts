import type { ParsedLine } from './types'
import { CNAB400, field } from './positions'

export interface Parsed400 {
  header: ParsedLine | null
  details: ParsedLine[]
  trailer: ParsedLine | null
  other: ParsedLine[]
}

export function parse400(lines: ParsedLine[]): Parsed400 {
  const result: Parsed400 = {
    header: null,
    details: [],
    trailer: null,
    other: [],
  }

  for (const line of lines) {
    const tipo = field(line.raw, CNAB400.registro)
    if (line.index === 1 || tipo === '0') {
      if (!result.header) result.header = line
      else result.other.push(line)
    } else if (tipo === '9') {
      result.trailer = line
    } else if (tipo === '1' || tipo === '2' || tipo === '3' || tipo === '6' || tipo === '7') {
      result.details.push(line)
    } else {
      result.other.push(line)
    }
  }

  return result
}

export function lineTipo400(line: string): string {
  return field(line, CNAB400.registro) || '?'
}
