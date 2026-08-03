/** Ocorrências remessa CNAB400 — Bradesco (ACBr TipoOcorrenciaToCodRemessa c400) */
export const BRADESCO_REMESSA_400 = [
  '01', // Remessa / Entrada
  '02', // Pedido de baixa
  '03', // Pedido de protesto falimentar
  '04', // Concessão abatimento
  '05', // Cancelamento abatimento
  '06', // Alteração vencimento
  '07', // Concessão desconto
  '08', // Cancelamento desconto
  '09', // Protestar
  '10', // Sustar protesto
  '11', // Dispensa juros
  '12', // Alteração nome/endereço sacado
  '31', // Alteração outros dados
  '34', // Baixa por ter sido pago direto
  '35', // Cancelamento instruções
  '37', // Alteração vencimento sustando protesto
  '38', // Cedente não concorda
  '39', // Cancelamento protesto
  '40', // Alteração controle participante
  '41', // Cancelar sustação protesto
  '42', // Alteração taxa permanência
  '43', // Alteração prazo limite recebimento
  '44', // Dispensa prazo limite
  '45', // Pedido negativação
  '46', // Excluir negativação
  '47', // Alteração valor nominal
  '48', // Alteração valor mínimo
  '49', // Alteração valor máximo
]

/** Códigos movimento remessa CNAB240 — Bradesco/FEBRABAN cobrança */
export const BRADESCO_REMESSA_240 = [
  '01', // Entrada título
  '02', // Pedido baixa
  '04', // Concessão abatimento
  '05', // Cancelamento abatimento
  '06', // Alteração vencimento
  '07', // Concessão desconto
  '08', // Cancelamento desconto
  '09', // Protestar
  '10', // Sustar protesto
  '11', // Dispensa juros
  '12', // Alteração sacado
  '31', // Alteração outros dados
  '40', // Alteração controle participante
  '47', // Alteração valor nominal
]

/** Ocorrências remessa CNAB400 — Itaú (ACBr TipoOcorrenciaToCodRemessa c400) */
export const ITAU_REMESSA_400 = [
  '01', // Remessa / Entrada
  '02', // Pedido de baixa
  '04', // Concessão abatimento
  '05', // Cancelamento abatimento
  '06', // Alteração vencimento
  '07', // Alteração uso empresa
  '08', // Alteração seu número
  '09', // Protestar
  '10', // Não protestar / sustar
  '11', // Protesto falimentar
  '18', // Sustar protesto
  '31', // Alteração outros dados
  '34', // Baixa por pagamento direto
  '35', // Cancelamento instruções
  '37', // Alteração vencimento sustando protesto
  '38', // Cedente não concorda
  '47', // Dispensa juros
  '71', // Bolecode híbrido
]

/** Códigos movimento remessa CNAB240 — Itaú */
export const ITAU_REMESSA_240 = [
  '01', // Entrada título
  '02', // Pedido baixa
  '04', // Concessão abatimento
  '05', // Cancelamento abatimento
  '06', // Alteração vencimento
  '10', // Cancelar instrução protesto
  '18', // Sustar protesto
]

/** Ocorrências remessa CNAB400 — Banco do Brasil */
export const BB_REMESSA_400 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '31', '32', '36', '38', '39', '40',
]

/** Códigos movimento remessa CNAB240 — Banco do Brasil */
export const BB_REMESSA_240 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '12', '31',
]

/** Ocorrências remessa CNAB400 genéricas FEBRABAN (fallback demais bancos) */
export const FEBRABAN_REMESSA_400 = [
  ...new Set([...BRADESCO_REMESSA_400, ...ITAU_REMESSA_400, ...BB_REMESSA_400]),
]

const ENUM_REFS: Record<string, string[]> = {
  'bradesco-remessa-400': BRADESCO_REMESSA_400,
  'bradesco-remessa-240': BRADESCO_REMESSA_240,
  'itau-remessa-400': ITAU_REMESSA_400,
  'itau-remessa-240': ITAU_REMESSA_240,
  'bb-remessa-400': BB_REMESSA_400,
  'bb-remessa-240': BB_REMESSA_240,
  'febraban-remessa-400': FEBRABAN_REMESSA_400,
}

export function getEnumRef(ref: string): string[] | undefined {
  return ENUM_REFS[ref]
}
