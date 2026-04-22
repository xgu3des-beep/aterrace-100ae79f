import { useLang } from '@/contexts/LangContext';

const FooterSection = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-5 sm:px-6 flex flex-col items-center gap-6">
        
        <p className="font-body text-xs text-muted-foreground">{t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default FooterSection;
