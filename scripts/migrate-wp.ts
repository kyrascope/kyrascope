/**
 * WordPress → Markdown Migration Script
 *
 * Reads the WP REST API export JSON and converts each post into
 * a frontmatter-annotated Markdown file for the Next.js blog.
 *
 * Usage: npx tsx scripts/migrate-wp.ts
 */

import fs from 'fs'
import path from 'path'

// Category ID → clean name mapping
const CAT_MAP: Record<number, string> = {
  1: 'Toy Reviews',
  571: 'Toy Stories',
  3: 'Videos',
  14: 'Parenting',
  22: 'Places & Travel',
  23: 'Food & Candy',
  16: 'Tech & STEM',
  247: 'Kyrascope Calendar',
  248: 'Kyrascope Calendar',
  673: 'Kyrascope Calendar',
  674: 'Kyrascope Calendar',
  76: 'Kids Apps',
  85: 'Movie Reviews',
  560: 'Feelings Through Art',
}

function decodeHtml(html: string): string {
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&hellip;/g, '…')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
}

function htmlToMarkdown(html: string): string {
  let md = html
    // Remove WordPress-specific stuff
    .replace(/<!-- wp:.*?-->/g, '')
    .replace(/<!-- \/wp:.*?-->/g, '')
    // Headers
    .replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (_, level, text) =>
      '\n' + '#'.repeat(parseInt(level)) + ' ' + decodeHtml(text.replace(/<[^>]*>/g, '')) + '\n'
    )
    // Bold & italic
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    // Lists
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1')
    .replace(/<\/?[ou]l[^>]*>/gi, '\n')
    // Paragraphs & line breaks
    .replace(/<p[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // iframes (YouTube embeds etc)
    .replace(/<iframe[^>]*src="([^"]*)"[^>]*>.*?<\/iframe>/gi, '\n[Embedded Video]($1)\n')
    // Remaining tags
    .replace(/<[^>]*>/g, '')
    // Decode entities

  md = decodeHtml(md)

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n').trim()

  return md
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80)
}

async function migrate() {
  // Read the WP export
  const exportPath = path.join(__dirname, '..', '..', 'mnt', 'Kyrascope', 'Website export', 'kyrascope_wp_export.json')

  if (!fs.existsSync(exportPath)) {
    console.error('Export file not found at:', exportPath)
    console.log('Looking for alternative paths...')
    // Try other possible locations
    const altPaths = [
      path.join(process.cwd(), '..', 'mnt', 'Kyrascope', 'Website export', 'kyrascope_wp_export.json'),
      path.join(process.cwd(), 'data', 'kyrascope_wp_export.json'),
    ]
    for (const p of altPaths) {
      if (fs.existsSync(p)) {
        console.log('Found at:', p)
      }
    }
    return
  }

  const raw = fs.readFileSync(exportPath, 'utf-8')
  const data = JSON.parse(raw)

  const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts')
  fs.mkdirSync(postsDir, { recursive: true })

  let count = 0
  const redirects: { source: string; destination: string }[] = []

  for (const post of data.posts) {
    const title = decodeHtml(post.title)
    const slug = post.slug || slugify(title)
    const date = post.date?.substring(0, 10) || '2016-01-01'
    const excerpt = decodeHtml((post.excerpt || '').replace(/<[^>]*>/g, '').trim()).substring(0, 200)
    const categories = (post.cats || [])
      .map((id: number) => CAT_MAP[id] || 'Kyrascope')
      .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i) // dedupe
    const content = post.content ? htmlToMarkdown(post.content) : ''

    // Build old URL path for redirects
    const oldUrl = post.link || ''
    const oldPath = oldUrl.replace('https://www.kyrascope.com', '')

    if (oldPath && oldPath !== '/') {
      redirects.push({
        source: oldPath.endsWith('/') ? oldPath.slice(0, -1) : oldPath,
        destination: `/blog/${slug}`,
      })
    }

    // Write markdown file with frontmatter
    const md = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
categories: [${categories.map((c: string) => `"${c}"`).join(', ')}]
oldUrl: "${oldUrl}"
---

${content}
`

    fs.writeFileSync(path.join(postsDir, `${slug}.md`), md)
    count++
  }

  console.log(`\n✅ Migrated ${count} posts to ${postsDir}`)

  // Write redirects config
  const redirectsPath = path.join(__dirname, '..', 'src', 'lib', 'redirects.json')
  fs.writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2))
  console.log(`📎 Saved ${redirects.length} URL redirects to ${redirectsPath}`)

  // Write stats
  const years: Record<string, number> = {}
  data.posts.forEach((p: any) => {
    const y = p.date?.substring(0, 4) || '????'
    years[y] = (years[y] || 0) + 1
  })
  console.log('\n📊 Posts by year:')
  Object.keys(years).sort().forEach(y => console.log(`   ${y}: ${years[y]}`))
}

migrate().catch(console.error)
