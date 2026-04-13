import { useLang } from '@/contexts/LangContext';

const FooterSection = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold tracking-wider text-foreground">AVIOSO</span>
            <span className="font-display text-sm italic text-gold">terrace</span>
          </div>
          <p className="font-body text-sm text-muted-foreground italic">{t.footer.tagline}</p>
          <div className="flex gap-4">
            {['Instagram', 'Facebook', 'TikTok'].map((s) => (
              <a key={s} href="#" className="font-body text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide">
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="font-body text-xs text-muted-foreground">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
