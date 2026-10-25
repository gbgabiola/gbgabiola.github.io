'use client';

import { useEffect, useState } from 'react';

const phrases = [
  'I build websites.',
  'I build web applications.',
  'I love Node.js and React.',
  'I love project collaboration.',
  'I am Genesis, a Software Engineer.',
];

const finalPhrase = phrases[phrases.length - 1];

export default function Typewriter() {
  const [text, setText] = useState(finalPhrase);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let timeout;
    let phrase = 0;
    let length = 0;
    let deleting = false;

    function tick() {
      if (motion.matches) return;

      const current = phrases[phrase];

      length += deleting ? -1 : 1;
      setText(current.slice(0, length));

      if (length === current.length) {
        if (phrase === phrases.length - 1) return;

        deleting = true;
        timeout = window.setTimeout(tick, 1200);
      } else if (length === 0) {
        deleting = false;
        phrase += 1;
        timeout = window.setTimeout(tick, 250);
      } else {
        timeout = window.setTimeout(tick, deleting ? 30 : 65);
      }
    }

    function restart() {
      window.clearTimeout(timeout);

      phrase = 0;
      length = 0;
      deleting = false;

      setText(finalPhrase);

      if (!motion.matches) {
        timeout = window.setTimeout(tick, 800);
      }
    }

    restart();
    motion.addEventListener('change', restart);

    return () => {
      window.clearTimeout(timeout);
      motion.removeEventListener('change', restart);
    };
  }, []);

  return (
    <h1 className="hero-title">
      <span className="sr-only">{finalPhrase}</span>
      <span aria-hidden="true">{text}</span>
    </h1>
  );
}
