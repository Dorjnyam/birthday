'use client';

import { motion } from 'framer-motion';
import Sparkles from './Sparkles';
import Bear from './Bear';

export default function HeroSection() {
  const scrollToContent = () => {
    document.getElementById('birthday-message')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8C8DC 0%, #FFD6C0 40%, #FFF0E8 70%, #FFF6E9 100%)',
      }}
    >
      <Sparkles />

      {/* Floating cute decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.span className="absolute top-[15%] left-[10%] text-2xl opacity-50" animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🌸</motion.span>
        <motion.span className="absolute top-[25%] right-[12%] text-xl opacity-40" animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>✨</motion.span>
        <motion.span className="absolute bottom-[35%] left-[8%] text-xl opacity-40" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>💕</motion.span>
        <motion.span className="absolute bottom-[30%] right-[15%] text-2xl opacity-45" animate={{ y: [0, 6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>🦋</motion.span>
        <motion.span className="absolute top-[40%] left-[5%] text-lg opacity-35" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>✦</motion.span>
        <motion.span className="absolute top-[35%] right-[6%] text-lg opacity-35" animate={{ y: [0, 4, 0] }} transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}>✦</motion.span>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Big 21 - solid color for reliable display across browsers */}
        <motion.div
          className="relative mb-2 select-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          {/* Soft glow behind */}
          <div
            className="absolute inset-0 -m-4 rounded-3xl blur-2xl opacity-60 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,182,193,0.6) 0%, rgba(248,200,220,0.3) 50%, transparent 70%)',
            }}
          />
          <motion.span
            className="relative font-display text-8xl md:text-[10rem] font-normal px-4 block"
            style={{
              color: '#C96A7A',
              textShadow: '2px 2px 0 rgba(255,255,255,0.9), -1px -1px 0 rgba(255,255,255,0.6), 3px 4px 0 rgba(150,80,90,0.2), 0 0 40px rgba(217,122,140,0.3)',
            }}
          >
            21
          </motion.span>
          {/* Tiny hearts around 21 */}
          <motion.span className="absolute -top-2 -left-2 text-xl opacity-70" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>💗</motion.span>
          <motion.span className="absolute -top-2 -right-2 text-xl opacity-70" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>💗</motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-headline text-lg md:text-xl mb-8 text-[#5C4033] font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          21 хоногийн дараа 21 нас
        </motion.p>

        {/* Cuter button */}
        <motion.button
          onClick={scrollToContent}
          className="relative px-10 py-4 rounded-full font-semibold text-lg min-h-[44px] flex items-center gap-2 overflow-visible"
          style={{
            background: 'linear-gradient(135deg, #FFB6C1 0%, #FF9EAB 50%, #F08080 100%)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(255, 105, 135, 0.4), 0 2px 0 rgba(255,255,255,0.4) inset',
            border: '2px solid rgba(255,255,255,0.6)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          🎁 Нээх
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>🎁</motion.span>
        </motion.button>
      </motion.div>

      {/* Bear in corner */}
      <motion.div
        className="absolute bottom-8 right-4 md:right-12 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Bear variant="hero" />
      </motion.div>
    </section>
  );
}
