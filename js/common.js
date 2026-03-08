// ============================================
// NPO Homepage - Common JavaScript
// ============================================

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const globalNav = document.querySelector('.global-nav');
  const navItems = document.querySelectorAll('.nav-item');

  if (hamburger && globalNav) {
    hamburger.addEventListener('click', function() {
      const isOpen = hamburger.classList.toggle('active');
      globalNav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!globalNav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        globalNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && globalNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        globalNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
        hamburger.focus();
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
