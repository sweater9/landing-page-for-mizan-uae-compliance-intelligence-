const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 900px)');
function setOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobile.matches && !open;
}
function syncNavigation() { setOpen(!mobile.matches); }
toggle.hidden = false;
syncNavigation();
mobile.addEventListener('change', syncNavigation);
toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  if (mobile.matches && event.target.closest('a')) setOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
    setOpen(false);
    toggle.focus();
  }
});
