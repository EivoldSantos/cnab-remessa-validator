import type { RecordSpec } from '../../../../types'

/** Detalhe CNAB400 Caixa SICOB */
export const CAIXA_SICOB_C400_DETALHE_1: RecordSpec = {
  id: 'cobCaixaSicob-c400-detalhe-1',
  layout: 'c400',
  recordType: '1',
  label: 'Detalhe Caixa SICOB CNAB400',
  lineLength: 400,
  bankId: 'cobCaixaSicob',
  acbrRef: 'ACBrBancoCaixaSICOB.pas:GerarRegistroTransacao400',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['1'], issueCode: 'F400_DET_TIPO' },
    { id: 'tipo_inscricao_cedente', label: 'Tipo inscrição cedente', start: 2, end: 3, type: 'enum', enum: ['01', '02'] },
    { id: 'cnpj_cedente', label: 'CNPJ/CPF cedente', start: 4, end: 17, type: 'numeric' },
    { id: 'codigo_cedente', label: 'Código cedente', start: 18, end: 33, type: 'numeric', issueCode: 'F400_CXS_CED' },
    {
      id: 'ocorrencia',
      label: 'Ocorrência',
      start: 109,
      end: 110,
      type: 'enum',
      enumRef: 'caixa-remessa-400',
      issueCode: 'F400_CX_OCORR',
    },
    { id: 'numero_documento', label: 'Número documento', start: 111, end: 120, type: 'alphanumeric', issueCode: 'F400_DET_DOC' },
    { id: 'vencimento', label: 'Vencimento', start: 121, end: 126, type: 'date', format: 'DDMMAA', issueCode: 'F400_DET_VENC' },
    { id: 'valor', label: 'Valor título', start: 127, end: 139, type: 'money', issueCode: 'F400_DET_VALOR' },
    { id: 'codigo_banco', label: 'Código banco', start: 140, end: 142, type: 'numeric' },
    { id: 'tipo_inscricao', label: 'Tipo inscrição sacado', start: 219, end: 220, type: 'enum', enum: ['01', '02'] },
    { id: 'cpf_cnpj', label: 'CPF/CNPJ sacado', start: 221, end: 234, type: 'numeric', issueCode: 'F400_DET_CPF' },
    { id: 'nome_sacado', label: 'Nome sacado', start: 235, end: 274, type: 'alpha', issueCode: 'F400_DET_NOME' },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_DET_SEQ' },
  ],
}
