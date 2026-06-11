import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getOrCreateWorkspaceId } from './lib/workspace'
import { setWorkspaceId } from './lib/constants'

async function bootstrap() {
  const workspaceId = await getOrCreateWorkspaceId()
  setWorkspaceId(workspaceId)

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootstrap()
