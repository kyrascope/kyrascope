'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Editions', href: '#editions' },
  { label: 'YouTube', href: '#youtube' },
  { label: 'Film', href: '#film' },
  { label: 'Stories', href: '#stories' },
  { label: 'Timeline', href: '#timeline' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Floating nav circles */}
      <div className="fixed top-5 left-5 right-5 z-[1000] flex justify-between items-start pointer-events-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto text-lg shadow-lg transition-all duration-300"
          style={{
            background: isOpen ? 'var(--pink)' : 'var(--teal)',
            color: '#fff',
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <button
          className="w-13 h-13 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto text-lg shadow-lg transition-all duration-300"
          style={{ background: 'var(--pink)', color: '#fff' }}
        >
          ⚡
        </button>
      </div>

      {/* Center logo */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1001] pointer-events-auto transition-all duration-400 ${
          scrolled ? 'scale-75' : ''
        }`}
      >
        <a href="/">
          <img src="/images/logo/kyrascope-logo.webp" alt="Kyrascope" className="h-8" />
        </a>
      </div>

      {/* Full-screen nav overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] grid grid-cols-[1fr_1.2fr_1fr] transition-all duration-600"
          style={{ background: 'var(--dteal)' }}
        >
          <div className="flex flex-col justify-center px-15 relative z-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-bold text-white/25 hover:text-yellow-400 hover:translate-x-3 transition-all duration-400 uppercase tracking-tighter leading-tight py-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 5vw, 64px)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center">
            {/* K cutout area — transparent center */}
          </div>

          <div className="flex flex-col justify-center px-12 relative z-3">
            <h3
              className="font-bold text-white uppercase leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 48px)' }}
            >
              Let&apos;s <span style={{ color: 'var(--yellow)' }}>Connect</span>
            </h3>
            <p className="text-sm text-white/55 leading-relaxed mb-7 max-w-xs">
              Collaborations, calendars, film screenings — let&apos;s create something amazing together.
            </p>
            <a
              href="mailto:manishkanojia@gmail.com"
              className="inline-block px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'var(--pink)',
                color: '#fff',
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </>
  )
}
