const slides = document.querySelector('.feature-slides');
const dots = document.querySelectorAll('.feature-dots .dot');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = dot.dataset.index;

    // Move slides
    slides.style.transform = `translateX(-${index * 100}%)`;

    // Update active dot
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});
