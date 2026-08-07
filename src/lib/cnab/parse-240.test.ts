import { describe, expect, it } from 'vitest'
import { splitLines } from './detect'
import { getPrimaryLote, parse240 } from './parse-240'
import { remessa240Bradesco, remessa240MultiLote, retorno240MultiLote } from './fixtures'
import { validateRemessa } from './validate'
import { validateRetorno } from './validate-retorno'

describe('parse-240', () => {
  it('agrupa lote único em lotes[]', () => {
    const parsed = parse240(splitLines(remessa240Bradesco()))
    expect(parsed.lotes).toHaveLength(1)
    expect(parsed.lotes[0]?.details).toHaveLength(2)
    expect(getPrimaryLote(parsed)?.headerLote.index).toBe(2)
  })

  it('parseia 2 lotes sem sobrescrever header/trailer anteriores', () => {
    const parsed = parse240(splitLines(remessa240MultiLote()))
    expect(parsed.lotes).toHaveLength(2)
    expect(parsed.lotes[0]?.details).toHaveLength(2)
    expect(parsed.lotes[1]?.details).toHaveLength(2)
    expect(parsed.details).toHaveLength(4)
    expect(parsed.lotes[0]?.trailerLote?.index).toBe(5)
    expect(parsed.lotes[1]?.trailerLote?.index).toBe(9)
    expect(getPrimaryLote(parsed)).toBe(parsed.lotes[0])
  })

  it('valida remessa multi-lote com contadores por lote (nível A)', () => {
    const result = validateRemessa(remessa240MultiLote(), { level: 'A' })
    expect(result.ok).toBe(true)
    expect(result.summary.titleEstimate).toBe(2)
    expect(result.issues.some((i) => i.code === 'T240_LOTE_COUNT')).toBe(false)
  })

  it('valida retorno multi-lote com contadores por lote (nível A)', () => {
    const result = validateRetorno(retorno240MultiLote(), { level: 'A' })
    expect(result.ok).toBe(true)
    expect(result.summary.titleEstimate).toBe(2)
    expect(result.issues.some((i) => i.code === 'T240_LOTE_COUNT')).toBe(false)
  })
})
