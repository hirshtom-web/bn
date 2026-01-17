document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.feature-slides');
  const dots = document.querySelectorAll('.feature-dots .dot');

  if (!slides || !dots.length) {
    console.warn('Slider elements missing');
    return;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {

      // Move slides
      slides.style.transform = `translateX(-${index * 100}%)`;

      // Update active dot
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
});
