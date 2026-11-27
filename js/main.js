(function () {
  const WHATSAPP_NUMBER = "573158056240";

  const navToggle = document.querySelector(".js-nav-toggle");
  const navMenu = document.querySelector(".js-nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open", !expanded);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      });
    });
  }

  const track = document.querySelector(".js-gallery-track");
  const prevBtn = document.querySelector(".js-gallery-prev");
  const nextBtn = document.querySelector(".js-gallery-next");
  const dotsContainer = document.querySelector(".js-gallery-dots");

  if (track) {
    const slides = Array.from(track.querySelectorAll(".c-gallery__slide"));

    const getStep = () => {
      const slide = slides[0];
      if (!slide) return 360;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      return slide.getBoundingClientRect().width + gap;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -getStep(), behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: getStep(), behavior: "smooth" });
      });
    }

    if (dotsContainer && slides.length > 0) {
      dotsContainer.innerHTML = "";
      const dots = slides.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "c-gallery__dot" + (index === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Ir al producto ${index + 1}`);
        dot.addEventListener("click", () => {
          track.scrollTo({ left: index * getStep(), behavior: "smooth" });
        });
        dotsContainer.appendChild(dot);
        return dot;
      });

      const updateDots = () => {
        const step = getStep();
        const activeIndex = Math.min(
          slides.length - 1,
          Math.max(0, Math.round(track.scrollLeft / step))
        );
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeIndex));
      };

      track.addEventListener("scroll", updateDots, { passive: true });
    }
  }

  const contactForm = document.querySelector(".js-contact-form");
  const feedback = document.querySelector(".js-form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const product = document.getElementById("product")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const lines = [
        "Hola SIDELEC, deseo solicitar una cotización:",
        name ? `• Nombre: ${name}` : "",
        product ? `• Equipo/Línea: ${product}` : "",
        email ? `• Correo (canal secundario): ${email}` : "",
        message ? `• Detalles: ${message}` : ""
      ].filter(Boolean);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

      if (feedback) {
        feedback.textContent = "Redirigiendo a WhatsApp con tu solicitud lista...";
        feedback.classList.remove("u-hidden");
      }

      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
})();