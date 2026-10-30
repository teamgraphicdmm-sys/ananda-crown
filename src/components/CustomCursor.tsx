"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useGSAP(() => {
    if (isTouch) return;
    if (!ringRef.current || !dotRef.current) return;

    // Set initial state
    gsap.set([ringRef.current, dotRef.current], { 
      xPercent: -50, 
      yPercent: -50,
      opacity: 0
    });

    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3" });
    
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power2" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power2" });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([ringRef.current, dotRef.current], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }

      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);

      const target = e.target as HTMLElement | null;
      const isHovering = 
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("input") ||
        target?.closest("select") ||
        target?.closest("textarea") ||
        target?.getAttribute("role") === "button";

      gsap.to(ringRef.current, {
        width: isHovering ? 48 : 28,
        height: isHovering ? 48 : 28,
        backgroundColor: isHovering ? "rgba(197, 168, 128, 0.15)" : "transparent",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([ringRef.current, dotRef.current], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#C5A880]/60 hidden md:block opacity-0"
        style={{ width: "28px", height: "28px" }}
      />
      {/* Inner Pinpoint Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#C5A880] hidden md:block opacity-0"
      />
    </>
  );
}
