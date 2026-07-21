
document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) closeMenu();
  });

  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120; 
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive: true });

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
  const checklist = document.getElementById('checklist');
  const progressFill = document.getElementById('progressFill');
  const progressCount = document.getElementById('progressCount');
  const checkboxes = checklist ? checklist.querySelectorAll('.check-input') : [];

  const updateProgress = () => {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = total ? Math.round((checked / total) * 100) : 0;

    progressFill.style.width = `${percent}%`;
    progressCount.textContent = `${checked} / ${total}`;
  };

  checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
  updateProgress(); 

  const toTopBtn = document.getElementById('toTop');
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  document.getElementById('year').textContent = new Date().getFullYear();

});