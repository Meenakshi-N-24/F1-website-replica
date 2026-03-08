/* ========================================
   LOADING SEQUENCE WITH PRE-LOADER
======================================== */
const lights = document.querySelectorAll(".light");
const loadingScreen = document.getElementById("loadingScreen");
const loadingText = document.getElementById("loadingText");
const flag = document.querySelector(".chequered-flag");
const navbar = document.getElementById("navbar");
const startButton = document.getElementById("startButton");
const f1LightsContainer = document.getElementById("f1Lights");
const preloader = document.getElementById("preloader");
const skipIntro = document.getElementById("skipIntro");

// Hide skip button initially — only show with start button
skipIntro.style.display = "none";

/* ---- PRE-LOADER → START BUTTON ---- */
window.addEventListener("load", () => {
  setTimeout(() => {
    // Fade out preloader
    preloader.classList.add("hide");

    // Show start button AND skip intro after preloader fades
    setTimeout(() => {
      startButton.style.opacity = "0";
      startButton.style.display = "flex";

      // Show skip intro 1 second after start button appears
      setTimeout(() => {
        skipIntro.style.display = "block";
      }, 1000);

      // Fade start button in smoothly
      requestAnimationFrame(() => {
        startButton.style.transition = "opacity 0.6s ease";
        startButton.style.opacity = "1";
      });
    }, 600);
  }, 1800); // 1.8 seconds of logo display
});

// Audio setup
const f1Sound = new Audio("../assets/audio/lightsout.mp3");
f1Sound.volume = 0.8; // Adjust volume (0.0 to 1.0)

/* ---- SKIP INTRO ---- */
skipIntro.addEventListener("click", function () {
  // Jump straight to website
  loadingScreen.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  navbar.classList.add("show");
});

/* ---- START BUTTON ---- 
// Start button click handler */
document.querySelector(".start-btn").addEventListener("click", function () {
  // Hide start button
  startButton.style.opacity = "0";
  skipIntro.style.display = "none"; // Hide skip when lights start
  setTimeout(() => {
    startButton.style.display = "none";
    f1LightsContainer.style.display = "flex";
    // Start the sequence
    startF1Sequence();
  }, 300);
});

/* ---- LIGHTS SEQUENCE ---- */
function startF1Sequence() {
  let index = 0;

  // Play F1 sound (guaranteed to work after user click)
  f1Sound.play().catch((err) => console.log("Audio error:", err));

  // ✅ setInterval is now INSIDE the function — this was the bug!
  const lightInterval = setInterval(() => {
    if (index < 5) {
      lights[index].classList.add("on");
      index++;
    } else {
      clearInterval(lightInterval);

      // All lights on — pause then lights out
      setTimeout(() => {
        lights.forEach((l) => l.classList.remove("on"));

        // Show "LIGHTS OUT & AWAY WE GO"
        setTimeout(() => {
          loadingText.classList.add("show");
          flag.classList.add("show");

          // After 2s, hide text and show flag GIF
          setTimeout(() => {
            loadingText.classList.remove("show");
            flag.classList.remove("show");

            const flagOverlay = document.getElementById("flagOverlay");
            const flagGif = document.getElementById("flagGif");
            flagOverlay.classList.add("show");

            // Force GIF restart
            const gifSrc = flagGif.src;
            flagGif.src = "";
            flagGif.src = gifSrc;

            // Open website after GIF plays
            setTimeout(() => {
              loadingScreen.classList.add("hidden");
              document.body.classList.remove("no-scroll");
              navbar.classList.add("show");
            }, 750); // ⬅️ Adjust if GIF is longer/shorter
          }, 2000); // Text shows for 2s
        }, 500); // Text appears 0.5s after lights out
      }, 500); // 0.5s pause with all lights on
    }
  }, 1000); // ✅ Closing bracket is now inside startF1Sequence
} // ✅ Function closes here properly

// DON'T PUT ANY AUTO-START CODE HERE!
// The sequence only starts when user clicks the button

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
      entry.target
        .querySelectorAll(".section-title, .section-description, .stat-card")
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

    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
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

/* ========================================
   NAVBAR
======================================== */
navbar.classList.add("show");
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});