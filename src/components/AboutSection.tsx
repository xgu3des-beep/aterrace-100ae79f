import { useRef, useState, useEffect } from 'react';
import { useLang } from '@/contexts/LangContext';
import about1 from '@/assets/about-1.webp';
import about2 from '@/assets/about-2.webp';

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

  const leftStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-40px)',
    transition: 'opacity 800ms ease-out, transform 800ms ease-out',
  };

  const rightStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(40px)',
    transition: 'opacity 800ms ease-out 150ms, transform 800ms ease-out 150ms',
  };

  return (
    <section id="conceito" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — asymmetric image collage */}
          <div className="relative flex gap-4 h-[500px] md:h-[600px]" style={leftStyle}>
            {/* Tall image — left */}
            <div className="relative w-[55%] h-full rounded-lg overflow-hidden shadow-2xl">
              <img
                src={about1}
                alt="Avioso Terrace ambiente"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Gold corner accent — top-left */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gold" />
              </div>
            </div>

            {/* Shorter image — right, offset down */}
            <div className="relative w-[50%] h-[65%] self-end -ml-6 mb-4 rounded-lg overflow-hidden shadow-xl z-10">
              <img
                src={about2}
                alt="Avioso Terrace cocktails"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — text content */}
          <div className="lg:pl-8 text-center lg:text-left" style={rightStyle}>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              {t.about.label}
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              {t.about.title}
            </h2>

            <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* Decorative line + italic quote */}
            <div className="mt-8">
              <div className="w-16 h-[2px] bg-gold mb-4 mx-auto lg:mx-0" />
              <p className="text-gold italic font-display text-xl md:text-2xl leading-relaxed">
                {t.about.p3}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
