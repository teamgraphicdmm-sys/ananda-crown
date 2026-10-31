/* Demand-loaded hero sequence. Keep all frames; bound network concurrency and decoded memory. */
(function () {
  function init() {
    var canvas = document.getElementById('hero-video-canvas');
    var home = document.getElementById('home');
    if (!canvas || !home || !window.gsap) return;
    var context = canvas.getContext('2d');
    if (!context) return;
    var track = document.querySelector('.track');
    var stage = document.getElementById('hero-sticky-stage');
    var text = document.querySelector('.ref-hero-container');
    var firstImage = home.querySelector('img.hero-image-background');
    var reduced = matchMedia('(prefers-reduced-motion: reduce)');
    var connection = navigator.connection || {};
    var mobile = innerWidth <= 1024 || matchMedia('(pointer: coarse)').matches;
    var directory = new URL('videos/' + (mobile ? 'hero-frames-mobile/' : 'hero-frames-webp/'), document.baseURI);
    var frames = new Map(), pending = new Set(), queue = [], failures = new Set();
    var active = 0, frameCount = 169, cacheLimit = mobile ? 20 : 36;
    var progress = 0, desired = 0, lastDrawn = -1, dirty = true, activeUntil = 0;
    function request(index, priority) {
      if (frames.has(index) || pending.has(index) || failures.has(index)) return;
      pending.add(index);
      if (priority) queue.unshift(index); else queue.push(index);
      pump();
    }
    function pump() {
      if (document.hidden) return;
      while (active < 3 && queue.length) {
        (function (index) {
          active++;
          var image = new Image();
          image.decoding = 'async';
          image.fetchPriority = index === 0 ? 'high' : 'low';
          image.onload = async function () {
            if (image.decode) await image.decode().catch(function () {});
            active--; pending.delete(index); frames.set(index, image); dirty = true;
            // Release distant decoded images. Revisiting uses the browser's HTTP cache.
            for (var key of frames.keys()) {
              if (frames.size <= cacheLimit) break;
              if (key !== 0 && Math.abs(key - desired) > 8) frames.delete(key);
            }
            pump();
          };
          image.onerror = function () { active--; pending.delete(index); failures.add(index); pump(); };
          image.src = index === 0 && firstImage
            ? (firstImage.currentSrc || firstImage.src)
            : new URL('frame_' + String(index + 1).padStart(4, '0') + '.webp', directory).href;
        })(queue.shift());
      }
    }
    function draw(index) {
      var closest = -1, distance = Infinity;
      frames.forEach(function (image, key) {
        var delta = Math.abs(key - index);
        if (delta < distance) { distance = delta; closest = key; }
      });
      if (closest < 0 || closest === lastDrawn) return;
      var image = frames.get(closest);
      var scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      var width = image.naturalWidth * scale, height = image.naturalHeight * scale;
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      lastDrawn = closest;
    }
    function desktop() { return typeof window.isDesktopScrollMode === 'function' ? window.isDesktopScrollMode() : innerWidth > 1024; }
    function resize() {
      canvas.width = Math.min(innerWidth, 1920);
      canvas.height = Math.round(innerHeight * canvas.width / innerWidth);
      lastDrawn = -1; dirty = true;
    }
    function update() {
      if (document.hidden || (!dirty && performance.now() > activeUntil)) return;
      var isDesktop = desktop(), raw = 0;
      if (isDesktop && track) {
        var hold = innerWidth * 1.5;
        var shift = Math.max(0, -track.getBoundingClientRect().left);
        raw = Math.min(1, shift / hold);
        if (stage) stage.style.transform = 'translate3d(' + Math.min(hold, shift).toFixed(1) + 'px,0,0)';
      } else {
        if (stage) stage.style.transform = 'none';
        var rect = home.getBoundingClientRect();
        raw = Math.max(0, Math.min(1, -rect.top / Math.max(1, home.offsetHeight - innerHeight)));
      }
      progress += (raw - progress) * .18;
      if (Math.abs(raw - progress) < .0005) { progress = raw; dirty = false; }
      var staticOnly = reduced.matches || connection.saveData;
      desired = staticOnly ? 0 : Math.round(Math.min(1, progress / .88) * (frameCount - 1));
      request(desired, true);
      if (!staticOnly) {
        // Fetch the nearby frames first, rather than 169 simultaneous downloads.
        for (var offset = 1; offset <= 6; offset++) {
          if (desired + offset < frameCount) request(desired + offset, false);
          if (desired - offset >= 0) request(desired - offset, false);
        }
        // Drop stale queued requests when someone jumps far through the page.
        queue = queue.filter(function (index) {
          if (Math.abs(index - desired) <= 12 || index === 0) return true;
          pending.delete(index); return false;
        });
      }
      draw(desired);
      if (text) {
        var amount = Math.min(1, progress / (isDesktop ? .25 : .35));
        text.style.opacity = (1 - amount).toFixed(3);
        text.style.transform = 'translate3d(0,' + (-amount * (isDesktop ? 40 : 35)).toFixed(2) + 'px,0)';
        text.style.pointerEvents = amount > .95 ? 'none' : 'auto';
      }
    }
    function invalidate() { dirty = true; activeUntil = performance.now() + 1500; }
    request(0, true); resize();
    gsap.ticker.add(update);
    addEventListener('scroll', invalidate, { passive: true });
    addEventListener('resize', resize, { passive: true });
    if (window.lenis) window.lenis.on('scroll', invalidate);
    if (window.ScrollTrigger) ScrollTrigger.addEventListener('refresh', invalidate);
    reduced.addEventListener('change', invalidate);
    document.addEventListener('visibilitychange', function () { dirty = true; pump(); });
    addEventListener('pageshow', invalidate);
    window.heroSequenceStats = function () { return { cachedFrames: frames.size, pendingFrames: pending.size, activeRequests: active, currentFrame: desired, renderedFrame: lastDrawn }; };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
