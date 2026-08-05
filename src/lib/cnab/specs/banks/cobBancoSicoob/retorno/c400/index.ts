import type { RecordSpec } from '../../../../../types'
import { FEBRABAN_RETORNO_C400_DETALHE_1 } from '../../../../febraban/retorno/c400'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const SICOOB_RETORNO_C400_DETALHE_1: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C400_DETALHE_1,
  {
    bankId: 'cobBancoSicoob',
    id: 'cobBancoSicoob-retorno-c400-detalhe-1',
    enumRef: 'sicoob-retorno-400',
    label: 'Detalhe Sicoob CNAB400 Retorno',
  },
)

export const SICOOB_RETORNO_C400_SPECS: RecordSpec[] = [SICOOB_RETORNO_C400_DETALHE_1]
