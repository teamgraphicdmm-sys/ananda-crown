"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize2, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { RESIDENCE_SPACES, PROJECT_DETAILS, ResidenceHighlight } from "@/data/projectData";

export default function ResidencesSection() {
  const [activeSpace, setActiveSpace] = useState<ResidenceHighlight>(RESIDENCE_SPACES[0]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section
      id="residences"
      className="relative w-full bg-[#1A0F0A] py-28 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Architectural Specs Sidebar & Section Title matching One24 */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-12 lg:border-r lg:border-[#C5A880]/20 lg:pr-12">
            {/* Top Specs Table */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#341F14] pb-3 text-xs tracking-[0.2em] uppercase">
                <span className="text-[#A8988B]">Location</span>
                <span className="font-medium text-[#F5EFEB]">Sector 78, Mohali</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#341F14] pb-3 text-xs tracking-[0.2em] uppercase">
                <span className="text-[#A8988B]">Typologies</span>
                <span className="font-medium text-[#F5EFEB]">3, 4 & 5 BHK Penthouse</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#341F14] pb-3 text-xs tracking-[0.2em] uppercase">
                <span className="text-[#A8988B]">Possession</span>
                <span className="font-medium text-[#F5EFEB]">2026 - 2027</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#341F14] pb-3 text-xs tracking-[0.2em] uppercase">
                <span className="text-[#A8988B]">Architecture</span>
                <span className="font-medium text-[#F5EFEB]">G+30 Towers (IE Design)</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#341F14] pb-3 text-xs tracking-[0.2em] uppercase">
                <span className="text-[#A8988B]">Ceiling Height</span>
                <span className="font-medium text-[#F5EFEB]">11.5 Ft. Clear</span>
              </div>
            </div>

            {/* Title & Call to Action */}
            <div className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
                  Residences
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#F5EFEB] leading-[1.1]">
                  An Oasis <br />
                  <span className="italic text-[#E7CFAD]">of Grandeur</span>
                </h2>
              </div>

              <p className="text-xs md:text-sm font-light text-[#A8988B] leading-relaxed">
                Every residence at Ananda Crown is an architectural masterwork, tailored with expansive wrap skydecks, imported marble, and bespoke finishes.
              </p>

              {/* Action Button to Availability Table */}
              <Link
                href="#availability"
                className="group inline-flex items-center space-x-3 rounded-full border border-[#C5A880]/50 hover:border-[#C5A880] bg-[#24150F] hover:bg-[#C5A880] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase text-[#F5EFEB] hover:text-[#160D08] transition-all duration-300 shadow-lg"
              >
                <span>Available Residences</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A880] text-[#160D08] group-hover:bg-[#160D08] group-hover:text-[#C5A880] transition-colors">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Space Showcase with Category Tabs & Zoom */}
          <div className="lg:col-span-8 space-y-8">
            {/* Space Navigation Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              {RESIDENCE_SPACES.map((space) => (
                <button
                  key={space.id}
                  onClick={() => setActiveSpace(space)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeSpace.id === space.id
                      ? "bg-[#C5A880] text-[#160D08] font-semibold shadow-md shadow-[#C5A880]/20"
                      : "bg-[#24150F] text-[#A8988B] hover:text-[#F5EFEB] hover:bg-[#341F14]"
                  }`}
                >
                  {space.tag}
                </button>
              ))}
            </div>

            {/* Active Space Hero Card */}
            <div className="relative group overflow-hidden rounded-2xl border border-[#C5A880]/25 bg-[#20130C] shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={activeSpace.image}
                  alt={activeSpace.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-transparent to-black/20" />

                {/* Full-Screen Zoom Button */}
                <button
                  onClick={() => setLightboxImage(activeSpace.image)}
                  className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#160D08]/70 backdrop-blur-md border border-[#C5A880]/40 text-[#E7CFAD] hover:text-white hover:scale-110 transition-all"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block rounded-full bg-[#C5A880]/90 px-3 py-1 text-[9px] font-semibold tracking-[0.2em] uppercase text-[#160D08] mb-2">
                    {activeSpace.tag}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#F5EFEB]">
                    {activeSpace.title}
                  </h3>
                </div>
              </div>

              {/* Space Details & Features */}
              <div className="p-8 space-y-6">
                <p className="text-sm md:text-base font-light text-[#E8DDD2]/90 leading-relaxed">
                  {activeSpace.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#341F14]">
                  {activeSpace.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2.5 text-xs text-[#A8988B]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Row */}
            <div className="grid grid-cols-5 gap-3 pt-2">
              {RESIDENCE_SPACES.map((space) => (
                <button
                  key={space.id}
                  onClick={() => setActiveSpace(space)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition-all duration-300 ${
                    activeSpace.id === space.id
                      ? "border-[#C5A880] ring-2 ring-[#C5A880]/50 scale-105"
                      : "border-[#341F14] opacity-60 hover:opacity-100 hover:border-[#C5A880]/50"
                  }`}
                >
                  <Image
                    src={space.image}
                    alt={space.tag}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-1 left-1 right-1 text-[8px] uppercase tracking-wider text-[#F5EFEB] truncate text-center font-medium">
                    {space.tag.split("&")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/50 text-white hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#C5A880]/30">
            <Image
              src={lightboxImage}
              alt="Ananda Crown Residence Full View"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
