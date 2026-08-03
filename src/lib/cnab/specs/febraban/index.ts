import { BB_C400_SPECS } from '../banks/cobBancoDoBrasil/c400'
import { BB_C240_SPECS } from '../banks/cobBancoDoBrasil/c240'
import { BRADESCO_C400_SPECS } from '../banks/cobBradesco/c400'
import { ITAU_C400_SPECS } from '../banks/cobItau/c400'
import { ITAU_C240_SPECS } from '../banks/cobItau/c240'
import { FEBRABAN_C240_SPECS } from './c240'
import { FEBRABAN_C400_HEADER_0, FEBRABAN_C400_TRAILER_9 } from './c400'

export const FEBRABAN_SPECS = [
  FEBRABAN_C400_HEADER_0,
  FEBRABAN_C400_TRAILER_9,
  ...FEBRABAN_C240_SPECS,
  ...BRADESCO_C400_SPECS,
  ...ITAU_C400_SPECS,
  ...ITAU_C240_SPECS,
  ...BB_C400_SPECS,
  ...BB_C240_SPECS,
]

export { FEBRABAN_C400_HEADER_0, FEBRABAN_C400_TRAILER_9 } from './c400'
