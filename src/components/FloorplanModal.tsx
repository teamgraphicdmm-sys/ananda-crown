"use client";

import React from "react";
import Image from "next/image";
import { X, Check, Download, Send, Sparkles } from "lucide-react";
import { InventoryUnit, PROJECT_DETAILS } from "@/data/projectData";

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
  if (!unit) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 md:p-8 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#C5A880]/40 bg-[#160D08] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#341F14] pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#C5A880]">
              <Sparkles className="h-3 w-3" />
              <span>Architectural Blueprint • Fraction {unit.fraction}</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#F5EFEB]">
              {unit.typology} — {unit.tower}
            </h3>
            <p className="text-xs text-[#A8988B] tracking-wide">
              {unit.floorLabel} • {unit.side}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/30 text-[#F5EFEB] hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Blueprint Visual & Spec Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Schematic Preview */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#C5A880]/30 bg-[#20130C] group">
              <Image
                src={unit.floorplanImage}
                alt={`${unit.typology} Floorplan Layout`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs tracking-wider uppercase text-[#E7CFAD]">
                <span>Super Area: {unit.areaSqFt.toLocaleString()} Sq.Ft</span>
                <span>{unit.areaSqM} Sq.M</span>
              </div>
            </div>
          </div>

          {/* Specifications Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#C5A880]">
                Space Breakdown & Dimensions
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-3 rounded-lg bg-[#20130C] border border-[#341F14]">
                  <span className="text-[#A8988B]">Living & Dining:</span>
                  <span className="font-medium text-[#F5EFEB]">
                    {unit.specs.livingDining}
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-[#20130C] border border-[#341F14]">
                  <span className="text-[#A8988B]">Master Suite:</span>
                  <span className="font-medium text-[#F5EFEB]">
                    {unit.specs.masterBedroom}
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-[#20130C] border border-[#341F14]">
                  <span className="text-[#A8988B]">Balcony / Skydeck:</span>
                  <span className="font-medium text-[#F5EFEB]">
                    {unit.specs.balconies}
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-[#20130C] border border-[#341F14]">
                  <span className="text-[#A8988B]">Dedicated Parking:</span>
                  <span className="font-medium text-[#F5EFEB]">
                    {unit.parking}
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-[#20130C] border border-[#341F14]">
                  <span className="text-[#A8988B]">Ceiling Clearance:</span>
                  <span className="font-medium text-[#C5A880]">
                    {unit.specs.ceilingHeight}
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-[#20130C] border border-[#341F14]">
                  <span className="text-[#A8988B]">Staff Suite:</span>
                  <span className="font-medium text-[#F5EFEB]">
                    {unit.specs.servantRoom ? "Included with Bath" : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Inquire for Unit Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onInquireUnit(unit);
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#C5A880] py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#160D08] shadow-lg hover:scale-[1.01] transition-transform"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Inquire For Fraction {unit.fraction}</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-full border border-[#C5A880]/30 py-3 text-xs tracking-[0.18em] uppercase text-[#A8988B] hover:text-[#F5EFEB] hover:border-[#C5A880] transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Print Floorplan Schematic</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
