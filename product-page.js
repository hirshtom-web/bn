document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".image-main img");
  const thumbnails = document.querySelectorAll(".image-thumbs span img");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src; // change main image
      mainImage.alt = thumb.alt || "Product Image";

      // Highlight the selected thumbnail
      thumbnails.forEach(t => t.parentElement.classList.remove("active"));
      thumb.parentElement.classList.add("active");
    });
  });

  // Optional: mark first thumbnail as active
  if (thumbnails[0]) thumbnails[0].parentElement.classList.add("active");
});
