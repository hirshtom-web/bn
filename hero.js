document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.feature-slides');
  const dots = document.querySelectorAll('.feature-dots .dot');

  if (!slides || !dots.length) return;

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);

      slides.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
});
