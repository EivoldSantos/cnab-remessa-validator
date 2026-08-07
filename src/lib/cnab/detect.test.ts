import { describe, expect, it } from 'vitest'
import { detectLayout, detectRemessa, splitLines } from './detect'
import { remessa240Bradesco, remessa400Bradesco } from './fixtures'

describe('detect', () => {
  it('detecta CNAB240 dominante (240 colunas)', () => {
    const result = detectRemessa(remessa240Bradesco())
    expect(result.layout).toBe('c240')
    expect(result.lineLength).toBe(240)
    expect(result.bankCode).toBe('237')
    expect(result.kind).toBe('remessa')
  })

  it('detecta CNAB400 dominante (400 colunas)', () => {
    const result = detectRemessa(remessa400Bradesco())
    expect(result.layout).toBe('c400')
    expect(result.lineLength).toBe(400)
    expect(result.bankCode).toBe('237')
  })

  it('tolerância de borda 241 colunas como c240', () => {
    const content = remessa240Bradesco()
      .split('\n')
      .map((l) => l + ' ')
      .join('\n')
    const result = detectLayout(splitLines(content))
    expect(result.layout).toBe('c240')
  })

  it('tolerância de borda 239 colunas como c240', () => {
    const content = remessa240Bradesco()
      .split('\n')
      .map((l) => l.slice(0, 239))
      .join('\n')
    const result = detectLayout(splitLines(content))
    expect(result.layout).toBe('c240')
  })

  it('tolerância de borda 401 colunas como c400', () => {
    const content = remessa400Bradesco()
      .split('\n')
      .map((l) => l + ' ')
      .join('\n')
    const result = detectLayout(splitLines(content))
    expect(result.layout).toBe('c400')
  })

  it('tolerância de borda 399 colunas como c400', () => {
    const content = remessa400Bradesco()
      .split('\n')
      .map((l) => l.slice(0, 399))
      .join('\n')
    const result = detectLayout(splitLines(content))
    expect(result.layout).toBe('c400')
  })

  it('retorna layout null para arquivo vazio', () => {
    const result = detectLayout(splitLines(''))
    expect(result.layout).toBeNull()
    expect(result.lines).toHaveLength(0)
  })

  it('ignora linhas vazias no split', () => {
    const content = remessa400Bradesco() + '\n\n\n'
    const lines = splitLines(content)
    expect(lines).toHaveLength(3)
  })
})
