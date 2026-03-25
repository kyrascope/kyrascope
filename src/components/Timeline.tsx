'use client';

import { useState } from 'react';

const timelineData = [
  {
    year: 2016,
    edition: 'The Beginning',
    description: 'Kyrascope launches with the first toy review video. A 5-year-old\'s journey into content creation begins.',
  },
  {
    year: 2017,
    edition: 'Growing Audience',
    description: 'Building momentum with consistent uploads and expanding toy review collection.',
  },
  {
    year: 2018,
    edition: 'Imagine Beyond',
    description: 'First themed edition exploring technology and imagination in toy innovation.',
  },
  {
    year: 2019,
    edition: 'Women Pioneers',
    description: 'Celebrating women in innovation and technology through curated content.',
  },
  {
    year: 2020,
    edition: 'Retro Fun',
    description: 'A nostalgic look at classic toys with modern perspectives.',
  },
  {
    year: 2021,
    edition: 'Learning & Creating',
    description: 'Expanding beyond toys to include apps, STEM content, and creative projects.',
  },
  {
    year: 2022,
    edition: 'Sustainable Planet',
    description: 'Award-winning short film "बस 5 मिनट" wins 12 international film festival awards.',
  },
  {
    year: 2023,
    edition: 'Future is Now',
    description: 'VR vlogging as India\'s youngest VR vlogger. Featured by VeeR VR.',
  },
  {
    year: 2024,
    edition: 'Evolution',
    description: 'Website expands with contributors including educationists, bloggers, and filmmakers.',
  },
  {
    year: 2025,
    edition: 'Beyond Screens',
    description: 'Kyrascope evolves beyond digital content into real-world experiences.',
  },
  {
    year: 2026,
    edition: 'From India to the World',
    description: 'A decade of creating. New website redesign. Building college applications with creative portfolio.',
  },
];

export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const selectedData = timelineData.find((item) => item.year === selectedYear);

  return (
    <section
      id="timeline"
      style={{
        minHeight: '100vh',
        backgroundColor: '#F0E6F6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 60px',
        color: '#1a1a2e',
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
          color: 'var(--ink)',
        }}
      >
        A Decade of Creating.
      </h2>

      {/* Timeline horizontal */}
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          marginBottom: '60px',
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: 'relative',
            height: '4px',
            backgroundColor: 'rgba(26, 26, 46, 0.1)',
            borderRadius: '2px',
            marginBottom: '40px',
          }}
        >
          {/* Progress line */}
          <div
            style={{
              position: 'absolute',
              height: '100%',
              backgroundColor: 'var(--pink)',
              borderRadius: '2px',
              width: `${((selectedYear - 2016) / (2026 - 2016)) * 100}%`,
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        {/* Timeline dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '20px',
          }}
        >
          {timelineData.map((item) => (
            <button
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              style={{
                position: 'relative',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: selectedYear === item.year ? '4px solid var(--pink)' : '4px solid rgba(26, 26, 46, 0.2)',
                backgroundColor: selectedYear === item.year ? 'var(--pink)' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: selectedYear === item.year ? '#fff' : 'var(--ink)',
              }}
              onMouseEnter={(e) => {
                if (selectedYear !== item.year) {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = 'scale(1.2)';
                  btn.style.borderColor = 'var(--pink)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedYear !== item.year) {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.transform = 'scale(1)';
                  btn.style.borderColor = 'rgba(26, 26, 46, 0.2)';
                }
              }}
              title={item.year.toString()}
            >
              {item.year.toString().slice(-2)}
            </button>
          ))}
        </div>
      </div>

      {/* Year labels under timeline */}
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'rgba(26, 26, 46, 0.6)',
          marginBottom: '80px',
        }}
      >
        <span>{timelineData[0].year}</span>
        <span>{timelineData[timelineData.length - 1].year}</span>
      </div>

      {/* Selected year preview card */}
      {selectedData && (
        <div
          style={{
            maxWidth: '700px',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '60px 40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            border: '2px solid rgba(239, 108, 139, 0.2)',
            textAlign: 'center',
            animation: 'fadeIn 0.4s ease',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              color: 'var(--pink)',
              marginBottom: '16px',
            }}
          >
            {selectedData.year}
          </div>
          <h3
            style={{
              fontSize: '32px',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              color: 'var(--ink)',
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}
          >
            {selectedData.edition}
          </h3>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: 'rgba(26, 26, 46, 0.8)',
            }}
          >
            {selectedData.description}
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
