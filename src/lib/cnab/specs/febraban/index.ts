import { CAIXA_SICOB_C400_SPECS } from '../banks/cobCaixaSicob/c400'
import { CAIXA_SICOB_C240_SPECS } from '../banks/cobCaixaSicob/c240'
import { SICOOB_C400_SPECS } from '../banks/cobBancoSicoob/c400'
import { SICOOB_C240_SPECS } from '../banks/cobBancoSicoob/c240'
import { SICREDI_C400_SPECS } from '../banks/cobSicred/c400'
import { SICREDI_C240_SPECS } from '../banks/cobSicred/c240'
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
import { FEBRABAN_RETORNO_C400_SPECS, FEBRABAN_RETORNO_C240_SPECS } from './retorno'
import { BRADESCO_RETORNO_C400_SPECS } from '../banks/cobBradesco/retorno/c400'
import { ITAU_RETORNO_C400_SPECS } from '../banks/cobItau/retorno/c400'
import { ITAU_RETORNO_C240_SPECS } from '../banks/cobItau/retorno/c240'
import { BB_RETORNO_C400_SPECS } from '../banks/cobBancoDoBrasil/retorno/c400'
import { BB_RETORNO_C240_SPECS } from '../banks/cobBancoDoBrasil/retorno/c240'
import { SANTANDER_RETORNO_C400_SPECS } from '../banks/cobSantander/retorno/c400'
import { SANTANDER_RETORNO_C240_SPECS } from '../banks/cobSantander/retorno/c240'
import { CAIXA_RETORNO_C400_SPECS } from '../banks/cobCaixaEconomica/retorno/c400'
import { CAIXA_RETORNO_C240_SPECS } from '../banks/cobCaixaEconomica/retorno/c240'
import { CAIXA_SICOB_RETORNO_C400_SPECS } from '../banks/cobCaixaSicob/retorno/c400'
import { SICREDI_RETORNO_C400_SPECS } from '../banks/cobSicred/retorno/c400'
import { SICREDI_RETORNO_C240_SPECS } from '../banks/cobSicred/retorno/c240'
import { SICOOB_RETORNO_C400_SPECS } from '../banks/cobBancoSicoob/retorno/c400'
import { SICOOB_RETORNO_C240_SPECS } from '../banks/cobBancoSicoob/retorno/c240'

export const FEBRABAN_SPECS = [
  FEBRABAN_C400_HEADER_0,
  FEBRABAN_C400_TRAILER_9,
  FEBRABAN_C400_DETALHE_1,
  ...FEBRABAN_C240_SPECS,
  ...FEBRABAN_RETORNO_C400_SPECS,
  ...FEBRABAN_RETORNO_C240_SPECS,
  ...BRADESCO_C400_SPECS,
  ...BRADESCO_RETORNO_C400_SPECS,
  ...ITAU_C400_SPECS,
  ...ITAU_C240_SPECS,
  ...ITAU_RETORNO_C400_SPECS,
  ...ITAU_RETORNO_C240_SPECS,
  ...BB_C400_SPECS,
  ...BB_C240_SPECS,
  ...BB_RETORNO_C400_SPECS,
  ...BB_RETORNO_C240_SPECS,
  ...SANTANDER_C400_SPECS,
  ...SANTANDER_C240_SPECS,
  ...SANTANDER_RETORNO_C400_SPECS,
  ...SANTANDER_RETORNO_C240_SPECS,
  ...CAIXA_C400_SPECS,
  ...CAIXA_C240_SPECS,
  ...CAIXA_RETORNO_C400_SPECS,
  ...CAIXA_RETORNO_C240_SPECS,
  ...CAIXA_SICOB_C400_SPECS,
  ...CAIXA_SICOB_C240_SPECS,
  ...CAIXA_SICOB_RETORNO_C400_SPECS,
  ...SICREDI_C400_SPECS,
  ...SICREDI_C240_SPECS,
  ...SICREDI_RETORNO_C400_SPECS,
  ...SICREDI_RETORNO_C240_SPECS,
  ...SICOOB_C400_SPECS,
  ...SICOOB_C240_SPECS,
  ...SICOOB_RETORNO_C400_SPECS,
  ...SICOOB_RETORNO_C240_SPECS,
]

export { FEBRABAN_C400_HEADER_0, FEBRABAN_C400_TRAILER_9 } from './c400'
export { FEBRABAN_C400_DETALHE_1 } from './c400/detalhe-1'
