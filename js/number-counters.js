/* Count numeric text once when visible, including horizontally translated panels. */
(function () {
  'use strict';
  function init() {
    if (!window.gsap || !window.IntersectionObserver) return;
    var selector = '.ap-spec-size, #residence-family-layouts .residence-format-choice > small, .about-pillar-label, .ap-highlight-name';
    var reduced = matchMedia('(prefers-reduced-motion: reduce)');
    var records = new WeakMap(), active = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < .15) return;
        observer.unobserve(entry.target);
        var record = records.get(entry.target);
        if (!record || record.played) return;
        record.played = true;
        if (reduced.matches) return;
        record.parts.forEach(function (part) { part.node.nodeValue = format(0, part); });
        var state = { progress: 0 };
        record.tween = gsap.to(state, {
          progress: 1, duration: 1.6, ease: 'power2.out',
          onUpdate: function () {
            if (!entry.target.isConnected) { record.tween.kill(); active.delete(record); return; }
            record.parts.forEach(function (part) {
              var value = format(part.value * state.progress, part);
              if (part.node.nodeValue !== value) part.node.nodeValue = value;
            });
          },
          onComplete: function () { finish(record); }
        });
        active.add(record);
      });
    }, { threshold: [.15], rootMargin: '0px' });
    function format(value, part) {
      return value.toLocaleString('en-US', { useGrouping: part.grouped, minimumFractionDigits: part.decimals, maximumFractionDigits: part.decimals });
    }
    function finish(record) {
      record.parts.forEach(function (part) { part.node.nodeValue = part.original; });
      active.delete(record);
    }
    function prepare(element) {
      if (records.has(element)) return;
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      var nodes = [], node, parts = [];
      while ((node = walker.nextNode())) {
        if (!node.parentElement.closest('[data-count-number], .count-accessible, script, style')) nodes.push(node);
      }
      nodes.forEach(function (textNode) {
        var text = textNode.nodeValue, pattern = /\d[\d,]*(?:\.\d+)?/g, match, last = 0, fragment = document.createDocumentFragment();
        while ((match = pattern.exec(text))) {
          fragment.append(document.createTextNode(text.slice(last, match.index)));
          var span = document.createElement('span');
          span.className = 'count-number'; span.setAttribute('data-count-number', ''); span.setAttribute('aria-hidden', 'true');
          var valueNode = document.createTextNode(match[0]); span.append(valueNode);
          var accessible = document.createElement('span'); accessible.className = 'count-accessible'; accessible.textContent = match[0];
          fragment.append(span, accessible);
          parts.push({ span: span, node: valueNode, original: match[0], value: Number(match[0].replace(/,/g, '')), grouped: match[0].includes(','), decimals: (match[0].split('.')[1] || '').length });
          last = pattern.lastIndex;
        }
        if (last) { fragment.append(document.createTextNode(text.slice(last))); textNode.replaceWith(fragment); }
      });
      var record = { parts: parts, played: false, tween: null };
      records.set(element, record);
      if (!parts.length) return;
      // Reserve final widths before counting so neighbouring text does not move.
      parts.forEach(function (part) { part.span.style.minWidth = part.span.offsetWidth + 'px'; });
      observer.observe(element);
    }
    document.querySelectorAll(selector).forEach(prepare);
    var credentials = document.getElementById('crown-leadership-credentials');
    if (credentials) new MutationObserver(function (changes) {
      changes.forEach(function (change) {
        change.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches(selector)) prepare(node);
          node.querySelectorAll(selector).forEach(prepare);
        });
      });
    }).observe(credentials, { childList: true });
    reduced.addEventListener('change', function () {
      if (!reduced.matches) return;
      active.forEach(function (record) { record.tween.kill(); finish(record); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
