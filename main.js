// Main site JS: nav toggle, year, and hero tagline animator
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

  // Year placeholders
  const yearEls = document.querySelectorAll("#year, #yearAbout, #yearContact");
  const year = new Date().getFullYear();
  yearEls.forEach((el) => (el.textContent = year));

  // Hero tagline animator (only if elements exist)
  if (window.__headlineAnimatorInitialized) return;
  window.__headlineAnimatorInitialized = true;
  document.addEventListener("DOMContentLoaded", () => {
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
  }
})();
