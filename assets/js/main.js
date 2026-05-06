document.addEventListener('DOMContentLoaded', function() {

  /* ---- Mobile Nav ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (hamburger) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  /* ---- Tab System (portfolio & pricing) ---- */
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const groupName = group.dataset.tabGroup;
    const buttons = group.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll(`.tab-content[data-tab-group="${groupName}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetEl = document.querySelector(`.tab-content[data-tab-id="${target}"]`);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  });

  /* ---- Sticky Header Shadow ---- */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
    }
  });

  /* ---- Brands carousel clone for infinite scroll ---- */
  const track = document.querySelector('.brands-track');
  if (track) {
    const items = Array.from(track.children);
    const originalWidth = track.scrollWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const targetWidth = window.innerWidth * 2 + originalWidth;

    track.style.setProperty('--brands-scroll-distance', `${originalWidth + gap}px`);

    while (track.scrollWidth < targetWidth) {
      items.forEach(item => {
        track.appendChild(item.cloneNode(true));
      });
    }
  }

  /* ---- Simple lightbox for portfolio images ---- */
  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.92);z-index:99999;
        display:flex;align-items:center;justify-content:center;cursor:pointer;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.style.cssText = 'max-width:90%;max-height:90vh;border-radius:8px;box-shadow:0 0 40px rgba(0,0,0,0.5);';
      overlay.appendChild(bigImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  /* ---- Scroll reveal (simple fade-in) ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.why-card, .price-card, .service-item, .industry-item, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
