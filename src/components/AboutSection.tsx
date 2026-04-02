import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';
import towerBg from '@/assets/tower-abstract.png';

const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="conceito" className="relative py-24 md:py-32 overflow-hidden">
      {/* Abstract tower background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${towerBg})` }}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-2xl mx-auto md:mx-0 md:ml-8 lg:ml-16 text-center md:text-left backdrop-blur-sm bg-black/30 rounded-2xl p-8 md:p-12 border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.about.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {t.about.title}
          </h2>
          <div className="space-y-5 font-body text-base md:text-lg text-white/80 leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p className="text-gold italic font-display text-xl">{t.about.p3}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
