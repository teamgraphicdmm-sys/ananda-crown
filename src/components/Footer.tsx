"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { PROJECT_DETAILS } from "@/data/projectData";

interface FooterProps {
  onOpenInquire: () => void;
}

export default function Footer({ onOpenInquire }: FooterProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="relative w-full bg-[#120902] text-[#F5EFEB] pt-24 pb-16 px-6 md:px-12 lg:px-16 border-t border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Top Inquire Callout matching One24 footer banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-[#341F14] pb-16">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
                Private Consultations
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#F5EFEB] leading-[1.05]">
                Inquire Today for Exclusive Previews
              </h2>
              <p className="text-xs md:text-sm text-[#A8988B] leading-relaxed">
                Experience bespoke hospitality at our Sector 78 sales pavilion. Schedule a curated private walk-through of the masterplan and scale model.
              </p>
            </div>

            <button
              onClick={onOpenInquire}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C5A880] via-[#DFBA73] to-[#C5A880] px-8 py-4 text-xs font-semibold tracking-[0.25em] uppercase text-[#160D08] shadow-[0_8px_32px_rgba(197,168,128,0.3)] hover:scale-105 transition-transform flex items-center space-x-3 shrink-0"
            >
              <span>Schedule Appointment</span>
              <span className="h-2 w-2 rounded-full bg-[#160D08]" />
            </button>
          </div>

          {/* Main Footer Grid matching One24 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pt-4">
            {/* Left 1: Brand & Logo */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-3.5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#C5A880]/40 p-0.5">
                  <div className="relative h-full w-full rounded-full overflow-hidden">
                    <Image
                      src="/images/logo.jpg"
                      alt="Ananda Crown Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-[#F5EFEB] uppercase">
                    Ananda Crown
                  </h3>
                  <p className="text-[9px] tracking-[0.25em] text-[#C5A880] uppercase">
                    Sector 78 • Mohali
                  </p>
                </div>
              </div>

              <p className="text-xs font-light text-[#A8988B] leading-relaxed">
                An aristocratic real estate landmark by Ananda Group, designed to elevate high-rise luxury living in the Chandigarh Capital Region.
              </p>

              <div className="flex items-center space-x-3 text-xs tracking-wider text-[#A8988B]">
                <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
                <span>RERA: {PROJECT_DETAILS.rera.number}</span>
              </div>
            </div>

            {/* Column 2: Visit Us */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] block">
                Visit Us
              </span>
              <p className="text-xs font-light text-[#E8DDD2] leading-relaxed">
                {PROJECT_DETAILS.location.address}
              </p>
              <a
                href={PROJECT_DETAILS.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#C5A880] hover:text-white transition-colors"
              >
                <span>Google Maps Location</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Column 3: Contact & Concierge */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] block">
                Contact Concierge
              </span>
              <div className="space-y-2 font-mono text-xs text-[#F5EFEB]">
                <a
                  href={`tel:${PROJECT_DETAILS.contact.phonePrimary}`}
                  className="block hover:text-[#C5A880] transition-colors"
                >
                  {PROJECT_DETAILS.contact.phonePrimary}
                </a>
                <a
                  href={`tel:${PROJECT_DETAILS.contact.phoneSecondary}`}
                  className="block hover:text-[#C5A880] transition-colors"
                >
                  {PROJECT_DETAILS.contact.phoneSecondary}
                </a>
                <a
                  href={`mailto:${PROJECT_DETAILS.contact.email}`}
                  className="block text-[#E7CFAD] hover:underline pt-1"
                >
                  {PROJECT_DETAILS.contact.email}
                </a>
              </div>

              {/* Social Channels */}
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href={PROJECT_DETAILS.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={PROJECT_DETAILS.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href={PROJECT_DETAILS.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20130C] border border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880] hover:text-[#160D08] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Column 4: Architectural Pedigree */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] block">
                Development By
              </span>
              <p className="text-xs font-semibold text-[#F5EFEB]">
                {PROJECT_DETAILS.developer.name}
              </p>
              <p className="text-[11px] text-[#A8988B] leading-relaxed">
                Founders: {PROJECT_DETAILS.developer.founders}
              </p>

              <div className="pt-2 border-t border-[#341F14] text-[10px] text-[#A8988B] space-y-1">
                <p>Architecture: IE Design & HBS Studio</p>
                <p>Landscape: Oracles Landscape</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="border-t border-[#341F14] pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A8988B] gap-4">
            <p>© {new Date().getFullYear()} Ananda Crown Mohali. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-[#C5A880] transition-colors"
              >
                Privacy Policy & Disclaimer
              </button>
              <span>•</span>
              <a
                href="https://rera.punjab.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C5A880] transition-colors"
              >
                Punjab RERA Portal
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[#C5A880]/30 bg-[#160D08] p-8 md:p-10 shadow-2xl space-y-6 text-xs text-[#E8DDD2] leading-relaxed">
            <div className="flex items-center justify-between border-b border-[#341F14] pb-4">
              <h3 className="font-serif text-2xl font-light text-[#F5EFEB]">
                Privacy Policy & Legal Disclaimers
              </h3>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="text-[#A8988B] hover:text-white"
              >
                Close ✕
              </button>
            </div>
            <div className="space-y-4">
              <p>
                <strong>Project Compliance:</strong> Ananda Crown is an upcoming residential real estate development situated in Sector 78, SAS Nagar, Mohali, registered under Punjab RERA Registration No. {PROJECT_DETAILS.rera.number}.
              </p>
              <p>
                <strong>Information Usage:</strong> Any contact details submitted via our private inquiry forms are used solely by authorized representatives of Ananda Group to provide official pricing, availability, and scheduling of sales pavilion visits. We do not sell or trade your data to third parties.
              </p>
              <p>
                <strong>Disclaimer:</strong> All artist impressions, CGI renderings, mock-ups, specifications, and dimensions displayed on this website are conceptual and indicative of proposed design standards. Final specifications shall strictly adhere to executed agreement for sale under Punjab RERA guidelines.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
