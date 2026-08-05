import { useMemo, useState } from 'react'
import { RemessaDropzone } from '@/components/remessa-dropzone'
import { ValidationReport } from '@/components/validation-report'
import { Button } from '@/components/ui/button'
import {
  listAllBanks,
  validateRemessa,
  validateRetorno,
  type CnabKind,
  type ValidationResult,
} from '@/lib/cnab'
import { cn } from '@/lib/utils'

export default function App() {
  const [kind, setKind] = useState<CnabKind>('remessa')
  const [fileName, setFileName] = useState<string | null>(null)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [expectedCompe, setExpectedCompe] = useState('')

  const banks = useMemo(() => listAllBanks().filter((b) => b.compe), [])

  const onFileText = (text: string, name: string) => {
    setFileName(name)
    const opts = { expectedCompe: expectedCompe.trim() || undefined }
    setResult(kind === 'retorno' ? validateRetorno(text, opts) : validateRemessa(text, opts))
  }

  const switchKind = (next: CnabKind) => {
    setKind(next)
    setResult(null)
    setFileName(null)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">ACBr · CNAB</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Validador de {kind === 'retorno' ? 'Retorno' : 'Remessa'}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Validação estrutural e campo a campo CNAB240/400 com catálogo dos bancos do
          ACBrBoleto. Arquivo processado só no navegador.
        </p>
      </header>

      <div className="inline-flex rounded-lg border border-border p-1">
        {(['remessa', 'retorno'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => switchKind(k)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors',
              kind === k
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Filtrar COMPE (opcional)</span>
            <select
              className="h-9 min-w-64 rounded-md border border-input bg-background px-3 text-sm"
              value={expectedCompe}
              onChange={(e) => setExpectedCompe(e.target.value)}
            >
              <option value="">Auto-detectar banco</option>
              {[...new Map(banks.map((b) => [b.compe, b])).values()]
                .sort((a, b) => a.compe.localeCompare(b.compe))
                .map((b) => (
                  <option key={b.compe + b.id} value={b.compe}>
                    {b.compe} — {b.nome}
                  </option>
                ))}
            </select>
          </label>
          {result && (
            <Button
              variant="outline"
              onClick={() => {
                setResult(null)
                setFileName(null)
              }}
            >
              Limpar
            </Button>
          )}
        </div>

        <RemessaDropzone onFileText={onFileText} kind={kind} />
      </section>

      {result && fileName && <ValidationReport fileName={fileName} result={result} />}

      <footer className="mt-auto border-t pt-4 text-xs text-muted-foreground">
        Nível A+B · {banks.length} entradas no catálogo ACBr · modo {kind}
      </footer>
    </div>
  )
}
