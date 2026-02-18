# SakhiCare Architecture

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: GraphQL (Apollo Server), Node.js
- **Database**: MongoDB
- **State Management**: Apollo Client (GraphQL)

## Project Structure

```
sakhicare/
├── app/                          # Next.js App Router routes
│   ├── api/
│   │   └── graphql/
│   │       └── route.ts         # GraphQL API endpoint
│   ├── dashboard/
│   │   ├── daily-record/
│   │   │   └── page.tsx         # Daily record page (uses hooks)
│   │   └── page.tsx              # Dashboard (uses hooks)
│   ├── layout.tsx                # Root layout with Apollo Provider
│   └── page.tsx                  # Home page
├── components/
│   ├── features/                 # Feature-specific components
│   │   ├── DailyRecordForm.tsx
│   │   └── DateNavigator.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── PageLayout.tsx
│   │   └── MainContent.tsx
│   ├── providers/
│   │   └── ApolloProvider.tsx   # Apollo Client provider
│   └── ui/                      # Reusable UI primitives
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── TextListField.tsx
├── hooks/                       # Custom React hooks
│   ├── useDailyRecord.ts        # GraphQL query hook
│   └── useSaveDailyRecord.ts    # GraphQL mutation hook
├── lib/
│   ├── apollo-client.ts         # Apollo Client setup
│   ├── auth-anonymous.ts        # Anonymous user ID (cookie)
│   ├── constants.ts             # App constants
│   ├── daily-record.ts          # MongoDB data layer
│   ├── db.ts                    # MongoDB connection
│   └── graphql/
│       ├── queries.ts           # GraphQL queries & mutations
│       ├── resolvers.ts         # GraphQL resolvers
│       ├── schema.ts            # GraphQL schema
│       └── server.ts            # Apollo Server setup
└── types/
    └── index.ts                 # TypeScript types
```

## Architecture Patterns

### 1. **GraphQL API Layer**
- **Schema**: Defined in `lib/graphql/schema.ts`
- **Resolvers**: Business logic in `lib/graphql/resolvers.ts`
- **Server**: Apollo Server instance in `lib/graphql/server.ts`
- **Route**: Next.js route handler at `/api/graphql`

### 2. **Custom Hooks Pattern**
- Each GraphQL operation has a corresponding hook in `hooks/`
- Hooks encapsulate Apollo Client queries/mutations
- Example: `useDailyRecord(date)` wraps `GET_DAILY_RECORD` query
- Example: `useSaveDailyRecord()` wraps `SAVE_DAILY_RECORD` mutation

### 3. **Component Architecture**
- **UI Primitives** (`components/ui/`): Reusable, unstyled components (Button, Card, Input)
- **Layout Components** (`components/layout/`): Page structure (Header, PageLayout, MainContent)
- **Feature Components** (`components/features/`): Feature-specific UI (DailyRecordForm, DateNavigator)
- **Pages** (`app/*/page.tsx`): Route pages that compose components and hooks

### 4. **Data Flow**

```
Page Component
  ↓ uses
Custom Hook (useDailyRecord, useSaveDailyRecord)
  ↓ uses
Apollo Client
  ↓ queries/mutates
GraphQL API (/api/graphql)
  ↓ executes
GraphQL Resolvers
  ↓ calls
MongoDB Data Layer (lib/daily-record.ts)
  ↓ queries
MongoDB
```

## Key Features

### GraphQL Operations

**Queries:**
- `dailyRecord(date: String!)` - Get record for a specific date
- `dailyRecords(fromDate: String, toDate: String)` - List records with optional date range

**Mutations:**
- `saveDailyRecord(date: String!, input: DailyRecordInput!)` - Upsert a daily record

### Custom Hooks

- `useDailyRecord(date)` - Fetch and cache daily record, auto-refetch on date change
- `useSaveDailyRecord()` - Save record mutation with automatic cache updates

### Reusable Components

- **Button**: Variants (primary, secondary, ghost), sizes (sm, md, lg)
- **Card**: Container with hover states
- **Input**: Form input with label and error handling
- **TextListField**: Dynamic list input (used for right/wrong items)
- **Header**: Navigation header with active state
- **PageLayout**: Page wrapper with header
- **MainContent**: Content container with max-width

## Development Guidelines

1. **New Features**: Create GraphQL schema → resolvers → hooks → components → pages
2. **Reusable UI**: Add to `components/ui/` with proper TypeScript types
3. **Feature Logic**: Keep in `components/features/` or `hooks/`
4. **Data Access**: Always go through GraphQL, never direct MongoDB calls from components
5. **Type Safety**: Use TypeScript types from `types/index.ts`

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (required for database features)

## Next Steps

- Add more GraphQL queries/mutations as features grow
- Expand UI component library as needed
- Add authentication (replace anonymous user ID)
- Add more trackers (period, mood, etc.)
