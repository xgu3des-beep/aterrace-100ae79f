"use client";
import React, { useEffect, useRef, useState } from "react";
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
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
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
      className="relative flex h-[36rem] justify-center gap-16 overflow-y-auto px-6 py-12 md:px-12 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
      ref={ref}
    >
      {/* Text column */}
      <div className="relative flex items-start">
        <div className="max-w-md">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-24 first:mt-8">
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
                className="font-display text-2xl md:text-3xl font-bold text-foreground"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.15,
                  x: activeCard === index ? 0 : -8,
                }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                className="font-body text-base md:text-lg mt-6 max-w-sm text-muted-foreground leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-48" />
        </div>
      </div>

      {/* Image column — larger with crossfade */}
      <div
        className={cn(
          "sticky top-8 hidden h-80 w-[26rem] overflow-hidden rounded-lg lg:block shadow-2xl",
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
            className="absolute inset-0"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
