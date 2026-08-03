/**
 * Mapeamento bankId ACBr → layout canônico com specs nível B.
 * Fonte: ACBrBoleto.pas SetTipoCobranca + layouts CNAB de remessa.
 */
export const BANK_LAYOUT_CANONICAL: Record<string, string> = {
  // Bradesco (237)
  cobBradesco: 'cobBradesco',
  cobBradescoSICOOB: 'cobBradesco',
  cobBancoAthenaBradesco: 'cobBradesco',
  cobBicBanco: 'cobBradesco',
  cobBancoPineBradesco: 'cobBradesco',
  cobSafraBradesco: 'cobBradesco',
  cobBancoCresolSCRS: 'cobBradesco',
  cobUnicredSC: 'cobBradesco',
  cobBancoBocomBBM: 'cobBradesco',
  cobBancoCresol: 'cobBradesco',
  cobBancoUY3: 'cobBradesco',
  cobBancoQITechSCD: 'cobBradesco',
  cobMoneyPlus: 'cobBradesco',

  // Itaú (341)
  cobItau: 'cobItau',
  cobBancoSofisaItau: 'cobItau',

  // Banco do Brasil (001)
  cobBancoDoBrasil: 'cobBancoDoBrasil',
  cobBancoDoBrasilSICOOB: 'cobBancoDoBrasil',
  cobBancoDoBrasilAPI: 'cobBancoDoBrasil',
  cobBancoDoBrasilWS: 'cobBancoDoBrasil',
  cobPenseBankAPI: 'cobBancoDoBrasil',

  // Santander (033)
  cobSantander: 'cobSantander',
  cobBancoSofisaSantander: 'cobSantander',

  // Caixa SIGCB (104)
  cobCaixaEconomica: 'cobCaixaEconomica',

  // Caixa SICOB (104)
  cobCaixaSicob: 'cobCaixaSicob',

  // Sicredi (748)
  cobSicred: 'cobSicred',

  // Sicoob (756)
  cobBancoob: 'cobBancoSicoob',
  cobBancoSicoob: 'cobBancoSicoob',
}

export function resolveCanonicalBankId(bankId?: string): string | undefined {
  if (!bankId) return undefined
  return BANK_LAYOUT_CANONICAL[bankId]
}

export function listBanksForCanonical(canonicalId: string): string[] {
  return Object.entries(BANK_LAYOUT_CANONICAL)
    .filter(([, canonical]) => canonical === canonicalId)
    .map(([id]) => id)
}
