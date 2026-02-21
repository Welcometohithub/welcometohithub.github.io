/* ============ PARTICLES.JS CONFIGURATION ============ */
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#38bdf8"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.35,
      random: false,
      anim: {
        enable: true,
        speed: 0.25,
        opacity_min: 0.12,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 220,
      color: "#38bdf8",
      opacity: 0.15,
      width: 0.8,
      condensed: false
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "grab"
      },
      onclick: {
        enable: false,
        mode: "push"
      },
      resize: true
    }
  },
  retina_detect: true
});

/* ============ NEURAL NETWORK CANVAS ANIMATION ============ */
(function() {
  const canvas = document.getElementById('neural-net-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Neural network nodes
  const nodes = [];
  const numNodes = 12;
  let time = 0;

  // Initialize nodes with random positions
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 1
    });
  }

  function drawNeuralNet() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
    ctx.lineWidth = 1;

    time += 0.0005;

    // Update and draw nodes
    nodes.forEach((node, i) => {
      // Update position with subtle wave motion
      node.x += node.vx + Math.sin(time * 0.5 + i) * 0.1;
      node.y += node.vy + Math.cos(time * 0.5 + i) * 0.1;

      // Wrap around screen edges
      if (node.x < 0) node.x = canvas.width;
      if (node.x > canvas.width) node.x = 0;
      if (node.y < 0) node.y = canvas.height;
      if (node.y > canvas.height) node.y = 0;

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 300) {
          const opacity = (1 - distance / 300) * 0.25;
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawNeuralNet);
  }

  // Start animation
  drawNeuralNet();

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

/* ============ SMOOTH FADE-IN ON LOAD ============ */
document.addEventListener('DOMContentLoaded', () => {
  // Stagger button animations if needed
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach((btn, index) => {
    btn.style.animation = `fadeInUp 0.9s ease-out ${0.5 + index * 0.08}s forwards`;
    btn.style.opacity = '0';
  });

  // Parallax effect on mouse movement
  const heroContent = document.querySelector('.hero-content');
  const particlesCanvas = document.getElementById('neural-net-canvas');
  
  if (heroContent && particlesCanvas) {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
      
      heroContent.style.transform = `translate(${moveX}px, ${moveY * 0.5}px)`;
      particlesCanvas.style.opacity = (0.18 + (e.clientY / window.innerHeight) * 0.05).toString();
    });
  }

  // Smooth scroll parallax for background layers
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particlesJS = document.getElementById('particles-js');
    const binaryTexture = document.querySelector('.binary-texture');
    
    if (particlesJS) {
      particlesJS.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (binaryTexture) {
      binaryTexture.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Interactive name glow enhancement
  const nameElement = document.querySelector('.name');
  if (nameElement) {
    nameElement.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      this.style.textShadow = '0 0 40px rgba(56, 189, 248, 0.3)';
    });
    
    nameElement.addEventListener('mouseleave', function() {
      this.style.textShadow = '';
    });
  }
});

