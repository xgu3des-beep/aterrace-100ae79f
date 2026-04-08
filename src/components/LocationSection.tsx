import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';
import avisoTower from '@/assets/avioso-tower.png';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/aviosoterrace' },
  { name: 'Facebook', icon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ), href: 'https://facebook.com/aviosoterrace' },
  { name: 'TikTok', icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z"/>
    </svg>
  ), href: 'https://tiktok.com/@aviosoterrace' },
];

const LocationSection = () => {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contacto" className="border-t border-border relative overflow-hidden">
      <div className="py-24 md:py-32 relative">
        {/* Decorative tower watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] md:w-[500px] lg:w-[600px] h-full pointer-events-none select-none"
          style={{ mixBlendMode: 'soft-light', opacity: 0.15 }}
        >
          <img
            src={avisoTower}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain object-right"
          />
        </div>
        <motion.div
          className="container mx-auto px-6"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              {t.location.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              {t.location.title}
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Hours Card */}
            <motion.div
              className="group rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 hover:border-gold/30 transition-colors duration-500"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t.location.hours}</h3>
              </div>
              <ul className="space-y-3">
                {t.location.hoursList.map((h, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              className="group rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 hover:border-gold/30 transition-colors duration-500"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t.location.contact}</h3>
              </div>
              <div className="space-y-4">
                <a
                  href={`tel:${t.location.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors group/link"
                >
                  <Phone className="w-4 h-4 text-gold/60 group-hover/link:text-gold transition-colors" />
                  {t.location.phone}
                </a>
                <a
                  href={`mailto:${t.location.email}`}
                  className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors group/link"
                >
                  <Mail className="w-4 h-4 text-gold/60 group-hover/link:text-gold transition-colors" />
                  {t.location.email}
                </a>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="font-body text-xs tracking-wider uppercase text-muted-foreground/60 mb-4">
                  {lang === 'pt' ? 'Siga-nos' : 'Follow us'}
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ name, icon: Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Address & CTA Card */}
            <motion.div
              className="group rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 hover:border-gold/30 transition-colors duration-500 flex flex-col"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {lang === 'pt' ? 'Morada' : 'Address'}
                </h3>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                {t.location.address}
              </p>
              <div className="mt-auto space-y-3">
                <a
                  href="https://maps.google.com/?q=Avioso+Terrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center gradient-red px-6 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  {lang === 'pt' ? 'Abrir no Google Maps' : 'Open in Google Maps'}
                </a>
                <a
                  href="#reservar"
                  className="block w-full text-center border border-gold/40 px-6 py-3 font-body text-sm font-semibold tracking-wide text-gold rounded-lg hover:bg-gold/10 transition-colors"
                >
                  {t.nav.reservar}
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
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
