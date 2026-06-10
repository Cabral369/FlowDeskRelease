import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-6xl font-bold text-slate-200 mb-4">404</p>
        <h1 className="text-xl font-semibold text-slate-700 mb-2">Página não encontrada</h1>
        <p className="text-slate-500 text-sm mb-6">A rota que você acessou não existe.</p>
        <Button onClick={() => navigate('/dashboard')}>Voltar ao dashboard</Button>
      </div>
    </div>
  )
}
