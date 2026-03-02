'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MESSAGE = `🎂 Төрсөн өдрийн мэнд хүргэе!
21 нас бол шинэ боломж, шинэ мөрөөдлийн эхлэл.
Чамтай танилцаад удаагүй байгаа ч
танилцсан цагаасаа хойш миний ертөнцийг чимж байгаад баярлалаа.`;

export default function BirthdayMessageSection() {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < MESSAGE.length) {
        setDisplayed(MESSAGE.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="birthday-message"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{
        background: 'linear-gradient(180deg, #FFF6E9 0%, #FFE4D6 50%, #FFF6E9 100%)',
      }}
    >
      <motion.div
        className="relative max-w-lg w-full mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative flowers */}
        <div className="absolute -top-2 -left-2 text-3xl opacity-60">🌸</div>
        <div className="absolute -top-2 -right-2 text-3xl opacity-60">🌸</div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)',
            boxShadow: '0 8px 32px rgba(184, 140, 106, 0.15)',
          }}
        >
          <p className="font-headline text-2xl md:text-3xl font-semibold text-[#5C4033] mb-6">
            {displayed}
            {!isComplete && <span className="inline-block w-0.5 h-5 bg-[#B88C6A] ml-0.5 animate-pulse align-middle" />}
          </p>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        className="mt-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-sm font-medium text-[#5C4033]/80">21-ийн 1-р өдөр</span>
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #F8C8DC, #E6A8B8)' }}
            initial={{ width: 0 }}
            whileInView={{ width: '5%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
