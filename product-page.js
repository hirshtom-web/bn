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


/* ACCORDION – only one open at a time, click to toggle */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all items
      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".accordion-content").style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Initialize open items if any
  items.forEach(item => {
    if (item.classList.contains("active")) {
      const content = item.querySelector(".accordion-content");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
