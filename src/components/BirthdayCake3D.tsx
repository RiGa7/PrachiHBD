import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { Flame, Sparkles as SparklesIcon, RotateCw } from 'lucide-react';

interface CakeProps {
  candlesLit: boolean;
  onBlowCandles: () => void;
}

const CANDLE_COLORS = [
  '#2dd4bf', // pastel teal
  '#fb923c', // pastel coral
  '#facc15', // pastel yellow
  '#c084fc', // pastel lavender
  '#4ade80', // pastel mint
  '#f472b6', // pastel pink
  '#38bdf8', // pastel sky
  '#fb7185', // pastel rose
];

function PastelCandle({
  position,
  isLit,
  color,
}: {
  position: [number, number, number];
  isLit: boolean;
  color: string;
}) {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (isLit && flameRef.current && lightRef.current) {
      const t = state.clock.getElapsedTime() * 7;
      const flicker = Math.sin(t) * 0.08 + Math.cos(t * 1.3) * 0.04;
      flameRef.current.scale.set(1 + flicker, 1 + flicker * 1.3, 1 + flicker);
      lightRef.current.intensity = 1.0 + flicker * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Candle cylinder */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.64, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Wick */}
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
        <meshBasicMaterial color="#57534e" />
      </mesh>
      {/* Flame */}
      {isLit && (
        <group position={[0, 0.77, 0]}>
          <mesh ref={flameRef}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={2.0}
              roughness={0.1}
            />
          </mesh>
          <pointLight ref={lightRef} color="#fde047" intensity={0.9} distance={1.8} />
        </group>
      )}
    </group>
  );
}

function CakeModel({ candlesLit, onBlowCandles }: CakeProps) {
  const cakeGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (cakeGroup.current) {
      cakeGroup.current.rotation.y += delta * 0.32;
    }
  });

  // 16 candles (8 on top tier, 8 on bottom tier)
  const candlePositionsTop: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    candlePositionsTop.push([Math.cos(angle) * 0.72, 0.88, Math.sin(angle) * 0.72]);
  }
  const candlePositionsBottom: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = ((i + 0.5) / 8) * Math.PI * 2;
    candlePositionsBottom.push([Math.cos(angle) * 1.45, 0.35, Math.sin(angle) * 1.45]);
  }

  // Frosting pearls along Tier 1 and Tier 2 rims
  const pearlCountTier1 = 20;
  const pearlCountTier2 = 14;

  return (
    <group ref={cakeGroup} onClick={onBlowCandles}>
      {/* Ceramic Plate */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[2.0, 2.0, 0.08, 36]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} />
      </mesh>

      {/* Tier 1 (Pastel Mint / Teal) */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.7, 1.7, 0.82, 36]} />
        <meshStandardMaterial color="#5eead4" roughness={0.4} />
      </mesh>

      {/* Tier 1 Frosting Pearls (Flat circle around rim) */}
      {Array.from({ length: pearlCountTier1 }).map((_, i) => {
        const angle = (i / pearlCountTier1) * Math.PI * 2;
        return (
          <mesh
            key={`p1-${i}`}
            position={[Math.cos(angle) * 1.68, 0.28, Math.sin(angle) * 1.68]}
          >
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#fef9c3" roughness={0.2} />
          </mesh>
        );
      })}

      {/* Tier 2 (Pastel Coral / Peach) */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.58, 32]} />
        <meshStandardMaterial color="#fdba74" roughness={0.4} />
      </mesh>

      {/* Tier 2 Frosting Pearls (Flat circle around rim) */}
      {Array.from({ length: pearlCountTier2 }).map((_, i) => {
        const angle = (i / pearlCountTier2) * Math.PI * 2;
        return (
          <mesh
            key={`p2-${i}`}
            position={[Math.cos(angle) * 1.04, 0.84, Math.sin(angle) * 1.04]}
          >
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        );
      })}

      {/* Center Strawberry / Star Topper */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#fb7185" roughness={0.2} />
      </mesh>
      {/* Strawberry green leaf */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.08, 0.12, 5]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* 16 Pastel Candles */}
      {candlePositionsTop.map((pos, idx) => (
        <PastelCandle
          key={`top-${idx}`}
          position={pos}
          isLit={candlesLit}
          color={CANDLE_COLORS[idx % CANDLE_COLORS.length]}
        />
      ))}
      {candlePositionsBottom.map((pos, idx) => (
        <PastelCandle
          key={`bot-${idx}`}
          position={pos}
          isLit={candlesLit}
          color={CANDLE_COLORS[(idx + 4) % CANDLE_COLORS.length]}
        />
      ))}

      {/* Soft pastel sparkles */}
      {candlesLit && (
        <Sparkles count={30} scale={4} size={3} speed={0.4} opacity={0.6} color="#fde047" />
      )}
    </group>
  );
}

export const BirthdayCake3D: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlow = () => {
    if (candlesLit) {
      setCandlesLit(false);
      setWishMade(true);
      sound.partyHorn();

      // Multi-pastel confetti explosion
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#5eead4', '#fdba74', '#fde047', '#c084fc', '#4ade80', '#fb7185'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#5eead4', '#fdba74', '#fde047', '#c084fc'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#4ade80', '#fb7185', '#38bdf8', '#facc15'],
        });
      }, 200);
    } else {
      setCandlesLit(true);
      sound.pop();
    }
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Header Info */}
      <div className="text-center space-y-1 mb-1">
        <span className="text-xs font-bold text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
          <SparklesIcon className="w-3.5 h-3.5 text-teal-600" /> 16 Birthday Candles
        </span>
        <h3 className="font-serif-title text-2xl text-stone-800">
          Make a wish & blow out the candles 🎂
        </h3>
      </div>

      {/* 3D Canvas - Completely open, no restrictive box, tall enough to show the full cake! */}
      <div className="w-full h-80 sm:h-96 relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2.5, 5.2], fov: 42 }}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 4]} intensity={1.3} />
          <directionalLight position={[-4, 4, -3]} intensity={0.6} color="#fed7aa" />
          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
            <CakeModel candlesLit={candlesLit} onBlowCandles={handleBlow} />
          </Float>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 4.5}
          />
        </Canvas>

        {/* Floating helper hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap">
          <span className="bg-white/85 text-stone-600 text-xs font-semibold px-3 py-1 rounded-full border border-stone-200/80 shadow-xs backdrop-blur-xs flex items-center gap-1.5">
            <RotateCw className="w-3 h-3 text-teal-600 animate-spin-slow" />
            Swipe to spin 3D cake
          </span>
        </div>
      </div>

      {/* Button to Blow / Relight */}
      <div className="w-full max-w-xs mt-2 space-y-2">
        <button
          onClick={handleBlow}
          className={`w-full py-3 px-5 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs ${
            candlesLit
              ? 'bg-teal-600 hover:bg-teal-700 text-white active:scale-98'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 active:scale-98'
          }`}
        >
          {candlesLit ? (
            <>
              <Flame className="w-4 h-4 text-yellow-200 animate-pulse" />
              <span>Tap To Blow Out Candles! 💨</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-4 h-4 text-amber-700" />
              <span>Wish Made! Tap to Relight ✨</span>
            </>
          )}
        </button>

        {wishMade && !candlesLit && (
          <p className="text-xs text-center font-semibold text-teal-700 bg-teal-50/80 p-2 rounded-xl border border-teal-200">
            🎉 Happy 16th Birthday! May all your wishes come true!
          </p>
        )}
      </div>
    </div>
  );
};
