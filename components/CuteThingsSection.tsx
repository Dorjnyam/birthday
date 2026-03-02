'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const CUTE_THINGS = [
  { mn: 'Инээмсэглэл', en: 'Smile', emoji: '😊' },
  { mn: 'Энерги', en: 'Energy', emoji: '⚡' },
  { mn: 'Сониуч зан', en: 'Curiosity', emoji: '🔍' },
  { mn: 'Зориг', en: 'Courage', emoji: '💪' },
  { mn: 'Урам зориг', en: 'Inspiration', emoji: '✨' },
  { mn: 'Хүсэл тэмүүлэл', en: 'Passion', emoji: '🔥' },
  { mn: 'Итгэл найдвар', en: 'Hope', emoji: '🌟' },
  { mn: 'Гэрэл гэгээ', en: 'Light', emoji: '💡' },
  { mn: 'Дулаан сэтгэл', en: 'Warmth', emoji: '🤗' },
  { mn: 'Өөдрөг хандлага', en: 'Optimism', emoji: '🌤️' },
  { mn: 'Энэрэл', en: 'Kindness', emoji: '💕' },
  { mn: 'Баяр баясгалан', en: 'Joy', emoji: '🎉' },
  { mn: 'Нөхөрлөл', en: 'Friendship', emoji: '🤝' },
  { mn: 'Хайр', en: 'Love', emoji: '💗' },
  { mn: 'Амжилт', en: 'Success', emoji: '🏆' },
  { mn: 'Эрүүл мэнд', en: 'Health', emoji: '🌿' },
  { mn: 'Амар амгалан', en: 'Peace', emoji: '🕊️' },
  { mn: 'Эрх чөлөө', en: 'Freedom', emoji: '🦋' },
  { mn: 'Мөрөөдөл', en: 'Dream', emoji: '🌙' },
  { mn: 'Хүч чадал', en: 'Strength', emoji: '🌸' },
  { mn: 'Шинэ эхлэл', en: 'New Beginning', emoji: '🦋' },
];

const CARD_COLORS = [
  'linear-gradient(135deg, #F8C8DC 0%, #FDE4EC 100%)',
  'linear-gradient(135deg, #FFD6C0 0%, #FFE8DE 100%)',
  'linear-gradient(135deg, #FFF6E9 0%, #FFFBF5 100%)',
  'linear-gradient(135deg, #E6E6FA 0%, #F0E6FF 100%)',
  'linear-gradient(135deg, #F5E6E8 0%, #FDF0F2 100%)',
  'linear-gradient(135deg, #FFE4EC 0%, #FFF0F5 100%)',
];

export default function CuteThingsSection() {
  const [clickedIds, setClickedIds] = useState<Set<number>>(new Set());
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartIdRef = useRef(0);

  const handleClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (clickedIds.has(index)) return;
    setClickedIds((prev) => new Set(prev).add(index));
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const baseId = ++heartIdRef.current;
    const newHearts = [...Array(3)].map((_, i) => ({
      id: baseId + i,
      x: cx + Math.cos((i * 120) * (Math.PI / 180)) * 20,
      y: cy + Math.sin((i * 120) * (Math.PI / 180)) * 20,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => setHearts((prev) => prev.slice(-9)), 1200);
  };

  return (
    <section
      id="cute-things"
      className="relative min-h-screen py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #FFF6E9 0%, #FFE8E0 50%, #FFF6E9 100%)',
      }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🌷</span>
          <h2 className="font-display text-3xl md:text-4xl text-center text-[#5C4033]">
            21 Хөөрхөн Зүйлс
          </h2>
          <span className="text-2xl">🌸</span>
        </div>
        <p className="text-center text-[#5C4033]/80 mb-12">21 Нас - 21 Тэмдэглэх Шалтгаан! ✨</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {CUTE_THINGS.map((item, index) => (
            <motion.button
              key={index}
              onClick={(e) => handleClick(index, e)}
              className="group relative rounded-[28px] p-5 text-left min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#B88C6A]/40 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
              style={{
                background: CARD_COLORS[index % CARD_COLORS.length],
                boxShadow: '0 6px 24px rgba(248, 200, 220, 0.25), 0 2px 8px rgba(184, 140, 106, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                border: '1.5px solid rgba(255,255,255,0.6)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, type: 'spring', stiffness: 100 }}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Cute corner sparkles */}
              <span className="absolute top-2 right-2 text-base opacity-40 group-hover:opacity-70 transition-opacity">✦</span>
              <span className="absolute bottom-2 left-2 text-sm opacity-30">·</span>

              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl shrink-0" role="img" aria-hidden>
                  {item.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-[#5C4033]/70 mb-1.5"
                    style={{ background: 'rgba(255,255,255,0.6)' }}>
                    {index + 1}
                  </span>
                  <p className="font-semibold text-[#5C4033] text-base leading-tight">{item.mn}</p>
                  <p className="text-sm text-[#5C4033]/75 mt-0.5">{item.en}</p>
                </div>
              </div>

              {clickedIds.has(index) && (
                <motion.span
                  className="absolute top-3 right-3 text-xl"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                >
                  💖
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed text-2xl pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
            style={{ left: heart.x, top: heart.y }}
            initial={{ opacity: 1, scale: 0.3 }}
            animate={{ opacity: 0, y: -100, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {['💕', '💗', '💖'][heart.id % 3]}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
