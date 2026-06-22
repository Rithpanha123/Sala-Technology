/* ═══════════════════════════════════════════════
   SALA TECHNOLOGY — script.js
   Scroll animations, counter, navbar, mobile menu
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. NAVBAR — scroll shadow + active link
  ───────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], div[id]');

  window.addEventListener('scroll', () => {
    // Shadow on scroll
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* ─────────────────────────────────────────
     2. SMOOTH SCROLL for all anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ─────────────────────────────────────────
     3. MOBILE MENU toggle
  ───────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  /* ─────────────────────────────────────────
     4. REVEAL ON SCROLL — Intersection Observer
  ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─────────────────────────────────────────
     5. HERO BAR ANIMATION — trigger on visible
  ───────────────────────────────────────── */
  const barFill = document.querySelector('.hcm-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => barFill.classList.add('animate'), 600);
      barObserver.disconnect();
    }
  }, { threshold: 0.5 });
  if (barFill) barObserver.observe(barFill);

  /* ─────────────────────────────────────────
     6. COUNTER ANIMATION for hero stats
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-val[data-target]');

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start    = performance.now();

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsRow = document.querySelector('.hero-stats');
  if (statsRow) counterObserver.observe(statsRow);

  /* ─────────────────────────────────────────
     7. TEAM CARD — click to highlight
  ───────────────────────────────────────── */
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('click', () => {
      teamCards.forEach(c => c.style.borderColor = '');
      card.style.borderColor = 'var(--blue)';
      card.style.boxShadow   = '0 4px 24px rgba(37,99,235,.18)';
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow   = '';
      }, 1800);
    });
  });

  /* ─────────────────────────────────────────
     8. WORK CARD — tilt effect on mouse move
  ───────────────────────────────────────── */
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX =  ((y - cy) / cy) * 4;
      const rotateY = -((x - cx) / cx) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─────────────────────────────────────────
     9. PROCESS STEP — highlight on hover
  ───────────────────────────────────────── */
  const processCards = document.querySelectorAll('.process-card');
  processCards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.pc-num').style.color = 'var(--blue)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.pc-num').style.color = '';
    });
  });

  /* ─────────────────────────────────────────
     10. FLOATING HERO CARDS — parallax on scroll
  ───────────────────────────────────────── */
  const float1 = document.querySelector('.hero-card-float');
  const float2 = document.querySelector('.hero-card-float2');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (float1) float1.style.transform = `translateY(${scrolled * 0.06}px)`;
    if (float2) float2.style.transform = `translateY(${scrolled * -0.04}px)`;
  }, { passive: true });

  /* ─────────────────────────────────────────
     11. CLIENT PILLS — staggered hover wave
  ───────────────────────────────────────── */
  const pills = document.querySelectorAll('.client-pill');
  pills.forEach((pill, i) => {
    pill.style.transitionDelay = `${i * 30}ms`;
  });

  /* ─────────────────────────────────────────
     12. CONTACT FORM — scroll into view pulse
  ───────────────────────────────────────── */
  const ctaBox = document.querySelector('.cta-box');
  const ctaObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      ctaBox.style.animation = 'none';
      void ctaBox.offsetWidth; // reflow
      ctaBox.style.animation = '';
      ctaObserver.disconnect();
    }
  }, { threshold: 0.4 });
  if (ctaBox) ctaObserver.observe(ctaBox);

  /* ─────────────────────────────────────────
     13. YEAR auto-update in footer
  ───────────────────────────────────────── */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });

});
// ============================================================
// 14.PAGE LOADER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('pageLoader').classList.add('hide');
  }, 1500);
});