/* =============================================
   Ismaile Hasan Portfolio — script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- Hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Animate hamburger → X
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ---- Navbar scroll shadow ---- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 1px 24px rgba(15,14,12,0.07)';
      } else {
        navbar.style.boxShadow = '';
      }
    }
    handleBackToTop();
  }, { passive: true });

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Scroll reveal ---- */
  function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const threshold = window.innerHeight * 0.88;

    elements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < threshold) {
        el.classList.add('visible');
      }
    });
  }

  // Add reveal class to sections and cards
  function initReveal() {
    const targets = document.querySelectorAll(
      '.skill-card, .project-card, .contact-card, .qual-block, .about-text, .about-tags'
    );
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.06) + 's';
    });
    revealOnScroll();
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });

  /* ---- Active nav link on scroll ---- */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a');
    let currentId  = '';

    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        currentId = section.id;
      }
    });

    links.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + currentId) {
        link.style.color = 'var(--accent)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    handleBackToTop();
    updateActiveNav();
  });

})();
