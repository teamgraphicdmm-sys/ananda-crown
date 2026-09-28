"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DestinationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<SVGSVGElement>(null);
  const tagTextRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const statsCardRef = useRef<HTMLDivElement>(null);
  
  const metric600Ref = useRef<HTMLSpanElement>(null);
  const metric11Ref = useRef<HTMLSpanElement>(null);
  const metric15Ref = useRef<HTMLSpanElement>(null);
  const metric30Ref = useRef<HTMLSpanElement>(null);
  const statLabelsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  const badgeIconRef = useRef<SVGSVGElement>(null);
  const badgeTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // 1. Background image parallax
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.to(imageContainerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
        },
      });
    });

    // 2. Compass icon + "The Destination" tag
    gsap.from(compassRef.current, {
      rotation: 360,
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }
    });

    gsap.from(tagTextRef.current, {
      x: -15,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }
    });

    // 3. Main title
    gsap.from(titleLine1Ref.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      }
    });
    
    gsap.from(titleLine2Ref.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      }
    });

    // 4. Narrative paragraphs
    gsap.fromTo(paragraphsRef.current,
      { y: 30, opacity: 0, filter: "blur(4px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        }
      }
    );

    // 5. Stats card
    gsap.from(statsCardRef.current, {
      x: 60,
      opacity: 0,
      rotation: 2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      }
    });

    // 8. "Architectural Supremacy" badge
    gsap.from(badgeIconRef.current, {
      scale: 0,
      rotation: -180,
      duration: 0.6,
      ease: "back.out(2)",
      delay: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      }
    });

    gsap.from(badgeTextRef.current, {
      opacity: 0,
      x: -10,
      duration: 0.5,
      delay: 1.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      }
    });

    // 6. Individual stat metrics & 7. Stat labels
    const tlCounters = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
      }
    });

    const m600 = { val: 0 };
    tlCounters.to(m600, {
      val: 600,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if(metric600Ref.current) metric600Ref.current.innerText = Math.round(m600.val) + " Ft.";
      }
    }, 0);

    const m11 = { val: 0 };
    tlCounters.to(m11, {
      val: 11.5,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if(metric11Ref.current) metric11Ref.current.innerText = m11.val.toFixed(1) + " Ft.";
      }
    }, 0.15);

    const m15 = { val: 0 };
    tlCounters.to(m15, {
      val: 15,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if(metric15Ref.current) metric15Ref.current.innerText = Math.round(m15.val) + " Mins";
      }
    }, 0.3);

    const m30 = { val: 0 };
    tlCounters.to(m30, {
      val: 30,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if(metric30Ref.current) metric30Ref.current.innerText = "G+" + Math.round(m30.val);
      }
    }, 0.45);

    tlCounters.from(statLabelsRef.current, {
      y: 10,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5
    }, ">");

  }, { scope: sectionRef });

  return (
    <section
      id="destination"
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-between py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#C5A880]/15"
    >
      {/* Background Visual Layer with Luxury Warm Espresso Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={imageContainerRef} className="absolute inset-0 w-full h-full scale-110 -top-[15%]">
          <Image
            src="/images/crown-arrived.webp"
            alt="Mohali Urban Royalty"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#160D08] via-[#160D08]/80 to-[#160D08]/90" />
        <div className="absolute inset-0 bg-[#160D08]/60 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Top Tag & Big Title matching One24 'the island' section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#C5A880]">
            <Compass ref={compassRef} className="h-4 w-4 text-[#C5A880]" />
            <span ref={tagTextRef}>The Destination</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F5EFEB] leading-[1.05] tracking-tight max-w-5xl">
            <div ref={titleLine1Ref} className="overflow-hidden">
              Experience the Best of
            </div>
            <div ref={titleLine2Ref} className="overflow-hidden">
              <span className="italic text-[#E7CFAD]">Urban Royalty in Mohali</span>
            </div>
          </h2>
        </div>

        {/* Narrative Split & Key Attributes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-6">
          <div className="lg:col-span-7 space-y-6">
            <p 
              ref={(el) => { paragraphsRef.current[0] = el; }} 
              className="text-base md:text-xl font-light text-[#E8DDD2] leading-relaxed tracking-wide"
            >
              Living at Ananda Crown offers a rare harmony: the wide, tree-lined boulevards and planned geometric calm of the Chandigarh Capital Region, coupled with Mohali&apos;s surging economic pulse and international stature.
            </p>

            <p 
              ref={(el) => { paragraphsRef.current[1] = el; }}
              className="text-sm md:text-base font-light text-[#A8988B] leading-relaxed"
            >
              Situated in Sector 78, residents find themselves moments away from iconic landmarks like the I.S. Bindra PCA Stadium, cutting-edge healthcare institutions like Fortis and Sohana Hospital, and the rapid transit corridors linking to Shaheed Bhagat Singh International Airport.
            </p>
          </div>

          <div ref={statsCardRef} className="lg:col-span-5 bg-[#20130C]/80 backdrop-blur-md rounded-2xl border border-[#C5A880]/30 p-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
              <Sparkles ref={badgeIconRef} className="h-3.5 w-3.5 text-[#C5A880]" />
              <span ref={badgeTextRef}>Architectural Supremacy</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1 border-b border-[#341F14] pb-4">
                <span ref={metric600Ref} className="font-serif text-3xl md:text-4xl text-[#C5A880] block">
                  600 Ft.
                </span>
                <p ref={(el) => { statLabelsRef.current[0] = el; }} className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  Grand Avenue Frontage
                </p>
              </div>

              <div className="space-y-1 border-b border-[#341F14] pb-4">
                <span ref={metric11Ref} className="font-serif text-3xl md:text-4xl text-[#C5A880] block">
                  11.5 Ft.
                </span>
                <p ref={(el) => { statLabelsRef.current[1] = el; }} className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  Slab-to-Slab Ceilings
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <span ref={metric15Ref} className="font-serif text-3xl md:text-4xl text-[#C5A880] block">
                  15 Mins
                </span>
                <p ref={(el) => { statLabelsRef.current[2] = el; }} className="text-[10px] uppercase tracking-wider text-[#A8988B]">
                  To Intl. Airport (IXC)
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <span ref={metric30Ref} className="font-serif text-3xl md:text-4xl text-[#C5A880] block">
                  G+30
                </span>
                <p ref={(el) => { statLabelsRef.current[3] = el; }} className="text-[10px] uppercase tracking-wider text-[#A8988B]">
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
