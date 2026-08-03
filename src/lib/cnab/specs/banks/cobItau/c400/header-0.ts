import type { RecordSpec } from '../../../../types'

/** Header CNAB400 Itaú — ACBrBancoItau.GerarRegistroHeader400 */
export const ITAU_C400_HEADER_0: RecordSpec = {
  id: 'cobItau-c400-header-0',
  layout: 'c400',
  recordType: '0',
  label: 'Header Itaú CNAB400',
  lineLength: 400,
  bankId: 'cobItau',
  acbrRef: 'ACBrBancoItau.pas:GerarRegistroHeader400',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['0'], issueCode: 'F400_HDR_TIPO_REG' },
    { id: 'tipo_arquivo', label: 'Tipo arquivo', start: 2, end: 2, type: 'enum', enum: ['1'], issueCode: 'F400_HDR_TIPO_ARQ' },
    { id: 'literal_remessa', label: 'Literal REMESSA', start: 3, end: 9, type: 'alpha', issueCode: 'F400_HDR_LITERAL' },
    { id: 'codigo_servico', label: 'Código serviço', start: 10, end: 11, type: 'enum', enum: ['01'] },
    { id: 'literal_servico', label: 'Literal serviço', start: 12, end: 26, type: 'alpha' },
    { id: 'agencia', label: 'Agência', start: 27, end: 30, type: 'numeric', issueCode: 'F400_ITAU_AG' },
    { id: 'zeros_agencia', label: 'Complemento agência', start: 31, end: 32, type: 'enum', enum: ['00'] },
    { id: 'conta', label: 'Conta', start: 33, end: 37, type: 'numeric', issueCode: 'F400_ITAU_CONTA' },
    { id: 'dv_conta', label: 'DV conta', start: 38, end: 38, type: 'alphanumeric', required: false },
    { id: 'brancos_empresa', label: 'Brancos', start: 39, end: 46, type: 'filler', required: false },
    { id: 'nome_empresa', label: 'Nome empresa', start: 47, end: 76, type: 'alpha' },
    { id: 'codigo_banco', label: 'Código banco', start: 77, end: 79, type: 'numeric', issueCode: 'F400_HDR_BANCO' },
    { id: 'nome_banco', label: 'Nome banco', start: 80, end: 94, type: 'alpha' },
    { id: 'data_geracao', label: 'Data geração', start: 95, end: 100, type: 'date', format: 'DDMMAA', issueCode: 'F400_HDR_DATA' },
    { id: 'brancos_101', label: 'Brancos', start: 101, end: 394, type: 'filler', required: false },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_HDR_SEQ' },
  ],
}
