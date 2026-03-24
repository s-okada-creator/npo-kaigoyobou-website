// ============================================
// NPO Homepage - Common JavaScript
// ============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const globalNav = document.querySelector('.global-nav');
  const navItems = document.querySelectorAll('.nav-item');

  if (hamburger && globalNav) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Create close button inside nav
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close';
    closeBtn.setAttribute('aria-label', 'メニューを閉じる');
    closeBtn.setAttribute('type', 'button');
    globalNav.insertBefore(closeBtn, globalNav.firstChild);

    function openMenu() {
      globalNav.classList.add('active');
      overlay.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      globalNav.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // Open menu
    hamburger.addEventListener('click', function() {
      if (globalNav.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu: overlay click
    overlay.addEventListener('click', closeMenu);

    // Close menu: close button
    closeBtn.addEventListener('click', closeMenu);

    // Close menu: Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && globalNav.classList.contains('active')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close menu: nav link click
    globalNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Reset on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 782 && globalNav.classList.contains('active')) {
        closeMenu();
      }
    });

    // Mobile dropdown toggle
    navItems.forEach(item => {
      const link = item.querySelector('> a');
      const dropdown = item.querySelector('.dropdown');

      if (dropdown && link) {
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 782) {
            e.preventDefault();
            const isActive = item.classList.toggle('active');
            link.setAttribute('aria-expanded', String(isActive));
          }
        });
      }
    });
  }

  // Search functionality (basic)
  const searchForm = document.querySelector('.header-search form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = this.querySelector('input').value.trim();
      if (query) {
        // Simple search - redirect to search results page
        window.location.href = `/news/?search=${encodeURIComponent(query)}`;
      }
    });
  }

  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion__header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.closest('.accordion__item');
      const isActive = item.classList.contains('active');
      
      // Close all accordions
      document.querySelectorAll('.accordion__item').forEach(accordionItem => {
        accordionItem.classList.remove('active');
        const body = accordionItem.querySelector('.accordion__body');
        if (body) {
          body.style.maxHeight = null;
        }
      });
      
      // Open clicked accordion if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.accordion__body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });
  });

  // Back to Top button
  const topBtn = document.createElement('button');
  topBtn.className = 'back-to-top';
  topBtn.setAttribute('aria-label', 'ページの先頭へ戻る');
  topBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Form validation helper
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('必須項目を入力してください。');
      } else {
        e.preventDefault();
        alert('お問い合わせありがとうございます。現在システム準備中のため、恐れ入りますがメールまたはお電話にてご連絡ください。');
      }
    });
  });
});

// Breadcrumb Schema.org structured data
function generateBreadcrumbSchema(items) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Organization Schema.org structured data
function generateOrganizationSchema(data) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": data.name,
    "url": data.url,
    "logo": data.logo,
    "description": data.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.addressLocality,
      "addressRegion": data.addressRegion,
      "postalCode": data.postalCode,
      "streetAddress": data.streetAddress
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": data.telephone,
      "email": data.email,
      "contactType": "customer service"
    }
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
