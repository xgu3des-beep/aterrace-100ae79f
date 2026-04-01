import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

const ExperienceSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experiencia" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.experience.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {t.experience.items.map((item, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
