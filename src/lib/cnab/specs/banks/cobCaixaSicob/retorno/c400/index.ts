import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const CAIXA_SICOB_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobCaixaSicob',
    id: 'cobCaixaSicob-retorno-c400-detalhe-1',
    enumRef: 'caixa-retorno-400',
    label: 'Detalhe Caixa SICOB CNAB400 Retorno',
  },
)

export const CAIXA_SICOB_RETORNO_C400_SPECS: RecordSpec[] = [CAIXA_SICOB_RETORNO_C400_DETALHE_1]
