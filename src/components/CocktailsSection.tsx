import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

const CocktailsSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="menu" className="py-24 md:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.cocktails.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            ✦ {t.cocktails.title} ✦
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            {t.cocktails.sub}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.cocktails.items.map((item, i) => (
            <motion.div
              key={item.name}
              className="group bg-card border border-border rounded p-6 hover:border-primary/40 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs font-body tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {item.tag}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a href="#" className="font-body text-sm text-gold border-b border-gold/30 hover:border-gold pb-1 transition-colors">
            {t.cocktails.viewFull} →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CocktailsSection;
