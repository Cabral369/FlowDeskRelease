import { Zap } from 'lucide-react'
import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <div className="w-full max-w-md mx-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">FlowDesk</span>
        </div>
        <h1 className="text-xl font-semibold text-slate-900 text-center mb-1">
          Entrar na sua conta
        </h1>
        <p className="text-slate-500 text-sm text-center mb-8">
          Gerencie seus clientes e projetos em um só lugar
        </p>
        <LoginForm />
        <p className="text-center text-sm text-slate-500 mt-6">
          Não tem conta?{' '}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Criar conta
          </a>
        </p>
      </div>
    </div>
  )
}
