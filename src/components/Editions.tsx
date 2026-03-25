'use client';

import { useState, useRef, useEffect } from 'react';

const editions = [
  { year: 2018, title: 'Imagine Beyond', description: 'Exploring technology and imagination' },
  { year: 2019, title: 'Women Pioneers', description: 'Celebrating women in innovation' },
  { year: 2020, title: 'Retro Fun', description: 'Nostalgia meets modern play' },
  { year: 2022, title: 'Sustainable Planet', description: 'Eco-friendly adventures' },
  { year: 2023, title: 'Future is Now', description: 'Tomorrow\'s technology today' },
  { year: 2025, title: 'Beyond Screens', description: 'Real-world experiences' },
  { year: 2026, title: 'From India to the World', description: 'Global stories, local roots' },
];

export default function Editions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? editions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === editions.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dragEnd = e.changedTouches[0].clientX;
    if (dragEnd < dragStart - 50) {
      handleNext();
    } else if (dragEnd > dragStart + 50) {
      handlePrev();
    }
    setIsDragging(false);
  };

  return (
    <section
      id="editions"
      style={{
        minHeight: '100vh',
        backgroundColor: '#45BFB5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 60px',
        color: '#fff',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(48px, 8vw, 72px)',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          marginBottom: '80px',
          textAlign: 'center',
          letterSpacing: '-2px',
          textTransform: 'uppercase',
        }}
      >
        Every Year, A New World.
      </h2>

      {/* Carousel container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel track */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '20px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {editions.map((edition, index) => {
            const offset = index - currentIndex;
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 3;

            return (
              <div
                key={edition.year}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(${offset * 100}%)`,
                  transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
                  pointerEvents: isVisible ? 'auto' : 'none',
                  position: 'relative',
                  left: `calc(${offset * 100}% + ${offset * 20}px)`,
                }}
              >
                <div
                  style={{
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    border: isActive ? '2px solid rgba(255, 255, 255, 0.8)' : '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                  }}
                  onClick={() => handleDotClick(index)}
                >
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '12px',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {edition.year}
                  </div>
                  <h3
                    style={{
                      fontSize: isActive ? '24px' : '20px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      marginBottom: '12px',
                      transition: 'font-size 0.4s ease',
                      letterSpacing: '-1px',
                    }}
                  >
                    {edition.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      opacity: isActive ? 1 : 0.7,
                      lineHeight: 1.5,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    {edition.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '-80px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-display)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ←
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '-80px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-display)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          →
        </button>
      </div>

      {/* Dot pagination */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '60px',
          justifyContent: 'center',
        }}
      >
        {editions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              width: currentIndex === index ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              backgroundColor: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
