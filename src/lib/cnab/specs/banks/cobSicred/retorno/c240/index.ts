import type { RecordSpec } from '../../../../../types'
import {
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
} from '../../../../febraban/retorno/c240'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const SICREDI_RETORNO_C240_SEGMENTO_T: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  {
    bankId: 'cobSicred',
    id: 'cobSicred-retorno-c240-segmento-t',
    enumRef: 'sicredi-retorno-240',
    label: 'Segmento T Sicredi Retorno',
  },
)

export const SICREDI_RETORNO_C240_SEGMENTO_U: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
  {
    bankId: 'cobSicred',
    id: 'cobSicred-retorno-c240-segmento-u',
    enumRef: 'sicredi-retorno-240',
    label: 'Segmento U Sicredi Retorno',
  },
)

export const SICREDI_RETORNO_C240_SPECS: RecordSpec[] = [
  SICREDI_RETORNO_C240_SEGMENTO_T,
  SICREDI_RETORNO_C240_SEGMENTO_U,
]
