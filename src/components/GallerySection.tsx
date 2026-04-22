import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

const GallerySection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const placeholders = t.gallery.placeholders;

  return (
    <section id="galeria" className="py-16 md:py-32">
      <div className="container mx-auto px-5 sm:px-6" ref={ref}>
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block">
            {t.gallery.label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            {t.gallery.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
          {placeholders.map((label, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded group cursor-pointer ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className={`${i === 0 ? 'aspect-square' : 'aspect-square'} bg-secondary flex items-center justify-center`}
              >
                <span className="font-body text-[10px] sm:text-xs text-muted-foreground tracking-wide text-center px-2 sm:px-4">
                  {label}
                </span>
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
