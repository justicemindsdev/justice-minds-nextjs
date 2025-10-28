import Link from 'next/link'
import { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white border border-border-grey rounded hover:shadow-lg hover:-translate-y-1 transition-all h-fit">
      <div className="p-6">
        <div className="text-accent-red text-xs font-bold uppercase tracking-wide mb-2">
          {article.kicker}
        </div>
        <h2 className="font-serif text-xl leading-tight mb-4">
          <Link 
            href={`/articles/${article.slug}`}
            className="text-text-dark no-underline hover:text-accent-red transition-colors"
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-text-grey text-base leading-relaxed mb-3">
          {article.excerpt.substring(0, 150)}...
        </p>
        <Link 
          href={`/articles/${article.slug}`}
          className="inline-block mt-3 text-accent-red font-semibold no-underline text-sm hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
