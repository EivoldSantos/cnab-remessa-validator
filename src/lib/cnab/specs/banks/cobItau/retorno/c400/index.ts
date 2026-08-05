import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const ITAU_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobItau',
    id: 'cobItau-retorno-c400-detalhe-1',
    enumRef: 'itau-retorno-400',
    label: 'Detalhe Itaú CNAB400 Retorno',
  },
)

export const ITAU_RETORNO_C400_SPECS: RecordSpec[] = [ITAU_RETORNO_C400_DETALHE_1]
