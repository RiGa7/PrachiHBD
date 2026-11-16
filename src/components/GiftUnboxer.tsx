import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';

export const GiftUnboxer: React.FC = () => {
  const [tapCount, setTapCount] = useState(0);
  const targetTaps = 8;
  const isUnlocked = tapCount >= targetTaps;

  const handleTap = () => {
    if (isUnlocked) return;

    const next = tapCount + 1;
    setTapCount(next);

    if (next < targetTaps) {
      sound.boing();
    } else {
      sound.partyHorn();
      sound.playBirthdayTune();

      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#5eead4', '#fdba74', '#fde047', '#c084fc', '#4ade80', '#fb7185'],
      });
    }
  };

  const progressPercent = Math.min((tapCount / targetTaps) * 100, 100);

  return (
    <div className="w-full">
      <div className="bg-white/95 rounded-3xl p-6 border border-orange-200/80 shadow-sm relative overflow-hidden text-center">
        {!isUnlocked ? (
          <div className="space-y-4">
           
            <h3 className="font-serif-title text-2xl text-stone-800">
              One Last Birthday Surprise 💌
            </h3>

            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Tap the gift box {targetTaps} times to untie the ribbon and read your birthday letter!
            </p>

            {/* Tap Button / Shaking Gift Box */}
            <div className="py-2 flex justify-center">
              <motion.button
                onClick={handleTap}
                whileTap={{ scale: 0.9 }}
                animate={
                  tapCount > 0
                    ? {
                        rotate: [0, -8, 8, -6, 6, 0],
                        scale: 1 + tapCount * 0.02,
                      }
                    : {
                        y: [0, -4, 0],
                      }
                }
                transition={{
                  duration: tapCount > 0 ? 0.2 : 2.5,
                  repeat: tapCount > 0 ? 0 : Infinity,
                }}
                className="relative p-5 bg-gradient-to-tr from-teal-100 via-orange-100 to-amber-100 rounded-3xl border-2 border-orange-300/70 shadow-xs cursor-pointer"
              >
                <Gift className="w-16 h-16 text-orange-500" />
                <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {tapCount}/{targetTaps} TAPS
                </div>
              </motion.button>
            </div>

            {/* Progress bar */}
            <div className="w-48 mx-auto bg-stone-100 rounded-full h-2 p-0.5 overflow-hidden border border-stone-200/60">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 to-orange-400 rounded-full"
                animate={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-stone-400">
              {tapCount === 0 && '👆 Tap to open!'}
              {tapCount > 0 && tapCount < targetTaps && 'Almost there... 💕'}
            </p>
          </div>
        ) : (
          /* UNLOCKED: The Heartfelt Sister Letter */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="inline-flex p-3 bg-teal-50 rounded-2xl border border-teal-200">
              <Heart className="w-8 h-8 text-teal-600 fill-teal-200 animate-pulse" />
            </div>

            <h3 className="font-serif-title text-2xl text-stone-800">
              {BIRTHDAY_CONFIG.heartfeltLetter.greeting}
            </h3>

            {/* Letter Content */}
            <div className="bg-[#fffdfa] border border-amber-200/80 rounded-2xl p-5 text-left space-y-3 shadow-2xs">
              {BIRTHDAY_CONFIG.heartfeltLetter.paragraphs.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {p}
                </p>
              ))}

              <div className="pt-4 border-t border-stone-200 text-right space-y-0.5">
                <p className="text-xs text-stone-500 italic">
                  {BIRTHDAY_CONFIG.heartfeltLetter.closing}
                </p>
                <p className="text-sm font-bold text-teal-700 font-serif-title">
                  {BIRTHDAY_CONFIG.heartfeltLetter.signOff}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.partyHorn();
                confetti({
                  particleCount: 80,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#5eead4', '#fdba74', '#fde047', '#c084fc', '#4ade80', '#fb7185'],
                });
              }}
              className="py-2 px-4 bg-white hover:bg-stone-50 text-stone-700 font-semibold rounded-full border border-stone-200 shadow-2xs text-xs active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Celebrate 🌸
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
