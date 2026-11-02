(function () {
  'use strict';

  var attempts = 0;
  function init() {
    var panel = document.getElementById('amenitiesTitle');
    if (!panel || !window.gsap || !window.ScrollTrigger) return;
    var crown = panel.querySelector('.crown-rise');
    var wipe = panel.querySelector('.line-wipe');
    if (!crown || !wipe) return;

    // The main horizontal timeline may be created after this script is loaded.
    var desktop = matchMedia('(min-width: 1025px) and (pointer: fine)').matches;
    if (desktop && !window.tlMain && attempts++ < 120) {
      requestAnimationFrame(init);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add({
      desktop: '(min-width: 1025px) and (pointer: fine)',
      mobile: '(max-width: 1024px), (pointer: coarse)',
      reduced: '(prefers-reduced-motion: reduce)'
    }, function (context) {
      if (context.conditions.reduced) {
        gsap.set(crown, { y: 0, autoAlpha: 1 });
        return;
      }
      var horizontal = context.conditions.desktop && window.tlMain;
      if (context.conditions.desktop && !horizontal) return;

      gsap.set(wipe, { x: -2000 });
      gsap.set(crown, { y: 640, autoAlpha: 1 });
      // Match public/crown-lifestyle.html's scroll distance, not just its tween durations.
      function scrollDistance() {
        return Math.round(innerHeight * (matchMedia('(max-width: 1024px)').matches ? 1.3 : 1.6));
      }
      var trigger = {
        id: 'amenities-crown-background',
        trigger: panel,
        start: 'top top',
        end: function () { return '+=' + scrollDistance(); },
        scrub: 1.1,
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
        trigger.start = 'left left';
        trigger.end = function () { return '+=' + animationDistance; };
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
        trigger.pin = true;
        trigger.pinSpacing = true;
        trigger.anticipatePin = 1;
        trigger.end = function () { return '+=' + (scrollDistance() + innerHeight * .06); };
      }

      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: trigger })
        .fromTo(wipe, { x: -2000 }, { x: 0, duration: 2.2, ease: 'sine.inOut', immediateRender: false }, 0)
        .fromTo(crown, { y: 640 }, { y: 0, duration: 2.3, ease: 'power2.out', immediateRender: false }, 1.388178)
        .to({}, { duration: horizontal ? 0 : .12 });
      return cleanupHold;
    });
    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
