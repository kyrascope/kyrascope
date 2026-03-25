'use client';

import { useState, useEffect } from 'react';

const youtubeVideos = [
  { id: 'video1', title: 'Latest Upload', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 'video2', title: 'Popular Review', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' },
];

export default function YouTubeSection() {
  const [activePhone, setActivePhone] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhone((prev) => (prev + 1) % youtubeVideos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="youtube"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--pink)',
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
          marginBottom: '100px',
          textAlign: 'center',
          letterSpacing: '-2px',
          textTransform: 'uppercase',
        }}
      >
        Play. Explore. Repeat.
      </h2>

      {/* Phone mockups container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '80px',
          maxWidth: '1200px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[0, 1].map((phoneIndex) => (
          <div
            key={phoneIndex}
            style={{
              position: 'relative',
              perspective: '1000px',
              transform: phoneIndex === 0 ? 'rotateY(-15deg) rotateX(5deg)' : 'rotateY(15deg) rotateX(5deg)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s ease',
            }}
          >
            {/* Phone frame */}
            <div
              style={{
                width: '280px',
                height: '580px',
                backgroundColor: '#000',
                borderRadius: '40px',
                padding: '12px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                margin: '0 auto',
                position: 'relative',
                border: '8px solid #1a1a2e',
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '150px',
                  height: '28px',
                  backgroundColor: '#000',
                  borderRadius: '0 0 20px 20px',
                  zIndex: 10,
                }}
              />

              {/* Screen content */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {youtubeVideos.map((video, index) => (
                  <div
                    key={video.id}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: activePhone === index ? 1 : 0,
                      transition: 'opacity 0.6s ease',
                      pointerEvents: activePhone === index ? 'auto' : 'none',
                    }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ display: 'block', borderRadius: '32px' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shine effect */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                borderRadius: '50px',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Subscribe button */}
      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <a
          href="https://www.youtube.com/@Kyrascope"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#fff',
            color: 'var(--pink)',
            padding: '20px 48px',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'var(--font-display)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
          }}
        >
          Subscribe on YouTube
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}
