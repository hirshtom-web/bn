document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1024) return;

  const stickyBuy = document.getElementById("sticky-buy");
  const productInfo = document.querySelector(".product-info");

  if (!stickyBuy || !productInfo) return;

  productInfo.addEventListener("scroll", () => {
    const scrollBottom =
      productInfo.scrollTop + productInfo.clientHeight;

    const atBottom =
      scrollBottom >= productInfo.scrollHeight - 8;

    stickyBuy.classList.toggle("active", atBottom);
  });
});

/* ACCORDION – one open at a time */
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.closest(".accordion-item");

    document.querySelectorAll(".accordion-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
