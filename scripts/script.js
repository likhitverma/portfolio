// Random color generator for particles
function getRandomColor() {
  const colors = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa", // Blues
    "#7c3aed",
    "#8b5cf6",
    "#a78bfa", // Purples
    "#10b981",
    "#34d399",
    "#6ee7b7", // Greens
    "#f59e0b",
    "#fbbf24",
    "#fcd34d", // Yellows
    "#ef4444",
    "#f87171",
    "#fca5a5", // Reds
    "#ec4899",
    "#f472b6",
    "#f9a8d4", // Pinks
    "#06b6d4",
    "#22d3ee",
    "#67e8f9", // Cyans
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create floating particles with random colors
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 400;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 15;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.background = getRandomColor();
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 15 + 15 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.opacity = Math.random() * 0.6 + 0.3;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-toggle-icon");
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-theme", currentTheme);
themeIcon.textContent = currentTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", function () {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  htmlElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Typing animation
const typingText = document.getElementById("typingText");
const textToType = "Hi, I'm Likhit Verma";
let charIndex = 0;

function typeText() {
  if (charIndex < textToType.length) {
    typingText.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 150);
  } else {
    setTimeout(() => {
      typingText.style.borderRight = "none";
    }, 500);
  }
}

setTimeout(typeText, 500);

// Counter animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  let duration = 2000;
  if(element.classList.contains("fast-change")){
     duration = 500;
  }  
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate counters
      if (entry.target.classList.contains("stat-item")) {
        const counter = entry.target.querySelector(".counter");
        if (counter && !counter.classList.contains("counted")) {
          counter.classList.add("counted");
          animateCounter(counter);
        }
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .flip-in, .scale-in, .stat-item",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) { 
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  this.reset();
});
