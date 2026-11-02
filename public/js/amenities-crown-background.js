(function () {
  'use strict';

  var attempts = 0;
  function init() {
    var panel = document.getElementById('amenitiesTitle');
    if (!panel || !window.gsap || !window.ScrollTrigger) return;
    var crown = panel.querySelector('.crown-rise');
    var wipe = panel.querySelector('.line-wipe');
    var art = panel.querySelector('.amenities-crown-art');
    if (!crown || !wipe || !art) return;

    // The main horizontal timeline may be created after this script is loaded.
    var desktop = matchMedia('(min-width: 1025px) and (pointer: fine) and (not (any-pointer: coarse)), (min-width: 1401px) and (pointer: fine) and (any-pointer: coarse)').matches;
    if (desktop && !window.tlMain && attempts++ < 120) {
      requestAnimationFrame(init);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    var construction = window.createCrownConstruction(crown);
    gsap.matchMedia().add({
      desktop: '(min-width: 1025px) and (pointer: fine) and (not (any-pointer: coarse)), (min-width: 1401px) and (pointer: fine) and (any-pointer: coarse)',
      mobile: '(max-width: 1024px), (max-width: 1400px) and (any-pointer: coarse), (any-pointer: coarse) and (max-width: 1400px)',
      reduced: '(prefers-reduced-motion: reduce)'
    }, function (context) {
      // Responsive layouts show only the title and paragraph.
      if (context.conditions.mobile) return;
      function frameArt() {
        var compact = context.conditions.mobile;
        var portrait = compact && innerWidth / innerHeight < 1.6;
        art.setAttribute('viewBox', portrait ? '1000 -440 842 1294' : '0 0 1842 854');
        art.setAttribute('preserveAspectRatio', compact ? 'xMidYMax meet' : 'xMidYMid slice');
      }
      frameArt();
      ScrollTrigger.addEventListener('refreshInit', frameArt);
      if (context.conditions.reduced) {
        construction.showFinished();
        return function () { ScrollTrigger.removeEventListener('refreshInit', frameArt); };
      }
      var horizontal = context.conditions.desktop && window.tlMain;
      if (context.conditions.desktop && !horizontal) {
        ScrollTrigger.removeEventListener('refreshInit', frameArt);
        return;
      }

      gsap.set(wipe, { x: -2000 });
      construction.reset();
      // Give the reveal more scroll distance without adding a pause at the end.
      function scrollDistance() {
        return Math.round(innerHeight * (matchMedia('(max-width: 1024px), (max-width: 1400px) and (any-pointer: coarse)').matches ? 1.92 : 2.56));
      }
      var trigger = {
        id: 'amenities-crown-background',
        trigger: panel,
        start: 'top top',
        end: function () { return '+=' + scrollDistance(); },
        scrub: 1.3,
        invalidateOnRefresh: true
      };
      var cleanupHold = null;
      if (horizontal) {
        var location = panel.closest('.location-section');
        var track = panel.closest('.track');
        var sectionHeight = panel.closest('.section-height');
        var stage = document.createElement('div');
        stage.className = 'amenities-crown-stage';
        while (panel.firstChild) stage.appendChild(panel.firstChild);
        panel.appendChild(stage);
        var holdDistance = 0;
        var animationDistance = 0;

        function sizeHold() {
          location.removeAttribute('data-crown-hold');
          var originalWidth = location.offsetWidth;
          animationDistance = scrollDistance();
          // Keep just a small buffer before the next section starts moving in.
          holdDistance = animationDistance + Math.round(innerWidth * .06);
          location.style.setProperty('--crown-location-width', originalWidth + holdDistance + 'px');
          location.style.setProperty('--crown-panel-width', innerWidth + holdDistance + 'px');
          location.setAttribute('data-crown-hold', '');
          if (sectionHeight && track) sectionHeight.style.height = track.offsetWidth + 'px';
        }
        sizeHold();
        horizontal.scrollTrigger.refresh();
        ScrollTrigger.addEventListener('refreshInit', sizeHold);

        // Counter the moving track instead of nesting a pin inside containerAnimation.
        gsap.fromTo(stage, { x: 0 }, {
          x: function () { return holdDistance; }, ease: 'none',
          scrollTrigger: {
            id: 'amenities-crown-hold', trigger: panel,
            containerAnimation: horizontal, start: 'left left',
            end: function () { return '+=' + holdDistance; },
            scrub: true, invalidateOnRefresh: true
          }
        });
        trigger.containerAnimation = horizontal;
        // Begin revealing during the entrance, while keeping the finish inside the hold.
        trigger.start = 'left 85%';
        trigger.end = function () { return '+=' + (animationDistance + innerWidth * .85); };
        cleanupHold = function () {
          ScrollTrigger.removeEventListener('refreshInit', sizeHold);
          while (stage.firstChild) panel.insertBefore(stage.firstChild, stage);
          stage.remove();
          location.removeAttribute('data-crown-hold');
          location.style.removeProperty('--crown-location-width');
          location.style.removeProperty('--crown-panel-width');
          if (sectionHeight && track) sectionHeight.style.height = track.offsetWidth + 'px';
        };
      } else {
        // Keep normal document flow on touch screens: no pin spacer or extra scroll height.
        trigger.start = 'top 85%';
        trigger.end = 'top 20%';
        trigger.scrub = .8;
      }

      var scene = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: trigger })
        .fromTo(wipe, { x: -2000 }, { x: 0, duration: 2.6, ease: 'sine.inOut', immediateRender: false }, 0);
      construction.animate(scene, 1.640574)
        .to({}, { duration: horizontal ? 0 : .12 });
      return function () {
        ScrollTrigger.removeEventListener('refreshInit', frameArt);
        if (cleanupHold) cleanupHold();
      };
    });
    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
