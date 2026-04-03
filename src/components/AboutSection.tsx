import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

import aboutBar from '@/assets/about-bar.webp';
import aboutLounge from '@/assets/about-lounge.webp';
import aboutDrinks from '@/assets/about-drinks.webp';
import aboutTerrace from '@/assets/about-terrace.webp';
import aboutPool from '@/assets/about-pool.jpg';

const images = [
  { src: aboutBar, alt: 'Bar counter' },
  { src: aboutLounge, alt: 'Lounge area' },
  { src: aboutDrinks, alt: 'Drinks at the bar' },
  { src: aboutTerrace, alt: 'Outdoor terrace' },
  { src: aboutPool, alt: 'Pool table room' },
];

const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="conceito" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-14">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              {t.about.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {t.about.title}
            </h2>
          </div>

          {/* Unified grid: text card + images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {/* Text card — spans 2 cols on all sizes */}
            <div className="col-span-2 row-span-2 rounded-sm bg-background/60 backdrop-blur-sm border border-border/40 p-6 md:p-8 flex flex-col justify-center">
              <div className="space-y-4 font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p className="text-primary italic font-display text-lg md:text-xl">{t.about.p3}</p>
              </div>
            </div>

            {/* Images with vintage frame */}
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-sm ${
                  i === 0 ? 'col-span-1 row-span-2' : 'col-span-1'
                }`}
              >
                {/* Vintage border overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none rounded-sm border-[3px] border-foreground/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
                {/* Corner accents */}
                <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-gold/40 z-10 pointer-events-none" />
                <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-gold/40 z-10 pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-gold/40 z-10 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-gold/40 z-10 pointer-events-none" />
                {/* Sepia/warm overlay */}
                <div className="absolute inset-0 z-[5] bg-gradient-to-br from-amber-900/15 to-transparent pointer-events-none mix-blend-multiply" />
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square contrast-[1.05] saturate-[0.85]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
