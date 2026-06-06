document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // ==========================================
  // 1. STICKY HEADER & SCROLLSPY
  // ==========================================
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Toggle sticky header styling
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy: update active nav link
    let currentSectionId = 'welcome';
    
    // Header height offset for active detection
    const offset = 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // Run once initially to set correct state
  handleScroll();

  // ==========================================
  // 2. MOBILE MENU TOGGLE
  // ==========================================
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  // ==========================================
  // 3. GALLERY LIGHTBOX MODAL
  // ==========================================
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || img.getAttribute('alt');
      
      lightboxImg.src = img.src;
      lightboxCaption.textContent = title;
      lightbox.classList.add('open');
      
      // Disable background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    // Re-enable background scrolling
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close when clicking background outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});
