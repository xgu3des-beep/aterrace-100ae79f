import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import espacoImg from '@/assets/espaco.webp';
import cocktailsImg from '@/assets/cocktails.webp';
import experienciasImg from '@/assets/experiencias.webp';
import naturezaImg from '@/assets/natureza.webp';

const items = [
  {
    title: 'O Espaço',
    description:
      'Rodeado pela natureza do Parque de Avioso, o nosso terraço convida a momentos de descontração com uma vista privilegiada sobre a paisagem verde.',
    img: espacoImg,
    alt: 'O Espaço — Terraço Avioso',
  },
  {
    title: 'Cocktails de Autor',
    description:
      'Cada cocktail é uma experiência sensorial, preparado com ingredientes frescos e técnicas inovadoras que celebram os sabores locais.',
    img: cocktailsImg,
    alt: 'Bar de Cocktails',
  },
  {
    title: 'Eventos & Experiências',
    description:
      'De noites de DJ a degustações privadas, o Avioso Terrace transforma cada visita numa memória única.',
    img: experienciasImg,
    alt: 'Sala de jogos e eventos',
  },
  {
    title: 'Natureza & Tranquilidade',
    description:
      'Afastado do ruído urbano, o terraço oferece um refúgio onde o tempo abranda e os sentidos despertam.',
    img: naturezaImg,
    alt: 'Lounge interior',
  },
];

const bgColors = [
  'hsl(25 30% 20%)',
  'hsl(20 10% 8%)',
  'hsl(20 8% 15%)',
  'hsl(22 18% 12%)',
];

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // useScroll da página inteira, target = a secção
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // começa quando o topo da secção toca o topo do viewport
    // acaba quando o fundo da secção toca o fundo do viewport
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // divide o progresso em 4 fatias iguais
    const idx = Math.min(Math.floor(v * items.length), items.length - 1);
    setActiveIndex(idx);
  });

  return (
    <motion.section
      id="conceito"
      ref={sectionRef}
      animate={{ backgroundColor: bgColors[activeIndex] }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      // altura total = 4 × 100vh para cada card ter o seu próprio ecrã de scroll
      style={{ minHeight: `${items.length * 100}vh` }}
      className="relative"
    >
      {/* Container sticky que ocupa sempre 100vh */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden px-8 md:px-16 lg:px-24 gap-10 lg:gap-16">

        {/* Coluna esquerda — texto */}
        <div className="flex-1 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* linha vermelha */}
              <span className="block h-[2px] w-10 bg-primary mb-4" />

              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {items[activeIndex].title}
              </h2>

              <p className="font-body text-lg md:text-xl mt-5 text-muted-foreground leading-relaxed">
                {items[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores de progresso */}
          <div className="flex gap-2 mt-10">
            {items.map((_, i) => (
              <span
                key={i}
                className="block h-[2px] flex-1 rounded-full transition-all duration-500"
                style={{
                  backgroundColor:
                    i === activeIndex
                      ? 'hsl(0 70% 35%)'
                      : 'hsl(30 20% 90% / 0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Coluna direita — imagem */}
        <div className="hidden lg:block w-[36rem] shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="rounded-lg shadow-2xl overflow-hidden"
            >
              <img
                src={items[activeIndex].img}
                alt={items[activeIndex].alt}
                className="w-full h-auto block"
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
};

export default AboutSection;
