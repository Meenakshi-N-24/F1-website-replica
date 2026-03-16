/* ===================== DOM REFERENCES ===================== */
// Grabbing all the HTML elements we need to control with JavaScript
const lights            = document.querySelectorAll(".light");
const loadingScreen     = document.getElementById("loadingScreen");
const loadingText       = document.getElementById("loadingText");
const flag              = document.querySelector(".chequered-flag");
const navbar            = document.getElementById("navbar");
const startButton       = document.getElementById("startButton");
const f1LightsContainer = document.getElementById("f1Lights");
const preloader         = document.getElementById("preloader");
const skipIntro         = document.getElementById("skipIntro");
const scrollProgress    = document.getElementById("scrollProgress");
const chapterIndicator  = document.getElementById("chapterIndicator");

// Hide skip button on load — only shows after preloader fades
skipIntro.style.display = "none";


/* ===================== AUDIO ===================== */
// F1 lights out sound — plays when user clicks start
const f1Sound = new Audio("assets/audio/lightsout.mp3");
f1Sound.volume = 0.8;


/* ===================== PRE-LOADER → START BUTTON ===================== */
// When the page fully loads, wait 1.8s showing the F1 logo
// then fade it out and show the START button
window.addEventListener("load", () => {
  setTimeout(() => {

    // Step 1 — fade out the F1 logo preloader
    preloader.classList.add("hide");

    setTimeout(() => {
      // Step 2 — fade the start button in smoothly
      startButton.style.opacity = "0";
      startButton.style.display = "flex";

      requestAnimationFrame(() => {
        startButton.style.transition = "opacity 0.6s ease";
        startButton.style.opacity = "1";
      });

      // Step 3 — show skip intro button 1s later
      setTimeout(() => {
        skipIntro.style.display = "block";
      }, 1000);

    }, 600); // wait 0.6s after logo fades before showing start button

  }, 1800); // logo shows for 1.8s
});


/* ===================== SKIP INTRO ===================== */
// When skip is clicked — bypass the entire lights sequence
// and go straight to the website
skipIntro.addEventListener("click", function () {
  loadingScreen.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  navbar.classList.add("show");
});


/* ===================== START BUTTON ===================== */
// When START is clicked — hide the button and begin the F1 lights sequence
document.querySelector(".start-btn").addEventListener("click", function () {
  startButton.style.opacity = "0";
  skipIntro.style.display = "none";

  setTimeout(() => {
    startButton.style.display = "none";
    f1LightsContainer.style.display = "flex"; // show the 5 red lights
    startF1Sequence();
  }, 300);
});


/* ===================== F1 LIGHTS SEQUENCE ===================== */
// The iconic F1 start sequence:
// 5 lights turn on one by one → all go out → "LIGHTS OUT & AWAY WE GO" → flag GIF → website opens
function startF1Sequence() {
  let index = 0;

  // Play the lights out sound — must be inside a user interaction to work in browsers
  f1Sound.play().catch((err) => console.log("Audio error:", err));

  // Turn on each light one by one, 1 second apart
  const lightInterval = setInterval(() => {
    if (index < 5) {
      lights[index].classList.add("on");
      index++;
    } else {
      clearInterval(lightInterval); // all 5 lights are on — stop the interval

      // Wait 0.5s with all lights on, then turn them all off
      setTimeout(() => {
        lights.forEach((l) => l.classList.remove("on"));

        // 0.5s after lights go out, show the "LIGHTS OUT & AWAY WE GO" text
        setTimeout(() => {
          loadingText.classList.add("show");
          flag.classList.add("show"); // show the chequered flag strip

          // After 2s, hide the text and show the full-screen flag GIF
          setTimeout(() => {
            loadingText.classList.remove("show");
            flag.classList.remove("show");

            const flagOverlay = document.getElementById("flagOverlay");
            const flagGif     = document.getElementById("flagGif");
            flagOverlay.classList.add("show");

            // Force the GIF to restart from frame 1 by resetting its src
            const gifSrc = flagGif.src;
            flagGif.src  = "";
            flagGif.src  = gifSrc;

            // After 0.75s (GIF plays), open the website
            setTimeout(() => {
              loadingScreen.classList.add("hidden");
              document.body.classList.remove("no-scroll");
              navbar.classList.add("show");
            }, 750);

          }, 2000); // text stays visible for 2s

        }, 500); // text appears 0.5s after lights go out

      }, 500); // 0.5s pause with all lights on before going out
    }
  }, 1000); // each light turns on 1s apart
}


/* ===================== NAVBAR SCROLL BEHAVIOUR ===================== */
// Show navbar immediately, then add a dark blur effect once user scrolls
navbar.classList.add("show");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled"); // darkens + blurs the navbar bg
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* ===================== SMOOTH SCROLL ===================== */
// Makes all anchor links (href="#section") scroll smoothly instead of jumping
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
// The dots on the right side of the screen that show which section you're in
// Only appears after scrolling past the hero section
const sections     = document.querySelectorAll("[data-section]");
const progressDots = document.querySelectorAll(".progress-dot");
const chapterNames = ["HOME", "ABOUT", "NAVIGATE", "FACTS", "DIVIDER", "END"];

window.addEventListener("scroll", () => {

  // Only show the progress dots after scrolling past the full hero (100vh)
  if (window.scrollY > window.innerHeight * 0.9) {
    scrollProgress.classList.add("visible");
    chapterIndicator.classList.add("visible");
  } else {
    scrollProgress.classList.remove("visible");
    chapterIndicator.classList.remove("visible");
  }

  // Figure out which section is currently in the middle of the screen
  // and highlight the matching dot + update the chapter label
  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      // Remove active from all dots, then add to the current one
      progressDots.forEach((dot) => dot.classList.remove("active"));
      if (progressDots[i]) progressDots[i].classList.add("active");

      // Update the chapter number and name label
      const chapterNum  = document.querySelector(".chapter-number");
      const chapterName = document.querySelector(".chapter-name");
      if (chapterNum && chapterName) {
        chapterNum.textContent  = "0" + (i + 1);
        chapterName.textContent = chapterNames[i];
      }
    }
  });
});


/* ===================== COUNT UP HELPER ===================== */
// Animates a number from 0 up to its target value over a set duration
// Used for the stats in the What Is F1 section
function countUp(el, target, duration) {
  const stepTime  = 16; // runs every 16ms (~60fps)
  const steps     = duration / stepTime;
  const increment = target / steps;
  let current     = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer); // stop once we hit the target
    }
    // toLocaleString adds commas to big numbers e.g. 1,500,000,000
    el.textContent = Math.floor(current).toLocaleString();
  }, stepTime);
}


/* ===================== GSAP SCROLL ANIMATIONS ===================== */
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger); // must be registered once before using ScrollTrigger


  /* --- HERO PARALLAX --- */
  // The hero background image moves at a slower rate than scroll — creates depth
  gsap.to(".hero-img", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true, // ties animation directly to scroll position
    },
  });

  /* --- HERO TEXT FADE --- */
  // Hero text floats up and fades out as you scroll away from it
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

  /* --- SCROLL INDICATOR FADE --- */
  // The "SCROLL" chevron fades out quickly once you start scrolling
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

  /* --- SEASON CARDS STAGGER IN --- */
  // The three season cards (next race, driver standings, constructor standings)
  // fade and slide up one by one when they enter the viewport
  gsap.fromTo(
    ".season-card",
    { opacity: 0, y: 60 }, // start: invisible, 60px below
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15, // each card animates 0.15s after the previous one
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".season-grid",
        start: "top 80%", // triggers when the grid is 80% down the screen
      },
    }
  );


  /* ===================== CINEMATIC WORD TRANSITION ===================== */
  // Grabs the three words: FASTEST / MOST DANGEROUS / MOST WATCHED
  const words = document.querySelectorAll(".cin-word");

  // Creates a scroll-driven timeline pinned to the f1-transition section
  // The section stays fixed on screen while you scroll 2000px worth
  const cinTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".f1-transition",
      start: "top top",   // pin starts when section hits top of screen
      end: "+=1200",      // section stays pinned for 2000px of scroll
      pin: true,          // freezes the section in place
      scrub: 1,           // smooth 1s lag between scroll and animation
    },
  });

  // Word 1 — slams in from the left
  cinTl.fromTo(words[0],
    { opacity: 0, x: -80, scale: 0.9 },
    { opacity: 1, x: 0,   scale: 1,   duration: 0.4, ease: "power3.out" }
  );

  // Word 2 — slams in 0.2s after word 1
  cinTl.fromTo(words[1],
    { opacity: 0, x: -80, scale: 0.9 },
    { opacity: 1, x: 0,   scale: 1,   duration: 0.4, ease: "power3.out" },
    "+=0.2"
  );

  // Word 3 — slams in 0.2s after word 2
  cinTl.fromTo(words[2],
    { opacity: 0, x: -80, scale: 0.9 },
    { opacity: 1, x: 0,   scale: 1,   duration: 0.4, ease: "power3.out" },
    "+=0.2"
  );

  // Hold — all three words stay visible for a moment
  cinTl.to({}, { duration: 0.8 });

  // All words fade out upward together (staggered slightly)
  cinTl.to(words, {
    opacity: 0,
    y: -30,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.in",
  });

/* ===================== NAVIGATION CARDS SCROLL ANIMATION ===================== */
if (typeof gsap !== "undefined") {

  // Left card slides in from left
  gsap.fromTo(
    ".nav-card-grid",
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".nav-cards",
        start: "top 80%",
      },
    }
  );

  // Right card slides in from right
  gsap.fromTo(
    ".nav-card-legacy",
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".nav-cards",
        start: "top 80%",
      },
    }
  );

}

} // end if (gsap)


/* ===================== TEAM COLORS ===================== */
// Maps each constructor ID (from the API) to their official team color
const teamColors = {
  red_bull:     "#3671C6",
  ferrari:      "#E8002D",
  mercedes:     "#27F4D2",
  mclaren:      "#FF8000",
  aston_martin: "#229971",
  alpine:       "#FF87BC",
  williams:     "#1868DB",
  rb:           "#6692FF",
  audi:         "#EB4526",
  haas:         "#DFE1E2",
  cadillac:     "#000000",
};


/* ===================== COUNTRY FLAGS ===================== */
// Maps country names (from the API) to their 2-letter ISO flag codes
// Used with flagcdn.com to show flag images in the Next Race card
const countryFlags = {
  Australia:                  "au",
  Bahrain:                    "bh",
  China:                      "cn",
  Japan:                      "jp",
  "Saudi Arabia":             "sa",
  Italy:                      "it",
  Monaco:                     "mc",
  Canada:                     "ca",
  Spain:                      "es",
  Austria:                    "at",
  Hungary:                    "hu",
  Belgium:                    "be",
  Netherlands:                "nl",
  Singapore:                  "sg",
  Azerbaijan:                 "az",
  Mexico:                     "mx",
  Brazil:                     "br",
  Qatar:                      "qa",
  "United States":            "us",
  "United States of America": "us",
  "United Kingdom":           "gb",
  "Great Britain":            "gb",
  "United Arab Emirates":     "ae",
};


/* ===================== NEXT RACE + COUNTDOWN ===================== */
// Fetches the next upcoming race from the Jolpica F1 API
// Displays race name, location, date, and starts a live countdown timer
async function fetchNextRace() {
  try {
    const res  = await fetch("https://api.jolpi.ca/ergast/f1/2026/next/");
    const data = await res.json();
    const race = data.MRData.RaceTable.Races[0];

    if (!race) return; // no upcoming race found

    const raceDateTime = new Date(`${race.date}T${race.time || "00:00:00"}`);
    const country      = race.Circuit.Location.country;
    const code         = countryFlags[country] || "un"; // fallback to "un" if country not in our map

    // Inject flag image + country name
    document.getElementById("raceCountry").innerHTML =
      `<img src="https://flagcdn.com/24x18/${code}.png" style="margin-right:6px;vertical-align:middle;"> ${country}`;

    document.getElementById("raceRound").textContent    = `Round ${race.round}`;
    document.getElementById("raceName").textContent     = race.raceName;
    document.getElementById("raceLocation").textContent = `${race.Circuit.circuitName} · ${race.Circuit.Location.locality}`;
    document.getElementById("raceDate").textContent     = raceDateTime.toLocaleDateString("en-US", {
      weekday: "long",
      month:   "long",
      day:     "numeric",
    });

    // Live countdown — updates every second
    function updateCountdown() {
      const now  = new Date();
      const diff = raceDateTime - now;
      if (diff <= 0) return; // race has already started

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      // padStart(2, "0") ensures single digits show as "05" not "5"
      document.getElementById("days").textContent    = String(d).padStart(2, "0");
      document.getElementById("hours").textContent   = String(h).padStart(2, "0");
      document.getElementById("minutes").textContent = String(m).padStart(2, "0");
      document.getElementById("seconds").textContent = String(s).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000); // run every 1 second

  } catch (err) {
    console.log("Next race error:", err);
    document.getElementById("raceName").textContent = "Data unavailable";
  }
}


/* ===================== DRIVER STANDINGS ===================== */
// Fetches current driver championship standings from the API
// Shows top 5 drivers with their team color bar and points
async function fetchDriverStandings() {
  try {
    const res           = await fetch("https://api.jolpi.ca/ergast/f1/2026/driverstandings/");
    const data          = await res.json();
    const standingsList = data.MRData.StandingsTable.StandingsLists[0];
    const round         = standingsList.round;
    const standings     = standingsList.DriverStandings;

    // Update the label to show which round the standings are from
    document.getElementById("driverStandingsLabel").textContent =
      `Driver Standings — After Round ${round}`;

    const container = document.getElementById("driverStandings");
    container.innerHTML = ""; // clear loading skeletons

    // Build a row for each of the top 5 drivers
    standings.slice(0, 5).forEach((s) => {
      const teamId = s.Constructors[0].constructorId;
      const color  = teamColors[teamId] || "#fff";
      const item   = document.createElement("div");
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
// Fetches current constructor (team) championship standings from the API
// Shows top 5 teams with their color bar and points
async function fetchConstructorStandings() {
  try {
    const res           = await fetch("https://api.jolpi.ca/ergast/f1/2026/constructorstandings/");
    const data          = await res.json();
    const standingsList = data.MRData.StandingsTable.StandingsLists[0];
    const round         = standingsList.round;
    const standings     = standingsList.ConstructorStandings;

    document.getElementById("constructorStandingsLabel").textContent =
      `Constructor Standings — After Round ${round}`;

    const container = document.getElementById("constructorStandings");
    container.innerHTML = ""; // clear loading skeletons

    // Build a row for each of the top 5 constructors
    standings.slice(0, 5).forEach((s) => {
      const color = teamColors[s.Constructor.constructorId] || "#fff";
      const item  = document.createElement("div");
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
// Fire all three API calls as soon as the page loads
fetchNextRace();
fetchDriverStandings();
fetchConstructorStandings();