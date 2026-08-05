import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const BRADESCO_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobBradesco',
    id: 'cobBradesco-retorno-c400-detalhe-1',
    enumRef: 'bradesco-retorno-400',
    label: 'Detalhe Bradesco CNAB400 Retorno',
  },
)

export const BRADESCO_RETORNO_C400_SPECS: RecordSpec[] = [BRADESCO_RETORNO_C400_DETALHE_1]
