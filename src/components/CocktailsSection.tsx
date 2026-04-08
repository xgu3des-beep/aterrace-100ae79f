import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

const cocktailImages = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541546006121-e8e0aafc1ece?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?w=400&h=500&fit=crop',
];

const CocktailsSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Duplicate images for seamless loop
  const allImages = [...cocktailImages, ...cocktailImages];

  return (
    <section id="galeria" className="pt-4 pb-16 md:pt-6 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.cocktails.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-base md:text-2xl align-middle">✦</span> {t.cocktails.title} <span className="text-base md:text-2xl align-middle">✦</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            {t.cocktails.sub}
          </p>
        </motion.div>
      </div>

      {/* Scrolling gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-full">
          <div
            className="flex gap-4 animate-[scroll-left_40s_linear_infinite]"
            style={{ width: 'max-content' }}
          >
            {allImages.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 h-[26rem] md:w-96 md:h-[30rem] rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Cocktail ${(i % cocktailImages.length) + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mt-8"
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
