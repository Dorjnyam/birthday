'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';

const SCRATCH_MESSAGE = 'Чамайг илүү таних 21 хоногийн аялал үргэлжилнэ...';
const COUNTDOWN_MESSAGE = 'Энэ бүхэн зүгээр л эхлэл байгаасай.';

// Soft instrumental - free from SoundHelix; add public/music.mp3 and use '/music.mp3' for your own track
const MUSIC_SRC =
  'song.mp3';

export default function SurpriseSection() {
  const [countdownActive, setCountdownActive] = useState(false);
  const [count, setCount] = useState(21);
  const [showMessage, setShowMessage] = useState(false);
  const [balloons, setBalloons] = useState(
    Array.from({ length: 21 }, (_, i) => ({ id: i, popped: false }))
  );
  const [lastBalloonRevealed, setLastBalloonRevealed] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startCountdown = () => {
    setCountdownActive(true);
    setCount(21);
    setShowMessage(false);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(interval);
          setShowMessage(true);
          setCountdownActive(false);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#D4A574');
    gradient.addColorStop(0.5, '#E8C9A0');
    gradient.addColorStop(1, '#D4A574');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleScratch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = ('touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left) * scaleX;
    const y = ('touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top) * scaleY;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const popBalloon = (id: number) => {
    setBalloons((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, popped: true } : b));
      const poppedCount = next.filter((b) => b.popped).length;
      if (poppedCount === 21) setLastBalloonRevealed(true);
      return next;
    });
  };

  const toggleMusic = useCallback(() => {
    setMusicPlaying((p) => !p);
  }, []);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    const onError = () => setMusicPlaying(false);
    const onEnded = () => setMusicPlaying(false);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.play().catch(() => setMusicPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  return (
    <section
      id="surprise"
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF6E9 0%, #FFE4D6 50%, #F8E8E0 100%)',
      }}
    >
      {/* Hidden music button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: '#B88C6A', color: 'white' }}
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Дуу сонсох"
      >
        {musicPlaying ? '🔇' : '🎵'}
      </motion.button>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl md:text-3xl text-center text-[#5C4033] mb-8">
          SURPRISE
        </h2>

        {/* 21 Second Countdown */}
        <div className="mb-12">
          <motion.button
            onClick={startCountdown}
            disabled={countdownActive}
            className="w-full py-4 rounded-2xl font-semibold text-lg disabled:opacity-70 min-h-[44px]"
            style={{
              background: 'linear-gradient(135deg, #F8C8DC 0%, #E6A8B8 100%)',
              boxShadow: '0 4px 20px rgba(248, 200, 220, 0.4)',
              color: '#5C4033',
            }}
            whileHover={!countdownActive ? { scale: 1.02 } : {}}
            whileTap={!countdownActive ? { scale: 0.98 } : {}}
          >
            {countdownActive
              ? `${count} секунд...`
              : '21 СЕКУНДИЙН БЭЛЭГ - ДАРАХ'}
          </motion.button>
        </div>

        {/* Scratch Card */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-[#5C4033] mb-3">Зурах Карт</h3>
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 120 }}>
            <div
              className="absolute inset-0 flex items-center justify-center p-6 text-center z-0"
              style={{ background: 'linear-gradient(135deg, #FFF6E9, #FFE4D6)' }}
            >
              <p className="text-[#5C4033] font-medium text-lg">{SCRATCH_MESSAGE}</p>
              <span className="absolute top-4 text-4xl opacity-30">🐾</span>
            </div>
            <canvas
              ref={canvasRef}
              width={400}
              height={120}
              className="relative w-full h-[120px] rounded-2xl touch-none cursor-crosshair z-10 block"
              onMouseDown={(e) => {
                isScratching.current = true;
                handleScratch(e);
              }}
              onMouseMove={(e) => isScratching.current && handleScratch(e)}
              onMouseUp={() => (isScratching.current = false)}
              onMouseLeave={() => (isScratching.current = false)}
              onTouchStart={(e) => handleScratch(e)}
              onTouchMove={(e) => handleScratch(e)}
            />
          </div>
        </div>

        {/* Balloon Pop */}
        <div className="relative">
          <p className="text-center text-[#5C4033]/80 mb-4">Шааран дээр дараарай!</p>
          <div className="flex flex-wrap justify-center gap-3 min-h-[120px]">
            {balloons.map((b) =>
              b.popped ? (
                <motion.div
                  key={b.id}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                  initial={{ scale: 1 }}
                  animate={{ scale: 0 }}
                  style={{ background: '#E8E8E8' }}
                >
                  💥
                </motion.div>
              ) : (
                <motion.button
                  key={b.id}
                  onClick={() => popBalloon(b.id)}
                  className="w-10 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs min-h-[44px]"
                  style={{
                    background: [
                      '#F8C8DC', '#A8D8EA', '#FFEAA7', '#E6E6FA', '#FFD6C0',
                      '#B8E8C8', '#FFB5A7', '#D4A5D9', '#FFE066',
                    ][b.id % 9],
                    clipPath: 'ellipse(40% 50% at 50% 50%)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {b.id + 1}
                </motion.button>
              )
            )}
          </div>
          <AnimatePresence>
            {lastBalloonRevealed && (
              <motion.div
                className="mt-6 p-6 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF, #FFF9F5)',
                  boxShadow: '0 8px 32px rgba(184, 140, 106, 0.2)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-[#5C4033] font-medium text-lg">
                  Энэ бол зүгээр нэг төрсөн өдрийн бэлэг биш. Энэ бол чамд зориулсан жижигхэн дурсамж. 💕
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Countdown overlay */}
      <AnimatePresence>
        {(countdownActive || showMessage) && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {countdownActive && (
              <motion.span
                key={count}
                className="text-8xl font-display text-white"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                {count}
              </motion.span>
            )}
            {showMessage && (
              <motion.div
                className="text-center px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-2xl md:text-3xl text-white font-headline font-medium">
                  {COUNTDOWN_MESSAGE}
                </p>
                <motion.button
                  className="mt-8 px-8 py-3 rounded-full bg-white/20 text-white"
                  onClick={() => setShowMessage(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  Хаах
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
