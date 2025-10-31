/* script.js
   Single HTML + dynamic content injection
   - loads sections: home, about, services, packages, gallery, contact
   - manages fade transitions and nav active state
   - simple contact form validation
*/

(() => {
  // ---------- Content for each section ----------
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
      <section class="about-hero">
        <div class="about-container">
          <img src="dp.jpg" alt="dp" class="about-hero-photo">
          <div class="about-text">
            <h1>Angelo Gabriel Balba</h1>
            <p class="lead">At Gelo’s, we believe every event deserves exceptional food and impeccable service. Our team crafts menus that reflect your taste and occasion—be it a wedding, corporate event, or private celebration.</p>
            <p>Our staff emphasizes fresh ingredients, elegant presentation, and reliable execution. We work closely with clients from tasting to cleanup, ensuring a seamless experience.</p>
          </div>
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
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60" alt="Event setup 1">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60" alt="Event setup 2">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60" alt="Event setup 3">
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
              <div class="form-field"><label for="name">Full name</label><input id="name" name="name" required></div>
              <div class="form-field"><label for="email">Email</label><input id="email" name="email" type="email" required></div>
              <div class="form-field"><label for="phone">Phone</label><input id="phone" name="phone" required></div>
              <div class="form-field"><label for="message">Event details</label><textarea id="message" rows="4" required></textarea></div>
              <div style="display:flex; gap:10px; margin-top:10px;">
                <button class="btn-primary" type="submit">Send Inquiry</button>
                <button type="button" id="clear-form" class="btn-ghost">Clear</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `
  };

  // ---------- DOM references ----------
  const contentEl = document.getElementById('content');
  const navButtons = Array.from(document.querySelectorAll('.nav-btn'));

  // ---------- Utilities ----------
  function setActiveNav(section) {
    navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.section === section));
  }

  function loadSection(sectionKey) {
    if (!sections[sectionKey]) sectionKey = 'home';
    if (contentEl.dataset.current === sectionKey) return;

    contentEl.classList.remove('show');
    contentEl.classList.add('fade');

    setTimeout(() => {
      contentEl.innerHTML = sections[sectionKey];
      contentEl.dataset.current = sectionKey;

      setTimeout(() => {
        contentEl.classList.add('show');
        setActiveNav(sectionKey);
        attachSectionHandlers(sectionKey);
      }, 60);
    }, 260);
  }

  function attachSectionHandlers(sectionKey) {
    const ctaBook = document.getElementById('cta-book');
    if (ctaBook) ctaBook.addEventListener('click', () => loadSection('contact'));

    const ctaServices = document.getElementById('cta-services');
    if (ctaServices) ctaServices.addEventListener('click', () => loadSection('services'));
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section || 'home';
      loadSection(section);
    });
  });

  // ---------- Init ----------
  loadSection('home');
})();