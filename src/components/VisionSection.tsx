"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECT_DETAILS } from "@/data/projectData";

export default function VisionSection() {
  const [activeVisual, setActiveVisual] = useState<"crown" | "mohali">("crown");

  return (
    <section
      id="vision"
      className="relative w-full bg-[#160D08] py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Header: Tag & Interactive Display Headline */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
              Elevate Your Lifestyle
            </h2>
          </div>

          <div className="max-w-5xl">
            <p className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5EFEB] leading-[1.15] tracking-tight">
              Our vision for luxury living at{" "}
              <span
                onMouseEnter={() => setActiveVisual("crown")}
                onClick={() => setActiveVisual("crown")}
                className={`cursor-pointer transition-all duration-300 border-b pb-0.5 ${
                  activeVisual === "crown"
                    ? "text-[#E7CFAD] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.3)]"
                    : "text-[#C5A880] border-[#C5A880]/40 hover:border-[#C5A880]"
                }`}
              >
                Ananda Crown
              </span>{" "}
              is to create a one-of-a-kind iconic development that combines
              contemporary high-rise architecture with the lush green serenity of{" "}
              <span
                onMouseEnter={() => setActiveVisual("mohali")}
                onClick={() => setActiveVisual("mohali")}
                className={`cursor-pointer transition-all duration-300 border-b pb-0.5 ${
                  activeVisual === "mohali"
                    ? "text-[#E7CFAD] border-[#C5A880] shadow-[0_4px_20px_rgba(197,168,128,0.3)]"
                    : "text-[#C5A880] border-[#C5A880]/40 hover:border-[#C5A880]"
                }`}
              >
                Sector 78, Mohali
              </span>
              .
            </p>
          </div>
        </div>

        {/* Bottom Section: Dual Image Interactive Showcase & Editorial Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Dual Visual Showcase matching One24's split reveal */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#C5A880]/25 shadow-2xl bg-[#20130C]">
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
                  className={`px-3 py-1 rounded-full transition-all ${
                    activeVisual === "crown"
                      ? "bg-[#C5A880] text-[#160D08] font-semibold"
                      : "text-[#F5EFEB]/70 hover:text-[#F5EFEB]"
                  }`}
                >
                  Arrival
                </button>
                <button
                  onClick={() => setActiveVisual("mohali")}
                  className={`px-3 py-1 rounded-full transition-all ${
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
          <div className="lg:col-span-5 space-y-8">
            <p className="text-sm md:text-base font-light text-[#E8DDD2]/90 leading-relaxed tracking-wide">
              Featuring straight architectural lines, panoramic cantilevered skydecks, and bespoke curated amenities, Ananda Crown sets an unprecedented benchmark for ultra-luxury residential living in Mohali.
            </p>

            <p className="text-sm md:text-base font-light text-[#A8988B] leading-relaxed">
              Conceived with a generous 600-foot frontage and an exceptional 11.5-foot clear ceiling height, every palace is designed to offer maximum natural illumination, cross-ventilation, and privacy.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#341F14]">
              <div className="space-y-1">
                <span className="font-serif text-3xl font-light text-[#C5A880]">
                  600 Ft.
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  Grand Boulevard Frontage
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-3xl font-light text-[#C5A880]">
                  11.5 Ft.
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  Clear Ceiling Height
                </p>
              </div>

              <div className="space-y-1 pt-3">
                <span className="font-serif text-3xl font-light text-[#C5A880]">
                  G+30
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  High-Rise Towers
                </p>
              </div>

              <div className="space-y-1 pt-3">
                <span className="font-serif text-3xl font-light text-[#C5A880]">
                  20+
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8988B]">
                  Bespoke World Amenities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
      </div>
    </section>
  );
}
