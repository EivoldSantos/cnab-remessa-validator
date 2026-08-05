/** Fatias FEBRABAN (1-based inclusive → slice 0-based). */

export function slice1(line: string, start: number, end: number): string {
  return line.slice(start - 1, end)
}

export const CNAB400 = {
  registro: [1, 1] as const,
  tipoArquivo: [2, 2] as const,
  /** Literal REMESSA ou RETORNO (pos 3–9). */
  literalRemessa: [3, 9] as const,
  literalArquivo: [3, 9] as const,
  codigoBanco: [77, 79] as const,
  dataGeracao: [95, 100] as const,
  numeroRemessa: [111, 117] as const,
  /** Código ocorrência retorno (detalhe registro 1). */
  ocorrencia: [109, 110] as const,
  /** Motivos de rejeição/ocorrência (5×2). */
  motivos: [319, 328] as const,
  dataOcorrencia: [111, 116] as const,
  valorTitulo: [153, 165] as const,
  valorPago: [254, 266] as const,
  dataCredito: [296, 301] as const,
  sequencial: [395, 400] as const,
}

export const CNAB240 = {
  codigoBanco: [1, 3] as const,
  lote: [4, 7] as const,
  tipoRegistro: [8, 8] as const,
  tipoOperacao: [9, 9] as const,
  tipoServico: [10, 11] as const,
  segmento: [14, 14] as const,
  /** Código movimento segmento T (retorno) / P (remessa). */
  codigoMovimento: [16, 17] as const,
  codigoRemessaRetorno: [143, 143] as const,
  dataGeracao: [144, 151] as const,
  numeroSequencialArquivo: [158, 163] as const,
  qtdRegistrosLote: [18, 23] as const,
  qtdTitulosCobranca: [24, 29] as const,
  qtdLotesArquivo: [18, 23] as const,
  qtdRegistrosArquivo: [24, 29] as const,
  /** Segmento T — vencimento / valor / tarifas / motivos. */
  tVencimento: [74, 81] as const,
  tValorTitulo: [82, 96] as const,
  tValorTarifa: [199, 213] as const,
  tMotivos: [214, 223] as const,
  /** Segmento U — valores liquidados (ACBr LerRetorno240). */
  uJurosMulta: [18, 32] as const,
  uValorDesconto: [33, 47] as const,
  uValorAbatimento: [48, 62] as const,
  uValorIof: [63, 77] as const,
  uValorPago: [78, 92] as const,
  uValorLiquido: [93, 107] as const,
  uOutrasDespesas: [108, 122] as const,
  uOutrosCreditos: [123, 137] as const,
  uDataOcorrencia: [138, 145] as const,
  uDataCredito: [146, 153] as const,
}

export function field(line: string, range: readonly [number, number]): string {
  return slice1(line, range[0], range[1])
}
