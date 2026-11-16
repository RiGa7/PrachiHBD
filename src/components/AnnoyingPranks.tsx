import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Check, Smile } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';

export const AnnoyingPranks: React.FC = () => {
  // Prank 1: Runaway Button
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [agreed, setAgreed] = useState(false);

  // Prank 2: Annoyance Checklist
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const dodge = () => {
    sound.boing();
    setDodgeCount((prev) => prev + 1);
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 100;
    setNoPos({ x: randomX, y: randomY });
  };

  const handleAgree = () => {
    sound.partyHorn();
    setAgreed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5eead4', '#fdba74', '#fde047', '#c084fc', '#4ade80', '#fb7185'],
    });
  };

  const toggleCheck = (idx: number) => {
    sound.pop();
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="w-full space-y-6">
      {/* --- SECTION 1: THE SISTER CHECK-IN --- */}
      <div className="bg-white/95 rounded-3xl p-5 border border-teal-200/80 shadow-sm relative overflow-hidden">
        <div className="text-center mb-4 space-y-1">
          <span className="text-xs font-bold text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
            Sister Check-in 💌
          </span>
          <h3 className="font-serif-title text-xl text-stone-800 pt-1">
            {BIRTHDAY_CONFIG.sisterTest.question}
          </h3>
          <p className="text-xs text-stone-500">
            (Think carefully before tapping, Chutki...)
          </p>
        </div>

        {agreed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-1"
          >
            <Smile className="w-8 h-8 text-teal-600 mx-auto" />
            <p className="font-bold text-teal-900 text-sm">
              I knew you loved your big sister! 🥰
            </p>
          </motion.div>
        ) : (
          <div className="relative min-h-[100px] flex items-center justify-center gap-3">
            {/* AGREE BUTTON (NIKKI IS THE BEST) */}
            <motion.button
              onClick={handleAgree}
              animate={{
                scale: 1 + Math.min(dodgeCount * 0.08, 0.3),
              }}
              className="py-2.5 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-sm text-xs sm:text-sm active:scale-95 transition-all text-center leading-snug"
            >
              {BIRTHDAY_CONFIG.sisterTest.agreeText}
            </motion.button>

            {/* RUNAWAY DISAGREE BUTTON */}
            <motion.button
              onMouseEnter={dodge}
              onTouchStart={dodge}
              onClick={dodge}
              animate={{
                x: noPos.x,
                y: noPos.y,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="py-2 px-3.5 bg-stone-100 hover:bg-stone-200 text-stone-600 font-semibold rounded-2xl border border-stone-200 text-xs shadow-2xs select-none touch-none whitespace-nowrap"
            >
              {dodgeCount === 0 && BIRTHDAY_CONFIG.sisterTest.disagreeText}
              {dodgeCount === 1 && 'Nope! 🏃‍♀️'}
              {dodgeCount === 2 && 'Nice try! 🤭'}
              {dodgeCount >= 3 && 'Just tap Nikki! 💕'}
            </motion.button>
          </div>
        )}

        {dodgeCount > 0 && !agreed && (
          <p className="text-[11px] text-center text-stone-400 mt-1 italic">
            (The button ran away into the hallway to sit alone...)
          </p>
        )}
      </div>

      {/* --- SECTION 2: PRACHI'S DAILY ANNOYANCES (Observed by Nikki) --- */}
      <div className="bg-white/95 rounded-3xl p-5 border border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
              The Daily Reality Check 🧸
            </span>
            <h3 className="font-serif-title text-lg text-stone-800 mt-1">
              Things That Instantly Annoy Prachi
            </h3>
            <p className="text-[11px] text-stone-400 italic">
              (Documented daily by Nikki 🔍)
            </p>
          </div>
          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full self-start">
            {totalChecked}/{BIRTHDAY_CONFIG.annoyanceTriggers.length} Checked
          </span>
        </div>

        <p className="text-xs text-stone-500">
          Tap each one that is 100% accurate, Chutki:
        </p>

        <div className="space-y-2.5">
          {BIRTHDAY_CONFIG.annoyanceTriggers.map((item, idx) => {
            const isChecked = !!checkedItems[idx];
            return (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm ${
                  isChecked
                    ? `${item.badgeColor} shadow-2xs`
                    : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100/70 text-stone-700'
                }`}
              >
                <div className="flex items-start gap-2.5 pr-2">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-stone-800 border-stone-800 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-semibold leading-snug">{item.title}</span>
                </div>
                <span className="text-[11px] font-bold opacity-90 whitespace-nowrap shrink-0">
                  {item.reaction}
                </span>
              </button>
            );
          })}
        </div>

        {totalChecked >= 2 && (
          <p className="text-xs text-center font-semibold text-amber-900 bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
            Confirmed: {totalChecked} of {BIRTHDAY_CONFIG.annoyanceTriggers.length}! Still Nikki Didi's favorite little sister. 🌸
          </p>
        )}
      </div>
    </div>
  );
};
