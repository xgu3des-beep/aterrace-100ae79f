import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import espacoImg from '@/assets/espaco.webp';
import cocktailsImg from '@/assets/cocktails.webp';
import experienciasImg from '@/assets/experiencias.webp';
import naturezaImg from '@/assets/natureza.webp';

const items = [
  {
    title: 'Lounge Exterior',
    emoji: '🌿',
    description:
      'Envolvida pela natureza do parque, a nossa ampla esplanada convida a momentos de pura descontração, com uma vista privilegiada sobre mais de 30 hectares de paisagem verde.',
    img: espacoImg,
    alt: 'O Espaço — Terraço Avioso',
  },
  {
    title: 'Bar',
    emoji: '🍸',
    description:
      'É aqui que a magia acontece. Dispomos de uma vasta seleção de produtos, desde cocktails de autor refrescantes a snacks como cachorrinhos à moda do Porto, tapas variadas e uma das nossas especialidades: o clássico pastel de nata — o complemento perfeito para o seu café, a qualquer hora do dia.',
    img: cocktailsImg,
    alt: 'Bar de Cocktails',
  },
  {
    title: 'Convívio Social',
    emoji: '👥',
    description:
      'Nos dias mais frescos, a nossa espaçosa sala interior oferece conforto e um ambiente acolhedor. Todo o espaço foi pensado para momentos de lazer, seja em encontros casuais ou em eventos privados, como festas de aniversário e celebrações especiais.',
    img: experienciasImg,
    alt: 'Sala de jogos e eventos',
  },
  {
    title: 'Entretenimento',
    emoji: '🎱',
    description:
      'Para uma experiência completa, oferecemos noites de música ao vivo e DJ sets, bem como uma zona de snooker premium — garantindo que cada visita se transforma numa memória única.',
    img: naturezaImg,
    alt: 'Entretenimento — Snooker e DJ',
  },
];

const AboutSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth parallax offset for the image
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * items.length), items.length - 1);
    setActive(idx);
  });

  return (
    <section
      id="conceito"
      ref={sectionRef}
      className="relative"
      style={{ height: `${items.length * 100}vh` }}
    >
      {/* Ambient background that shifts per card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            background: [
              'radial-gradient(ellipse at 30% 50%, hsl(25 30% 14%) 0%, hsl(20 10% 6%) 70%)',
              'radial-gradient(ellipse at 70% 40%, hsl(20 15% 12%) 0%, hsl(20 8% 5%) 70%)',
              'radial-gradient(ellipse at 40% 60%, hsl(15 20% 13%) 0%, hsl(18 10% 6%) 70%)',
              'radial-gradient(ellipse at 60% 50%, hsl(22 18% 11%) 0%, hsl(20 12% 5%) 70%)',
            ][active],
          }}
        />
      </AnimatePresence>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[90rem] mx-auto px-8 md:px-16 lg:px-20 flex items-center gap-12 lg:gap-20">

          {/* Left: Text column */}
          <div className="flex-1 min-w-0 max-w-lg">

            {/* Header — fixo dentro do sticky, sempre visível */}
            <div className="mb-8">
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2 block">
                O Nosso Espaço
              </span>
              <p className="font-body text-sm text-muted-foreground max-w-sm">
                Fundado em 2023 no coração do Parque de Avioso, o <em>Avioso Terrace</em> está aberto todos os dias das 13h00 à 01h00 e dispõem de 500 lugares de estacionamento gratuito.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Emoji icon */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                  className="block text-5xl md:text-6xl mb-5"
                >
                  {items[active].emoji}
                </motion.span>

                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] tracking-tight">
                  {items[active].title}
                </h2>

                <p className="font-body text-lg md:text-xl mt-6 text-muted-foreground leading-relaxed max-w-md">
                  {items[active].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step counter */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`step-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.4, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mt-12 block"
              >
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </motion.span>
            </AnimatePresence>
          </div>

          {/* Right: Image column */}
          <div className="hidden lg:block flex-1 min-w-0 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: imageY }}
                className="relative"
              >
                {/* Subtle glow behind image */}
                <div className="absolute -inset-8 bg-primary/5 rounded-3xl blur-3xl" />

                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                  <img
                    src={items[active].img}
                    alt={items[active].alt}
                    className="w-full h-auto block"
                  />
                  {/* Top gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: stacked image below text */}
          <div className="lg:hidden absolute bottom-8 left-8 right-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.3, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src={items[active].img}
                  alt={items[active].alt}
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
