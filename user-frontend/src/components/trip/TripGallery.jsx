import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------
function Lightbox({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const thumbsRef = useRef(null);

  const go = useCallback(
    (delta) => {
      setDirection(delta);
      setCurrent((c) => clamp(c + delta, 0, images.length - 1));
    },
    [images.length]
  );

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbsRef.current) return;
    const active = thumbsRef.current.querySelector(`[data-index="${current}"]`);
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Touch / swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      go(dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  const img = images[current];

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-white/60 text-sm font-medium">
          {current + 1} / {images.length}
        </span>
        {img?.caption && (
          <span className="text-white/70 text-sm hidden sm:block">{img.caption}</span>
        )}
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-12">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            src={img?.url}
            alt={img?.alt ?? `Image ${current + 1}`}
            className="max-h-full max-w-full object-contain rounded-lg select-none"
            draggable={false}
          />
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
            bg-white/10 hover:bg-white/25 disabled:opacity-20 flex items-center justify-center transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => go(1)}
          disabled={current === images.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
            bg-white/10 hover:bg-white/25 disabled:opacity-20 flex items-center justify-center transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbsRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 shrink-0 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {images.map((im, idx) => (
          <button
            key={idx}
            data-index={idx}
            onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
            className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150
              ${idx === current ? 'border-amber-400 scale-105' : 'border-transparent opacity-50 hover:opacity-80'}`}
            aria-label={`Go to image ${idx + 1}`}
          >
            <img
              src={im.url}
              alt={im.alt ?? `Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Gallery Grid
// ---------------------------------------------------------------------------
export default function TripGallery({ images = [], tripTitle = '' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visible = images.slice(0, 5);
  const extraCount = images.length - 5;

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-2xl text-gray-400 text-sm">
        No images available
      </div>
    );
  }

  // Single image
  if (images.length === 1) {
    return (
      <>
        <GalleryImage image={images[0]} onClick={() => openLightbox(0)} className="aspect-video rounded-2xl" />
        {lightboxIndex !== null && (
          <AnimatePresence>
            <Lightbox images={images} initialIndex={lightboxIndex} onClose={closeLightbox} />
          </AnimatePresence>
        )}
      </>
    );
  }

  // 2 images
  if (images.length === 2) {
    return (
      <>
        <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
          {images.map((img, i) => (
            <GalleryImage key={i} image={img} onClick={() => openLightbox(i)} className="aspect-[4/3]" />
          ))}
        </div>
        {lightboxIndex !== null && (
          <AnimatePresence>
            <Lightbox images={images} initialIndex={lightboxIndex} onClose={closeLightbox} />
          </AnimatePresence>
        )}
      </>
    );
  }

  // 3-4 images
  if (images.length <= 4) {
    return (
      <>
        <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
          <GalleryImage image={images[0]} onClick={() => openLightbox(0)} className="row-span-2 aspect-square" />
          {images.slice(1).map((img, i) => (
            <GalleryImage key={i + 1} image={img} onClick={() => openLightbox(i + 1)} className="aspect-[4/3]" />
          ))}
        </div>
        {lightboxIndex !== null && (
          <AnimatePresence>
            <Lightbox images={images} initialIndex={lightboxIndex} onClose={closeLightbox} />
          </AnimatePresence>
        )}
      </>
    );
  }

  // 5+ images — standard layout
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px]">
        {/* Large image — col-span-2 row-span-2 */}
        <div className="col-span-2 row-span-2">
          <GalleryImage
            image={visible[0]}
            onClick={() => openLightbox(0)}
            className="w-full h-full"
          />
        </div>

        {/* 4 smaller images */}
        {visible.slice(1).map((img, i) => {
          const isLast = i === 3;
          return (
            <div key={i + 1} className="relative overflow-hidden">
              <GalleryImage
                image={img}
                onClick={() => openLightbox(i + 1)}
                className="w-full h-full"
              />
              {isLast && extraCount > 0 && (
                <button
                  onClick={() => openLightbox(i + 1)}
                  className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white gap-1 hover:bg-black/65 transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                  <span className="text-lg font-bold">+{extraCount} more</span>
                  <span className="text-xs text-white/70">View all photos</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <AnimatePresence>
          <Lightbox images={images} initialIndex={lightboxIndex} onClose={closeLightbox} />
        </AnimatePresence>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Single gallery cell
// ---------------------------------------------------------------------------
function GalleryImage({ image, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`group block overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${className}`}
      aria-label={`View ${image?.alt ?? 'image'}`}
    >
      <img
        src={image?.url}
        alt={image?.alt ?? 'Trip image'}
        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        loading="lazy"
      />
    </button>
  );
}
