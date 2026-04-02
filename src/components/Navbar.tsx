import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#conceito', label: t.nav.conceito },
    { href: '#menu', label: t.nav.menu },
    { href: '#experiencia', label: t.nav.experiencia },
    { href: '#galeria', label: t.nav.galeria },
    { href: '#contacto', label: t.nav.contacto },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.8 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-baseline gap-1.5">
          <span className="font-display text-xl font-bold tracking-wider text-foreground">AVIOSO</span>
          <span className="font-display text-sm italic text-primary">terrace</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservar"
            className="gradient-red px-5 py-2 text-sm font-semibold tracking-wide text-primary-foreground rounded transition-all duration-300 hover:opacity-90"
          >
            {t.nav.reservar}
          </a>
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="text-xs font-body tracking-widest text-muted-foreground hover:text-gold border border-border px-3 py-1.5 rounded transition-colors"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="text-xs font-body tracking-widest text-muted-foreground border border-border px-2 py-1 rounded"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          className="md:hidden bg-background/98 backdrop-blur-md border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reservar"
              onClick={() => setMobileOpen(false)}
              className="gradient-red text-center px-5 py-2.5 text-sm font-semibold text-primary-foreground rounded"
            >
              {t.nav.reservar}
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
