import type { RecordSpec } from '../../../../../types'
import {
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
} from '../../../../febraban/retorno/c240'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const ITAU_RETORNO_C240_SEGMENTO_T: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  {
    bankId: 'cobItau',
    id: 'cobItau-retorno-c240-segmento-t',
    enumRef: 'itau-retorno-240',
    label: 'Segmento T Itaú Retorno',
  },
)

export const ITAU_RETORNO_C240_SEGMENTO_U: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
  {
    bankId: 'cobItau',
    id: 'cobItau-retorno-c240-segmento-u',
    enumRef: 'itau-retorno-240',
    label: 'Segmento U Itaú Retorno',
  },
)

export const ITAU_RETORNO_C240_SPECS: RecordSpec[] = [
  ITAU_RETORNO_C240_SEGMENTO_T,
  ITAU_RETORNO_C240_SEGMENTO_U,
]
