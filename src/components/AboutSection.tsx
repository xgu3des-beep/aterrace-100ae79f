import { useRef, useState, useEffect } from 'react';
import { useLang } from '@/contexts/LangContext';
import about1 from '@/assets/about-1.webp';
import about2 from '@/assets/about-2.webp';
import about3 from '@/assets/about-3.webp';
import about4 from '@/assets/about-4.jpg';

const images = [about1, about2, about3, about4];

const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const baseStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
  });

  return (
    <section id="conceito" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg aspect-[4/3]"
                style={baseStyle(i * 80)}
              >
                <img
                  src={src}
                  alt={`Avioso Terrace ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Text block */}
          <div className="text-center lg:text-left" style={baseStyle(0)}>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              {t.about.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              {t.about.title}
            </h2>
            <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p className="text-gold italic font-display text-xl">{t.about.p3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
