import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

import img1 from '@/assets/AVIOSO_TERRACE_1.webp';
import img2 from '@/assets/AVIOSO_TERRACE_2.webp';
import img4 from '@/assets/AVIOSO_TERRACE_4.webp';
import img6 from '@/assets/AVIOSO_TERRACE_6.webp';
import img9 from '@/assets/AVIOSO_TERRACE_9.webp';
import imgPool from '@/assets/AVIOSO_TERRACE_POOL.jpg';

const images = [
  { src: img9, alt: 'Terraço exterior', span: 'md:col-span-2 md:row-span-2' },
  { src: img1, alt: 'Bar interior', span: '' },
  { src: img6, alt: 'Balcão e cocktails', span: '' },
  { src: img4, alt: 'Lounge sofás', span: 'md:col-span-2' },
  { src: img2, alt: 'Bar panorâmico', span: '' },
  { src: imgPool, alt: 'Sala de snooker', span: '' },
];

const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-50px' });

  return (
    <section id="conceito" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.about.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            {t.about.title}
          </h2>
          <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p className="text-gold italic font-display text-xl">{t.about.p3}</p>
          </div>
        </motion.div>

        {/* Image Grid */}
        <div
          ref={imgRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden rounded-lg ${img.span}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={imgInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
