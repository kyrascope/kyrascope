'use client';

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--ink)',
        color: '#fff',
        padding: '60px 40px',
        borderTop: '2px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Top section - Logo and social */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '60px',
            paddingBottom: '60px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Logo section */}
          <div>
            <h2
              style={{
                fontSize: '32px',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                marginBottom: '16px',
                color: 'var(--pink)',
              }}
            >
              Kyrascope
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
                maxWidth: '400px',
              }}
            >
              A kaleidoscope of creative ideas, from a young creator exploring toys, technology, and storytelling.
            </p>
          </div>

          {/* Social links */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              justifyContent: 'flex-end',
            }}
          >
            {[
              { name: 'YouTube', url: 'https://www.youtube.com/@Kyrascope', icon: '▶' },
              { name: 'Instagram', url: 'https://www.instagram.com/kyrascopetv', icon: '📷' },
              { name: 'Facebook', url: 'https://www.facebook.com/kyrascopetv', icon: '📘' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const container = e.currentTarget as HTMLAnchorElement;
                  container.style.transform = 'translateY(-4px)';
                  const icon = container.querySelector('[data-icon]') as HTMLDivElement;
                  if (icon) icon.style.color = 'var(--pink)';
                }}
                onMouseLeave={(e) => {
                  const container = e.currentTarget as HTMLAnchorElement;
                  container.style.transform = 'translateY(0)';
                  const icon = container.querySelector('[data-icon]') as HTMLDivElement;
                  if (icon) icon.style.color = '#fff';
                }}
              >
                <div
                  data-icon
                  style={{
                    fontSize: '32px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {social.icon}
                </div>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom section - Copyright and tagline */}
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            © 2016-2026 Kyrascope. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500',
            }}
          >
            Made with ❤ from Noida, India
          </p>
        </div>
      </div>
    </footer>
  );
}
