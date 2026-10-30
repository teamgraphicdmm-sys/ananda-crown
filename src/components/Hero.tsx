"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { PROJECT_DETAILS } from "@/data/projectData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenInquire: () => void;
}

export default function Hero({ onOpenInquire }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP animation refs
  const eyebrowLineRef = useRef<HTMLSpanElement>(null);
  const eyebrowText1Ref = useRef<HTMLSpanElement>(null);
  const eyebrowText2Ref = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const locationRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const animationFrameId = useRef<number | null>(null);
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const currentVideoTime = useRef<number>(0);

  const pendingSeekTime = useRef<number | null>(null);
  const isSeeking = useRef<boolean>(false);

  // Helper for drawing object-cover media on canvas
  const drawCoverMedia = (
    ctx: CanvasRenderingContext2D,
    media: HTMLVideoElement,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    if (!media || media.readyState < 2) return;
    const mediaWidth = media.videoWidth || canvasWidth;
    const mediaHeight = media.videoHeight || canvasHeight;

    if (!mediaWidth || !mediaHeight) return;

    const mediaRatio = mediaWidth / mediaHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > mediaRatio) {
      drawHeight = canvasWidth / mediaRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * mediaRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    // Direct cover drawing without clearRect to eliminate micro-frame flash
    ctx.drawImage(media, offsetX, offsetY, drawWidth, drawHeight);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2.3 });

    // a. Eyebrow copper line
    tl.from(eyebrowLineRef.current, { width: 0, duration: 0.8, ease: "power2.out" })
      // b. "SOPHISTICATION" + "LIVES HERE"
      .from([eyebrowText1Ref.current, eyebrowText2Ref.current], { y: 15, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.4")
      // c. "Comfort and"
      .from(titleLine1Ref.current, { y: 60, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.2")
      // d. "Elegance" (italic)
      .from(titleLine2Ref.current, { y: 60, opacity: 0, duration: 1, ease: "power4.out" }, "<0.15")
      // e. "IN SECTOR 78 MOHALI"
      .from(subtitleRef.current, { y: 15, opacity: 0, duration: 0.6 }, "-=0.4")
      // f. Divider line
      .from(dividerRef.current, { scaleX: 0, transformOrigin: "left", duration: 0.6 }, "-=0.4")
      // g. "EXPLORE RESIDENCES" + arrow
      .from(exploreRef.current, { x: -20, opacity: 0, duration: 0.6 }, "-=0.4")
      // h. Bottom row (phone, location, scroll)
      .from([phoneRef.current, locationRef.current, scrollRef.current], { y: 20, opacity: 0, stagger: 0.15, duration: 0.8 }, "-=0.4")
      // 2. Scroll indicator infinite bob
      .to(scrollIndicatorRef.current, { y: 8, repeat: -1, yoyo: true, ease: "power1.inOut", duration: 1.5 });
  }, { scope: containerRef });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (video.readyState >= 2) {
        drawCoverMedia(ctx, video, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    video.muted = true;
    video.playsInline = true;
    video.pause();

    const seekToTarget = (targetTime: number) => {
      if (isSeeking.current || video.seeking) {
        pendingSeekTime.current = targetTime;
        return;
      }
      if (Math.abs(video.currentTime - targetTime) > 0.005) {
        isSeeking.current = true;
        try {
          if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
            (video as any).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        } catch {
          video.currentTime = targetTime;
        }
      }
    };

    const handleSeeked = () => {
      isSeeking.current = false;
      if (canvas.width > 0 && canvas.height > 0 && video.readyState >= 2) {
        drawCoverMedia(ctx, video, canvas.width, canvas.height);
      }
      if (pendingSeekTime.current !== null) {
        const nextTime = pendingSeekTime.current;
        pendingSeekTime.current = null;
        seekToTarget(nextTime);
      }
    };

    const handleLoadedData = () => {
      if (canvas.width > 0 && canvas.height > 0) {
        drawCoverMedia(ctx, video, canvas.width, canvas.height);
      }
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadeddata", handleLoadedData);

    if (video.readyState >= 2) {
      handleLoadedData();
    } else {
      video.load();
    }

    const updateTargetProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const rawProgress = -rect.top / totalScroll;
      targetProgress.current = Math.max(0, Math.min(1, rawProgress));
    };

    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    updateTargetProgress();

    const easeFactor = 0.12;

    const renderLoop = () => {
      const progressDiff = targetProgress.current - currentProgress.current;
      currentProgress.current += progressDiff * easeFactor;
      const p = currentProgress.current;

      // Video reaches 100% completion in the first 75% of hero scroll depth
      const videoCompletionRatio = 0.75;
      const videoP = Math.max(0, Math.min(1, p / videoCompletionRatio));

      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        const targetTime = videoP * (video.duration - 0.05);
        const timeDiff = targetTime - currentVideoTime.current;
        currentVideoTime.current += timeDiff * 0.15;

        const safeTime = Math.max(0, Math.min(video.duration - 0.05, currentVideoTime.current));
        seekToTarget(safeTime);

        if (canvas.width > 0 && canvas.height > 0 && video.readyState >= 2) {
          drawCoverMedia(ctx, video, canvas.width, canvas.height);
        }
      }

      // Hero Content Animation: slide up translateY(-40px) & fade opacity (1 -> 0) in initial 15% of hero scroll
      const fadeEnd = 0.15;
      const contentP = Math.max(0, Math.min(1, p / fadeEnd));
      const opacity = 1 - contentP;
      const translateY = -contentP * 40;

      if (contentRef.current) {
        contentRef.current.style.opacity = opacity.toFixed(3);
        contentRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        contentRef.current.style.pointerEvents = opacity < 0.02 ? "none" : "auto";
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateTargetProgress);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadeddata", handleLoadedData);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH
    ? `/${process.env.NEXT_PUBLIC_BASE_PATH.replace(/^\/+|\/+$/g, "")}`
    : "";
  const videoSrc = `${basePath}/videos/flip-jogging.mp4`;

  return (
    <div id="home" ref={containerRef} className="relative w-full h-[500vh]">
      <section className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-9 px-8 sm:px-14 md:px-16 lg:px-20">
        {/* Full-Screen Canvas Video Scrubbing Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="absolute w-px h-px opacity-0 pointer-events-none"
            muted
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
          {/* Soft Contrast Overlay */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none z-10" />
        </div>

        {/* Hero Content Container */}
        <div ref={contentRef} className="w-full h-full flex flex-col justify-between pointer-events-auto z-20">
          {/* Spacing for Header */}
          <div className="w-full pt-2"></div>

          {/* Mid-Left Hero Display Content matching ChatGPT Image Sep 16, 2026, 05_59_01 PM.png */}
          <div className="max-w-2xl w-full my-auto py-4 z-10">
            <div className="flex flex-col items-start text-left">
              {/* Eyebrow: Copper line + Sophistication (Copper) Lives Here (Dark Espresso) */}
              <div className="inline-flex items-center space-x-3.5 mb-6">
                <span ref={eyebrowLineRef} className="w-9 h-[1.5px] bg-[#9e6443]" />
                <div className="flex items-center space-x-1.5 text-[11px] tracking-[0.28em] font-sans">
                  <span ref={eyebrowText1Ref} className="font-semibold text-[#8c5d3d] inline-block">Sophistication</span>
                  <span ref={eyebrowText2Ref} className="font-medium text-[#2b221d] inline-block">Lives Here</span>
                </div>
              </div>

              {/* Main Display Headline: Comfort and (Espresso) Elegance (Golden Terracotta Italic) */}
              <h1 className="font-serif text-5xl sm:text-7xl md:text-[5.25rem] lg:text-[5.75rem] leading-[1.04] tracking-[-0.01em] text-left mb-4">
                <span ref={titleLine1Ref} className="font-normal text-[#221814] inline-block">Comfort and</span>
                <br />
                <span ref={titleLine2Ref} className="italic font-normal text-[#9e6443] inline-block">Elegance</span>
              </h1>

              {/* Location Subtitle: In Sector 78 Mohali */}
              <div ref={subtitleRef} className="text-[11.5px] font-medium tracking-[0.35em] text-[#2b221d] font-sans mt-2 mb-6">
                In Sector 78 Mohali
              </div>

              {/* Olive-Bronze Divider Line */}
              <div ref={dividerRef} className="w-11 h-[1.5px] bg-[#7d7265] mb-7" />

              {/* Explore Residences Action with Outlined Circular Arrow */}
              <div ref={exploreRef}>
                <Link
                  href="#residences"
                  className="group inline-flex items-center space-x-4 cursor-pointer transition-transform duration-300 hover:translate-x-1"
                >
                  <span className="text-[11.5px] tracking-[0.25em] font-semibold text-[#221814] font-sans group-hover:text-[#9e6443] transition-colors">
                    Explore Residences
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3a281e] bg-transparent group-hover:bg-[#221814] group-hover:text-[#f7f2ed] transition-all duration-300 shadow-sm group-hover:scale-105">
                    <ArrowRight className="h-3.5 w-3.5 text-[#221814] group-hover:text-[#f7f2ed] group-hover:translate-x-0.5 transition-all" strokeWidth={1.3} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row: Warm cream colors (#f2e8dc) with soft shadow for crisp legibility over trees */}
          <div className="w-full pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-10">
            {/* Bottom Left: Phone + Location Pin */}
            <div className="inline-flex items-center space-x-4 text-[#f2e8dc] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              <a
                ref={phoneRef}
                href={`tel:${PROJECT_DETAILS.contact.phonePrimary}`}
                className="group inline-flex items-center space-x-2 text-[13px] font-medium tracking-wide hover:text-[#c2a180] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#f2e8dc] group-hover:text-[#c2a180] transition-colors" />
                <span>{PROJECT_DETAILS.contact.phonePrimary}</span>
              </a>

              <span className="text-[#f2e8dc]/50 text-sm">|</span>

              <Link
                ref={locationRef}
                href="#location"
                className="group inline-flex items-center space-x-2 text-[13px] font-medium tracking-wide hover:text-[#c2a180] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-[#f2e8dc] group-hover:text-[#c2a180] transition-colors" />
                <span>Sector 78, Mohali</span>
              </Link>
            </div>

            {/* Bottom Right: Vertical SCROLL indicator */}
            <div className="self-end text-[#f2e8dc] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              <Link
                ref={scrollRef}
                href="#vision"
                className="group inline-flex flex-col items-center space-y-1.5 cursor-pointer transition-opacity hover:opacity-75"
                aria-label="Scroll to Vision Section"
              >
                <span
                  className="text-[9.5px] font-semibold tracking-[0.32em] font-sans text-[#f2e8dc]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Scroll
                </span>
                <div ref={scrollIndicatorRef} className="flex flex-col items-center space-y-1">
                  <div className="w-[1px] h-9 bg-[#f2e8dc]"></div>
                  <div className="h-2 w-2 rounded-full border border-[#f2e8dc] bg-transparent"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
