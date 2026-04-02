/* ============================================
   Melbourne Speed Coach — App
   ============================================ */

(function () {
  'use strict';

  // --- Instagram Configuration ---
  const INSTAGRAM_HANDLE = 'melbournespeedcoach';
  const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

  // ============================================================
  // FEATURED POSTS
  // Paste your favourite Instagram post/reel URLs below.
  // These appear as large pinned cards at the top of the page.
  // To get a URL: open a post on Instagram → Share → Copy link
  // ============================================================
  const FEATURED_POSTS = [
    'https://www.instagram.com/reel/DQ5Yy4CEheG/',
    // 'https://www.instagram.com/reel/PASTE_ANOTHER_URL/',
    // 'https://www.instagram.com/p/PASTE_ANOTHER_URL/',
  ];


  // --- Helpers ---
  function parseUrl(url) {
    var match = url.match(/instagram\.com\/(p|reel)\/([^/?]+)/);
    if (!match) return null;
    return { shortcode: match[2], type: match[1] === 'reel' ? 'reel' : 'post' };
  }

  function embedUrl(shortcode, type) {
    var prefix = type === 'reel' ? 'reel' : 'p';
    return 'https://www.instagram.com/' + prefix + '/' + shortcode + '/embed/';
  }


  // --- Embed Modal ---
  function openEmbedModal(shortcode, type) {
    var modal = document.getElementById('embedModal');
    var container = document.getElementById('embedContainer');
    if (!modal || !container) return;
    container.innerHTML = '<iframe src="' + embedUrl(shortcode, type) + '" ' +
      'style="width:100%;height:100%;border:none;" ' +
      'scrolling="no" allowtransparency="true" ' +
      'allow="autoplay; encrypted-media"></iframe>';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeEmbedModal() {
    var modal = document.getElementById('embedModal');
    var container = document.getElementById('embedContainer');
    if (!modal) return;
    container.innerHTML = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  var embedModal = document.getElementById('embedModal');
  if (embedModal) {
    embedModal.addEventListener('click', function (e) {
      if (e.target === embedModal) closeEmbedModal();
    });
    var closeBtn = embedModal.querySelector('.embed-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeEmbedModal);
  }


  // --- Loader ---
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('loader').classList.add('loaded');
    }, 1400);
  });


  // --- Navigation ---
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuOpen = false;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  menuBtn.addEventListener('click', function () {
    menuOpen = !menuOpen;
    menuBtn.classList.toggle('active', menuOpen);
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menuOpen = false;
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // --- Hero Particles ---
  (function () {
    var container = document.getElementById('heroParticles');
    if (!container) return;
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 6 + 's';
      p.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(p);
    }
  })();


  // --- Build Featured Grid ---
  (function () {
    var grid = document.getElementById('featuredGrid');
    if (!grid) return;

    var posts = FEATURED_POSTS.map(parseUrl).filter(Boolean);

    if (posts.length === 0) {
      grid.innerHTML =
        '<div class="featured-placeholder">' +
          '<p>Add your Instagram post URLs to the FEATURED_POSTS array in <code>app.js</code></p>' +
        '</div>';
      return;
    }

    posts.forEach(function (post) {
      var card = document.createElement('div');
      card.className = 'featured-card reveal';
      card.innerHTML =
        '<div class="featured-card-pin">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>' +
          'Pinned' +
        '</div>' +
        '<div class="card-media card-media--embed">' +
          '<iframe src="' + embedUrl(post.shortcode, post.type) + '" ' +
          'frameborder="0" scrolling="no" allowtransparency="true" loading="lazy"></iframe>' +
        '</div>' +
        (post.type === 'reel' ?
          '<div class="featured-card-play">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>' +
          '</div>' : '');

      card.addEventListener('click', function () {
        openEmbedModal(post.shortcode, post.type);
      });
      grid.appendChild(card);
    });
  })();


  // --- Scroll Reveal ---
  var revealElements = document.querySelectorAll('.reveal, .role-card, .service-card, .contact-card, .services-details, .about-text, .about-heading');
  revealElements.forEach(function (el) { el.classList.add('reveal'); });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  // --- Stagger animations for grid items ---
  var staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var children = entry.target.querySelectorAll('.reveal');
        children.forEach(function (child, i) {
          child.style.transitionDelay = (i * 0.08) + 's';
          child.classList.add('visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-roles, .services-grid, .contact-grid, .featured-grid').forEach(function (el) {
    staggerObserver.observe(el);
  });


  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // --- Keyboard Accessibility ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeEmbedModal();
      if (menuOpen) {
        menuOpen = false;
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

})();
