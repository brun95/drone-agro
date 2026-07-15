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
    // EDIT: Replace with your real inbox for the mailto fallback
    const CONTACT_EMAIL = 'geral@skyplant.pt';
    const status = form.querySelector('.form-status');

    // Show a message in the inline status region.
    // kind = 'error' | 'info'. `html` allows a fallback link.
    function showStatus(kind, html) {
      if (!status) return;
      status.className = 'form-status form-status--' + kind;
      status.innerHTML = html;
      status.hidden = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Field name -> element, in visual order (so we can focus the first empty one)
      const fields = ['nome', 'email', 'telefone', 'hectares', 'servico', 'mensagem'];
      const values = {};
      let firstEmpty = null;

      fields.forEach(function (n) {
        const el = form.querySelector('[name="' + n + '"]');
        values[n] = el ? el.value.trim() : '';
        if (!values[n] && !firstEmpty) firstEmpty = el;
      });

      // All fields are mandatory
      if (firstEmpty) {
        showStatus('error', 'Por favor preencha todos os campos obrigatórios.');
        firstEmpty.focus();
        return;
      }

      const subject = encodeURIComponent('Pedido de orçamento — ' + values.nome);
      const body    = encodeURIComponent(
        'Nome: '          + values.nome     + '\n' +
        'Email: '         + values.email    + '\n' +
        'Telefone: '      + values.telefone + '\n' +
        'Área estimada: ' + values.hectares + '\n' +
        'Serviço: '       + values.servico  + '\n\n' +
        values.mensagem
      );

      // Open the visitor's email app with a pre-filled draft.
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;

      // Best-effort: copy the address so they can paste it if nothing opened.
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(CONTACT_EMAIL);
          copied = true;
        }
      } catch (err) { /* clipboard unavailable — ignore */ }

      // Explain what just happened + give a fallback (mailto is silent if no
      // mail client is configured, so never leave the visitor guessing).
      showStatus('info',
        'Abrimos o seu programa de email com o pedido já preenchido — ' +
        'confirme a janela que abriu e carregue em <strong>Enviar</strong>.<br>' +
        'Se nada aconteceu, escreva-nos diretamente para ' +
        '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>' +
        (copied ? ' (endereço copiado).' : '.')
      );
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


  /* ----------------------------------------------------------
     SERVICE CARD LIGHTBOX
     Clicking (or Enter/Space on) a .service-card[data-gallery]
     opens a portfolio of images. Works with mouse, keyboard and
     touch (swipe). Images come from the card's data-gallery attr.
     ---------------------------------------------------------- */
  const galleryCards = document.querySelectorAll('.service-card[data-gallery]');

  if (galleryCards.length) {
    // Build the lightbox once and reuse it
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Portfólio de imagens');
    lb.innerHTML =
      '<div class="lightbox__stage">' +
        '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Imagem anterior">‹</button>' +
        '<img class="lightbox__img" alt="Imagem do portfólio">' +
        '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Imagem seguinte">›</button>' +
        '<button class="lightbox__close" type="button" aria-label="Fechar">×</button>' +
        '<div class="lightbox__counter"></div>' +
      '</div>';
    document.body.appendChild(lb);

    const lbImg     = lb.querySelector('.lightbox__img');
    const lbCounter = lb.querySelector('.lightbox__counter');
    const btnPrev   = lb.querySelector('.lightbox__nav--prev');
    const btnNext   = lb.querySelector('.lightbox__nav--next');
    const btnClose  = lb.querySelector('.lightbox__close');

    let images = [];
    let index = 0;
    let lastFocus = null;

    function render() {
      lbImg.src = images[index];
      lbCounter.textContent = (index + 1) + ' / ' + images.length;
      // Single-image galleries don't need arrows
      const many = images.length > 1;
      btnPrev.style.display = many ? '' : 'none';
      btnNext.style.display = many ? '' : 'none';
      lbCounter.style.display = many ? '' : 'none';
    }

    function open(list) {
      images = list;
      index = 0;
      lastFocus = document.activeElement;
      render();
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';   // lock background scroll
      btnClose.focus();
    }

    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function next() { index = (index + 1) % images.length; render(); }
    function prev() { index = (index - 1 + images.length) % images.length; render(); }

    // Wire up each card
    galleryCards.forEach(function (card) {
      const list = (card.getAttribute('data-gallery') || '')
        .split('|').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!list.length) return;

      card.addEventListener('click', function () { open(list); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          open(list);
        }
      });
    });

    // Controls
    btnClose.addEventListener('click', close);
    btnNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
    btnPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });

    // Click on the dark backdrop (outside the stage) closes
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    // Keyboard: Esc closes, arrows navigate
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    });

    // Touch swipe (mobile)
    let touchX = null;
    lb.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null || images.length < 2) { touchX = null; return; }
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { if (dx < 0) { next(); } else { prev(); } }
      touchX = null;
    }, { passive: true });
  }

})();
