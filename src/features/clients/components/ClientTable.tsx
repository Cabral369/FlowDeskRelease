import { Pencil, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Client } from '../types'

interface Props {
  clients: Client[]
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}

export function ClientTable({ clients, onEdit, onDelete }: Props) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 text-sm">
        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-medium text-slate-500">Nenhum cliente cadastrado</p>
        <p className="mt-1">Clique em "Novo cliente" para começar.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-[2fr_2fr_1fr_auto] gap-4 px-4 py-3 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
        <span>Nome / Empresa</span>
        <span>E-mail</span>
        <span>Telefone</span>
        <span />
      </div>
      {clients.map((client) => (
        <div
          key={client.id}
          className="grid grid-cols-[2fr_2fr_1fr_auto] gap-4 items-center px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-slate-900">{client.name}</p>
            {client.company && (
              <p className="text-xs text-slate-400 mt-0.5">{client.company}</p>
            )}
          </div>
          <p className="text-sm text-slate-600 truncate">{client.email}</p>
          <p className="text-sm text-slate-500">{client.phone ?? '—'}</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(client)}>
              <Pencil className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onDelete(client.id)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
