import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

const TypewriterText = ({ text, trigger }: { text: string; trigger: boolean }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!trigger) return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <em className="text-primary font-display italic">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[0.8em] bg-primary ml-[2px] align-baseline"
        style={{ display: displayed.length >= text.length ? 'none' : 'inline-block' }}
      />
    </em>
  );
};

const LocationSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contacto" className="border-t border-border">
      <div className="py-16 md:py-32">
        <div className="container mx-auto px-5 sm:px-6" ref={ref}>
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-4 block">
              {t.location.label}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {t.location.titleBefore}<TypewriterText text="terrace" trigger={inView} />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto text-center">
            {/* Horário */}
            <motion.div
              className="space-y-3 md:space-y-4 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Clock className="w-6 h-6 text-gold mb-1" />
              <h3 className="font-display text-xl font-semibold text-foreground">{t.location.hours}</h3>
              <p className="font-body text-sm text-muted-foreground">{t.location.hoursText}</p>
            </motion.div>

            {/* Contacto */}
            <motion.div
              className="space-y-3 md:space-y-4 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Phone className="w-6 h-6 text-gold mb-1" />
              <h3 className="font-display text-xl font-semibold text-foreground">{t.location.contact}</h3>
              <p className="font-body text-sm text-muted-foreground">{t.location.phone}</p>
              <p className="font-body text-sm text-muted-foreground break-all">{t.location.email}</p>
              <div className="flex justify-center items-center gap-4 mt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-80 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-80 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-80 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
              </div>
              <a
                href={`mailto:${t.location.email}`}
                className="inline-block gradient-red px-8 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded hover:opacity-90 transition-opacity mt-2"
              >
                {t.location.contactBtn}
              </a>
            </motion.div>

            {/* Morada */}
            <motion.div
              className="space-y-3 md:space-y-4 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <MapPin className="w-6 h-6 text-gold mb-1" />
              <h3 className="font-display text-xl font-semibold text-foreground">{t.location.addressLabel}</h3>
              <p className="font-body text-sm text-muted-foreground">{t.location.address}</p>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Full-width Google Map */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.8505805827026!2d-8.614128587980682!3d41.29035630188806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd245d6cbadb2cdb%3A0x218d4931ba2d2bf9!2sAvioso%20Terrace!5e0!3m2!1spt-PT!2spt!4v1775481659310!5m2!1spt-PT!2spt"
          width="100%"
          height="320"
          className="md:h-[450px] block"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Avioso Terrace Location"
        />
      </div>
    </section>
  );
};

export default LocationSection;
