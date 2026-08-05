import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const SANTANDER_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobSantander',
    id: 'cobSantander-retorno-c400-detalhe-1',
    enumRef: 'santander-retorno-400',
    label: 'Detalhe Santander CNAB400 Retorno',
  },
)

export const SANTANDER_RETORNO_C400_SPECS: RecordSpec[] = [SANTANDER_RETORNO_C400_DETALHE_1]
