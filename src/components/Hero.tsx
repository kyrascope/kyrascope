'use client';

import { useState, useEffect } from 'react';

const youtubeVideos = [
  { id: 'video1', title: 'Latest Review', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 'video2', title: 'Toy Unboxing', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' },
  { id: 'video3', title: 'VR Adventure', url: 'https://www.youtube.com/embed/9bZkp7q19f0' },
];

const calendarEditions = [
  'Calendar 2024',
  'Calendar 2025',
  'Calendar 2026',
];

export default function Hero() {
  const [cardOrder, setCardOrder] = useState<('phone' | 'film' | 'calendar')[]>(['phone', 'film', 'calendar']);
  const [videoIndex, setVideoIndex] = useState(0);
  const [calendarIndex, setCalendarIndex] = useState(0);

  // Auto-cycle videos
  useEffect(() => {
    const videoTimer = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % youtubeVideos.length);
    }, 4000);
    return () => clearInterval(videoTimer);
  }, []);

  // Auto-cycle calendar editions
  useEffect(() => {
    const calendarTimer = setInterval(() => {
      setCalendarIndex((prev) => (prev + 1) % calendarEditions.length);
    }, 4000);
    return () => clearInterval(calendarTimer);
  }, []);

  // Auto-shuffle every 5s
  useEffect(() => {
    const shuffleTimer = setInterval(() => {
      setCardOrder((prev) => {
        const rotated = [...prev];
        rotated.unshift(rotated.pop()!);
        return rotated;
      });
    }, 5000);
    return () => clearInterval(shuffleTimer);
  }, []);

  const handleCardClick = (cardType: 'phone' | 'film' | 'calendar') => {
    const currentIndex = cardOrder.indexOf(cardType);
    if (currentIndex === 1) {
      // Center card clicked - scroll to section
      const nextSection = cardType === 'phone' ? 'youtube' : cardType === 'film' ? 'film' : 'editions';
      const element = document.getElementById(nextSection);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Back card clicked - bring to center
      setCardOrder((prev) => {
        const newOrder = [...prev];
        const index = newOrder.indexOf(cardType);
        if (index !== -1) {
          newOrder.splice(index, 1);
          newOrder.splice(1, 0, cardType);
        }
        return newOrder;
      });
    }
  };

  const getCardPosition = (index: number) => {
    if (index === 0) return 'slot-left';
    if (index === 1) return 'slot-center';
    return 'slot-right';
  };

  const renderCard = (cardType: 'phone' | 'film' | 'calendar', positionIndex: number) => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      cursor: 'pointer',
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
      willChange: 'transform, opacity',
    };

    if (positionIndex === 0) {
      // slot-left
      Object.assign(baseStyle, {
        left: '0px',
        top: '50%',
        transform: 'translateY(-50%) translateX(-80px) rotateY(35deg) scale(0.85)',
        opacity: 0.4,
        zIndex: 1,
      });
    } else if (positionIndex === 1) {
      // slot-center
      Object.assign(baseStyle, {
        left: '50%',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 10,
      });
    } else {
      // slot-right
      Object.assign(baseStyle, {
        right: '0px',
        top: '50%',
        transform: 'translateY(-50%) translateX(80px) rotateY(-35deg) scale(0.85)',
        opacity: 0.4,
        zIndex: 1,
      });
    }

    const cardStyle: React.CSSProperties = {
      width: '280px',
      height: '480px',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: positionIndex === 1 ? '0 20px 40px rgba(0,0,0,0.2)' : '0 10px 20px rgba(0,0,0,0.1)',
      backgroundColor: 'var(--cream)',
    };

    if (cardType === 'phone') {
      return (
        <div key="phone" style={baseStyle} onClick={() => handleCardClick('phone')}>
          <div style={cardStyle}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={youtubeVideos[videoIndex].url}
                title={youtubeVideos[videoIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      );
    } else if (cardType === 'film') {
      return (
        <div key="film" style={baseStyle} onClick={() => handleCardClick('film')}>
          <div style={cardStyle}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1a1a2e',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'var(--font-display)',
                  padding: '20px',
                }}
              >
                बस 5 मिनट
              </div>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--pink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                ▶
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'var(--orange)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                12 Awards
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key="calendar" style={baseStyle} onClick={() => handleCardClick('calendar')}>
          <div style={cardStyle}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--teal)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {calendarEditions[calendarIndex]}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Mark your moments
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--cream)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        padding: '80px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Speech bubbles - floating elements */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '100px',
          height: '60px',
          backgroundColor: 'var(--pink)',
          borderRadius: '12px',
          opacity: 0.3,
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '8%',
          width: '80px',
          height: '50px',
          backgroundColor: 'var(--teal)',
          borderRadius: '12px',
          opacity: 0.2,
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      {/* Left side */}
      <div style={{ zIndex: 5 }}>
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.1,
            marginBottom: '40px',
            fontWeight: 900,
            color: 'var(--ink)',
          }}
        >
          A{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #FF0080, #FF8C00, #40E0D0, #FF0080)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Kaleidoscope
          </span>
          {' '}of Ideas
        </h1>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            marginTop: '60px',
          }}
        >
          {[
            { label: 'Views', value: '1M+' },
            { label: 'Film Awards', value: '12' },
            { label: 'Countries', value: '50+' },
            { label: 'Years', value: '10' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--pink)',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  opacity: 0.6,
                  marginTop: '8px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Card carousel */}
      <div
        style={{
          position: 'relative',
          height: '600px',
          perspective: '1200px',
        }}
      >
        {cardOrder.map((cardType, index) => renderCard(cardType, index))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
