/* ========================================
   LOADING SEQUENCE
======================================== */
const lights = document.querySelectorAll('.light');
const loadingScreen = document.getElementById('loadingScreen');
const loadingText = document.getElementById('loadingText');
const flag = document.querySelector('.chequered-flag');
const navbar = document.getElementById('navbar');

let index = 0;

// Turn on lights one by one
const lightInterval = setInterval(() => {
  if (index < lights.length) {
    lights[index].classList.add('on');
    index++;
  } else {
    clearInterval(lightInterval);

    // Lights out sequence
    setTimeout(() => {
      lights.forEach(l => l.classList.remove('on'));
      
      // Show text and flag
      setTimeout(() => {
        loadingText.classList.add('show');
        flag.classList.add('show');

        // Hide loader and show site
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.classList.remove('no-scroll');
          navbar.classList.add('show');
        }, 1200);
      }, 300);
    }, 700);
  }
}, 650);

/* ========================================
   SCROLL ANIMATIONS
======================================== */
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".section-title, .section-description, .stat-card")
        .forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, i * 100);
        });
    }
  });
}, observerOptions);

document.querySelectorAll(".what-is-f1").forEach((section) => {
  observer.observe(section);
});

/* ========================================
   SCROLL PROGRESS & CHAPTERS
======================================== */
const sections = document.querySelectorAll("[data-section]");
const progressDots = document.querySelectorAll(".progress-dot");
const scrollProgress = document.getElementById("scrollProgress");
const chapterIndicator = document.getElementById("chapterIndicator");

const chapterNames = ["HOME", "ABOUT", "NAVIGATE", "FACTS", "DIVIDER", "END"];

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollProgress.classList.add("visible");
    chapterIndicator.classList.add("visible");
  } else {
    scrollProgress.classList.remove("visible");
    chapterIndicator.classList.remove("visible");
  }

  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      progressDots.forEach((dot) => dot.classList.remove("active"));
      if (progressDots[i]) {
        progressDots[i].classList.add("active");
      }

      const chapterNum = document.querySelector(".chapter-number");
      const chapterName = document.querySelector(".chapter-name");
      
      if (chapterNum && chapterName) {
        chapterNum.textContent = "0" + (i + 1);
        chapterName.textContent = chapterNames[i];
      }
    }
  });
});

/* ========================================
   SMOOTH SCROLL
======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
