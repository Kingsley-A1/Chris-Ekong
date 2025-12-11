// Main site JS: nav toggle, year, hero tagline animator, and scroll animations
(function () {
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const header = document.querySelector("[data-header]");

  function updateHeaderState() {
    if (!header) return;
    const shouldCondense =
      window.scrollY > 48 || document.body.classList.contains("nav-open");
    header.classList.toggle("is-condensed", shouldCondense);
  }

  function setNavState(open) {
    navToggle?.setAttribute("aria-expanded", String(open));
    primaryNav?.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    updateHeaderState();
  }

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!expanded);
  });

  primaryNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavState(false));
  });

  const desktopMQ = window.matchMedia("(min-width: 960px)");
  const handleDesktop = (event) => {
    if (event.matches) {
      setNavState(false);
    }
  };
  desktopMQ.addEventListener("change", handleDesktop);
  handleDesktop(desktopMQ);

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  // Year placeholders - unified to #year only
  const yearEls = document.querySelectorAll("#year, #yearAbout, #yearContact");
  const year = new Date().getFullYear();
  yearEls.forEach((el) => (el.textContent = year));

  // ============================================
  // SCROLL ANIMATIONS - Intersection Observer
  // ============================================
  const initScrollAnimations = () => {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
      ".card, .value-card, .case-card, .testimonial-card, .review-card, " +
        ".metrics-card, .thanks-followup__item, .contact-card, " +
        "[data-animate], .animate-on-scroll"
    );

    if (!animatedElements.length || !("IntersectionObserver" in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.animateDelay || 0;

          setTimeout(() => {
            el.classList.add("is-visible");
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);

          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    animatedElements.forEach((el, index) => {
      // Set initial state for animation
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition =
        "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";

      // Add stagger delay for siblings
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(
          (child) =>
            animatedElements.length &&
            (child.classList.contains("card") ||
              child.classList.contains("value-card") ||
              child.classList.contains("case-card") ||
              child.classList.contains("review-card") ||
              child.classList.contains("testimonial-card") ||
              child.classList.contains("thanks-followup__item"))
        );
        const siblingIndex = siblings.indexOf(el);
        if (siblingIndex > 0) {
          el.dataset.animateDelay = siblingIndex * 100;
        }
      }

      observer.observe(el);
    });
  };

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  };

  // Hero tagline animator (only if elements exist)
  if (window.__headlineAnimatorInitialized) return;
  window.__headlineAnimatorInitialized = true;

  document.addEventListener("DOMContentLoaded", () => {
    // Initialize scroll animations
    initScrollAnimations();
    initSmoothScroll();

    const phrases = [
      { text: "Advocacy with Integrity.", colorClass: "tag-color-1" },
      { text: "Results that Matter.", colorClass: "tag-color-2" },
      { text: "Guidance You Can Trust.", colorClass: "tag-color-3" },
    ];
    const displayTime = 3200;
    const holdAfter = 320;
    const dynamicEl = document.querySelector(".headline-dynamic");
    const historyContainer = document.querySelector(".tagline-history");
    if (!dynamicEl) return;
    const colorClasses = ["tag-color-1", "tag-color-2", "tag-color-3"];
    const clearColors = (el) =>
      colorClasses.forEach((c) => el.classList.remove(c));
    let current = 0;
    let pills = [];

    if (historyContainer) {
      historyContainer.innerHTML = "";
      phrases.forEach(({ text, colorClass }, index) => {
        const pill = document.createElement("span");
        pill.className = `tagline-pill ${colorClass}`;
        pill.setAttribute("aria-hidden", "true");
        pill.dataset.index = String(index);
        pill.textContent = text;
        historyContainer.appendChild(pill);
      });
      pills = Array.from(historyContainer.querySelectorAll(".tagline-pill"));
    }

    const setActivePill = (index) =>
      pills.forEach((pill, pillIndex) =>
        pill.classList.toggle("is-active", pillIndex === index)
      );

    function showNext() {
      const { text, colorClass } = phrases[current];
      dynamicEl.textContent = text;
      clearColors(dynamicEl);
      dynamicEl.classList.add(colorClass, "show");
      setActivePill(current);
      setTimeout(() => {
        dynamicEl.classList.remove("show");
        setTimeout(() => {
          current = (current + 1) % phrases.length;
          showNext();
        }, holdAfter);
      }, displayTime);
    }
    showNext();
  });

  const slider = document.querySelector("[data-case-slider]");
  if (slider) {
    const track = slider.querySelector(".case-highlights__track");
    const prev = slider.querySelector("[data-slider-prev]");
    const next = slider.querySelector("[data-slider-next]");
    const scrollByAmount = () => (track?.clientWidth || 0) * 0.8;
    const scrollTrack = (direction) => {
      if (!track) return;
      track.scrollBy({
        left: direction * scrollByAmount(),
        behavior: "smooth",
      });
    };
    prev?.addEventListener("click", () => scrollTrack(-1));
    next?.addEventListener("click", () => scrollTrack(1));

    // Keyboard navigation: left/right arrows on focused case cards
    const caseCards = Array.from(track.querySelectorAll(".case-card"));
    caseCards.forEach((card) => {
      card.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollTrack(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollTrack(-1);
        }
      });
    });
  }
})();
