import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { http } from '@/lib/http'
import { WORKSPACE_ID } from '@/lib/constants'

interface WorkspaceData {
  id: string
  name: string
  createdAt?: string
}

export function SettingsPage() {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null)
  const [workspaceName, setWorkspaceName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(() => {
    if (!WORKSPACE_ID) return
    http.get<WorkspaceData | { workspaces?: WorkspaceData[] }>(`/Workspaces/${WORKSPACE_ID}`)
      .then((data) => {
        const ws = 'id' in data ? data as WorkspaceData : null
        if (ws) {
          setWorkspace(ws)
          setWorkspaceName(ws.name)
        }
      })
      .catch(() => {
        // fallback: mostra o ID salvo localmente
        setWorkspace({ id: WORKSPACE_ID, name: 'FlowDesk Workspace' })
        setWorkspaceName('FlowDesk Workspace')
      })
  }, [])

  async function saveWorkspace(e: React.FormEvent) {
    e.preventDefault()
    if (!WORKSPACE_ID) return
    setIsSaving(true)
    try {
      await http.put(`/Workspaces/${WORKSPACE_ID}`, { id: WORKSPACE_ID, name: workspaceName })
      setSavedMsg('Workspace atualizado!')
      setTimeout(() => setSavedMsg(''), 3000)
    } catch {
      setSavedMsg('Erro ao salvar.')
      setTimeout(() => setSavedMsg(''), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie os dados da sua conta e workspace</p>
      </div>

      {/* Seção: Conta — placeholder até autenticação */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Dados da conta</h2>
        <p className="text-xs text-slate-400 mb-4">Disponível após implementar autenticação.</p>
        <div className="space-y-4 opacity-50 pointer-events-none">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
            <input type="text" placeholder="Seu nome" className={inputClass} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
            <input type="email" placeholder="voce@email.com" className={inputClass} disabled />
          </div>
          <Button disabled>Salvar alterações</Button>
        </div>
      </div>

      {/* Seção: Workspace */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Workspace</h2>
        <form onSubmit={saveWorkspace} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nome da organização
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Minha Agência"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              ID do Workspace
            </label>
            <input
              type="text"
              value={workspace?.id ?? WORKSPACE_ID}
              readOnly
              className={`${inputClass} bg-slate-50 text-slate-400 cursor-default font-mono text-xs`}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar workspace'}
            </Button>
            {savedMsg && (
              <span className="text-sm text-green-600 font-medium">{savedMsg}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
