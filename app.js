/* ============================================
   Melbourne Speed Coach — App
   ============================================ */

(function () {
  'use strict';

  // --- Instagram Configuration ---
  const INSTAGRAM_HANDLE = 'melbournespeedcoach';
  const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

  // ============================================================
  // INSTAGRAM GRAPH API — Live Feed
  // To show your real Instagram posts automatically:
  // 1. Go to developers.facebook.com and create a free app
  // 2. Add the "Instagram" product
  // 3. Connect your Instagram account and generate an access token
  // 4. Paste the token below
  // Posts, reels, and images will load automatically from your feed.
  // Token lasts 60 days — refresh by visiting the token URL logged
  // in the browser console, or call the refresh endpoint.
  // ============================================================
  const INSTAGRAM_ACCESS_TOKEN = '';

  // Fallback placeholder data (used when API token is not set)
  const fallbackPinned = [
    {
      id: 'pinned-1',
      type: 'reel',
      shortcode: 'DQ5Yy4CEheG',
      caption: 'Optimizing Long Jump Approach Training — Breaking down the mechanics of a consistent and powerful approach run. Every step counts.',
      gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      icon: '🏃'
    },
    {
      id: 'pinned-2',
      type: 'reel',
      shortcode: '',
      caption: 'Acceleration mechanics drill — First 10m is where races are won and lost. Building explosive starts with proper shin angles and force application.',
      gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      icon: '⚡'
    },
    {
      id: 'pinned-3',
      type: 'post',
      shortcode: '',
      caption: 'Speed & Agility Clinic — Helping young athletes ages 10-18 develop elite movement skills. Limited spots available at Preston Athletics Club.',
      gradient: 'linear-gradient(135deg, #0d1117, #1a3a4a, #2d6b6b)',
      icon: '🏆'
    }
  ];

  const fallbackReels = [
    { id: 'r1', shortcode: '', caption: 'Sprint mechanics breakdown — Hip position, arm drive, ground contact. The details matter.', gradient: 'linear-gradient(135deg, #141e30, #243b55)', icon: '🔥' },
    { id: 'r2', shortcode: '', caption: 'Acceleration wall drill — Building the neural pathways for explosive first-step quickness.', gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', icon: '💨' },
    { id: 'r3', shortcode: '', caption: 'Match day speed in training — Replicating game-speed demands in controlled drills.', gradient: 'linear-gradient(135deg, #1a1a2e, #0f3460)', icon: '🎯' },
    { id: 'r4', shortcode: '', caption: 'Change of direction — Decel, plant, re-accel. Three phases, one explosive movement.', gradient: 'linear-gradient(135deg, #0d1b2a, #1b2838, #2d4a5e)', icon: '⚡' },
    { id: 'r5', shortcode: '', caption: 'Top speed mechanics — When you hit max velocity, technique is everything.', gradient: 'linear-gradient(135deg, #16222A, #3A6073)', icon: '🏃' },
    { id: 'r6', shortcode: '', caption: 'Resisted sprints — Building strength-speed with sled work for acceleration gains.', gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', icon: '💪' }
  ];

  const fallbackTraining = [
    { id: 't1', shortcode: '', caption: 'Speed session at Preston Athletics Club — Athletes working on acceleration mechanics and sprint form.', gradient: 'linear-gradient(135deg, #1a2a3a, #2d5a5a)', icon: '🏟️' },
    { id: 't2', shortcode: '', caption: 'AFL pre-season speed work — Getting Hurstbridge FNC players game-ready with sport-specific sprint training.', gradient: 'linear-gradient(135deg, #1a1a2e, #3a2a1a)', icon: '🏈' },
    { id: 't3', shortcode: '', caption: 'Video analysis session — Breaking down sprint footage frame by frame to identify technical improvements.', gradient: 'linear-gradient(135deg, #0f2027, #1a3a5a)', icon: '📹' },
    { id: 't4', shortcode: '', caption: 'Overspeed training — Using downhill sprints and assisted runs to push beyond current top-end speed.', gradient: 'linear-gradient(135deg, #141e30, #243b55)', icon: '⚡' },
    { id: 't5', shortcode: '', caption: 'Warm-up protocol — Dynamic mobility and activation drills to prep the nervous system for maximum output.', gradient: 'linear-gradient(135deg, #0d1b2a, #1b2838)', icon: '🔄' },
    { id: 't6', shortcode: '', caption: 'Athlete testing day — Timing 10m, 20m, and 40m splits to track progress and adjust programming.', gradient: 'linear-gradient(135deg, #16222A, #3A6073)', icon: '⏱️' }
  ];

  const fallbackClinics = [
    { id: 'c1', shortcode: '', caption: 'Speed & Agility Clinic — 1.5hr group sessions for young athletes ages 10-18. Limited to 10 spots per session. Book via DM or Eventbrite.', gradient: 'linear-gradient(135deg, #0f3460, #1a1a2e)', icon: '📋' },
    { id: 'c2', shortcode: '', caption: 'School athletics program — Working with St Monica\'s College students on sprint and jump technique for inter-school competitions.', gradient: 'linear-gradient(135deg, #1a3a4a, #0d1117)', icon: '🏫' },
    { id: 'c3', shortcode: '', caption: 'Junior football speed development — Yarrambat JFC players building acceleration and agility for the upcoming season.', gradient: 'linear-gradient(135deg, #2d4a5e, #0d1b2a)', icon: '⚽' },
    { id: 'c4', shortcode: '', caption: 'Summer speed camp — Intensive 3-day program covering sprint mechanics, agility, and speed endurance. Register now.', gradient: 'linear-gradient(135deg, #203a43, #0f2027)', icon: '☀️' },
    { id: 'c5', shortcode: '', caption: 'Private coaching available — Individualised speed and acceleration programs with video analysis and ongoing programming.', gradient: 'linear-gradient(135deg, #16213e, #1a1a2e)', icon: '🎯' }
  ];


  // --- Helpers ---
  function embedUrl(shortcode, type) {
    var prefix = type === 'reel' ? 'reel' : 'p';
    return 'https://www.instagram.com/' + prefix + '/' + shortcode + '/embed/';
  }

  function extractShortcode(permalink) {
    var match = permalink.match(/\/(p|reel)\/([^/?]+)/);
    if (!match) return null;
    return { shortcode: match[2], type: match[1] === 'reel' ? 'reel' : 'post' };
  }


  // --- Instagram Graph API ---
  function fetchInstagramFeed() {
    if (!INSTAGRAM_ACCESS_TOKEN) return Promise.resolve(null);

    var apiUrl = 'https://graph.instagram.com/me/media' +
      '?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp' +
      '&limit=25&access_token=' + INSTAGRAM_ACCESS_TOKEN;

    return fetch(apiUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('Instagram API returned ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data.error) throw new Error(data.error.message);
        return data.data;
      })
      .catch(function (err) {
        console.warn('Instagram API fetch failed:', err.message);
        console.info(
          'To refresh your token, visit:\n' +
          'https://graph.instagram.com/refresh_access_token' +
          '?grant_type=ig_refresh_token&access_token=' + INSTAGRAM_ACCESS_TOKEN
        );
        return null;
      });
  }

  function apiPostToItem(post) {
    var info = extractShortcode(post.permalink || '');
    return {
      id: post.id,
      type: info ? info.type : 'post',
      shortcode: info ? info.shortcode : '',
      caption: post.caption || '',
      mediaSrc: post.media_type === 'VIDEO'
        ? (post.thumbnail_url || post.media_url)
        : post.media_url,
      mediaType: post.media_type,
      gradient: 'linear-gradient(135deg, #141e30, #243b55)',
      icon: post.media_type === 'VIDEO' ? '🎬' : '📸'
    };
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


  // --- Build card media HTML ---
  function buildMediaHtml(item, type, iconSize) {
    // Real image/video from API
    if (item.mediaSrc) {
      return '<div class="card-media">' +
        '<img src="' + item.mediaSrc + '" alt="" loading="lazy">' +
      '</div>';
    }
    // Embed iframe for posts with a known shortcode
    if (item.shortcode) {
      return '<div class="card-media card-media--embed" style="background:' + (item.gradient || 'var(--surface)') + '">' +
        '<iframe src="' + embedUrl(item.shortcode, type) + '" ' +
        'frameborder="0" scrolling="no" allowtransparency="true" loading="lazy"></iframe>' +
      '</div>';
    }
    // Gradient placeholder
    return '<div class="card-media" style="background:' + item.gradient + '">' +
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:' + iconSize + 'px;opacity:0.3">' + item.icon + '</div>' +
    '</div>';
  }


  // --- Build Featured Grid ---
  function buildFeaturedGrid(posts) {
    var grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = '';

    posts.forEach(function (post) {
      var card = document.createElement('div');
      card.className = 'featured-card reveal';

      var mediaHtml = buildMediaHtml(post, post.type, 64);

      card.innerHTML =
        '<div class="featured-card-pin">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>' +
          'Pinned' +
        '</div>' +
        mediaHtml +
        '<div class="featured-card-overlay">' +
          '<div class="featured-card-caption">' + post.caption + '</div>' +
        '</div>' +
        (post.type === 'reel' ?
          '<div class="featured-card-play">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>' +
          '</div>' : '');

      card.addEventListener('click', function () {
        if (post.shortcode) {
          openEmbedModal(post.shortcode, post.type);
        } else {
          window.open(INSTAGRAM_URL, '_blank');
        }
      });
      grid.appendChild(card);
    });

    // Re-observe for scroll animations
    grid.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }


  // --- Build Feed Carousels ---
  function buildCarousel(trackId, items, cardType) {
    var track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = '';

    items.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'feed-card feed-card--' + cardType;

      var mediaHtml = buildMediaHtml(item, cardType, cardType === 'reel' ? 48 : 40);

      card.innerHTML =
        mediaHtml +
        '<div class="feed-card-overlay">' +
          '<div class="feed-card-caption">' + item.caption + '</div>' +
        '</div>' +
        (cardType === 'reel' ?
          '<div class="feed-card-play">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>' +
          '</div>' +
          '<div class="feed-card-type">Reel</div>' : '');

      card.addEventListener('click', function () {
        if (item.shortcode) {
          openEmbedModal(item.shortcode, cardType);
        } else {
          window.open(INSTAGRAM_URL, '_blank');
        }
      });
      track.appendChild(card);
    });
  }


  // --- Scroll Reveal (declared early so buildFeaturedGrid can use it) ---
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


  // --- Initialize Feed ---
  function renderFallback() {
    buildFeaturedGrid(fallbackPinned);
    buildCarousel('reelsTrack', fallbackReels, 'reel');
    buildCarousel('trainingTrack', fallbackTraining, 'post');
    buildCarousel('clinicsTrack', fallbackClinics, 'post');
  }

  fetchInstagramFeed().then(function (apiPosts) {
    if (!apiPosts || apiPosts.length === 0) {
      renderFallback();
      return;
    }

    var items = apiPosts.map(apiPostToItem);
    var videos = items.filter(function (p) { return p.mediaType === 'VIDEO'; });
    var images = items.filter(function (p) { return p.mediaType !== 'VIDEO'; });

    // Featured: first 3 posts
    buildFeaturedGrid(items.slice(0, 3));

    // Reels carousel: all videos
    buildCarousel('reelsTrack', videos.length > 0 ? videos : fallbackReels, 'reel');

    // Training carousel: first half of images
    var half = Math.ceil(images.length / 2);
    buildCarousel('trainingTrack', images.length > 0 ? images.slice(0, half) : fallbackTraining, 'post');

    // Clinics carousel: second half of images
    buildCarousel('clinicsTrack', images.length > half ? images.slice(half) : fallbackClinics, 'post');
  });


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
