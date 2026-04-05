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
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * cardLength + 0.15),
      cardLength - 1
    );
    setActiveCard(index);
  });

  // Imagem muda a cada 2 cards (aos pares)
  const activeImage = Math.floor(activeCard / 2);

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
      className="relative h-screen overflow-y-auto scrollbar-none"
      style={{ scrollbarWidth: "none" }}
      ref={ref}
    >
      <div className="flex px-8 py-8 md:px-16 lg:px-24 gap-10 lg:gap-16">

        {/* Coluna de texto */}
        <div className="flex-1 flex items-start">
          <div className="max-w-md w-full">
            {content.map((item, index) => (
              <div
                key={item.title + index}
                className="flex flex-col justify-center"
                // Cada card ocupa metade do ecrã — 2 cards = 1 ecrã completo
                style={{ minHeight: "42vh", paddingTop: "4vh", paddingBottom: "4vh" }}
              >
                <motion.span
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    width: activeCard === index ? 40 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="block h-[2px] bg-primary mb-3"
                />
                <motion.h2
                  animate={{
                    opacity: activeCard === index ? 1 : 0.2,
                    x: activeCard === index ? 0 : -8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-display text-2xl md:text-3xl font-bold text-foreground"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  animate={{
                    opacity: activeCard === index ? 1 : 0.15,
                    x: activeCard === index ? 0 : -8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                  className="font-body text-base md:text-lg mt-3 text-muted-foreground leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div style={{ height: "8vh" }} />
          </div>
        </div>

        {/* Coluna de imagem — muda a cada 2 cards */}
        <div
          className={cn(
            "hidden lg:flex items-center sticky top-0 self-start h-screen w-[36rem] shrink-0",
            contentClassName
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full rounded-lg shadow-2xl overflow-hidden"
            >
              <div className="[&>img]:w-full [&>img]:h-auto [&>img]:block">
                {/* Mostra a imagem do primeiro card de cada par */}
                {content[activeImage * 2]?.content ?? null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};
