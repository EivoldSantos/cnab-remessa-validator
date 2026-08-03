import { CAIXA_C400_SPECS } from '../banks/cobCaixaEconomica/c400'
import { CAIXA_C240_SPECS } from '../banks/cobCaixaEconomica/c240'
import { SANTANDER_C400_SPECS } from '../banks/cobSantander/c400'
import { SANTANDER_C240_SPECS } from '../banks/cobSantander/c240'
import { BB_C400_SPECS } from '../banks/cobBancoDoBrasil/c400'
import { BB_C240_SPECS } from '../banks/cobBancoDoBrasil/c240'
import { BRADESCO_C400_SPECS } from '../banks/cobBradesco/c400'
import { ITAU_C400_SPECS } from '../banks/cobItau/c400'
import { ITAU_C240_SPECS } from '../banks/cobItau/c240'
import { FEBRABAN_C240_SPECS } from './c240'
import { FEBRABAN_C400_DETALHE_1 } from './c400/detalhe-1'
import { FEBRABAN_C400_HEADER_0, FEBRABAN_C400_TRAILER_9 } from './c400'

export const FEBRABAN_SPECS = [
  FEBRABAN_C400_HEADER_0,
  FEBRABAN_C400_TRAILER_9,
  FEBRABAN_C400_DETALHE_1,
  ...FEBRABAN_C240_SPECS,
  ...BRADESCO_C400_SPECS,
  ...ITAU_C400_SPECS,
  ...ITAU_C240_SPECS,
  ...BB_C400_SPECS,
  ...BB_C240_SPECS,
  ...SANTANDER_C400_SPECS,
  ...SANTANDER_C240_SPECS,
  ...CAIXA_C400_SPECS,
  ...CAIXA_C240_SPECS,
]

export { FEBRABAN_C400_HEADER_0, FEBRABAN_C400_TRAILER_9 } from './c400'
export { FEBRABAN_C400_DETALHE_1 } from './c400/detalhe-1'
