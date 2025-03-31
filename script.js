
document.addEventListener('mousemove', (e) => {
  document.body.style.backgroundPosition = `${e.clientX / 10}px ${e.clientY / 10}px`;
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.transform = 'scale(1.1)';
  });
  link.addEventListener('mouseout', () => {
    link.style.transform = 'scale(1)';
  });
});
