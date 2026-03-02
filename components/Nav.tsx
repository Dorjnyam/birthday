'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { href: '#hero', label: 'Нүүр' },
  { href: '#birthday-message', label: '21 Шалтгаан' },
  { href: '#cute-things', label: 'Зурвас' },
  { href: '#surprise', label: 'Галерей' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-end">
        <div className="hidden md:flex gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#5C4033] font-medium hover:opacity-80 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
        <motion.button
          className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Цэс"
        >
          <span
            className={`block w-6 h-0.5 rounded bg-[#5C4033] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 rounded bg-[#5C4033] transition-opacity ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 rounded bg-[#5C4033] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </motion.button>
      </nav>

      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-[#FFF6E9]/95 flex flex-col items-center justify-center gap-6 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xl text-[#5C4033] font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}
