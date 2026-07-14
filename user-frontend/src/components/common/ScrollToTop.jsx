/**
 * @file ScrollToTop.jsx
 * @description Floating scroll-to-top button for Treno.
 * Appears with a fade-in animation once the user has scrolled more than 300 px,
 * then smoothly returns the page to the top on click.
 */

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const buttonVariants = {
  hidden: {
    opacity: 0,
    scale:   0.6,
    y:       20,
  },
  visible: {
    opacity:    1,
    scale:      1,
    y:          0,
    transition: {
      type:      'spring',
      stiffness: 400,
      damping:   25,
    },
  },
  exit: {
    opacity:    0,
    scale:      0.6,
    y:          20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Floating scroll-to-top button.
 *
 * - Renders as a fixed amber circle in the bottom-right corner.
 * - Fades in / scales up once `window.scrollY > THRESHOLD`.
 * - Smoothly scrolls back to `(0, 0)` on click.
 *
 * @param {{
 *   threshold?: number,
 *   bottom?:    string,
 *   right?:     string,
 * }} props
 *
 * @param {number} [props.threshold=300] - Scroll depth (px) before the button appears.
 * @param {string} [props.bottom='6']    - Tailwind bottom offset class value (e.g. '6' → 'bottom-6').
 * @param {string} [props.right='6']     - Tailwind right  offset class value (e.g. '6' → 'right-6').
 */
export default function ScrollToTop({
  threshold = 300,
  bottom    = '6',
  right     = '6',
}) {
  const [visible, setVisible] = useState(false);

  // Listen to scroll position
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);

    // Passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className={`fixed bottom-${bottom} right-${right} z-50
            w-11 h-11 rounded-full
            bg-amber-500 hover:bg-amber-400 active:bg-amber-600
            text-white shadow-lg shadow-amber-900/30
            flex items-center justify-center
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
            transition-colors`}
          // Subtle press animation via whileTap
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
