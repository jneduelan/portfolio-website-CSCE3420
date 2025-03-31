document.addEventListener('DOMContentLoaded', function() {
  // Fade in the page
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);
  // Add this code to your existing script.js file, after the DOMContentLoaded event listener

// Enhanced background with larger particles
function createLargeParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  // Remove any existing large particles
  document.querySelectorAll('.large-particle').forEach(el => el.remove());
  
  const particleCount = window.innerWidth < 768 ? 5 : 8;
  const colors = ['rgba(37, 99, 235, 0.1)', 'rgba(124, 58, 237, 0.08)', 'rgba(255, 255, 255, 0.12)'];
  
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 200 + 100; // 100-300px
    const particle = document.createElement('div');
    particle.classList.add('large-particle');
    
    // Random position
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random color
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random opacity
    particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
    
    // Random animation
    const duration = Math.random() * 60 + 30; // 30-90s
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * -30}s`;
    
    // Add to hero
    hero.appendChild(particle);
  }
}

// Update canvas particles to be larger
function updateCanvasParticles() {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Create particles with larger sizes
  function createEnhancedParticles() {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const isDark = document.body.classList.contains('dark');
      const baseColor = isDark ? '60, 165, 250' : '37, 99, 235';
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2, // Larger particles: 2-10px
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(${baseColor}, ${Math.random() * 0.5 + 0.1})`
      });
    }
  }
  
  // Override the existing createParticles function if it exists
  if (typeof createParticles === 'function') {
    createParticles = createEnhancedParticles;
    // Call it to refresh particles
    createParticles();
  }
}

// Call these functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
  createLargeParticles();
  updateCanvasParticles();
  
  // Recreate particles on window resize
  window.addEventListener('resize', function() {
    createLargeParticles();
  });
  
  // Split the name into individual letters for animation
  const nameElement = document.querySelector('.hero-name');
  if (nameElement) {
    const name = nameElement.textContent;
    nameElement.innerHTML = name.split('').map(letter => 
      `<span style="display:inline-block; animation: fadeInScale 1.5s ease-out ${Math.random() * 0.5}s forwards;">${letter}</span>`
    ).join('');
  }
});
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
    updateThemeToggleIcon(true);
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleIcon(isDark);
    });
  }
  
  function updateThemeToggleIcon(isDark) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = isDark 
        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
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
  
  // Project filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            const tags = card.getAttribute('data-tags');
            if (tags && tags.includes(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
  }
  
  // Animate elements when they come into view
  const animateElements = document.querySelectorAll('.animate-in');
  
  function checkScroll() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 50) {
        element.style.opacity = 1;
      }
    });
    
    // Animate skill bars when in view
    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight - 100) {
        animateSkillBars();
      }
    }
  }
  
  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    window.addEventListener('scroll', toggleScrollButton);
  }
  
  // Check for elements in view on page load and scroll
  window.addEventListener('load', checkScroll);
  window.addEventListener('scroll', checkScroll);
  
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
        const isDark = document.body.classList.contains('dark');
        const baseColor = isDark ? '60, 165, 250' : '37, 99, 235';
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${baseColor}, ${Math.random() * 0.5 + 0.1})`
        });
      }
    }
    
    createParticles();
    
    // Update particles color on theme change
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', createParticles);
    }
    
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
      const isDark = document.body.classList.contains('dark');
      const connectionColor = isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)';
      ctx.strokeStyle = connectionColor;
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
