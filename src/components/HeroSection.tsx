import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <span className="inline-block font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">
            Avioso Terrace — Porto, Portugal
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          {t.hero.headline}
        </motion.h1>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6 }}
        >
          <a
            href="#reservar"
            className="gradient-red px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded hover:opacity-90 transition-opacity"
          >
            {t.hero.cta}
          </a>
          <a
            href="#menu"
            className="border border-border px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-foreground rounded hover:border-gold hover:text-gold transition-colors"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
