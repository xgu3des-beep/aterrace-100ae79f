import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';

const LocationSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contacto" className="py-24 md:py-32 bg-warm">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.location.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            {t.location.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Map placeholder */}
          <motion.div
            className="bg-secondary rounded aspect-[4/3] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-body text-sm text-muted-foreground">{t.location.address}</p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">{t.location.hours}</h3>
              <ul className="space-y-2">
                {t.location.hoursList.map((h, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground">{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">{t.location.contact}</h3>
              <p className="font-body text-sm text-muted-foreground mb-1">{t.location.phone}</p>
              <p className="font-body text-sm text-muted-foreground">{t.location.email}</p>
            </div>
            <a
              href="#reservar"
              className="inline-block gradient-red px-8 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded hover:opacity-90 transition-opacity"
            >
              {t.nav.reservar}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
