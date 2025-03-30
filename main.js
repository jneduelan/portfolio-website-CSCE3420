
document.addEventListener('mousemove', (e) => {
  document.body.style.backgroundPosition = `${e.clientX / 10}px ${e.clientY / 10}px`;
});
