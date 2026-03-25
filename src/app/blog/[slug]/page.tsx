import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostsMeta } from '@/lib/posts'
import { remark } from 'remark'
import html from 'remark-html'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate all static paths at build time
export async function generateStaticParams() {
  const posts = getAllPostsMeta()
  return posts.map(post => ({ slug: post.slug }))
}

// Dynamic SEO metadata per post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Kyra Kanojia'],
      siteName: 'Kyrascope',
    },
    alternates: {
      canonical: `https://www.kyrascope.com/blog/${slug}`,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // Convert markdown to HTML
  const processed = await remark().use(html).process(post.content)
  const contentHtml = processed.toString()

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Kyra Kanojia',
      url: 'https://www.kyrascope.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kyrascope',
      url: 'https://www.kyrascope.com',
    },
  }

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen pt-24" style={{ background: 'var(--cream)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Categories */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.categories.map(cat => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ background: 'var(--mint)', color: 'var(--dteal)' }}
              >
                {cat}
              </span>
            ))}
            {post.type === 'bridge' && (
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ background: 'var(--sun)', color: 'var(--orange)' }}
              >
                Reflections
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-1px',
            }}
          >
            {post.title}
          </h1>

          {/* Date */}
          <time
            className="text-sm block mb-12"
            style={{ color: 'rgba(26,26,46,0.4)' }}
            dateTime={post.date}
          >
            {formattedDate}
          </time>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            style={{ color: 'rgba(26,26,46,0.75)', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </article>
      <Footer />
    </>
  )
}
