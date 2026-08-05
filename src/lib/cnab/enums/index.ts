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
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '31', '40', '47',
]

/** Ocorrências remessa CNAB400 — Itaú */
export const ITAU_REMESSA_400 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '18', '31', '34', '35', '37', '38', '47', '71',
]

export const ITAU_REMESSA_240 = ['01', '02', '04', '05', '06', '10', '18']

export const BB_REMESSA_400 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '31', '32', '36', '38', '39', '40',
]

export const BB_REMESSA_240 = ['01', '02', '04', '05', '06', '07', '08', '09', '10', '12', '31']

export const SANTANDER_REMESSA_400 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '18', '47', '48', '49', '98',
]

export const SANTANDER_REMESSA_240 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '18', '31', '47', '48', '49', '98',
]

export const CAIXA_REMESSA_400 = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13',
]

export const CAIXA_REMESSA_240 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '31', '33', '34', '37', '47',
]

export const SICREDI_REMESSA_400 = [
  '01', '02', '04', '05', '06', '09', '18', '19', '31', '45', '75', '76',
]

export const SICREDI_REMESSA_240 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '16', '17', '31', '45', '75', '76',
]

export const SICOOB_REMESSA_400 = [
  '01', '02', '04', '05', '06', '08', '09', '10', '11', '12', '31', '34',
]

export const SICOOB_REMESSA_240 = [
  '01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '19', '20', '23', '31', '45',
]

export const FEBRABAN_REMESSA_400 = [
  ...new Set([
    ...BRADESCO_REMESSA_400,
    ...ITAU_REMESSA_400,
    ...BB_REMESSA_400,
    ...SANTANDER_REMESSA_400,
    ...CAIXA_REMESSA_400,
    ...SICREDI_REMESSA_400,
    ...SICOOB_REMESSA_400,
  ]),
]

/** Ocorrências retorno CNAB400 — Bradesco (ACBr CodOcorrenciaToTipo) */
export const BRADESCO_RETORNO_400 = [
  '02', '03', '06', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '27', '28', '29', '30', '32', '33', '34', '35', '40',
  '55', '66', '68', '69', '73', '74',
]

/** Códigos movimento retorno CNAB240 — Bradesco */
export const BRADESCO_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54', '66', '73',
]

/** Ocorrências retorno CNAB400 — Itaú */
export const ITAU_RETORNO_400 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
  '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72',
  '73', '74', '75', '76',
]

export const ITAU_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54', '94',
]

export const BB_RETORNO_400 = [
  '02', '03', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
  '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
  '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58',
  '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72',
]

export const BB_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54',
]

export const SANTANDER_RETORNO_400 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
  '45', '46', '47', '48', '49', '51', '52', '53',
]

export const SANTANDER_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54',
]

export const CAIXA_RETORNO_400 = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
  '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28',
  '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42',
  '43', '44', '45', '46', '47', '48', '49', '50',
]

export const CAIXA_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54',
]

export const SICREDI_RETORNO_400 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
  '44', '45', '46', '47', '48', '49', '50',
]

export const SICREDI_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54',
]

export const SICOOB_RETORNO_400 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
  '44', '45', '46', '47', '48', '49', '50',
]

export const SICOOB_RETORNO_240 = [
  '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '17',
  '19', '20', '23', '24', '25', '26', '27', '28', '29', '30', '33', '34', '35', '36',
  '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54',
]

export const FEBRABAN_RETORNO_400 = [
  ...new Set([
    ...BRADESCO_RETORNO_400,
    ...ITAU_RETORNO_400,
    ...BB_RETORNO_400,
    ...SANTANDER_RETORNO_400,
    ...CAIXA_RETORNO_400,
    ...SICREDI_RETORNO_400,
    ...SICOOB_RETORNO_400,
  ]),
]

export const FEBRABAN_RETORNO_240 = [
  ...new Set([
    ...BRADESCO_RETORNO_240,
    ...ITAU_RETORNO_240,
    ...BB_RETORNO_240,
    ...SANTANDER_RETORNO_240,
    ...CAIXA_RETORNO_240,
    ...SICREDI_RETORNO_240,
    ...SICOOB_RETORNO_240,
  ]),
]

const ENUM_REFS: Record<string, string[]> = {
  'bradesco-remessa-400': BRADESCO_REMESSA_400,
  'bradesco-remessa-240': BRADESCO_REMESSA_240,
  'itau-remessa-400': ITAU_REMESSA_400,
  'itau-remessa-240': ITAU_REMESSA_240,
  'bb-remessa-400': BB_REMESSA_400,
  'bb-remessa-240': BB_REMESSA_240,
  'santander-remessa-400': SANTANDER_REMESSA_400,
  'santander-remessa-240': SANTANDER_REMESSA_240,
  'caixa-remessa-400': CAIXA_REMESSA_400,
  'caixa-remessa-240': CAIXA_REMESSA_240,
  'sicredi-remessa-400': SICREDI_REMESSA_400,
  'sicredi-remessa-240': SICREDI_REMESSA_240,
  'sicoob-remessa-400': SICOOB_REMESSA_400,
  'sicoob-remessa-240': SICOOB_REMESSA_240,
  'febraban-remessa-400': FEBRABAN_REMESSA_400,
  'bradesco-retorno-400': BRADESCO_RETORNO_400,
  'bradesco-retorno-240': BRADESCO_RETORNO_240,
  'itau-retorno-400': ITAU_RETORNO_400,
  'itau-retorno-240': ITAU_RETORNO_240,
  'bb-retorno-400': BB_RETORNO_400,
  'bb-retorno-240': BB_RETORNO_240,
  'santander-retorno-400': SANTANDER_RETORNO_400,
  'santander-retorno-240': SANTANDER_RETORNO_240,
  'caixa-retorno-400': CAIXA_RETORNO_400,
  'caixa-retorno-240': CAIXA_RETORNO_240,
  'sicredi-retorno-400': SICREDI_RETORNO_400,
  'sicredi-retorno-240': SICREDI_RETORNO_240,
  'sicoob-retorno-400': SICOOB_RETORNO_400,
  'sicoob-retorno-240': SICOOB_RETORNO_240,
  'febraban-retorno-400': FEBRABAN_RETORNO_400,
  'febraban-retorno-240': FEBRABAN_RETORNO_240,
}

export function getEnumRef(ref: string): string[] | undefined {
  return ENUM_REFS[ref]
}
