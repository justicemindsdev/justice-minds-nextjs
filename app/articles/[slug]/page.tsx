import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Article } from '@/lib/types'

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Header />
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <article>
          {/* Article Header */}
          <header className="mb-12 pb-8 border-b border-border-grey">
            <div className="text-accent-red text-sm font-bold uppercase tracking-wider mb-2">
              {article.kicker}
            </div>
            <h1 className="font-serif text-5xl leading-tight font-bold mb-6">
              {article.title}
            </h1>
            <p className="text-xl leading-relaxed text-text-grey my-6">
              {article.excerpt}
            </p>
            {article.meta && (
              <div className="text-sm text-text-grey mt-6">
                {article.meta}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-primary-blue
              prose-p:text-lg prose-p:leading-relaxed prose-p:my-6
              prose-a:text-accent-red prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-dark prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-accent-red 
              prose-blockquote:bg-bg-light prose-blockquote:p-6 prose-blockquote:my-8
              prose-ul:my-6 prose-li:my-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border-grey bg-bg-light p-8 text-center">
            <h3 className="font-serif text-2xl mb-4 text-primary-blue">Share This Analysis</h3>
            <p className="mb-4 text-text-grey">If this investigation resonated with you, share it with others who need to see it.</p>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://justiceminds.co.uk/articles/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-red text-white px-8 py-3 no-underline font-semibold rounded hover:bg-[#a00000] transition-all"
            >
              Share on LinkedIn
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}

// Generate static params for all published articles
export async function generateStaticParams() {
  const { data: articles } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true)

  return articles?.map((article) => ({
    slug: article.slug,
  })) || []
}
