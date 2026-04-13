import { useLang } from '@/contexts/LangContext';
import { Instagram } from 'lucide-react';

const FooterSection = () => {
  const { t } = useLang();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="font-display text-xl font-bold tracking-wider text-foreground">AVIOSO</span>
              <span className="font-display text-sm italic text-gold">terrace</span>
            </div>
            <p className="font-body text-sm text-muted-foreground italic max-w-xs">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div className="text-center">
            <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-foreground mb-4">Menu</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: t.nav.espaco, href: '#espaco' },
                { label: t.nav.galeria, href: '#galeria' },
                { label: t.nav.testemunhos, href: '#testemunhos' },
                { label: t.nav.contacto, href: '#contacto' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="md:text-right">
            <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-foreground mb-4">Social</h4>
            <div className="flex md:justify-end gap-4">
              {['Instagram', 'Facebook', 'TikTok'].map((s) => (
                <a key={s} href="#" className="font-body text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-5">
          <p className="font-body text-xs text-muted-foreground text-center">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
