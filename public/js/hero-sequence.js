/* Demand-loaded hero sequence. Prioritize visible and upcoming frames; bound network concurrency and decoded memory. */
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
    var mobile = innerWidth <= 1024;
    var frameDirectory = mobile ? canvas.dataset.mobileFrames : canvas.dataset.desktopFrames;
    var directory = new URL(frameDirectory || ('videos/' + (mobile ? 'hero-frames-mobile/' : 'hero-frames-webp/')), document.baseURI);
    var frames = new Map(), pending = new Set(), queue = [], failures = new Set();
    var active = 0, frameCount = Number(canvas.dataset.frameCount) || 169, cacheLimit = mobile ? 48 : 64;
    var progress = 0, desired = 0, lastDrawn = -1, dirty = true, activeUntil = 0;
    var scrollStarted = false, warm = false, previousDesired = 0, direction = 1;
    function request(index, priority) {
      if (frames.has(index) || failures.has(index)) return;
      if (pending.has(index)) {
        // A frame first queued as a neighbour becomes urgent when scrolling reaches it.
        var position = priority ? queue.indexOf(index) : -1;
        if (position > 0) { queue.splice(position, 1); queue.unshift(index); }
        return;
      }
      pending.add(index);
      if (priority) queue.unshift(index); else queue.push(index);
      pump();
    }
    function pump() {
      if (document.hidden) return;
      while (active < 4 && queue.length) {
        (function (index) {
          active++;
          var image = new Image();
          image.decoding = 'async';
          image.fetchPriority = index === 0 || index === desired ? 'high' : 'low';
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
      if (desired !== previousDesired) direction = desired > previousDesired ? 1 : -1;
      previousDesired = desired;
      // Remove obsolete work before starting more downloads during a fast scrub.
      queue = queue.filter(function (index) {
        if (Math.abs(index - desired) <= 16 || index === 0) return true;
        pending.delete(index); return false;
      });
      request(desired, true);
      if (!staticOnly && (scrollStarted || warm)) {
        for (var offset = 1; offset <= 12; offset++) {
          var ahead = desired + offset * direction;
          if (ahead >= 0 && ahead < frameCount) request(ahead, false);
        }
        var behind = desired - direction;
        if (behind >= 0 && behind < frameCount) request(behind, false);
      }
      draw(desired);
      if (text) {
        // Fade through the first five frames, then leave the video unobstructed.
        var amount = Math.min(1, Math.max(0, progress / .88) * (frameCount - 1) / 2.5);
        text.style.opacity = (1 - amount).toFixed(3);
        text.style.visibility = amount >= 1 ? 'hidden' : 'visible';
        if (text.inert !== (amount >= 1)) text.inert = amount >= 1;
        text.style.transform = 'translate3d(0,' + (-amount * (isDesktop ? 40 : 35)).toFixed(2) + 'px,0)';
        text.style.pointerEvents = amount > .95 ? 'none' : 'auto';
      }
    }
    function invalidate() { dirty = true; activeUntil = performance.now() + 1500; }
    function onScroll() { if (scrollY > 0 || progress > 0) scrollStarted = true; invalidate(); }
    function warmFrames() {
      if (reduced.matches || connection.saveData) return;
      warm = true; invalidate();
    }
    // Leave the initial paint uncontested, then prepare the first scroll in idle time.
    function scheduleWarmup() {
      if ('requestIdleCallback' in window) requestIdleCallback(warmFrames, { timeout: 1200 });
      else setTimeout(warmFrames, 200);
    }
    if (document.readyState === 'complete') scheduleWarmup();
    else addEventListener('load', scheduleWarmup, { once: true });
    request(0, true); resize();
    gsap.ticker.add(update);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', resize, { passive: true });
    if (window.lenis) window.lenis.on('scroll', onScroll);
    if (window.ScrollTrigger) ScrollTrigger.addEventListener('refresh', invalidate);
    reduced.addEventListener('change', invalidate);
    document.addEventListener('visibilitychange', function () { dirty = true; pump(); });
    addEventListener('pageshow', invalidate);
    window.heroSequenceStats = function () { return { cachedFrames: frames.size, pendingFrames: pending.size, activeRequests: active, currentFrame: desired, renderedFrame: lastDrawn }; };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
