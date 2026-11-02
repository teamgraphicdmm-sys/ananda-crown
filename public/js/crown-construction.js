(function () {
  'use strict';
  var count = 0;
  var ns = 'http://www.w3.org/2000/svg';

  window.createCrownConstruction = function (crown) {
    var svg = crown.ownerSVGElement;
    var finish = crown.querySelector('image');
    var rough = finish.cloneNode(true);
    var mask = document.createElementNS(ns, 'mask');
    var id = 'crown-brick-mask-' + (++count);
    mask.setAttribute('id', id);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('x', '1280');
    mask.setAttribute('y', '25');
    mask.setAttribute('width', '310');
    mask.setAttribute('height', '625');
    mask.style.maskType = 'luminance';
    var rows = [];
    // Lay staggered masonry courses from the foundation to the tip.
    for (var row = 0; row < 25; row++) {
      var group = document.createElementNS(ns, 'g');
      group.setAttribute('fill', 'white');
      var y = 611 - row * 24;
      for (var x = 1270 - (row % 2) * 17; x < 1590; x += 34) {
        var brick = document.createElementNS(ns, 'rect');
        brick.setAttribute('x', x);
        brick.setAttribute('y', y);
        brick.setAttribute('width', '32.6');
        brick.setAttribute('height', '22.6');
        group.appendChild(brick);
      }
      mask.appendChild(group);
      rows.push(group);
    }
    svg.querySelector('defs').appendChild(mask);
    rough.setAttribute('mask', 'url(#' + id + ')');
    rough.style.opacity = '0';
    crown.insertBefore(rough, finish);

    return {
      reset: function () {
        gsap.set(crown, { y: 0, autoAlpha: 1 });
        gsap.set(rows, { opacity: 0, y: 8 });
        gsap.set(rough, { opacity: 1 });
        gsap.set(finish, { opacity: 0 });
      },
      animate: function (timeline, start) {
        timeline
          .fromTo(rows, { opacity: 0, y: 8 }, {
            opacity: 1, y: 0, duration: .18,
            stagger: { amount: 1.8, from: 'start' },
            ease: 'power2.out', immediateRender: false
          }, start)
          .fromTo(finish, { opacity: 0 }, {
            opacity: 1, duration: .55, ease: 'sine.inOut', immediateRender: false
          }, start + 1.85)
          .fromTo(rough, { opacity: 1 }, {
            opacity: 0, duration: .35, ease: 'sine.inOut', immediateRender: false
          }, start + 2.05);
        return timeline;
      },
      showFinished: function () {
        gsap.set(crown, { y: 0, autoAlpha: 1 });
        gsap.set(rough, { opacity: 0 });
        gsap.set(finish, { opacity: 1 });
      }
    };
  };
})();
