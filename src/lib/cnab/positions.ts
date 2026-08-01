/** Fatias FEBRABAN (1-based inclusive → slice 0-based). */

export function slice1(line: string, start: number, end: number): string {
  return line.slice(start - 1, end)
}

export const CNAB400 = {
  registro: [1, 1] as const,
  tipoArquivo: [2, 2] as const,
  literalRemessa: [3, 9] as const,
  codigoBanco: [77, 79] as const,
  dataGeracao: [95, 100] as const,
  numeroRemessa: [111, 117] as const,
  sequencial: [395, 400] as const,
}

export const CNAB240 = {
  codigoBanco: [1, 3] as const,
  lote: [4, 7] as const,
  tipoRegistro: [8, 8] as const,
  tipoOperacao: [9, 9] as const,
  tipoServico: [10, 11] as const,
  segmento: [14, 14] as const,
  codigoRemessaRetorno: [143, 143] as const,
  dataGeracao: [144, 151] as const,
  numeroSequencialArquivo: [158, 163] as const,
  qtdRegistrosLote: [18, 23] as const,
  qtdTitulosCobranca: [24, 29] as const,
  qtdLotesArquivo: [18, 23] as const,
  qtdRegistrosArquivo: [24, 29] as const,
}

export function field(line: string, range: readonly [number, number]): string {
  return slice1(line, range[0], range[1])
}
