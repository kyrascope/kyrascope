'use client';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  icon: string;
}

const stories: Story[] = [
  {
    id: 'story-1',
    title: 'The Magic of AR Toys',
    excerpt: 'Exploring how augmented reality is transforming the toy industry and opening new dimensions of play.',
    tags: ['Toys', 'AR/VR', 'Innovation'],
    icon: '🧩',
  },
  {
    id: 'story-2',
    title: 'India\'s Youngest VR Vlogger',
    excerpt: 'A journey through virtual reality vlogging and how it opened doors to new creative possibilities.',
    tags: ['VR', 'Vlogging', 'Popular'],
    icon: '🥽',
  },
  {
    id: 'story-3',
    title: 'Sustaining Play, Saving the Planet',
    excerpt: 'Why eco-friendly toys matter and how we\'re reviewing sustainable play options for the future.',
    tags: ['Toys', 'Sustainability', 'Blog'],
    icon: '🌱',
  },
  {
    id: 'story-4',
    title: 'Breaking Ground in Filmmaking',
    excerpt: '"बस 5 मिनट" - A short film that won 12 international awards and proved age is just a number.',
    tags: ['Film', 'Awards', 'Popular'],
    icon: '🎬',
  },
  {
    id: 'story-5',
    title: 'Tech That Matters for Kids',
    excerpt: 'Reviews of educational apps and tech tools that actually engage children in meaningful learning.',
    tags: ['Apps', 'Tech', 'Education'],
    icon: '📱',
  },
  {
    id: 'story-6',
    title: 'A Decade of Creating',
    excerpt: 'Looking back at 10 years of content creation, growth, and the evolution of a young creator\'s voice.',
    tags: ['Blog', 'Milestone', 'Popular'],
    icon: '🎉',
  },
];

export default function Stories() {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Toys':
        return { bg: 'rgba(239, 108, 139, 0.2)', text: 'var(--pink)' };
      case 'Blog':
        return { bg: 'rgba(64, 224, 208, 0.2)', text: 'var(--teal)' };
      case 'Popular':
        return { bg: 'rgba(255, 200, 124, 0.2)', text: 'var(--orange)' };
      case 'AR/VR':
        return { bg: 'rgba(132, 250, 176, 0.2)', text: 'var(--mint)' };
      case 'Innovation':
        return { bg: 'rgba(240, 230, 246, 0.2)', text: 'var(--lav)' };
      case 'Vlogging':
        return { bg: 'rgba(255, 193, 7, 0.2)', text: 'var(--sun)' };
      case 'VR':
        return { bg: 'rgba(64, 224, 208, 0.2)', text: 'var(--teal)' };
      case 'Sustainability':
        return { bg: 'rgba(76, 175, 80, 0.2)', text: 'var(--green)' };
      case 'Film':
        return { bg: 'rgba(239, 108, 139, 0.2)', text: 'var(--pink)' };
      case 'Awards':
        return { bg: 'rgba(255, 200, 124, 0.2)', text: 'var(--orange)' };
      case 'Apps':
        return { bg: 'rgba(132, 250, 176, 0.2)', text: 'var(--mint)' };
      case 'Tech':
        return { bg: 'rgba(240, 230, 246, 0.2)', text: 'var(--lav)' };
      case 'Education':
        return { bg: 'rgba(69, 191, 181, 0.2)', text: '#45BFB5' };
      case 'Milestone':
        return { bg: 'rgba(255, 193, 7, 0.2)', text: 'var(--sun)' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', text: '#fff' };
    }
  };

  return (
    <section
      id="stories"
      style={{
        minHeight: '100vh',
        backgroundColor: '#2A9D8F',
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
        Stories Worth Sharing.
      </h2>

      {/* Stories grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '40px',
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '40px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              el.style.border = '2px solid rgba(255, 255, 255, 0.3)';
              el.style.transform = 'translateY(-8px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              el.style.border = '2px solid rgba(255, 255, 255, 0.15)';
              el.style.transform = 'translateY(0)';
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
              }}
            >
              {story.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                marginBottom: '16px',
                lineHeight: 1.2,
              }}
            >
              {story.title}
            </h3>

            {/* Excerpt */}
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                marginBottom: '24px',
                color: 'rgba(255, 255, 255, 0.85)',
                minHeight: '80px',
              }}
            >
              {story.excerpt}
            </p>

            {/* Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {story.tags.map((tag) => {
                const colors = getTagColor(tag);
                return (
                  <span
                    key={tag}
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      backgroundColor: colors.bg,
                      color: colors.text,
                      padding: '8px 14px',
                      borderRadius: '20px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
