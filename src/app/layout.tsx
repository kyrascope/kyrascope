import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Kyrascope — A Kaleidoscope of Ideas',
    template: '%s | Kyrascope',
  },
  description: 'From toy reviews at age 5 to futuristic tech, sustainability & Indian craft heritage — a decade of curiosity, creating & impact by Kyra Kanojia.',
  metadataBase: new URL('https://www.kyrascope.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Kyrascope',
    title: 'Kyrascope — A Kaleidoscope of Ideas',
    description: 'From toy reviews at age 5 to futuristic tech, sustainability & Indian craft heritage — a decade of curiosity, creating & impact.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.kyrascope.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
