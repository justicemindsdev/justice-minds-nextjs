import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { supabase } from '@/lib/supabase'
import { Article } from '@/lib/types'

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const articles = await getArticles()
  const heroArticle = articles[0]
  const gridArticles = articles.slice(1)

  return (
    <>
      <Header />
      
      <main className="container-guardian">
        {/* Hero Article */}
        {heroArticle && (
          <section className="mb-12 pb-12 border-b border-border-grey">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="max-w-2xl">
                <div className="text-accent-red text-base font-bold uppercase tracking-wide mb-2">
                  {heroArticle.kicker}
                </div>
                <h1 className="guardian-hero mb-4">
                  {heroArticle.title}
                </h1>
                <p className="guardian-deck my-6">
                  {heroArticle.excerpt}
                </p>
                {heroArticle.meta && (
                  <div className="text-sm text-text-grey mt-4">
                    {heroArticle.meta}
                  </div>
                )}
                <a 
                  href={`/articles/${heroArticle.slug}`}
                  className="inline-block mt-6 bg-accent-red text-white px-8 py-3 no-underline font-semibold rounded hover:bg-[#a00000] hover:-translate-y-0.5 transition-all"
                >
                  Read Full Analysis
                </a>
              </div>
              
              <div>
                {heroArticle.image_url && (
                  <Image
                    src={heroArticle.image_url}
                    alt={heroArticle.title}
                    width={600}
                    height={500}
                    className="w-full h-[500px] object-contain rounded-sm bg-bg-light"
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Latest Investigations Section */}
        <h2 className="font-serif text-3xl mb-8 pb-2 border-b-4 border-primary-blue">
          Latest Investigations
        </h2>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[900px] overflow-y-auto p-4 border border-border-grey rounded">
          {gridArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Hidden anchor sections for navigation */}
        <div id="features" className="scroll-mt-24 hidden"></div>
        <div id="analysis" className="scroll-mt-24 hidden"></div>
        <div id="opinion" className="scroll-mt-24 hidden"></div>
        <div id="about" className="scroll-mt-24 hidden"></div>
        <div id="services" className="scroll-mt-24 hidden"></div>
      </main>

      <Footer />
    </>
  )
}
