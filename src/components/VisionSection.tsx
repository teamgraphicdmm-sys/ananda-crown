"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { PROJECT_DETAILS } from "@/data/projectData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const [activeVisual, setActiveVisual] = useState<"crown" | "mohali">("crown");
  
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  
  const metric600Ref = useRef<HTMLSpanElement>(null);
  const metric11Ref = useRef<HTMLSpanElement>(null);
  const metric30Ref = useRef<HTMLSpanElement>(null);
  const metric20Ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // 1. Gold dot + tag
    const tlTag = gsap.timeline({
      scrollTrigger: {
        trigger: ".tag-container",
        start: "top 80%",
        once: true
      }
    });
    tlTag.from(".tag-dot", { scale: 0, duration: 0.6, ease: "back.out(1.7)" })
         .from(".tag-text", { x: -20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
         
    // 2. Headline paragraph
    if (headlineRef.current) {
       const words = headlineRef.current.querySelectorAll(".headline-word");
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: headlineRef.current,
           start: "top 75%",
           once: true
         }
       });
       
       tl.from(words, {
         y: 40,
         opacity: 0,
         stagger: 0.03,
         duration: 0.8,
         ease: "power3.out"
       });
       
       // golden glow pulse on interactive spans
       tl.to(".interactive-span", {
         textShadow: "0px 0px 12px rgba(197,168,128,0.6)",
         duration: 0.5,
         yoyo: true,
         repeat: 1,
         ease: "power1.inOut"
       }, "+=0.2");
    }

    // 3. Dual image showcase container & 4. Toggle pills
    const tlImage = gsap.timeline({
      scrollTrigger: {
        trigger: ".image-showcase",
        start: "top 70%",
        once: true
      }
    });
    tlImage.from(".image-showcase", {
      clipPath: "inset(8% 8% 8% 8%)",
      duration: 1.2,
      ease: "power3.inOut"
    })
    .from(".toggle-pill", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)",
      duration: 0.6
    }, "-=0.4");

    // 5. Editorial paragraphs
    gsap.from(".editorial-p", {
      scrollTrigger: {
        trigger: ".editorial-container",
        start: "top 70%",
        once: true
      },
      y: 25,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });

    // 6. & 7. Metrics
    const metricsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".metrics-grid",
        start: "top 65%",
        once: true
      }
    });

    const proxy = { m600: 0, m11: 0, m30: 0, m20: 0 };
    
    metricsTl.to(proxy, { 
      m600: 600, 
      duration: 1.5, 
      ease: "power2.out", 
      onUpdate: () => { if (metric600Ref.current) metric600Ref.current.textContent = `${Math.round(proxy.m600)} Ft.`; } 
    }, 0)
    .to(proxy, { 
      m11: 11.5, 
      duration: 1.5, 
      ease: "power2.out", 
      onUpdate: () => { if (metric11Ref.current) metric11Ref.current.textContent = `${proxy.m11.toFixed(1)} Ft.`; } 
    }, 0.2)
    .to(proxy, { 
      m30: 30, 
      duration: 1.5, 
      ease: "power2.out", 
      onUpdate: () => { if (metric30Ref.current) metric30Ref.current.textContent = `G+${Math.round(proxy.m30)}`; } 
    }, 0.4)
    .to(proxy, { 
      m20: 20, 
      duration: 1.5, 
      ease: "power2.out", 
      onUpdate: () => { if (metric20Ref.current) metric20Ref.current.textContent = `${Math.round(proxy.m20)}+`; } 
    }, 0.6);
    
    metricsTl.from(".metric-label", {
      y: 10,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out"
    }, 0.5);

    // 8. Bottom hairline divider
    gsap.from(".bottom-divider", {
      scrollTrigger: {
        trigger: ".bottom-divider",
        start: "bottom 95%",
        once: true
      },
      scaleX: 0,
      transformOrigin: "center",
      duration: 1,
      ease: "power2.inOut"
    });

  }, { scope: sectionRef });

  const renderWords = (text: string) => {
    return text.split(" ").map((word, i) => {
      if (!word) return null;
      return (
        <span key={i} className="headline-word inline-block mr-[0.25em]">
          {word}
        </span>
      );
    });
  };

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full bg-[#160D08] py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Header: Tag & Interactive Display Headline */}
        <div className="space-y-6">
          <div className="tag-container flex items-center space-x-3">
            <span className="tag-dot h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
            <h2 className="tag-text text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
              Elevate Your Lifestyle
            </h2>
          </div>

          <div className="max-w-5xl">
            <p ref={headlineRef} className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5EFEB] leading-[1.15] tracking-tight flex flex-wrap">
              {renderWords("Our vision for luxury living at")}
              <span className="headline-word inline-block mr-[0.25em]">
                <span
                  onMouseEnter={() => setActiveVisual("crown")}
                  onClick={() => setActiveVisual("crown")}
                  className={`interactive-span cursor-pointer transition-all duration-300 border-b pb-0.5 ${
                    activeVisual === "crown"
                      ? "text-[#E7CFAD] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.3)]"
                      : "text-[#C5A880] border-[#C5A880]/40 hover:border-[#C5A880]"
                  }`}
                >
                  Ananda Crown
                </span>
              </span>
              {renderWords("is to create a one-of-a-kind iconic development that combines contemporary high-rise architecture with the lush green serenity of")}
              <span className="headline-word inline-block">
                <span
                  onMouseEnter={() => setActiveVisual("mohali")}
                  onClick={() => setActiveVisual("mohali")}
                  className={`interactive-span cursor-pointer transition-all duration-300 border-b pb-0.5 ${
                    activeVisual === "mohali"
                      ? "text-[#E7CFAD] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.3)]"
                      : "text-[#C5A880] border-[#C5A880]/40 hover:border-[#C5A880]"
                  }`}
                >
                  Sector 78, Mohali
                </span>
              </span>
              <span className="headline-word inline-block">.</span>
            </p>
          </div>
        </div>

        {/* Bottom Section: Dual Image Interactive Showcase & Editorial Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Dual Visual Showcase matching One24's split reveal */}
          <div className="lg:col-span-7">
            <div className="image-showcase relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#C5A880]/25 shadow-2xl bg-[#20130C]">
              {/* Crown Visual */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeVisual === "crown" ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src="/images/wait-is-over.webp"
                  alt="Ananda Crown Grand Porte-Cochere"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#E7CFAD]">
                  <span>Sculptural Arrival Porte-Cochère</span>
                  <span>Architecture by IE Design</span>
                </div>
              </div>

              {/* Mohali Landscape Visual */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeVisual === "mohali" ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src="/images/crown-arrived.webp"
                  alt="Lush Landscaped Arrival Avenue"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#E7CFAD]">
                  <span>600 Ft Landscaped Grand Frontage</span>
                  <span>Landscape by Oracles</span>
                </div>
              </div>

              {/* Interactive toggle pills */}
              <div className="absolute top-6 right-6 z-20 flex space-x-2 bg-[#160D08]/70 backdrop-blur-md p-1 rounded-full border border-[#C5A880]/30 text-[10px] uppercase tracking-[0.15em]">
                <button
                  onClick={() => setActiveVisual("crown")}
                  className={`toggle-pill px-3 py-1 rounded-full transition-all ${
                    activeVisual === "crown"
                      ? "bg-[#C5A880] text-[#160D08] font-semibold"
                      : "text-[#F5EFEB]/70 hover:text-[#F5EFEB]"
                  }`}
                >
                  Arrival
                </button>
                <button
                  onClick={() => setActiveVisual("mohali")}
                  className={`toggle-pill px-3 py-1 rounded-full transition-all ${
                    activeVisual === "mohali"
                      ? "bg-[#C5A880] text-[#160D08] font-semibold"
                      : "text-[#F5EFEB]/70 hover:text-[#F5EFEB]"
                  }`}
                >
                  Promenade
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Content & Architectural Pillars */}
          <div className="editorial-container lg:col-span-5 space-y-8">
            <p className="editorial-p text-sm md:text-base font-light text-[#E8DDD2]/90 leading-relaxed tracking-wide">
              Featuring straight architectural lines, panoramic cantilevered skydecks, and bespoke curated amenities, Ananda Crown sets an unprecedented benchmark for ultra-luxury residential living in Mohali.
            </p>

            <p className="editorial-p text-sm md:text-base font-light text-[#A8988B] leading-relaxed">
              Conceived with a generous 600-foot frontage and an exceptional 11.5-foot clear ceiling height, every palace is designed to offer maximum natural illumination, cross-ventilation, and privacy.
            </p>

            {/* Metrics Grid */}
            <div className="metrics-grid grid grid-cols-2 gap-4 pt-4 border-t border-[#341F14]">
              <div className="space-y-1">
                <span ref={metric600Ref} className="font-serif text-3xl font-light text-[#C5A880]">
                  0 Ft.
                </span>
                <p className="metric-label text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  Grand Boulevard Frontage
                </p>
              </div>

              <div className="space-y-1">
                <span ref={metric11Ref} className="font-serif text-3xl font-light text-[#C5A880]">
                  0.0 Ft.
                </span>
                <p className="metric-label text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  Clear Ceiling Height
                </p>
              </div>

              <div className="space-y-1 pt-3">
                <span ref={metric30Ref} className="font-serif text-3xl font-light text-[#C5A880]">
                  G+0
                </span>
                <p className="metric-label text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  High-Rise Towers
                </p>
              </div>

              <div className="space-y-1 pt-3">
                <span ref={metric20Ref} className="font-serif text-3xl font-light text-[#C5A880]">
                  0+
                </span>
                <p className="metric-label text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  Bespoke World Amenities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="bottom-divider h-[1px] w-full bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
      </div>
    </section>
  );
}
