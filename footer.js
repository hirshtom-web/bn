// footer.js
function initFooter() {

  /* ===============================
     MOBILE FOOTER ACCORDION
  ================================ */
  document.querySelectorAll('.footer-column h4').forEach(header => {
    header.addEventListener('click', () => {
      if (window.innerWidth > 768) return;

      const column = header.parentElement;

      document
        .querySelectorAll('.footer-column.active')
        .forEach(c => c !== column && c.classList.remove('active'));

      column.classList.toggle('active');
    });
  });

  /* ===============================
     REGION POPUP OPEN / CLOSE
  ================================ */
  const popup = document.getElementById("regionPopup");
  const openBtn = document.getElementById("openRegion");
  const closeBtn = document.getElementById("closeRegion");

  if (!popup || !openBtn || !closeBtn) {
    console.warn("Region popup elements missing");
    return;
  }

  openBtn.addEventListener("click", e => {
    e.preventDefault();
    popup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });

  /* ===============================
     REGIONS
  ================================ */
  const regions = [
    { country: "United States", code: "US", currency: "USD", flag: "🇺🇸" },
    { country: "Canada", code: "CA", currency: "CAD", flag: "🇨🇦" },
    { country: "United Kingdom", code: "GB", currency: "GBP", flag: "🇬🇧" },
    { country: "France", code: "FR", currency: "EUR", flag: "🇫🇷" },
    { country: "Spain", code: "ES", currency: "EUR", flag: "🇪🇸" },
    { country: "Italy", code: "IT", currency: "EUR", flag: "🇮🇹" },
    { country: "Germany", code: "DE", currency: "EUR", flag: "🇩🇪" },
    { country: "Belgium", code: "BE", currency: "EUR", flag: "🇧🇪" },
    { country: "Andorra", code: "AD", currency: "EUR", flag: "🇦🇩" }
  ];

  const regionToLang = {
    US: "en", CA: "en", GB: "en",
    FR: "fr", ES: "es", IT: "it",
    DE: "de", BE: "fr", AD: "en"
  };

  const translations = {
    en: { shop: "Shop", about: "About", footer: "© 2026 Bubunany." },
    fr: { shop: "Boutique", about: "À propos", footer: "© 2026 Bubunany." },
    es: { shop: "Comprar", about: "Sobre nosotros", footer: "© 2026 Bubunany." },
    it: { shop: "Negozio", about: "Chi siamo", footer: "© 2026 Bubunany." },
    de: { shop: "Shop", about: "Über uns", footer: "© 2026 Bubunany." }
  };

  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang]?.[key]) {
        el.textContent = translations[lang][key];
      }
    });
    localStorage.setItem("lang", lang);
  }

  const list = document.getElementById("regionList");
  list.innerHTML = "";

  regions.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${r.flag}</span> ${r.country} · ${r.currency}`;
    li.addEventListener("click", () => setRegion(r));
    list.appendChild(li);
  });

  function setRegion(r) {
    document.getElementById("currentFlag").textContent = r.flag;
    document.getElementById("currentRegion").textContent =
      `${r.country} · ${r.currency}`;

    applyLanguage(regionToLang[r.code] || "en");
    localStorage.setItem("region", JSON.stringify(r));
    popup.classList.remove("active");
  }

  const saved = localStorage.getItem("region");
  if (saved) {
    setRegion(JSON.parse(saved));
  } else {
    fetch("https://ipwho.is/")
      .then(r => r.json())
      .then(d => {
        const match = regions.find(r => r.code === d.country_code);
        setRegion(match || regions[0]);
      })
      .catch(() => setRegion(regions[0]));
  }
}
