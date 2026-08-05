import type { RecordSpec } from '../../../../../types'
import {
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
} from '../../../../febraban/retorno/c240'
import { bankRetornoSpec } from '../../../retorno-helpers'

export const CAIXA_RETORNO_C240_SEGMENTO_T: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_T,
  {
    bankId: 'cobCaixaEconomica',
    id: 'cobCaixaEconomica-retorno-c240-segmento-t',
    enumRef: 'caixa-retorno-240',
    label: 'Segmento T Caixa Retorno',
  },
)

export const CAIXA_RETORNO_C240_SEGMENTO_U: RecordSpec = bankRetornoSpec(
  FEBRABAN_RETORNO_C240_SEGMENTO_U,
  {
    bankId: 'cobCaixaEconomica',
    id: 'cobCaixaEconomica-retorno-c240-segmento-u',
    enumRef: 'caixa-retorno-240',
    label: 'Segmento U Caixa Retorno',
  },
)

export const CAIXA_RETORNO_C240_SPECS: RecordSpec[] = [
  CAIXA_RETORNO_C240_SEGMENTO_T,
  CAIXA_RETORNO_C240_SEGMENTO_U,
]
