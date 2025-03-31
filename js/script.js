document.addEventListener('DOMContentLoaded', function() {
  // Fade in the page
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Button hover effects
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transform = 'scale(1.05) translateX(4px)';
    });
    button.addEventListener('mouseout', () => {
      button.style.transform = 'scale(1) translateX(0)';
    });
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.hash !== '') {
        e.preventDefault();
        const hash = this.hash;
        document.querySelector(hash).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Interactive background
  const canvas = document.getElementById('background-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    // Set canvas dimensions
    function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    function createParticles() {
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 50 : 100;
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(100, 149, 237, ${Math.random() * 0.5 + 0.1})` // Cornflower blue with varying opacity
        });
      }
    }
    
    createParticles();
    
    // Update particles
    function updateParticles() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Mouse interaction
        if (isMouseMoving) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            p.speedX += dx * force * 0.01;
            p.speedY += dy * force * 0.01;
          }
        }
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Limit speed
        const maxSpeed = 1;
        const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed;
          p.speedY = (p.speedY / speed) * maxSpeed;
        }
      }
    }
    
    // Draw particles
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      
      // Draw connections
      ctx.strokeStyle = 'rgba(100, 149, 237, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Mouse events
    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      
      // Reset the flag after a delay
      setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Background position effect from original script
    window.addEventListener('mousemove', (e) => {
      document.body.style.backgroundPosition = `${e.clientX / 50}px ${e.clientY / 50}px`;
    });
  }
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it to the console
      console.log('Form submitted:', { name, email, message });
      
      // Show a success message (you can enhance this)
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset the form
      contactForm.reset();
    });
  }
});
