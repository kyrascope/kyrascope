import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Types
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  categories: string[]
  tags: string[]
  featuredImage?: string
  oldUrl?: string
  type?: 'original' | 'bridge'
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  categories: string[]
  type?: 'original' | 'bridge'
}

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')
const BRIDGE_DIR = path.join(process.cwd(), 'src/content/bridge-posts')

// Category ID → Name mapping (from WordPress export)
const CATEGORY_MAP: Record<number, string> = {
  1: 'Toy Reviews',
  571: 'Toy Stories',
  3: 'Videos',
  5: 'Parenting',
  7: 'Places & Travel',
  8: 'Food & Candy',
  11: 'Tech & STEM',
  // Will be populated from the full export
}

function getMarkdownPosts(dir: string, type: 'original' | 'bridge'): PostMeta[] {
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  return files.map(filename => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace('.md', ''),
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      categories: data.categories || [],
      type,
    }
  })
}

export function getAllPostsMeta(): PostMeta[] {
  const originals = getMarkdownPosts(POSTS_DIR, 'original')
  const bridges = getMarkdownPosts(BRIDGE_DIR, 'bridge')

  const all = [...originals, ...bridges]

  // Sort by date descending
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return all
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Check both directories
  for (const dir of [POSTS_DIR, BRIDGE_DIR]) {
    const filePath = path.join(dir, `${slug}.md`)
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        content,
        categories: data.categories || [],
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        oldUrl: data.oldUrl,
        type: dir === BRIDGE_DIR ? 'bridge' : 'original',
      }
    }
  }

  return null
}

export function getPostsByYear(): Record<string, PostMeta[]> {
  const posts = getAllPostsMeta()
  const byYear: Record<string, PostMeta[]> = {}

  posts.forEach(post => {
    const year = post.date.substring(0, 4)
    if (!byYear[year]) byYear[year] = []
    byYear[year].push(post)
  })

  return byYear
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter(p =>
    p.categories.some(c => c.toLowerCase() === category.toLowerCase())
  )
}
