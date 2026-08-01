import type { BankDefinition, CnabLayout } from './types'

/**
 * Catálogo ACBr — TACBrTipoCobranca + factory SetTipoCobranca (ACBrBoleto.pas).
 * layouts default: c400 + c240; só-c400 quando ACBr levanta exceção em 240.
 */
export const ACBR_BANKS: BankDefinition[] = [
  {
    id: 'cobBancoDoBrasil',
    nome: 'Banco do Brasil',
    compe: '001',
    layouts: ['c400', 'c240'],
    aliases: ['cobBancoDoBrasilAPI', 'cobBancoDoBrasilWS'],
  },
  {
    id: 'cobBancoDoBrasilSICOOB',
    nome: 'Banco do Brasil (SICOOB)',
    compe: '001',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoDaAmazonia',
    nome: 'Banco da Amazônia',
    compe: '003',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoDoNordeste',
    nome: 'Banco do Nordeste',
    compe: '004',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobSantander',
    nome: 'Santander',
    compe: '033',
    layouts: ['c400', 'c240'],
    compeExtras: ['353', '008'],
  },
  {
    id: 'cobBanestes',
    nome: 'Banestes',
    compe: '021',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBanrisul',
    nome: 'Banrisul',
    compe: '041',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBanese',
    nome: 'Banese',
    compe: '047',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBRB',
    nome: 'BRB',
    compe: '070',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoInter',
    nome: 'Banco Inter',
    compe: '077',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobUniprimeNortePR',
    nome: 'Uniprime Norte PR / Sisprime',
    compe: '084',
    layouts: ['c400', 'c240'],
    aliases: ['cobBancoSisprime'],
  },
  {
    id: 'cobBancoCECRED',
    nome: 'CECRED / Ailos',
    compe: '085',
    layouts: ['c400', 'c240'],
    aliases: ['cobBancoAilos'],
  },
  {
    id: 'cobBancoCredisan',
    nome: 'Credisan',
    compe: '089',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobUnicredRS',
    nome: 'Unicred RS',
    compe: '091',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobCrediSIS',
    nome: 'CrediSIS',
    compe: '097',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobUniprime',
    nome: 'Uniprime',
    compe: '099',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobCaixaEconomica',
    nome: 'Caixa Econômica',
    compe: '104',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobCaixaSicob',
    nome: 'Caixa SICOB',
    compe: '104',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoBocomBBM',
    nome: 'Banco Bocom BBM',
    compe: '107',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoCresolSCRS',
    nome: 'Cresol SCRS',
    compe: '133',
    layouts: ['c400', 'c240'],
    notes: 'Layout compartilhado com Bradesco (133 + 237)',
  },
  {
    id: 'cobBancoCresol',
    nome: 'Cresol',
    compe: '133',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobUnicredES',
    nome: 'Unicred ES',
    compe: '136',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobUnicredSC',
    nome: 'Unicred SC',
    compe: '136',
    layouts: ['c400', 'c240'],
    notes: 'Layout compartilhado com Bradesco (136 + 237)',
  },
  {
    id: 'cobBancoPefisa',
    nome: 'Pefisa',
    compe: '174',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBTGPactual',
    nome: 'BTG Pactual',
    compe: '208',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoOriginal',
    nome: 'Banco Original',
    compe: '212',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBS2',
    nome: 'BS2',
    compe: '218',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoFibra',
    nome: 'Banco Fibra',
    compe: '224',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBradesco',
    nome: 'Bradesco',
    compe: '237',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBicBanco',
    nome: 'BIC Banco',
    compe: '237',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBradescoSICOOB',
    nome: 'Bradesco SICOOB',
    compe: '237',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoAthenaBradesco',
    nome: 'Athena Bradesco',
    compe: '237',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoAlfa',
    nome: 'Banco Alfa',
    compe: '025',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobMoneyPlus',
    nome: 'Money Plus (Bradesco)',
    compe: '274',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoVortx',
    nome: 'Vórtx',
    compe: '310',
    layouts: ['c400'],
    notes: 'ACBr: CNAB240 não permitido',
  },
  {
    id: 'cobBancoSulcredi',
    nome: 'Sulcredi',
    compe: '322',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoQITechSCD',
    nome: 'QI Tech SCD',
    compe: '329',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoC6',
    nome: 'C6 Bank',
    compe: '336',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobItau',
    nome: 'Itaú',
    compe: '341',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoMercantil',
    nome: 'Mercantil',
    compe: '389',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobHSBC',
    nome: 'HSBC',
    compe: '399',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoCora',
    nome: 'Cora',
    compe: '403',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoSafra',
    nome: 'Safra',
    compe: '422',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobSafraBradesco',
    nome: 'Safra Bradesco',
    compe: '422',
    layouts: ['c400', 'c240'],
    notes: '422 + 237',
  },
  {
    id: 'cobBancoUY3',
    nome: 'UY3',
    compe: '457',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoAsaas',
    nome: 'Asaas',
    compe: '461',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoIndustrialBrasil',
    nome: 'Industrial do Brasil',
    compe: '604',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoRendimento',
    nome: 'Rendimento',
    compe: '633',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoSofisa',
    nome: 'Sofisa',
    compe: '637',
    layouts: ['c400'],
    notes: 'ACBr: c240 não implementado',
  },
  {
    id: 'cobBancoSofisaSantander',
    nome: 'Sofisa Santander',
    compe: '637',
    layouts: ['c400'],
    notes: 'ACBr: c240 não implementado',
  },
  {
    id: 'cobBancoSofisaItau',
    nome: 'Sofisa Itaú',
    compe: '637',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoPine',
    nome: 'Pine',
    compe: '643',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoPineBradesco',
    nome: 'Pine Bradesco',
    compe: '643',
    layouts: ['c400', 'c240'],
    notes: '643 + 237',
  },
  {
    id: 'cobBancoVotorantim',
    nome: 'Votorantim',
    compe: '655',
    layouts: ['c400'],
    notes: 'ACBr: CNAB 240 não implementado',
  },
  {
    id: 'cobBancoABCBrasil',
    nome: 'ABC Brasil',
    compe: '246',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobCitiBank',
    nome: 'CitiBank',
    compe: '745',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobDaycoval',
    nome: 'Daycoval',
    compe: '707',
    layouts: ['c400', 'c240'],
    notes: 'ACBr factory comenta 745; COMPE oficial Daycoval = 707',
  },
  {
    id: 'cobSicred',
    nome: 'Sicredi',
    compe: '748',
    layouts: ['c400', 'c240'],
  },
  {
    id: 'cobBancoob',
    nome: 'Bancoob / Sicoob',
    compe: '756',
    layouts: ['c400', 'c240'],
    aliases: ['cobBancoSicoob'],
  },
  {
    id: 'cobPenseBankAPI',
    nome: 'PenseBank (API)',
    compe: '',
    layouts: ['c400', 'c240'],
    notes: 'Principalmente API; CNAB conforme configuração',
  },
]

const byCompe = new Map<string, BankDefinition[]>()
const byId = new Map<string, BankDefinition>()

for (const bank of ACBR_BANKS) {
  byId.set(bank.id, bank)
  for (const alias of bank.aliases ?? []) {
    byId.set(alias, bank)
  }
  const codes = [bank.compe, ...(bank.compeExtras ?? [])].filter(Boolean)
  for (const code of codes) {
    const list = byCompe.get(code) ?? []
    list.push(bank)
    byCompe.set(code, list)
  }
}

export function findBanksByCompe(compe: string): BankDefinition[] {
  const normalized = compe.replace(/\D/g, '').padStart(3, '0')
  return byCompe.get(normalized) ?? []
}

export function findBankById(id: string): BankDefinition | undefined {
  return byId.get(id)
}

export function bankSupportsLayout(bank: BankDefinition, layout: CnabLayout): boolean {
  return bank.layouts.includes(layout)
}

export function listAllBanks(): BankDefinition[] {
  return ACBR_BANKS
}

export function formatBankLabel(banks: BankDefinition[]): string {
  if (banks.length === 0) return 'Desconhecido'
  if (banks.length === 1) return banks[0].nome
  return banks.map((b) => b.nome).join(' / ')
}
