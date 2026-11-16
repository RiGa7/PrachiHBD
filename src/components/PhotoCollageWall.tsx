import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Shuffle, Camera } from 'lucide-react';
import { REAL_PHOTOS, CUTE_STICKERS, BIRTHDAY_CONFIG } from '../birthdayConfig';
import { sound } from '../utils/sound';

const TAPE_CLASSES = [
  'tape-teal -rotate-2',
  'tape-yellow rotate-1',
  'tape-coral -rotate-1',
  'tape-pink rotate-2',
  'tape-lavender -rotate-2',
  'tape-mint rotate-1',
];

export const PhotoCollageWall: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>(REAL_PHOTOS);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleShuffle = () => {
    sound.pop();
    setPhotos([...photos].sort(() => Math.random() - 0.5));
  };

  const openLightbox = (index: number) => {
    sound.pop();
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="text-center px-2 space-y-1">
        <h2 className="font-serif-title text-2xl sm:text-3xl text-stone-800">
          Chutki 📸
        </h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
          Captured memories of {BIRTHDAY_CONFIG.sisterRealName} ({BIRTHDAY_CONFIG.sisterPetName}) from 2016 to today!
        </p>

        {/* Shuffle Button */}
        <div className="pt-1">
          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-stone-700 hover:bg-stone-50 border border-stone-200 text-xs font-semibold rounded-full shadow-2xs transition-all active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5 text-teal-600" />
            Shuffle Collage Order
          </button>
        </div>
      </div>

      {/* Masonry Collage Grid */}
      <div className="columns-2 sm:columns-3 gap-3.5 space-y-4 pt-3">
        {photos.map((src, idx) => {
          const tapeClass = TAPE_CLASSES[idx % TAPE_CLASSES.length];
          const sticker = CUTE_STICKERS[idx % CUTE_STICKERS.length];
          const tilt = idx % 3 === 0 ? -1.2 : idx % 3 === 1 ? 1.0 : -0.6;

          return (
            <motion.div
              key={`${src}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              style={{ transform: `rotate(${tilt}deg)` }}
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid cursor-pointer bg-white rounded-2xl p-2.5 pb-2 border border-stone-200/80 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 relative"
            >
              {/* REALISTIC OVERLAPPING WASHI TAPE */}
              <div
                className={`absolute -top-2.5 left-1/2 -translate-x-1/2 real-washi-tape rounded-xs z-20 pointer-events-none ${tapeClass}`}
              />

              {/* Photo Image */}
              <div className="w-full rounded-xl overflow-hidden bg-stone-100 mt-1 shadow-2xs">
                <img
                  src={src}
                  alt={`Memory ${idx + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Bottom polaroid tag */}
              <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-semibold text-stone-400">
                <span>#{idx + 1}</span>
                <span className="text-sm">{sticker}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-stone-900/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl p-4 shadow-2xl border border-stone-200 space-y-3"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-xs font-bold text-stone-500">
                Photo {selectedIndex + 1} of {photos.length}
              </div>

              <div className="relative w-full max-h-[68vh] flex items-center justify-center rounded-2xl overflow-hidden bg-stone-50">
                <img
                  src={photos[selectedIndex]}
                  alt="Expanded memory"
                  className="max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-xs"
                />

                <button
                  onClick={prevPhoto}
                  className="absolute left-2 p-2.5 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 p-2.5 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-400">
                Tap anywhere outside to close • Use arrows to view next photo
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
