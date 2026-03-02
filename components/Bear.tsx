'use client';

import { motion } from 'framer-motion';

interface BearProps {
  variant?: 'hero' | 'corner' | 'decorative';
  className?: string;
}

export default function Bear({ variant = 'hero', className = '' }: BearProps) {
  const size = variant === 'hero' ? 140 : variant === 'corner' ? 100 : 60;
  const height = variant === 'hero' ? 160 : variant === 'corner' ? 120 : 70;

  return (
    <motion.div
      className={className}
      animate={
        variant === 'hero'
          ? {
              y: [0, -8, 0],
              x: [0, 4, 0],
            }
          : undefined
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        width: size,
        height,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))',
      }}
    >
      <img
        src="/bear.png"
        alt="Зүрхэн дэлбээтэй хөхөгтэй баавгай"
        className="w-full h-full object-contain"
        width={size}
        height={height}
      />
    </motion.div>
  );
}
