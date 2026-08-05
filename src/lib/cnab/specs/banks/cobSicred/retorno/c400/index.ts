import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const SICREDI_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobSicred',
    id: 'cobSicred-retorno-c400-detalhe-1',
    enumRef: 'sicredi-retorno-400',
    label: 'Detalhe Sicredi CNAB400 Retorno',
  },
)

export const SICREDI_RETORNO_C400_SPECS: RecordSpec[] = [SICREDI_RETORNO_C400_DETALHE_1]
