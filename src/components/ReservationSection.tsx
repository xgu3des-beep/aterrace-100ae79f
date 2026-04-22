import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLang } from '@/contexts/LangContext';

const ReservationSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="reservar" className="py-16 md:py-32 relative">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(0 70% 35% / 0.3) 0%, transparent 70%)'
      }} />
      <div className="container mx-auto px-5 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block">
            {t.reservation.label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t.reservation.title}
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            {t.reservation.sub}
          </p>
        </motion.div>

        <motion.form
          className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        >
          {!submitted ? (
            <>
              <input type="text" placeholder={t.reservation.name} className="bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
              <input type="email" placeholder={t.reservation.email} className="bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
              <input type="tel" placeholder={t.reservation.phone} className="bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
              <input type="number" placeholder={t.reservation.guests} min="1" max="20" className="bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" />
              <input type="date" className="col-span-1 bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
              <input type="time" className="col-span-1 bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
              <textarea placeholder={t.reservation.message} rows={3} className="col-span-full bg-card border border-border rounded px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none" />
              <button type="submit" className="col-span-full gradient-red px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded hover:opacity-90 transition-opacity">
                {t.reservation.submit}
              </button>
            </>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="font-display text-2xl text-gold mb-2">✓</p>
              <p className="font-body text-foreground">{t.reservation.success}</p>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default ReservationSection;
