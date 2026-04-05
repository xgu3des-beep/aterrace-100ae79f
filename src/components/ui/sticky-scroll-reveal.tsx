"use client";
import React, { useRef } from "react";
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
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / (cardLength - 1 || 1));
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "hsl(25 30% 20%)",
    "hsl(20 10% 8%)",
    "hsl(20 8% 15%)",
    "hsl(22 18% 12%)",
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      // FIX: altura maior (80vh) para a secção respirar + overflow-y-auto para scroll interno
      className="relative flex h-[80vh] justify-between gap-10 overflow-y-auto px-8 py-10 md:px-16 lg:px-24 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
      ref={ref}
    >
      {/* Coluna de texto */}
      <div className="relative flex items-start">
        <div className="max-w-xl">
          {content.map((item, index) => (
            // FIX: espaçamento reduzido de my-24 para my-14
            <div key={item.title + index} className="my-14 first:mt-4">
              <motion.span
                animate={{ opacity: activeCard === index ? 1 : 0, width: activeCard === index ? 40 : 0 }}
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
          {/* FIX: padding final reduzido de h-[30rem] para h-[12rem] — último card sincronizado */}
          <div className="h-[12rem]" />
        </div>
      </div>

      {/* Coluna de imagem — sticky, imagem com dimensões naturais */}
      <div
        className={cn(
          "sticky top-8 hidden w-[36rem] lg:block shadow-2xl rounded-lg overflow-hidden self-start",
          contentClassName,
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            // FIX: imagem com largura total e altura automática — sem cortes, sem espaço branco
            className="[&>img]:w-full [&>img]:h-auto [&>img]:block"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
