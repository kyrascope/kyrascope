import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Editions from '@/components/Editions'
import YouTubeSection from '@/components/YouTubeSection'
import FilmAwards from '@/components/FilmAwards'
import Stories from '@/components/Stories'
import Timeline from '@/components/Timeline'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Kyrascope — A Kaleidoscope of Ideas',
  description: 'From toy reviews at age 5 to futuristic tech, sustainability & Indian craft heritage — Kyra Kanojia\'s decade of curiosity, creating & impact.',
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Editions />
        <YouTubeSection />
        <FilmAwards />
        <Stories />
        <Timeline />
      </main>
      <Footer />
    </>
  )
}
