function disableTopBlocker(selector){
  const input = debugInput(selector);
  if (!input) return;
  const r = input.getBoundingClientRect();
  const cx = Math.round(r.left + r.width/2);
  const cy = Math.round(r.top + r.height/2);
  const els = document.elementsFromPoint(cx, cy);
  const blocker = els.find(el => el !== input && !input.contains(el) && el.tagName.toLowerCase() !== 'svg');
  if (!blocker) { console.log('No blocker found at center'); return; }
  blocker.dataset.__debug_prevPointer = getComputedStyle(blocker).pointerEvents || '';
  blocker.style.pointerEvents = 'none';
  console.log('Disabled pointer-events on:', blocker, 'Restore with: restoreDebugBlockers()');
}
function restoreDebugBlockers(){
  document.querySelectorAll('[data-__debug_prevPointer]').forEach(el=>{
    el.style.pointerEvents = el.dataset.__debug_prevPointer || '';
    delete el.dataset.__debug_prevPointer;
  });
  console.log('Restored debug blockers.');
}
