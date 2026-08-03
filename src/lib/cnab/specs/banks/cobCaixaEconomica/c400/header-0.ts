import type { RecordSpec } from '../../../../types'

/** Header CNAB400 Caixa — ACBrBancoCaixa.GerarRegistroHeader400 */
export const CAIXA_C400_HEADER_0: RecordSpec = {
  id: 'cobCaixaEconomica-c400-header-0',
  layout: 'c400',
  recordType: '0',
  label: 'Header Caixa CNAB400',
  lineLength: 400,
  bankId: 'cobCaixaEconomica',
  acbrRef: 'ACBrBancoCaixa.pas:GerarRegistroHeader400',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['0'], issueCode: 'F400_HDR_TIPO_REG' },
    { id: 'tipo_arquivo', label: 'Tipo arquivo', start: 2, end: 2, type: 'enum', enum: ['1'], issueCode: 'F400_HDR_TIPO_ARQ' },
    { id: 'literal_remessa', label: 'Literal REMESSA', start: 3, end: 9, type: 'alpha', issueCode: 'F400_HDR_LITERAL' },
    { id: 'codigo_servico', label: 'Código serviço', start: 10, end: 11, type: 'enum', enum: ['01'] },
    { id: 'literal_servico', label: 'Literal serviço', start: 12, end: 26, type: 'alpha' },
    { id: 'agencia', label: 'Agência', start: 27, end: 30, type: 'numeric', issueCode: 'F400_CX_AG' },
    { id: 'codigo_cedente', label: 'Código cedente', start: 31, end: 37, type: 'alphanumeric', issueCode: 'F400_CX_CED' },
    { id: 'brancos_38', label: 'Brancos', start: 38, end: 46, type: 'filler', required: false },
    { id: 'nome_empresa', label: 'Nome empresa', start: 47, end: 76, type: 'alpha' },
    { id: 'codigo_banco', label: 'Código banco', start: 77, end: 79, type: 'numeric', issueCode: 'F400_HDR_BANCO' },
    { id: 'nome_banco', label: 'Nome banco', start: 80, end: 94, type: 'alpha' },
    { id: 'data_geracao', label: 'Data geração', start: 95, end: 100, type: 'date', format: 'DDMMAA', issueCode: 'F400_HDR_DATA' },
    { id: 'versao_layout', label: 'Versão layout', start: 101, end: 103, type: 'alphanumeric', required: false },
    { id: 'brancos_104', label: 'Brancos', start: 104, end: 389, type: 'filler', required: false },
    { id: 'numero_remessa', label: 'Nº remessa', start: 390, end: 394, type: 'numeric', pad: 'numeric' },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_HDR_SEQ' },
  ],
}
