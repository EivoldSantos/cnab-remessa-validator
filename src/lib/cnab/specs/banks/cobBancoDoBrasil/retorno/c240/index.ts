import type { RecordSpec } from '../../../../../types'
import {
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
} from '../../../../febraban/retorno/c240'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const BB_RETORNO_C240_SEGMENTO_T: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  {
    bankId: 'cobBancoDoBrasil',
    id: 'cobBancoDoBrasil-retorno-c240-segmento-t',
    enumRef: 'bb-retorno-240',
    label: 'Segmento T BB Retorno',
  },
)

export const BB_RETORNO_C240_SEGMENTO_U: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
  {
    bankId: 'cobBancoDoBrasil',
    id: 'cobBancoDoBrasil-retorno-c240-segmento-u',
    enumRef: 'bb-retorno-240',
    label: 'Segmento U BB Retorno',
  },
)

export const BB_RETORNO_C240_SPECS: RecordSpec[] = [
  BB_RETORNO_C240_SEGMENTO_T,
  BB_RETORNO_C240_SEGMENTO_U,
]
