import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';
import { Clock, Phone, Mail, MapPin } from 'lucide-react';

const LocationSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contacto" className="border-t border-border">
      <div className="py-24 md:py-32 bg-warm">
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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Hours */}
            <motion.div
              className="bg-card border border-border rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t.location.hours}</h3>
              <ul className="space-y-2">
                {t.location.hoursList.map((h, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground">{h}</li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="bg-card border border-border rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t.location.contact}</h3>
              <div className="space-y-3">
                <a href={`tel:${t.location.phone.replace(/\s/g, '')}`} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  {t.location.phone}
                </a>
                <a href={`mailto:${t.location.email}`} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  {t.location.email}
                </a>
              </div>
            </motion.div>

            {/* Address + CTA */}
            <motion.div
              className="bg-card border border-border rounded-lg p-8 text-center flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Morada</h3>
              <p className="font-body text-sm text-muted-foreground mb-6 flex-1">{t.location.address}</p>
              <a
                href="#reservar"
                className="inline-block gradient-red px-8 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded hover:opacity-90 transition-opacity"
              >
                {t.nav.reservar}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-width Google Map */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.8505805827026!2d-8.614128587980682!3d41.29035630188806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd245d6cbadb2cdb%3A0x218d4931ba2d2bf9!2sAvioso%20Terrace!5e0!3m2!1spt-PT!2spt!4v1775481659310!5m2!1spt-PT!2spt"
          width="100%"
          height="450"
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
