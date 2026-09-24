// Portfolio JavaScript
// Dark mode, menu, typing effect, projects and copy email

// Dark mode
const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  themeBtn.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", open);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Navbar active link
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

function highlightNav() {
  let currentId = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentId,
    );
  });
}

// Back to top button
const toTop = document.getElementById("toTop");

function toggleToTop() {
  toTop.classList.toggle("show", window.scrollY > 400);
}

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  highlightNav();
  toggleToTop();
});

highlightNav();
toggleToTop();

// Typing effect
const typedEl = document.getElementById("typed");

const roles = [
  "Frontend Developer",
  "Web Developer",
  "React.js Developer",
  "JavaScript Developer",
  "Full Stack Learner",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = currentRole.slice(0, charIndex);

  let delay = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

setTimeout(type, 1200);

// Project gallery (click small image, or it changes on its own)
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

document.querySelectorAll(".gallery").forEach((gallery) => {
  const mainImg = gallery.querySelector(".gallery-main");
  const thumbs = gallery.querySelectorAll(".thumbs img");
  let current = 0;
  let paused = false;

  function showImage(index) {
    current = index;
    mainImg.src = thumbs[index].src;
    mainImg.alt = thumbs[index].alt;

    thumbs.forEach((t) => {
      t.classList.remove("active");
    });

    thumbs[index].classList.add("active");
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      showImage(index);
    });
  });

  // stop auto change while mouse is on the gallery
  gallery.addEventListener("mouseenter", () => (paused = true));
  gallery.addEventListener("mouseleave", () => (paused = false));

  if (!reduceMotion && thumbs.length > 1) {
    setInterval(() => {
      if (!paused) {
        showImage((current + 1) % thumbs.length);
      }
    }, 3500);
  }
});

// Scroll animation
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => {
  observer.observe(item);
});

// Copy email button
const copyBtn = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("ydavvinay@gmail.com");
    copyStatus.textContent = "Email copied.";
  } catch (error) {
    copyStatus.textContent = "Copy didn't work. Email: ydavvinay@gmail.com";
  }

  setTimeout(() => {
    copyStatus.textContent = "";
  }, 2500);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
