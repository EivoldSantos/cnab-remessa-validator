import { useMemo, useState } from 'react'
import { RemessaDropzone } from '@/components/remessa-dropzone'
import { ValidationReport } from '@/components/validation-report'
import { Button } from '@/components/ui/button'
import { listAllBanks, validateRemessa, type ValidationResult } from '@/lib/cnab'

export default function App() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [expectedCompe, setExpectedCompe] = useState('')

  const banks = useMemo(() => listAllBanks().filter((b) => b.compe), [])

  const onFileText = (text: string, name: string) => {
    setFileName(name)
    setResult(
      validateRemessa(text, {
        expectedCompe: expectedCompe.trim() || undefined,
      }),
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">ACBr · CNAB</p>
        <h1 className="text-3xl font-semibold tracking-tight">Validador de Remessa</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Validação estrutural CNAB240/400 com catálogo dos bancos do ACBrBoleto. Arquivo
          processado só no navegador.
        </p>
      </header>

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

        <RemessaDropzone onFileText={onFileText} />
      </section>

      {result && fileName && <ValidationReport fileName={fileName} result={result} />}

      <footer className="mt-auto border-t pt-4 text-xs text-muted-foreground">
        Nível A · {banks.length} entradas no catálogo ACBr · sem validação campo-a-campo
      </footer>
    </div>
  )
}
