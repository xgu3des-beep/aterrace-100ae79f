import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';
import { Star } from 'lucide-react';
import testimonialsBg from '@/assets/testimonials-bg.webp';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
      />
    ))}
  </div>
);

interface TestimonialItem {
  text: string;
  author: string;
  location: string;
  rating: number;
  photo: string;
}

const TestimonialsColumn = ({
  testimonials,
  className = '',
  duration = 15,
}: {
  testimonials: TestimonialItem[];
  className?: string;
  duration?: number;
}) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map((item, i) => (
              <div
                key={`${index}-${i}`}
                className="bg-card border border-border rounded-lg p-6 break-inside-avoid"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.photo}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">{item.author}</p>
                  </div>
                </div>
                <StarRating rating={item.rating} />
                <p className="font-body text-sm text-foreground/90 mt-3 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const items = t.testimonials.items;
  const firstColumn = items.slice(0, 3);
  const secondColumn = items.slice(3, 6);
  const thirdColumn = items.slice(6, 9);

  return (
    <section id="testemunhos" className="py-16 md:py-32 bg-warm relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${testimonialsBg})` }}
        />
        <div className="absolute inset-0 bg-background/35" />
      <div className="container mx-auto px-5 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block">
            {t.testimonials.label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-sm sm:text-base md:text-2xl align-middle">✦</span> {t.testimonials.title} <span className="text-sm sm:text-base md:text-2xl align-middle">✦</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 mb-8 md:mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 48 48" className="w-5 h-5" aria-label="Google">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <div className="flex items-center gap-1.5">
            <span className="font-body text-sm font-semibold text-foreground">4,3</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
              <div className="relative w-3.5 h-3.5">
                <Star className="w-3.5 h-3.5 text-muted-foreground/30 absolute inset-0" />
                <div className="overflow-hidden" style={{ width: '30%' }}>
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
          <span className="font-body text-xs sm:text-sm text-muted-foreground">{t.testimonials.googleLabel}</span>
        </motion.div>

        <div className="flex justify-center gap-4 sm:gap-6 max-w-6xl mx-auto h-[460px] sm:h-[500px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={18} className="hidden md:block w-1/3" />
          <TestimonialsColumn testimonials={secondColumn} duration={22} className="w-full max-w-sm md:max-w-none md:w-1/3" />
          <TestimonialsColumn testimonials={thirdColumn} duration={16} className="hidden lg:block w-1/3" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
