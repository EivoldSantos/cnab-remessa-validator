import { useCallback, useRef, useState } from 'react'
import { FileUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RemessaDropzoneProps {
  onFileText: (text: string, fileName: string) => void
  disabled?: boolean
}

export function RemessaDropzone({ onFileText, disabled }: RemessaDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = () => {
        const text = typeof reader.result === 'string' ? reader.result : ''
        onFileText(text, file.name)
      }
      reader.readAsText(file, 'ISO-8859-1')
    },
    [onFileText],
  )

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    const file = e.dataTransfer.files?.[0]
    if (file) readFile(file)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
      }}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-14 text-center transition-colors',
        dragging ? 'border-primary bg-accent/40' : 'border-border bg-muted/30 hover:bg-muted/50',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <FileUp className="size-10 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">Solte o arquivo de remessa aqui</p>
        <p className="mt-1 text-xs text-muted-foreground">
          .rem, .txt ou qualquer texto CNAB240 / CNAB400
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".rem,.txt,.RET,.ret,.REM,text/plain"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) readFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
