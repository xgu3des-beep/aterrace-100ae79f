import { useLang } from '@/contexts/LangContext';
import logoPlaceholder from '@/assets/logoplaceholder.png';

const FooterSection = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        <img src={logoPlaceholder} alt="Avioso Terrace" className="h-16 w-auto" />
        <p className="font-body text-xs text-muted-foreground">{t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default FooterSection;
