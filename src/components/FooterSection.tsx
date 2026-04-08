import { useLang } from '@/contexts/LangContext';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/aviosoterrace' },
  { name: 'Facebook', icon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ), href: 'https://facebook.com/aviosoterrace' },
  { name: 'TikTok', icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z"/>
    </svg>
  ), href: 'https://tiktok.com/@aviosoterrace' },
];

const FooterSection = () => {
  const { t, lang } = useLang();

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-bold tracking-wider text-foreground">AVIOSO</span>
              <span className="font-display text-sm italic text-gold">terrace</span>
            </div>
            <p className="font-body text-sm text-muted-foreground italic leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-foreground">
              {lang === 'pt' ? 'Links Rápidos' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: t.nav.espaco, href: '#espaco' },
                { label: t.nav.cocktails, href: '#cocktails' },
                { label: t.nav.experiencia, href: '#experiencia' },
                { label: t.nav.contacto, href: '#contacto' },
                { label: t.nav.reservar, href: '#reservar' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300 w-fit"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-foreground">
              {t.location.contact}
            </h4>
            <div className="space-y-3">
              <a href={`tel:${t.location.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300">
                <Phone className="w-4 h-4 text-gold/60" />
                {t.location.phone}
              </a>
              <a href={`mailto:${t.location.email}`} className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300">
                <Mail className="w-4 h-4 text-gold/60" />
                {t.location.email}
              </a>
              <div className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                {t.location.address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">{t.footer.rights}</p>
          <a
            href="#reservar"
            className="gradient-red px-5 py-2 font-body text-xs font-semibold tracking-wide text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.nav.reservar}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
