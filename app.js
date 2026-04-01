/* ============================================
   Melbourne Speed Coach — App
   ============================================ */

(function () {
  'use strict';

  // --- Content Data ---
  // Instagram post data for @melbournespeedcoach
  // Thumbnails use placeholder gradients; real embeds link to Instagram
  const INSTAGRAM_HANDLE = 'melbournespeedcoach';
  const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

  // Featured / Pinned posts
  const pinnedPosts = [
    {
      id: 'pinned-1',
      type: 'reel',
      caption: 'Optimizing Long Jump Approach Training — Breaking down the mechanics of a consistent and powerful approach run. Every step counts.',
      gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      instagramUrl: 'https://www.instagram.com/reel/DQ5Yy4CEheG/',
      icon: '🏃'
    },
    {
      id: 'pinned-2',
      type: 'reel',
      caption: 'Acceleration mechanics drill — First 10m is where races are won and lost. Building explosive starts with proper shin angles and force application.',
      gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      instagramUrl: INSTAGRAM_URL,
      icon: '⚡'
    },
    {
      id: 'pinned-3',
      type: 'post',
      caption: 'Speed & Agility Clinic — Helping young athletes ages 10-18 develop elite movement skills. Limited spots available at Preston Athletics Club.',
      gradient: 'linear-gradient(135deg, #0d1117, #1a3a4a, #2d6b6b)',
      instagramUrl: INSTAGRAM_URL,
      icon: '🏆'
    }
  ];

  // Feed content by category
  const reelsContent = [
    { id: 'r1', caption: 'Sprint mechanics breakdown — Hip position, arm drive, ground contact. The details matter.', gradient: 'linear-gradient(135deg, #141e30, #243b55)', icon: '🔥' },
    { id: 'r2', caption: 'Acceleration wall drill — Building the neural pathways for explosive first-step quickness.', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', icon: '💨' },
    { id: 'r3', caption: 'Match day speed in training — Replicating game-speed demands in controlled drills.', gradient: 'linear-gradient(135deg, #1a1a2e, #0f3460)', icon: '🎯' },
    { id: 'r4', caption: 'Change of direction — Decel, plant, re-accel. Three phases, one explosive movement.', gradient: 'linear-gradient(135deg, #0d1b2a, #1b2838, #2d4a5e)', icon: '⚡' },
    { id: 'r5', caption: 'Top speed mechanics — When you hit max velocity, technique is everything.', gradient: 'linear-gradient(135deg, #16222A, #3A6073)', icon: '🏃' },
    { id: 'r6', caption: 'Resisted sprints — Building strength-speed with sled work for acceleration gains.', gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', icon: '💪' },
    { id: 'r7', caption: 'Plyometric training — Developing reactive strength and elastic energy for faster ground contact times.', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)', icon: '🔋' },
    { id: 'r8', caption: 'Block starts technique — Power angles, reaction time, and the first three steps out of the blocks.', gradient: 'linear-gradient(135deg, #0d1117, #1a3a4a)', icon: '🚀' }
  ];

  const trainingContent = [
    { id: 't1', caption: 'Speed session at Preston Athletics Club — Athletes working on acceleration mechanics and sprint form.', gradient: 'linear-gradient(135deg, #1a2a3a, #2d5a5a)', icon: '🏟️' },
    { id: 't2', caption: 'AFL pre-season speed work — Getting Hurstbridge FNC players game-ready with sport-specific sprint training.', gradient: 'linear-gradient(135deg, #1a1a2e, #3a2a1a)', icon: '🏈' },
    { id: 't3', caption: 'Video analysis session — Breaking down sprint footage frame by frame to identify technical improvements.', gradient: 'linear-gradient(135deg, #0f2027, #1a3a5a)', icon: '📹' },
    { id: 't4', caption: 'Overspeed training — Using downhill sprints and assisted runs to push beyond current top-end speed.', gradient: 'linear-gradient(135deg, #141e30, #243b55)', icon: '⚡' },
    { id: 't5', caption: 'Warm-up protocol — Dynamic mobility and activation drills to prep the nervous system for maximum output.', gradient: 'linear-gradient(135deg, #0d1b2a, #1b2838)', icon: '🔄' },
    { id: 't6', caption: 'Athlete testing day — Timing 10m, 20m, and 40m splits to track progress and adjust programming.', gradient: 'linear-gradient(135deg, #16222A, #3A6073)', icon: '⏱️' }
  ];

  const clinicsContent = [
    { id: 'c1', caption: 'Speed & Agility Clinic — 1.5hr group sessions for young athletes ages 10-18. Limited to 10 spots per session. Book via DM or Eventbrite.', gradient: 'linear-gradient(135deg, #0f3460, #1a1a2e)', icon: '📋' },
    { id: 'c2', caption: 'School athletics program — Working with St Monica\'s College students on sprint and jump technique for inter-school competitions.', gradient: 'linear-gradient(135deg, #1a3a4a, #0d1117)', icon: '🏫' },
    { id: 'c3', caption: 'Junior football speed development — Yarrambat JFC players building acceleration and agility for the upcoming season.', gradient: 'linear-gradient(135deg, #2d4a5e, #0d1b2a)', icon: '⚽' },
    { id: 'c4', caption: 'Summer speed camp — Intensive 3-day program covering sprint mechanics, agility, and speed endurance. Register now.', gradient: 'linear-gradient(135deg, #203a43, #0f2027)', icon: '☀️' },
    { id: 'c5', caption: 'Private coaching available — Individualised speed and acceleration programs with video analysis and ongoing programming.', gradient: 'linear-gradient(135deg, #16213e, #1a1a2e)', icon: '🎯' }
  ];


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

  // Close mobile menu on link click
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
    pinnedPosts.forEach(function (post) {
      var card = document.createElement('div');
      card.className = 'featured-card reveal';
      card.innerHTML =
        '<div class="featured-card-pin">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>' +
          'Pinned' +
        '</div>' +
        '<div class="featured-card-media" style="background:' + post.gradient + '">' +
          '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:64px;opacity:0.3">' + post.icon + '</div>' +
        '</div>' +
        '<div class="featured-card-overlay">' +
          '<div class="featured-card-caption">' + post.caption + '</div>' +
        '</div>' +
        (post.type === 'reel' ?
          '<div class="featured-card-play">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>' +
          '</div>' : '');

      card.addEventListener('click', function () {
        window.open(post.instagramUrl, '_blank');
      });
      grid.appendChild(card);
    });
  })();


  // --- Build Feed Carousels ---
  function buildCarousel(trackId, items, cardType) {
    var track = document.getElementById(trackId);
    if (!track) return;

    items.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'feed-card feed-card--' + cardType;
      card.innerHTML =
        '<div class="feed-card-media" style="background:' + item.gradient + '">' +
          '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:' + (cardType === 'reel' ? '48' : '40') + 'px;opacity:0.25">' + item.icon + '</div>' +
        '</div>' +
        '<div class="feed-card-overlay">' +
          '<div class="feed-card-caption">' + item.caption + '</div>' +
        '</div>' +
        (cardType === 'reel' ?
          '<div class="feed-card-play">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>' +
          '</div>' +
          '<div class="feed-card-type">Reel</div>' : '');

      card.addEventListener('click', function () {
        window.open(INSTAGRAM_URL, '_blank');
      });
      track.appendChild(card);
    });
  }

  buildCarousel('reelsTrack', reelsContent, 'reel');
  buildCarousel('trainingTrack', trainingContent, 'post');
  buildCarousel('clinicsTrack', clinicsContent, 'post');


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
      // Close mobile menu
      if (menuOpen) {
        menuOpen = false;
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

})();
