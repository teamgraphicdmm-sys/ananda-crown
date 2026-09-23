"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [isRegisterInterest, setIsRegisterInterest] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    request: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      alert("Please accept the privacy policy to proceed.");
      return;
    }
    setIsSubmitted(true);
  };

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0E0703] text-white flex flex-col justify-between px-6 sm:px-12 md:px-16 py-8 md:py-12 select-none">
      {/* Top Close Button */}
      <div className="w-full flex justify-end items-center mb-6">
        <button
          onClick={handleClose}
          className="text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-white hover:text-[#A27B58] transition-colors"
        >
          CLOSE
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 flex-1 items-stretch">
        {/* Left Column */}
        <div className="flex flex-col justify-between pb-6">
          <div>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[105px] font-light leading-[0.88] tracking-tight uppercase">
              INQUIRY<br />NOW
            </h1>
          </div>

          <div className="mt-12 space-y-8">
            {/* Where */}
            <div>
              <div className="text-[11px] tracking-[0.16em] uppercase text-[#A27B58] font-medium mb-3">
                WHERE
              </div>
              <a
                href="https://maps.google.com/?q=Sector+78+Mohali+Punjab"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xl sm:text-2xl text-white uppercase tracking-wide leading-snug hover:text-[#A27B58] transition-colors block"
              >
                SECTOR 78, SAS NAGAR,<br />
                MOHALI, PUNJAB<br />
                140308
              </a>
            </div>

            {/* Contacts */}
            <div>
              <div className="text-[11px] tracking-[0.16em] uppercase text-[#A27B58] font-medium mb-3">
                CONTACTS
              </div>
              <div className="space-y-4">
                <div>
                  <a
                    href="tel:+919779799705"
                    className="font-serif text-xl sm:text-2xl text-white hover:text-[#A27B58] transition-colors block leading-tight"
                  >
                    +91 97797 99705
                  </a>
                  <span className="text-[9px] tracking-[0.14em] uppercase text-white/45 block mt-1">
                    LOCAL CALL, FEES MAY APPLY
                  </span>
                </div>

                <div>
                  <a
                    href="tel:+919872400078"
                    className="font-serif text-xl sm:text-2xl text-white hover:text-[#A27B58] transition-colors block leading-tight"
                  >
                    +91 98724 00078
                  </a>
                  <span className="text-[9px] tracking-[0.14em] uppercase text-white/45 block mt-1">
                    LOCAL CALL, FEES MAY APPLY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between lg:pl-6">
          <div className="w-full max-w-xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Register Interest Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/25">
                  <div className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    <span className="text-xs tracking-[0.14em] uppercase text-white font-medium">
                      {isRegisterInterest ? "REGISTER INTEREST" : "SCHEDULE VISIT"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsRegisterInterest(!isRegisterInterest)}
                      className={`w-8 h-4.5 rounded-full p-0.5 transition-colors border ${
                        isRegisterInterest
                          ? "bg-white border-white"
                          : "bg-white/20 border-white/60"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-transform ${
                          isRegisterInterest
                            ? "translate-x-3.5 bg-[#0E0703]"
                            : "translate-x-0 bg-white"
                        }`}
                      />
                    </button>
                  </div>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-white/45">
                    *REQUIRED FIELDS
                  </span>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 pt-2">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="FIRST NAME*"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-transparent border-b border-white/25 py-2.5 text-[11px] tracking-[0.14em] uppercase text-white placeholder-white/45 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="LAST NAME*"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-transparent border-b border-white/25 py-2.5 text-[11px] tracking-[0.14em] uppercase text-white placeholder-white/45 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="EMAIL*"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/25 py-2.5 text-[11px] tracking-[0.14em] uppercase text-white placeholder-white/45 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="PHONE NUMBER"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/25 py-2.5 text-[11px] tracking-[0.14em] uppercase text-white placeholder-white/45 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <textarea
                      required
                      rows={1}
                      placeholder="REQUEST*"
                      value={formData.request}
                      onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                      className="w-full bg-transparent border-b border-white/25 py-2.5 text-[11px] tracking-[0.14em] uppercase text-white placeholder-white/45 focus:border-white focus:outline-none transition-colors resize-y min-h-[42px]"
                    />
                  </div>
                </div>

                {/* Privacy Agreement */}
                <div
                  onClick={() => setPrivacyAccepted(!privacyAccepted)}
                  className="flex items-center space-x-3 pt-3 cursor-pointer select-none"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      privacyAccepted ? "border-white" : "border-white/50"
                    }`}
                  >
                    {privacyAccepted && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-white/70">
                    I HAVE READ AND ACCEPT THE{" "}
                    <Link href="/privacy" className="underline text-white/90 hover:text-white">
                      PRIVACY POLICY
                    </Link>
                    .
                  </span>
                </div>
              </form>
            ) : (
              <div className="py-12 space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-white/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                  <span className="text-xs tracking-[0.14em] uppercase text-white font-medium">
                    WE RECEIVED YOUR MESSAGE
                  </span>
                </div>
                <h2 className="font-serif text-5xl sm:text-6xl text-white uppercase font-light">
                  THANK YOU
                </h2>
                <p className="text-xs tracking-wider uppercase text-white/50 pt-2">
                  Our private concierge will contact you shortly.
                </p>
              </div>
            )}
          </div>

          {/* Giant Bottom-Right Submit Button */}
          {!isSubmitted && (
            <div className="flex justify-end items-end w-full mt-10">
              <button
                type="submit"
                onClick={handleSubmit}
                className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[130px] font-light leading-[0.85] text-white hover:text-[#A27B58] transition-all duration-300 uppercase tracking-tight text-right block ml-auto"
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
