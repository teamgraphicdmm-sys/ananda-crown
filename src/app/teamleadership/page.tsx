import React from "react";

export default function TeamLeadershipPage() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F0E8] text-[#1C1512] py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 flex flex-col justify-center items-center selection:bg-[#9E6443] selection:text-white">
      {/* Title & Subtitle */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-[#9E6443]/40 inline-block" />
          <span className="font-sans text-[0.68rem] tracking-[0.25em] uppercase font-semibold text-[#9E6443]">
            The Visionaries
          </span>
          <span className="w-8 h-[1px] bg-[#9E6443]/40 inline-block" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-normal leading-[1.08] text-[#1C1512] tracking-tight">
          Our Leadership <span className="text-[#9E6443] font-medium">Team</span>
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#7D7265] max-w-xl mx-auto font-normal mt-4 leading-relaxed tracking-normal">
          Operators and builders who've shipped at enterprise scale.
        </p>
      </div>

      {/* 4 Boxes Grid: Content Box (Sahil) -> Photo Box (Sahil) -> Photo Box (Anuj) -> Content Box (Anuj) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {/* BOX 1: Sahil Aggarwal Content Box */}
          <div className="rounded-[26px] overflow-hidden bg-[#FAF7F2] shadow-[0_16px_36px_-10px_rgba(87,48,36,0.08)] border border-[#E8E1D5]/90 p-6 sm:p-7 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(158,100,67,0.16)]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#9E6443]" />
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-bold text-[#9E6443]">
                  Strategic Dossier
                </span>
              </div>

              <p className="font-sans text-[13.5px] sm:text-[14px] leading-relaxed text-[#2C221D]/90 font-normal">
                A second-generation entrepreneur who invests across asset classes, Sahil builds for the long view. His brief for Crown is simple: homes that become an immortal part of lives.
              </p>

              <div className="w-full h-[1px] bg-[#E8E1D5] my-5" />

              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    IIM Ahmedabad
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    Institute Rank &amp; Scholarship Holder; Finance &amp; Strategy.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    HEC Paris
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    Entrepreneurship &amp; Marketing.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    Thapar University
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    B.Tech, Computer Science Engineering; Department Rank &amp; Scholarship Holder.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E1D5]/60 flex items-center justify-between text-[0.7rem] text-[#7D7265]">
              <span className="font-serif italic text-[#9E6443]">Ananda Crown Development</span>
              <span className="font-sans tracking-wider uppercase text-[0.62rem]">Leadership</span>
            </div>
          </div>

          {/* BOX 2: Sahil Aggarwal Photo Box (Clean, No Overlay) */}
          <div className="rounded-[26px] overflow-hidden group bg-[#2C221D] shadow-[0_16px_36px_-10px_rgba(87,48,36,0.08)] border border-[#E8E1D5]/70 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] relative transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(158,100,67,0.16)]">
            <div className="relative w-full h-full overflow-hidden flex-1">
              <img
                src="/images/founders/sahil_card.optimized.webp"
                alt="Sahil Aggarwal - Co-founder and Director"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-5 inset-x-5 sm:bottom-6 sm:inset-x-6 z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl py-3.5 px-4 shadow-[0_10px_25px_-5px_rgba(28,21,18,0.12)] border border-white/70 text-center transition-all duration-300 group-hover:bg-white group-hover:-translate-y-1">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#1C1512] leading-tight">
                  Sahil Aggarwal
                </h3>
                <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-[#9E6443] font-semibold mt-1">
                  Co-founder and Director
                </p>
              </div>
            </div>
          </div>

          {/* BOX 3: Anuj Bansal Photo Box (Clean, No Overlay) */}
          <div
            className="rounded-[26px] overflow-hidden group shadow-[0_16px_36px_-10px_rgba(87,48,36,0.08)] border border-[#E8E1D5]/70 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] relative transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(158,100,67,0.16)]"
            style={{
              background: "linear-gradient(180deg, #F8E2D2 0%, #FAAE7A 45%, #FE7823 100%)",
            }}
          >
            <div className="relative w-full h-full overflow-hidden flex-1">
              <img
                src="/images/founders/anuj_card_orange.webp"
                alt="Anuj Bansal - Co-founder and Director"
                className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-5 inset-x-5 sm:bottom-6 sm:inset-x-6 z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl py-3.5 px-4 shadow-[0_10px_25px_-5px_rgba(28,21,18,0.12)] border border-white/70 text-center transition-all duration-300 group-hover:bg-white group-hover:-translate-y-1">
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#1C1512] leading-tight">
                  Anuj Bansal
                </h3>
                <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-[#9E6443] font-semibold mt-1">
                  Co-founder and Director
                </p>
              </div>
            </div>
          </div>

          {/* BOX 4: Anuj Bansal Content Box */}
          <div className="rounded-[26px] overflow-hidden bg-[#FAF7F2] shadow-[0_16px_36px_-10px_rgba(87,48,36,0.08)] border border-[#E8E1D5]/90 p-6 sm:p-7 flex flex-col justify-between min-h-[500px] sm:min-h-[530px] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(158,100,67,0.16)]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#9E6443]" />
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-bold text-[#9E6443]">
                  Executive Pedigree
                </span>
              </div>

              {/* Bio Paragraph */}
              <p className="font-sans text-[13.5px] sm:text-[14px] leading-relaxed text-[#2C221D]/90 font-normal">
                Anuj has spent thirteen years working across the United States, France, China and India, markets that finance, approve and build in entirely different ways. He brings that global standard of planning and execution to Mohali.
              </p>

              <div className="w-full h-[1px] bg-[#E8E1D5] my-5" />

              {/* Credentials & Milestones */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    13 years
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    In real estate and other major sectors.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    44 countries
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    Experience in the US, France, China and India.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    Babson College, USA
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    Master’s in Entrepreneurship.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg sm:text-[19px] font-semibold text-[#1C1512] leading-snug">
                    IIT Delhi
                  </h4>
                  <p className="font-sans text-xs text-[#7D7265] mt-0.5 leading-normal">
                    B.Tech.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E1D5]/60 flex items-center justify-between text-[0.7rem] text-[#7D7265]">
              <span className="font-serif italic text-[#9E6443]">Ananda Crown Development</span>
              <span className="font-sans tracking-wider uppercase text-[0.62rem]">Engineering Pedigree</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
