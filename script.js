document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) { console.error("data.js not loaded"); return; }

  // =============================================
  // 1. CUSTOM CURSOR
  // =============================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Expand ring on hoverable elements
  document.querySelectorAll('a, button, .filter-btn, .project-card, .stat-card, .timeline-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '60px';
      cursorRing.style.height = '60px';
      cursorRing.style.borderColor = 'rgba(0, 255, 136, 0.8)';
      cursorDot.style.transform += ' scale(0)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'rgba(0, 255, 136, 0.5)';
    });
  });


  // =============================================
  // 2. SCROLL PROGRESS BAR (GAME SECTOR LABELS)
  // =============================================
  const progressBar = document.getElementById('scroll-progress-bar');
  const progressLabel = document.getElementById('scroll-progress-label');

  const sectorMap = [
    { id: 'hero', label: 'SECTOR 01 — INIT' },
    { id: 'about', label: 'SECTOR 02 — PROFILE' },
    { id: 'skills', label: 'SECTOR 03 — ARSENAL' },
    { id: 'timeline', label: 'SECTOR 04 — TIMELINE' },
    { id: 'projects', label: 'SECTOR 05 — PROJECTS' },
    { id: 'contact', label: 'SECTOR 06 — CONTACT' },
  ];

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min((scrollTop / docHeight) * 100, 100);

    // Update CSS var for scroll progress bar width
    document.documentElement.style.setProperty('--scroll-progress', pct + '%');

    // Active sector label
    let activeSector = sectorMap[0];
    sectorMap.forEach(s => {
      const el = document.getElementById(s.id);
      if (el && scrollTop >= el.offsetTop - 150) activeSector = s;
    });
    progressLabel.textContent = activeSector.label;
  });


  // =============================================
  // 3. SMOOTH PARALLAX SCROLL (GAME FEEL)
  // =============================================
  // Custom smooth scrolling — slight momentum/lag for premium feel
  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let isScrolling = false;

  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetY += e.deltaY * 0.85; // scale factor for feel
    targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
    if (!isScrolling) {
      isScrolling = true;
      smoothScroll();
    }
  }, { passive: false });

  function smoothScroll() {
    const diff = targetY - currentY;
    if (Math.abs(diff) < 0.5) {
      currentY = targetY;
      isScrolling = false;
      return;
    }
    currentY += diff * 0.1;
    window.scrollTo(0, currentY);
    requestAnimationFrame(smoothScroll);
  }

  // Allow normal scroll for touch/keyboard
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
      targetY = window.scrollY;
      currentY = window.scrollY;
    }
  });

  // =============================================
  // 4. NAVIGATION SCROLL HEADER + ACTIVE LINK
  // =============================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        targetY = target.offsetTop;
        currentY = window.scrollY;
        isScrolling = true;
        smoothScroll();
      }
    });
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    let current = '';
    document.querySelectorAll('section').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });


  // =============================================
  // 5. CANVAS PARTICLE GRID
  // =============================================
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.color = Math.random() > 0.5 ? 'rgba(0, 255, 136,' : 'rgba(0, 212, 255,';
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const f = (100 - dist) / 100;
          this.x += Math.cos(Math.atan2(dy, dx)) * f * 1.5;
          this.y += Math.sin(Math.atan2(dy, dx)) * f * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    const n = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 100);
    particles = Array.from({ length: n }, () => new Particle());
  }
  initParticles();

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const alpha = ((110 - dist) / 110) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();


  // =============================================
  // 6. TYPING EFFECT
  // =============================================
  const typedEl = document.getElementById('typed-text');
  const phrases = data.personalInfo.subtitles;
  let pi = 0, ci = 0, erasing = false;

  function type() {
    const word = phrases[pi];
    if (!erasing && ci <= word.length) {
      typedEl.textContent = word.slice(0, ci++);
      setTimeout(type, 90);
    } else if (!erasing && ci > word.length) {
      erasing = true;
      setTimeout(type, 2000);
    } else if (erasing && ci >= 0) {
      typedEl.textContent = word.slice(0, ci--);
      setTimeout(type, 50);
    } else {
      erasing = false;
      pi = (pi + 1) % phrases.length;
      ci = 0;
      setTimeout(type, 300);
    }
  }
  setTimeout(type, 800);


  // =============================================
  // 7. POPULATE DATA INTO DOM
  // =============================================
  const p = data.personalInfo;
  document.getElementById('cv-btn').href = p.cvLink;
  document.getElementById('contact-email').textContent = p.email;
  document.getElementById('contact-email').href = `mailto:${p.email}`;
  document.getElementById('contact-location').textContent = p.location;
  document.getElementById('footer-copy').innerHTML = `&copy; ${new Date().getFullYear()} ${p.name} — ${p.handle}`;
  document.title = `${p.handle} | Software Engineer`;

  // Social links
  const footerSocials = document.getElementById('footer-socials');
  const socialLinks = [
    { url: p.github, icon: '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.523-10-10-10z"/></svg>' },
    { url: p.linkedin, icon: '<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>' }
  ];
  socialLinks.forEach(s => {
    if (!s.url || s.url === '#') return;
    const a = document.createElement('a');
    a.href = s.url;
    a.target = '_blank';
    a.className = 'social-icon';
    a.innerHTML = s.icon;
    footerSocials.appendChild(a);
  });


  // =============================================
  // 8. POPULATE SKILLS
  // =============================================
  const skillsGrid = document.getElementById('skills-grid');
  data.skills.forEach((cat, i) => {
    const div = document.createElement('div');
    div.className = 'skills-category reveal';
    div.style.transitionDelay = `${i * 0.1}s`;
    div.innerHTML = `
      <div class="skills-category-title">${cat.category}</div>
      <div class="skills-list">
        ${cat.items.map(s => `
          <div class="skill-item">
            <div class="skill-meta">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${s.level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    skillsGrid.appendChild(div);
  });


  // =============================================
  // 9. POPULATE TIMELINE
  // =============================================
  function buildTimeline(items, containerId, isEdu = false) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      const desc = isEdu ? item.achievements : item.description;
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-role">${isEdu ? item.degree : item.role}</div>
          <div class="timeline-org">${isEdu ? item.institution : item.company}</div>
          <div class="timeline-period">${item.duration}${isEdu ? ` &nbsp;|&nbsp; ${item.gpa}` : ` &nbsp;|&nbsp; ${item.location}`}</div>
          <ul class="timeline-list">
            ${desc.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `;
      container.appendChild(el);
    });
  }
  buildTimeline(data.experience, 'experience-container');
  buildTimeline(data.education, 'education-container', true);


  // =============================================
  // 10. POPULATE PROJECTS + FILTERING
  // =============================================
  const projectsGrid = document.getElementById('projects-grid');

  function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    data.projects
      .filter(p => filter === 'all' || p.category === filter)
      .forEach((proj, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', proj.category);
        card.style.transitionDelay = `${i * 0.06}s`;

        const tagsHtml = proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        const highlightsHtml = proj.highlights && proj.highlights.length > 0
          ? `<ul class="project-highlights">${proj.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`
          : '';

        const coDevHtml = proj.coDev
          ? `<a href="${proj.coDevUrl || '#'}" target="_blank" class="project-codev-badge">${proj.coDev}</a>`
          : '';

        const headerHtml = proj.image ? `
          <div class="project-img-wrap" id="img-wrap-${proj.id}">
            <img class="project-img" src="${proj.image}" alt="${proj.title}" loading="lazy" onerror="document.getElementById('img-wrap-${proj.id}').style.display='none'">
          </div>
        ` : `
          <div class="project-header-bar">
            <div class="project-header-dots">
              <span class="p-dot dot-red"></span>
              <span class="p-dot dot-yellow"></span>
              <span class="p-dot dot-green"></span>
              <span class="p-header-label">// PROJECT</span>
            </div>
          </div>
        `;

        const githubBtn = `<a href="${proj.githubLink}" target="_blank" class="card-btn github-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.523-10-10-10z"/></svg>
          GitHub Code
        </a>`;

        const liveBtn = proj.liveLink && proj.liveLink !== '#'
          ? `<a href="${proj.liveLink}" target="_blank" class="card-btn live-btn">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
               Live App
             </a>`
          : '';

        card.innerHTML = `
          ${headerHtml}
          <div class="project-body" style="display: flex; flex-direction: column; flex: 1;">
            <div class="project-badges-row">
              ${proj.badge ? `<span class="project-badge">${proj.badge}</span>` : ''}
              ${coDevHtml}
            </div>
            <div class="project-title-row">
              <h3 class="project-name">${proj.title}</h3>
            </div>
            <p class="project-desc">${proj.description}</p>
            ${highlightsHtml}
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-actions-bottom" style="margin-top: auto; padding-top: 24px; display: flex; gap: 12px;">
              ${githubBtn}
              ${liveBtn}
            </div>
          </div>
        `;
        projectsGrid.appendChild(card);
      });

    // Re-observe newly added cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    });
  }
  renderProjects();

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });


  // =============================================
  // 11. INTERSECTION OBSERVER (SCROLL REVEAL + SKILL BARS)
  // =============================================
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');

      // Animate skill bars when category becomes visible
      if (entry.target.classList.contains('skills-category')) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.level + '%';
        });
      }
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skills-category').forEach(el => {
    revealObserver.observe(el);
  });


  // =============================================
  // 12. CONTACT FORM
  // =============================================
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const feedback = document.getElementById('form-feedback');
    const name = document.getElementById('form-name').value;

    btn.textContent = 'TRANSMITTING...';
    btn.disabled = true;

    setTimeout(() => {
      feedback.textContent = `> Transmission received, ${name}. I will respond shortly. [STATUS: OK]`;
      feedback.className = 'form-feedback success';
      e.target.reset();
      btn.innerHTML = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Send Transmission`;
      btn.disabled = false;
      setTimeout(() => { feedback.className = 'form-feedback'; }, 6000);
    }, 1600);
  });

});
