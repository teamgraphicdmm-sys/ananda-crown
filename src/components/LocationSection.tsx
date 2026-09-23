"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, X, ExternalLink } from "lucide-react";
import { NEARBY_LANDMARKS, PROJECT_DETAILS } from "@/data/projectData";

export default function LocationSection() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const stories = [
    {
      num: "01",
      tag: "Nature & Sanctuary",
      title: "Escape to Nature's Sanctuary",
      description:
        "Our luxurious residences in Sector 78 Mohali are nestled along open green corridors and master-planned parks. Away from chaotic urban noise yet centrally positioned, offering unobstructed panoramic views of the sunrise and Shivalik horizons.",
    },
    {
      num: "02",
      tag: "Civic Infrastructure",
      title: "On Your Doorstep",
      description:
        "Surrounded by the Tricity's most distinguished institutions: 5 minutes to Sohana Multispecialty Hospital and I.S. Bindra PCA Stadium, 8 minutes to Fortis Healthcare, and close proximity to premier educational campuses like Yadavindra Public School (YPS) and Learning Paths.",
    },
    {
      num: "03",
      tag: "Global Transit",
      title: "Unrivaled Connectivity",
      description:
        "Direct arterial access to PR-7 / Airport Road places Shaheed Bhagat Singh International Airport (IXC) just 15 minutes away. Rapid highway corridors link you effortlessly to IT City, Aerocity, Chandigarh Sector 17, and the Himalayan foothills.",
    },
  ];

  return (
    <section
      id="location"
      className="relative w-full bg-[#160D08] py-24 md:py-32 overflow-hidden border-t border-[#C5A880]/15"
    >
      {/* Moving Marquee Ticker matching One24 layout */}
      <div className="w-full overflow-hidden border-y border-[#C5A880]/20 bg-[#20130C]/60 py-4 mb-20">
        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap text-xs md:text-sm tracking-[0.3em] uppercase text-[#E7CFAD]">
          <span>In the Heart of Sector 78 Mohali</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>15 Mins to International Airport (IXC)</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>5 Mins to PCA Stadium & Sohana Hospital</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>600 Ft Grand Boulevard Frontage</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>Punjab RERA Verified: {PROJECT_DETAILS.rera.number}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>In the Heart of Sector 78 Mohali</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>15 Mins to International Airport (IXC)</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>5 Mins to PCA Stadium & Sohana Hospital</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>600 Ft Grand Boulevard Frontage</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          <span>Punjab RERA Verified: {PROJECT_DETAILS.rera.number}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
            <MapPin className="h-4 w-4 text-[#C5A880]" />
            <span>Strategic Location</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5EFEB] leading-[1.1]">
            Sector 78, SAS Nagar <br />
            <span className="italic text-[#E7CFAD]">The Sovereign Address</span>
          </h2>
        </div>

        {/* 3-Part Interactive Location Stories Grid matching One24 n1, n2, n3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3-Story Interactive Tabs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex space-x-2 border-b border-[#341F14] pb-3">
              {stories.map((story, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx + 1)}
                  className={`px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeTab === idx + 1
                      ? "bg-[#C5A880] text-[#160D08] font-semibold"
                      : "text-[#A8988B] hover:text-[#F5EFEB] hover:bg-[#20130C]"
                  }`}
                >
                  {story.num} • {story.tag}
                </button>
              ))}
            </div>

            <div className="space-y-6 pt-4 min-h-[220px]">
              <span className="font-mono text-sm text-[#C5A880]">
                {stories[activeTab - 1].num} / 03
              </span>
              <h3 className="font-serif text-2xl md:text-4xl font-light text-[#F5EFEB]">
                {stories[activeTab - 1].title}
              </h3>
              <p className="text-sm md:text-base font-light text-[#E8DDD2]/90 leading-relaxed">
                {stories[activeTab - 1].description}
              </p>
            </div>

            {/* See Location CTA matching One24 seta-cta */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setMapModalOpen(true)}
                className="group inline-flex items-center space-x-3 rounded-full border border-[#C5A880]/50 hover:border-[#C5A880] bg-[#20130C] hover:bg-[#C5A880] px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase text-[#F5EFEB] hover:text-[#160D08] transition-all duration-300 shadow-xl"
              >
                <span>Explore Location Map</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A880] text-[#160D08] group-hover:bg-[#160D08] group-hover:text-[#C5A880] transition-colors">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>

              <a
                href={PROJECT_DETAILS.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.18em] uppercase text-[#C5A880] hover:text-[#E7CFAD] transition-colors py-3"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Location Visual Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#C5A880]/30 shadow-2xl group">
              <Image
                src="/images/wait-is-over.webp"
                alt="Sector 78 Mohali Location"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-transparent to-black/30" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#E7CFAD]">
                <div className="space-y-1">
                  <p className="font-serif text-lg text-white font-light">
                    Sector 78, SAS Nagar
                  </p>
                  <p className="text-[10px] text-[#C5A880]">
                    Tricity Chandigarh Capital Region
                  </p>
                </div>
                <button
                  onClick={() => setMapModalOpen(true)}
                  className="rounded-full bg-[#C5A880] text-[#160D08] px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] hover:bg-white transition-colors"
                >
                  View Distances
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map & Distance Dossier Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#C5A880]/40 bg-[#160D08] p-6 md:p-10 shadow-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-[#341F14] pb-4">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880]">
                  Location Dossier
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[#F5EFEB]">
                  Sector 78 Mohali Proximity & Transit
                </h3>
              </div>
              <button
                onClick={() => setMapModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/30 text-white hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Landmark Distances Grid */}
            <div className="space-y-4">
              <p className="text-xs tracking-[0.2em] uppercase text-[#A8988B]">
                Key Landmarks & Drive Times
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {NEARBY_LANDMARKS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl border border-[#341F14] bg-[#20130C]/60"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#F5EFEB]">
                        {item.name}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A880]">
                        {item.category} • {item.distance}
                      </span>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#341F14] text-[#E7CFAD]">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#341F14]">
              <span className="text-xs text-[#A8988B]">
                Address: {PROJECT_DETAILS.location.address}
              </span>
              <a
                href={PROJECT_DETAILS.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#C5A880] px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#160D08] hover:bg-[#E7CFAD] transition-colors inline-flex items-center space-x-2"
              >
                <span>Navigate in Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
