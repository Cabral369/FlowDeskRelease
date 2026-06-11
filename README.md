# FlowDesk — Frontend

Interface web do FlowDesk, micro SaaS B2B para freelancers gerenciarem clientes, projetos, tarefas e faturamento.

Construído com React + TypeScript + Vite + Tailwind CSS + shadcn/ui.

## Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- Backend FlowDesk rodando em `http://localhost:8080` (ver `FlowDeskBackEnd/README.md`)

## Como executar

**1. Suba o backend primeiro:**

```bash
# Na pasta FlowDeskBackEnd
docker compose up -d
```

**2. Instale as dependências e inicie o frontend:**

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173`.

O Vite proxy já está configurado para redirecionar chamadas `/api/*` para `http://localhost:8080`, sem necessidade de configuração adicional.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Visualiza o build de produção localmente |

## Funcionalidades

- Dashboard com métricas, projetos recentes e tarefas próximas do prazo
- Gestão de clientes (criar, editar, excluir)
- Gestão de projetos com status, valor estimado e filtros
- Gestão de tarefas em kanban (A fazer, Em andamento, Em revisão, Concluído)
- Configurações de workspace

## Observações

- Na primeira execução, um workspace é criado automaticamente e salvo no `localStorage`.
- Autenticação JWT ainda não implementada — será adicionada em versão futura.
