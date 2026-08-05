import type { RecordSpec } from '../../types'

/** Clona spec FEBRABAN retorno com bankId e enumRef de ocorrência/movimento. */
export function bankRetornoSpec(
  base: RecordSpec,
  opts: { bankId: string; id: string; enumRef: string; label?: string },
): RecordSpec {
  return {
    ...base,
    id: opts.id,
    bankId: opts.bankId,
    kind: 'retorno',
    label: opts.label ?? base.label,
    fields: base.fields.map((f) =>
      f.id === 'ocorrencia' || f.id === 'codigo_movimento'
        ? { ...f, enumRef: opts.enumRef }
        : f,
    ),
  }
}
