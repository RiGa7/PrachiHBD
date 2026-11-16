import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BirthdayCake3D } from './components/BirthdayCake3D';
import { AnnoyingPranks } from './components/AnnoyingPranks';
import { PhotoCollageWall } from './components/PhotoCollageWall';
import { GiftUnboxer } from './components/GiftUnboxer';
import { FloatingMusicControls } from './components/FloatingMusicControls';
import { BIRTHDAY_CONFIG } from './birthdayConfig';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  useEffect(() => {
    // Gentle multi-pastel confetti on load
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.25 },
        colors: ['#5eead4', '#fdba74', '#fde047', '#c084fc', '#4ade80', '#fb7185'],
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 pb-20 relative selection:bg-teal-100 selection:text-teal-900">
      {/* Multi-pastel ambient background mesh (Teal, Yellow, Coral, Mint, Lavender) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-20 w-80 h-80 bg-orange-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/35 rounded-full blur-3xl" />
      </div>

      {/* Main Container - Mobile First Max-W-md */}
      <main className="relative z-10 max-w-md mx-auto px-4 pt-6 space-y-9">
        {/* --- HEADER (From Rishika to Prachi) --- */}
        <section className="text-center space-y-2.5 pt-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white text-teal-800 border border-teal-200 rounded-full text-xs font-bold shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            From Nikki Didi to {BIRTHDAY_CONFIG.sisterRealName} • Born in 2010
          </motion.div>

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-800 leading-tight">
              Happy 16th Birthday, <br />
              <span className="text-teal-700 italic">
                {BIRTHDAY_CONFIG.sisterRealName}! 🌸
              </span>
            </h1>
            <p className="text-xs font-semibold text-orange-600 mt-1">
              (a.k.a {BIRTHDAY_CONFIG.sisterPetName} / {BIRTHDAY_CONFIG.sisterNickname} 🧸)
            </p>
          </motion.div>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed"
          >
            A digital birthday scrapbook made by your Nikki Didi, dedicated to the girl who gets annoyed by everything, hides in the hall, and runs away from my camera. 🎀
          </motion.p>
        </section>

        {/* --- 3D INTERACTIVE PASTEL CAKE --- */}
        <section>
          <BirthdayCake3D />
        </section>

        {/* --- SISTER BANTER & ANNOYANCES --- */}
        <section>
          <AnnoyingPranks />
        </section>

        {/* --- 52 REAL PHOTOS COLLAGE --- */}
        <section>
          <PhotoCollageWall />
        </section>

        {/* --- HEARTFELT LETTER --- */}
        <section>
          <GiftUnboxer />
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center pt-6 text-stone-400 text-xs space-y-1">
         
          <p className="text-[12px] text-stone-700">
            Happy 16th Birthday Chutki • Est. 2010
          </p>
        </footer>
      </main>

      {/* Floating Birthday Music Button */}
      <FloatingMusicControls />
    </div>
  );
};

export default App;
