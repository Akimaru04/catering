/* script.js
   Single HTML + dynamic content injection
   - loads sections: home, about, services, packages, gallery, contact
   - manages fade transitions and nav active state
   - simple contact form validation
*/

(() => {
  // ---------- Content for each section (placeholders) ----------
  const sections = {
    home: `
      <section class="hero section" aria-label="Home hero">
        <div class="hero-bg" role="img" aria-label="Catering setup">
          <div class="overlay"></div>
          <div class="hero-inner container">
            <h2>Exquisite Catering for Your Special Events</h2>
            <p class="lead">From intimate gatherings to grand celebrations—crafted menus, attentive service, and memorable flavors.</p>
            <div>
              <button class="cta" id="cta-book">Book Now</button>
              <button class="btn-ghost" id="cta-services" style="margin-left:10px;">View Services</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-label="Why choose us">
        <h3>Why Choose Gelo’s Catering</h3>
        <p class="lead">We bring years of experience to every event—professional service, locally sourced ingredients, and tailored menus to match your occasion.</p>
        <div class="services-grid" style="margin-top:14px;">
          <div class="service-card"><h4>Custom Menus</h4><p>Menus tailored to dietary needs and theme preferences.</p></div>
          <div class="service-card"><h4>Professional Staff</h4><p>Uniformed servers and experienced coordinators for smooth events.</p></div>
          <div class="service-card"><h4>Event Planning</h4><p>Coordination with venues and vendors for stress-free execution.</p></div>
        </div>
      </section>
    `,

    about: `
      <section class="section about" aria-label="About Gelo's Catering">
        <div class="about-grid">
          <div>
            <h3>About Gelo’s Food Catering Services</h3>
            <p class="lead">At Gelo’s, we believe every event deserves exceptional food and impeccable service. Our team crafts menus that reflect your taste and occasion—be it a wedding, corporate event, or private celebration.</p>
            <p>Led by Chef Gelo, our staff emphasizes fresh ingredients, elegant presentation, and reliable execution. We work closely with clients from tasting to cleanup, ensuring a seamless experience.</p>
          </div>
          <div class="about-photo" aria-hidden="true"></div>
        </div>
      </section>
    `,

    services: `
      <section class="section" aria-label="Services">
        <h3>Our Services</h3>
        <p class="lead">Comprehensive catering and event support to suit every occasion.</p>

        <div class="services-grid" style="margin-top:12px;">
          <div class="service-card"><h4>Weddings & Anniversaries</h4><p>Customizable multi-course menus, plated or buffet options, and service staff.</p></div>
          <div class="service-card"><h4>Birthdays & Debuts</h4><p>Theme-friendly menus, dessert stations, and setup that matches your celebration.</p></div>
          <div class="service-card"><h4>Corporate Events</h4><p>Breakfasts, lunches, and formal dinners with timely service and flexible delivery.</p></div>
          <div class="service-card"><h4>Private Dinners</h4><p>Intimate chef-led dinners and tasting menus for small gatherings.</p></div>
        </div>
      </section>
    `,

    packages: `
      <section class="section" aria-label="Packages">
        <h3>Catering Packages</h3>
        <p class="lead">Transparent packages to fit common event sizes—each can be tailored on request.</p>

        <div class="packages-grid" style="margin-top:14px;">
          <div class="package">
            <h4>Silver Package</h4>
            <div class="price">Starting at ₱350 / pax</div>
            <p>Buffet-style selection of 4 entrees, 2 sides, dessert, and beverage station. Ideal for small events.</p>
            <div style="margin-top:12px;"><button class="btn-primary inquire-btn" data-package="Silver">Inquire</button></div>
          </div>

          <div class="package">
            <h4>Gold Package</h4>
            <div class="price">Starting at ₱520 / pax</div>
            <p>Expanded menu with plated course options, dessert table, and dedicated service staff.</p>
            <div style="margin-top:12px;"><button class="btn-primary inquire-btn" data-package="Gold">Inquire</button></div>
          </div>

          <div class="package">
            <h4>Platinum Package</h4>
            <div class="price">Starting at ₱800 / pax</div>
            <p>Full-service offering with premium ingredients, menu tasting, event coordinator, and plated service.</p>
            <div style="margin-top:12px;"><button class="btn-primary inquire-btn" data-package="Platinum">Inquire</button></div>
          </div>
        </div>
      </section>
    `,

    gallery: `
      <section class="section" aria-label="Gallery">
        <h3>Gallery</h3>
        <p class="lead">A selection of events and setups—replace these with your real photos later.</p>
        <div class="gallery-grid" style="margin-top:12px;">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" alt="Event setup 1" data-full>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60" alt="Event setup 2" data-full>
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60" alt="Event setup 3" data-full>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" alt="Event setup 4" data-full>
          <img src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=60" alt="Event setup 5" data-full>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" alt="Event setup 6" data-full>
        </div>

        <!-- lightbox modal -->
        <div id="lightbox" class="lightbox" aria-hidden="true" style="display:none;">
          <div class="lightbox-inner">
            <button id="lightbox-close" class="btn-ghost" style="margin-bottom:12px;">Close</button>
            <img id="lightbox-img" src="" alt="Full size photo" style="width:100%; border-radius:8px;"/>
          </div>
        </div>
      </section>
    `,

    contact: `
      <section class="section" aria-label="Contact">
        <h3>Contact & Bookings</h3>
        <p class="lead">Tell us about your event—date, guest count, and any menu preferences. We'll follow up with a quote and availability.</p>

        <div class="contact-grid" style="margin-top:12px;">
          <div class="contact-card">
            <form id="contact-form" novalidate>
              <div class="form-field">
                <label for="name">Full name</label>
                <input id="name" name="name" required placeholder="Jane Dela Cruz">
              </div>
              <div class="form-field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com">
              </div>
              <div class="form-field">
                <label for="phone">Phone</label>
                <input id="phone" name="phone" required placeholder="+63 900 000 0000">
              </div>
              <div class="form-field">
                <label for="message">Event details</label>
                <textarea id="message" name="message" rows="5" placeholder="Date, venue, guest count, and any notes..." required></textarea>
              </div>
              <div style="display:flex; gap:10px; margin-top:10px;">
                <button class="btn-primary" type="submit">Send Inquiry</button>
                <button type="button" id="clear-form" class="btn-ghost">Clear</button>
              </div>
            </form>
          </div>

          <div class="contact-card">
            <h4>Contact Info</h4>
            <p class="small">Phone: <a href="tel:+639241026432">+63 924 102 6432</a></p>
            <p class="small">Email: <a href="mailto:balbaangelogabriel@gmail.com">balbaangelogabriel@gmail.com</a></p>
            <p class="small">We provide tastings by appointment. Locations and full menus available on request.</p>
            <div style="margin-top:12px;">
              <button class="btn-primary" id="book-cta">Request a Tasting</button>
            </div>
          </div>
        </div>
      </section>
    `
  };

  // ---------- DOM references ----------
  const contentEl = document.getElementById('content');
  const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
  const yearEl = document.getElementById('year');

  // ---------- Utilities ----------
  function setActiveNav(section) {
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === section);
    });
  }

  function setFocusToMain() {
    contentEl.focus({preventScroll:true});
  }

  // Fade transition wrapper: fade-out, swap HTML, fade-in
  function loadSection(sectionKey, pushState = true) {
    if (!sections[sectionKey]) sectionKey = 'home';
    // If same section, do nothing
    if (contentEl.dataset.current === sectionKey) return;

    // manage history
    if (pushState) {
      history.pushState({ section: sectionKey }, '', `#${sectionKey}`);
    }

    // fade out
    contentEl.classList.remove('show');
    contentEl.classList.add('fade');

    setTimeout(() => {
      // set html
      contentEl.innerHTML = sections[sectionKey];
      contentEl.dataset.current = sectionKey;

      // small delay for assets to render then fade-in
      setTimeout(() => {
        contentEl.classList.add('show');
        setActiveNav(sectionKey);
        setFocusToMain();
        attachSectionHandlers(sectionKey);
      }, 60);
    }, 260);
  }

  // Attach handlers for dynamic elements inside sections
  function attachSectionHandlers(sectionKey) {
    // CTA buttons in home
    const ctaBook = document.getElementById('cta-book');
    if (ctaBook) ctaBook.addEventListener('click', () => loadSection('contact'));

    const ctaServices = document.getElementById('cta-services');
    if (ctaServices) ctaServices.addEventListener('click', () => loadSection('services'));

    // Inquire buttons in packages
    const inquireBtns = Array.from(document.querySelectorAll('.inquire-btn'));
    inquireBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = btn.dataset.package || 'Package';
        loadSection('contact');
        // autofill message after navigation
        setTimeout(() => {
          const message = document.getElementById('message');
          if (message) message.value = `Hello, I'm interested in the ${pkg} package. Please share availability and pricing.`;
        }, 350);
      });
    });

    // Gallery lightbox
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-grid img'));
    if (galleryImgs.length) {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      const closeBtn = document.getElementById('lightbox-close');

      galleryImgs.forEach(img => {
        img.addEventListener('click', (e) => {
          const src = e.currentTarget.getAttribute('src') || '';
          lightboxImg.src = src;
          lightbox.style.display = 'block';
          lightbox.setAttribute('aria-hidden', 'false');
          setTimeout(()=> lightbox.classList && lightbox.classList.add('show'), 10);
        });
      });

      if (closeBtn) closeBtn.addEventListener('click', () => {
        lightbox.classList && lightbox.classList.remove('show');
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
      });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !message) {
          alert('Please complete all required fields before sending your inquiry.');
          return;
        }
        // In a real project, you'd send data to a backend here.
        alert('Thank you! Your inquiry has been sent. We will contact you shortly.');
        contactForm.reset();
      });

      const clearBtn = document.getElementById('clear-form');
      if (clearBtn) clearBtn.addEventListener('click', () => contactForm.reset());

      const bookCTA = document.getElementById('book-cta');
      if (bookCTA) bookCTA.addEventListener('click', () => {
        // pre-fill contact form and navigate
        loadSection('contact');
        setTimeout(() => {
          const message = document.getElementById('message');
          if (message) message.value = 'I would like to request a tasting appointment.';
        }, 400);
      });
    }
  }

  // ---------- Nav button listeners ----------
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section || 'home';
      loadSection(section);
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (ev) => {
    const section = (ev.state && ev.state.section) || location.hash.replace('#','') || 'home';
    loadSection(section, false);
  });

  // Initialize
  function init() {
    // set footer year
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // load initial section based on hash or default
    const initial = location.hash.replace('#','') || 'home';
    // replace state to keep history consistent
    history.replaceState({ section: initial }, '', `#${initial}`);
    loadSection(initial, false);
  }

  // Kick off
  init();

})();
