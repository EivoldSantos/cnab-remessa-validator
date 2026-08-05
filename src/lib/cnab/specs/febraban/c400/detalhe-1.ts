import type { RecordSpec } from '../../../types'

/**
 * Detalhe CNAB400 genérico FEBRABAN — campos comuns a vários bancos.
 * Bancos com layout próprio usam spec específica via registry.
 */
export const FEBRABAN_C400_DETALHE_1: RecordSpec = {
  id: 'febraban-c400-detalhe-1',
  layout: 'c400',
  recordType: '1',
  label: 'Detalhe CNAB400',
  lineLength: 400,
  acbrRef: 'ACBrBoleto.pas:TACBrBancoClass (campos comuns)',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['1'], issueCode: 'F400_DET_TIPO' },
    {
      id: 'ocorrencia',
      label: 'Código ocorrência',
      start: 109,
      end: 110,
      type: 'enum',
      enumRef: 'febraban-remessa-400',
      issueCode: 'F400_DET_OCORR',
    },
    { id: 'numero_documento', label: 'Número documento', start: 111, end: 120, type: 'alphanumeric', required: false, issueCode: 'F400_DET_DOC' },
    { id: 'vencimento', label: 'Vencimento', start: 121, end: 126, type: 'date', format: 'DDMMAA', issueCode: 'F400_DET_VENC' },
    { id: 'valor', label: 'Valor título', start: 127, end: 139, type: 'money', issueCode: 'F400_DET_VALOR' },
    { id: 'tipo_inscricao', label: 'Tipo inscrição sacado', start: 219, end: 220, type: 'alphanumeric', required: false },
    { id: 'cpf_cnpj', label: 'CPF/CNPJ sacado', start: 221, end: 234, type: 'numeric', required: false, issueCode: 'F400_DET_CPF' },
    { id: 'nome_sacado', label: 'Nome sacado', start: 235, end: 274, type: 'alpha', required: false, issueCode: 'F400_DET_NOME' },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_DET_SEQ' },
  ],
}
