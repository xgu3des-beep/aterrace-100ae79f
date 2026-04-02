import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="flex items-baseline gap-2">
            <motion.span
              className="font-display text-5xl md:text-7xl font-bold tracking-wider text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AVIOSO
            </motion.span>
            <motion.span
              className="font-display text-3xl md:text-5xl italic text-primary"
              initial={{ opacity: 0, width: 0 }}
              animate={phase >= 1 ? { opacity: 1, width: 'auto' } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              terrace
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
