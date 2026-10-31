/* Responsive-only layout adjustments; restore original DOM placement on desktop. */
(function () {
  function init() {
    var compact = matchMedia('(max-width:1024px)');
    var dropdown = document.querySelector('.amenity-points-dropdown');
    var toggle = dropdown && dropdown.querySelector('.amenity-points-toggle');
    var panel = dropdown && dropdown.querySelector('.amenity-points-panel');
    var refreshTimer;
    function setAmenityDropdown(open) {
      if (!toggle) return;
      dropdown.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? 'Click to collapse' : 'Click to expand';
      if (compact.matches && !open) panel.setAttribute('inert', '');
      else panel.removeAttribute('inert');
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refresh, matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 420);
    }
    if (toggle) {
      toggle.addEventListener('click', function () { setAmenityDropdown(toggle.getAttribute('aria-expanded') !== 'true'); });
      compact.addEventListener('change', function () { setAmenityDropdown(!compact.matches); });
      setAmenityDropdown(!compact.matches);
    }

    var picture = document.querySelector('#vision .about-right-col');
    var pillars = document.querySelector('#vision .about-pillars-grid');
    var originalPosition = document.createComment('About image desktop position');
    var apartments = document.getElementById('apartments');
    var cards = apartments ? Array.from(apartments.querySelectorAll('.residence-story-media')) : [];
    var information = apartments && apartments.querySelector('.apartments-info');
    var frame = 0;
    if (picture && pillars) picture.before(originalPosition);
    function refresh() { if (window.ScrollTrigger) ScrollTrigger.refresh(); }
    function equalize() {
      frame = 0;
      if (information) {
        var informationStyle = getComputedStyle(information);
        var required = parseFloat(informationStyle.paddingTop) + parseFloat(informationStyle.paddingBottom);
        Array.from(information.children).forEach(function (child) {
          var style = getComputedStyle(child);
          required += child.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        });
        required += parseFloat(informationStyle.rowGap) || 0;
        information.toggleAttribute('data-lenis-prevent', !compact.matches && required > information.clientHeight + 1);
      }
      if (!apartments) return;
      var previous = apartments.style.getPropertyValue('--compact-residence-height');
      apartments.style.removeProperty('--compact-residence-height');
      if (!compact.matches) return;
      var baseline = innerWidth <= 600 ? 660 : 640;
      var height = Math.ceil(Math.max.apply(null, cards.map(function (card) {
        var content = card.querySelector('.residence-front-copy');
        if (!content) return baseline;
        var style = getComputedStyle(content), cardStyle = getComputedStyle(card);
        var spacing = style.position === 'relative'
          ? parseFloat(style.marginTop) + parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom)
          : 120;
        return Math.max(baseline, content.offsetHeight + spacing);
      })));
      if (!height) return;
      var value = height + 'px';
      apartments.style.setProperty('--compact-residence-height', value);
      if (value !== previous) refresh();
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(equalize); }
    function placePicture() {
      if (picture && pillars) {
        if (compact.matches) pillars.before(picture); else originalPosition.after(picture);
      }
      schedule();
      requestAnimationFrame(refresh);
    }
    compact.addEventListener('change', placePicture);
    addEventListener('resize', schedule, { passive: true });
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(schedule);
      cards.forEach(function (card) { var content = card.querySelector('.residence-front-copy'); if (content) observer.observe(content); });
    }
    if (document.fonts) document.fonts.ready.then(schedule);
    placePicture();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
