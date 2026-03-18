# Schemes Made Simple

## Overview

A citizen-focused web platform that bridges the gap between citizens and Indian government welfare schemes, providing simplified access, legal awareness, and step-by-step guidance.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/schemes-made-simple)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI**: TailwindCSS v4, shadcn/ui, framer-motion

## Features

- **Schemes Browser**: Searchable, filterable listing of 12 real Indian government schemes
- **Scheme Details**: Full info including eligibility, documents, step-by-step guide, FAQs
- **Legal Awareness Chatbot**: Rule-based chatbot answering questions about RTI, fundamental rights, consumer rights, etc.
- **Text-to-Speech**: Convert scheme/chatbot text to audio
- **Multilingual Support**: Language selector in navbar (English, Hindi, Tamil, Bengali, Telugu, Marathi)
- **Categories**: Agriculture, Finance, Health, Housing, Employment, Women & Child, Social Welfare, Sanitation

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── schemes-made-simple/ # React frontend
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
│       └── src/schema/
│           └── schemes.ts  # schemesTable, chatHistoryTable
├── scripts/                # Utility scripts
│   └── src/
│       └── seed-schemes.ts # Seeds 12 government schemes
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## API Endpoints

- `GET /api/schemes` - List schemes with search/filter/pagination
- `GET /api/schemes/:id` - Get scheme details
- `GET /api/schemes/categories` - Get all categories
- `POST /api/chat` - Send message to legal chatbot
- `POST /api/tts` - Convert text to speech

## Database

Tables: `schemes`, `chat_history`

Run seed: `pnpm --filter @workspace/scripts run seed-schemes`

## Packages

### `artifacts/schemes-made-simple`

React + Vite frontend. Pages: Home, Schemes, SchemeDetail, Chat (Legal Helper), About.

### `artifacts/api-server`

Express 5 API. Routes: health, schemes, chat, tts.

### `lib/db`

Drizzle ORM. Tables: schemesTable, chatHistoryTable.

### `lib/api-spec`

OpenAPI 3.1 spec. Run codegen: `pnpm --filter @workspace/api-spec run codegen`
