function pad(s: string, len: number, ch = ' '): string {
  return s.length >= len ? s.slice(0, len) : s + ch.repeat(len - s.length)
}

function padLeft(s: string, len: number, ch = '0'): string {
  return s.length >= len ? s.slice(-len) : ch.repeat(len - s.length) + s
}

/** Monta linha CNAB400 posição a posição (1-based). */
function buildLine400(segments: Array<{ start: number; end: number; value: string }>): string {
  const len = 400
  const chars = Array(len).fill(' ')
  for (const { start, end, value } of segments) {
    const v = value.slice(0, end - start + 1)
    for (let i = 0; i < v.length; i++) {
      chars[start - 1 + i] = v[i]
    }
  }
  return chars.join('')
}

/** Linha detalhe CNAB400 Bradesco mínima válida (ocorrência 01). */
export function remessa400BradescoDetalhe(seq: number): string {
  return buildLine400([
    { start: 1, end: 1, value: '1' },
    { start: 2, end: 20, value: padLeft('', 19) },
    { start: 21, end: 37, value: '0' + padLeft('9', 3) + padLeft('1234', 5) + padLeft('1234567', 7) + '0' },
    { start: 38, end: 65, value: pad('DOC-001', 25) + '000' },
    { start: 66, end: 66, value: '0' },
    { start: 67, end: 70, value: padLeft('', 4) },
    { start: 71, end: 82, value: padLeft('12345678901', 11) + '0' },
    { start: 83, end: 92, value: padLeft('', 10) },
    { start: 93, end: 104, value: pad('1 1', 12) },
    { start: 105, end: 110, value: ' 2  01' },
    { start: 111, end: 120, value: pad('FAT001', 10) },
    { start: 121, end: 126, value: '010825' },
    { start: 127, end: 139, value: padLeft('10000', 13) },
    { start: 140, end: 150, value: padLeft('', 8) + '01' + 'N' },
    { start: 151, end: 156, value: '010825' },
    { start: 157, end: 160, value: padLeft('', 4) },
    { start: 161, end: 173, value: padLeft('', 13) },
    { start: 174, end: 179, value: '000000' },
    { start: 180, end: 192, value: padLeft('', 13) },
    { start: 193, end: 205, value: padLeft('', 13) },
    { start: 206, end: 218, value: padLeft('', 13) },
    { start: 219, end: 219, value: '2' },
    { start: 220, end: 233, value: padLeft('12345678000199', 14) },
    { start: 235, end: 274, value: pad('CLIENTE TESTE LTDA', 40) },
    { start: 275, end: 314, value: pad('RUA TESTE 100 CENTRO', 40) },
    { start: 315, end: 326, value: pad('', 12) },
    { start: 327, end: 334, value: padLeft('01310100', 8) },
    { start: 335, end: 394, value: pad('', 60) },
    { start: 395, end: 400, value: padLeft(String(seq), 6) },
  ])
}

/** Remessa CNAB400 mínima estilo FEBRABAN/Bradesco. */
export function remessa400Bradesco(): string {
  const header = buildLine400([
    { start: 1, end: 1, value: '0' },
    { start: 2, end: 2, value: '1' },
    { start: 3, end: 9, value: 'REMESSA' },
    { start: 10, end: 11, value: '01' },
    { start: 12, end: 26, value: pad('COBRANCA', 15) },
    { start: 27, end: 46, value: padLeft('1234567', 20) },
    { start: 47, end: 76, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 77, end: 79, value: '237' },
    { start: 80, end: 94, value: pad('BRADESCO', 15) },
    { start: 95, end: 100, value: '010825' },
    { start: 101, end: 107, value: pad('', 7) },
    { start: 108, end: 110, value: padLeft('', 3) },
    { start: 111, end: 117, value: padLeft('1', 7) },
    { start: 118, end: 394, value: pad('', 277) },
    { start: 395, end: 400, value: padLeft('1', 6) },
  ])

  const detail = remessa400BradescoDetalhe(2)
  const trailer = buildLine400([
    { start: 1, end: 1, value: '9' },
    { start: 2, end: 394, value: pad('', 393) },
    { start: 395, end: 400, value: padLeft('3', 6) },
  ])

  return [header, detail, trailer].join('\n')
}

function buildLine240(segments: Array<{ start: number; end: number; value: string }>): string {
  const chars = Array(240).fill(' ')
  for (const { start, end, value } of segments) {
    const v = value.slice(0, end - start + 1)
    for (let i = 0; i < v.length; i++) chars[start - 1 + i] = v[i]
  }
  return chars.join('')
}

/** Remessa CNAB240 mínima com segmentos P/Q. */
export function remessa240Bradesco(): string {
  const headerArq = buildLine240([
    { start: 1, end: 3, value: '237' },
    { start: 4, end: 7, value: '0000' },
    { start: 8, end: 8, value: '0' },
    { start: 9, end: 17, value: pad('', 9) },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 32, value: padLeft('12345678000199', 14) },
    { start: 33, end: 52, value: pad('CONVENIO123', 20) },
    { start: 53, end: 57, value: padLeft('1234', 5) },
    { start: 58, end: 58, value: ' ' },
    { start: 59, end: 70, value: padLeft('123456789012', 12) },
    { start: 71, end: 71, value: '0' },
    { start: 72, end: 72, value: ' ' },
    { start: 73, end: 102, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 103, end: 132, value: pad('BRADESCO', 30) },
    { start: 133, end: 142, value: pad('', 10) },
    { start: 143, end: 143, value: '1' },
    { start: 144, end: 151, value: '01082025' },
    { start: 152, end: 157, value: '120000' },
    { start: 158, end: 163, value: padLeft('1', 6) },
    { start: 164, end: 166, value: '040' },
    { start: 167, end: 171, value: padLeft('6250', 5) },
    { start: 172, end: 240, value: pad('', 69) },
  ])

  const headerLote = buildLine240([
    { start: 1, end: 3, value: '237' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '1' },
    { start: 9, end: 9, value: 'R' },
    { start: 10, end: 11, value: '01' },
    { start: 12, end: 13, value: '  ' },
    { start: 14, end: 16, value: '040' },
    { start: 17, end: 17, value: ' ' },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 33, value: padLeft('12345678000199', 15) },
    { start: 34, end: 53, value: pad('CONVENIO123', 20) },
    { start: 54, end: 58, value: padLeft('1234', 5) },
    { start: 59, end: 59, value: ' ' },
    { start: 60, end: 71, value: padLeft('123456789012', 12) },
    { start: 72, end: 72, value: '0' },
    { start: 73, end: 73, value: ' ' },
    { start: 74, end: 103, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 184, end: 191, value: padLeft('1', 8) },
    { start: 192, end: 199, value: '01082025' },
    { start: 200, end: 207, value: padLeft('0', 8) },
  ])

  const segP = buildLine240([
    { start: 1, end: 3, value: '237' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '3' },
    { start: 9, end: 13, value: padLeft('1', 5) },
    { start: 14, end: 14, value: 'P' },
    { start: 15, end: 15, value: ' ' },
    { start: 16, end: 17, value: '01' },
    { start: 18, end: 22, value: padLeft('1234', 5) },
    { start: 23, end: 23, value: '0' },
    { start: 24, end: 35, value: padLeft('123456789012', 12) },
    { start: 36, end: 36, value: '0' },
    { start: 37, end: 37, value: ' ' },
    { start: 38, end: 40, value: padLeft('9', 3) },
    { start: 41, end: 45, value: padLeft('', 5) },
    { start: 46, end: 56, value: padLeft('12345678901', 11) },
    { start: 57, end: 57, value: '0' },
    { start: 58, end: 58, value: '1' },
    { start: 59, end: 59, value: '1' },
    { start: 60, end: 60, value: '1' },
    { start: 61, end: 61, value: '1' },
    { start: 62, end: 62, value: '1' },
    { start: 63, end: 77, value: pad('FAT001', 15) },
    { start: 78, end: 85, value: '01082025' },
    { start: 86, end: 100, value: padLeft('10000', 15) },
  ])

  const segQ = buildLine240([
    { start: 1, end: 3, value: '237' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '3' },
    { start: 9, end: 13, value: padLeft('2', 5) },
    { start: 14, end: 14, value: 'Q' },
    { start: 15, end: 15, value: ' ' },
    { start: 16, end: 17, value: '01' },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 33, value: padLeft('12345678000199', 15) },
    { start: 34, end: 73, value: pad('CLIENTE TESTE LTDA', 40) },
    { start: 74, end: 113, value: pad('RUA TESTE 100', 40) },
    { start: 114, end: 128, value: pad('CENTRO', 15) },
    { start: 129, end: 133, value: padLeft('01310', 5) },
    { start: 134, end: 136, value: '100' },
    { start: 137, end: 151, value: pad('SAO PAULO', 15) },
    { start: 152, end: 153, value: 'SP' },
  ])

  const trailerLote = buildLine240([
    { start: 1, end: 3, value: '237' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '5' },
    { start: 18, end: 23, value: padLeft('4', 6) },
  ])

  const trailerArq = buildLine240([
    { start: 1, end: 3, value: '237' },
    { start: 4, end: 7, value: '9999' },
    { start: 8, end: 8, value: '9' },
    { start: 18, end: 23, value: '000001' },
    { start: 24, end: 29, value: padLeft('6', 6) },
  ])

  return [headerArq, headerLote, segP, segQ, trailerLote, trailerArq].join('\n')
}

/** Remessa CNAB400 mínima estilo Itaú (carteira com registro). */
export function remessa400ItauDetalhe(seq: number): string {
  return buildLine400([
    { start: 1, end: 1, value: '1' },
    { start: 2, end: 3, value: '02' },
    { start: 4, end: 17, value: padLeft('12345678000199', 14) },
    { start: 18, end: 21, value: padLeft('1234', 4) },
    { start: 22, end: 23, value: '00' },
    { start: 24, end: 28, value: padLeft('12345', 5) },
    { start: 29, end: 29, value: '9' },
    { start: 30, end: 33, value: pad('', 4) },
    { start: 34, end: 37, value: '0000' },
    { start: 38, end: 62, value: pad('SEU-NUM-001', 25) },
    { start: 63, end: 70, value: padLeft('12345678', 8) },
    { start: 71, end: 83, value: '0000000000000' },
    { start: 84, end: 86, value: padLeft('109', 3) },
    { start: 87, end: 107, value: pad('', 21) },
    { start: 108, end: 108, value: 'I' },
    { start: 109, end: 110, value: '01' },
    { start: 111, end: 120, value: pad('FAT001', 10) },
    { start: 121, end: 126, value: '010825' },
    { start: 127, end: 139, value: padLeft('10000', 13) },
    { start: 140, end: 142, value: '341' },
    { start: 143, end: 147, value: '00000' },
    { start: 148, end: 149, value: '01' },
    { start: 150, end: 150, value: 'N' },
    { start: 151, end: 156, value: '010825' },
    { start: 157, end: 158, value: '00' },
    { start: 159, end: 160, value: '00' },
    { start: 161, end: 173, value: padLeft('', 13) },
    { start: 174, end: 179, value: '000000' },
    { start: 180, end: 192, value: padLeft('', 13) },
    { start: 193, end: 205, value: padLeft('', 13) },
    { start: 206, end: 218, value: padLeft('', 13) },
    { start: 219, end: 220, value: '02' },
    { start: 221, end: 234, value: padLeft('12345678000199', 14) },
    { start: 235, end: 264, value: pad('CLIENTE TESTE LTDA', 30) },
    { start: 265, end: 274, value: pad('', 10) },
    { start: 275, end: 314, value: pad('RUA TESTE 100 CENTRO', 40) },
    { start: 315, end: 326, value: pad('CENTRO', 12) },
    { start: 327, end: 334, value: padLeft('01310100', 8) },
    { start: 335, end: 349, value: pad('SAO PAULO', 15) },
    { start: 350, end: 351, value: 'SP' },
    { start: 352, end: 391, value: pad('', 30) + pad('', 4) + '000000' },
    { start: 392, end: 393, value: '00' },
    { start: 394, end: 394, value: ' ' },
    { start: 395, end: 400, value: padLeft(String(seq), 6) },
  ])
}

export function remessa400Itau(): string {
  const header = buildLine400([
    { start: 1, end: 1, value: '0' },
    { start: 2, end: 2, value: '1' },
    { start: 3, end: 9, value: 'REMESSA' },
    { start: 10, end: 11, value: '01' },
    { start: 12, end: 26, value: pad('COBRANCA', 15) },
    { start: 27, end: 30, value: padLeft('1234', 4) },
    { start: 31, end: 32, value: '00' },
    { start: 33, end: 37, value: padLeft('12345', 5) },
    { start: 38, end: 38, value: '9' },
    { start: 39, end: 46, value: pad('', 8) },
    { start: 47, end: 76, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 77, end: 79, value: '341' },
    { start: 80, end: 94, value: pad('ITAU', 15) },
    { start: 95, end: 100, value: '010825' },
    { start: 101, end: 394, value: pad('', 294) },
    { start: 395, end: 400, value: padLeft('1', 6) },
  ])

  const detail = remessa400ItauDetalhe(2)
  const trailer = buildLine400([
    { start: 1, end: 1, value: '9' },
    { start: 2, end: 394, value: pad('', 393) },
    { start: 395, end: 400, value: padLeft('3', 6) },
  ])

  return [header, detail, trailer].join('\n')
}

/** Remessa CNAB240 mínima Itaú com segmentos P/Q. */
export function remessa240Itau(): string {
  const headerArq = buildLine240([
    { start: 1, end: 3, value: '341' },
    { start: 4, end: 7, value: '0000' },
    { start: 8, end: 8, value: '0' },
    { start: 9, end: 17, value: pad('', 9) },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 32, value: padLeft('12345678000199', 14) },
    { start: 33, end: 52, value: pad('', 20) },
    { start: 53, end: 57, value: padLeft('1234', 5) },
    { start: 58, end: 58, value: ' ' },
    { start: 59, end: 70, value: padLeft('123456789012', 12) },
    { start: 71, end: 71, value: ' ' },
    { start: 72, end: 72, value: '9' },
    { start: 73, end: 102, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 103, end: 132, value: pad('ITAU', 30) },
    { start: 133, end: 142, value: pad('', 10) },
    { start: 143, end: 143, value: '1' },
    { start: 144, end: 151, value: '01082025' },
    { start: 152, end: 157, value: '120000' },
    { start: 158, end: 163, value: padLeft('1', 6) },
    { start: 164, end: 166, value: '040' },
    { start: 167, end: 171, value: padLeft('6250', 5) },
    { start: 172, end: 225, value: pad('', 54) },
    { start: 226, end: 228, value: '000' },
    { start: 229, end: 240, value: pad('', 12) },
  ])

  const headerLote = buildLine240([
    { start: 1, end: 3, value: '341' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '1' },
    { start: 9, end: 9, value: 'R' },
    { start: 10, end: 11, value: '01' },
    { start: 12, end: 13, value: '  ' },
    { start: 14, end: 16, value: '040' },
    { start: 17, end: 17, value: ' ' },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 33, value: padLeft('12345678000199', 15) },
    { start: 34, end: 53, value: pad('', 20) },
    { start: 54, end: 58, value: padLeft('1234', 5) },
    { start: 59, end: 59, value: ' ' },
    { start: 60, end: 71, value: padLeft('123456789012', 12) },
    { start: 72, end: 72, value: ' ' },
    { start: 73, end: 73, value: '9' },
    { start: 74, end: 103, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 184, end: 191, value: padLeft('1', 8) },
    { start: 192, end: 199, value: '01082025' },
    { start: 200, end: 207, value: padLeft('0', 8) },
  ])

  const segP = buildLine240([
    { start: 1, end: 3, value: '341' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '3' },
    { start: 9, end: 13, value: padLeft('1', 5) },
    { start: 14, end: 14, value: 'P' },
    { start: 15, end: 15, value: ' ' },
    { start: 16, end: 17, value: '01' },
    { start: 18, end: 18, value: '0' },
    { start: 19, end: 22, value: padLeft('1234', 4) },
    { start: 23, end: 23, value: ' ' },
    { start: 24, end: 30, value: '0000000' },
    { start: 31, end: 35, value: padLeft('12345', 5) },
    { start: 36, end: 36, value: ' ' },
    { start: 37, end: 37, value: '9' },
    { start: 38, end: 40, value: padLeft('109', 3) },
    { start: 41, end: 48, value: padLeft('12345678', 8) },
    { start: 49, end: 49, value: '1' },
    { start: 50, end: 57, value: pad('', 8) },
    { start: 58, end: 62, value: '00000' },
    { start: 63, end: 72, value: pad('FAT001', 10) },
    { start: 73, end: 77, value: pad('', 5) },
    { start: 78, end: 85, value: '01082025' },
    { start: 86, end: 100, value: padLeft('10000', 15) },
    { start: 101, end: 105, value: '00000' },
    { start: 106, end: 106, value: '0' },
    { start: 107, end: 108, value: '01' },
    { start: 109, end: 109, value: 'N' },
    { start: 110, end: 117, value: '01082025' },
    { start: 118, end: 118, value: '0' },
    { start: 119, end: 126, value: padLeft('0', 8) },
    { start: 127, end: 141, value: padLeft('', 15) },
    { start: 142, end: 142, value: '0' },
    { start: 143, end: 150, value: padLeft('0', 8) },
    { start: 151, end: 165, value: padLeft('', 15) },
    { start: 166, end: 180, value: padLeft('', 15) },
    { start: 181, end: 195, value: padLeft('', 15) },
    { start: 196, end: 220, value: pad('SEU-NUM-001', 25) },
    { start: 221, end: 221, value: '0' },
    { start: 222, end: 223, value: '00' },
    { start: 224, end: 224, value: '0' },
    { start: 225, end: 226, value: '00' },
    { start: 227, end: 240, value: '0000000000000 ' },
  ])

  const segQ = buildLine240([
    { start: 1, end: 3, value: '341' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '3' },
    { start: 9, end: 13, value: padLeft('2', 5) },
    { start: 14, end: 14, value: 'Q' },
    { start: 15, end: 15, value: ' ' },
    { start: 16, end: 17, value: '01' },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 33, value: padLeft('12345678000199', 15) },
    { start: 34, end: 63, value: pad('CLIENTE TESTE LTDA', 30) },
    { start: 64, end: 73, value: pad('', 10) },
    { start: 74, end: 113, value: pad('RUA TESTE 100', 40) },
    { start: 114, end: 128, value: pad('CENTRO', 15) },
    { start: 129, end: 136, value: padLeft('01310100', 8) },
    { start: 137, end: 151, value: pad('SAO PAULO', 15) },
    { start: 152, end: 153, value: 'SP' },
    { start: 154, end: 154, value: '0' },
    { start: 155, end: 169, value: padLeft('0', 15) },
    { start: 170, end: 199, value: pad('', 30) },
    { start: 210, end: 212, value: '000' },
  ])

  const trailerLote = buildLine240([
    { start: 1, end: 3, value: '341' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '5' },
    { start: 18, end: 23, value: padLeft('4', 6) },
  ])

  const trailerArq = buildLine240([
    { start: 1, end: 3, value: '341' },
    { start: 4, end: 7, value: '9999' },
    { start: 8, end: 8, value: '9' },
    { start: 18, end: 23, value: '000001' },
    { start: 24, end: 29, value: padLeft('6', 6) },
  ])

  return [headerArq, headerLote, segP, segQ, trailerLote, trailerArq].join('\n')
}

/** Detalhe CNAB400 BB mínimo (convênio ≤ 6). */
export function remessa400BBDetalhe(seq: number): string {
  return buildLine400([
    { start: 1, end: 1, value: '1' },
    { start: 2, end: 3, value: '02' },
    { start: 4, end: 17, value: padLeft('12345678000199', 14) },
    { start: 18, end: 21, value: padLeft('1234', 4) },
    { start: 22, end: 22, value: ' ' },
    { start: 23, end: 30, value: padLeft('12345', 8) },
    { start: 31, end: 31, value: '9' },
    { start: 32, end: 37, value: padLeft('123456', 6) },
    { start: 38, end: 62, value: pad('SEU-NUM-001', 25) },
    { start: 63, end: 74, value: padLeft('12345678901', 11) + '2' },
    { start: 75, end: 81, value: '0000   ' },
    { start: 82, end: 82, value: ' ' },
    { start: 83, end: 88, value: '   019' },
    { start: 89, end: 101, value: padLeft('', 13) },
    { start: 102, end: 106, value: pad('', 5) },
    { start: 107, end: 108, value: '17' },
    { start: 109, end: 110, value: '01' },
    { start: 111, end: 120, value: pad('FAT001', 10) },
    { start: 121, end: 126, value: '010825' },
    { start: 127, end: 139, value: padLeft('10000', 13) },
    { start: 140, end: 147, value: '0010000 ' },
    { start: 148, end: 150, value: '01N' },
    { start: 151, end: 156, value: '010825' },
    { start: 157, end: 160, value: '0000' },
    { start: 161, end: 173, value: padLeft('', 13) },
    { start: 174, end: 179, value: '000000' },
    { start: 180, end: 192, value: padLeft('', 13) },
    { start: 193, end: 205, value: padLeft('', 13) },
    { start: 206, end: 218, value: padLeft('', 13) },
    { start: 219, end: 220, value: '02' },
    { start: 221, end: 234, value: padLeft('12345678000199', 14) },
    { start: 235, end: 274, value: pad('CLIENTE TESTE LTDA', 37) + '   ' },
    { start: 275, end: 314, value: pad('RUA TESTE 100 CENTRO', 40) },
    { start: 315, end: 326, value: pad('CENTRO', 12) },
    { start: 327, end: 334, value: padLeft('01310100', 8) },
    { start: 335, end: 349, value: pad('SAO PAULO', 15) },
    { start: 350, end: 351, value: 'SP' },
    { start: 352, end: 391, value: pad('', 40) },
    { start: 392, end: 393, value: '00' },
    { start: 394, end: 394, value: ' ' },
    { start: 395, end: 400, value: padLeft(String(seq), 6) },
  ])
}

export function remessa400BB(): string {
  const header = buildLine400([
    { start: 1, end: 1, value: '0' },
    { start: 2, end: 2, value: '1' },
    { start: 3, end: 9, value: 'REMESSA' },
    { start: 10, end: 11, value: '01' },
    { start: 12, end: 26, value: pad('COBRANCA', 15) },
    { start: 27, end: 30, value: padLeft('1234', 4) },
    { start: 31, end: 31, value: ' ' },
    { start: 32, end: 39, value: padLeft('12345', 8) },
    { start: 40, end: 40, value: '9' },
    { start: 41, end: 46, value: padLeft('123456', 6) },
    { start: 47, end: 76, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 77, end: 79, value: '001' },
    { start: 80, end: 94, value: pad('BANCO DO BRASIL', 15) },
    { start: 95, end: 100, value: '010825' },
    { start: 101, end: 107, value: padLeft('1', 7) },
    { start: 108, end: 394, value: pad('', 287) },
    { start: 395, end: 400, value: padLeft('1', 6) },
  ])

  return [header, remessa400BBDetalhe(2), buildLine400([
    { start: 1, end: 1, value: '9' },
    { start: 2, end: 394, value: pad('', 393) },
    { start: 395, end: 400, value: padLeft('3', 6) },
  ])].join('\n')
}

/** Remessa CNAB240 mínima Banco do Brasil (layout v030). */
export function remessa240BB(): string {
  const headerArq = buildLine240([
    { start: 1, end: 3, value: '001' },
    { start: 4, end: 7, value: '0000' },
    { start: 8, end: 8, value: '0' },
    { start: 9, end: 17, value: pad('', 9) },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 32, value: padLeft('12345678000199', 14) },
    { start: 33, end: 41, value: padLeft('123456789', 9) },
    { start: 42, end: 45, value: '0014' },
    { start: 46, end: 47, value: '17' },
    { start: 48, end: 50, value: '019' },
    { start: 51, end: 52, value: '  ' },
    { start: 53, end: 57, value: padLeft('1234', 5) },
    { start: 58, end: 58, value: '0' },
    { start: 59, end: 70, value: padLeft('123456789012', 12) },
    { start: 71, end: 71, value: '9' },
    { start: 72, end: 72, value: ' ' },
    { start: 73, end: 102, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 103, end: 132, value: pad('BANCO DO BRASIL', 30) },
    { start: 133, end: 142, value: pad('', 10) },
    { start: 143, end: 143, value: '1' },
    { start: 144, end: 151, value: '01082025' },
    { start: 152, end: 157, value: '120000' },
    { start: 158, end: 163, value: padLeft('1', 6) },
    { start: 164, end: 166, value: '030' },
    { start: 167, end: 171, value: '00000' },
    { start: 172, end: 191, value: pad('', 20) },
    { start: 192, end: 211, value: padLeft('', 20) },
    { start: 212, end: 222, value: pad('', 11) },
    { start: 223, end: 225, value: 'CSP' },
    { start: 226, end: 228, value: '000' },
    { start: 229, end: 240, value: pad('', 12) },
  ])

  const headerLote = buildLine240([
    { start: 1, end: 3, value: '001' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '1' },
    { start: 9, end: 9, value: 'R' },
    { start: 10, end: 11, value: '01' },
    { start: 12, end: 13, value: '  ' },
    { start: 14, end: 16, value: '020' },
    { start: 17, end: 17, value: ' ' },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 33, value: padLeft('12345678000199', 15) },
    { start: 34, end: 42, value: padLeft('123456789', 9) },
    { start: 43, end: 46, value: '0014' },
    { start: 47, end: 48, value: '17' },
    { start: 49, end: 51, value: '019' },
    { start: 52, end: 53, value: '  ' },
    { start: 54, end: 58, value: padLeft('1234', 5) },
    { start: 59, end: 59, value: '0' },
    { start: 60, end: 71, value: padLeft('123456789012', 12) },
    { start: 72, end: 72, value: '9' },
    { start: 73, end: 73, value: ' ' },
    { start: 74, end: 103, value: pad('EMPRESA TESTE LTDA', 30) },
    { start: 184, end: 191, value: padLeft('1', 8) },
    { start: 192, end: 199, value: '01082025' },
    { start: 200, end: 207, value: padLeft('0', 8) },
  ])

  const segP = buildLine240([
    { start: 1, end: 3, value: '001' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '3' },
    { start: 9, end: 13, value: padLeft('1', 5) },
    { start: 14, end: 14, value: 'P' },
    { start: 15, end: 15, value: ' ' },
    { start: 16, end: 17, value: '01' },
    { start: 18, end: 22, value: padLeft('1234', 5) },
    { start: 23, end: 23, value: '0' },
    { start: 24, end: 35, value: padLeft('123456789012', 12) },
    { start: 36, end: 36, value: '9' },
    { start: 37, end: 37, value: ' ' },
    { start: 38, end: 57, value: pad('12345678901234567890', 20) },
    { start: 58, end: 58, value: '7' },
    { start: 59, end: 59, value: '1' },
    { start: 60, end: 60, value: '1' },
    { start: 61, end: 62, value: '11' },
    { start: 63, end: 77, value: pad('FAT001', 15) },
    { start: 78, end: 85, value: '01082025' },
    { start: 86, end: 100, value: padLeft('10000', 15) },
    { start: 101, end: 106, value: '00000 ' },
    { start: 107, end: 108, value: '02' },
    { start: 109, end: 109, value: 'N' },
    { start: 110, end: 117, value: '01082025' },
    { start: 118, end: 118, value: '3' },
    { start: 119, end: 126, value: padLeft('0', 8) },
    { start: 127, end: 141, value: padLeft('', 15) },
    { start: 142, end: 142, value: '0' },
    { start: 143, end: 150, value: padLeft('0', 8) },
    { start: 151, end: 165, value: padLeft('', 15) },
    { start: 166, end: 180, value: padLeft('', 15) },
    { start: 181, end: 195, value: padLeft('', 15) },
    { start: 196, end: 220, value: pad('SEU-NUM-001', 25) },
    { start: 221, end: 221, value: '3' },
    { start: 222, end: 223, value: '00' },
    { start: 224, end: 224, value: '0' },
    { start: 225, end: 227, value: '000' },
    { start: 228, end: 229, value: '09' },
    { start: 230, end: 239, value: padLeft('', 10) },
    { start: 240, end: 240, value: ' ' },
  ])

  const segQ = buildLine240([
    { start: 1, end: 3, value: '001' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '3' },
    { start: 9, end: 13, value: padLeft('2', 5) },
    { start: 14, end: 14, value: 'Q' },
    { start: 15, end: 15, value: ' ' },
    { start: 16, end: 17, value: '01' },
    { start: 18, end: 18, value: '2' },
    { start: 19, end: 33, value: padLeft('12345678000199', 15) },
    { start: 34, end: 73, value: pad('CLIENTE TESTE LTDA', 40) },
    { start: 74, end: 113, value: pad('RUA TESTE 100', 40) },
    { start: 114, end: 128, value: pad('CENTRO', 15) },
    { start: 129, end: 136, value: padLeft('01310100', 8) },
    { start: 137, end: 151, value: pad('SAO PAULO', 15) },
    { start: 152, end: 153, value: 'SP' },
    { start: 154, end: 154, value: '0' },
    { start: 155, end: 169, value: padLeft('0', 15) },
    { start: 170, end: 209, value: pad('', 40) },
    { start: 210, end: 212, value: '000' },
  ])

  const trailerLote = buildLine240([
    { start: 1, end: 3, value: '001' },
    { start: 4, end: 7, value: '0001' },
    { start: 8, end: 8, value: '5' },
    { start: 18, end: 23, value: padLeft('4', 6) },
  ])

  const trailerArq = buildLine240([
    { start: 1, end: 3, value: '001' },
    { start: 4, end: 7, value: '9999' },
    { start: 8, end: 8, value: '9' },
    { start: 18, end: 23, value: '000001' },
    { start: 24, end: 29, value: padLeft('6', 6) },
  ])

  return [headerArq, headerLote, segP, segQ, trailerLote, trailerArq].join('\n')
}

/** CNAB240 com COMPE Vórtx (310) — ACBr só c400. */
export function remessa240VortxUnsupported(): string {
  return remessa240Bradesco().replace(/^237/gm, '310')
}
