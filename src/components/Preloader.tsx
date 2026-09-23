"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const duration = 1600; // 1.6s
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsFinished(true);
              if (onComplete) onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        return Math.floor(prev + step);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      onClick={() => {
        setIsFading(true);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#160D08] px-8 py-12 transition-all duration-700 ease-in-out cursor-pointer select-none ${
        isFading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Top Info */}
      <div className="w-full flex items-center justify-between text-xs tracking-[0.25em] text-[#C5A880]/70 uppercase">
        <span>Sector 78 • Mohali</span>
        <span>Ultra-Luxury Residences</span>
      </div>

      {/* Center Crest */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[#C5A880]/40 p-1 shadow-[0_0_50px_rgba(197,168,128,0.15)]">
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <Image
              src="/images/logo.jpg"
              alt="Ananda Crown Crest"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-[0.15em] text-[#F5EFEB] uppercase">
            Ananda Crown
          </h1>
          <p className="text-[11px] md:text-xs tracking-[0.3em] text-[#C5A880] uppercase">
            The Crown Has Arrived
          </p>
        </div>
      </div>

      {/* Bottom Counter & Loading Bar */}
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-[#A8988B] uppercase">
          <span className="flex items-center space-x-1">
            <span>Loading Experience</span>
            <span className="inline-block animate-pulse">...</span>
          </span>
          <span className="font-mono text-sm text-[#C5A880]">{count}%</span>
        </div>

        {/* Progress Hairline */}
        <div className="h-[1px] w-full bg-[#341F14] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8C6D46] via-[#C5A880] to-[#E7CFAD] transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>

        <p className="text-center text-[9px] tracking-[0.2em] text-[#A8988B]/60 uppercase pt-1">
          Click anywhere to skip
        </p>
      </div>
    </div>
  );
}
