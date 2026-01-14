// footer.js
function initFooter() {

  /* ===============================
     MOBILE FOOTER ACCORDION
     - Mobile only
     - Smooth (CSS handles animation)
     - Only ONE section open at a time
  ================================ */
  const headers = document.querySelectorAll('.footer-column h4');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      if (window.innerWidth > 768) return;

      const column = header.parentElement;

      // Close all others
      document.querySelectorAll('.footer-column.active').forEach(openCol => {
        if (openCol !== column) openCol.classList.remove('active');
      });

      // Toggle clicked one
      column.classList.toggle('active');
    });
  });


/* ===============================
   REGION POPUP OPEN / CLOSE
================================ */
const popup = document.getElementById("regionPopup");
const openBtn = document.getElementById("openRegion");
const closeBtn = document.getElementById("closeRegion");

if (openBtn && popup) {
  openBtn.addEventListener("click", () => popup.classList.add("active"));
}

if (closeBtn && popup) {
  closeBtn.addEventListener("click", () => popup.classList.remove("active"));
}


/* ===============================
   REGION DATA
================================ */
const regions = [
  { country: "United States", code: "US", currency: "USD", flag: "🇺🇸" },
  { country: "Canada", code: "CA", currency: "CAD", flag: "🇨🇦" },
  { country: "United Kingdom", code: "GB", currency: "GBP", flag: "🇬🇧" },
  { country: "France", code: "FR", currency: "EUR", flag: "🇫🇷" },
  { country: "Spain", code: "ES", currency: "EUR", flag: "🇪🇸" },
  { country: "Italy", code: "IT", currency: "EUR", flag: "🇮🇹" },
  { country: "Germany", code: "DE", currency: "EUR", flag: "🇩🇪" },
  { country: "Belgium", code: "BE", currency: "EUR", flag: "🇧🇪" }
];


/* ===============================
   LANGUAGE MAP
================================ */
const regionToLang = {
  US: "en",
  CA: "en",
  GB: "en",
  FR: "fr",
  ES: "es",
  IT: "it",
  DE: "de",
  BE: "fr"
};


/* ===============================
   TRANSLATIONS
================================ */
const translations = {
  en: {
    shop: "Shop",
    about: "About",
    careers: "Careers",
    footer_copy: "© 2026 Bubunany. All rights reserved."
  },
  fr: {
    shop: "Boutique",
    about: "À propos",
    careers: "Carrières",
    footer_copy: "© 2026 Bubunany. Tous droits réservés."
  },
  es: {
    shop: "Comprar",
    about: "Sobre nosotros",
    careers: "Carreras",
    footer_copy: "© 2026 Bubunany. Todos los derechos reservados."
  },
  it: {
    shop: "Negozio",
    about: "Chi siamo",
    careers: "Carriere",
    footer_copy: "© 2026 Bubunany. Tutti i diritti riservati."
  },
  de: {
    shop: "Shop",
    about: "Über uns",
    careers: "Karriere",
    footer_copy: "© 2026 Bubunany. Alle Rechte vorbehalten."
  }
};


/* ===============================
   APPLY LANGUAGE
================================ */
function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem("lang", lang);
}


/* ===============================
   RENDER REGION LIST
================================ */
const list = document.getElementById("regionList");

if (list) {
  list.innerHTML = "";
  regions.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${r.flag}</span> ${r.country} · ${r.currency}`;
    li.addEventListener("click", () => setRegion(r));
    list.appendChild(li);
  });
}


/* ===============================
   SET REGION + LANGUAGE
================================ */
function setRegion(r) {
  const flag = document.getElementById("currentFlag");
  const region = document.getElementById("currentRegion");

  if (flag) flag.textContent = r.flag;
  if (region) region.textContent = `${r.country} · ${r.currency}`;

  const lang = regionToLang[r.code] || "en";
  applyLanguage(lang);

  popup?.classList.remove("active");
  localStorage.setItem("region", JSON.stringify(r));
}


/* ===============================
   LOAD SAVED / IP DEFAULT
================================ */
const savedRegion = localStorage.getItem("region");
const savedLang = localStorage.getItem("lang");

if (savedRegion) {
  setRegion(JSON.parse(savedRegion));
} else {
  fetch("https://ipwho.is/")
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error();
      const match = regions.find(r => r.code === data.country_code);
      setRegion(match || regions[0]);
    })
    .catch(() => setRegion(regions[0]));
}

// Ensure language is applied even if region didn't change
if (savedLang) {
  applyLanguage(savedLang);
}


  /* ===============================
     PREVENT # JUMP
  ================================ */
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => e.preventDefault());
  });

}


/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", initFooter);
