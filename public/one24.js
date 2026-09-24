// Page Transition  ----------
// Image Load Animation
let loadTarget4 = $(".transition-img.n1");
let loadTarget1 = $(".transition-img.n3");
let loadTarget2 = $(".transition-img.n2");
let loadTarget3 = $(".transition-img-wrap");
let loadImage1 = gsap.fromTo(
  loadTarget1,
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", //"circle(0% at 50% 50%)"
  },
  {
    paused: true,
    duration: 1,
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", //"circle(100% at 50% 50%)",
    ease: "power1.inOut",
  },
);
let loadImage2 = gsap.fromTo(
  loadTarget2,
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  {
    paused: true,
    duration: 1.2,
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    ease: "power1.inOut",
  },
);
let loadImage3 = gsap.fromTo(
  loadTarget3,
  {
    clipPath: "circle(10% at 50% 50%)",
  },
  {
    paused: true,
    duration: 1.2,
    clipPath: "circle(100% at 50% 50%)",
    ease: "power1.inOut",
  },
);
let loadInicioMask = gsap.fromTo(
  loadTarget3,
  {
    clipPath: "circle(0% at 50% 50%)",
  },
  {
    paused: true,
    duration: 1.2,
    clipPath: "circle(10% at 50% 50%)",
    ease: "power1.inOut",
  },
);
let loadImage4 = gsap.to(loadTarget4, {
  paused: true,
  duration: 0.5,
  width: "100%",
  height: "100%",
  ease: "power1.inOut",
});

// NEW TEXT LOAD
function textLoad() {
  let targetElement = $("[load=anim]").find(".chars");
  $("[load=anim]").each(function (index) {
    let tload = gsap.timeline({});
    tload.to(targetElement, {
      opacity: 1,
      duration: 1,
      stagger: {
        amount: 0.8,
        ease: "none",
        from: "random",
      },
    });
  });
}
// variables
let customEase =
  "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
let counter = {
  value: 0,
};
let loaderDuration = 4.3;

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $("[progress=text]").text(progress);
}

function endLoaderAnimation() {
  $(".transition-bottom").addClass("close");
  setTimeout(() => {
    $(".transition-wrap").addClass("close");
    $(".home-page-trasition").click();
    setTimeout(() => {
      $(".transition").css("display", "none");
    }, 1000);
    setTimeout(() => {
      textLoad();
    }, 200);
  }, 900);
}

$("body").addClass("no-scroll-transition");
let tlLoad = gsap.timeline({
  onComplete: endLoaderAnimation,
  onStart: () => {
    $(".transition-trigger").click();
    loadInicioMask.play().delay(0);
    loadImage1.play().delay(1.5);
    loadImage2.play().delay(3);
    loadImage3.play().delay(4.5);
    loadImage4.play().delay(4.5);
  },
});
tlLoad.to(counter, {
  value: 100,
  onUpdate: updateLoaderText,
  duration: loaderDuration,
  ease: CustomEase.create("custom", customEase),
});

// Depois da animação Scroll
setTimeout(() => {
  if ($(".transition").is(":visible")) {
    endLoaderAnimation();
  }
  $("body").removeClass("no-scroll-transition");
}, 4500);

// On Click
let transitionTrigger = $(".transition-trigger");
let introDurationMS = 0;
let exitDurationMS = 1000;
let excludedClass = "no-transition";

// On Link Click
$("a").on("click", function (e) {
  if (
    $(this).prop("hostname") == window.location.host &&
    $(this).attr("href").indexOf("#") === -1 &&
    !$(this).hasClass(excludedClass) &&
    $(this).attr("target") !== "_blank" &&
    transitionTrigger.length > 0
  ) {
    e.preventDefault();
    $("body").addClass("no-scroll-transition");
    let transitionURL = $(this).attr("href");
    transitionTrigger.click();
    setTimeout(function () {
      window.location = transitionURL;
    }, exitDurationMS);
  }
});
// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};
// Hide Transition on Window Width Resize
setTimeout(() => {
  $(window).on("resize", function () {
    setTimeout(() => {
      $(".transition").css("display", "none");
    }, 50);
  });
}, introDurationMS);
// End Page Transition ----------

// Global Links - Global CODE ------------
// Link Politica Privacidade EN
let linkPrivacidadeEN = $("#privacidade").attr("href");
$("[privacy=link]").attr("href", linkPrivacidadeEN);
// Link Politica Privacidade PT
let linkPrivacidadePT = $("#privacidadePT").attr("href");
$("[privacidade=link]").attr("href", linkPrivacidadePT);
// END Global Links - Global CODE ------------

// MOUSE GSAP ----------
gsap.set(".mouse-anda", { xPercent: -50, yPercent: -50 });
const ball = document.querySelector(".mouse-anda");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.2;
const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
gsap.ticker.add(() => {
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});
// END MOUSE GSAP ----------
// Mouse Anda 2
gsap.set(".mouse-outro", { xPercent: -50, yPercent: -50 });
const ball2 = document.querySelector(".mouse-outro");
const pos2 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse2 = { x: pos.x, y: pos.y };
const speed2 = 0.15;
const xSet2 = gsap.quickSetter(ball2, "x", "px");
const ySet2 = gsap.quickSetter(ball2, "y", "px");
window.addEventListener("mousemove", (e) => {
  mouse2.x = e.x;
  mouse2.y = e.y;
});
gsap.ticker.add(() => {
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed2, gsap.ticker.deltaRatio());
  pos2.x += (mouse2.x - pos2.x) * dt;
  pos2.y += (mouse2.y - pos2.y) * dt;
  xSet2(pos2.x);
  ySet2(pos2.y);
});
// END Mouse Anda 2
// Mouse Anda 3
gsap.set(".mouse-outro-2", { xPercent: -50, yPercent: -50 });
const ball3 = document.querySelector(".mouse-outro-2");
const pos3 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse3 = { x: pos.x, y: pos.y };
const speed3 = 0.17;
const xSet3 = gsap.quickSetter(ball3, "x", "px");
const ySet3 = gsap.quickSetter(ball3, "y", "px");
window.addEventListener("mousemove", (e) => {
  mouse3.x = e.x;
  mouse3.y = e.y;
});
gsap.ticker.add(() => {
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed3, gsap.ticker.deltaRatio());
  pos3.x += (mouse3.x - pos3.x) * dt;
  pos3.y += (mouse3.y - pos3.y) * dt;
  xSet3(pos3.x);
  ySet3(pos3.y);
});
// END Mouse Anda 3

// MOUSE
$(
  ".cta, .big-cta, .availability-button, .vision-hover-text, .form-botton, .bemine-link, .inquire-open-info-links, .c-form_field, .form-accept, .decline, .cookies-link",
)
  .not(".nav-link, .small-links")
  .mouseenter(function () {
    $(".mouse").addClass("hover");
    $(".mouse-outro").addClass("hover");
    $(".mouse-outro-2").addClass("hover");
  });
$(
  ".cta, .big-cta, .availability-button, .vision-hover-text, .form-botton, .bemine-link, .inquire-open-info-links, .c-form_field, .form-accept, .decline, .cookies-link",
)
  .not(".nav-link, .small-links")
  .mouseleave(function () {
    $(".mouse").removeClass("hover");
    $(".mouse-outro").removeClass("hover");
    $(".mouse-outro-2").removeClass("hover");
  });
$(".nav-link, .small-links, .accept").mouseenter(function () {
  $(".mouse").addClass("nav-hover");
  $(".mouse-outro").addClass("nav-hover");
  $(".mouse-outro-2").addClass("nav-hover");
});
$(".nav-link, .small-links, .accept").mouseleave(function () {
  $(".mouse").removeClass("nav-hover");
  $(".mouse-outro").removeClass("nav-hover");
  $(".mouse-outro-2").removeClass("nav-hover");
});
$(".ap-img-1, .ap-img-center, .ap-img-4").mouseenter(function () {
  $(".mouse-outro").addClass("nav-hover");
  $(".mouse-outro-2").addClass("nav-hover");
});
$(".ap-img-1, .ap-img-center, .ap-img-4").mouseleave(function () {
  $(".mouse-outro").removeClass("nav-hover");
  $(".mouse-outro-2").removeClass("nav-hover");
});
$(
  ".ap-img-full-screen-1, .ap-img-full-screen-2, .ap-img-full-screen-3, .ap-img-full-screen-4",
).mouseenter(function () {
  $(".ap-img-full-close").addClass("close");
  $(".mouse-wrap").addClass("close");
  $(".glass-block").addClass("expand");
  $(".mouse").addClass("nav-hover");
  $(".mouse-outro").addClass("nav-hover");
  $(".mouse-outro-2").addClass("nav-hover");
});
$(
  ".ap-img-full-screen-1, .ap-img-full-screen-2, .ap-img-full-screen-3, .ap-img-full-screen-4",
).mouseleave(function () {
  $(".ap-img-full-close").removeClass("close");
  $(".mouse-wrap").removeClass("close");
  $(".glass-block").removeClass("expand");
  $(".mouse").removeClass("nav-hover");
  $(".mouse-outro").removeClass("nav-hover");
  $(".mouse-outro-2").removeClass("nav-hover");
});
$(".ap-img-1, .ap-img-50, .ap-img-4").mouseenter(function () {
  $(".mouse").addClass("expand");
  $(".mouse-wrap").addClass("expand");
  $(".expand-text").addClass("expand");
  $(".expand-text-none").addClass("expand");
  $(".glass-block").addClass("expand");
});
$(".ap-img-1, .ap-img-50, .ap-img-4").mouseleave(function () {
  $(".mouse").removeClass("expand");
  $(".mouse-wrap").removeClass("expand");
  $(".expand-text").removeClass("expand");
  $(".expand-text-none").removeClass("expand");
  $(".glass-block").removeClass("expand");
});
$(
  ".vision-section, .apartments-section, .location-section, .availability-section, .hero-scroll, .availability-component",
).mouseenter(function () {
  $(".mouse, .mouse-outro, .mouse-outro-2").addClass("black");
});
$(".hero-scroll").mouseleave(function () {
  $(".mouse, .mouse-outro, .mouse-outro-2").removeClass("black");
});
$(".island-section, .hero-section, .inquire-open, .inquire-section").mouseenter(
  function () {
    $(".mouse, .mouse-outro, .mouse-outro-2").removeClass("black");
  },
);
// Add class on mouse down
$("body").mousedown(function () {
  $(".mouse").addClass("pressed");
});
$("body").mouseup(function () {
  $(".mouse").removeClass("pressed");
});
// END MOUSE

// ==========================================================================
// ACTIVE NAVBAR ITEM SECTION-WISE DETECTION
// ==========================================================================
const NAV_SECTIONS = [
  { id: "home", navId: "nav-home" },
  { id: "vision", navId: "nav-vision" },
  { id: "apartments", navId: "nav-apartments" },
  { id: "island", navId: "nav-island" },
  { id: "location", navId: "nav-location" },
  { id: "availability", navId: "nav-availability" }
];

const DARK_SECTIONS = ["home", "island", "location"];

let currentActiveSectionId = null;

function updateNavTheme(sectionId) {
  const navEl = document.querySelector(".nav");
  if (!navEl) return;
  const isDark = DARK_SECTIONS.indexOf(sectionId) !== -1;
  if (isDark) {
    navEl.classList.add("is-dark-bg");
    navEl.classList.remove("is-light-bg");
  } else {
    navEl.classList.remove("is-dark-bg");
    navEl.classList.add("is-light-bg");
  }
}

function setActiveNav(sectionId) {
  if (!sectionId || sectionId === currentActiveSectionId) return;
  currentActiveSectionId = sectionId;

  NAV_SECTIONS.forEach(function (item) {
    const link = document.getElementById(item.navId);
    if (link) {
      if (item.id === sectionId) {
        link.classList.remove("active");
        // Force DOM reflow to re-trigger dot spring animation cleanly
        void link.offsetWidth;
        link.classList.add("active");
        // On mobile/tablet, smooth-scroll the active link into view inside .nav-links-component
        if (window.innerWidth <= 991) {
          const container = document.querySelector(".nav-links-component");
          if (container && container.scrollWidth > container.clientWidth) {
            const linkLeft = link.offsetLeft - container.offsetLeft;
            container.scrollTo({
              left: linkLeft - container.clientWidth / 2 + link.clientWidth / 2,
              behavior: "smooth"
            });
          }
        }
      } else {
        link.classList.remove("active", "w--current");
      }
    }
  });

  updateNavTheme(sectionId);
}

function triggerNavClickAnimation(linkEl) {
  if (!linkEl) return;
  linkEl.classList.remove("nav-clicked");
  void linkEl.offsetWidth;
  linkEl.classList.add("nav-clicked");
  setTimeout(function () {
    linkEl.classList.remove("nav-clicked");
  }, 600);
}

function updateActiveNav() {
  const isDesktop = window.innerWidth > 991;
  const scrollY = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const maxScroll = docHeight - winHeight;

  if (scrollY <= 60) {
    setActiveNav("home");
    return;
  }
  if (maxScroll > 100 && scrollY >= maxScroll - 80) {
    setActiveNav("availability");
    return;
  }

  let activeSection = null;

  if (isDesktop) {
    const targetX = window.innerWidth * 0.45;
    for (let i = 0; i < NAV_SECTIONS.length; i++) {
      const el = document.getElementById(NAV_SECTIONS[i].id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.left <= targetX && rect.right > targetX) {
        activeSection = NAV_SECTIONS[i].id;
        break;
      }
    }
  } else {
    const targetY = window.innerHeight * 0.45;
    for (let i = 0; i < NAV_SECTIONS.length; i++) {
      const el = document.getElementById(NAV_SECTIONS[i].id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= targetY && rect.bottom > targetY) {
        activeSection = NAV_SECTIONS[i].id;
        break;
      }
    }
  }

  if (!activeSection) {
    let maxVisible = -1;
    for (let i = 0; i < NAV_SECTIONS.length; i++) {
      const el = document.getElementById(NAV_SECTIONS[i].id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (isDesktop) {
        const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
        if (visibleWidth > maxVisible) {
          maxVisible = visibleWidth;
          activeSection = NAV_SECTIONS[i].id;
        }
      } else {
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight;
          activeSection = NAV_SECTIONS[i].id;
        }
      }
    }
  }

  if (activeSection) {
    setActiveNav(activeSection);
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
window.addEventListener("load", function () {
  currentActiveSectionId = null;
  updateActiveNav();
});
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateActiveNav);
} else {
  updateActiveNav();
}

// HORIZONTAL SCROLL ----------
let horizontalM = gsap.matchMedia();
horizontalM.add("(min-width: 991px)", () => {
  // Optional - Set sticky section heights based on inner content width
  // Makes scroll timing feel more natural
  function setTrackHeights() {
    $(".section-height").each(function (index) {
      let trackWidth = $(this).find(".track").outerWidth();
      $(this).height(trackWidth);
    });
  }
  setTrackHeights();
  window.addEventListener("resize", function () {
    setTrackHeights();
  });

  // Horizontal scroll
  let tlMain = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".section-height",
        start: "top top",
        end: "98% bottom", //"+=15000" "98% bottom"
        scrub: 1.2,
        onUpdate: function () {
          updateActiveNav();
        },
      },
    })
    .to(".track", {
      xPercent: -100,
      ease: "none",
    });

  // SCROLL TO home
  document.querySelectorAll(".nav-link.home").forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      triggerNavClickAnimation(this);
      setActiveNav("home");
      gsap.to(window, {
        scrollTo: 0,
        duration: 2,
      });
    });
  });

  // SCROLL TO a (Vision)
  document.querySelectorAll(".nav-link.a, .big-cta").forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      triggerNavClickAnimation(this);
      setActiveNav("vision");
      let scrollContainer = document.querySelector(".track");
      const id = this.getAttribute("href").split("#")[1];

      const targetElement = document.getElementById(id);
      const element2 = targetElement.offsetWidth / 15;

      const scrollToHere =
        (targetElement.offsetLeft + element2) /
        (scrollContainer.scrollWidth /
          (scrollContainer.scrollWidth - window.innerWidth));

      gsap.to(window, {
        scrollTo: scrollToHere,
        duration: 2,
      });
    });
  });

  // SCROLL TO d (Residences)
  document.querySelectorAll(".nav-link.d").forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      triggerNavClickAnimation(this);
      setActiveNav("apartments");
      let scrollContainer = document.querySelector(".track");
      const id = this.getAttribute("href").split("#")[1];

      const targetElement = document.getElementById(id);
      const element2 = targetElement.offsetWidth / 50;

      const scrollToHere =
        (targetElement.offsetLeft + element2) /
        (scrollContainer.scrollWidth /
          (scrollContainer.scrollWidth - window.innerWidth));

      gsap.to(window, {
        scrollTo: scrollToHere,
        duration: 2,
      });
    });
  });

  // SCROLL TO b (Destination / Amenities)
  document.querySelectorAll(".nav-link.b").forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      triggerNavClickAnimation(this);
      let scrollContainer = document.querySelector(".track");
      const id = this.getAttribute("href").split("#")[1];
      setActiveNav(id);

      const targetElement = document.getElementById(id);
      const element2 = targetElement.offsetWidth / 20;

      const scrollToHere =
        (targetElement.offsetLeft + element2) /
        (scrollContainer.scrollWidth /
          (scrollContainer.scrollWidth - window.innerWidth));

      gsap.to(window, {
        scrollTo: scrollToHere,
        duration: 2,
      });
    });
  });

  // SCROLL TO c (Availability)
  document.querySelectorAll(".nav-link.c, .cta-link.c").forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      triggerNavClickAnimation(this);
      setActiveNav("availability");
      let scrollContainer = document.querySelector(".track");
      const id = this.getAttribute("href").split("#")[1];

      const targetElement = document.getElementById(id);
      const element2 = targetElement.offsetWidth / 12;

      const scrollToHere =
        (targetElement.offsetLeft + element2) /
        (scrollContainer.scrollWidth /
          (scrollContainer.scrollWidth - window.innerWidth));

      gsap.to(window, {
        scrollTo: scrollToHere,
        duration: 2,
      });
    });
  });

  // Animations ______
  // Nav Color 1
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".vision-section",
        containerAnimation: tlMain,
        start: "left 50%",
        end: "right left",
        toggleActions: "play none none reverse",
        //markers: true
      },
    })
    .to(".nav", { color: "#120902", duration: 0.3, ease: "none" })
    .to(
      ".nav-ball",
      { backgroundColor: "#120902", duration: 0.3, ease: "none" },
      0,
    );
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".apartments-section",
        containerAnimation: tlMain,
        start: "left 50%",
        end: "right left",
        toggleActions: "play none none reverse",
        //markers: true
      },
    })
    .to(".nav", { color: "#120902", duration: 0.3, ease: "none" })
    .to(
      ".nav-ball",
      { backgroundColor: "#120902", duration: 0.3, ease: "none" },
      0,
    );
  // Nav Color for Island (dark)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        containerAnimation: tlMain,
        start: "left 50%",
        end: "right 50%",
        onEnter: function () { updateNavTheme("island"); },
        onEnterBack: function () { updateNavTheme("island"); },
        onLeave: function () { updateNavTheme("location"); },
        onLeaveBack: function () { updateNavTheme("apartments"); },
      },
    });
  // Nav Color for Location (dark)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".location-section",
        containerAnimation: tlMain,
        start: "left 50%",
        end: "right 50%",
        onEnter: function () { updateNavTheme("location"); },
        onEnterBack: function () { updateNavTheme("location"); },
        onLeave: function () { updateNavTheme("availability"); },
        onLeaveBack: function () { updateNavTheme("island"); },
      },
    });
  // NAV BALL HOME -------
  let navHome = $("#nav-home").find(".nav-ball");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        containerAnimation: tlMain,
        start: "left left+=150",
        end: "right left",
        //markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
    .fromTo("#nav-home", { pointerEvents: "auto" }, { pointerEvents: "none" })
    .to(
      navHome,
      { x: "-100%", opacity: 1, duration: 0.35, ease: "power1.out" },
      0,
    );
  // Click para a bola ficar no sitio correto
  $("#nav-vision").on("click", function () {
    $(".nav-link").css("pointer-events", "auto");
    setTimeout(() => {
      $(this).css("pointer-events", "none");
    }, 100);
  });
  // NAV BALL VISION -------
  let navVision = $("#nav-vision").find(".nav-ball");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".vision-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right left",
        //markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
    .fromTo("#nav-vision", { pointerEvents: "auto" }, { pointerEvents: "none" })
    .to(
      navVision,
      { x: "-100%", opacity: 1, duration: 0.35, ease: "power1.out" },
      0,
    );
  // Click para a bola ficar no sitio correto
  $("#nav-vision").on("click", function () {
    $(".nav-link").css("pointer-events", "auto");
    setTimeout(() => {
      $(this).css("pointer-events", "none");
    }, 100);
  });
  // NAV BALL APARTMENTS -------
  let navApartments = $("#nav-apartments").find(".nav-ball");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".apartments-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right left",
        //markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
    .fromTo(
      "#nav-apartments",
      { pointerEvents: "auto" },
      { pointerEvents: "none" },
    )
    .to(
      navApartments,
      { x: "-100%", opacity: 1, duration: 0.35, ease: "power1.out" },
      0,
    );
  // Click para a bola ficar no sitio correto
  $("#nav-apartments").on("click", function () {
    $(".nav-link").css("pointer-events", "auto");
    setTimeout(() => {
      $(this).css("pointer-events", "none");
    }, 100);
  });
  // NAV BALL ISLAND -------
  let navIsland = $("#nav-island").find(".nav-ball");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right left",
        //markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
    .fromTo("#nav-island", { pointerEvents: "auto" }, { pointerEvents: "none" })
    .to(
      navIsland,
      { x: "-100%", opacity: 1, duration: 0.35, ease: "power1.out" },
      0,
    );
  // Click para a bola ficar no sitio correto
  $("#nav-island").on("click", function () {
    $(".nav-link").css("pointer-events", "auto");
    setTimeout(() => {
      $(this).css("pointer-events", "none");
    }, 100);
  });
  // NAV BALL LOCATION -------
  let navLocation = $("#nav-location").find(".nav-ball");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".location-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right left",
        //markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
    .fromTo(
      "#nav-location",
      { pointerEvents: "auto" },
      { pointerEvents: "none" },
    )
    .to(
      navLocation,
      { x: "-100%", opacity: 1, duration: 0.35, ease: "power1.out" },
      0,
    );
  // Click para a bola ficar no sitio correto
  $("#nav-location").on("click", function () {
    $(".nav-link").css("pointer-events", "auto");
    setTimeout(() => {
      $(this).css("pointer-events", "none");
    }, 100);
  });
  // NAV BALL AVAILABILITY -------
  let navAvailability = $("#nav-availability").find(".nav-ball");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".availability-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right left",
        //markers: true,
        toggleActions: "play reverse play reverse",
      },
    })
    .fromTo(
      "#nav-availability",
      { pointerEvents: "auto" },
      { pointerEvents: "none" },
    )
    .to(
      navAvailability,
      { x: "-100%", opacity: 1, duration: 0.35, ease: "power1.out" },
      0,
    );
  // Click para a bola ficar no sitio correto
  $("#nav-availability").on("click", function () {
    $(".nav-link").css("pointer-events", "auto");
    setTimeout(() => {
      $(this).css("pointer-events", "none");
    }, 100);
  });
  // EXPAND IMAGE ----------
  // Z-INDEX
  $(".ap-img-a-1, .ap-img-a-2, .ap-img-a-3, .ap-img-a-4").on(
    "click",
    function () {
      $(".ap-img-a-1, .ap-img-a-2, .ap-img-a-3, .ap-img-a-4").css(
        "z-index",
        "2",
      );
      $(this).css("z-index", "20");
    },
  );
  // Animation FLIP
  const img1 = $(".ap-img-a-1");
  const img1back = $(".ap-img-full-screen-1");
  function doFlip() {
    // Get the initial state
    const state = Flip.getState(img1);
    // Animate from the initial state to the end state
    $(".ap-img-full-screen-1").addClass("visible");
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-full-screen-1",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  function backFlip() {
    // Get the initial state
    const state = Flip.getState(img1back);
    $(".ap-img-full-screen-1").removeClass("visible");
    // Animate from the initial state to the end state
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-a-1",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  // click anywhere to flip
  $(".ap-img-a-1").on("click", function () {
    $("body").addClass("no-scroll-transition");
    doFlip();
  });
  $(".ap-img-full-screen-1").on("click", function () {
    $("body").removeClass("no-scroll-transition");
    backFlip();
  });
  // EXPAND IMAGE
  const img2 = $(".ap-img-a-2");
  const img2back = $(".ap-img-full-screen-2");
  function doFlip2() {
    // Get the initial state
    const state = Flip.getState(img2);
    // Animate from the initial state to the end state
    $(".ap-img-full-screen-2").addClass("visible");
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-full-screen-2",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  function backFlip2() {
    // Get the initial state
    const state = Flip.getState(img2back, { props: "z, index" });
    $(".ap-img-full-screen-2").removeClass("visible");
    // Animate from the initial state to the end state
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-a-2",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  // click anywhere to flip
  $(".ap-img-a-2").on("click", function () {
    $("body").addClass("no-scroll-transition");
    doFlip2();
  });
  $(".ap-img-full-screen-2").on("click", function () {
    $("body").removeClass("no-scroll-transition");
    backFlip2();
  });
  // EXPAND IMAGE
  const img3 = $(".ap-img-a-3");
  const img3back = $(".ap-img-full-screen-3");
  function doFlip3() {
    // Get the initial state
    const state = Flip.getState(img3);
    // Animate from the initial state to the end state
    $(".ap-img-full-screen-3").addClass("visible");
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-full-screen-3",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  function backFlip3() {
    // Get the initial state
    const state = Flip.getState(img3back, { props: "z, index" });
    $(".ap-img-full-screen-3").removeClass("visible");
    // Animate from the initial state to the end state
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-a-3",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  // click anywhere to flip
  $(".ap-img-a-3").on("click", function () {
    $("body").addClass("no-scroll-transition");
    doFlip3();
  });
  $(".ap-img-full-screen-3").on("click", function () {
    $("body").removeClass("no-scroll-transition");
    backFlip3();
  });
  // EXPAND IMAGE
  const img4 = $(".ap-img-a-4");
  const img4back = $(".ap-img-full-screen-4");
  function doFlip4() {
    // Get the initial state
    const state = Flip.getState(img4);
    // Animate from the initial state to the end state
    $(".ap-img-full-screen-4").addClass("visible");
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-full-screen-4",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  function backFlip4() {
    // Get the initial state
    const state = Flip.getState(img4back, { props: "z, index" });
    $(".ap-img-full-screen-4").removeClass("visible");
    // Animate from the initial state to the end state
    Flip.from(state, {
      duration: 1,
      targets: ".ap-img-a-4",
      absolute: true,
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }
  // click anywhere to flip
  $(".ap-img-a-4").on("click", function () {
    $("body").addClass("no-scroll-transition");
    doFlip4();
  });
  $(".ap-img-full-screen-4").on("click", function () {
    $("body").removeClass("no-scroll-transition");
    backFlip4();
  });
  // END EXPAND IMAGE
  // THE ISLAND ------
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right right",
        scrub: true,
        //markers: true
      },
    })
    .to(".island-component", { xPercent: 100, ease: "none" });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        containerAnimation: tlMain,
        start: "10% left",
        end: "right right",
        scrub: true,
        //toggleActions: "play none none reverse",
        //markers: true
      },
    })
    .to(".island-background-video", {
      width: "100%",
      height: "100%",
      marginTop: 0,
    });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        containerAnimation: tlMain,
        start: "10% left",
        end: "20% left",
        scrub: true,
        //toggleActions: "play none none reverse",
        //markers: true
      },
    })
    .to(".island-cima", {
      y: "-50%",
      rotationX: "60_cw",
      opacity: 0,
      ease: "none",
    })
    .to(
      ".island-baixo",
      { y: "50%", rotationX: "-60_ccw", opacity: 0, ease: "none" },
      0,
    );
  // END THE ISLAND
  // LOCATION ------
  let currentDesktopAmenityIdx = 1;
  window.setAmenityScrollIndex = function (idx) {
    currentDesktopAmenityIdx = idx;
  };

  function updateAmenityDot(idx) {
    $(".amenity-dot-btn").removeClass("active");
    $(".amenity-dot-btn[data-index='" + idx + "']").addClass("active");
    if (typeof window.showAmenity === "function") {
      window.showAmenity(idx - 1);
    } else {
      var cards = [
        document.querySelector(".location-info-wrap.n1"),
        document.querySelector(".location-info-wrap.n2"),
        document.querySelector(".location-info-wrap.n3"),
        document.querySelector(".location-info-wrap.n4"),
      ];
      cards.forEach(function (card, i) {
        if (!card) return;
        if (i === idx - 1) {
          if (window.gsap) {
            gsap.killTweensOf(card);
            gsap.set(card, { zIndex: 5, pointerEvents: "auto" });
            gsap.to(card, { opacity: 1, duration: 0.55, ease: "power2.out", overwrite: true });
          } else {
            card.style.zIndex = "5";
            card.style.opacity = "1";
            card.style.pointerEvents = "auto";
          }
        } else {
          if (window.gsap) {
            gsap.killTweensOf(card);
            gsap.set(card, { zIndex: 1, pointerEvents: "none" });
            gsap.to(card, { opacity: 0, duration: 0.45, ease: "power2.out", overwrite: true });
          } else {
            card.style.zIndex = "1";
            card.style.opacity = "0";
            card.style.pointerEvents = "none";
          }
        }
      });
    }
  }

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".location-trigger",
        containerAnimation: tlMain,
        start: "left left",
        end: "right right",
        scrub: true,
        //markers: true,
        onUpdate: function (self) {
          const p = self.progress;
          let target = 1;
          if (p < 0.23) {
            target = 1;
          } else if (p < 0.48) {
            target = 2;
          } else if (p < 0.72) {
            target = 3;
          } else {
            target = 4;
          }
          if (target !== currentDesktopAmenityIdx) {
            currentDesktopAmenityIdx = target;
            updateAmenityDot(target);
          }
        },
      },
    })
    .to(".location-sticky", { x: "100vw", ease: "none" })
    .to(".location-update-line", { height: "100%", ease: "none" }, 0);
  // END LOCATION
  // AVAILABILITY ------
  var trackHeight = $(this).outerHeight();
  function setAvailabityHeights() {
    $(".scroll-track").each(function (index) {
      trackHeight = $(this).outerHeight();
      //$(this).height(trackHeight);
    });
  }
  setAvailabityHeights();
  window.addEventListener("resize", function () {
    setAvailabityHeights();
  });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".availability-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right right",
        scrub: true,
        //markers: true
      },
    })
    .to(".availability-anda", { x: "100vw", ease: "none" });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".availability-scroll-absolute",
        containerAnimation: tlMain,
        start: "left left",
        end: "right right",
        scrub: true,
        //markers: true
      },
    })
    .to(".scroll-track", { y: "-" + trackHeight, ease: "none" });
  // END AVAILABILITY
  // TEXT ANIMATION -----------
  $("[anim=1]").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(this).find(".chars");
    let tlwords = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        containerAnimation: tlMain,
        start: "0% right-=150",
        end: "right right",
        //markers: true,
        toggleActions: "play none none reverse",
      },
    });
    tlwords.from(targetElement, {
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.8,
        ease: "none",
        from: "random",
      },
    });
  });

  // END Titulo
  // IMAGEM APARECE
  $(".vision-img-wrap").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(this);
    let castanho = $(this).siblings(".vision-img-brown");
    let tlImg = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        containerAnimation: tlMain,
        start: "0% right-=150",
        end: "right right",
        //markers: true,
        toggleActions: "play none none reverse",
      },
    });
    tlImg.fromTo(
      castanho,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        duration: 0.7,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power1.out",
      },
    );
    tlImg.fromTo(
      targetElement,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        duration: 0.7,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power1.out",
      },
      0.5,
    );
  });

  // END TEXT ANIMATION -----------
  // IMAGE PARALLAX -------
  // Hero Image
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        containerAnimation: tlMain,
        start: "left left",
        end: "right left",
        scrub: true,
        //markers: true
      },
    })
    .fromTo(".hero-img-background", { x: "0%" }, { x: "30%" });

  // ABOUT US (Vision) Parallax
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".vision-section",
        containerAnimation: tlMain,
        start: "left right",
        end: "right left",
        scrub: true,
      },
    })
    .fromTo(".about-hero-img", { x: "-12%" }, { x: "12%", ease: "none" })
    .fromTo(".about-chess-img", { scale: 1 }, { scale: 1.15, ease: "none" }, 0)
    .fromTo(".about-left-col", { x: "25px" }, { x: "-25px", ease: "none" }, 0);

  // ISLAND Image
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        containerAnimation: tlMain,
        start: "50% left",
        end: "right left",
        scrub: true,
        //markers: true
      },
    })
    .fromTo(".island-background-video", { x: "0%" }, { x: "30%" });
  // LOCATION Big Image Parallax & Next Section Parallax
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".location-big-img-wrap",
        containerAnimation: tlMain,
        start: "left right",
        end: "right left",
        scrub: true,
      },
    })
    .fromTo(".location-big-img", { x: "-5%" }, { x: "0%", ease: "none" })
    .fromTo(".location-quote-box", { x: "-60px" }, { x: "60px", ease: "none" }, 0);

  // FOOTER
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".availability-section",
        containerAnimation: tlMain,
        start: "25% left",
        end: "right 99%",
        scrub: true,
        //markers: true
      },
    })
    .from(".inquire-section", { y: "-60%" })
    .from(".inquire-background-img", { y: "30%" }, 0);
  // END IMAGE PARALLAX -------
});
// END HORIZONTAL SCROLL ----------

// Form Floating Label -------
$(".c-text-field").on("focusin", function () {
  $(this).siblings(".form-field-label").addClass("form-field-focused");
  $(this).siblings(".form-field-label").addClass("focused");
});

$(".c-text-field").on("focusout", function () {
  if ($(this).val().length == 0) {
    $(this).siblings(".form-field-label").removeClass("form-field-focused");
    $(this).siblings(".form-field-label").removeClass("focused");
  }
});
// End Form Floating Label -------

// Form Error
$(".c-text-field").removeClass("cc-error");
function errorMessage() {
  if ($(".c-text-field").hasClass("cc-error")) {
    $(".form-please-wrap").addClass("error");
  } else {
    $(".form-please-wrap").removeClass("error");
  }
}
$(".c-form_field, .form-button-wrap").on("mouseenter mouseleave", function () {
  errorMessage();
});
$(".form-botton, .form").on("click", function () {
  setTimeout(() => {
    errorMessage();
  }, 200);
});
// END Form Error

// Inquire Open --------
// NEW TEXT LOAD
function textInquire() {
  let targetElement = $("[inquire=text]").find(".chars");
  $("[inquire=text]").each(function (index) {
    let tload = gsap.timeline({});
    tload.to(targetElement, {
      opacity: 1,
      duration: 1,
      stagger: {
        amount: 0.8,
        ease: "none",
        from: "random",
      },
    });
  });
}
$(".nav-link.inquire, .cta-link.inquire, .inquire-cta-wrap").on(
  "click",
  function () {
    $(".inquire-open").removeClass("close");
    $("body").addClass("no-scroll-transition");
    setTimeout(() => {
      $(".inquire-wrap").removeClass("close");
      setTimeout(() => {
        textInquire();
      }, 600);
    }, 100);
  },
);
$(".nav-link.inquire-close").on("click", function () {
  $(".inquire-wrap").addClass("close");
  $("body").removeClass("no-scroll-transition");
  setTimeout(() => {
    $("[inquire=text]").find(".chars").css("opacity", "0");
    $(".inquire-open").addClass("close");
  }, 1000);
});
// END Inquire Open

// Resize PC to TABLET - TABLET to PC - Reload Site
var pc = window.matchMedia("(min-width: 992px)");
var tabletM = window.matchMedia("(max-width: 991px)");
var pcM;
var tabletV;

function pcSize() {
  if (pc.matches) {
    pcM = true;
  }
}
pcSize();

function tabletSize() {
  if (tabletM.matches) {
    tabletV = true;
  }
}
tabletSize();

$(window).on("resize", function () {
  function tablet() {
    if ((tabletV === true || tabletM.matches) && (pcM === true || pc.matches)) {
      // If media query matches
      location.reload();
      pcM = false;
      tabletV = false;
    }
  }
  tablet();
  pcSize();
  tabletSize();
});
// END Resize PC to TABLET - TABLET to PC - Reload Site

// MOBILE GSAP
horizontalM.add("(max-width: 991px)", () => {
  // Nav Color 1
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".vision-section",
        start: "top top",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
        //markers: true
      },
    })
    .to(".nav", { color: "#120902", duration: 0.3, ease: "none" });
  // Mobile Nav Color for Island (dark)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".island-section",
        start: "top 70px",
        end: "bottom 70px",
        onEnter: function () { updateNavTheme("island"); },
        onEnterBack: function () { updateNavTheme("island"); },
        onLeave: function () { updateNavTheme("location"); },
        onLeaveBack: function () { updateNavTheme("apartments"); },
      },
    });
  // Mobile Nav Color for Location (dark)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".location-section",
        start: "top 70px",
        end: "bottom 70px",
        onEnter: function () { updateNavTheme("location"); },
        onEnterBack: function () { updateNavTheme("location"); },
        onLeave: function () { updateNavTheme("availability"); },
        onLeaveBack: function () { updateNavTheme("island"); },
      },
    });
  // Mobile smooth anchor scroll
  document.querySelectorAll(".nav-links-component .nav-link").forEach((element) => {
    element.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const id = href.substring(1);
          setActiveNav(id);
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });


  // Mobile About Us vertical parallax
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".vision-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(".about-hero-img", { y: "-10%" }, { y: "10%", ease: "none" });

  // END MOBILE GSAP
  // TEXT ANIMATION -----------
  $("[anim=1]").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(this).find(".chars");
    let tlwords = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 90%",
        end: "bottom bottom",
        //markers: true,
        toggleActions: "play none none reverse",
      },
    });
    tlwords.from(targetElement, {
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.8,
        ease: "none",
        from: "random",
      },
    });
  });
  // LOCATION ------
  let currentMobileAmenityIdx = 1;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".location-section",
        start: "top top",
        end: "85% bottom",
        scrub: true,
        onUpdate: function (self) {
          const p = self.progress;
          let target = 1;
          if (p < 0.25) {
            target = 1;
          } else if (p < 0.50) {
            target = 2;
          } else if (p < 0.75) {
            target = 3;
          } else {
            target = 4;
          }
          if (target !== currentMobileAmenityIdx) {
            currentMobileAmenityIdx = target;
            updateAmenityDot(target);
          }
        },
      },
    })
    .to(".location-update-line", { width: "100%", ease: "none" });
  // END LOCATION
  // IMAGE PARALLAX --------
  // Hero
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true
      },
    })
    .fromTo(".hero-img-background", { y: "0%" }, { y: "15%" });
  // END IMAGE PARALLAX --------
});

// Image HOVER Animation
$("#one24-img, #island-img").each(function () {
  // Each define esta function a cada um com esta class
  let targetElement1 = $(".vision-img.n1");
  let targetElement2 = $(".vision-img.n2");
  let animation1 = gsap.fromTo(
    targetElement1,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    {
      paused: true,
      duration: 0.75,
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      ease: "power1.out",
    },
  );
  let animation2 = gsap.fromTo(
    targetElement2,
    {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    },
    {
      paused: true,
      duration: 0.75,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.out",
      onComplete: () => {
        animation1island.progress(0).pause();
        animation2island.progress(0).pause();
      },
    },
  );
  let animation1island = gsap.fromTo(
    targetElement2,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    {
      paused: true,
      duration: 0.75,
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      ease: "power1.out",
    },
  );
  let animation2island = gsap.fromTo(
    targetElement1,
    {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    },
    {
      paused: true,
      duration: 0.75,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.out",
      onComplete: () => {
        animation1.progress(0).pause();
        animation2.progress(0).pause();
      },
    },
  );
  // Problemas na animação- facil resolução
  var islandV = false;

  $("#island-img").on("mouseenter", function () {
    if (islandV === true) {
      animation1.play();
      animation2.play();
    }
  });

  $("#one24-img").on("mouseenter", function () {
    islandV = true;
    animation1island.play();
    animation2island.play();
  });
});
// END Image Hover Animation
