document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1024) return;

  const stickyBuy = document.getElementById("sticky-buy");
  const productInfo = document.querySelector(".product-info");

  if (!stickyBuy || !productInfo) return;

  productInfo.addEventListener("scroll", () => {
    const scrollBottom =
      productInfo.scrollTop + productInfo.clientHeight;

    if (scrollBottom >= productInfo.scrollHeight - 10) {
      stickyBuy.classList.add("active");
    } else {
      stickyBuy.classList.remove("active");
    }
  });
});
