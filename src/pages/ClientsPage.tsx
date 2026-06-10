import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ClientTable } from '@/features/clients/components/ClientTable'
import { ClientForm } from '@/features/clients/components/ClientForm'
import { useClients } from '@/features/clients/hooks/useClients'
import { useDeleteClient } from '@/features/clients/hooks/useDeleteClient'
import type { Client } from '@/features/clients/types'

export function ClientsPage() {
  const { clients, isLoading, refetch } = useClients()
  const { handleDelete } = useDeleteClient(refetch)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Client | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company ?? '').toLowerCase().includes(search.toLowerCase())
  )

  function openCreate() {
    setEditing(null)
    setIsFormOpen(true)
  }

  function openEdit(client: Client) {
    setEditing(client)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditing(null)
  }

  function onFormSuccess() {
    closeForm()
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie seus clientes e contatos</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Novo cliente
        </Button>
      </div>

      <div className="flex items-center gap-2 w-full max-w-sm px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-500 text-sm">
        <Search className="w-4 h-4 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar clientes..."
          className="flex-1 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            {editing ? 'Editar cliente' : 'Novo cliente'}
          </h2>
          <ClientForm client={editing ?? undefined} onSuccess={onFormSuccess} onCancel={closeForm} />
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ClientTable clients={filtered} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}
