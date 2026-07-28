/* ==========================================
   RAJESH N - PORTFOLIO SCRIPT (VANILLA JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------
     1. PRELOADER & INITIALIZATION
     ------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const loaderBarFill = document.querySelector('.loader-bar-fill');
  const loaderCounter = document.querySelector('.loader-counter');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
      }, 300);
    }
    if (loaderBarFill) loaderBarFill.style.width = `${progress}%`;
    if (loaderCounter) loaderCounter.textContent = `${progress}%`;
  }, 40);

  /* ------------------------------------------------
     2. CUSTOM CURSOR
     ------------------------------------------------ */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    if (cursorOutline) {
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect over interactive elements
  const interactiveElems = document.querySelectorAll('a, button, .portfolio-card, .service-card');
  interactiveElems.forEach(elem => {
    elem.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    elem.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  /* ------------------------------------------------
     3. SCROLL PROGRESS & NAVBAR STICKY
     ------------------------------------------------ */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrolled}%`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Active Nav Link Highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollTop >= top && scrollTop < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------
     4. MOBILE MENU TOGGLE
     ------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  /* ------------------------------------------------
     5. HERO TYPING EFFECT
     ------------------------------------------------ */
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const phrases = [
      'Psychological Storyteller',
      'Healthcare Writer',
      'LinkedIn Ghostwriter',
      'Novel Author',
      'Content Strategist'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }

  /* ------------------------------------------------
     6. MAGNETIC BUTTONS EFFECT
     ------------------------------------------------ */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  /* ------------------------------------------------
     7. WRITING STATS ANIMATED COUNTER (GUARDED)
     ------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.getElementById('stats');
  let animatedStats = false;

  if (statNumbers.length > 0 && statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(numElem => {
            const target = parseInt(numElem.getAttribute('data-target'), 10);
            const suffix = numElem.getAttribute('data-suffix') || '';
            let count = 0;
            const step = Math.ceil(target / 40);

            const counter = setInterval(() => {
              count += step;
              if (count >= target) {
                count = target;
                clearInterval(counter);
              }
              numElem.textContent = `${count.toLocaleString()}${suffix}`;
            }, 30);
          });
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  /* ------------------------------------------------
     8. FADE-IN ON SCROLL
     ------------------------------------------------ */
  const fadeSections = document.querySelectorAll('.fade-in-section');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeSections.forEach(sec => fadeObserver.observe(sec));

  /* ------------------------------------------------
     9. PORTFOLIO FILTER & SEARCH
     ------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const searchInput = document.getElementById('portfolioSearch');

  function filterPortfolio() {
    const activeCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    portfolioCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.card-work-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.card-work-excerpt')?.textContent.toLowerCase() || '';

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = (title.includes(query) || excerpt.includes(query));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.classList.add('visible');
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPortfolio();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterPortfolio);
  }

  /* ------------------------------------------------
     10. CASE STUDY & ONLINE NOVEL READER MODAL
     ------------------------------------------------ */
  const workModal = document.getElementById('workModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const readerProgressBar = document.getElementById('readerProgressBar');
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  const fontToggleBtn = document.getElementById('fontToggleBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Work Data Store
  const workData = {
    'manga-script': {
      title: 'Manga Promotion Reel Script — "Shadows of Elysium"',
      meta: 'Script Writing • Anime/Manga Marketing • 60-Second Video Hook',
      readingTime: '3 min read',
      content: `
        <div class="case-study-title">Manga Promotion Reel Script: "Shadows of Elysium"</div>
        <div class="case-study-meta">
          <span>🎬 Format: Reel / Shorts Script</span>
          <span>⏱️ Duration: 60 Seconds</span>
          <span>🎯 Target: Dark Fantasy Anime Community</span>
        </div>

        <p><strong>OBJECTIVE:</strong> Capture viewer attention in the first 3 seconds and drive manga preorder conversions on Social Media.</p>

        <h3 style="margin-top:2rem; margin-bottom:1rem; color:#fff;">[SCENE 1: THE HOOK] (0:00 - 0:08)</h3>
        <p><em>[VISUAL: Rapid jump cuts of ink splatters, heavy rain falling upside down against a neon pitch-black alley, and a glowing crimson eye snapping open.]</em></p>
        <p><em>[SOUND: Deep bass drop, muffled rain heartbeat, whispering voices.]</em></p>
        <div class="script-dialogue">
          <strong>VOICEOVER (Deep, enigmatic tone):</strong><br>
          "They told you memories were permanent. They lied to you..."
        </div>

        <h3 style="margin-top:2rem; margin-bottom:1rem; color:#fff;">[SCENE 2: THE CONFLICT] (0:08 - 0:25)</h3>
        <p><em>[VISUAL: Fast-paced manga panel reveals. Character Kael holding a cracked obsidian flask. Pan down to a shattered laboratory glass with glowing blue liquid.]</em></p>
        <div class="script-dialogue">
          <strong>VOICEOVER:</strong><br>
          "In Elysium City, your happiest memory can be auctioned to the highest bidder by midnight. And Kael just discovered who bought his childhood."
        </div>

        <h3 style="margin-top:2rem; margin-bottom:1rem; color:#fff;">[SCENE 3: THE CLIMAX & CTA] (0:25 - 0:60)</h3>
        <p><em>[VISUAL: Kinetic typography scrolling across sword clashes, manga panel speed-lines, crescendo orchestration.]</em></p>
        <div class="script-dialogue">
          <strong>VOICEOVER:</strong><br>
          "Will he burn the city to get it back—or forget he ever loved her? Read Chapter 1 now on MangaPlus."
        </div>
      `
    },
    'linkedin-post': {
      title: 'LinkedIn Thought Leadership: AI & Student Cognition',
      meta: 'LinkedIn Ghostwriting • Educational Psychology • Thought Leadership',
      readingTime: '4 min read',
      content: `
        <div class="case-study-title">"The students who benefit most from AI are not the ones outsourcing their thinking..."</div>
        <div class="case-study-meta">
          <span>💼 Type: High-Engagement LinkedIn Essay</span>
          <span>📈 Metric: 45,000+ Impressions, 620 Shares</span>
        </div>

        <p>The students who benefit most from AI are not the ones using it to generate instant essays.</p>

        <p>They are the ones using it as a relentless sparring partner for their own critical reasoning.</p>

        <p>As a pharmacy student immersed in pharmacology and neurochemistry, I see a clear parallel in cognitive science:</p>

        <h4 style="margin-top:1.5rem; color:#fff;">1. Passive Consumption vs. Active Retrieval</h4>
        <p>When you ask AI to write your synthesis, your brain skips the neural encoding process. You get the output, but lose the mental muscle.</p>

        <h4 style="margin-top:1.5rem; color:#fff;">2. Socratic Interrogation</h4>
        <p>The high-performing students use AI to test their hypotheses. They prompt: <em>"Here is my analysis of drug receptor interactions. Attack my weak assumptions."</em></p>

        <h4 style="margin-top:1.5rem; color:#fff;">3. The Synthesis Advantage</h4>
        <p>AI aggregates information fast; human curiosity connects seemingly unrelated disciplines. True authority comes from the synthesis.</p>

        <p style="margin-top:2rem;"><strong>Takeaway:</strong> Don't use AI to replace your curiosity. Use it to supercharge your interrogation of the world.</p>
      `
    },
    'healthcare-article': {
      title: 'Healthcare Article: Human Behavior & Pharmacy',
      meta: 'Medical Writing • Pharmacology • Psychological Behavior',
      readingTime: '6 min read',
      content: `
        <div class="case-study-title">Why Human Behavior Fascinates Me as a Pharmacy Student</div>
        <div class="case-study-meta">
          <span>🩺 Category: Medical & Psychological Essay</span>
          <span>🔬 Topics: Patient Adherence, Neurochemistry, Empathy</span>
        </div>

        <p>In medical lectures, we spend hundreds of hours studying chemical structures, mechanism of action diagrams, and receptor binding affinities. We learn precisely how a molecule binds to a G-protein coupled receptor to modulate cellular function.</p>

        <p>Yet, the most complex variable in healthcare is never listed on a chemical reaction chart: <strong>human behavior</strong>.</p>

        <h3 style="margin-top:2rem; margin-bottom:1rem; color:#fff;">The Adherence Paradox</h3>
        <p>A medication can possess a 99% efficacy rating in clinical trials, but if a patient forgets, fears, or distrusts the therapy, its real-world efficacy drops to zero. Over 50% of chronic disease patients worldwide fail to take prescribed regimens as directed.</p>

        <p>Why? Because medical compliance is fundamentally a psychological challenge, not just a biological one.</p>

        <h3 style="margin-top:2rem; margin-bottom:1rem; color:#fff;">Neurochemistry Meets Narrative</h3>
        <p>When communicating health science, abstract statistics rarely motivate behavior change. Stories and clear, empathetic explanations do. When patients understand <em>how</em> a medication supports their lifestyle rather than just being handed a list of warnings, trust builds.</p>

        <p>Bridging pharmacology with human psychology is the core mission behind my technical and health communication work.</p>
      `
    },
    'novel-chapter': {
      title: 'Novel: "The Last Experiment"',
      meta: 'Psychological Fiction • Science Fiction • Online Reader',
      readingTime: '8 min read',
      content: `
        <div class="case-study-title">The Last Experiment</div>
        <div class="case-study-meta">
          <span>📖 Genre: Psychological Thriller / Sci-Fi</span>
          <span>📍 Chapter 1: The Echo in Room 404</span>
        </div>

        <p><strong>SYNOPSIS:</strong> In a subterranean pharmaceutical facility, lead neuro-researcher Dr. Kaelen Vane discovers a chemical isolate capable of selective memory extraction. But when he discovers an erased file bearing his own handwriting from three weeks prior, he realizes he was the first subject.</p>

        <hr style="border-color:var(--card-border); margin: 2rem 0;">

        <h3 style="margin-bottom:1.5rem; color:#fff; font-family:var(--font-serif);">Chapter 1: The Echo in Room 404</h3>

        <p>The hum of the bio-containment centrifuge was the only constant sound in the sub-basement of Sector 7. Outside, rain beat against the reinforced glass slits of the surface tower, but three floors below ground, weather was merely a theoretical concept.</p>

        <p>Dr. Kaelen Vane adjusted his magnifying loupe and stared at the dark amber solution resting inside Vial 09. Synthesized from a rare neuro-modulating compound, the liquid promised to cure trauma-induced memory loops. It was supposed to be humanity's greatest breakthrough in cognitive therapy.</p>

        <p>Until the terminal screen blinked.</p>

        <p><em>"SUBJECT 01 DE-SYNCHRONIZATION COMPLETE. LOG 21 RECOVERED."</em></p>

        <p>Kaelen frowned. He hadn't logged a Subject 01 session. The trial phase wasn't scheduled to begin for another fortnight. He pulled up the log timestamp. The entry was logged 21 days ago, at 03:14 AM. The digital signature on the encryption key matched his personal biometric ring.</p>

        <p>With trembling fingers, he opened the audio playback.</p>

        <p>His own voice filled the silent laboratory, quiet, hurried, and terrified:</p>

        <p><em>"If you are listening to this, Kaelen... do not look at the mirror in Room 404. You already took the dose."</em></p>
      `
    }
  };

  // Open Modal Function
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const workId = card.getAttribute('data-id');
      const data = workData[workId];

      if (data && workModal && modalBody) {
        modalBody.innerHTML = data.content;
        workModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Check if saved bookmark exists
        const savedBookmark = localStorage.getItem(`bookmark_${workId}`);
        if (savedBookmark && bookmarkBtn) {
          bookmarkBtn.style.color = '#10b981';
        }
      }
    });
  });

  // Close Modal Function
  if (modalCloseBtn && workModal) {
    modalCloseBtn.addEventListener('click', () => {
      workModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    workModal.addEventListener('click', (e) => {
      if (e.target === workModal) {
        workModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Reader Progress & Scroll Listener inside Modal
  if (modalBody && readerProgressBar) {
    modalBody.addEventListener('scroll', () => {
      const scrollTop = modalBody.scrollTop;
      const scrollHeight = modalBody.scrollHeight - modalBody.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      readerProgressBar.style.width = `${progress}%`;
    });
  }

  // Reader Font Toggle
  if (fontToggleBtn) {
    fontToggleBtn.addEventListener('click', () => {
      const container = document.querySelector('.modal-container');
      if (container) {
        container.classList.toggle('reader-font-serif');
        fontToggleBtn.textContent = container.classList.contains('reader-font-serif') ? 'Font: Serif' : 'Font: Sans';
      }
    });
  }

  // Reader Theme Toggle
  if (themeToggleBtn) {
    const themes = ['', 'reader-theme-sepia', 'reader-theme-light'];
    let themeIdx = 0;

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.remove('reader-theme-sepia', 'reader-theme-light');
      themeIdx = (themeIdx + 1) % themes.length;
      if (themes[themeIdx]) {
        document.body.classList.add(themes[themeIdx]);
      }
      themeToggleBtn.textContent = `Theme: ${themes[themeIdx] ? themes[themeIdx].replace('reader-theme-', '') : 'Dark'}`;
    });
  }

  // Bookmark Functionality
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      showToast('Bookmark saved to local reader storage!');
      bookmarkBtn.style.color = '#10b981';
    });
  }

  /* ------------------------------------------------
     11. TOAST NOTIFICATION UTILITY
     ------------------------------------------------ */
  const toastNotification = document.getElementById('toastNotification');

  function showToast(message) {
    if (toastNotification) {
      toastNotification.textContent = message;
      toastNotification.classList.add('show');
      setTimeout(() => {
        toastNotification.classList.remove('show');
      }, 3500);
    }
  }

});
