/**
 * Automated Article Migration Script
 * Migrates all 11 articles from old site to Supabase database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Article data to migrate
const articles = [
  {
    slug: 'when-permission-fails',
    date: '2025-10-29',
    kicker: 'PERMISSION ARCHITECTURE',
    title: 'When Permission Fails: Why Those Who Understand Systems Most Are Least Allowed to Improve Them',
    excerpt: 'Shubham spent three years managing governmental contracts worth millions. But when the system failed him personally, his expertise became evidence of why he shouldn\'t be trusted to help others navigate it.',
    meta: 'By Ben Mak, Forensic Investigator | Permission Architecture Analyst',
    image_url: 'https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/COURT_OF_APPEAL/56799780-07AB-4074-8F11-ED88C0D04F1C.png',
    published: true
  },
  {
    slug: 'work-twice-hard-half-as-much',
    date: '2025-10-28',
    kicker: 'SYSTEMIC ANALYSIS',
    title: 'Working Twice as Hard to Earn Half as Much: The Hidden Economics of Being "Different"',
    excerpt: 'When you\'re neurodivergent or chronically ill, every professional achievement comes with an invisible price tag that neurotypical colleagues never see.',
    meta: 'By Ben Mak, Forensic Investigator',
    image_url: 'https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/COURT_OF_APPEAL/emotional_debt.png',
    published: true
  },
  {
    slug: 'reverse-teens-menopause-revolution',
    date: '2025-10-27',
    kicker: 'MEDICAL INSIGHT',
    title: 'The Reverse Teens Revolution: When Menopause Becomes Puberty 2.0',
    excerpt: 'My mother taught me more about menopause in five minutes than most women learn in five decades. The difference? She had the courage to say what everyone else whispers.',
    meta: 'By Ben Mak, Forensic Investigator',
    image_url: null,
    published: true
  },
  {
    slug: 'cultural-conditioning-freedom',
    date: '2025-10-26',
    kicker: 'CULTURAL ANALYSIS',
    title: 'Breaking Cultural Conditioning: The Journey from Compliance to Freedom',
    excerpt: 'What if the things you believe about success, family, and duty aren\'t actually yours? They\'re just cultural programming you inherited without consent.',
    meta: 'By Ben Mak, Forensic Investigator',
    image_url: null,
    published: true
  },
  {
    slug: 'investigation-hilton',
    date: '2025-10-25',
    kicker: 'INVESTIGATION',
    title: 'Hilton Homelessness Investigation: When Hotels House the Vulnerable',
    excerpt: 'Behind the polished facade of emergency accommodation lies a system designed to fail the people it claims to protect.',
    meta: 'Investigation by Ben Mak',
    image_url: null,
    published: true
  },
  {
    slug: 'shubham-story',
    date: '2025-10-24',
    kicker: 'PERSONAL STORY',
    title: 'Shubham\'s Story: When the System Fails Those Who Understand It Best',
    excerpt: 'Three years managing governmental contracts. One catastrophic illness. Zero support when he needed it most.',
    meta: 'Story documented by Ben Mak',
    image_url: null,
    published: true
  },
  {
    slug: 'cultural-exploitation-indian-workers',
    date: '2025-10-23',
    kicker: 'SYSTEMIC ANALYSIS',
    title: 'Cultural Exploitation: How Indian Workers Are Programmed for Western Profit',
    excerpt: 'The same cultural values that make Indian workers exceptional employees also make them exceptional targets for exploitation.',
    meta: 'By Ben Mak, Forensic Investigator',
    image_url: null,
    published: true
  },
  {
    slug: 'shubham-sick-brother',
    date: '2025-10-22',
    kicker: 'PERSONAL STORY',
    title: 'When Your Brother Gets Sick: A Story of Family, Duty, and Systemic Failure',
    excerpt: 'Shubham\'s brother\'s illness revealed the gap between cultural duty and systemic support.',
    meta: 'Story documented by Ben Mak',
    image_url: null,
    published: true
  },
  {
    slug: 'measuring-competence-beyond-exams',
    date: '2025-10-21',
    kicker: 'EDUCATION',
    title: 'Measuring Competence Beyond Exams: Why Grades Don\'t Measure Intelligence',
    excerpt: 'The exam system measures your ability to take exams, not your ability to think, create, or solve real problems.',
    meta: 'By Ben Mak, Forensic Investigator',
    image_url: null,
    published: true
  },
  {
    slug: 'the-one-person-principle',
    date: '2025-10-20',
    kicker: 'SYSTEMIC ANALYSIS',
    title: 'The One Person Principle: How Systems Rely on Individuals to Function',
    excerpt: 'Behind every "efficient system" is usually one person holding it together with duct tape and willpower.',
    meta: 'By Ben Mak, Forensic Investigator',
    image_url: null,
    published: true
  },
  {
    slug: 'ben-oversight-validation',
    date: '2025-10-19',
    kicker: 'LEGAL FRAMEWORK',
    title: 'Ben Mak Oversight Validation: Establishing Forensic Authority',
    excerpt: 'Documenting the legal framework and investigative methodology that underpins Justice Minds analysis.',
    meta: 'Legal Documentation by Ben Mak',
    image_url: null,
    published: true
  }
];

async function loadArticleContent(slug) {
  const oldSitePath = '/Users/judgemak/Documents/Justice-Minds-website/justice-minds-website/public/articles';
  const filePath = path.join(oldSitePath, `${slug}.html`);
  
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Extract main content (between <main> tags)
      const match = content.match(/<main[^>]*>([\s\S]*)<\/main>/);
      return match ? match[1].trim() : content;
    }
  } catch (error) {
    console.warn(`Could not load content for ${slug}:`, error.message);
  }
  
  return `<p>Content migration pending for ${slug}</p>`;
}

async function migrateArticles() {
  console.log('🚀 Starting article migration...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const article of articles) {
    try {
      console.log(`📝 Migrating: ${article.title}`);
      
      // Load article content from old site
      const content = await loadArticleContent(article.slug);
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('articles')
        .insert([{ ...article, content }])
        .select();
      
      if (error) {
        console.error(`❌ Error migrating ${article.slug}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Successfully migrated: ${article.slug}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Exception migrating ${article.slug}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📝 Total: ${articles.length}`);
  
  if (successCount === articles.length) {
    console.log('\n🎉 All articles migrated successfully!');
  } else {
    console.log('\n⚠️  Some articles failed to migrate. Check errors above.');
  }
}

// Run migration
migrateArticles()
  .then(() => {
    console.log('\n✨ Migration complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  });
