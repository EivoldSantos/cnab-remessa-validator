import type { RecordSpec } from '../../../../types'

/** Header CNAB400 Sicredi — ACBrBancoSicredi.GerarRegistroHeader400 */
export const SICREDI_C400_HEADER_0: RecordSpec = {
  id: 'cobSicred-c400-header-0',
  layout: 'c400',
  recordType: '0',
  label: 'Header Sicredi CNAB400',
  lineLength: 400,
  bankId: 'cobSicred',
  acbrRef: 'ACBrBancoSicredi.pas:GerarRegistroHeader400',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['0'], issueCode: 'F400_HDR_TIPO_REG' },
    { id: 'tipo_arquivo', label: 'Tipo arquivo', start: 2, end: 2, type: 'enum', enum: ['1'], issueCode: 'F400_HDR_TIPO_ARQ' },
    { id: 'literal_remessa', label: 'Literal REMESSA', start: 3, end: 9, type: 'alpha', issueCode: 'F400_HDR_LITERAL' },
    { id: 'codigo_servico', label: 'Código serviço', start: 10, end: 11, type: 'enum', enum: ['01'] },
    { id: 'literal_servico', label: 'Literal serviço', start: 12, end: 26, type: 'alpha' },
    { id: 'codigo_cedente', label: 'Código cedente', start: 27, end: 31, type: 'numeric', issueCode: 'F400_SIC_CED' },
    { id: 'cnpj_cedente', label: 'CNPJ/CPF cedente', start: 32, end: 45, type: 'numeric' },
    { id: 'brancos_46', label: 'Brancos', start: 46, end: 76, type: 'filler', required: false },
    { id: 'codigo_banco', label: 'Código banco', start: 77, end: 79, type: 'numeric', issueCode: 'F400_HDR_BANCO' },
    { id: 'nome_banco', label: 'Nome banco', start: 80, end: 94, type: 'alpha' },
    { id: 'data_geracao', label: 'Data geração', start: 95, end: 102, type: 'date', format: 'AAAAMMDD', issueCode: 'F400_HDR_DATA' },
    { id: 'brancos_103', label: 'Brancos', start: 103, end: 110, type: 'filler', required: false },
    { id: 'numero_remessa', label: 'Nº remessa', start: 111, end: 117, type: 'numeric', pad: 'numeric' },
    { id: 'brancos_118', label: 'Brancos', start: 118, end: 390, type: 'filler', required: false },
    { id: 'versao_sistema', label: 'Versão sistema', start: 391, end: 394, type: 'alphanumeric' },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_HDR_SEQ' },
  ],
}
