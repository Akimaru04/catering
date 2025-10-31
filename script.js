(() => {
  const main = document.querySelector("main");
  const navButtons = document.querySelectorAll(".nav-btn");

  // ---------- Section Templates ----------
  const sections = {
    home: `
      <section class="hero section" aria-label="Home">
        <div class="hero-bg">
          <div class="overlay"></div>
          <div class="hero-inner">
            <h2>Welcome to FineTaste Catering</h2>
            <p class="lead">Exceptional food and service for weddings, parties, and corporate events.</p>
            <button id="cta-book" class="cta">Inquire Now</button>
          </div>
        </div>
      </section>
    `,
    services: `
      <section class="section" aria-label="Services">
        <h3>Our Services</h3>
        <div class="services-grid">
          <div class="service-card">
            <h4>Event Catering</h4>
            <p>Full-service catering for weddings, birthdays, and corporate events.</p>
          </div>
          <div class="service-card">
            <h4>Custom Menus</h4>
            <p>We tailor every menu to your tastes and preferences.</p>
          </div>
          <div class="service-card">
            <h4>On-Site Staff</h4>
            <p>Professional servers, chefs, and coordinators to make your event smooth.</p>
          </div>
        </div>
      </section>
    `,
    packages: `
      <section class="section" aria-label="Packages">
        <h3>Catering Packages</h3>
        <p class="lead">Transparent packages to fit any event size — customizable as needed.</p>

        <div class="packages-grid" style="margin-top:14px;">
          <div class="package">
            <h4>Silver Package</h4>
            <div class="price">Starting at ₱350 / pax</div>
            <p>Buffet-style selection of 4 entrees, 2 sides, dessert, and beverage station.</p>
            <div style="margin-top:12px;"><button class="btn-primary inquire-btn" data-package="Silver">Inquire</button></div>
          </div>
          <div class="package">
            <h4>Gold Package</h4>
            <div class="price">Starting at ₱520 / pax</div>
            <p>Expanded menu with plated options, dessert table, and service staff.</p>
            <div style="margin-top:12px;"><button class="btn-primary inquire-btn" data-package="Gold">Inquire</button></div>
          </div>
          <div class="package">
            <h4>Platinum Package</h4>
            <div class="price">Starting at ₱800 / pax</div>
            <p>Premium ingredients, menu tasting, event coordinator, and plated service.</p>
            <div style="margin-top:12px;"><button class="btn-primary inquire-btn" data-package="Platinum">Inquire</button></div>
          </div>
        </div>
      </section>
    `,
    gallery: `
      <section class="section" aria-label="Gallery">
        <h3>Gallery</h3>
        <div class="gallery-grid">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8e?auto=format&fit=crop&w=600&q=80" alt="Buffet">
          <img src="https://images.unsplash.com/photo-1526366003456-2a27cc16a1b0?auto=format&fit=crop&w=600&q=80" alt="Setup">
          <img src="https://images.unsplash.com/photo-1532634993-15f421e42ec0?auto=format&fit=crop&w=600&q=80" alt="Plated Meal">
          <img src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=600&q=80" alt="Desserts">
        </div>
      </section>
    `,
    contact: `
      <section class="section" aria-label="Contact">
        <h3>Contact Us</h3>
        <form id="contact-form">
          <div class="form-field">
            <label>Name</label>
            <input type="text" id="name" required>
          </div>
          <div class="form-field">
            <label>Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-field">
            <label>Message</label>
            <textarea id="message" rows="4" required></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Send</button>
            <button type="button" id="clear-form" class="btn-ghost">Clear</button>
          </div>
        </form>
      </section>
    `,
    about: `
      <section class="section" aria-label="About">
        <div class="about-container">
          <img class="about-hero-photo" src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80" alt="Chef">
          <div class="about-text">
            <h3>About FineTaste</h3>
            <p>We are a family-owned catering business dedicated to crafting elegant and flavorful dining experiences for all occasions. From intimate gatherings to grand celebrations, we bring professionalism and heart to every event we serve.</p>
          </div>
        </div>
      </section>
    `,
  };

  // ---------- Section Loader ----------
  function loadSection(key) {
    main.classList.add("fade");
    setTimeout(() => {
      main.innerHTML = sections[key] || sections.home;
      main.classList.remove("fade");
      attachSectionHandlers(key);
    }, 200);
  }

  // ---------- Section-specific Handlers ----------
  function attachSectionHandlers(sectionKey) {
    // CTA in Home
    const ctaBook = document.getElementById("cta-book");
    if (ctaBook) ctaBook.addEventListener("click", () => loadSection("contact"));

    // Clear Form button
    const clearBtn = document.getElementById("clear-form");
    if (clearBtn) {
      clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const form = document.getElementById("contact-form");
        if (form) form.reset();
      });
    }
  }

  // ---------- Nav Buttons ----------
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section || "home";
      loadSection(section);
    });
  });

  // ---------- Delegated Clicks (Global) ----------
  document.addEventListener("click", (e) => {
    if (e.target.closest(".cta")) {
      e.preventDefault();
      loadSection("contact");
      setTimeout(() => {
        const msg = document.querySelector("#message");
        if (msg) {
          msg.value = "Hello! I would like to inquire about your catering services.";
          msg.focus();
        }
      }, 400);
    }

    if (e.target.closest(".inquire-btn")) {
      e.preventDefault();
      const pkg = e.target.getAttribute("data-package") || "Catering";
      loadSection("contact");
      setTimeout(() => {
        const msg = document.querySelector("#message");
        if (msg) {
          msg.value = `Hi! I'm interested in your ${pkg} Package. Please send me more details.`;
          msg.focus();
        }
      }, 400);
    }
  });

  // ---------- Init ----------
  loadSection("home");
})();