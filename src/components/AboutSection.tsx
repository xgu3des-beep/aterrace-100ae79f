import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import espacoImg from '@/assets/espaco.webp';
import cocktailsImg from '@/assets/cocktails.webp';
import experienciasImg from '@/assets/experiencias.webp';
import naturezaImg from '@/assets/natureza.webp';
import { useLang } from '@/contexts/LangContext';

const images = [espacoImg, cocktailsImg, experienciasImg, naturezaImg];
const alts = ['O Espaço — Terraço Avioso', 'Bar de Cocktails', 'Sala de jogos e eventos', 'Entretenimento — Snooker e DJ'];

const AboutSection = () => {
  const { t } = useLang();
  const items = t.space.items;
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth parallax offset for the image
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * items.length), items.length - 1);
    setActive(idx);
  });

  return (
    <section
      id="conceito"
      ref={sectionRef}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      {/* Ambient background that shifts per card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            background: [
              'radial-gradient(ellipse at 30% 50%, hsl(25 12% 10%) 0%, hsl(20 8% 5%) 70%)',
              'radial-gradient(ellipse at 70% 40%, hsl(20 15% 12%) 0%, hsl(20 8% 5%) 70%)',
              'radial-gradient(ellipse at 40% 60%, hsl(15 20% 13%) 0%, hsl(18 10% 6%) 70%)',
              'radial-gradient(ellipse at 60% 50%, hsl(22 18% 11%) 0%, hsl(20 12% 5%) 70%)',
            ][active],
          }}
        />
      </AnimatePresence>

      {/* Sticky viewport — pt-20 para compensar a navbar */}
      <div className="sticky top-0 h-screen flex flex-col justify-start overflow-hidden pt-20">

        {/* Header — topo da secção sticky, centrado */}
        <div className="w-full max-w-[90rem] mx-auto px-5 sm:px-8 md:px-16 lg:px-20 pb-5 md:pb-6 border-b border-border/30 mb-5 md:mb-8 text-center">
          <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-2 block">
            {t.space.label}
          </span>
          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.space.intro} <em className="italic font-display text-foreground">terrace</em> {t.space.introAfter}
          </p>
        </div>

        <div className="w-full max-w-[90rem] mx-auto px-5 sm:px-8 md:px-16 lg:px-20 flex items-center gap-12 lg:gap-20 flex-1 min-h-0">

          {/* Left: Text column */}
          <div className="flex-1 min-w-0 max-w-lg">

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Emoji icon */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                  className="block text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-5"
                >
                  {items[active].emoji}
                </motion.span>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] tracking-tight">
                  {items[active].title}
                </h2>

                <p className="font-body text-base sm:text-lg md:text-xl mt-4 md:mt-6 text-muted-foreground leading-relaxed max-w-md">
                  {items[active].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step counter */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`step-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.4, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="font-body text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground mt-8 md:mt-12 block"
              >
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </motion.span>
            </AnimatePresence>
          </div>

          {/* Right: Image column */}
          <div className="hidden lg:block flex-1 min-w-0 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: imageY }}
                className="relative"
              >
                {/* Subtle glow behind image */}
                <div className="absolute -inset-8 bg-primary/5 rounded-3xl blur-3xl" />

                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                  <img
                    src={images[active]}
                    alt={alts[active]}
                    className="w-full h-auto block"
                  />
                  {/* Top gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: stacked image below text */}
          <div className="lg:hidden absolute bottom-6 left-5 right-5 sm:left-8 sm:right-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.35, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src={images[active]}
                  alt={alts[active]}
                  className="w-full h-32 sm:h-40 object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Linha divisória no fundo da secção */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/40" />
    </section>
  );
};

export default AboutSection;
