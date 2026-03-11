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

document.querySelectorAll(".f1-intro").forEach((section) => {
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
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ========================================
   GSAP SCROLL ANIMATIONS
======================================== */
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax hero image
  gsap.to(".hero-img", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Hero content fades + floats up as you scroll away
  gsap.to(".hero-content", {
    yPercent: -20,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "60% top",
      scrub: true,
    },
  });
}

// Hero scroll indicator fades out quickly
gsap.to(".hero-scroll", {
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "20% top",
    scrub: true,
  },
});

// What is F1 — title reveals
gsap.fromTo(
  ".f1-intro-title",
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".f1-intro-title",
      start: "top 85%",
    },
  },
);

// Text paragraphs stagger in
gsap.fromTo(
  ".f1-intro-text",
  { opacity: 0, y: 40 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".f1-intro-text",
      start: "top 85%",
    },
  },
);

// Stats cascade in one by one
gsap.fromTo(
  ".f1-stat",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".f1-intro-right",
      start: "top 80%",
    },
  },
);

// Season section fades in
gsap.fromTo(
  ".season-card",
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".season-grid",
      start: "top 80%",
    },
  },
);

/* ========================================
   SEASON SECTION — Live F1 Data
======================================== */

/* TEAM COLORS */
const teamColors = {
  red_bull: "#3671C6",
  ferrari: "#E8002D",
  mercedes: "#27F4D2",
  mclaren: "#FF8000",
  aston_martin: "#229971",
  alpine: "#FF87BC",
  williams: "#1868DB",
  rb: "#6692FF",
  audi: "#EB4526",
  haas: "#DFE1E2",
  cadillac: "#000000",
};

/* COUNTRY FLAGS (SVG) */
const countryFlags = {
  Australia: "au",
  Bahrain: "bh",
  China: "cn",
  Japan: "jp",
  "Saudi Arabia": "sa",
  Italy: "it",
  Monaco: "mc",
  Canada: "ca",
  Spain: "es",
  Austria: "at",
  Hungary: "hu",
  Belgium: "be",
  Netherlands: "nl",
  Singapore: "sg",
  Azerbaijan: "az",
  Mexico: "mx",
  Brazil: "br",
  Qatar: "qa",
  "United States": "us",
  "United States of America": "us",
  "United Kingdom": "gb",
  "Great Britain": "gb",
  "United Arab Emirates": "ae",
};

/* =====================================
NEXT RACE + COUNTDOWN 
======================================== */
async function fetchNextRace() {
  try {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2026/next/");
    const data = await res.json();
    const race = data.MRData.RaceTable.Races[0];

    if (!race) return;

    const raceDateTime = new Date(`${race.date}T${race.time || "00:00:00"}`);

    const country = race.Circuit.Location.country;
    const code = countryFlags[country] || "un";

    document.getElementById("raceCountry").innerHTML =
      `<img src="https://flagcdn.com/24x18/${code}.png" 
style="margin-right:6px;vertical-align:middle;"> ${country}`;

    document.getElementById("raceRound").textContent = `Round ${race.round}`;

    document.getElementById("raceName").textContent = race.raceName;

    document.getElementById("raceLocation").textContent =
      `${race.Circuit.circuitName} · ${race.Circuit.Location.locality}`;

    document.getElementById("raceDate").textContent =
      raceDateTime.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

    function updateCountdown() {
      const now = new Date();
      const diff = raceDateTime - now;

      if (diff <= 0) return;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = String(d).padStart(2, "0");
      document.getElementById("hours").textContent = String(h).padStart(2, "0");
      document.getElementById("minutes").textContent = String(m).padStart(
        2,
        "0",
      );
      document.getElementById("seconds").textContent = String(s).padStart(
        2,
        "0",
      );
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  } catch (err) {
    console.log("Next race error:", err);
    document.getElementById("raceName").textContent = "Data unavailable";
  }
}

/* =====================================
DRIVERS STANDINGS.
======================================== */
async function fetchDriverStandings() {
  try {
    const res = await fetch(
      "https://api.jolpi.ca/ergast/f1/2026/driverstandings/",
    );
    const data = await res.json();
    const standingsList = data.MRData.StandingsTable.StandingsLists[0];
    const round = standingsList.round;
    const standings = standingsList.DriverStandings;

    document.getElementById("driverStandingsLabel").textContent =
      `Driver Standings — After Round ${round}`;

    const container = document.getElementById("driverStandings");
    container.innerHTML = "";

    standings.slice(0, 5).forEach((s) => {
      const teamId = s.Constructors[0].constructorId;
      const color = teamColors[teamId] || "#fff";
      const item = document.createElement("div");
      item.className = "standing-item";
      item.innerHTML = `
        <span class="standing-pos">${s.position}</span>
        <div class="standing-color" style="background: ${color}"></div>
        <div style="flex:1">
          <div class="standing-name">${s.Driver.familyName}</div>
          <div class="standing-team">${s.Constructors[0].name}</div>
        </div>
        <span class="standing-pts">${s.points}</span>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    console.log("Driver standings error:", err);
    document.getElementById("driverStandings").innerHTML =
      '<p style="color:rgba(255,255,255,0.3); font-size:12px;">Data unavailable</p>';
  }
}

/* =====================================
CONSTRUCTORS STANDINGS. 
======================================== */
async function fetchConstructorStandings() {
  try {
    const res = await fetch(
      "https://api.jolpi.ca/ergast/f1/2026/constructorstandings/",
    );
    const data = await res.json();
    const standingsList = data.MRData.StandingsTable.StandingsLists[0];
    const round = standingsList.round;
    const standings = standingsList.ConstructorStandings;

    document.getElementById("constructorStandingsLabel").textContent =
      `Constructor Standings — After Round ${round}`;

    const container = document.getElementById("constructorStandings");
    container.innerHTML = "";

    standings.slice(0, 5).forEach((s) => {
      const color = teamColors[s.Constructor.constructorId] || "#fff";
      const item = document.createElement("div");
      item.className = "standing-item";
      item.innerHTML = `
        <span class="standing-pos">${s.position}</span>
        <div class="standing-color" style="background: ${color}"></div>
        <div style="flex:1">
          <div class="standing-name">${s.Constructor.name}</div>
        </div>
        <span class="standing-pts">${s.points}</span>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    console.log("Constructor standings error:", err);
    document.getElementById("constructorStandings").innerHTML =
      '<p style="color:rgba(255,255,255,0.3); font-size:12px;">Data unavailable</p>';
  }
}

/* ========================================
   RUN EVERYTHING
======================================== */

fetchDriverStandings();
fetchConstructorStandings();
fetchNextRace();
