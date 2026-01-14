<script>
(function () {

  /* ===============================
     CONFIG
  =============================== */

  const regions = [
    { code: "en", label: "United States", flag: "🇺🇸", currency: "USD" },
    { code: "en", label: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
    { code: "fr", label: "France", flag: "🇫🇷", currency: "EUR" },
    { code: "es", label: "Spain", flag: "🇪🇸", currency: "EUR" }
  ];

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
    }
  };

  /* ===============================
     ELEMENTS
  =============================== */

  const popup = document.getElementById("regionPopup");
  const regionList = document.getElementById("regionList");
  const closeBtn = document.getElementById("closeRegion");
  const toggleBtn = document.querySelector(".region-btn");

  if (!popup || !regionList || !toggleBtn) return;

  /* ===============================
     STATE
  =============================== */

  let currentLang = localStorage.getItem("lang") || "en";

  /* ===============================
     FUNCTIONS
  =============================== */

  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang]?.[key]) {
        el.textContent = translations[lang][key];
      }
    });

    localStorage.setItem("lang", lang);
    currentLang = lang;
  }

  function renderRegions() {
    regionList.innerHTML = "";

    regions.forEach(region => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${region.flag}</span>
        <span>${region.label}</span>
      `;

      li.addEventListener("click", () => {
        applyLanguage(region.code);
        popup.classList.remove("active");
      });

      regionList.appendChild(li);
    });
  }

  /* ===============================
     EVENTS
  =============================== */

  toggleBtn.addEventListener("click", () => {
    popup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });

  /* ===============================
     INIT
  =============================== */

  renderRegions();
  applyLanguage(currentLang);

})();
</script>
