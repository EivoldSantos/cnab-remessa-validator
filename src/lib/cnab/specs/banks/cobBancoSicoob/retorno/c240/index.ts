import type { RecordSpec } from '../../../../../types'
import {
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
} from '../../../../febraban/retorno/c240'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const SICOOB_RETORNO_C240_SEGMENTO_T: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  {
    bankId: 'cobBancoSicoob',
    id: 'cobBancoSicoob-retorno-c240-segmento-t',
    enumRef: 'sicoob-retorno-240',
    label: 'Segmento T Sicoob Retorno',
  },
)

export const SICOOB_RETORNO_C240_SEGMENTO_U: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
  {
    bankId: 'cobBancoSicoob',
    id: 'cobBancoSicoob-retorno-c240-segmento-u',
    enumRef: 'sicoob-retorno-240',
    label: 'Segmento U Sicoob Retorno',
  },
)

export const SICOOB_RETORNO_C240_SPECS: RecordSpec[] = [
  SICOOB_RETORNO_C240_SEGMENTO_T,
  SICOOB_RETORNO_C240_SEGMENTO_U,
]
