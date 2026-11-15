'use strict';
(() => {
  const panel = document.querySelector('#map-interactive');
  const fallback = document.querySelector('#map-fallback');
  const svg = document.querySelector('#map-world');
  const reset = document.querySelector('#map-reset');
  const inquiry = document.querySelector('#map-inquiry');
  const nameLabel = document.querySelector('#map-name');
  const regionLabel = document.querySelector('#map-region');
  const note = document.querySelector('#map-note');
  const world = [56, 175, 1808, 810];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const choices = [...panel.querySelectorAll('[data-map-place]')];
  const marks = [...svg.querySelectorAll('[data-map-mark]')];
  const shapes = [...svg.querySelectorAll('[data-map-shape]')];
  let frame = 0;
  let choice = null;
  let view = [...world];

  function draw(values) {
    view = [...values];
    svg.setAttribute('viewBox', values.map(v => Number(v.toFixed(2))).join(' '));
    for (const marker of marks) {
      const radius = 8.2 * values[2] / world[2];
      marker.querySelector('circle').setAttribute('r', radius.toFixed(2));
    }
  }
  function move(to) {
    cancelAnimationFrame(frame);
    if (reduceMotion.matches) {
      draw(to);
      return;
    }
    const origin = [...view];
    const begin = performance.now();
    const tick = now => {
      const progress = Math.min(1, Math.max(0, (now - begin) / 500));
      const t = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      draw(origin.map((value, i) => value + (to[i] - value) * t));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }
  function zoom(shape) {
    const box = shape.getBBox();
    const w = Math.min(1250, Math.max(370, box.width * 1.45, box.height * (world[2] / world[3]) * 1.34));
    const h = w * world[3] / world[2];
    const clamp = (v, start, end) => Math.min(end, Math.max(start, v));
    return [
      clamp(box.x + (box.width - w) / 2, world[0], world[0] + world[2] - w),
      clamp(box.y + (box.height - h) / 2, world[1], world[1] + world[3] - h),
      w, h
    ];
  }
  function select(id) {
    choice = choices.find(item => item.dataset.mapPlace === id) || null;
    const active = shapes.find(item => item.dataset.mapShape === id);
    for (const item of choices) item.setAttribute('aria-pressed', String(item === choice));
    for (const item of shapes) item.classList.toggle('map-active', item === active);
    const place = choice?.textContent.trim();
    nameLabel.textContent = place || 'Wybierz miejsce';
    regionLabel.textContent = choice?.dataset.mapRegion || '8 KIERUNKÓW IMPORTU';
    note.textContent = choice
      ? (active.classList.contains('map-river') ? 'Na niebiesko zaznaczyłem bieg rzeki.' : 'Na jasnozielono zaznaczyłem obszar kraju.')
      : 'Dotknij nazwy lub punktu na mapie.';
    inquiry.hidden = !choice;
    if (choice) inquiry.textContent = 'Zapytaj o ryby z ' + choice.dataset.mapOf;
    move(active ? zoom(active) : world);
  }
  choices.forEach(item => item.addEventListener('click', () => select(item.dataset.mapPlace)));
  reset.addEventListener('click', () => select());
  svg.addEventListener('click', e => {
    const target = e.target.closest('[data-map-shape], [data-map-mark]');
    if (target) select(target.dataset.mapShape || target.dataset.mapMark);
  });
  inquiry.addEventListener('click', () => {
    const field = document.querySelector('#kierunek');
    if (!choice || !field) return;
    field.value = choice.textContent.trim();
    field.dispatchEvent(new Event('input', {bubbles:true}));
  });
  panel.hidden = false;
  fallback.hidden = true;
  draw(world);
})();
