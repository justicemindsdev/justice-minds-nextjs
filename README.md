# Justice Minds - Next.js Production Architecture

Modern, production-ready rebuild of Justice Minds Forensic Intelligence website using Next.js 14, Supabase, and Tailwind CSS.

## 🎯 Project Overview

This is a **complete modernization** of the original HTML-based Justice Minds website, combining:
- **Esrail's recommendations**: Next.js frontend, Node.js backend, database integration
- **Optimized architecture**: Next.js API routes (instead of separate Express), Supabase PostgreSQL, Guardian-style design system

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend**: Next.js API Routes (built-in Node.js)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS + Guardian design system
- **Deployment**: Vercel
- **Type Safety**: TypeScript

## 📁 Project Structure

```
justice-minds-2/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── articles/
│   │   └── [slug]/page.tsx     # Dynamic article pages (SSG)
│   └── api/
│       └── articles/
│           ├── route.ts         # GET all, POST new
│           └── [id]/route.ts    # GET, PUT, DELETE by ID
├── components/
│   ├── Header.tsx               # Guardian-style header + nav
│   ├── Footer.tsx               # Footer with links
│   └── ArticleCard.tsx          # Article grid card
├── lib/
│   ├── supabase.ts              # Supabase clients
│   └── types.ts                 # TypeScript types
├── supabase/
│   └── schema.sql               # Database schema
├── public/                       # Static assets
├── .env.local.example           # Environment variables template
└── package.json                 # Dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### 1. Clone & Install

```bash
cd /Users/judgemak/Documents/justice-minds-2
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

3. Run the database schema:
   - Go to **SQL Editor** in Supabase
   - Copy contents of `supabase/schema.sql`
   - Run the SQL

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=your_email@example.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The `articles` table structure:

| Column       | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| id          | UUID      | Primary key                           |
| slug        | TEXT      | URL-friendly ID (e.g., "when-permission-fails") |
| date        | DATE      | Publication date                      |
| kicker      | TEXT      | Category (e.g., "INVESTIGATION")     |
| title       | TEXT      | Article title                         |
| excerpt     | TEXT      | Brief summary                         |
| content     | TEXT      | Full HTML content                     |
| meta        | TEXT      | Author byline (optional)             |
| image_url   | TEXT      | Featured image URL (optional)        |
| published   | BOOLEAN   | Publication status                    |
| created_at  | TIMESTAMP | Auto-generated                        |
| updated_at  | TIMESTAMP | Auto-updated on changes              |

## 🔌 API Endpoints

### Articles API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/articles` | Get all articles |
| GET    | `/api/articles?published=true` | Get published articles only |
| POST   | `/api/articles` | Create new article |
| GET    | `/api/articles/[id]` | Get article by ID |
| PUT    | `/api/articles/[id]` | Update article |
| DELETE | `/api/articles/[id]` | Delete article |

### Example: Create Article

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-article",
    "date": "2025-10-28",
    "kicker": "ANALYSIS",
    "title": "Test Article",
    "excerpt": "This is a test article excerpt.",
    "content": "<p>Full HTML content here...</p>",
    "meta": "By Author Name",
    "image_url": "https://example.com/image.jpg",
    "published": true
  }'
```

## 🎨 Guardian Design System

The site uses Guardian newspaper-inspired styling:

**Colors:**
- Primary Blue: `#052962`
- Accent Red: `#c70000`
- Text Dark: `#121212`
- Text Grey: `#767676`

**Fonts:**
- Headings: Libre Baskerville (serif)
- Body: Source Sans Pro (sans-serif)

**Custom Tailwind Classes:**
- `.guardian-hero` - Large serif headlines
- `.guardian-deck` - Article summaries
- `.guardian-nav` - Sticky navigation
- `.container-guardian` - Max-width content wrapper

## 📦 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 📝 Adding New Articles

### Via API (Recommended for CMS)

Use the POST endpoint (see API section above)

### Via Supabase Dashboard

1. Go to Supabase → Table Editor
2. Select `articles` table
3. Click "Insert row"
4. Fill in article data
5. Set `published = true`

### Migration from Old Site

See `MIGRATION_GUIDE.md` for detailed instructions on migrating existing HTML articles to the database.

## 🛡️ Security

- Row Level Security (RLS) enabled on Supabase
- Public read access to published articles only
- Admin operations require authentication
- Service role key kept server-side only
- No sensitive data in client-side code

## 🐛 Troubleshooting

### TypeScript Errors
```bash
npm run type-check
```

### Database Connection Issues
- Verify Supabase credentials in `.env.local`
- Check Supabase project status
- Ensure RLS policies are correct

### Build Failures
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Documentation

- `DEVELOPER_GUIDE.md` - Comprehensive developer documentation
- `MIGRATION_GUIDE.md` - Migrating from old HTML site
- `DEPLOYMENT_GUIDE.md` - Production deployment steps

## 🤝 Handoff to Esrail

This codebase is ready for Esrail to take over. Key points:

1. **Next.js expertise applied** - Modern App Router pattern
2. **Node.js backend** - Via Next.js API routes (simpler than separate Express)
3. **Supabase PostgreSQL** - As recommended
4. **Production-ready** - TypeScript, error handling, optimization
5. **Documented** - Extensive comments and guides

## 📧 Contact

**Ben Mak**  
Justice Minds Forensic Intelligence Ltd  
Company Number: 16331423  
ICO Certified: ZB896365

---

Built with ❤️ for forensic justice and systems restoration
