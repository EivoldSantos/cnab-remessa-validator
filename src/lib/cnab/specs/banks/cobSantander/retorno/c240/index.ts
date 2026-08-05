import type { RecordSpec } from '../../../../../types'
import {
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
} from '../../../../febraban/retorno/c240'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const SANTANDER_RETORNO_C240_SEGMENTO_T: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  {
    bankId: 'cobSantander',
    id: 'cobSantander-retorno-c240-segmento-t',
    enumRef: 'santander-retorno-240',
    label: 'Segmento T Santander Retorno',
  },
)

export const SANTANDER_RETORNO_C240_SEGMENTO_U: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
  {
    bankId: 'cobSantander',
    id: 'cobSantander-retorno-c240-segmento-u',
    enumRef: 'santander-retorno-240',
    label: 'Segmento U Santander Retorno',
  },
)

export const SANTANDER_RETORNO_C240_SPECS: RecordSpec[] = [
  SANTANDER_RETORNO_C240_SEGMENTO_T,
  SANTANDER_RETORNO_C240_SEGMENTO_U,
]
