import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

const HeroSection = ({ ready = false }: { ready?: boolean }) => {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.85]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Parallax */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: videoY }}
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </motion.video>
      {/* Overlay for readability */}
      <motion.div className="absolute inset-0 bg-background" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-5 sm:mb-6">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {t.hero.locationBadge}
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5 sm:mb-6 text-foreground break-words"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm sm:text-base md:text-2xl align-middle">✦</span> {t.hero.headline} <span className="text-sm sm:text-base md:text-2xl align-middle">✦</span>
        </motion.h1>

        <motion.p
          className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          {t.hero.subBefore}<em className="italic font-display text-foreground">terrace</em>{t.hero.subAfter}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
        >
          <a
            href="#reservar"
            className="gradient-red w-full sm:w-auto px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded hover:opacity-90 transition-opacity text-center"
          >
            {t.hero.cta}
          </a>
          <a
            href="#menu"
            className="border border-border w-full sm:w-auto px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-foreground rounded hover:border-gold hover:text-gold transition-colors text-center"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator - desktop (mouse) */}
      <motion.div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator - mobile (chevrons swipe up) */}
      <motion.div
        className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-mt-3 opacity-60">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
