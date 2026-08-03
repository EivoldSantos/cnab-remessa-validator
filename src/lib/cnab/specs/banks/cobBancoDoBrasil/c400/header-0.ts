import type { RecordSpec } from '../../../../types'

/** Header CNAB400 BB (convênio ≤ 6) — ACBrBancoBrasil.GerarRegistroHeader400 */
export const BB_C400_HEADER_0: RecordSpec = {
  id: 'cobBancoDoBrasil-c400-header-0',
  layout: 'c400',
  recordType: '0',
  label: 'Header BB CNAB400',
  lineLength: 400,
  bankId: 'cobBancoDoBrasil',
  acbrRef: 'ACBrBancoBrasil.pas:GerarRegistroHeader400',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['0'], issueCode: 'F400_HDR_TIPO_REG' },
    { id: 'tipo_arquivo', label: 'Tipo arquivo', start: 2, end: 2, type: 'enum', enum: ['1'], issueCode: 'F400_HDR_TIPO_ARQ' },
    { id: 'literal_remessa', label: 'Literal REMESSA', start: 3, end: 9, type: 'alpha', issueCode: 'F400_HDR_LITERAL' },
    { id: 'codigo_servico', label: 'Código serviço', start: 10, end: 11, type: 'enum', enum: ['01'] },
    { id: 'literal_servico', label: 'Literal serviço', start: 12, end: 26, type: 'alpha' },
    { id: 'agencia', label: 'Agência', start: 27, end: 30, type: 'numeric', issueCode: 'F400_BB_AG' },
    { id: 'dv_agencia', label: 'DV agência', start: 31, end: 31, type: 'alphanumeric', required: false },
    { id: 'conta', label: 'Conta', start: 32, end: 39, type: 'numeric', issueCode: 'F400_BB_CONTA' },
    { id: 'dv_conta', label: 'DV conta', start: 40, end: 40, type: 'alphanumeric', required: false },
    { id: 'convenio', label: 'Convênio', start: 41, end: 46, type: 'numeric', issueCode: 'F400_BB_CONV' },
    { id: 'nome_empresa', label: 'Nome empresa', start: 47, end: 76, type: 'alpha' },
    { id: 'codigo_banco', label: 'Código banco', start: 77, end: 79, type: 'numeric', issueCode: 'F400_HDR_BANCO' },
    { id: 'nome_banco', label: 'Nome banco', start: 80, end: 94, type: 'alpha' },
    { id: 'data_geracao', label: 'Data geração', start: 95, end: 100, type: 'date', format: 'DDMMAA', issueCode: 'F400_HDR_DATA' },
    { id: 'numero_remessa', label: 'Nº remessa', start: 101, end: 107, type: 'numeric', pad: 'numeric' },
    { id: 'brancos_108', label: 'Brancos', start: 108, end: 394, type: 'filler', required: false },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_HDR_SEQ' },
  ],
}
