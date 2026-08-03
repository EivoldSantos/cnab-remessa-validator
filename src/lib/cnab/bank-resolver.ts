import type { BankDefinition, CnabLayout } from './types'
import { field } from './positions'

/**
 * Escolhe bankId principal quando várias variantes ACBr compartilham o mesmo COMPE.
 */
export function resolvePrimaryBankId(
  banks: BankDefinition[],
  layout: CnabLayout | null,
  lines: Array<{ raw: string }>,
): string {
  if (banks.length === 1) return banks[0].id

  const compe = banks[0]?.compe
  if (compe === '104' && layout && lines.length > 0) {
    const header = lines[0]?.raw ?? ''
    if (layout === 'c400' && header.length >= 42) {
      const cedenteBlock = header.slice(26, 42)
      if (/^\d{16}$/.test(cedenteBlock)) {
        const sicob = banks.find((b) => b.id === 'cobCaixaSicob')
        if (sicob) return sicob.id
      }
      const sigcb = banks.find((b) => b.id === 'cobCaixaEconomica')
      if (sigcb) return sigcb.id
    }
    if (layout === 'c240' && header.length >= 166) {
      const versao = field(header, [164, 166])
      if (versao === '050') {
        const sigcb = banks.find((b) => b.id === 'cobCaixaEconomica')
        if (sigcb) return sigcb.id
      }
      const sicob = banks.find((b) => b.id === 'cobCaixaSicob')
      if (sicob) return sicob.id
    }
  }

  return banks[0].id
}

/** @internal exposto para testes */
export function _disambiguateCaixa400(header: string): 'cobCaixaSicob' | 'cobCaixaEconomica' {
  const cedenteBlock = header.slice(26, 42)
  return /^\d{16}$/.test(cedenteBlock) ? 'cobCaixaSicob' : 'cobCaixaEconomica'
}

/** @internal exposto para testes */
export function _disambiguateCaixa240(header: string): 'cobCaixaSicob' | 'cobCaixaEconomica' {
  const versao = field(header, [164, 166])
  return versao === '050' ? 'cobCaixaEconomica' : 'cobCaixaSicob'
}
