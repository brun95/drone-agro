/* ============================================================
   DRONE AGRO — main.js
   Vanilla JS only — no dependencies required.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     NAV: transparent → solid on scroll
     ---------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const SCROLL_THRESHOLD = 60;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ----------------------------------------------------------
     MOBILE NAV: hamburger toggle
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer    = document.querySelector('.nav__drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      hamburger.querySelectorAll('span')[1].style.opacity   = isOpen ? '0' : '';
      hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });

    // Close drawer when a link is tapped
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }


  /* ----------------------------------------------------------
     SCROLL REVEAL: IntersectionObserver
     Adds .visible to any element with class .reveal
     ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ----------------------------------------------------------
     COUNTER ANIMATION: .stat-box__num elements
     Counts up to target value when scrolled into view
     ---------------------------------------------------------- */
  function animateCounter(el) {
    const text    = el.textContent.trim();
    const suffix  = text.replace(/[\d.]+/, '');  // e.g. "%", "×", " ha/dia"
    const rawNum  = parseFloat(text);
    if (isNaN(rawNum)) return;

    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = rawNum * eased;
      const display  = Number.isInteger(rawNum)
        ? Math.round(current)
        : current.toFixed(1);
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-box__num').forEach(function (el) {
    counterObserver.observe(el);
  });


  /* ----------------------------------------------------------
     CONTACT FORM: basic validation + mailto fallback
     NOTE: Replace the action below with your real endpoint.
     Currently uses mailto: — change to your backend URL or
     a service like Formspree (https://formspree.io) for real submissions.
     ---------------------------------------------------------- */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name     = form.querySelector('[name="nome"]').value.trim();
      const email    = form.querySelector('[name="email"]').value.trim();
      const hectares = form.querySelector('[name="hectares"]').value.trim();
      const message  = form.querySelector('[name="mensagem"]').value.trim();

      if (!name || !email || !message) {
        alert('Por favor preencha todos os campos obrigatórios.');
        return;
      }

      // EDIT: Replace with your real email address for the mailto fallback
      const to      = 'contacto@drone-agro.pt';
      const subject = encodeURIComponent('Pedido de orçamento — ' + name);
      const body    = encodeURIComponent(
        'Nome: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Hectares: ' + (hectares || 'Não indicado') + '\n\n' +
        message
      );

      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    });
  }


  /* ----------------------------------------------------------
     SMOOTH SCROLL: for any anchor link starting with #
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // A bare "#" (the logo links) means "back to top" — scroll there
      // smoothly instead of feeding "#" to querySelector (which throws).
      if (href === '#' || href === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
