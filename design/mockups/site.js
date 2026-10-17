(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector("[data-site-header]");
  if (header) {
    const updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  let lastFocused = null;

  const getMenuFocusables = function () {
    if (!menu) return [];
    return Array.from(
      menu.querySelectorAll('.menu-panel a[href], .menu-panel button:not([disabled])')
    ).filter(function (element) {
      return element.offsetWidth > 0 || element.offsetHeight > 0;
    });
  };

  const openMenu = function () {
    if (!menu || !menuToggle) return;
    lastFocused = document.activeElement;
    menu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Menü schließen");
    document.body.classList.add("menu-open");
    const focusables = getMenuFocusables();
    if (focusables.length) focusables[0].focus();
  };

  const closeMenu = function (restoreFocus) {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menü öffnen");
    document.body.classList.remove("menu-open");
    if (restoreFocus !== false) {
      const target = lastFocused && document.contains(lastFocused) ? lastFocused : menuToggle;
      target.focus();
    }
  };

  if (menu && menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll("[data-menu-close]").forEach(function (element) {
      element.addEventListener("click", function () {
        closeMenu(true);
      });
    });

    menu.querySelectorAll(".menu-panel a[href]").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!menu.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key === "Tab") {
        const focusables = getMenuFocusables();
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && menu.classList.contains("is-open")) {
        closeMenu(false);
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    } else {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
      );
      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });
    }
  }

  const parallaxImage = document.querySelector("[data-parallax]");
  if (parallaxImage && !reduceMotion) {
    const heroSection = parallaxImage.closest(".hero, .page-hero");
    let parallaxFrame = null;

    const updateParallax = function () {
      parallaxFrame = null;
      if (!heroSection) return;
      if (window.innerWidth < 760) {
        parallaxImage.style.transform = "scale(1.045)";
        return;
      }
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      const maxOffset = heroSection.offsetHeight * 0.06;
      const offset = maxOffset * progress;
      parallaxImage.style.transform =
        "translate3d(0, " + offset.toFixed(2) + "px, 0) scale(1.05)";
    };

    const requestParallax = function () {
      if (parallaxFrame !== null) return;
      parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const fields = Array.from(contactForm.querySelectorAll("[data-validate]"));
    const status = contactForm.querySelector("[data-form-status]");
    const success = contactForm.querySelector("[data-form-success]");
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const typed = new Set();
    let submitAttempted = false;

    const validationRules = {
      vorname: function (value) {
        return value.trim() ? "" : "Bitte gib deinen Vornamen ein.";
      },
      nachname: function (value) {
        return value.trim() ? "" : "Bitte gib deinen Nachnamen ein.";
      },
      email: function (value) {
        if (!value.trim()) return "Bitte gib deine E-Mail-Adresse ein.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.at.";
        }
        return "";
      },
      nachricht: function (value) {
        return value.trim() ? "" : "Bitte schreib uns eine Nachricht.";
      }
    };

    const errorElementFor = function (field) {
      return field.dataset.error ? document.getElementById(field.dataset.error) : null;
    };

    const setFieldError = function (field, message) {
      const errorElement = errorElementFor(field);
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (!errorElement) return;
      errorElement.textContent = message;
      errorElement.hidden = !message;
    };

    const validateField = function (field) {
      const rule = validationRules[field.name];
      if (!rule) return true;
      const message = rule(field.value);
      setFieldError(field, message);
      return !message;
    };

    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        if (submitAttempted || typed.has(field.name)) {
          validateField(field);
        }
      });

      field.addEventListener("input", function () {
        typed.add(field.name);
        if (success && !success.hidden) {
          success.hidden = true;
        }
        if (status) status.textContent = "";
        if (submitAttempted || field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      submitAttempted = true;
      if (success) success.hidden = true;
      if (status) status.textContent = "";

      let firstInvalid = null;
      fields.forEach(function (field) {
        const valid = validateField(field);
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        if (status) status.textContent = "Bitte prüfe die markierten Felder.";
        firstInvalid.focus();
        return;
      }

      const data = new FormData(contactForm);
      const vorname = String(data.get("vorname") || "").trim();
      const nachname = String(data.get("nachname") || "").trim();
      const email = String(data.get("email") || "").trim();
      const nachricht = String(data.get("nachricht") || "").trim();
      const fullName = vorname + " " + nachname;

      const subject = "Anfrage über equicrew.com – " + fullName;
      const body =
        "Hallo EquiCrew,\n\n" +
        "mein Name ist " +
        fullName +
        ".\n" +
        "E-Mail: " +
        email +
        "\n\n" +
        nachricht +
        "\n\nViele Grüße\n" +
        fullName;

      const mailto =
        "mailto:office@equicrew.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      const mailLink = document.createElement("a");
      mailLink.href = mailto;
      mailLink.style.display = "none";
      document.body.appendChild(mailLink);
      mailLink.click();
      mailLink.remove();

      if (status) status.textContent = "";
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });

    if (submitButton) {
      submitButton.addEventListener("click", function () {
        submitAttempted = true;
      });
    }
  }
})();
