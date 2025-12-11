// Testimonials page: rich filtering, anonymity toggle, and feedback submission
(function () {
  const STORAGE_KEY = "barr_chris_feedback_v2";
  const lawyerPhone = "2349036826272";

  const grid = document.getElementById("reviewsGrid");
  const form = document.getElementById("feedbackForm");
  if (!grid || !form) return;

  const serviceSelect = document.getElementById("filterService");
  const ratingSelect = document.getElementById("filterRating");
  const sortSelect = document.getElementById("sortOrder");
  const searchInput = document.getElementById("searchKeyword");
  const summaryEl = document.getElementById("filterSummary");
  const averageRatingEl = document.getElementById("averageRating");
  const reviewCountEl = document.getElementById("reviewCount");
  const clearBtn = document.getElementById("clearFeedback");

  const seededTestimonials = [
    {
      name: "Anonymous",
      caseType: "Commercial Law",
      rating: 5,
      feedback:
        "Chris navigated a complex cross-border contract dispute and kept our leadership team informed at every decision point.",
      timestamp: Date.UTC(2025, 3, 12),
      location: "Lagos, Nigeria",
      isAnonymous: true,
    },
    {
      name: "E. U.",
      caseType: "Civil Litigation",
      rating: 5,
      feedback:
        "From injunction applications to final judgement, I felt fully supported and prepared for each hearing.",
      timestamp: Date.UTC(2024, 10, 2),
      location: "Calabar, Nigeria",
      isAnonymous: false,
      avatar:
        "https://images.unsplash.com/photo-1544723795-e83c7a3b71ee?auto=format&fit=crop&w=200&q=80",
      avatarAlt: "Portrait of E. U.",
    },
    {
      name: "Executive Director, Coastal Manufacturing",
      caseType: "Employment Law",
      rating: 5,
      feedback:
        "The team resolved a sensitive employment dispute discreetly while protecting our brand reputation.",
      timestamp: Date.UTC(2025, 0, 18),
      location: "Port Harcourt, Nigeria",
      isAnonymous: false,
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      avatarAlt: "Executive director portrait",
    },
    {
      name: "Ngozi A., HR Director",
      caseType: "Alternative Dispute Resolution",
      rating: 5,
      feedback:
        "Barr. Chris structured the mediation process so both parties felt heard and we reached a durable agreement in record time.",
      timestamp: Date.UTC(2024, 11, 6),
      location: "Abuja, Nigeria",
      isAnonymous: false,
      avatar:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=200&q=80",
      avatarAlt: "Portrait of Ngozi A.",
    },
    {
      name: "Dr. Ifeanyi Okoro",
      caseType: "Civil Litigation",
      rating: 4,
      feedback:
        "Every brief was distilled clearly and court appearances were punctual and persuasive. I always knew the next step in my matter.",
      timestamp: Date.UTC(2024, 4, 28),
      location: "Uyo, Nigeria",
      isAnonymous: false,
      avatar:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80",
      avatarAlt: "Portrait of Dr. Ifeanyi Okoro",
    },
    {
      name: "Anonymous",
      caseType: "Alternative Dispute Resolution",
      rating: 4,
      feedback:
        "The mediation strategy was thoughtful and focused on long-term relationships. Truly impressed by the preparation.",
      timestamp: Date.UTC(2024, 6, 7),
      location: "Abuja, Nigeria",
      isAnonymous: true,
    },
  ];

  const loadLocal = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.map((item) => ({
            name: item.name || "Anonymous",
            caseType: item.caseType || "Other",
            rating: Number(item.rating) || 5,
            feedback: item.feedback || "",
            timestamp: item.timestamp || Date.now(),
            location: item.location || "Calabar, Cross River",
            isAnonymous:
              typeof item.isAnonymous === "boolean"
                ? item.isAnonymous
                : item.name === "Anonymous",
          }))
        : [];
    } catch (err) {
      console.warn("Unable to parse stored testimonials", err);
      return [];
    }
  };

  const saveLocal = (list) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[char])
    );

  let cachedLocal = loadLocal();

  const currentTestimonials = () => [...seededTestimonials, ...cachedLocal];

  function populateServiceFilter() {
    const services = new Set(["All"]);
    currentTestimonials().forEach((item) => services.add(item.caseType));
    const existing = new Set();
    Array.from(serviceSelect.options).forEach((opt) =>
      existing.add(opt.value.toLowerCase())
    );
    services.forEach((service) => {
      const value = service === "All" ? "all" : service;
      if (existing.has(value.toLowerCase())) return;
      const option = document.createElement("option");
      option.value = value;
      option.textContent = service;
      serviceSelect.appendChild(option);
    });
  }

  function formatName(item) {
    return item.isAnonymous ? "Anonymous" : item.name || "Anonymous";
  }

  function formatDate(timestamp) {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(timestamp));
    } catch {
      return "";
    }
  }

  function filterTestimonials(list) {
    const service = serviceSelect?.value || "all";
    const rating = ratingSelect?.value || "all";
    const sort = sortSelect?.value || "newest";
    const keyword = (searchInput?.value || "").trim().toLowerCase();

    let result = list.filter((item) => {
      const matchesService =
        service === "all" ||
        item.caseType.toLowerCase() === service.toLowerCase();
      const matchesRating = rating === "all" || item.rating >= Number(rating);
      const matchesKeyword =
        !keyword ||
        item.feedback.toLowerCase().includes(keyword) ||
        item.caseType.toLowerCase().includes(keyword) ||
        formatName(item).toLowerCase().includes(keyword);
      return matchesService && matchesRating && matchesKeyword;
    });

    if (sort === "newest") {
      result.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sort === "oldest") {
      result.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sort === "highest") {
      result.sort((a, b) => b.rating - a.rating || b.timestamp - a.timestamp);
    }

    return result;
  }

  function updateSummary(filtered, total) {
    if (!summaryEl) return;
    summaryEl.textContent = `${filtered} of ${total} testimonials shown.`;
  }

  function updateHeroStats(list) {
    if (!averageRatingEl || !reviewCountEl) return;
    if (list.length === 0) {
      averageRatingEl.textContent = "5.0 ★";
      reviewCountEl.textContent = "0 Reviews";
      return;
    }
    const average =
      list.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) /
      list.length;
    const rounded = Math.round(average * 10) / 10;
    averageRatingEl.textContent = `${rounded.toFixed(1)} ★`;
    reviewCountEl.textContent = `${list.length} Review${
      list.length === 1 ? "" : "s"
    }`;
  }

  function renderTestimonials() {
    const all = currentTestimonials();
    const filtered = filterTestimonials(all);
    updateSummary(filtered.length, all.length);
    updateHeroStats(all);

    grid.innerHTML = "";
    if (filtered.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "review-card";
      emptyState.innerHTML =
        "<p>No testimonials match your filters yet. Try adjusting the filters or share your own experience.</p>";
      grid.appendChild(emptyState);
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement("article");
      card.className = "review-card";
      const safeRating = Math.max(1, Math.min(5, Number(item.rating) || 5));
      const displayName = formatName(item);
      const metaParts = [];
      if (item.caseType) metaParts.push(escapeHtml(item.caseType));
      if (item.location) metaParts.push(escapeHtml(item.location));
      const date = formatDate(item.timestamp);
      if (date) metaParts.push(escapeHtml(date));
      const metaHTML = metaParts
        .map((part) => `<span>${part}</span>`)
        .join('<span class="review-card__dot" aria-hidden="true">•</span>');

      const initialMatch = displayName.match(/[A-Za-z]/);
      const initial = initialMatch ? initialMatch[0].toUpperCase() : "B";
      const avatar = item.avatar
        ? `<img src="${escapeHtml(item.avatar)}" alt="${escapeHtml(
            item.avatarAlt || displayName
          )}" loading="lazy" />`
        : `<span class="review-card__initial" aria-hidden="true">${escapeHtml(
            initial
          )}</span>`;

      card.innerHTML =
        `<header class="review-card__header">` +
        `<div class="review-card__avatar">${avatar}</div>` +
        `<div class="review-card__info">` +
        `<span class="review-card__name">${escapeHtml(displayName)}</span>` +
        `<div class="review-card__meta">${metaHTML}</div>` +
        `</div>` +
        `<div class="review-card__rating" aria-label="${escapeHtml(
          `${safeRating} out of 5 stars`
        )}">${"★".repeat(safeRating)}</div>` +
        `</header>` +
        `<p class="review-card__body">${escapeHtml(item.feedback)}</p>` +
        `<div class="review-card__tags">` +
        `<span class="review-card__tag">${escapeHtml(item.caseType)}</span>` +
        (item.isAnonymous
          ? '<span class="review-card__tag review-card__tag--anonymous">Anonymous</span>'
          : "") +
        `</div>`;
      grid.appendChild(card);
    });
  }

  function attachFilterListeners() {
    [serviceSelect, ratingSelect, sortSelect].forEach((el) =>
      el?.addEventListener("change", renderTestimonials)
    );
    searchInput?.addEventListener("input", () => {
      window.clearTimeout(searchInput._debounce);
      searchInput._debounce = window.setTimeout(renderTestimonials, 200);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("button--loading");
    }
    const displayPublic = form.displayName.checked;
    const rawName = form.name.value.trim();
    const data = {
      name: rawName || "Anonymous",
      caseType: form.caseType.value,
      rating: Number(form.rating.value) || 5,
      feedback: form.feedback.value.trim(),
      timestamp: Date.now(),
      location: "Calabar, Cross River",
      isAnonymous: !displayPublic,
    };

    if (!data.caseType || !data.feedback) {
      alert("Please complete the required fields.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("button--loading");
      }
      return;
    }

    cachedLocal.push(data);
    saveLocal(cachedLocal);
    populateServiceFilter();
    renderTestimonials();

    try {
      const resp = await fetch("/.netlify/functions/submitFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) console.warn("Server save failed", resp.status);

      const message =
        `Feedback from ${data.name}%0A` +
        `Case: ${encodeURIComponent(data.caseType)}%0A` +
        `Rating: ${data.rating}%0A` +
        `Display Name: ${displayPublic ? "Yes" : "No"}%0A` +
        `Message: ${encodeURIComponent(data.feedback)}`;
      const wa = `https://wa.me/${lawyerPhone}?text=${message}`;
      window.open(wa, "_blank");
    } catch (err) {
      console.warn("Server endpoint error (offline/dev):", err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("button--loading");
      }
      form.reset();
      form.displayName.checked = false;
    }
  });

  clearBtn?.addEventListener("click", () => {
    if (!confirm("Clear all stored feedback on this device?")) return;
    cachedLocal = [];
    saveLocal(cachedLocal);
    populateServiceFilter();
    renderTestimonials();
  });

  populateServiceFilter();
  attachFilterListeners();
  renderTestimonials();
})();
