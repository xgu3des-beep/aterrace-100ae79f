"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // FIX 1: usar a página como container de scroll, não a div interna
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // FIX 2: distribuir breakpoints de forma mais precisa
    // Cada card ocupa 1/cardLength do scroll total
    const index = Math.min(
      Math.floor(latest * cardLength),
      cardLength - 1
    );
    setActiveCard(index);
  });

  const backgroundColors = [
    "hsl(25 30% 20%)",
    "hsl(20 10% 8%)",
    "hsl(20 8% 15%)",
    "hsl(22 18% 12%)",
  ];

  return (
    // FIX 3: remover h-[42rem] e overflow-y-auto — o scroll agora é da página
    <motion.div
      ref={containerRef}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative flex justify-between gap-10 px-8 py-16 md:px-16 lg:px-24"
    >
      {/* Coluna de texto — scroll normal */}
      <div className="relative flex items-start">
        <div className="max-w-xl">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              // FIX 4: altura de cada bloco de texto igual à viewport para sincronizar com imagem
              className="flex flex-col justify-center min-h-screen py-24"
            >
              <motion.span
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  width: activeCard === index ? 40 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="block h-[2px] bg-primary mb-4"
              />
              <motion.h2
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                  x: activeCard === index ? 0 : -8,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display text-3xl md:text-4xl font-bold text-foreground"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.15,
                  x: activeCard === index ? 0 : -8,
                }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                className="font-body text-lg md:text-xl mt-6 max-w-md text-muted-foreground leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna de imagem — sticky na página */}
      <div
        className={cn(
          // FIX 5: sticky top com altura da viewport, sem overflow hidden para não cortar
          "sticky top-8 hidden self-start w-[36rem] lg:block",
          contentClassName
        )}
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            // FIX 6: imagem preenche o container sem espaço extra
            className="w-full h-full rounded-lg shadow-2xl overflow-hidden"
          >
            {/* FIX 7: forçar imagem a preencher sem espaço branco */}
            <div className="w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
              {content[activeCard].content ?? null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
