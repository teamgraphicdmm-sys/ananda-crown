"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, Download, Send, Sparkles, Compass, Maximize2, ShieldCheck, Ruler } from "lucide-react";
import gsap from "gsap";
import { InventoryUnit } from "@/data/projectData";

interface FloorplanModalProps {
  unit: InventoryUnit | null;
  onClose: () => void;
  onInquireUnit: (unit: InventoryUnit) => void;
}

export default function FloorplanModal({
  unit,
  onClose,
  onInquireUnit,
}: FloorplanModalProps) {
  const [displayUnit, setDisplayUnit] = useState<InventoryUnit | null>(unit);
  const [isClosing, setIsClosing] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const scanGlowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerTRRef = useRef<HTMLDivElement>(null);
  const cornerBLRef = useRef<HTMLDivElement>(null);
  const cornerBRRef = useRef<HTMLDivElement>(null);

  // Sync unit prop with local displayUnit
  useEffect(() => {
    if (unit) {
      setDisplayUnit(unit);
      setIsClosing(false);
    }
  }, [unit]);

  // Handle closing with smooth GSAP exit choreography
  const handleClose = useCallback(
    (callback?: () => void) => {
      if (isClosing || !modalRef.current || !backdropRef.current) {
        if (callback) callback();
        else onClose();
        return;
      }

      setIsClosing(true);

      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsClosing(false);
          setDisplayUnit(null);
          if (callback) {
            callback();
          } else {
            onClose();
          }
        },
      });

      // Swift, refined reverse exit sequence
      exitTl
        .to([cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current], {
          scale: 0.6,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        })
        .to(
          modalRef.current.querySelectorAll(".spec-row-item, .blueprint-hud"),
          {
            opacity: 0,
            y: 10,
            stagger: 0.02,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.15"
        )
        .to(
          modalRef.current,
          {
            opacity: 0,
            scale: 0.94,
            y: 20,
            rotateX: 4,
            duration: 0.3,
            ease: "power3.in",
          },
          "-=0.1"
        )
        .to(
          backdropRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
          },
          "-=0.15"
        );
    },
    [isClosing, onClose]
  );

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    if (!displayUnit) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayUnit, handleClose]);

  // Entrance Animation Sequence
  useEffect(() => {
    if (!displayUnit || !modalRef.current || !backdropRef.current) return;

    const ctx = gsap.context(() => {
      const enterTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Reset initial styles
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(modalRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 35,
        rotateX: 4,
        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      if (scanlineRef.current) {
        gsap.set(scanlineRef.current, { top: "-10%", opacity: 0 });
      }
      if (scanGlowRef.current) {
        gsap.set(scanGlowRef.current, { top: "-10%", opacity: 0 });
      }

      // 1. Backdrop Fade & Blur
      enterTl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // 2. Modal Folio Expansion
      enterTl.to(
        modalRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // 3. Corner Architectural Reticles Snap-In
      const corners = [
        { el: cornerTLRef.current, x: 8, y: 8 },
        { el: cornerTRRef.current, x: -8, y: 8 },
        { el: cornerBLRef.current, x: 8, y: -8 },
        { el: cornerBRRef.current, x: -8, y: -8 },
      ];

      corners.forEach(({ el, x, y }) => {
        if (el) {
          enterTl.fromTo(
            el,
            { opacity: 0, x, y, scale: 0.7 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
            "-=0.55"
          );
        }
      });

      // 4. Header Details slide down
      if (headerRef.current) {
        enterTl.fromTo(
          headerRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          "-=0.45"
        );
      }

      // 5. Blueprint Image Container Reveal & Micro-settle
      if (previewRef.current && imageRef.current) {
        enterTl.fromTo(
          previewRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        );

        enterTl.fromTo(
          imageRef.current,
          { scale: 1.08, filter: "contrast(1.15) brightness(0.9)" },
          { scale: 1, filter: "contrast(1) brightness(1)", duration: 1.2, ease: "power2.out" },
          "-=0.5"
        );
      }

      // 6. LiDAR Scanline Sweep across blueprint visual
      if (scanlineRef.current && scanGlowRef.current) {
        enterTl.fromTo(
          scanlineRef.current,
          { top: "-5%", opacity: 0 },
          { top: "105%", opacity: 1, duration: 1.25, ease: "power2.inOut" },
          "-=1.1"
        );

        enterTl.fromTo(
          scanGlowRef.current,
          { top: "-15%", opacity: 0 },
          { top: "95%", opacity: 0.75, duration: 1.25, ease: "power2.inOut" },
          "-=1.25"
        );
      }

      // 7. Blueprint HUD telemetries
      enterTl.fromTo(
        ".blueprint-hud",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
        "-=0.8"
      );

      // 8. Staggered Specification Cards cascade
      if (specsRef.current) {
        const specCards = specsRef.current.querySelectorAll(".spec-row-item");
        enterTl.fromTo(
          specCards,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.045, ease: "power3.out" },
          "-=0.75"
        );
      }

      // 9. Action Buttons & Gold Shimmer Sweep
      if (actionsRef.current) {
        enterTl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (shimmerRef.current) {
        enterTl.fromTo(
          shimmerRef.current,
          { x: "-120%" },
          { x: "220%", duration: 1.1, ease: "power2.inOut" },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, [displayUnit]);

  if (!displayUnit) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 md:p-8 backdrop-blur-2xl"
    >
      {/* Subtle CAD Blueprint Grid Background Watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(rgba(197, 168, 128, 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(197, 168, 128, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 168, 128, 0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px, 64px 64px, 64px 64px",
        }}
      />

      {/* Main Architectural Folio Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#C5A880]/40 bg-[#160D08]/98 p-6 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(197,168,128,0.15)] space-y-8 will-change-transform"
      >
        {/* Architectural Corner Reticles / Precision Brackets */}
        <div
          ref={cornerTLRef}
          className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#DFBA73] rounded-tl-sm opacity-90 shadow-[0_0_10px_rgba(223,186,115,0.4)]"
        />
        <div
          ref={cornerTRRef}
          className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#DFBA73] rounded-tr-sm opacity-90 shadow-[0_0_10px_rgba(223,186,115,0.4)]"
        />
        <div
          ref={cornerBLRef}
          className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#DFBA73] rounded-bl-sm opacity-90 shadow-[0_0_10px_rgba(223,186,115,0.4)]"
        />
        <div
          ref={cornerBRRef}
          className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#DFBA73] rounded-br-sm opacity-90 shadow-[0_0_10px_rgba(223,186,115,0.4)]"
        />

        {/* Modal Header */}
        <div ref={headerRef} className="flex items-start justify-between border-b border-[#341F14] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
              <Sparkles className="h-3 w-3 text-[#DFBA73] animate-pulse" />
              <span>Architectural Blueprint Folio • Fraction {displayUnit.fraction}</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#F5EFEB] tracking-wide">
              {displayUnit.typology} — {displayUnit.tower}
            </h3>
            <div className="flex items-center space-x-3 text-xs text-[#A8988B] tracking-wide">
              <span>{displayUnit.floorLabel}</span>
              <span className="h-1 w-1 rounded-full bg-[#C5A880]/60" />
              <span>{displayUnit.side}</span>
              <span className="h-1 w-1 rounded-full bg-[#C5A880]/60" />
              <span className="text-[#C5A880] flex items-center space-x-1">
                <Compass className="h-3 w-3 inline" />
                <span>Sector 78 Sky Residences</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => handleClose()}
            aria-label="Close Floorplan Modal"
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-transparent border border-[#c2a180] text-[#c2a180] hover:bg-[#9e6443] hover:border-[#9e6443] hover:text-white transition-all duration-300 active:scale-95 flex-shrink-0"
          >
            <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Blueprint Visual & Spec Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Schematic Preview Column */}
          <div className="lg:col-span-7">
            <div
              ref={previewRef}
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#C5A880]/40 bg-[#20130C] shadow-[0_15px_40px_rgba(0,0,0,0.8)] group select-none"
            >
              {/* Architectural Drafting Grid Overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(197, 168, 128, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 168, 128, 0.15) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Luminous LiDAR Laser Sweep Beam */}
              <div
                ref={scanGlowRef}
                className="pointer-events-none absolute left-0 right-0 h-16 bg-gradient-to-b from-[#DFBA73]/20 via-[#DFBA73]/10 to-transparent z-20 blur-md"
              />
              <div
                ref={scanlineRef}
                className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DFBA73] to-transparent shadow-[0_0_16px_2px_#DFBA73] z-20"
              />

              {/* Floorplan Image */}
              <Image
                ref={imageRef}
                src={displayUnit.floorplanImage}
                alt={`${displayUnit.typology} Floorplan Layout`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Architectural HUD Overlay Badges */}
              <div className="blueprint-hud absolute top-4 left-4 z-20 flex items-center space-x-2 rounded-full bg-[#160D08]/85 backdrop-blur-md px-3 py-1 border border-[#C5A880]/30 text-[10px] tracking-widest text-[#E7CFAD]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>CAD REF: FR-{displayUnit.fraction}</span>
              </div>

              <div className="blueprint-hud absolute top-4 right-4 z-20 flex items-center space-x-1.5 rounded-full bg-[#160D08]/85 backdrop-blur-md px-3 py-1 border border-[#C5A880]/30 text-[10px] tracking-wider text-[#A8988B]">
                <Ruler className="h-3 w-3 text-[#C5A880]" />
                <span>SCALE 1:100 ARCH</span>
              </div>

              {/* Bottom Gradient Shade & Dimensions Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/25 pointer-events-none" />
              <div className="blueprint-hud absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs tracking-wider text-[#E7CFAD] bg-[#160D08]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#C5A880]/25">
                <span className="font-medium flex items-center space-x-1.5">
                  <Maximize2 className="h-3.5 w-3.5 text-[#DFBA73]" />
                  <span>Super Area: {displayUnit.areaSqFt.toLocaleString()} Sq.Ft</span>
                </span>
                <span className="text-[#A8988B] border-l border-[#341F14] pl-3">
                  {displayUnit.areaSqM} Sq.M
                </span>
              </div>
            </div>
          </div>

          {/* Specifications Breakdown Column */}
          <div className="lg:col-span-5 space-y-6">
            <div ref={specsRef} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                  Space Breakdown & Dimensions
                </p>
                <span className="text-[10px] tracking-wider text-[#A8988B] flex items-center space-x-1">
                  <ShieldCheck className="h-3 w-3 text-[#C5A880]" />
                  <span>RERA Verified</span>
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="spec-row-item flex justify-between items-center p-3 rounded-xl bg-[#20130C]/90 border border-[#341F14] hover:border-[#C5A880]/50 transition-colors shadow-sm">
                  <span className="text-[#A8988B]">Living & Dining:</span>
                  <span className="font-medium text-[#F5EFEB] tracking-wide">
                    {displayUnit.specs.livingDining}
                  </span>
                </div>

                <div className="spec-row-item flex justify-between items-center p-3 rounded-xl bg-[#20130C]/90 border border-[#341F14] hover:border-[#C5A880]/50 transition-colors shadow-sm">
                  <span className="text-[#A8988B]">Master Suite:</span>
                  <span className="font-medium text-[#F5EFEB] tracking-wide">
                    {displayUnit.specs.masterBedroom}
                  </span>
                </div>

                <div className="spec-row-item flex justify-between items-center p-3 rounded-xl bg-[#20130C]/90 border border-[#341F14] hover:border-[#C5A880]/50 transition-colors shadow-sm">
                  <span className="text-[#A8988B]">Balcony / Skydeck:</span>
                  <span className="font-medium text-[#F5EFEB] tracking-wide">
                    {displayUnit.specs.balconies}
                  </span>
                </div>

                <div className="spec-row-item flex justify-between items-center p-3 rounded-xl bg-[#20130C]/90 border border-[#341F14] hover:border-[#C5A880]/50 transition-colors shadow-sm">
                  <span className="text-[#A8988B]">Dedicated Parking:</span>
                  <span className="font-medium text-[#F5EFEB] tracking-wide">
                    {displayUnit.parking}
                  </span>
                </div>

                <div className="spec-row-item flex justify-between items-center p-3 rounded-xl bg-[#20130C]/90 border border-[#341F14] hover:border-[#C5A880]/50 transition-colors shadow-sm">
                  <span className="text-[#A8988B]">Ceiling Clearance:</span>
                  <span className="font-semibold text-[#DFBA73] tracking-wide">
                    {displayUnit.specs.ceilingHeight}
                  </span>
                </div>

                <div className="spec-row-item flex justify-between items-center p-3 rounded-xl bg-[#20130C]/90 border border-[#341F14] hover:border-[#C5A880]/50 transition-colors shadow-sm">
                  <span className="text-[#A8988B]">Staff Suite:</span>
                  <span className="font-medium text-[#F5EFEB] tracking-wide">
                    {displayUnit.specs.servantRoom ? "Included with Bath" : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons matching class="cta-link inquire w-inline-block" */}
            <div ref={actionsRef} className="space-y-3 pt-2">
              <button
                onClick={() => {
                  handleClose(() => onInquireUnit(displayUnit));
                }}
                className="group relative w-full flex items-center justify-between px-6 py-3 rounded-full bg-[#20130C] border border-[#c2a180]/40 text-[#c2a180] hover:text-white hover:border-[#9e6443] transition-all duration-300 cursor-pointer shadow-md"
              >
                <span className="font-sans text-xs tracking-wider uppercase font-medium">
                  Make An Appointment • Fraction {displayUnit.fraction}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9e6443] group-hover:bg-[#c2a180] transition-colors duration-300 flex-shrink-0">
                  <Image
                    src="/images/seta-cta.svg"
                    alt=""
                    width={10}
                    height={9}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="group w-full flex items-center justify-between px-6 py-3 rounded-full bg-[#20130C]/60 border border-[#c2a180]/30 text-[#A8988B] hover:text-white hover:border-[#c2a180] transition-all duration-300 cursor-pointer"
              >
                <span className="font-sans text-xs tracking-wider uppercase font-medium">
                  Download Blueprint Schematic
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#573024] group-hover:bg-[#9e6443] transition-colors duration-300 flex-shrink-0">
                  <Image
                    src="/images/seta-cta.svg"
                    alt=""
                    width={10}
                    height={9}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
