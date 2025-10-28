# Developer Guide - Justice Minds

Comprehensive technical documentation for developers working on the Justice Minds platform.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Code Organization](#code-organization)
3. [Component Development](#component-development)
4. [API Development](#api-development)
5. [Database Operations](#database-operations)
6. [Styling Guidelines](#styling-guidelines)
7. [Testing](#testing)
8. [Performance Optimization](#performance-optimization)

---

## Architecture Overview

### Tech Stack Decisions

**Why Next.js 14 App Router?**
- Server-side rendering (SSR) + Static Site Generation (SSG)
- Built-in API routes (no separate Express server needed)
- File-based routing
- React Server Components for better performance
- Native TypeScript support

**Why Supabase over MongoDB?**
- PostgreSQL > NoSQL for relational data (articles have consistent structure)
- Built-in authentication ready for future admin panel
- Row Level Security (RLS) for data protection
- Real-time subscriptions (if needed later)
- Free tier sufficient for current needs
- Already licensed by Ben (ICO compliance)

**Why Tailwind CSS?**
- Utility-first approach = faster development
- Guardian design system easily implemented
- Smaller bundle size than traditional CSS frameworks
- Consistent spacing/sizing system
- Built-in responsive design

### Application Flow

```
User Request
    ↓
Next.js Server (Vercel)
    ↓
┌─────────────────────────┐
│  SSR/SSG Page Rendering │
│  (app/page.tsx)         │
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  Supabase Query         │
│  (lib/supabase.ts)      │
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  PostgreSQL Database    │
└─────────────────────────┘
    ↓
HTML Response to User
```

---

## Code Organization

### Directory Structure Explained

```
app/                    # Next.js App Router (v13+)
├── layout.tsx         # Root layout (wraps all pages)
├── page.tsx           # Homepage route
├── globals.css        # Global Tailwind imports
├── articles/
│   └── [slug]/
│       └── page.tsx   # Dynamic route for /articles/any-slug
└── api/
    └── articles/
        ├── route.ts   # /api/articles endpoint
        └── [id]/
            └── route.ts  # /api/articles/:id endpoint

components/            # Reusable React components
├── Header.tsx        # Site header + navigation
├── Footer.tsx        # Site footer
└── ArticleCard.tsx   # Article preview card

lib/                  # Utility functions and configs
├── supabase.ts       # Supabase client setup
└── types.ts          # TypeScript type definitions

supabase/             # Database configurations
└── schema.sql        # PostgreSQL schema
```

### File Naming Conventions

- **Components**: PascalCase (`ArticleCard.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **API Routes**: lowercase (`route.ts`)
- **Utilities**: camelCase (`supabase.ts`)
- **Types**: PascalCase interfaces (`Article`, `Database`)

---

## Component Development

### React Server Components (RSC)

By default, all components in `app/` directory are **Server Components**:

```tsx
// app/page.tsx - Server Component
async function getArticles() {
  // Can directly query database
  const { data } = await supabase.from('articles').select('*')
  return data
}

export default async function Page() {
  const articles = await getArticles()
  return <div>{/* Render articles */}</div>
}
```

**Benefits:**
- Zero JavaScript sent to client
- Direct database access
- Better SEO
- Faster initial page load

### Client Components

Use `'use client'` directive for interactivity:

```tsx
'use client'

import { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**When to use:**
- Event handlers (onClick, onChange)
- State management (useState, useReducer)
- Effects (useEffect)
- Browser APIs (window, document)

### Component Best Practices

```tsx
// ✅ GOOD: TypeScript interfaces
interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className={featured ? 'large' : 'normal'}>
      <h2>{article.title}</h2>
    </article>
  )
}

// ❌ BAD: No types
export default function ArticleCard({ article, featured }) {
  // ...
}
```

---

## API Development

### API Route Structure

```tsx
// app/api/articles/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  // Extract query parameters
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  
  // Query database
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .order('date', { ascending: false })
  
  // Handle errors
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
  
  // Return success
  return NextResponse.json(data)
}
```

### Error Handling Pattern

```tsx
try {
  const body = await request.json()
  
  // Validate input
  if (!body.title || !body.slug) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }
  
  // Process request
  const { data, error } = await supabaseAdmin
    .from('articles')
    .insert([body])
  
  if (error) throw error
  
  return NextResponse.json(data, { status: 201 })
  
} catch (error) {
  console.error('API Error:', error)
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

### API Authentication (Future)

```tsx
// lib/auth.ts (not yet implemented)
import { headers } from 'next/headers'

export async function verifyAuth() {
  const headersList = headers()
  const token = headersList.get('authorization')
  
  // Verify with Supabase Auth
  const { data, error } = await supabase.auth.getUser(token)
  
  if (error) throw new Error('Unauthorized')
  return data.user
}

// Usage in API route
export async function POST(request: Request) {
  const user = await verifyAuth() // Throws if not authenticated
  // ... proceed with authenticated operation
}
```

---

## Database Operations

### Querying Patterns

```tsx
// SELECT with filters
const { data } = await supabase
  .from('articles')
  .select('*')
  .eq('published', true)
  .order('date', { ascending: false })
  .limit(10)

// SELECT specific columns
const { data } = await supabase
  .from('articles')
  .select('id, title, slug, date')

// SELECT with search
const { data } = await supabase
  .from('articles')
  .select('*')
  .textSearch('title', 'permission')

// INSERT
const { data, error } = await supabase
  .from('articles')
  .insert([{
    slug: 'new-article',
    title: 'New Article',
    // ... other fields
  }])
  .select()
  .single()

// UPDATE
const { data } = await supabase
  .from('articles')
  .update({ published: true })
  .eq('id', articleId)
  .select()

// DELETE
const { error } = await supabase
  .from('articles')
  .delete()
  .eq('id', articleId)
```

### Type-Safe Queries

```tsx
import { Database } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(url, key)

// Now TypeScript knows article structure
const { data } = await supabase
  .from('articles')
  .select('*')
  .single()

// data is typed as Article
console.log(data.title) // ✅ TypeScript knows this exists
console.log(data.invalid) // ❌ TypeScript error
```

---

## Styling Guidelines

### Tailwind Utility Classes

```tsx
// ✅ GOOD: Semantic grouping
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white border border-grey
  hover:shadow-lg
  transition-all
">
```

```tsx
// ❌ BAD: Random order
<div className="hover:shadow-lg px-4 bg-white flex transition-all py-2">
```

### Guardian Design Tokens

```tsx
// Colors (use Tailwind classes)
bg-primary-blue     // #052962
bg-accent-red       // #c70000
text-text-dark      // #121212
text-text-grey      // #767676

// Typography
font-serif          // Libre Baskerville
font-sans           // Source Sans Pro

// Custom classes (globals.css)
guardian-hero       // Large serif headlines
guardian-deck       // Article summaries
guardian-nav        // Navigation bar
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  grid grid-cols-1          /* Mobile: 1 column */
  md:grid-cols-2            /* Tablet: 2 columns */
  lg:grid-cols-3            /* Desktop: 3 columns */
  gap-4                     /* Gap on all sizes */
">
```

---

## Testing

### Manual Testing Checklist

Before deploying:

```bash
# 1. Type checking
npm run type-check

# 2. Linting
npm run lint

# 3. Build test
npm run build

# 4. Start production build
npm start
# Test at http://localhost:3000
```

### Test Cases

**Homepage:**
- [ ] Hero article displays correctly
- [ ] Article grid loads all articles
- [ ] Article cards link to correct pages
- [ ] Scrollable article grid works
- [ ] Mobile responsive

**Article Pages:**
- [ ] Article content renders (HTML safe)
- [ ] Images load
- [ ] Share button works
- [ ] Mobile responsive
- [ ] Invalid slug shows 404

**API Endpoints:**
- [ ] GET /api/articles returns all
- [ ] GET /api/articles?published=true filters
- [ ] POST creates article
- [ ] PUT updates article
- [ ] DELETE removes article

---

## Performance Optimization

### Image Optimization

```tsx
// ✅ Use Next.js Image component
import Image from 'next/image'

<Image
  src={article.image_url}
  alt={article.title}
  width={600}
  height={400}
  className="..."
  priority={isHero} // Load hero images first
/>

// ❌ Don't use regular img tag
<img src={url} alt="..." />
```

### Database Query Optimization

```tsx
// ✅ Select only needed columns
const { data } = await supabase
  .from('articles')
  .select('id, title, slug, excerpt')
  .limit(10)

// ❌ Select everything when you don't need it
const { data } = await supabase
  .from('articles')
  .select('*')  // Fetches full content HTML unnecessarily
```

### Caching Strategy

```tsx
// Page caching (Next.js automatic)
export const revalidate = 3600 // Revalidate every hour

export default async function Page() {
  // This data is cached for 1 hour
  const articles = await getArticles()
  return <div>...</div>
}
```

---

## Common Patterns

### Loading States

```tsx
export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ArticlesList />
    </Suspense>
  )
}
```

### Error Handling

```tsx
export default function Page() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <ArticlesList />
    </ErrorBoundary>
  )
}
```

### Environment Variables

```tsx
// ✅ Client-side (prefixed with NEXT_PUBLIC_)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL

// ✅ Server-side only
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// ❌ Never expose secrets client-side
// Don't use service role key in browser
```

---

## Code Review Checklist

Before submitting PR:

- [ ] TypeScript errors resolved
- [ ] ESLint warnings fixed
- [ ] All imports use `@/` alias
- [ ] Components have TypeScript interfaces
- [ ] Error handling implemented
- [ ] Mobile responsive tested
- [ ] Accessibility considered (alt tags, ARIA labels)
- [ ] Performance optimized (image sizes, query efficiency)
- [ ] Code commented where complex
- [ ] Follows existing patterns

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Questions?** Contact the development team or refer to README.md for setup instructions.
