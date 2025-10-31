(() => {
  const main = document.querySelector("main");
  const navButtons = document.querySelectorAll(".nav-btn");

  // ---------- Section Templates ----------
  const sections = {
    home: `
      <section class="hero section" aria-label="Home">
        <h1>Welcome to FineTaste Catering</h1>
        <p>Exceptional food and event service for every celebration.</p>
        <button id="cta-book" class="cta">Inquire Now</button>
      </section>
    `,

    services: `
      <section class="section" aria-label="Services">
        <h3>Our Services</h3>
        <div class="service-grid">
          <div class="service-card">
            <img src="images/catering.jpg" alt="Event Catering">
            <h4>Event Catering</h4>
            <p>Full-service catering for weddings, parties, and corporate gatherings.</p>
          </div>
          <div class="service-card">
            <img src="images/menu.jpg" alt="Custom Menus">
            <h4>Custom Menus</h4>
            <p>Tailored menu design to match your theme and taste preferences.</p>
          </div>
          <div class="service-card">
            <img src="images/staff.jpg" alt="On-site Staff">
            <h4>On-Site Staff</h4>
            <p>Professional servers, chefs, and coordinators to make your event seamless.</p>
          </div>
        </div>
      </section>
    `,

    packages: `
      <section class="section" aria-label="Packages">
        <h3>Catering Packages</h3>
        <p class="lead">Transparent packages to fit any event size — customizable as needed.</p>
        <div class="packages-grid">
          <div class="package">
            <img src="images/silver.jpg" alt="Silver Package">
            <h4>Silver Package</h4>
            <div class="price">₱350 / pax</div>
            <p>Buffet-style with 4 entrees, 2 sides, dessert, and beverage station.</p>
            <button class="btn-primary inquire-btn" data-package="Silver">Inquire</button>
          </div>
          <div class="package">
            <img src="images/gold.jpg" alt="Gold Package">
            <h4>Gold Package</h4>
            <div class="price">₱520 / pax</div>
            <p>Expanded menu, plated options, dessert table, and service staff.</p>
            <button class="btn-primary inquire-btn" data-package="Gold">Inquire</button>
          </div>
          <div class="package">
            <img src="images/platinum.jpg" alt="Platinum Package">
            <h4>Platinum Package</h4>
            <div class="price">₱800 / pax</div>
            <p>Premium ingredients, event coordinator, and elegant plated service.</p>
            <button class="btn-primary inquire-btn" data-package="Platinum">Inquire</button>
          </div>
        </div>
      </section>
    `,

    contact: `
      <section class="section" aria-label="Contact">
        <h3>Contact Us</h3>
        <form id="contact-form">
          <label>Name</label>
          <input type="text" id="name" required>
          <label>Email</label>
          <input type="email" id="email" required>
          <label>Message</label>
          <textarea id="message" rows="4" required></textarea>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Send</button>
            <button type="button" id="clear-form" class="btn-secondary">Clear</button>
          </div>
        </form>
      </section>
    `,

    about: `
      <section class="section" aria-label="About">
        <img src="images/about.jpg" alt="About FineTaste" class="about-img">
        <h3>About FineTaste</h3>
        <p>We are a family-owned catering business dedicated to delivering exceptional dining experiences. 
        From small gatherings to grand weddings, our team ensures each event is filled with flavor, elegance, 
        and hospitality that leaves a lasting impression.</p>
      </section>
    `
  };

  // ---------- Section Loader ----------
  function loadSection(key) {
    main.classList.add("fade-out");
    setTimeout(() => {
      main.innerHTML = sections[key] || sections.home;
      main.classList.remove("fade-out");
      main.classList.add("fade-in");
      attachSectionHandlers(key);
    }, 200);
  }

  // ---------- Section-specific Handlers ----------
  function attachSectionHandlers(sectionKey) {
    const ctaBook = document.getElementById("cta-book");
    if (ctaBook) ctaBook.addEventListener("click", () => loadSection("contact"));

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

  // ---------- Delegated Clicks ----------
  document.addEventListener("click", (e) => {
    // Inquire Now
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

    // Package Inquiry
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