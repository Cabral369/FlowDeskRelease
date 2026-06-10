import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Topbar() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200 flex-shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 w-80 px-3 py-2 rounded-lg bg-slate-100 text-slate-500 text-sm">
        <Search className="w-4 h-4 flex-shrink-0" />
        <span>Buscar...</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
        </Button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
            U
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-slate-900 leading-none">Usuário</p>
            <p className="text-slate-500 text-xs mt-0.5">usuario@email.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
