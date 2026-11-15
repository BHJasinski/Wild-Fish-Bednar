'use strict';
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
const bp = window.matchMedia('(max-width: 899px)');
function toggleMenu(open) {
  nav.hidden = bp.matches && !open;
  nav.classList.toggle('mobile-nav', bp.matches);
  menu.hidden = !bp.matches;
  menu.setAttribute('aria-expanded', String(bp.matches && open));
}
toggleMenu(false);
bp.addEventListener('change', () => toggleMenu(false));
menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', e => { if (e.target.closest('a') && bp.matches) toggleMenu(false); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    toggleMenu(false);
    menu.focus();
  }
});

const form = document.querySelector('#order-form');
const species = document.querySelector('#gatunek');
const draft = document.querySelector('#draft');
const summary = document.querySelector('#draft-status');
const mail = document.querySelector('#mail-draft');
const copyStatus = document.querySelector('#copy-status');
const manual = document.querySelector('#manual-draft');
const email = 'mariuszbed9685@gmail.com';
let message = '';
form.hidden = false;
function resetDraft() {
  draft.hidden = true;
  manual.hidden = true;
  copyStatus.textContent = '';
}
document.querySelectorAll('[data-fish]').forEach(button => {
  button.addEventListener('click', () => {
    species.value = button.dataset.fish;
    species.setCustomValidity('');
    resetDraft();
    window.location.hash = 'kontakt';
    species.focus({preventScroll:true});
    if (!species.checkVisibility?.() || species.getBoundingClientRect().bottom > window.innerHeight - 65) {
      species.scrollIntoView({block:'center',behavior:'instant'});
    }
  });
});
form.addEventListener('input', e => {
  if (e.target instanceof HTMLInputElement && e.target.required) e.target.setCustomValidity('');
  resetDraft();
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const get = name => String(data.get(name) || '').trim();
  for (const name of ['imie', 'gatunek']) {
    const field = form.elements.namedItem(name);
    field.setCustomValidity(get(name) ? '' : 'Uzupełnij to pole.');
  }
  if (!form.reportValidity()) return;
  message = [
    'Dzień dobry,', '', 'proszę o informację o dostępności i cenie następujących ryb:', '',
    'Gatunek lub grupa: '+get('gatunek'), 'Ilość: '+(get('ilosc') || 'do ustalenia'),
    ...(get('kierunek') ? ['Kierunek pochodzenia: '+get('kierunek')] : []),
    ...(get('uwagi') ? ['Uwagi: '+get('uwagi')] : []),
    ...(get('kontakt') ? ['Kontakt: '+get('kontakt')] : []),
    '', 'Pozdrawiam,', get('imie')
  ].join('\r\n');
  mail.href = 'mailto:'+email+'?subject='+encodeURIComponent('Zapytanie o ryby – Wild Fish Bednar')+'&body='+encodeURIComponent(message);
  manual.value = message;
  draft.hidden = false;
  summary.focus();
});
document.querySelector('#copy-draft').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message);
    copyStatus.textContent = 'Skopiowano treść wiadomości.';
  } catch {
    manual.hidden = false;
    manual.focus();
    manual.select();
    copyStatus.textContent = 'Treść jest zaznaczona. Skopiuj ją ręcznie.';
  }
});
