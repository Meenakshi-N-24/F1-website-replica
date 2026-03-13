/* ===================== DOM REFERENCES ===================== */
const lights = document.querySelectorAll(".light");
const loadingScreen = document.getElementById("loadingScreen");
const loadingText = document.getElementById("loadingText");
const flag = document.querySelector(".chequered-flag");
const navbar = document.getElementById("navbar");
const startButton = document.getElementById("startButton");
const f1LightsContainer = document.getElementById("f1Lights");
const preloader = document.getElementById("preloader");
const skipIntro = document.getElementById("skipIntro");
const scrollProgress = document.getElementById("scrollProgress");
const chapterIndicator = document.getElementById("chapterIndicator");

// Hide skip button — only shows alongside start button
skipIntro.style.display = "none";

/* ===================== AUDIO ===================== */
const f1Sound = new Audio("assets/audio/lightsout.mp3");
f1Sound.volume = 0.8;

/* ===================== PRE-LOADER → START BUTTON ===================== */
window.addEventListener("load", () => {
  setTimeout(() => {
    // Fade out the preloader logo
    preloader.classList.add("hide");

    setTimeout(() => {
      // Fade start button in
      startButton.style.opacity = "0";
      startButton.style.display = "flex";

      requestAnimationFrame(() => {
        startButton.style.transition = "opacity 0.6s ease";
        startButton.style.opacity = "1";
      });

      // Show skip intro 1s after start button appears
      setTimeout(() => {
        skipIntro.style.display = "block";
      }, 1000);
    }, 600);
  }, 1800); // Logo displays for 1.8s
});

/* ===================== SKIP INTRO ===================== */
skipIntro.addEventListener("click", function () {
  loadingScreen.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  navbar.classList.add("show");
});

/* ===================== START BUTTON ===================== */
document.querySelector(".start-btn").addEventListener("click", function () {
  startButton.style.opacity = "0";
  skipIntro.style.display = "none";

  setTimeout(() => {
    startButton.style.display = "none";
    f1LightsContainer.style.display = "flex";
    startF1Sequence();
  }, 300);
});

/* ===================== F1 LIGHTS SEQUENCE ===================== */
function startF1Sequence() {
  let index = 0;

  // Play sound after user interaction (required by browsers)
  f1Sound.play().catch((err) => console.log("Audio error:", err));

  const lightInterval = setInterval(() => {
    if (index < 5) {
      lights[index].classList.add("on");
      index++;
    } else {
      clearInterval(lightInterval);

      // All 5 lights on — brief pause then lights out
      setTimeout(() => {
        lights.forEach((l) => l.classList.remove("on"));

        // Show "LIGHTS OUT & AWAY WE GO"
        setTimeout(() => {
          loadingText.classList.add("show");
          flag.classList.add("show");

          // After 2s, swap to chequered flag GIF
          setTimeout(() => {
            loadingText.classList.remove("show");
            flag.classList.remove("show");

            const flagOverlay = document.getElementById("flagOverlay");
            const flagGif = document.getElementById("flagGif");
            flagOverlay.classList.add("show");

            // Force GIF to restart from frame 1
            const gifSrc = flagGif.src;
            flagGif.src = "";
            flagGif.src = gifSrc;

            // Enter website after GIF plays
            setTimeout(() => {
              loadingScreen.classList.add("hidden");
              document.body.classList.remove("no-scroll");
              navbar.classList.add("show");
            }, 750);
          }, 2000); // Text visible for 2s
        }, 500); // Text appears 0.5s after lights go out
      }, 500); // 0.5s pause with all lights on
    }
  }, 1000); // Each light turns on 1s apart
}

/* ===================== NAVBAR SCROLL BEHAVIOUR ===================== */
navbar.classList.add("show");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ===================== SMOOTH SCROLL ===================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ===================== SCROLL PROGRESS & CHAPTER INDICATOR ===================== */
const sections = document.querySelectorAll("[data-section]");
const progressDots = document.querySelectorAll(".progress-dot");
const chapterNames = ["HOME", "ABOUT", "NAVIGATE", "FACTS", "DIVIDER", "END"];

window.addEventListener("scroll", () => {
  // Show/hide the sidebar indicators
  if (window.scrollY > 200) {
    scrollProgress.classList.add("visible");
    chapterIndicator.classList.add("visible");
  } else {
    scrollProgress.classList.remove("visible");
    chapterIndicator.classList.remove("visible");
  }

  // Update active dot and chapter label based on current section
  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      progressDots.forEach((dot) => dot.classList.remove("active"));
      if (progressDots[i]) progressDots[i].classList.add("active");

      const chapterNum = document.querySelector(".chapter-number");
      const chapterName = document.querySelector(".chapter-name");
      if (chapterNum && chapterName) {
        chapterNum.textContent = "0" + (i + 1);
        chapterName.textContent = chapterNames[i];
      }
    }
  });
});

/* ===================== COUNT UP HELPER ===================== */
// Used to animate stat numbers from 0 to their target value
function countUp(el, target, duration) {
  const start = 0;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    // Format large numbers with commas (e.g. 1,500,000,000)
    el.textContent = Math.floor(current).toLocaleString();
  }, stepTime);
}

/* ===================== GSAP SCROLL ANIMATIONS ===================== */
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

  // Hero text fades as you scroll away
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

  // Scroll indicator fades out early
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

  // Season cards stagger in
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


  const words = gsap.utils.toArray(".transition-word");

gsap.timeline({
  scrollTrigger:{
    trigger:".f1-transition",
    start:"top top",
    end:"+=2000",
    scrub:1,
    pin:true
  }
})

.fromTo(words[0],{opacity:0,y:60},{opacity:1,y:0})
.to(words[0],{opacity:0,y:-60},"+=0.5")

.fromTo(words[1],{opacity:0,y:60},{opacity:1,y:0})
.to(words[1],{opacity:0,y:-60},"+=0.5")

.fromTo(words[2],{opacity:0,y:60},{opacity:1,y:0})
.to(words[2],{opacity:0,y:-60},"+=0.5");
}

// ScrollTrigger pins section and drives timeline
ScrollTrigger.create({
  trigger: ".f1-cinematic",
  start: "top top",
  end: "+=4000",
  pin: true,
  pinSpacing: true,
  scrub: 1,
  animation: cinTl,
});

// Fires count-up when content card is visible
let statsTriggered = false;

ScrollTrigger.create({
  trigger: ".f1-cinematic",
  start: "top+=3400 top",
  onEnter: () => {
    if (statsTriggered) return;
    statsTriggered = true;
    stats.forEach((stat) => {
      const target = parseInt(stat.dataset.target);
      const numEl  = stat.querySelector(".cin-stat-num");
      countUp(numEl, target, 2500);
    });
  },
  onLeaveBack: () => {
    statsTriggered = false;
    stats.forEach((stat) => {
      stat.querySelector(".cin-stat-num").textContent = "0";
    });
  },
  
});
 // end if (gsap)

/* ===================== TEAM COLORS ===================== */
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

/* ===================== COUNTRY FLAGS ===================== */
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

/* ===================== NEXT RACE + COUNTDOWN ===================== */
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
      `<img src="https://flagcdn.com/24x18/${code}.png" style="margin-right:6px;vertical-align:middle;"> ${country}`;

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

    // Live countdown ticker
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

/* ===================== DRIVER STANDINGS ===================== */
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

/* ===================== CONSTRUCTOR STANDINGS ===================== */
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

/* ===================== INIT — RUN ON LOAD ===================== */
fetchNextRace();
fetchDriverStandings();
fetchConstructorStandings();
