// Preenchido em runtime por getOrCreateWorkspaceId() antes do app renderizar
// TODO: substituir pelo workspaceId real vindo do contexto de autenticação
export let WORKSPACE_ID = ''

export function setWorkspaceId(id: string) {
  WORKSPACE_ID = id
}
