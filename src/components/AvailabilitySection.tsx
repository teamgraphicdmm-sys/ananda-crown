"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Calendar, ArrowRight, Eye, CheckCircle2, Lock } from "lucide-react";
import { INVENTORY_DATA, InventoryUnit, PROJECT_DETAILS } from "@/data/projectData";

gsap.registerPlugin(ScrollTrigger);

interface AvailabilitySectionProps {
  onOpenInquire: () => void;
  onOpenBrochure: () => void;
  onSelectFloorplan: (unit: InventoryUnit) => void;
}

export default function AvailabilitySection({
  onOpenInquire,
  onOpenBrochure,
  onSelectFloorplan,
}: AvailabilitySectionProps) {
  const [filterBhk, setFilterBhk] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [unitUnitSystem, setUnitUnitSystem] = useState<"sqft" | "sqm">("sqft");

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const tableHeadRef = useRef<HTMLTableSectionElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  const filteredInventory = INVENTORY_DATA.filter((unit) => {
    const matchesBhk =
      filterBhk === "all" ||
      (filterBhk === "3" && unit.bedrooms === 3) ||
      (filterBhk === "4" && unit.bedrooms === 4) ||
      (filterBhk === "5" && unit.bedrooms === 5);

    const matchesStatus =
      filterStatus === "all" || unit.status === filterStatus;

    return matchesBhk && matchesStatus;
  });

  useGSAP(() => {
    // 1. Section header ("Availability" tag + title)
    gsap.fromTo(
      gsap.utils.toArray(headerRef.current?.children || []),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // 2. CTA buttons row
    gsap.fromTo(
      gsap.utils.toArray(ctaRef.current?.children || []),
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );

    // 3. Filter pills
    gsap.fromTo(
      ".avail-filter",
      { scale: 0 },
      {
        scale: 1,
        stagger: 0.05,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 72%",
          once: true,
        },
      }
    );

    // 4. Table header row
    gsap.fromTo(
      tableHeadRef.current,
      { y: -15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: tableHeadRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );

    // 5. Table body rows & 6. Fraction numbers
    const rows = gsap.utils.toArray(tableBodyRef.current?.children || []);
    if (rows.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tableBodyRef.current,
          start: "top 68%",
          once: true,
        },
      });

      tl.fromTo(
        rows,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.06,
        }
      ).to(
        ".avail-fraction",
        {
          color: "#DFBA73",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          stagger: 0.06,
        },
        "<0.2"
      );
    }
  }, { dependencies: [filteredInventory], scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="availability"
      className="relative w-full bg-[#180E09] py-28 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header matching One24 layout */}
        <div ref={headerRef} className="space-y-4">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
            Availability
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F5EFEB] leading-[1.1]">
            Discover Our <br />
            <span className="italic text-[#E7CFAD]">Available Residences</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#C5A880]/20" />

        {/* Action CTAs Row: Download Brochure & Make Appointment */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Download Brochure Button matching One24 cta-ball */}
            <button
              onClick={onOpenBrochure}
              className="group inline-flex items-center space-x-3 rounded-full border border-[#C5A880]/50 hover:border-[#C5A880] bg-[#20130C] hover:bg-[#C5A880] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase text-[#F5EFEB] hover:text-[#160D08] transition-all duration-300 shadow-xl"
            >
              <span>Download Brochure</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A880] text-[#160D08] group-hover:bg-[#160D08] group-hover:text-[#C5A880] transition-colors">
                <Download className="h-3 w-3" />
              </div>
            </button>

            {/* Make an Appointment Button */}
            <button
              onClick={onOpenInquire}
              className="group inline-flex items-center space-x-3 rounded-full bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#C5A880] px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#160D08] shadow-[0_4px_24px_rgba(197,168,128,0.3)] hover:scale-[1.02] transition-all"
            >
              <span>Make An Appointment</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#160D08] text-[#C5A880]">
                <Calendar className="h-3 w-3" />
              </div>
            </button>
          </div>

          {/* Area Toggle: Sq. Ft. vs. Sq. Meters */}
          <div className="flex items-center space-x-2 bg-[#20130C] p-1 rounded-full border border-[#341F14] text-[10px] tracking-[0.15em] uppercase">
            <span className="text-[#A8988B] px-2">Unit Area:</span>
            <button
              onClick={() => setUnitUnitSystem("sqft")}
              className={`px-3 py-1 rounded-full transition-all ${
                unitUnitSystem === "sqft"
                  ? "bg-[#C5A880] text-[#160D08] font-bold"
                  : "text-[#A8988B] hover:text-[#F5EFEB]"
              }`}
            >
              Sq. Ft
            </button>
            <button
              onClick={() => setUnitUnitSystem("sqm")}
              className={`px-3 py-1 rounded-full transition-all ${
                unitUnitSystem === "sqm"
                  ? "bg-[#C5A880] text-[#160D08] font-bold"
                  : "text-[#A8988B] hover:text-[#F5EFEB]"
              }`}
            >
              Sq. M
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div ref={filterRef} className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* BHK Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All Layouts", value: "all" },
              { label: "3 BHK Royal", value: "3" },
              { label: "4 BHK Palatial", value: "4" },
              { label: "5 BHK Penthouse", value: "5" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilterBhk(btn.value)}
                className={`avail-filter rounded-full px-4 py-2 text-[10px] tracking-[0.18em] uppercase transition-all ${
                  filterBhk === btn.value
                    ? "bg-[#C5A880] text-[#160D08] font-semibold"
                    : "bg-[#20130C] text-[#A8988B] border border-[#341F14] hover:text-[#F5EFEB]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`avail-filter px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase transition-all ${
                filterStatus === "all"
                  ? "border border-[#C5A880] text-[#C5A880]"
                  : "text-[#A8988B] hover:text-[#F5EFEB]"
              }`}
            >
              All Units ({INVENTORY_DATA.length})
            </button>
            <button
              onClick={() => setFilterStatus("available")}
              className={`avail-filter px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase transition-all ${
                filterStatus === "available"
                  ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-400"
                  : "text-[#A8988B] hover:text-[#F5EFEB]"
              }`}
            >
              Available Only (
              {INVENTORY_DATA.filter((u) => u.status === "available").length})
            </button>
          </div>
        </div>

        {/* Availability Table Component matching One24 availability-table */}
        <div className="w-full overflow-x-auto rounded-2xl border border-[#C5A880]/25 bg-[#20130C]/90 shadow-2xl backdrop-blur-md">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead ref={tableHeadRef}>
              <tr className="border-b border-[#C5A880]/20 text-[10px] tracking-[0.25em] uppercase text-[#C5A880] bg-[#160D08]/80">
                <th className="py-4 px-6">Residence</th>
                <th className="py-4 px-6">Typology</th>
                <th className="py-4 px-6">Floor</th>
                <th className="py-4 px-6">View / Orientation</th>
                <th className="py-4 px-6">Parking</th>
                <th className="py-4 px-6">
                  Area ({unitUnitSystem === "sqft" ? "Sq.Ft" : "M²"})
                </th>
                <th className="py-4 px-6">Availability</th>
                <th className="py-4 px-6 text-right">Floorplan</th>
              </tr>
            </thead>
            <tbody ref={tableBodyRef} className="divide-y divide-[#341F14]/70 text-xs">
              {filteredInventory.map((unit) => (
                <tr
                  key={unit.id}
                  className="group hover:bg-[#28180F] transition-colors duration-200"
                >
                  {/* Fraction */}
                  <td className="py-5 px-6">
                    <span className="avail-fraction font-serif text-2xl font-light text-[#E7CFAD] group-hover:text-white transition-colors">
                      {unit.fraction}
                    </span>
                    <span className="block text-[9px] uppercase tracking-widest text-[#A8988B]">
                      {unit.tower}
                    </span>
                  </td>

                  {/* Bedrooms */}
                  <td className="py-5 px-6">
                    <span className="font-medium text-[#F5EFEB]">
                      {unit.bedrooms} Bedrooms
                    </span>
                    <span className="block text-[10px] text-[#C5A880]">
                      {unit.typology}
                    </span>
                  </td>

                  {/* Floor */}
                  <td className="py-5 px-6 font-mono text-[#E8DDD2]">
                    {unit.floorLabel}
                  </td>

                  {/* Side */}
                  <td className="py-5 px-6 text-[#A8988B] max-w-[180px]">
                    {unit.side}
                  </td>

                  {/* Parking */}
                  <td className="py-5 px-6 text-[#E8DDD2]">
                    {unit.parking}
                  </td>

                  {/* Areas */}
                  <td className="py-5 px-6 font-mono text-sm text-[#E7CFAD]">
                    {unitUnitSystem === "sqft"
                      ? `${unit.areaSqFt.toLocaleString()} sq.ft`
                      : `${unit.areaSqM} m²`}
                  </td>

                  {/* Availability Status Badge */}
                  <td className="py-5 px-6">
                    {unit.status === "available" && (
                      <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/80 px-3 py-1 text-[10px] tracking-wider uppercase text-emerald-400 border border-emerald-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Available</span>
                      </span>
                    )}
                    {unit.status === "reserved" && (
                      <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-950/80 px-3 py-1 text-[10px] tracking-wider uppercase text-amber-300 border border-amber-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span>Reserved</span>
                      </span>
                    )}
                    {unit.status === "sold" && (
                      <span className="inline-flex items-center space-x-1.5 rounded-full bg-[#160D08] px-3 py-1 text-[10px] tracking-wider uppercase text-[#A8988B] border border-[#341F14]">
                        <Lock className="h-2.5 w-2.5" />
                        <span>Sold</span>
                      </span>
                    )}
                  </td>

                  {/* Floorplan Button matching One24 availability-button */}
                  <td className="py-5 px-6 text-right">
                    <button
                      onClick={() => onSelectFloorplan(unit)}
                      className="group/btn inline-flex items-center space-x-2 rounded-full border border-[#C5A880]/40 px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[#E7CFAD] hover:bg-[#C5A880] hover:text-[#160D08] transition-all"
                    >
                      <Eye className="h-3 w-3" />
                      <span>View Floorplan</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12 text-[#A8988B] space-y-2">
            <p className="font-serif text-2xl text-[#E7CFAD]">No residences match criteria</p>
            <p className="text-xs tracking-wider uppercase">
              Please reset filters or contact concierge for customized inventory
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
