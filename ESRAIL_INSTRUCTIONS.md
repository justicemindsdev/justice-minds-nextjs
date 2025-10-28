# Instructions for Esrail - Justice Minds Deployment

**Complete these tasks to finish the project. Budget: £150-180 (5-6 hours work)**

---

## ⚡ IMPORTANT: PROJECT IS 95% COMPLETE

✅ **ALREADY DONE FOR YOU:**
- Complete Next.js codebase built
- Supabase project created and configured
- All API credentials added to `.env.local`
- Database schema written in `supabase/schema.sql`
- All components, pages, and API routes ready
- Full documentation and guides

**YOUR ACTUAL WORK (5-6 hours):**
1. Run database schema (2 minutes)
2. Test locally (10 minutes)
3. Deploy to Vercel (10 minutes)
4. Migrate 11 articles to database (2-3 hours)
5. Testing (1 hour)
6. 1 week support

---

## ✅ TASK CHECKLIST

### **PHASE 1: Database Setup (30 minutes max)**

#### 1.1 Access Supabase (Already Created)
Ben has already created the Supabase project. You'll receive:
- Supabase project URL
- Dashboard access
- All credentials are in `.env.local`

#### 1.2 Run Database Schema (2 minutes)
1. Log into Supabase dashboard (credentials from Ben)
2. Go to **SQL Editor**
3. Click **New Query**
4. Open file: `supabase/schema.sql` from project
5. Copy entire contents
6. Paste into SQL Editor
7. Click **Run**
8. Verify: Go to **Table Editor** → You should see `articles` table with columns

✅ **Send Ben screenshot** of articles table created

#### 1.3 Test Locally (10 minutes)
```bash
cd /Users/judgemak/Documents/justice-minds-2
npm install          # Install dependencies (1 minute)
npm run dev         # Start dev server
```

Open http://localhost:3000 in browser
- You should see empty homepage (no articles yet - that's correct)
- Check browser console - should be no errors

✅ **Send Ben screenshot** of working localhost + console

---

### **PHASE 2: Migrate Content (2-3 hours)**

#### 2.1 Extract Article Data from Old Site
Go to `/Users/judgemak/Documents/Justice-Minds-website/public/index.html`

Find the `articles` array (around line 650). Copy each article.

#### 2.2 Add Articles to Supabase
Go to Supabase → **Table Editor** → `articles` table

For each of the 11 articles, click **Insert** → **Insert row**:

**Example Article 1:**
```
slug: when-permission-fails
date: 2025-10-29
kicker: PERMISSION ARCHITECTURE
title: When Permission Fails: Why Those Who Understand Systems Most Are Least Allowed to Improve Them
excerpt: Shubham spent three years managing governmental contracts... (copy full excerpt)
content: (copy FULL HTML from when-permission-fails.html)
meta: By Ben Mak, Forensic Investigator | Permission Architecture Analyst
image_url: https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/COURT_OF_APPEAL/56799780-07AB-4074-8F11-ED88C0D04F1C.png
published: true
```

**Repeat for all 11 articles:**
1. when-permission-fails
2. work-twice-hard-half-as-much
3. reverse-teens-menopause-revolution
4. cultural-conditioning-freedom
5. investigation-hilton
6. shubham-story
7. cultural-exploitation-indian-workers
8. shubham-sick-brother
9. measuring-competence-beyond-exams
10. the-one-person-principle
11. ben-oversight-validation

#### 2.3 Test Articles Load
```bash
npm run dev
```
Open http://localhost:3000 - should see all 11 articles

✅ **Send Ben screenshot** of articles loading

---

### **PHASE 3: Deploy to Vercel (10 minutes)**

#### 3.1 Deploy to Vercel (Ben will provide GitHub repo)
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click **Add New** → **Project**
4. Import the GitHub repo (Ben will share access)
5. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Environment Variables (Ben will provide):**
   - Ben has all credentials in `.env.local`
   - He'll add them to Vercel for you OR
   - Copy from `.env.local` (if Ben gives you access)

7. Click **Deploy**
8. Wait 2-3 minutes
9. Get the live URL: `https://justice-minds-xxxxx.vercel.app`

✅ **Send Ben the live URL**

---

### **PHASE 4: Testing (1 hour)**

#### 4.1 Test Homepage
- [ ] Hero article displays
- [ ] Article grid shows all 11 articles
- [ ] Scrolling works
- [ ] Mobile responsive (test on phone)

#### 4.2 Test Article Pages
Visit each article URL:
- [ ] `/articles/when-permission-fails`
- [ ] `/articles/work-twice-hard-half-as-much`
- (test all 11)

Check:
- [ ] Title displays
- [ ] Content loads (full HTML)
- [ ] Images show
- [ ] Share button works

#### 4.3 Test Navigation
- [ ] Header navigation links work
- [ ] Footer links work
- [ ] Mobile menu works

✅ **Send Ben testing checklist completed**

---

### **PHASE 5: Domain Setup (Optional)**

If Ben wants custom domain:

1. In Vercel → Project Settings → Domains
2. Add `justiceminds.co.uk`
3. Follow Vercel DNS instructions
4. Update in Ben's domain registrar

---

## 📋 DELIVERY CHECKLIST

Before asking for final payment:

- [ ] Supabase database created with all 11 articles
- [ ] Site deployed to Vercel (live URL)
- [ ] All articles loading correctly
- [ ] Mobile responsive working
- [ ] Navigation working
- [ ] Images loading
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse score >80)

---

## 🐛 TROUBLESHOOTING

### "Build failed in Vercel"
```bash
# Test build locally first
npm run build
# Fix any TypeScript errors
npm run type-check
```

### "Articles not showing"
- Check Supabase credentials in Vercel environment variables
- Verify articles have `published = true` in database

### "Images not loading"
- Check image URLs are correct in database
- Verify Supabase storage is public

### "Slow performance"
- Check image sizes (should be optimized)
- Verify database queries in API routes

---

## 💬 SUPPORT (1 Week After Launch)

**Included in budget:**
- Fix any bugs found in first week
- Minor styling adjustments
- Help Ben understand the code
- Answer technical questions

**NOT included (would be extra):**
- New features
- Major redesigns
- Admin panel
- Ongoing monthly maintenance

---

## 📧 PROGRESS UPDATES

**Within 24 hours:**
- "Database schema running - articles table created ✅"
- "Local testing complete - site works ✅"

**Within 48 hours:**
- "All 11 articles migrated to database ✅"
- "Deployed to Vercel - live at: [URL] ✅"

**Within 72 hours:**
- "Full testing complete - checklist attached ✅"
- "Project complete - ready for handoff ✅"

---

## ✅ COMPLETION & PAYMENT

When everything above is done:
1. Send Ben:
   - Final testing report (all checkboxes ✅)
   - Live Vercel URL
   - Confirmation all 11 articles working
2. Ben will verify everything works
3. Request final payment (£150-180)
4. Begin 1-week support period

---

## 💰 BUDGET BREAKDOWN

**Total: £150-180 for 5-6 hours**

- Database setup: 0.5 hours (schema already written)
- Article migration: 2-3 hours (manual data entry)
- Deployment: 0.5 hours (straightforward Vercel deploy)
- Testing: 1 hour (systematic checks)
- Support: 1 week (bug fixes only)

**Why so low?** Ben already built 95% of the project:
- ✅ Complete codebase
- ✅ Supabase configured
- ✅ All credentials ready
- ✅ Schema written
- ✅ Full documentation

You're just executing the final deployment steps.

---

**Questions? Ask Ben directly - all documentation is in the codebase.**
