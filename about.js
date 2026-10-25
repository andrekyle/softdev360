(() => {
  const menu=document.querySelector('.topbar .menu');
  const nav=document.querySelector('.topbar nav');
  if(!menu || !nav) return;
  menu.addEventListener('click', () => {
    const isOpen=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open menu');
  }));
})();
