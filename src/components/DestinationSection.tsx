"use client";

import React from "react";
import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";

export default function DestinationSection() {
  return (
    <section
      id="destination"
      className="relative w-full min-h-[90vh] flex flex-col justify-between py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#C5A880]/15"
    >
      {/* Background Visual Layer with Luxury Warm Espresso Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/crown-arrived.webp"
          alt="Mohali Urban Royalty"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-[#160D08]/80 to-[#160D08]/90" />
        <div className="absolute inset-0 bg-[#160D08]/60 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Top Tag & Big Title matching One24 'the island' section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
            <Compass className="h-4 w-4 text-[#C5A880]" />
            <span>The Destination</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F5EFEB] leading-[1.05] tracking-tight max-w-5xl">
            Experience the Best of <br />
            <span className="italic text-[#E7CFAD]">Urban Royalty in Mohali</span>
          </h2>
        </div>

        {/* Narrative Split & Key Attributes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-6">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base md:text-xl font-light text-[#E8DDD2] leading-relaxed tracking-wide">
              Living at Ananda Crown offers a rare harmony: the wide, tree-lined boulevards and planned geometric calm of the Chandigarh Capital Region, coupled with Mohali&apos;s surging economic pulse and international stature.
            </p>

            <p className="text-sm md:text-base font-light text-[#A8988B] leading-relaxed">
              Situated in Sector 78, residents find themselves moments away from iconic landmarks like the I.S. Bindra PCA Stadium, cutting-edge healthcare institutions like Fortis and Sohana Hospital, and the rapid transit corridors linking to Shaheed Bhagat Singh International Airport.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#20130C]/80 backdrop-blur-md rounded-2xl border border-[#C5A880]/30 p-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Architectural Supremacy</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1 border-b border-[#341F14] pb-4">
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880]">
                  600 Ft.
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  Grand Avenue Frontage
                </p>
              </div>

              <div className="space-y-1 border-b border-[#341F14] pb-4">
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880]">
                  11.5 Ft.
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  Slab-to-Slab Ceilings
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880]">
                  15 Mins
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  To Intl. Airport (IXC)
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <span className="font-serif text-3xl md:text-4xl text-[#C5A880]">
                  G+30
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  Iconic Sky Towers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
