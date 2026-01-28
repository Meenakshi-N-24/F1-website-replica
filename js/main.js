// LOADING SEQUENCE (F1 STYLE)
const lights = document.querySelectorAll('.f1-lights .light');
const loadingText = document.getElementById('loadingText');
const loadingScreen = document.getElementById('loadingScreen');

let index = 0;

const lightInterval = setInterval(() => {
    if (index < lights.length) {
        lights[index].classList.add('on');
        index++;
    } else {
        clearInterval(lightInterval);

        // Lights out
        setTimeout(() => {
            lights.forEach(light => light.classList.remove('on'));

            // Hide loader
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1200);

        }, 800);
    }
}, 650); // slower = more drama

// SCROLL ANIMATIONS
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

// SCROLL PROGRESS & CHAPTERS
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
      const chapterName = chapterIndicator.querySelector("div:last-child");
      chapterNum.textContent = "0" + (i + 1);
      chapterName.textContent = chapterNames[i];
    }
  });
});
