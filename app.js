/* ============================================
   Melbourne Speed Coach — App
   ============================================ */

(function () {
  'use strict';

  // --- Instagram Configuration ---
  const INSTAGRAM_HANDLE = 'melbournespeedcoach';
  const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

  // ============================================================
  // YOUR INSTAGRAM POSTS
  // Just paste your Instagram post/reel URLs below.
  // To add a new post: open it on Instagram, tap Share,
  // tap "Copy link", and paste the URL here.
  //
  // Featured posts appear large at the top of the page.
  // Feed posts appear in the scrolling carousels below.
  // ============================================================

  const FEATURED_POSTS = [
    'https://www.instagram.com/reel/DQ5Yy4CEheG/',
    // 'https://www.instagram.com/reel/PASTE_URL_HERE/',
    // 'https://www.instagram.com/p/PASTE_URL_HERE/',
  ];

  const FEED_REELS = [
    // 'https://www.instagram.com/reel/PASTE_URL_HERE/',
    // 'https://www.instagram.com/reel/PASTE_URL_HERE/',
  ];

  const FEED_POSTS = [
    // 'https://www.instagram.com/p/PASTE_URL_HERE/',
    // 'https://www.instagram.com/p/PASTE_URL_HERE/',
  ];


  // --- Parse Instagram URL into shortcode + type ---
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


  // --- Build an embed card (featured or feed) ---
  function buildEmbedCard(shortcode, type, className) {
    var card = document.createElement('div');
    card.className = className;
    card.innerHTML =
      '<div class="card-media card-media--embed">' +
        '<iframe src="' + embedUrl(shortcode, type) + '" ' +
        'frameborder="0" scrolling="no" allowtransparency="true" loading="lazy"></iframe>' +
      '</div>' +
      (type === 'reel' ?
        '<div class="feed-card-play">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>' +
        '</div>' +
        '<div class="feed-card-type">Reel</div>' : '');

    card.addEventListener('click', function () {
      openEmbedModal(shortcode, type);
    });
    return card;
  }


  // --- Build Featured Grid ---
  (function () {
    var grid = document.getElementById('featuredGrid');
    if (!grid) return;

    var posts = FEATURED_POSTS.map(parseUrl).filter(Boolean);

    if (posts.length === 0) {
      // No URLs yet — show a helpful placeholder
      grid.innerHTML =
        '<div class="featured-placeholder">' +
          '<p>Add your Instagram post URLs in <code>app.js</code> to display them here.</p>' +
        '</div>';
      return;
    }

    posts.forEach(function (post) {
      var card = buildEmbedCard(post.shortcode, post.type, 'featured-card reveal');
      // Add pinned badge
      var pin = document.createElement('div');
      pin.className = 'featured-card-pin';
      pin.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>' +
        'Pinned';
      card.insertBefore(pin, card.firstChild);

      // Upgrade play button size for featured cards
      var play = card.querySelector('.feed-card-play');
      if (play) {
        play.className = 'featured-card-play';
        play.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>';
      }
      // Remove "Reel" type badge from featured cards
      var badge = card.querySelector('.feed-card-type');
      if (badge) badge.remove();

      grid.appendChild(card);
    });
  })();


  // --- Build Feed Carousels ---
  function buildCarousel(trackId, urls, cardType) {
    var track = document.getElementById(trackId);
    if (!track) return;

    var posts = urls.map(parseUrl).filter(Boolean);

    if (posts.length === 0) {
      // No URLs — show a single placeholder card
      var placeholder = document.createElement('div');
      placeholder.className = 'feed-card feed-card--' + cardType + ' feed-card--placeholder';
      placeholder.innerHTML =
        '<div class="card-media" style="background:linear-gradient(135deg, #141e30, #243b55)">' +
          '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;text-align:center">' +
            '<span style="font-size:13px;color:var(--text-secondary);line-height:1.5">Add ' + cardType + ' URLs in <code>app.js</code></span>' +
          '</div>' +
        '</div>';
      track.appendChild(placeholder);
      return;
    }

    posts.forEach(function (post) {
      var card = buildEmbedCard(post.shortcode, post.type, 'feed-card feed-card--' + cardType);
      track.appendChild(card);
    });
  }

  buildCarousel('reelsTrack', FEED_REELS, 'reel');
  buildCarousel('trainingTrack', FEED_POSTS, 'post');
  // Hide the third carousel if there aren't enough posts to fill it
  var clinicsTrack = document.getElementById('clinicsTrack');
  if (clinicsTrack) clinicsTrack.closest('.carousel-section').style.display = 'none';


  // --- Carousel Controls ---
  document.querySelectorAll('.carousel-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var carouselName = btn.dataset.carousel;
      var track;
      if (carouselName === 'reels') track = document.getElementById('reelsTrack');
      else if (carouselName === 'training') track = document.getElementById('trainingTrack');
      else if (carouselName === 'clinics') track = document.getElementById('clinicsTrack');
      if (!track) return;

      var scrollAmount = track.clientWidth * 0.7;
      var direction = btn.classList.contains('carousel-btn--prev') ? -1 : 1;
      track.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    });
  });


  // --- Touch / Drag Scrolling Enhancement ---
  document.querySelectorAll('.carousel-track').forEach(function (track) {
    var isDown = false;
    var startX, scrollLeft;

    track.addEventListener('mousedown', function (e) {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', function () {
      isDown = false;
      track.style.cursor = '';
    });
    track.addEventListener('mouseup', function () {
      isDown = false;
      track.style.cursor = '';
    });
    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - track.offsetLeft;
      var walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  });


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
