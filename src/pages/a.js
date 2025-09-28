// 1) Paste this function
function debugInput(nameOrSelector) {
  const input =
    document.querySelector(nameOrSelector) ||
    document.querySelector(`input[name="${nameOrSelector}"]`) ||
    document.querySelector(`input[placeholder="${nameOrSelector}"]`);
  if (!input) return console.warn('Input not found for:', nameOrSelector);

  const rect = input.getBoundingClientRect();
  console.log('--- INPUT ---', input);
  console.log('boundingRect', rect);
  console.log('disabled/readOnly:', input.disabled, input.readOnly);

  const points = [
    [Math.round(rect.left + 5), Math.round(rect.top + 5)],
    [Math.round(rect.left + rect.width/2), Math.round(rect.top + rect.height/2)],
    [Math.round(rect.right - 5), Math.round(rect.bottom - 5)]
  ];

  points.forEach(([x,y]) => {
    const els = document.elementsFromPoint(x,y);
    console.group(`Elements at (${x},${y})`);
    els.forEach((el, i) => {
      const cs = getComputedStyle(el);
      console.log(i, el.tagName, el.className || el.id || '', 'zIndex=' + cs.zIndex, 'pointerEvents=' + cs.pointerEvents, 'position=' + cs.position, 'transform=' + cs.transform);
    });
    console.groupEnd();
  });

  // Top elements by z-index (helpful to see overlays)
  const withZ = Array.from(document.querySelectorAll('body *'))
    .map(el => ({ el, z: parseInt(getComputedStyle(el).zIndex) || 0 }))
    .filter(o => o.z !== 0)
    .sort((a,b) => b.z - a.z)
    .slice(0, 30)
    .map(o => ({ tag: o.el.tagName, cls: o.el.className, id: o.el.id, z: getComputedStyle(o.el).zIndex }));
  console.log('Top elements by z-index (up to 30):', withZ);
  return input;
}

// 2) Example calls (run one):
// debugInput('displayName')
// debugInput('input[placeholder="Your full name"]')
// debugInput('email')
