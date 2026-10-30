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
  const interactiveElems = document.querySelectorAll('a, button, .portfolio-card, .service-card, input');
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
      const subtitle = card.querySelector('.card-work-subtitle')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.card-work-excerpt')?.textContent.toLowerCase() || '';
      const tags = card.querySelector('.card-skills-list')?.textContent.toLowerCase() || '';

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = (title.includes(query) || subtitle.includes(query) || excerpt.includes(query) || tags.includes(query));

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
    'youtube-script': {
      title: 'YouTube Scriptwriting Sample — "The Art of Being Unforgettable"',
      meta: 'Long-Form YouTube Script • Dark Psychology & Human Behaviour • 11–13 Min Duration',
      readingTime: '7 min read',
      content: `
        <div class="case-study-title">THE ART OF BEING UNFORGETTABLE</div>
        <div style="font-size:1.1rem; color:#d1d5db; font-style:italic; margin-top:-0.5rem; margin-bottom:1.5rem;">The Psychology of Making People Think About You When You're Not Around.</div>

        <div class="case-study-meta">
          <span>🎯 Genre: Dark Psychology, Human Behaviour, Social Dynamics</span>
          <span>⏱️ Estimated Duration: 11–13 Minutes</span>
          <span>🎙️ Narration Style: Calm, Controlled, Intellectually Provocative, Analytical</span>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.5rem; margin-bottom:2rem;">
          <h4 style="color:#f59e0b; margin-bottom:0.6rem; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem;">Project Context & Scriptwriting Approach</h4>
          <p style="margin:0 0 0.75rem 0; font-size:0.95rem; line-height:1.6; color:#e5e7eb;">
            A long-form psychological storytelling script exploring why certain individuals remain in our thoughts long after an interaction ends. Built around real-life scenarios, psychological concepts, and the ideas of Robert Greene, the script transforms an intellectual discussion into an engaging cinematic narrative.
          </p>
          <p style="margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
            • Creative direction influenced by storytelling creators like Kallaway and George Alexander.<br>
            • Developed from an analysis of Robert Greene's conversation with Raj Shamani.<br>
            • Presented strictly as a professional writing portfolio sample.
          </p>
        </div>

        <hr style="border-color:var(--card-border); margin: 2rem 0;">

        <!-- ACT I: THE HOOK -->
        <h3 style="color:#fff; margin-bottom:0.75rem; font-size:1.2rem;">[ACT I: THE PHANTOM PRESENCE — COLD OPEN] (0:00 – 1:45)</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; font-style:italic; margin-bottom:1rem;">
          [VISUAL: Slow, cinematic tracking shot across an empty room. Warm low-key lighting. Rain softly hits a windowpane. Cut to a quiet café table where two people just finished a conversation; one chair is empty. The focus lingers on the empty space.]<br>
          [AUDIO: Low-frequency atmospheric ambient drone. A faint, deliberate heartbeat pulse entering at 0:25.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.75rem;">
          <strong>NARRATOR (Calm, measured, intimate):</strong><br>
          "Have you ever noticed that the people you think about the most aren't usually the ones who talk the most?<br><br>
          They aren't the loudest in the room. They don't fill every silence with desperate chatter. They aren't constantly begging for your validation or posting every micro-detail of their lives to prove their worth.<br><br>
          In fact, it's often the exact opposite.<br><br>
          You might have only spoken to them for twenty minutes. The conversation felt effortless—perhaps even understated. But later that night, as you're driving home in the quiet of your car, or staring at your ceiling before falling asleep, their words replay in your head.<br><br>
          A single question they asked. The relaxed way they held eye contact. The fact that they didn't seem in a rush to convince you of anything.<br><br>
          Why does this happen? Why do some people vanish from our memory the second they walk out the door, while others take up permanent residence in our minds?<br><br>
          Psychologists call this cognitive retention. But strategists like Robert Greene describe it through a much older, more calculated principle: <em>the art of strategic absence</em>."
        </div>

        <!-- ACT II: HYPER-AVAILABILITY -->
        <h3 style="color:#fff; margin-bottom:0.75rem; font-size:1.2rem;">[ACT II: THE TRAP OF HYPER-AVAILABILITY] (1:45 – 4:20)</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; font-style:italic; margin-bottom:1rem;">
          [VISUAL: Kinetic editorial montage—fast cuts of phone notifications, infinite scroll feeds, frantic networking events. Cut sharply to total silence: a solitary figure observing a room with quiet stillness.]<br>
          [AUDIO: Sound of digital noise suddenly cut off by a muffled bass drop.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.75rem;">
          <strong>NARRATOR:</strong><br>
          "Most people operate under a dangerous social misconception: they believe that to be valued, they must be constantly visible.<br><br>
          They double-text. They over-explain. They linger too long at gatherings. They make themselves endlessly available because their subconscious fears that if they disappear for even a day, they will be forgotten.<br><br>
          What they fail to understand is that availability destroys value.<br><br>
          In economics, scarcity creates worth. In human psychology, the exact same law governs fascination.<br><br>
          When Robert Greene examined human nature during his conversation with Raj Shamani, he laid bare an uncomfortable truth about human desire: people cannot yearn for what is already suffocating them.<br><br>
          When you are always there—always accessible, always eager to respond within four seconds—you remove the single element that fuels human imagination: the space to wonder.<br><br>
          Your presence becomes ambient background noise. To make someone think about you when you're not around, you must first give them the opportunity to feel your absence."
        </div>

        <!-- ACT III: ZEIGARNIK EFFECT -->
        <h3 style="color:#fff; margin-bottom:0.75rem; font-size:1.2rem;">[ACT III: THE ZEIGARNIK EFFECT & STRATEGIC MYSTERY] (4:20 – 7:10)</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; font-style:italic; margin-bottom:1rem;">
          [VISUAL: Split-screen documentary style. Historical black-and-white archives of 1920s Vienna cafés blending into modern psychological diagram overlays.]<br>
          [AUDIO: Subtle, rhythmic clock tick tempo. Gentle piano chords.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.75rem;">
          <strong>NARRATOR:</strong><br>
          "In the 1920s, psychologist Bluma Zeigarnik sat in a bustling Vienna café and noticed something curious about the waiters.<br><br>
          They could remember complex, unwritten food orders for twelve tables at once without missing a beat. But the exact moment the bill was paid and the table was cleared, the memory vanished completely. If you asked them five minutes later what you had ordered, they couldn't tell you.<br><br>
          Her finding became known as the Zeigarnik Effect: the human brain cannot tolerate an open loop. It craves closure.<br><br>
          When an interaction leaves an unanswered question, an intriguing unfinished thought, or an unresolved emotional frequency, your subconscious mind continuously cycles through it, trying to piece together the answer.<br><br>
          Amateur communicators spill everything on the first meeting. They dump their entire history, their trauma, their political opinions, and their insecurities onto the table. They leave zero mystery.<br><br>
          A master storyteller—or anyone who understands human dynamics—withholds roughly twenty percent.<br><br>
          They share something poignant, pause, and let the implication breathe. They don't over-explain the punchline. And when the conversation reaches its most fascinating peak, they have the discipline to conclude it. They leave the psychological loop wide open."
        </div>

        <!-- ACT IV: EMOTIONAL CONTRAST -->
        <h3 style="color:#fff; margin-bottom:0.75rem; font-size:1.2rem;">[ACT IV: THE POWER OF EMOTIONAL CONTRAST] (7:10 – 9:30)</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; font-style:italic; margin-bottom:1rem;">
          [VISUAL: High-contrast chiaroscuro lighting. Focus on nuanced facial expressions—the micro-signals of active listening versus passive waiting.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.75rem;">
          <strong>NARRATOR:</strong><br>
          "Consider the emotional texture of everyday life. Most human interactions are flat, predictable, and transactional.<br><br>
          'How are you?' 'Good, how are you?' 'Busy, you know how it is.'<br><br>
          When you enter a room and match that exact frequency, you become utterly invisible.<br><br>
          Being unforgettable does not require flamboyant theatricality or loud charisma. It requires emotional contrast.<br><br>
          When everyone around you is anxious and fidgeting with their screens, you bring deliberate stillness.<br><br>
          When people are desperate to talk about themselves, you offer deep, undivided attention. You don't listen to wait for your turn to speak; you listen to detect the subtext beneath their words.<br><br>
          Robert Greene has often highlighted that humans spend the majority of their lives starved of genuine understanding. If you become the rare individual who makes someone feel truly seen, you install an emotional anchor in their nervous system.<br><br>
          And when you walk away, the mundane coldness of ordinary life reminds them of the contrast you provided."
        </div>

        <!-- ACT V: THE INVERSION OF NEED -->
        <h3 style="color:#fff; margin-bottom:0.75rem; font-size:1.2rem;">[ACT V: THE INVERSION OF NEED] (9:30 – 11:45)</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; font-style:italic; margin-bottom:1rem;">
          [VISUAL: Slow camera push-in. High-resolution cinematic portrait framing. Steady, centered eye line.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.75rem;">
          <strong>NARRATOR:</strong><br>
          "Here is the foundational paradox of social dynamics:<br><br>
          The harder you try to make someone remember you, the more forgettable you become.<br><br>
          Desperation has a scent. When you crave approval, when you laugh too hard at mediocre jokes, or when you fish for validation, people instinctively pull away. The human brain registers insecurity as a burden.<br><br>
          The unforgettable individual operates from an inversion of need.<br><br>
          They are comfortable with silence. If a conversation pauses, they don't panic. They don't scramble to fill the void. They allow silence to exist without apologizing for it.<br><br>
          They are fully present while they are with you, but they are clearly anchored to a purpose that exists outside the room. You sense that their internal world does not depend on your applause.<br><br>
          That emotional sovereignty is quietly hypnotic.<br><br>
          Because when someone doesn't need your validation, you suddenly find yourself wondering what they think of you."
        </div>

        <!-- ACT VI: THE UNFINISHED CONCLUSION -->
        <h3 style="color:#fff; margin-bottom:0.75rem; font-size:1.2rem;">[ACT VI: THE INCOMPLETE RESOLUTION] (11:45 – 12:30)</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; font-style:italic; margin-bottom:1rem;">
          [VISUAL: Camera tracks slowly backward through an empty corridor. Warm lights dim down one by one. Lingering footsteps.]<br>
          [AUDIO: Percussion fades away completely. A solitary, sustained cello harmonic tone hangs in the silence.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.5rem;">
          <strong>NARRATOR:</strong><br>
          "Ultimately, being unforgettable is not an act of clever manipulation or rehearsed conversational tactics.<br><br>
          It is a discipline of restraint.<br><br>
          It is knowing when to speak and when to remain quiet.<br><br>
          It is knowing how to give people your full warmth in the moment, and having the courage to step back so your presence can settle into their thoughts.<br><br>
          Because in the end, you don't become unforgettable by trying to force someone to remember you; you become unforgettable when your presence was genuine, and your absence leaves a space that"
        </div>

        <div class="manuscript-incomplete-flag">
          <strong>[PORTFOLIO NOTE — INCOMPLETE ENDING]</strong>
          The original portfolio script draft concludes here with an unfinished final sentence, preserved without fabrication per the author's writing archive.
        </div>
      `
    },
    'ghost-saga': {
      title: 'GHOST - SAGA — Original Novel',
      meta: 'Original Novel / Creative Writing • Coming Soon',
      readingTime: '2 min read',
      content: `
        <div class="case-study-title">GHOST - SAGA</div>
        <div class="case-study-meta">
          <span style="color:#f59e0b; font-weight:600;">⚡ Status: Coming Soon</span>
          <span>📖 Category: Original Novel / Creative Writing</span>
          <span>🎭 Genre: Dark Psychological Fantasy</span>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-left:3px solid var(--accent-white); border-radius:0 14px 14px 0; padding:2rem; margin:1.75rem 0;">
          <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:2px; color:var(--text-muted); font-weight:700; margin-bottom:1.25rem;">PUBLIC SYNOPSIS</div>
          <div style="font-family:var(--font-serif, Georgia, serif); font-size:1.15rem; line-height:1.9; color:var(--text-primary);">
            <p style="margin-bottom:1.2rem;">Something happened to the world.</p>
            <p style="margin-bottom:1.2rem;">An unexplained incident changed humanity forever.</p>
            <p style="margin-bottom:1.2rem;">A mysterious power emerged, and civilization would never be the same again.</p>
            <p style="margin-bottom:1.2rem;">The world descended into chaos. New powers awakened. The natural order began to collapse. And humanity found itself facing consequences it could neither understand nor control.</p>
            <p style="margin-bottom:1.2rem;">Was it an experiment?</p>
            <p style="margin-bottom:1.2rem;">An extraordinary phenomenon?</p>
            <p style="margin-bottom:1.2rem;">Or something far beyond human understanding?</p>
            <p style="margin-bottom:1.2rem;">As the world struggles to survive the aftermath, one question remains unanswered:</p>
            <p style="margin-bottom:1.2rem; font-weight:700; color:#fff;">What truly happened that day?</p>
            <p style="margin-bottom:1.5rem;">And in a world where power determines everything, what happens when someone without it enters a game he was never meant to play?</p>
            <p style="margin:0; font-style:italic; color:var(--text-secondary); border-top:1px solid rgba(255,255,255,0.08); padding-top:1.25rem;">A dark psychological fantasy about power, mystery, ambition, and the fragile nature of humanity.</p>
          </div>
        </div>

        <div style="padding:1.25rem 1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; margin-top:1.5rem;">
          <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:1.5px; color:#f59e0b; font-weight:700; margin-bottom:0.4rem;">Status Update</div>
          <p style="margin:0; font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Currently in development. Official reading listings, serialized release schedule, and launch announcements will be published upon debut.
          </p>
        </div>
      `
    },
    'thamizh-guardians': {
      title: 'THAMIZH GUARDIANS — Promotional Scriptwriting & Marketing Copywriting',
      meta: 'Promotional Scriptwriting / Marketing Copywriting • Video Reel Scripts',
      readingTime: '3 min read',
      content: `
        <div class="case-study-title">THAMIZH GUARDIANS</div>
        <div style="font-size:1.05rem; color:#d1d5db; font-style:italic; margin-top:-0.5rem; margin-bottom:1.25rem;">
          Promotional Video Scripts & Multi-Platform Launch Copywriting
        </div>

        <div class="case-study-meta">
          <span>🎬 Deliverables: Video Reel Scripts, Social Media Copy, Launch Strategy</span>
          <span>🎯 Focus: Action-Fantasy Manga Promotion & Audience Hook Retention</span>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem 1.5rem; margin-bottom:1.75rem;">
          <h4 style="color:#f59e0b; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:1px; font-size:0.75rem;">Project Scope & Attribution</h4>
          <p style="margin:0 0 0.5rem 0; font-size:0.9rem; line-height:1.5; color:var(--text-primary);">
            Commissioned promotional scriptwriting and marketing content creation for the manga series:
          </p>
          <ul style="margin:0 0 0.75rem 1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
            <li>Promotional video scripts & pacing frameworks</li>
            <li>Social media reel scripts optimized for 3-second hook retention</li>
            <li>Launch copy and platform announcement messaging</li>
            <li>Campaign storytelling and teaser structuring</li>
          </ul>
          <p style="margin:0; font-size:0.8rem; color:var(--text-muted); font-style:italic; border-top:1px solid rgba(255,255,255,0.06); padding-top:0.6rem;">
            Attribution Notice: The work showcased below consists of commissioned promotional scriptwriting and marketing copywriting. Rajesh N is not the creator, author, artist, or owner of Thamizh Guardians.
          </p>
        </div>

        <h3 style="margin-top:1.5rem; margin-bottom:0.75rem; color:#fff; font-size:1.15rem;">[PROMOTIONAL REEL SCRIPT: MULTI-PLATFORM LAUNCH]</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; font-style:italic; margin-bottom:1rem;">
          [FORMAT: 60-Second Short-Form Video / Reel]<br>
          [OBJECTIVE: Stop the scroll within 3 seconds, evoke curiosity about the Tamil warrior lore, and announce platform accessibility.]
        </p>

        <div class="script-dialogue" style="margin-bottom:1.5rem;">
          <strong>[SCENE 1: THE HOOK] (0:00 - 0:08)</strong><br>
          <em>[VISUAL: Rapid flash of temple silhouettes, crimson blade arcs, and intricate warrior sigils fading into inked panel art.]</em><br>
          <em>[AUDIO: Accelerating traditional drum pulse, metallic clash, sudden silence.]</em><br><br>
          <strong>VOICEOVER (Conversational, urgent):</strong><br>
          "Wait... idha miss pannadheenga. Neenga manga padikkarathu pidikkuma-na? Appo intha announcement ungalukkuthaan."<br><br>

          <strong>[SCENE 2: THE MULTI-PLATFORM HOOK] (0:08 - 0:35)</strong><br>
          <em>[VISUAL: Kinetic manga panel carousel showcasing supernatural conflicts and warrior heritage.]</em><br><br>
          <strong>VOICEOVER:</strong><br>
          "Namma manga ippo... multiple platforms-la available irukku. Experience onnu thaan — same story, same manga. Aanaa, ungalukku pudichcha platform-la padikkalaam."<br><br>

          <strong>[SCENE 3: THE CALL TO ACTION] (0:35 - 0:60)</strong><br>
          <em>[VISUAL: Split screen highlighting verified platform logos, transitioning to bold title logo.]</em><br><br>
          <strong>VOICEOVER:</strong><br>
          "Neenga endha platform-a choose panna poreenga? Link bio-la irukku. And start reading today."
        </div>

        <div style="margin-top:1.5rem; padding:1.25rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px;">
          <h4 style="color:#fff; font-size:0.85rem; margin-bottom:0.4rem;">External Reference Destinations (Client Series):</h4>
          <p style="margin:0 0 0.4rem 0; font-size:0.85rem; color:var(--text-secondary);">
            • <strong>GlobalComix:</strong> <a href="https://globalcomix.com/c/thamizh-guardians" target="_blank" rel="noopener noreferrer" style="color:#ef4444; text-decoration:underline;">External Series Listing</a> (Official publisher release)
          </p>
          <p style="margin:0; font-size:0.85rem; color:var(--text-secondary);">
            • <strong>MANGA Plus Creators by SHUEISHA:</strong> <a href="https://mangaplus-creators.jp/episodes/vm2606092033210027363182" target="_blank" rel="noopener noreferrer" style="color:#f59e0b; text-decoration:underline;">External Episode Showcase</a>
          </p>
        </div>
      `
    },
    'manga-script': {
      // Alias for backwards-compatibility
      title: 'THAMIZH GUARDIANS — Promotional Scriptwriting',
      meta: 'Promotional Scriptwriting / Marketing Copywriting',
      readingTime: '3 min read',
      content: `
        <div class="case-study-title">THAMIZH GUARDIANS</div>
        <p>Attribution: Commissioned promotional scriptwriting and marketing copywriting. Not the creator, author, artist, or owner of Thamizh Guardians.</p>
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
      // Alias for backwards compatibility
      title: 'GHOST - SAGA — Original Novel',
      meta: 'Original Novel / Creative Writing • Coming Soon',
      readingTime: '2 min read',
      content: `
        <div class="case-study-title">GHOST - SAGA</div>
        <p>Status: Coming Soon. A dark psychological fantasy about power, mystery, ambition, and the fragile nature of humanity.</p>
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
