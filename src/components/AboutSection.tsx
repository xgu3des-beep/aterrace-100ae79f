import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LangContext';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import espacoImg from '@/assets/espaco.webp';
import cocktailsImg from '@/assets/cocktails.webp';
import experienciasImg from '@/assets/experiencias.webp';
import naturezaImg from '@/assets/natureza.webp';

const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const scrollContent = [
    {
      title: "O Espaço",
      description:
        "Rodeado pela natureza do Parque de Avioso, o nosso terraço convida a momentos de descontração com uma vista privilegiada sobre a paisagem verde.",
      content: (
        <img src={espacoImg} alt="O Espaço — Terraço Avioso" className="w-full h-auto object-contain" />
      ),
    },
    {
      title: "Cocktails de Autor",
      description:
        "Cada cocktail é uma experiência sensorial, preparado com ingredientes frescos e técnicas inovadoras que celebram os sabores locais.",
      content: (
        <img src={cocktailsImg} alt="Bar de Cocktails" className="w-full h-auto object-contain" />
      ),
    },
    {
      title: "Eventos & Experiências",
      description:
        "De noites de DJ a degustações privadas, o Avioso Terrace transforma cada visita numa memória única.",
      content: (
        <img src={experienciasImg} alt="Sala de jogos e eventos" className="h-full w-full object-cover" />
      ),
    },
    {
      title: "Natureza & Tranquilidade",
      description:
        "Afastado do ruído urbano, o terraço oferece um refúgio onde o tempo abranda e os sentidos despertam.",
      content: (
        <img src={naturezaImg} alt="Lounge interior" className="h-full w-full object-cover" />
      ),
    },
  ];

  return (
    <section id="conceito" className="bg-warm">
      <div className="container mx-auto px-6 py-24 md:py-32" ref={ref}>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            {t.about.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            {t.about.title}
          </h2>
          <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p className="text-gold italic font-display text-xl">{t.about.p3}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <StickyScroll content={scrollContent} />
      </motion.div>
    </section>
  );
};

export default AboutSection;
