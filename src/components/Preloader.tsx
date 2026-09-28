"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const topTextLeftRef = useRef<HTMLSpanElement>(null);
  const topTextRightRef = useRef<HTMLSpanElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  
  const tl = useRef<gsap.core.Timeline | null>(null);
  const exitTl = useRef<gsap.core.Timeline | null>(null);

  const titleText = "Ananda Crown";

  useGSAP(() => {
    if (tl.current) return;
    
    tl.current = gsap.timeline({
      onComplete: () => {
        playExit();
      }
    });

    const counter = { value: 0 };
    
    // Counter & Bar
    tl.current.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      snap: { value: 1 },
      onUpdate: () => setCount(counter.value)
    }, 0);
    
    tl.current.fromTo(barRef.current, { width: "0%" }, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut"
    }, 0);

    // Top texts
    tl.current.from([topTextLeftRef.current, topTextRightRef.current], {
      x: (i) => i === 0 ? -20 : 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    }, 0.2);

    // Logo crest entrance
    tl.current.from(logoRef.current, {
      scale: 0.6,
      opacity: 0,
      rotation: -5,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, 0.4);

    // Title characters stagger
    tl.current.from(titleCharsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: {
        from: "center",
        amount: 0.4
      },
      ease: "power3.out"
    }, 0.6);

    // Tagline entrance
    tl.current.from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, 0.8);
    
  }, { scope: containerRef });

  const playExit = () => {
    if (exitTl.current) return; // Prevent multiple exit triggers
    if (tl.current) tl.current.kill();
    
    exitTl.current = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    });

    // First: scale logo up slightly and fade
    exitTl.current.to(logoRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });

    // Then: animate entire preloader with clipPath
    exitTl.current.fromTo(containerRef.current, 
      { clipPath: "circle(50% at 50% 50%)" },
      { 
        clipPath: "circle(0% at 50% 50%)", 
        duration: 0.8, 
        ease: "power4.inOut" 
      }
    );
  };

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      onClick={playExit}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#160D08] px-8 py-12 cursor-pointer select-none"
    >
      {/* Top Info */}
      <div className="w-full flex items-center justify-between text-xs tracking-[0.25em] text-[#C5A880]/70 uppercase">
        <span ref={topTextLeftRef}>Sector 78 • Mohali</span>
        <span ref={topTextRightRef}>Ultra-Luxury Residences</span>
      </div>

      {/* Center Crest */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div ref={logoRef} className="relative h-24 w-24 overflow-hidden rounded-full border border-[#C5A880]/40 p-1 shadow-[0_0_50px_rgba(197,168,128,0.15)]">
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
            {titleText.split("").map((char, index) => (
              <span 
                key={index} 
                ref={(el) => { titleCharsRef.current[index] = el; }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p ref={taglineRef} className="text-[11px] md:text-xs tracking-[0.3em] text-[#C5A880] uppercase">
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
            ref={barRef}
            className="h-full bg-gradient-to-r from-[#8C6D46] via-[#C5A880] to-[#E7CFAD]"
            style={{ width: "0%" }}
          />
        </div>

        <p className="text-center text-[9px] tracking-[0.2em] text-[#A8988B]/60 uppercase pt-1">
          Click anywhere to skip
        </p>
      </div>
    </div>
  );
}
