/**
 * ==============================================================================
 * ANANDA CROWN — AWWWARDS-GRADE SCROLL ANIMATIONS ENGINE
 * High-concept kinetic typography, velocity skew, shutter parallax & 3D dynamics
 * ==============================================================================
 */
(function () {
  "use strict";

  function initAwwwardsAnimations() {
    if (typeof gsap === "undefined") {
      console.warn("[Awwwards Engine] GSAP not loaded.");
      return;
    }

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const isDesktop = function () {
      return typeof window.isDesktopScrollMode === "function"
        ? window.isDesktopScrollMode()
        : window.innerWidth > 1024;
    };

    // Skew animation completely removed per user request
    const trackEl = document.querySelector(".track");
    if (trackEl && typeof gsap !== "undefined") {
      gsap.set(trackEl, { skewX: 0, skewY: 0, clearProps: "skewX,skewY" });
    }

    // =========================================================================
    // 2. HERO 3D HORIZON DISSOLVE & KINETIC ENTRANCE
    // =========================================================================
    function initHeroKinematics() {
      const heroContainer = document.querySelector(".ref-hero-container");
      if (!heroContainer) return;

      const eyebrowLine = document.querySelector(".ref-hero-eyebrow-line");
      const eyebrowWord = document.querySelector(".ref-hero-eyebrow-word-dark");
      const heading = document.querySelector(".ref-hero-heading");
      const location = document.querySelector(".ref-hero-location");
      const divider = document.querySelector(".ref-hero-divider");
      const cta = document.querySelector(".ref-hero-cta");
      const bottom = document.querySelector(".ref-hero-bottom");

      // Initial state
      if (eyebrowLine) gsap.set(eyebrowLine, { width: 0, opacity: 0 });
      if (eyebrowWord) gsap.set(eyebrowWord, { x: -25, opacity: 0 });
      if (heading) {
        gsap.set(heading, {
          y: 45,
          opacity: 0,
          scale: 0.96,
          transformPerspective: 1200,
          rotationX: 12,
        });
      }
      if (location) gsap.set(location, { y: 25, opacity: 0 });
      if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: "left", opacity: 0 });
      if (cta) gsap.set(cta, { y: 25, scale: 0.92, opacity: 0 });
      if (bottom) gsap.set(bottom, { y: 20, opacity: 0 });

      // Orchestrated Entrance
      const tlHero = gsap.timeline({ delay: 0.4 });
      if (eyebrowLine) {
        tlHero.to(eyebrowLine, { width: 44, opacity: 1, duration: 0.9, ease: "power3.out" });
      }
      if (eyebrowWord) {
        tlHero.to(eyebrowWord, { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.6");
      }
      if (heading) {
        tlHero.to(
          heading,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.3,
            ease: "power4.out",
          },
          "-=0.5",
        );
      }
      if (location) {
        tlHero.to(location, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");
      }
      if (divider) {
        tlHero.to(divider, { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6");
      }
      if (cta) {
        tlHero.to(cta, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
      }
      if (bottom) {
        tlHero.to(bottom, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, "-=0.6");
      }

      // Scroll-Driven Horizon Dispersion
      if (heading) {
        const homeSection = document.getElementById("home");
        if (homeSection) {
          if (isDesktop() && window.tlMain) {
            gsap.to(heading, {
              letterSpacing: "0.14em",
              scale: 0.93,
              filter: "blur(6px)",
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: homeSection,
                containerAnimation: window.tlMain,
                start: "left left",
                end: "25% left",
                scrub: 0.5,
              },
            });
          }
        }
      }
    }

    // =========================================================================
    // 3. ABOUT / VISION SECTION — 3D KINETIC UNFOLD & SHUTTER CLIP
    // =========================================================================
    function initVisionSection() {
      const visionSection = document.getElementById("vision") || document.querySelector(".vision-section");
      if (!visionSection) return;

      const mainTitle = visionSection.querySelector(".about-main-title");
      const leadStatement = visionSection.querySelector(".about-lead-statement");
      const subLead = visionSection.querySelector(".untitled-400-13-big");
      const pillarItems = visionSection.querySelectorAll(".about-pillar-item");
      const chessImg = visionSection.querySelector(".about-chess-frame");
      const heroImgWrap = visionSection.querySelector(".about-hero-img-wrap");
      const heroImg = visionSection.querySelector(".about-hero-img");

      // Add dynamic accent lines under pillars
      pillarItems.forEach(function (pillar) {
        if (!pillar.querySelector(".about-pillar-accent-line")) {
          const line = document.createElement("div");
          line.className = "about-pillar-accent-line";
          const numTitle = pillar.querySelector(".num_title");
          if (numTitle) numTitle.appendChild(line);
        }
      });

      // Prepare 3D Perspective on headings
      if (mainTitle) {
        gsap.set(mainTitle, {
          y: 40,
          opacity: 0,
          transformPerspective: 1000,
          rotationX: 18,
          transformOrigin: "bottom center",
        });
      }
      if (leadStatement) {
        gsap.set(leadStatement, {
          y: 35,
          opacity: 0,
          transformPerspective: 1000,
          rotationX: 12,
        });
      }
      if (subLead) gsap.set(subLead, { y: 25, opacity: 0 });

      // Image shutter frame
      if (heroImgWrap) {
        heroImgWrap.classList.add("awwwards-img-frame");
        gsap.set(heroImgWrap, {
          clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
          opacity: 0.7,
        });
      }
      if (heroImg) {
        gsap.set(heroImg, { scale: 1.28, xPercent: -8 });
      }

      // Animation routine triggered on scroll
      function buildVisionScrollAnimation() {
        const animTarget = isDesktop() && window.tlMain
          ? {
              trigger: visionSection,
              containerAnimation: window.tlMain,
              start: "left 85%",
              end: "left 25%",
              scrub: 1.1,
            }
          : {
              trigger: visionSection,
              start: "top 80%",
              end: "top 20%",
              scrub: 1.1,
            };

        const tl = gsap.timeline({ scrollTrigger: animTarget });

        // Titles unfold
        if (mainTitle) {
          tl.to(mainTitle, { y: 0, opacity: 1, rotationX: 0, ease: "power2.out" }, 0);
        }
        if (leadStatement) {
          tl.to(leadStatement, { y: 0, opacity: 1, rotationX: 0, ease: "power2.out" }, 0.1);
        }
        if (subLead) {
          tl.to(subLead, { y: 0, opacity: 1, ease: "power2.out" }, 0.2);
        }

        // Image shutter wipes open to rectangular perfection
        if (heroImgWrap) {
          tl.to(
            heroImgWrap,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 1,
              ease: "power2.inOut",
            },
            0.15,
          );
        }
        // Image counter-parallaxes inside the frame
        if (heroImg) {
          tl.to(heroImg, { scale: 1.05, xPercent: 4, ease: "none" }, 0.15);
        }

        // Pillars stagger in
        if (pillarItems.length) {
          pillarItems.forEach(function (pillar, idx) {
            const line = pillar.querySelector(".about-pillar-accent-line");
            const num = pillar.querySelector(".about-pillar-num");
            tl.fromTo(
              pillar,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: "power3.out" },
              0.25 + idx * 0.12,
            );
            if (line) {
              tl.to(line, { scaleX: 1, ease: "power2.out" }, 0.35 + idx * 0.12);
            }
            if (num) {
              tl.fromTo(
                num,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, ease: "back.out(2)" },
                0.28 + idx * 0.12,
              );
            }
          });
        }

        // Chess frame
        if (chessImg) {
          tl.fromTo(
            chessImg,
            { scale: 0.85, opacity: 0, rotate: -4 },
            { scale: 1, opacity: 1, rotate: 0, ease: "back.out(1.6)" },
            0.4,
          );
        }
      }

      if (typeof ScrollTrigger !== "undefined") {
        buildVisionScrollAnimation();
      }
    }

    // =========================================================================
    // 4. APARTMENTS / RESIDENCES — 3D GALLERY FLOAT & SHUTTER UNVEILS
    // =========================================================================
    function initApartmentsKinematics() {
      const aptSection = document.getElementById("apartments") || document.querySelector(".apartments-section");
      if (!aptSection) return;

      const aptTitle = aptSection.querySelector(".apartments-main-title");
      const aptSubTitle = aptSection.querySelector(".apartments-sub-titulo");
      const specRows = aptSection.querySelectorAll(".ap-spec-row");
      const highlightCards = aptSection.querySelectorAll(".ap-highlight-card");
      const imgWraps = aptSection.querySelectorAll(".ap-img-wrap");

      // Initial state
      if (aptTitle) {
        gsap.set(aptTitle, {
          y: 40,
          opacity: 0,
          transformPerspective: 1000,
          rotationX: 16,
        });
      }
      if (aptSubTitle) gsap.set(aptSubTitle, { y: 25, opacity: 0 });

      imgWraps.forEach(function (wrap, idx) {
        wrap.classList.add("awwwards-img-frame");
        const img = wrap.querySelector("img");
        if (img) gsap.set(img, { scale: 1.25 });
        gsap.set(wrap, {
          clipPath: "polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)",
          y: 35,
          opacity: 0.85,
        });
      });

      const scrollConfig = isDesktop() && window.tlMain
        ? {
            trigger: aptSection,
            containerAnimation: window.tlMain,
            start: "left 85%",
            end: "left 20%",
            scrub: 1.2,
          }
        : {
            trigger: aptSection,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.2,
          };

      const tl = gsap.timeline({ scrollTrigger: scrollConfig });

      if (aptTitle) tl.to(aptTitle, { y: 0, opacity: 1, rotationX: 0, ease: "power2.out" }, 0);
      if (aptSubTitle) tl.to(aptSubTitle, { y: 0, opacity: 1, ease: "power2.out" }, 0.1);

      // Spec rows stagger
      if (specRows.length) {
        specRows.forEach(function (row, i) {
          tl.fromTo(
            row,
            { x: -35, opacity: 0 },
            { x: 0, opacity: 1, ease: "power2.out" },
            0.15 + i * 0.08,
          );
        });
      }

      // Highlights stagger
      if (highlightCards.length) {
        highlightCards.forEach(function (card, i) {
          tl.fromTo(
            card,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, ease: "power2.out" },
            0.25 + i * 0.08,
          );
        });
      }

      // Interior images wipe open & counter-parallax
      imgWraps.forEach(function (wrap, idx) {
        const img = wrap.querySelector("img");
        tl.to(
          wrap,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          0.2 + idx * 0.14,
        );
        if (img) {
          tl.to(img, { scale: 1.04, ease: "none" }, 0.2 + idx * 0.14);
        }
      });
    }

    // =========================================================================
    // 5. STRATEGIC LOCATION — RADAR PULSE & PARALLAX TRANSIT
    // =========================================================================
    function initLocationKinematics() {
      const locSection = document.getElementById("location") || document.querySelector(".location-section");
      if (!locSection) return;

      // Add sonar ping radar to location pin icon
      const pinIcons = locSection.querySelectorAll(".location-pin, .map-pin-icon");
      pinIcons.forEach(function (pin) {
        pin.classList.add("sonar-ping");
      });

      const cards = locSection.querySelectorAll(".location-info-wrap, .location-card");
      if (cards.length) {
        const scrollConfig = isDesktop() && window.tlMain
          ? {
              trigger: locSection,
              containerAnimation: window.tlMain,
              start: "left 80%",
              end: "left 30%",
              scrub: 1.0,
            }
          : {
              trigger: locSection,
              start: "top 80%",
              end: "top 30%",
              scrub: 1.0,
            };

        const tl = gsap.timeline({ scrollTrigger: scrollConfig });
        cards.forEach(function (card, i) {
          tl.fromTo(
            card,
            { y: 30, opacity: 0.2, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, ease: "power2.out" },
            i * 0.15,
          );
        });
      }
    }

    // =========================================================================
    // 6. AVAILABILITY TABLE — VENETIAN LOUVER CASCADE
    // =========================================================================
    function initAvailabilityKinematics() {
      const availSection = document.getElementById("availability") || document.querySelector(".availability-section");
      if (!availSection) return;

      const rows = availSection.querySelectorAll(".table-row, .availability-row, tr");
      if (!rows.length) return;

      const scrollConfig = isDesktop() && window.tlMain
        ? {
            trigger: availSection,
            containerAnimation: window.tlMain,
            start: "left 80%",
            end: "left 35%",
            scrub: 1.1,
          }
        : {
            trigger: availSection,
            start: "top 80%",
            end: "top 35%",
            scrub: 1.1,
          };

      const tl = gsap.timeline({ scrollTrigger: scrollConfig });
      rows.forEach(function (row, idx) {
        tl.fromTo(
          row,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out" },
          idx * 0.05,
        );
      });
    }



    // =========================================================================
    // 8. ADDITIONAL AMENITIES — 3D KINETIC UNFOLD, SHUTTER WIPE & TICK CASCADE
    // =========================================================================
    function initAdditionalAmenities() {
      const panel = document.getElementById("additionalAmenities");
      if (!panel) return;

      const title = panel.querySelector(".add-amen-title");
      const vDivider = panel.querySelector(".add-amen-v-divider");
      const items = panel.querySelectorAll(".add-amen-item");
      const dashes = panel.querySelectorAll(".add-amen-item-dash");
      const cta = panel.querySelector(".apartments-cta");
      const imgWrap = document.getElementById("additionalAmenitiesImageWrap");
      const img = document.getElementById("additionalAmenitiesImg");

      // Set initial states
      if (title) {
        gsap.set(title, {
          y: 35,
          opacity: 0,
          transformPerspective: 1000,
          rotationX: 18,
        });
      }
      if (vDivider) {
        gsap.set(vDivider, { scaleY: 0, transformOrigin: "top center" });
      }
      if (items.length) {
        gsap.set(items, { x: -28, opacity: 0 });
      }
      if (dashes.length) {
        gsap.set(dashes, { scaleX: 0, transformOrigin: "left center" });
      }
      if (cta) {
        gsap.set(cta, { y: 25, opacity: 0 });
      }
      if (imgWrap) {
        imgWrap.classList.add("awwwards-img-frame");
        gsap.set(imgWrap, {
          clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
          opacity: 0.85,
        });
      }
      if (img) {
        gsap.set(img, { scale: 1.25 });
      }

      const scrollConfig = isDesktop() && window.tlMain
        ? {
            trigger: panel,
            containerAnimation: window.tlMain,
            start: "left 85%",
            end: "left 20%",
            scrub: 1.1,
          }
        : {
            trigger: panel,
            start: "top 80%",
            end: "top 20%",
            scrub: 1.1,
          };

      const tl = gsap.timeline({ scrollTrigger: scrollConfig });

      // Title 3D reveal
      if (title) {
        tl.to(title, { y: 0, opacity: 1, rotationX: 0, ease: "power2.out" }, 0);
      }

      // Vertical laser divider
      if (vDivider) {
        tl.to(vDivider, { scaleY: 1, ease: "power2.inOut" }, 0.08);
      }

      // Image shutter opens & counter-zooms
      if (imgWrap) {
        tl.to(
          imgWrap,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            ease: "power2.inOut",
          },
          0.12,
        );
      }
      if (img) {
        tl.to(img, { scale: 1.05, ease: "none" }, 0.12);
      }

      // Items stagger cascade
      if (items.length) {
        items.forEach(function (item, idx) {
          tl.to(
            item,
            { x: 0, opacity: 1, ease: "power2.out" },
            0.15 + idx * 0.045,
          );
        });
      }

      // Gold dashes expand
      if (dashes.length) {
        dashes.forEach(function (dash, idx) {
          tl.to(
            dash,
            { scaleX: 1, ease: "power2.out" },
            0.2 + idx * 0.045,
          );
        });
      }

      // CTA button entrance
      if (cta) {
        tl.to(cta, { y: 0, opacity: 1, ease: "back.out(1.6)" }, 0.6);
      }
    }

    // =========================================================================
    // 9. 3D CARD TILT ON MOUSEMOVE
    // =========================================================================
    function init3DCardTilts() {
      const tiltCards = document.querySelectorAll(".about-pillar-item, .ap-highlight-card");
      tiltCards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const midX = rect.width / 2;
          const midY = rect.height / 2;
          const rotX = ((y - midY) / midY) * -8;
          const rotY = ((x - midX) / midX) * 8;

          gsap.to(this, {
            rotationX: rotX,
            rotationY: rotY,
            transformPerspective: 800,
            duration: 0.35,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", function () {
          gsap.to(this, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      });
    }

    // =========================================================================
    // INITIALIZATION DISPATCH
    // =========================================================================
    initHeroKinematics();
    initVisionSection();
    initApartmentsKinematics();
    initAdditionalAmenities();
    initLocationKinematics();
    initAvailabilityKinematics();
    init3DCardTilts();
  }

  // Hook into DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAwwwardsAnimations);
  } else {
    setTimeout(initAwwwardsAnimations, 250);
  }
})();
