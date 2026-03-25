'use client';

import { useRef, useEffect } from 'react';

const festivals = [
  'EdiPlay',
  'Delta',
  'Crown',
  'Hollywood Monthly',
  '4th Dimension',
  'Indiefare',
  'Multi Dimension',
  'Cuckoo',
  'Lift-Off',
  'Nawada',
  'First-Time Filmmaker',
  'Black Panther',
];

export default function FilmAwards() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position += 1;
      if (position > marquee.scrollWidth / 2) {
        position = 0;
      }
      marquee.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section
      id="film"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b2027',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 60px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Film poster area */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1400px',
          marginBottom: '100px',
        }}
      >
        {/* Left: Poster */}
        <div
          style={{
            position: 'relative',
            perspective: '1200px',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '9/12',
              backgroundColor: '#1a1a2e',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
              transform: 'rotateY(-15deg) rotateX(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Poster gradient background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #2A5E7F 0%, #0b2027 50%, #1a3a4a 100%)',
              }}
            />

            {/* Poster content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '40px',
              }}
            >
              <h3
                style={{
                  fontSize: '64px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  marginBottom: '20px',
                  color: '#fff',
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                }}
              >
                बस 5 मिनट
              </h3>
              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.8)',
                  fontStyle: 'italic',
              }}
              >
                A film by Kyrascope
              </p>
            </div>

            {/* Play button */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
              }}
            >
              <a
                href="https://www.youtube.com/watch?v=d1z8a1f4nro"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--pink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 20px 40px rgba(239, 108, 139, 0.4)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(239, 108, 139, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 108, 139, 0.4)';
                }}
              >
                ▶
              </a>
            </div>
          </div>
        </div>

        {/* Right: Awards info */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(80px, 12vw, 140px)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, var(--pink) 0%, var(--orange) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}
            >
              12
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              International<br />Film Festival<br />Awards
            </div>
          </div>

          <div
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '500px',
              marginTop: '40px',
            }}
          >
            <p>
              "बस 5 मिनट" (Bas 5 Minute) is a short film that won 12 international film festival awards in 2022.
              This powerful story showcases the creative vision and filmmaking talent emerging from Kyrascope.
            </p>
          </div>

          <a
            href="https://www.youtube.com/watch?v=d1z8a1f4nro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '40px',
              backgroundColor: 'var(--pink)',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(239, 108, 139, 0.3)',
              cursor: 'pointer',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(239, 108, 139, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(239, 108, 139, 0.3)';
            }}
          >
            Watch the Film
          </a>
        </div>
      </div>

      {/* Marquee - Scrolling festivals */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '30px',
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          Award-Winning at These Festivals
        </div>

        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div
            ref={marqueeRef}
            style={{
              display: 'flex',
              gap: '60px',
              whiteSpace: 'nowrap',
              willChange: 'transform',
            }}
          >
            {/* First set */}
            {festivals.map((festival, index) => (
              <div
                key={`${festival}-1`}
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.8)',
                  flexShrink: 0,
                }}
              >
                ★ {festival}
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {festivals.map((festival, index) => (
              <div
                key={`${festival}-2`}
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.8)',
                  flexShrink: 0,
                }}
              >
                ★ {festival}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
