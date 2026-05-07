document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  const updateHeaderState = () => {
    if (header) {
      if (!header.classList.contains("overlay") || window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (nav) {
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  // --- Fade-in au scroll (robuste) ---
  const animatedElements = document.querySelectorAll(
    ".fade-in, .service-card, .realisation-card, " +
      ".regle-card, .step, section h2, .hero-content, " +
      ".hero h1, .hero p, .hero .btn-hero, " +
      ".palette-card, .config-card, .materiaux-item"
  );

  if (animatedElements.length > 0) {
    animatedElements.forEach((el) => el.classList.add("fade-in"));

    const makeVisible = (el) => el.classList.add("visible");

    if (typeof IntersectionObserver === "undefined") {
      animatedElements.forEach(makeVisible);
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              makeVisible(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      animatedElements.forEach((el) => observer.observe(el));
    }
  }

  // --- Cookies ---
  const banner = document.getElementById("cookieBanner");
  const modal = document.getElementById("cookieModal");

  const acceptBtn = document.getElementById("cookieAccept");
  const refuseBtn = document.getElementById("cookieRefuse");
  const settingsBtn = document.getElementById("cookieSettings");

  const modalSaveBtn = document.getElementById("modalSave");
  const modalRefuseBtn = document.getElementById("modalRefuse");
  const modalCloseBtn = document.getElementById("cookieModalClose");

  const analyticsToggle = document.getElementById("analyticsToggle");
  const marketingToggle = document.getElementById("marketingToggle");

  const setBannerVisible = (isVisible) => {
    if (!banner) return;
    banner.style.display = isVisible ? "flex" : "none";
  };

  const setModalVisible = (isVisible) => {
    if (!modal) return;
    modal.style.display = isVisible ? "flex" : "none";
  };

  const hasChoice = () => Boolean(localStorage.getItem("cookiesAccepted"));

  if (banner && !hasChoice()) {
    setBannerVisible(true);
  }

  acceptBtn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "all");
    setBannerVisible(false);
  });

  refuseBtn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "essential");
    setBannerVisible(false);
  });

  settingsBtn?.addEventListener("click", () => {
    setModalVisible(true);
  });

  modalCloseBtn?.addEventListener("click", () => {
    setModalVisible(false);
  });

  modalSaveBtn?.addEventListener("click", () => {
    const analytics = Boolean(analyticsToggle?.checked);
    const marketing = Boolean(marketingToggle?.checked);
    localStorage.setItem("cookiesAccepted", JSON.stringify({ analytics, marketing }));
    setModalVisible(false);
    setBannerVisible(false);
  });

  modalRefuseBtn?.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "essential");
    setModalVisible(false);
    setBannerVisible(false);
  });

  // --- Contact form success ---
  const contactForm = document.getElementById("contactForm");
  const successBox = document.getElementById("formSuccess");
  const successName = document.getElementById("successName");
  const prenomInput = document.getElementById("prenom");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (successName && prenomInput && "value" in prenomInput) {
      successName.textContent = String(prenomInput.value || "");
    }
    contactForm.style.display = "none";
    if (successBox) successBox.style.display = "block";
  });
});
