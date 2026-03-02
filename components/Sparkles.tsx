'use client';

import { motion } from 'framer-motion';

const SPARKLE_COUNT = 24;

export default function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/60"
          style={{
            left: `${(i * 7 + 3) % 100}%`,
            top: `${(i * 11 + 5) % 100}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
