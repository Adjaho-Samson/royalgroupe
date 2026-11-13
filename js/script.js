"use strict";

const WHATSAPP_NUMBER = "2290144603910";

const CONTACT = {
  phone: "+229 01 44 60 39 10",
  whatsappLabel: "+229 01 44 60 39 10",
  email: "duhameldemesse@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61596542091779",
  instagram: "",
  otherSocials: [
    { name: "TikTok", url: "" },
    { name: "YouTube", url: "" },
  ],
};

const WHATSAPP_MESSAGES = {
  event:
    "Bonjour Royal Group !\n\n" +
    "Je souhaite réserver un ticket pour votre événement : {event}.\n\n" +
    "Pouvez-vous me communiquer les modalités de réservation et de paiement ?\n\n" +
    "Merci.",

  booking:
    "Bonjour Royal Group !\n\n" +
    "Je souhaite réserver un ticket pour l’un de vos prochains événements.\n\n" +
    "Pouvez-vous me communiquer les modalités de réservation et de paiement ?\n\n" +
    "Merci.",

  news:
    "Bonjour Royal Group !\n\n" +
    "Je souhaite être informé(e) de vos prochains événements.\n\n" +
    "Merci.",

  contact:
    "Bonjour Royal Group !\n\n" +
    "Je vous contacte pour une demande d’information.\n\n" +
    "Merci.",
};

const SETTINGS = {
  heroVideo: "",
};

const EVENTS = [
  {
    id: "royal-golden-festival",
    title: "Royal Golden Festival",
    category: "Festival",
    date: "2027-02-27",
    time: "18:00",
    location: "Lieu à confirmer",
    description:
      "Une scène à ciel ouvert, des artistes jusqu’au bout de la nuit et un show de lumières grand format : le grand rendez-vous festif signé Royal Group.",
    image: "assets/events/festival-plein-air.webp",
    thumb: "assets/events/festival-plein-air-vignette.webp",
    imageAlt:
      "Grande scène de festival en plein air au crépuscule, devant une foule immense",
    tickets: [
      { name: "Ticket Standard", price: "Tarif à confirmer" },
      { name: "Ticket VIP", price: "Tarif à confirmer" },
    ],
    demo: true,
  },
  {
    id: "royal-dj-experience",
    title: "LaLa Deejay",
    category: "Soirée DJ",
    date: "2027-05-15",
    time: "21:00",
    location: "Lieu à confirmer",
    description:
      "Un DJ set grand format, des effets pyrotechniques et une foule prête à tout donner jusqu’au bout de la nuit.",
    image: "assets/events/dj-set.webp",
    thumb: "assets/events/dj-set-vignette.webp",
    imageAlt:
      "DJ de dos, bras levé, face à une foule immense entourée de gerbes d’étincelles",
    tickets: [
      { name: "Pass Simple", price: "Tarif à confirmer" },
      { name: "Pass VIP", price: "Tarif à confirmer" },
    ],
    demo: true,
  },

  {
    id: "royal-night-live",
    title: "Royal Night Live",
    category: "Concert",
    date: "2026-09-26",
    time: "20:00",
    location: "Lieu de démonstration",
    description:
      "Une nuit de live portée par une scène spectaculaire, une pluie de confettis et un public en fusion.",
    image: "assets/events/concert-foule.webp",
    thumb: "assets/events/concert-foule-vignette.webp",
    imageAlt:
      "Foule enthousiaste, mains levées, face à une scène de concert sous une pluie de confettis",
    gallery: [
      "assets/events/artistes-sur-scene.webp",
      "assets/events/jeux-de-lumiere.webp",
    ],
    demo: true,
  },
  {
    id: "soiree-prestige",
    title: "Soirée Prestige",
    category: "Soirée VIP",
    date: "2026-07-18",
    time: "22:00",
    location: "Lieu de démonstration",
    description:
      "Tenues élégantes, décor noir et or, ambiance festive : une soirée VIP pensée dans les moindres détails.",
    image: "assets/events/soiree-vip.webp",
    thumb: "assets/events/soiree-vip-vignette.webp",
    imageAlt:
      "Invités élégants qui font la fête dans un salon VIP décoré de noir et d’or",
    gallery: [
      "assets/images/a-propos-soiree-prestige.webp",
      "assets/images/a-propos-accueil.webp",
    ],
    demo: true,
  },
  {
    id: "gala-royal",
    title: "Gala Royal",
    category: "Gala",
    date: "2026-05-30",
    time: "19:30",
    location: "Lieu de démonstration",
    description:
      "Dîner de gala, scène et lumières tamisées : une grande rencontre placée sous le signe de l’élégance.",
    image: "assets/events/gala-prestige.webp",
    thumb: "assets/events/gala-prestige-vignette.webp",
    imageAlt:
      "Grande salle de gala aux tables dressées de noir et d’or, sous des lustres en cristal",
    demo: true,
  },
];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const hasFinePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;

const state = {
  upcoming: [],
  past: [],
  day: "",
  isStarted: false,
  galleries: { past: [], upcoming: [] },
};

function runSteps(steps) {
  steps.forEach((step) => {
    try {
      step();
    } catch (error) {
      console.error("[Royal Group] Une erreur est survenue :", error);
    }
  });
}

function escapeHtml(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return String(value === undefined || value === null ? "" : value).replace(
    /[&<>"']/g,
    (char) => entities[char],
  );
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function icon(name, extraClass) {
  const classes = "icon" + (extraClass ? " " + extraClass : "");
  return `<svg class="${classes}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
}

function brandMark(extraClass) {
  return `<svg class="${extraClass || ""}" aria-hidden="true" focusable="false"><use href="#rg-mark"></use></svg>`;
}

const DATE_LONG = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const DATE_MEDIUM = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const DATE_DAY_MONTH = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
});
const MONTH_SHORT = new Intl.DateTimeFormat("fr-FR", { month: "short" });

function parseDate(dateText, timeText) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(
    String(dateText || "").trim(),
  );
  if (!dateMatch) return null;

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);

  const timeMatch = /^(\d{1,2}):(\d{2})$/.exec(String(timeText || "").trim());
  const hours = timeMatch ? Number(timeMatch[1]) : 0;
  const minutes = timeMatch ? Number(timeMatch[2]) : 0;

  const date = new Date(year, month - 1, day, hours, minutes);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  return isRealDate ? date : null;
}

function getEventStart(event) {
  return parseDate(event.date, event.time);
}

function getEventEnd(event) {
  const lastDay = parseDate(event.endDate) || parseDate(event.date);
  if (!lastDay) return null;
  lastDay.setHours(23, 59, 59, 999);
  return lastDay;
}

function isUpcoming(event, now) {
  const end = getEventEnd(event);
  return !end || end.getTime() >= now.getTime();
}

function frenchFirstDay(text) {
  return text.replace(/(^|\s)1 (?=\D)/, "$11er ");
}

function formatEventDate(event, style) {
  const start = parseDate(event.date);
  if (!start) return "Date à annoncer";

  const end = parseDate(event.endDate);
  if (end && end.getTime() > start.getTime()) {
    const sameYear = start.getFullYear() === end.getFullYear();
    const from = sameYear
      ? DATE_DAY_MONTH.format(start)
      : DATE_MEDIUM.format(start);
    return `Du ${frenchFirstDay(from)} au ${frenchFirstDay(DATE_MEDIUM.format(end))}`;
  }

  const formatter = style === "long" ? DATE_LONG : DATE_MEDIUM;
  return capitalize(frenchFirstDay(formatter.format(start)));
}

function formatTime(timeText) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(timeText || "").trim());
  return match ? `${match[1]}h${match[2]}` : "";
}

function daysUntil(date, now) {
  const startOfDay = (value) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
  return Math.round((startOfDay(date) - startOfDay(now)) / 86400000);
}

function relativeDayLabel(date, now) {
  const days = daysUntil(date, now);
  if (days <= 0) return "Aujourd’hui";
  if (days === 1) return "Demain";
  return `J-${days}`;
}

function normalizeEvent(event, index) {
  const normalized = Object.assign({}, event);
  normalized.id = String(event.id || `evenement-${index + 1}`);
  normalized.title = String(event.title || "Événement");

  if (event.date && !parseDate(event.date)) {
    console.warn(
      `[Royal Group] Date invalide pour « ${normalized.title} » : "${event.date}". Format attendu : AAAA-MM-JJ.`,
    );
  }
  return normalized;
}

function getWhatsAppNumber() {
  return String(WHATSAPP_NUMBER || "").replace(/\D/g, "");
}

function isWhatsAppConfigured() {
  return getWhatsAppNumber().length >= 8;
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

function getEventMessage(event) {
  return WHATSAPP_MESSAGES.event.replace("{event}", () => event.title);
}

let toastTimer = 0;

function showToast(html, duration) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerHTML = html;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(
    () => toast.classList.remove("is-visible"),
    duration || 7000,
  );
}

const scrollLocks = new Set();

function lockScroll(reason, isLocked) {
  if (isLocked) {
    scrollLocks.add(reason);
  } else {
    scrollLocks.delete(reason);
  }
  document.documentElement.classList.toggle("is-locked", scrollLocks.size > 0);
}

function trapFocus(event, elements) {
  if (event.key !== "Tab") return;

  const focusable = elements.filter(
    (element) => element && !element.hidden && element.offsetParent !== null,
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || !focusable.includes(active))) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    (active === last || !focusable.includes(active))
  ) {
    event.preventDefault();
    first.focus();
  }
}

function eventImage(event, source, cssClass) {
  if (!source) {
    return `<div class="media-fallback">${brandMark()}</div>`;
  }
  const alt = event.imageAlt || event.title;
  return `<img class="${cssClass}" src="${escapeHtml(source)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`;
}

function eventCaption(event) {
  return [formatEventDate(event, "medium"), event.location]
    .filter(Boolean)
    .join(" · ");
}

function ticketTemplate(event, isFeatured, photoIndex, now) {
  const start = getEventStart(event);
  const title = escapeHtml(event.title);
  const time = formatTime(event.time);

  const tags = [];
  if (isFeatured)
    tags.push('<span class="chip chip--gold">Prochain rendez-vous</span>');
  if (event.category)
    tags.push(`<span class="chip">${escapeHtml(event.category)}</span>`);
  if (!isFeatured && start)
    tags.push(`<span class="chip">${relativeDayLabel(start, now)}</span>`);
  if (event.demo) tags.push('<span class="chip chip--demo">Démo</span>');

  const dateBadge = start
    ? `<span class="ticket__day">${start.getDate()}</span>
       <span class="ticket__month">${escapeHtml(MONTH_SHORT.format(start))}</span>
       <span class="ticket__year">${start.getFullYear()}</span>`
    : `<span class="ticket__day">?</span>
       <span class="ticket__month">À venir</span>`;

  const meta = [];
  meta.push(
    `<li>${icon("calendar")}<span><span class="sr-only">Date : </span>${
      start
        ? `<time datetime="${escapeHtml(event.date)}">${formatEventDate(event, "long")}</time>`
        : "Date à annoncer"
    }</span></li>`,
  );
  if (time)
    meta.push(
      `<li>${icon("clock")}<span><span class="sr-only">Heure : </span>${time}</span></li>`,
    );
  if (event.location)
    meta.push(
      `<li>${icon("pin")}<span><span class="sr-only">Lieu : </span>${escapeHtml(event.location)}</span></li>`,
    );

  const tickets = Array.isArray(event.tickets)
    ? event.tickets.filter((ticket) => ticket && ticket.name)
    : [];
  const ticketList = tickets.length
    ? `<ul>${tickets.map((ticket) => `<li><span>${escapeHtml(ticket.name)}</span><span>${escapeHtml(ticket.price || "Tarif à venir")}</span></li>`).join("")}</ul>`
    : '<p class="ticket__prices-note">Informations sur les tickets communiquées prochainement.</p>';
  const ticketNote = event.ticketNote
    ? `<p class="ticket__prices-note">${escapeHtml(event.ticketNote)}</p>`
    : "";

  const countdown =
    isFeatured && start
      ? `<div class="countdown" data-countdown="${start.getTime()}" role="timer" aria-label="Temps restant avant l’événement">
         <div class="countdown__cell"><span class="countdown__value" data-unit="days">--</span><span class="countdown__unit">Jours</span></div>
         <div class="countdown__cell"><span class="countdown__value" data-unit="hours">--</span><span class="countdown__unit">Heures</span></div>
         <div class="countdown__cell"><span class="countdown__value" data-unit="minutes">--</span><span class="countdown__unit">Min</span></div>
         <div class="countdown__cell"><span class="countdown__value" data-unit="seconds">--</span><span class="countdown__unit">Sec</span></div>
       </div>`
      : "";

  const source = isFeatured
    ? event.image || event.thumb
    : event.thumb || event.image;
  const zoomButton =
    photoIndex >= 0
      ? `<button class="ticket__zoom" type="button" data-lightbox="upcoming" data-index="${photoIndex}" aria-label="Agrandir l’affiche : ${title}"></button>
       <span class="ticket__zoom-icon" aria-hidden="true">${icon("expand")}</span>`
      : "";

  return `
    <article class="ticket${isFeatured ? " ticket--featured" : ""}" data-reveal>
      <div class="ticket__media" data-tilt>
        ${eventImage(event, source, "ticket__img")}
        ${zoomButton}
        <div class="ticket__date" aria-hidden="true">${dateBadge}</div>
      </div>

      <div class="ticket__body">
        <div class="ticket__tags">${tags.join("")}</div>
        <h3 class="ticket__title">${title}</h3>
        <ul class="ticket__meta">${meta.join("")}</ul>
        ${event.description ? `<p class="ticket__desc">${escapeHtml(event.description)}</p>` : ""}
      </div>

      <div class="ticket__stub">
        ${countdown}
        <div class="ticket__prices">
          <p class="ticket__prices-title">${icon("ticket")}Tickets</p>
          ${ticketList}
          ${ticketNote}
        </div>
        <a class="btn btn--gold btn--lg ticket__cta" href="${escapeHtml(buildWhatsAppUrl(getEventMessage(event)))}" target="_blank" rel="noopener noreferrer">
          ${icon("whatsapp", "icon--brand")}
          <span>Réserver mon ticket<span class="sr-only"> pour ${title} (ouvre WhatsApp)</span></span>
        </a>
      </div>
    </article>`;
}

function moreEventsTemplate(hasNoEvent) {
  const title = hasNoEvent
    ? "De nouveaux événements arrivent bientôt"
    : "D’autres dates arrivent";
  const text = hasNoEvent
    ? "La prochaine programmation de Royal Group est en préparation. Écrivez-nous sur WhatsApp pour être informé(e) dès l’ouverture des réservations."
    : "De nouveaux rendez-vous sont en préparation. Écrivez-nous sur WhatsApp pour être informé(e) des prochaines annonces.";

  return `
    <aside class="ticket-more" data-reveal aria-label="Prochaines annonces">
      ${brandMark("ticket-more__mark")}
      <h3 class="ticket-more__title">${title}</h3>
      <p>${text}</p>
      <a class="btn btn--outline" href="${escapeHtml(buildWhatsAppUrl(WHATSAPP_MESSAGES.news))}" target="_blank" rel="noopener noreferrer">
        ${icon("whatsapp", "icon--brand")}
        <span>Être informé(e) sur WhatsApp</span>
      </a>
    </aside>`;
}

function renderUpcomingEvents(upcoming, now) {
  const list = document.getElementById("upcoming-list");
  if (!list) return;

  const photos = [];
  const cards = upcoming.map((event, index) => {
    let photoIndex = -1;
    if (event.image) {
      photoIndex = photos.length;
      photos.push({
        src: event.image,
        alt: event.imageAlt || event.title,
        title: event.title,
        meta: eventCaption(event),
      });
    }
    return ticketTemplate(event, index === 0, photoIndex, now);
  });

  cards.push(moreEventsTemplate(upcoming.length === 0));

  state.galleries.upcoming = photos;
  list.innerHTML = cards.join("");

  const demoNote = document.getElementById("upcoming-demo-note");
  if (demoNote) demoNote.hidden = !upcoming.some((event) => event.demo);
}

function pastCardTemplate(event, index, isWide, photoIndex, photoCount) {
  const title = escapeHtml(event.title);

  const tags = [];
  if (event.category)
    tags.push(`<span class="chip">${escapeHtml(event.category)}</span>`);
  if (photoCount > 1)
    tags.push(`<span class="chip">${photoCount} photos</span>`);
  if (event.demo) tags.push('<span class="chip chip--demo">Démo</span>');

  const meta = [];
  meta.push(
    `<span>${icon("calendar")}<time datetime="${escapeHtml(event.date)}">${formatEventDate(event, "medium")}</time></span>`,
  );
  if (event.location)
    meta.push(`<span>${icon("pin")}${escapeHtml(event.location)}</span>`);

  const source = isWide
    ? event.image || event.thumb
    : event.thumb || event.image;
  const hasPhoto = photoCount > 0;

  return `
    <article class="past-card" data-reveal style="--i: ${index % 3}">
      ${eventImage(event, source, "past-card__img")}
      <div class="past-card__top">
        <div class="past-card__tags">${tags.join("")}</div>
        ${hasPhoto ? `<span class="past-card__zoom" aria-hidden="true">${icon("expand")}</span>` : ""}
      </div>
      <div class="past-card__body">
        <h3 class="past-card__title">${title}</h3>
        <p class="past-card__meta">${meta.join("")}</p>
        ${event.description ? `<div class="past-card__desc"><p>${escapeHtml(event.description)}</p></div>` : ""}
      </div>
      ${hasPhoto ? `<button class="past-card__open" type="button" data-lightbox="past" data-index="${photoIndex}" aria-label="Agrandir ${photoCount > 1 ? "les photos" : "la photo"} : ${title}"></button>` : ""}
    </article>`;
}

function renderPastEvents(past) {
  const grid = document.getElementById("past-grid");
  if (!grid) return;

  const demoNote = document.getElementById("past-demo-note");
  if (demoNote) demoNote.hidden = !past.some((event) => event.demo);

  if (past.length === 0) {
    state.galleries.past = [];
    grid.innerHTML =
      '<p class="empty-state">Les souvenirs de nos événements seront bientôt publiés ici.</p>';
    return;
  }

  const remainder = past.length % 3;
  const wideCount = remainder === 2 ? 2 : remainder === 1 ? 4 : past.length % 2;

  const photos = [];
  const cards = past.map((event, index) => {
    const eventPhotos = [event.image]
      .concat(Array.isArray(event.gallery) ? event.gallery : [])
      .filter(Boolean);
    const photoIndex = photos.length;
    eventPhotos.forEach((src, position) => {
      photos.push({
        src: src,
        alt:
          position === 0 && event.imageAlt
            ? event.imageAlt
            : `${event.title} — photo ${position + 1}`,
        title: event.title,
        meta: eventCaption(event),
      });
    });
    return pastCardTemplate(
      event,
      index,
      index < wideCount,
      photoIndex,
      eventPhotos.length,
    );
  });

  state.galleries.past = photos;
  grid.innerHTML = cards.join("");
}

function renderHeroNext(event, now) {
  const slot = document.getElementById("hero-next");
  if (!slot) return;

  if (!event) {
    slot.innerHTML = "";
    return;
  }

  const start = getEventStart(event);
  const source = event.thumb || event.image;
  const thumb = source
    ? `<img src="${escapeHtml(source)}" alt="" width="58" height="58" decoding="async">`
    : brandMark();

  let count = "";
  let shortCount = "";
  if (start) {
    const days = daysUntil(start, now);
    shortCount = `<span class="hero-next__days"> · ${relativeDayLabel(start, now)}</span>`;
    if (days >= 2) count = `<strong>${days}</strong><span>jours</span>`;
    else if (days === 1) count = "<strong>J-1</strong><span>Demain</span>";
    else count = "<strong>Jour J</strong><span>Aujourd’hui</span>";
  }

  const place = event.location
    ? `<span class="hero-next__place"> · ${escapeHtml(event.location)}</span>`
    : "";

  slot.innerHTML = `
    <a class="hero-next" href="#prochains-evenements">
      ${event.demo ? '<span class="chip chip--demo hero-next__demo">Démo</span>' : ""}
      <span class="hero-next__thumb">${thumb}</span>
      <span class="hero-next__body">
        <span class="hero-next__label">Prochain événement</span>
        <span class="hero-next__title">${escapeHtml(event.title)}</span>
        <span class="hero-next__date">${escapeHtml(formatEventDate(event, "medium"))}${shortCount}${place}</span>
      </span>
      ${count ? `<span class="hero-next__count">${count}</span>` : ""}
    </a>`;
}

let countdownTimer = 0;

function updateCountdowns() {
  const now = Date.now();

  document.querySelectorAll("[data-countdown]").forEach((countdown) => {
    const remaining = Number(countdown.dataset.countdown) - now;

    if (remaining <= 0) {
      countdown.innerHTML =
        '<p class="countdown__live">C’est le grand jour !</p>';
      countdown.removeAttribute("data-countdown");
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const values = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };

    Object.keys(values).forEach((unit) => {
      const cell = countdown.querySelector(`[data-unit="${unit}"]`);
      const text = String(values[unit]).padStart(2, "0");
      if (cell && cell.textContent !== text) cell.textContent = text;
    });
  });
}

function startCountdowns() {
  updateCountdowns();
  if (!countdownTimer && document.querySelector("[data-countdown]")) {
    countdownTimer = window.setInterval(updateCountdowns, 1000);
  }
}

function setupImageFallback() {
  document.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;

      if (image.matches(".ticket__img, .past-card__img")) {
        image.outerHTML = `<div class="media-fallback">${brandMark()}</div>`;
      } else if (image.closest(".hero-next__thumb")) {
        image.outerHTML = brandMark();
      }
    },
    true,
  );
}

function updateWhatsAppLinks(upcoming) {
  const bookingMessage =
    upcoming.length === 1
      ? getEventMessage(upcoming[0])
      : WHATSAPP_MESSAGES.booking;

  document.querySelectorAll("a[data-whatsapp]").forEach((link) => {
    const type = link.dataset.whatsapp;
    const message =
      type === "booking"
        ? bookingMessage
        : WHATSAPP_MESSAGES[type] || WHATSAPP_MESSAGES.contact;

    link.href = buildWhatsAppUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function setupDemoNotice() {
  if (isWhatsAppConfigured()) return;

  console.info(
    "[Royal Group] Mode démonstration : renseignez WHATSAPP_NUMBER dans js/script.js pour activer la réservation.",
  );

  document.addEventListener("click", (event) => {
    const link =
      event.target instanceof Element
        ? event.target.closest('a[href^="https://wa.me/"]')
        : null;
    if (link) {
      showToast(
        "<strong>Mode démonstration :</strong> le numéro WhatsApp officiel n’est pas encore configuré. WhatsApp s’ouvre avec le message prérempli, sans destinataire.",
        9000,
      );
    }
  });
}

let isBookingReady = false;

function updateBooking(upcoming) {
  const select = document.getElementById("booking-event");
  const preview = document.getElementById("booking-preview");
  const submit = document.getElementById("booking-submit");
  if (!select || !preview || !submit) return;

  function updateMessage(isUserChange) {
    const event = state.upcoming.find((item) => item.id === select.value);
    const message = event ? getEventMessage(event) : WHATSAPP_MESSAGES.booking;

    preview.textContent = message;
    submit.href = buildWhatsAppUrl(message);

    if (isUserChange && !prefersReducedMotion) {
      preview.classList.remove("is-updating");
      void preview.offsetWidth;
      preview.classList.add("is-updating");
    }
  }

  const previousChoice = select.value;
  select.length = 1;
  upcoming.forEach((event) => {
    const label = getEventStart(event)
      ? `${event.title} — ${formatEventDate(event, "medium")}`
      : event.title;
    select.add(new Option(label, event.id));
  });

  const isChoiceStillValid =
    previousChoice === "" ||
    upcoming.some((event) => event.id === previousChoice);
  if (isBookingReady && isChoiceStillValid) {
    select.value = previousChoice;
  } else {
    select.value = upcoming.length > 0 ? upcoming[0].id : "";
  }

  if (!isBookingReady) {
    select.addEventListener("change", () => updateMessage(true));
    isBookingReady = true;
  }
  updateMessage(false);
}

function normalizeUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function displayUrl(url) {
  return url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
}

function setupContact() {
  const socials = [];

  function activate(key, text, href, isExternal) {
    const item = document.querySelector(`[data-contact="${key}"]`);
    const value = item ? item.querySelector(".contact-item__value") : null;
    if (!value) return;

    const attributes = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    value.innerHTML = `<a class="contact-item__link contact-item__link--stretched" href="${escapeHtml(href)}"${attributes}>${escapeHtml(text)}</a>`;
    item.classList.add("is-active");
    item.insertAdjacentHTML(
      "beforeend",
      icon("arrow-up-right", "contact-item__arrow"),
    );
  }

  if (CONTACT.phone) {
    activate(
      "phone",
      CONTACT.phone,
      `tel:${String(CONTACT.phone).replace(/[^\d+]/g, "")}`,
      false,
    );
  }

  if (isWhatsAppConfigured()) {
    const url = buildWhatsAppUrl(WHATSAPP_MESSAGES.contact);
    activate(
      "whatsapp",
      CONTACT.whatsappLabel || `+${getWhatsAppNumber()}`,
      url,
      true,
    );
    socials.push({ name: "WhatsApp", url: url, iconName: "whatsapp" });
  }

  if (CONTACT.email) {
    activate(
      "email",
      CONTACT.email,
      `mailto:${String(CONTACT.email).trim()}`,
      false,
    );
  }

  ["facebook", "instagram"].forEach((network) => {
    const url = normalizeUrl(CONTACT[network]);
    if (!url) return;
    activate(network, displayUrl(url), url, true);
    socials.push({ name: capitalize(network), url: url, iconName: network });
  });

  const others = (
    Array.isArray(CONTACT.otherSocials) ? CONTACT.otherSocials : []
  )
    .map((social) => ({
      name: String((social && social.name) || "").trim(),
      url: normalizeUrl(social && social.url),
    }))
    .filter((social) => social.name && social.url);

  const othersItem = document.querySelector('[data-contact="others"]');
  const othersValue = othersItem
    ? othersItem.querySelector(".contact-item__value")
    : null;
  if (others.length > 0 && othersValue) {
    othersValue.innerHTML = others
      .map(
        (social) =>
          `<a class="contact-item__link" href="${escapeHtml(social.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(social.name)}</a>`,
      )
      .join('<span class="contact-item__sep" aria-hidden="true">·</span>');
    othersItem.classList.add("is-active", "is-multiple");

    const knownIcons = [
      "tiktok",
      "youtube",
      "facebook",
      "instagram",
      "whatsapp",
    ];
    others.forEach((social) => {
      const key = social.name.toLowerCase();
      socials.push({
        name: social.name,
        url: social.url,
        iconName: knownIcons.includes(key) ? key : "",
      });
    });
  }

  const footerSocials = document.getElementById("footer-socials");
  if (footerSocials && socials.length > 0) {
    footerSocials.innerHTML = socials
      .map((social) => {
        const symbol = social.iconName
          ? icon(social.iconName, "icon--brand")
          : icon("share");
        return `<li><a href="${escapeHtml(social.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(social.name)}">${symbol}</a></li>`;
      })
      .join("");
    footerSocials.hidden = false;
  }
}

function setupFooterYear() {
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function setupMobileMenu() {
  const header = document.getElementById("site-header");
  const toggle = header ? header.querySelector(".nav-toggle") : null;
  const nav = document.getElementById("menu-principal");
  if (!header || !toggle || !nav) return;

  const label = toggle.querySelector(".nav-toggle__label");
  const desktopQuery = window.matchMedia("(min-width: 1180px)");
  const isOpen = () => header.classList.contains("is-menu-open");

  function setMenu(open) {
    header.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu",
    );
    if (label) label.textContent = open ? "Fermer" : "Menu";
    lockScroll("menu", open);
  }

  toggle.addEventListener("click", () => setMenu(!isOpen()));

  nav.addEventListener("click", (event) => {
    if (
      isOpen() &&
      event.target instanceof Element &&
      event.target.closest("a")
    )
      setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;

    if (event.key === "Escape") {
      setMenu(false);
      toggle.focus();
    } else {
      trapFocus(event, [toggle].concat(Array.from(nav.querySelectorAll("a"))));
    }
  });

  window.addEventListener("resize", () => {
    if (isOpen() && desktopQuery.matches) setMenu(false);
  });
}

function setupScrollSpy() {
  if (!("IntersectionObserver" in window)) return;

  const links = Array.from(document.querySelectorAll(".site-nav__link"));
  const linkBySection = new Map();
  links.forEach((link) => {
    const section = document.getElementById(
      String(link.getAttribute("href")).slice(1),
    );
    if (section) linkBySection.set(section, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        });

        const activeLink = linkBySection.get(entry.target);
        activeLink.classList.add("is-active");
        activeLink.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -55% 0px" },
  );

  linkBySection.forEach((link, section) => observer.observe(section));
}

function setupScrollEffects() {
  const header = document.getElementById("site-header");
  const progressBar = document.querySelector(".scroll-progress__bar");
  const hero = document.querySelector(".hero");
  const parallaxImages = prefersReducedMotion
    ? []
    : Array.from(document.querySelectorAll("[data-parallax]"));

  let heroHeight = hero ? hero.offsetHeight : 0;
  let isTicking = false;

  function update() {
    isTicking = false;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - viewportHeight;
    const frames = parallaxImages.map((image) =>
      image.parentElement.getBoundingClientRect(),
    );

    if (header) header.classList.toggle("is-scrolled", scrollY > 24);
    if (progressBar)
      progressBar.style.setProperty(
        "--page-progress",
        maxScroll > 0 ? Math.min(scrollY / maxScroll, 1).toFixed(4) : "0",
      );

    if (hero && !prefersReducedMotion && scrollY <= heroHeight) {
      const fadeStart = Math.max(0, heroHeight - viewportHeight);
      const fade = Math.min(
        Math.max((scrollY - fadeStart) / (viewportHeight * 0.75), 0),
        1,
      );
      hero.style.setProperty("--scroll", (scrollY * 0.28).toFixed(1));
      hero.style.setProperty("--progress", fade.toFixed(3));
    }

    parallaxImages.forEach((image, index) => {
      const frame = frames[index];
      if (frame.bottom < -80 || frame.top > viewportHeight + 80) return;

      const distance = frame.top + frame.height / 2 - viewportHeight / 2;
      const limit = frame.height * 0.07;
      const offset = Math.max(
        -limit,
        Math.min(limit, distance * Number(image.dataset.parallax)),
      );
      image.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
    });
  }

  function requestUpdate() {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    heroHeight = hero ? hero.offsetHeight : 0;
    requestUpdate();
  });
  update();
}

function updateDiscoverLinks(hasUpcomingEvents) {
  const target = hasUpcomingEvents
    ? "#prochains-evenements"
    : "#evenements-passes";
  document
    .querySelectorAll("[data-discover]")
    .forEach((link) => link.setAttribute("href", target));
}

let revealObserver = null;

function revealElement(element) {
  element.classList.add("is-visible");

  const index = Number(element.style.getPropertyValue("--i")) || 0;
  window.setTimeout(
    () => element.removeAttribute("data-reveal"),
    2200 + index * 90,
  );
}

function setupReveal() {
  const root = document.documentElement;
  const elements = Array.from(document.querySelectorAll("[data-reveal]"));

  document.querySelectorAll("[data-stagger]").forEach((list) => {
    Array.from(list.children).forEach((child, index) =>
      child.style.setProperty("--i", String(index)),
    );
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.removeAttribute("data-reveal"));
    root.classList.replace("no-js", "js");
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealObserver.unobserve(entry.target);
        revealElement(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  const viewportHeight = window.innerHeight;
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < viewportHeight) {
      element.removeAttribute("data-reveal");
    } else {
      revealObserver.observe(element);
    }
  });

  root.classList.replace("no-js", "js");
}

function watchNewReveals() {
  document
    .querySelectorAll("#upcoming-list [data-reveal], #past-grid [data-reveal]")
    .forEach((element) => {
      if (revealObserver) {
        revealObserver.observe(element);
      } else {
        element.removeAttribute("data-reveal");
      }
    });
}

function setupHeroIntro() {
  const root = document.documentElement;

  if (
    !prefersReducedMotion &&
    document.fonts &&
    typeof document.fonts.load === "function"
  ) {
    const start = () => root.classList.remove("is-waiting");
    window.setTimeout(start, 1500);
    root.classList.add("is-waiting");
    document.fonts.load('1em "Anton"').then(start, start);
  }

  const image = document.querySelector(".hero__img");
  if (image && !image.complete) {
    const show = () => image.classList.remove("is-loading");
    image.classList.add("is-loading");
    image.addEventListener("load", show, { once: true });
    image.addEventListener("error", show, { once: true });
  }
}

function setupHeroEffects() {
  const hero = document.querySelector(".hero");
  if (!hero || prefersReducedMotion) return;

  const dust = hero.querySelector(".hero__dust");
  if (dust) {
    const random = (min, max) => min + Math.random() * (max - min);
    const count = window.innerWidth < 768 ? 12 : 26;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("i");
      particle.style.cssText =
        `--x:${random(0, 100).toFixed(1)}%;` +
        `--s:${random(2, 5).toFixed(1)}px;` +
        `--d:${random(10, 22).toFixed(1)}s;` +
        `--delay:-${random(0, 22).toFixed(1)}s;` +
        `--o:${random(0.35, 0.9).toFixed(2)};` +
        `--drift:${random(-70, 70).toFixed(0)}px;`;
      fragment.appendChild(particle);
    }
    dust.appendChild(fragment);
  }

  if (hasFinePointer) {
    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;

    hero.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty(
          "--px",
          (((pointerX - rect.left) / rect.width - 0.5) * 2).toFixed(3),
        );
        hero.style.setProperty(
          "--py",
          (((pointerY - rect.top) / rect.height - 0.5) * 2).toFixed(3),
        );
      });
    });

    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    });
  }

  const depth = hero.querySelector(".hero__depth");
  const saveData = navigator.connection && navigator.connection.saveData;
  if (SETTINGS.heroVideo && depth && !saveData) {
    const video = document.createElement("video");
    video.className = "hero__video";
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("aria-hidden", "true");
    video.addEventListener("canplay", () => video.classList.add("is-loaded"), {
      once: true,
    });
    video.src = SETTINGS.heroVideo;
    depth.appendChild(video);
  }
}

function setupPointerEffects() {
  if (!hasFinePointer || prefersReducedMotion) return;

  document.addEventListener(
    "pointermove",
    (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const card = target.closest("[data-spotlight]");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty(
          "--mx",
          `${(event.clientX - rect.left).toFixed(0)}px`,
        );
        card.style.setProperty(
          "--my",
          `${(event.clientY - rect.top).toFixed(0)}px`,
        );
      }

      const media = target.closest("[data-tilt]");
      if (media) {
        const rect = media.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        media.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
        media.style.setProperty("--rx", `${(y * -5).toFixed(2)}deg`);
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "pointerout",
    (event) => {
      const media =
        event.target instanceof Element
          ? event.target.closest("[data-tilt]")
          : null;
      if (
        media &&
        !(
          event.relatedTarget instanceof Node &&
          media.contains(event.relatedTarget)
        )
      ) {
        media.style.setProperty("--rx", "0deg");
        media.style.setProperty("--ry", "0deg");
      }
    },
    { passive: true },
  );
}

function setupMarquee() {
  const track = document.querySelector(".marquee__track");
  const group = track ? track.querySelector(".marquee__group") : null;
  if (!track || !group) return;

  function build() {
    Array.from(track.children)
      .slice(1)
      .forEach((copy) => copy.remove());

    const groupWidth = group.getBoundingClientRect().width;
    if (!groupWidth) return;

    const copies = Math.ceil(window.innerWidth / groupWidth) + 1;
    for (let index = 0; index < copies; index += 1) {
      track.appendChild(group.cloneNode(true));
    }

    track.style.setProperty("--marquee-shift", `-${groupWidth.toFixed(1)}px`);
    track.style.setProperty(
      "--marquee-duration",
      `${Math.max(18, Math.round(groupWidth / 60))}s`,
    );
    track.classList.toggle("is-ready", !prefersReducedMotion);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(build, build);
  } else {
    build();
  }

  let resizeTimer = 0;
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 200);
  });
}

function setupOffscreenPause() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting),
      );
    },
    { rootMargin: "80px 0px" },
  );

  document
    .querySelectorAll(".hero, .marquee, .seal")
    .forEach((element) => observer.observe(element));
}

function setupLightbox() {
  const root = document.createElement("div");
  root.className = "lightbox";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Galerie photos");
  root.innerHTML = `
    <div class="lightbox__bar">
      <p class="lightbox__counter" aria-live="polite"></p>
      <button class="lightbox__btn lightbox__close" type="button" aria-label="Fermer la galerie">${icon("close")}</button>
    </div>
    <div class="lightbox__stage">
      <button class="lightbox__btn lightbox__nav lightbox__nav--prev" type="button" aria-label="Photo précédente">${icon("chevron-left")}</button>
      <img class="lightbox__img" alt="">
      <button class="lightbox__btn lightbox__nav lightbox__nav--next" type="button" aria-label="Photo suivante">${icon("chevron-right")}</button>
    </div>
    <div class="lightbox__caption">
      <p class="lightbox__title"></p>
      <p class="lightbox__meta"></p>
    </div>`;
  document.body.appendChild(root);

  const stage = root.querySelector(".lightbox__stage");
  const image = root.querySelector(".lightbox__img");
  const counter = root.querySelector(".lightbox__counter");
  const title = root.querySelector(".lightbox__title");
  const meta = root.querySelector(".lightbox__meta");
  const closeButton = root.querySelector(".lightbox__close");
  const prevButton = root.querySelector(".lightbox__nav--prev");
  const nextButton = root.querySelector(".lightbox__nav--next");

  let items = [];
  let currentIndex = 0;
  let trigger = null;
  let requestId = 0;

  const isOpen = () => root.classList.contains("is-open");

  function show(index, direction) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const thisRequest = ++requestId;

    image.style.setProperty("--shift", `${direction * 28}px`);
    image.classList.add("is-changing");

    const fadeOut = new Promise((resolve) =>
      window.setTimeout(
        resolve,
        direction === 0 || prefersReducedMotion ? 0 : 220,
      ),
    );
    const loaded = new Promise((resolve) => {
      const loader = new Image();
      loader.onload = resolve;
      loader.onerror = resolve;
      loader.src = item.src;
    });

    Promise.all([fadeOut, loaded]).then(() => {
      if (thisRequest !== requestId) return;

      image.src = item.src;
      image.alt = item.alt;
      title.textContent = item.title;
      meta.textContent = item.meta;
      counter.textContent = `${currentIndex + 1} / ${items.length}`;

      image.style.setProperty("--shift", `${direction * -28}px`);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() =>
          image.classList.remove("is-changing"),
        );
      });
    });

    if (items.length > 1) {
      [currentIndex + 1, currentIndex - 1].forEach((neighbour) => {
        new Image().src = items[(neighbour + items.length) % items.length].src;
      });
    }
  }

  function open(newItems, index, triggerElement) {
    if (!newItems || newItems.length === 0) return;

    items = newItems;
    trigger = triggerElement || null;

    const hasSeveral = items.length > 1;
    prevButton.hidden = !hasSeveral;
    nextButton.hidden = !hasSeveral;

    root.classList.add("is-open");
    lockScroll("lightbox", true);
    show(index, 0);
    closeButton.focus();
  }

  function close() {
    root.classList.remove("is-open");
    lockScroll("lightbox", false);
    if (trigger && document.contains(trigger))
      trigger.focus({ preventScroll: true });
  }

  document.addEventListener("click", (event) => {
    const opener =
      event.target instanceof Element
        ? event.target.closest("[data-lightbox]")
        : null;
    if (!opener) return;
    open(
      state.galleries[opener.dataset.lightbox],
      Number(opener.dataset.index) || 0,
      opener,
    );
  });

  closeButton.addEventListener("click", close);
  prevButton.addEventListener("click", () => show(currentIndex - 1, -1));
  nextButton.addEventListener("click", () => show(currentIndex + 1, 1));

  stage.addEventListener("click", (event) => {
    if (event.target === stage) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;

    if (event.key === "Escape") close();
    else if (event.key === "ArrowLeft" && items.length > 1)
      show(currentIndex - 1, -1);
    else if (event.key === "ArrowRight" && items.length > 1)
      show(currentIndex + 1, 1);
    else trapFocus(event, [closeButton, prevButton, nextButton]);
  });

  let touchStartX = 0;
  let touchStartY = 0;

  stage.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      if (
        items.length < 2 ||
        Math.abs(deltaX) < 50 ||
        Math.abs(deltaX) < Math.abs(deltaY) * 1.5
      )
        return;
      show(currentIndex + (deltaX < 0 ? 1 : -1), deltaX < 0 ? 1 : -1);
    },
    { passive: true },
  );
}

function refreshEvents() {
  const now = new Date();
  const events = EVENTS.map(normalizeEvent);
  const farFuture = Number.MAX_SAFE_INTEGER;

  state.upcoming = events
    .filter((event) => isUpcoming(event, now))
    .sort((a, b) => {
      const startA = getEventStart(a);
      const startB = getEventStart(b);
      return (
        (startA ? startA.getTime() : farFuture) -
        (startB ? startB.getTime() : farFuture)
      );
    });

  state.past = events
    .filter((event) => !isUpcoming(event, now))
    .sort((a, b) => getEventEnd(b).getTime() - getEventEnd(a).getTime());

  state.day = now.toDateString();

  runSteps([
    () => renderUpcomingEvents(state.upcoming, now),
    () => renderPastEvents(state.past),
    () => renderHeroNext(state.upcoming[0], now),
    () => updateDiscoverLinks(state.upcoming.length > 0),
    () => updateWhatsAppLinks(state.upcoming),
    () => updateBooking(state.upcoming),
    startCountdowns,
    () => {
      if (state.isStarted) watchNewReveals();
    },
  ]);
}

function watchDayChange() {
  const check = () => {
    if (!document.hidden && new Date().toDateString() !== state.day)
      refreshEvents();
  };

  window.setInterval(check, 60000);
  document.addEventListener("visibilitychange", check);
}

function init() {
  refreshEvents();

  runSteps([
    setupDemoNotice,
    setupContact,
    setupFooterYear,
    setupImageFallback,
    setupReveal,
    setupHeroIntro,
    setupMobileMenu,
    setupScrollSpy,
    setupScrollEffects,
    setupHeroEffects,
    setupPointerEffects,
    setupMarquee,
    setupOffscreenPause,
    setupLightbox,
    watchDayChange,
  ]);

  state.isStarted = true;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
