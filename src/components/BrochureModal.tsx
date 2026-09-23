"use client";

import React from "react";
import Image from "next/image";
import { X, Download, FileText, CheckCircle2, Phone, Sparkles } from "lucide-react";
import { PROJECT_DETAILS, LUXURY_AMENITIES } from "@/data/projectData";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquire: () => void;
}

export default function BrochureModal({
  isOpen,
  onClose,
  onOpenInquire,
}: BrochureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 md:p-8 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#C5A880]/40 bg-[#160D08] p-6 md:p-10 shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#341F14] pb-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#C5A880]/40">
              <Image
                src="/images/logo.jpg"
                alt="Ananda Crown Crest"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880]">
                Official Project Dossier
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#F5EFEB]">
                Ananda Crown Brochure & Specifications
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/30 text-white hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Brochure Highlights Preview */}
        <div className="space-y-6">
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#C5A880]/30">
            <Image
              src="/images/crown-arrived.webp"
              alt="Ananda Crown Portfolio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-transparent to-black/30" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs tracking-widest uppercase text-[#E7CFAD]">
              <span>Punjab RERA Verified: {PROJECT_DETAILS.rera.number}</span>
              <span>Sector 78, Mohali</span>
            </div>
          </div>

          {/* Key Executive Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-xl border border-[#341F14] bg-[#20130C]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                Iconic High-Rise
              </span>
              <p className="font-serif text-xl font-light text-[#F5EFEB] mt-1">
                G+30 Elevation
              </p>
              <p className="text-xs text-[#A8988B] mt-2">
                Designed by IE Design & HBS Studio with 600 ft boulevard frontage.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#341F14] bg-[#20130C]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                Palatial Volumes
              </span>
              <p className="font-serif text-xl font-light text-[#F5EFEB] mt-1">
                11.5 Ft. Ceilings
              </p>
              <p className="text-xs text-[#A8988B] mt-2">
                Unmatched slab-to-slab clear heights with double acoustic glazing.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#341F14] bg-[#20130C]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                Curated Landscape
              </span>
              <p className="font-serif text-xl font-light text-[#F5EFEB] mt-1">
                Oracles Landscape
              </p>
              <p className="text-xs text-[#A8988B] mt-2">
                Zen reflection pools, lagoon swimming pools, and private sky lounges.
              </p>
            </div>
          </div>

          {/* Amenities Summary */}
          <div className="space-y-3 pt-2">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C5A880]">
              Over 20+ Bespoke Amenities Included
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#E8DDD2]">
              {LUXURY_AMENITIES.map((am, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-lg bg-[#20130C]/60 border border-[#341F14]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#F5EFEB] block">
                      {am.title}
                    </span>
                    <span className="text-[#A8988B] text-[11px]">
                      {am.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#341F14]">
          <div className="flex items-center space-x-2 text-xs text-[#A8988B]">
            <FileText className="h-4 w-4 text-[#C5A880]" />
            <span>Digital PDF Edition (18.4 MB) • Updated 2026</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                window.print();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 rounded-full border border-[#C5A880]/40 px-6 py-3 text-xs tracking-[0.2em] uppercase text-[#F5EFEB] hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInquire();
              }}
              className="flex-1 sm:flex-none rounded-full bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#C5A880] px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#160D08] hover:scale-[1.02] transition-transform"
            >
              Request Hardcopy Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
