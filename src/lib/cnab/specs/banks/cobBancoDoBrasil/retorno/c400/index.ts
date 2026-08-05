import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const BB_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobBancoDoBrasil',
    id: 'cobBancoDoBrasil-retorno-c400-detalhe-1',
    enumRef: 'bb-retorno-400',
    label: 'Detalhe BB CNAB400 Retorno',
  },
)

export const BB_RETORNO_C400_SPECS: RecordSpec[] = [BB_RETORNO_C400_DETALHE_1]
