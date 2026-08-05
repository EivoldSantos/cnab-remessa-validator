import type { RecordSpec } from '../../../../types'

/** Detalhe CNAB400 Sicredi (modalidade A) — ACBrBancoSicredi.GerarRegistroTransacao400 */
export const SICREDI_C400_DETALHE_1: RecordSpec = {
  id: 'cobSicred-c400-detalhe-1',
  layout: 'c400',
  recordType: '1',
  label: 'Detalhe Sicredi CNAB400',
  lineLength: 400,
  bankId: 'cobSicred',
  acbrRef: 'ACBrBancoSicredi.pas:GerarRegistroTransacao400',
  fields: [
    { id: 'tipo_registro', label: 'Tipo registro', start: 1, end: 1, type: 'enum', enum: ['1'], issueCode: 'F400_DET_TIPO' },
    { id: 'modalidade_cobranca', label: 'Modalidade cobrança', start: 2, end: 2, type: 'enum', enum: ['A', 'C'], issueCode: 'F400_SIC_MOD' },
    { id: 'nosso_numero', label: 'Nosso número', start: 48, end: 56, type: 'numeric', issueCode: 'F400_SIC_NOSSO' },
    {
      id: 'ocorrencia',
      label: 'Instrução/ocorrência',
      start: 109,
      end: 110,
      type: 'enum',
      enumRef: 'sicredi-remessa-400',
      issueCode: 'F400_SIC_OCORR',
    },
    { id: 'numero_documento', label: 'Seu número', start: 111, end: 120, type: 'alphanumeric', issueCode: 'F400_DET_DOC' },
    { id: 'vencimento', label: 'Vencimento', start: 121, end: 126, type: 'date', format: 'DDMMAA', issueCode: 'F400_DET_VENC' },
    { id: 'valor', label: 'Valor título', start: 127, end: 139, type: 'money', issueCode: 'F400_DET_VALOR' },
    { id: 'especie', label: 'Espécie documento', start: 149, end: 149, type: 'alpha', required: false },
    { id: 'aceite', label: 'Aceite', start: 150, end: 150, type: 'enum', enum: ['S', 'N', ' '], required: false },
    { id: 'tipo_inscricao', label: 'Tipo inscrição sacado', start: 219, end: 219, type: 'enum', enum: ['1', '2'] },
    { id: 'cpf_cnpj', label: 'CPF/CNPJ sacado', start: 221, end: 234, type: 'numeric', issueCode: 'F400_DET_CPF' },
    { id: 'nome_sacado', label: 'Nome sacado', start: 235, end: 274, type: 'alpha', issueCode: 'F400_DET_NOME' },
    { id: 'sequencial', label: 'Sequencial', start: 395, end: 400, type: 'numeric', pad: 'numeric', issueCode: 'F400_DET_SEQ' },
  ],
}
