function pad(s: string, len: number, ch = ' '): string {
  return s.length >= len ? s.slice(0, len) : s + ch.repeat(len - s.length)
}

function padLeft(s: string, len: number, ch = '0'): string {
  return s.length >= len ? s.slice(-len) : ch.repeat(len - s.length) + s
}

/** Remessa CNAB400 mínima estilo FEBRABAN/Bradesco (header ACBr default). */
export function remessa400Bradesco(): string {
  const header =
    '0' +
    '1' +
    'REMESSA' +
    '01' +
    pad('COBRANCA', 15) +
    padLeft('1234567', 20) +
    pad('EMPRESA TESTE LTDA', 30) +
    '237' +
    pad('BRADESCO', 15) +
    '010825' +
    pad('', 7) +
    padLeft('000', 3) +
    padLeft('1', 7) +
    pad('', 277) +
    padLeft('1', 6)

  const detail =
    '1' +
    pad('', 393) +
    padLeft('2', 6)

  // force exact 400
  const d = (detail + pad('', 400)).slice(0, 400)

  const body = [header, d]
  const trailer = '9' + pad('', 393) + padLeft(String(body.length + 1), 6)

  return [...body, trailer].map((l) => l.slice(0, 400).padEnd(400, ' ')).join('\n')
}

/** Remessa CNAB240 mínima com segmentos P/Q. */
export function remessa240Bradesco(): string {
  const banco = '237'

  const headerArq =
    banco +
    '0000' +
    '0' +
    pad('', 9) +
    '2' +
    padLeft('12345678000199', 14) +
    pad('CONVENIO123', 20) +
    padLeft('1234', 5) +
    ' ' +
    padLeft('123456789012', 12) +
    '0' +
    ' ' +
    pad('EMPRESA TESTE LTDA', 30) +
    pad('BRADESCO', 30) +
    pad('', 10) +
    '1' +
    '01082025' +
    '120000' +
    padLeft('1', 6) +
    '040' +
    padLeft('6250', 5) +
    pad('', 69)

  const headerLote =
    banco +
    '0001' +
    '1' +
    'R' +
    '01' +
    '  ' +
    '040' +
    ' ' +
    '2' +
    padLeft('12345678000199', 15) +
    pad('CONVENIO123', 20) +
    padLeft('1234', 5) +
    ' ' +
    padLeft('123456789012', 12) +
    '0' +
    ' ' +
    pad('EMPRESA TESTE LTDA', 30) +
    pad('', 40) +
    pad('', 40) +
    padLeft('1', 8) +
    '01082025' +
    padLeft('0', 8) +
    pad('', 33)

  const segP =
    banco +
    '0001' +
    '3' +
    padLeft('1', 5) +
    'P' +
    ' ' +
    '01' +
    pad('', 223)

  const segQ =
    banco +
    '0001' +
    '3' +
    padLeft('2', 5) +
    'Q' +
    ' ' +
    '01' +
    pad('', 223)

  const lines = [headerArq, headerLote, segP, segQ].map((l) =>
    l.slice(0, 240).padEnd(240, ' '),
  )

  // trailer lote: qtd = header lote + 2 details + trailer = 4? Actually header lote + details + trailer lote
  // FEBRABAN: includes header lote, details, trailer lote
  const qtdLote = 1 + 2 + 1 // 4
  const trailerLote =
    banco +
    '0001' +
    '5' +
    pad('', 9) +
    padLeft(String(qtdLote), 6) +
    padLeft('1', 6) +
    padLeft('10000', 17) +
    padLeft('0', 6) +
    padLeft('0', 17) +
    padLeft('0', 6) +
    padLeft('0', 17) +
    padLeft('0', 6) +
    padLeft('0', 17) +
    pad('', 8) +
    pad('', 117)

  const allBeforeArqTrailer = [...lines, trailerLote.slice(0, 240).padEnd(240, ' ')]
  const qtdArq = allBeforeArqTrailer.length + 1

  const trailerArq =
    banco +
    '9999' +
    '9' +
    pad('', 9) +
    '000001' +
    padLeft(String(qtdArq), 6) +
    padLeft('0', 6) +
    pad('', 205)

  return [...allBeforeArqTrailer, trailerArq.slice(0, 240).padEnd(240, ' ')].join('\n')
}

/** CNAB240 com COMPE Vórtx (310) — ACBr só c400 → LAYOUT_UNSUPPORTED. */
export function remessa240VortxUnsupported(): string {
  return remessa240Bradesco().replace(/^237/gm, '310')
}
