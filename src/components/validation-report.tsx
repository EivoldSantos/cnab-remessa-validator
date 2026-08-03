import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { ValidationResult } from '@/lib/cnab'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, XCircle } from 'lucide-react'

function severityBadge(severity: 'error' | 'warning' | 'info') {
  if (severity === 'error') return <Badge variant="destructive">error</Badge>
  if (severity === 'warning') return <Badge variant="warning">warning</Badge>
  return <Badge variant="info">info</Badge>
}

interface ValidationReportProps {
  fileName: string
  result: ValidationResult
}

export function ValidationReport({ fileName, result }: ValidationReportProps) {
  const { summary, issues, preview, ok, lineDetails } = result
  const errors = issues.filter((i) => i.severity === 'error').length
  const warnings = issues.filter((i) => i.severity === 'warning').length

  return (
    <div className="flex flex-col gap-4">
      <Alert variant={ok ? 'default' : 'destructive'}>
        {ok ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
        <AlertTitle>{ok ? 'Remessa válida' : 'Problemas encontrados'}</AlertTitle>
        <AlertDescription>
          {fileName} — {errors} erro(s), {warnings} aviso(s)
          {summary.fieldsValidated != null && summary.fieldsValidated > 0
            ? ` · ${summary.fieldsValidated} campo(s) validados (nível B)`
            : ''}
        </AlertDescription>
      </Alert>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryItem label="Layout" value={summary.layout?.toUpperCase() ?? '—'} />
        <SummaryItem
          label="Banco"
          value={
            summary.bankCode
              ? `${summary.bankCode}${summary.bankName ? ` · ${summary.bankName}` : ''}`
              : '—'
          }
        />
        <SummaryItem label="Nº remessa" value={summary.remessaNumber ?? '—'} />
        <SummaryItem
          label="Linhas / títulos"
          value={`${summary.lineCount} / ~${summary.titleEstimate}`}
        />
        <SummaryItem
          label="Campos (B)"
          value={
            summary.fieldsValidated != null
              ? `${summary.fieldsValidated - (summary.invalidFields ?? 0)}/${summary.fieldsValidated} ok`
              : '—'
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Issues</CardTitle>
          <CardDescription>Estrutura (A) + campos posicionais (B)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Severidade</TableHead>
                <TableHead className="w-36">Código</TableHead>
                <TableHead className="w-16">Linha</TableHead>
                <TableHead className="w-28">Campo</TableHead>
                <TableHead>Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue, idx) => (
                <TableRow key={`${issue.code}-${idx}`}>
                  <TableCell>{severityBadge(issue.severity)}</TableCell>
                  <TableCell className="font-mono text-xs">{issue.code}</TableCell>
                  <TableCell>{issue.line ?? '—'}</TableCell>
                  <TableCell className="font-mono text-xs">{issue.field ?? '—'}</TableCell>
                  <TableCell>{issue.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {lineDetails && lineDetails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Campos por linha</CardTitle>
            <CardDescription>Registros com spec implementada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lineDetails.map((ld) => (
              <div key={ld.lineIndex} className="rounded-md border p-3">
                <p className="text-sm font-medium">
                  Linha {ld.lineIndex} — {ld.recordLabel}{' '}
                  <span className="text-muted-foreground">({ld.recordType})</span>
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pos</TableHead>
                      <TableHead>Campo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Ok</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ld.fields.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell className="font-mono text-xs">
                          {f.start}-{f.end}
                        </TableCell>
                        <TableCell className="text-xs">{f.label}</TableCell>
                        <TableCell className="max-w-xs truncate font-mono text-xs" title={f.raw}>
                          {f.value ?? '(vazio)'}
                        </TableCell>
                        <TableCell>{f.valid ? '✓' : '✗'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preview</CardTitle>
          <CardDescription>Primeiras linhas com tipo de registro</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-56 rounded-md border bg-muted/20">
            <pre className="p-3 font-mono text-[11px] leading-5">
              {preview.map((p) => (
                <div key={p.index}>
                  <span className="text-muted-foreground">{String(p.index).padStart(3, '0')}</span>{' '}
                  <span className="text-sky-700">[{p.tipo}]</span>{' '}
                  <span>{p.raw.slice(0, 120)}{p.raw.length > 120 ? '…' : ''}</span>
                </div>
              ))}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium" title={value}>
        {value}
      </p>
    </div>
  )
}
