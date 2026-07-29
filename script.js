/**
 * L.A.M.B Landing — Scroll reveal animations & utilities
 */

(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Scroll reveal via IntersectionObserver
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.12
        }
      );

      revealElements.forEach(function (el, index) {
        // Stagger siblings slightly for a natural cascade
        var parent = el.parentElement;
        var siblings = parent ? parent.querySelectorAll(':scope > .reveal') : [];
        var siblingIndex = Array.prototype.indexOf.call(siblings, el);
        if (siblingIndex > 0) {
          el.style.transitionDelay = (siblingIndex * 0.08) + 's';
        }
        observer.observe(el);
      });
    }
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Hero elements visible immediately on load
  var heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach(function (el, index) {
    el.style.transitionDelay = (0.15 + index * 0.12) + 's';
    requestAnimationFrame(function () {
      el.classList.add('is-visible');
    });
  });

  // Smooth scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  }
)();
