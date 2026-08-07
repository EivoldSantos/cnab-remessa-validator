import { describe, expect, it } from 'vitest'
import { splitLines } from './detect'
import { lineTipo400, parse400 } from './parse-400'
import { remessa400Bradesco } from './fixtures'
import { field } from './positions'
import { CNAB400 } from './positions'

describe('parse-400', () => {
  it('separa header, detalhe e trailer', () => {
    const lines = splitLines(remessa400Bradesco())
    const parsed = parse400(lines)
    expect(parsed.header?.index).toBe(1)
    expect(parsed.details).toHaveLength(1)
    expect(parsed.trailer?.index).toBe(3)
    expect(parsed.other).toHaveLength(0)
  })

  it('identifica tipos de registro 0/1/9', () => {
    const lines = splitLines(remessa400Bradesco())
    expect(lineTipo400(lines[0]!.raw)).toBe('0')
    expect(lineTipo400(lines[1]!.raw)).toBe('1')
    expect(lineTipo400(lines[2]!.raw)).toBe('9')
  })

  it('classifica registro 1 como detalhe', () => {
    const lines = splitLines(remessa400Bradesco())
    const parsed = parse400(lines)
    expect(field(parsed.details[0]!.raw, CNAB400.registro)).toBe('1')
  })

  it('coloca linhas extras sem header conhecido em other', () => {
    const lines = splitLines(remessa400Bradesco())
    lines.splice(1, 0, { index: 2, raw: 'X'.padEnd(400, ' '), length: 400 })
    const parsed = parse400(lines)
    expect(parsed.other.length).toBeGreaterThan(0)
  })
})
