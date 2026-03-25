/* ===================== PAGE TRANSITION ===================== */
const pageTransition = document.getElementById("pageTransition");

window.addEventListener("load", () => {
  if (pageTransition) {
    pageTransition.classList.remove("active");
    pageTransition.style.left = "110%";
    setTimeout(() => {
      pageTransition.style.left = "-110%";
      pageTransition.style.transition = "none";
      setTimeout(() => {
        pageTransition.style.transition = "left 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      }, 50);
    }, 600);
  }
});

document.querySelectorAll(".page-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const url = this.href;
    if (pageTransition) pageTransition.classList.add("active");
    setTimeout(() => { window.location.href = url; }, 600);
  });
});


/* ===================== NAVBAR SCROLL ===================== */
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});


/* ===================== GSAP ANIMATIONS ===================== */
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".grid-hero-title",
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
  );

  gsap.fromTo(".grid-hero-sub",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
  );

  gsap.utils.toArray(".grid-section-header").forEach((header) => {
    gsap.fromTo(header,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: header, start: "top 85%" } }
    );
  });
}


/* ===================== 2026 TEAMS DATA ===================== */
const teams = [
  {
    id: "redbull",   name: "RED BULL",     tag: "RACING · 2026",          clr: "#3671C6", dark: "#060e20",
    logo: "assets/Images/logos/redbull.png",   car: "assets/Images/cars/redbull.png",   href: "teams.html#redbull",
    d1: { first: "MAX",       last: "VERSTAPPEN", num: 1,  img: "assets/Images/drivers/Max.png"     },
    d2: { first: "ISACK",     last: "HADJAR",     num: 6,  img: "assets/Images/drivers/Isack.png"   },
  },
  {
    id: "ferrari",   name: "FERRARI",      tag: "SCUDERIA · 2026",        clr: "#E8002D", dark: "#160006",
    logo: "assets/Images/logos/ferrari.png",   car: "assets/Images/cars/ferrari.png",   href: "teams.html#ferrari",
    d1: { first: "CHARLES",   last: "LECLERC",    num: 16, img: "assets/Images/drivers/Charles.png" },
    d2: { first: "LEWIS",     last: "HAMILTON",   num: 44, img: "assets/Images/drivers/Lewis.png"   },
  },
  {
    id: "mercedes",  name: "MERCEDES",     tag: "AMG · 2026",             clr: "#27F4D2", dark: "#021512",
    logo: "assets/Images/logos/mercedes.png",  car: "assets/Images/cars/mercedes.png",  href: "teams.html#mercedes",
    d1: { first: "GEORGE",    last: "RUSSELL",    num: 63, img: "assets/Images/drivers/George.png"  },
    d2: { first: "KIMI",      last: "ANTONELLI",  num: 12, img: "assets/Images/drivers/Kimi.png"    },
  },
  {
    id: "mclaren",   name: "McLAREN",      tag: "F1 TEAM · 2026",         clr: "#FF8000", dark: "#160a00",
    logo: "assets/Images/logos/mclaren.png",   car: "assets/Images/cars/mclaren.png",   href: "teams.html#mclaren",
    d1: { first: "LANDO",     last: "NORRIS",     num: 4,  img: "assets/Images/drivers/Lando.png"   },
    d2: { first: "OSCAR",     last: "PIASTRI",    num: 81, img: "assets/Images/drivers/Oscar.png"   },
  },
  {
    id: "aston",     name: "ASTON MARTIN", tag: "AMR · 2026",             clr: "#229971", dark: "#031509",
    logo: "assets/Images/logos/aston.png",     car: "assets/Images/cars/astonmartin.png",     href: "teams.html#aston",
    d1: { first: "FERNANDO",  last: "ALONSO",     num: 14, img: "assets/Images/drivers/Alonso.png"  },
    d2: { first: "LANCE",     last: "STROLL",     num: 18, img: "assets/Images/drivers/Lance.png"  },
  },
  {
    id: "alpine",    name: "ALPINE",       tag: "BWT · 2026",             clr: "#FF87BC", dark: "#16030d",
    logo: "assets/Images/logos/alpine.png",    car: "assets/Images/cars/alpine.png",    href: "teams.html#alpine",
    d1: { first: "PIERRE",    last: "GASLY",      num: 10, img: "assets/Images/drivers/Pierre.png"  },
    d2: { first: "FRANCO",    last: "COLAPINTO",  num: 43, img: "assets/Images/drivers/Franco.png"  },
  },
  {
    id: "williams",  name: "WILLIAMS",     tag: "RACING · 2026",          clr: "#1868DB", dark: "#020a16",
    logo: "assets/Images/logos/williams.png",  car: "assets/Images/cars/williams.png",  href: "teams.html#williams",
    d1: { first: "CARLOS",    last: "SAINZ",      num: 55, img: "assets/Images/drivers/Carlos.png"  },
    d2: { first: "ALEX",      last: "ALBON",      num: 23, img: "assets/Images/drivers/Alex.png"    },
  },
  {
    id: "rb",        name: "RB",           tag: "VISA CASH APP · 2026",   clr: "#6692FF", dark: "#050716",
    logo: "assets/Images/logos/rb.png",        car: "assets/Images/cars/rb.png",        href: "teams.html#rb",
    d1: { first: "YUKI",      last: "TSUNODA",    num: 22, img: "assets/Images/drivers/Liam.png"    },
    d2: { first: "ARVID",     last: "LINDBLAD",   num: 8,  img: "assets/Images/drivers/Arvid.png"   },
  },
  {
    id: "haas",      name: "HAAS",         tag: "F1 TEAM · 2026",         clr: "#DFE1E2", dark: "#0e0e0e",
    logo: "assets/Images/logos/haas.png",      car: "assets/Images/cars/haas.png",      href: "teams.html#haas",
    d1: { first: "OLIVER",    last: "BEARMAN",    num: 87, img: "assets/Images/drivers/Oliver.png"  },
    d2: { first: "ESTEBAN",   last: "OCON",       num: 31, img: "assets/Images/drivers/Ocon.png"    },
  },
  {
    id: "audi",      name: "AUDI",         tag: "F1 TEAM · 2026",         clr: "#EB4526", dark: "#160600",
    logo: "assets/Images/logos/audi.png",      car: "assets/Images/cars/audi.png",      href: "teams.html#audi",
    d1: { first: "NICO",      last: "HULKENBERG", num: 27, img: "assets/Images/drivers/Nico.png"    },
    d2: { first: "GABRIEL",   last: "BORTOLETO",  num: 5,  img: "assets/Images/drivers/Gabriel.png" },
  },
  {
    id: "cadillac",  name: "CADILLAC",     tag: "F1 TEAM · 2026",         clr: "#CC0000", dark: "#0e0000",
    logo: "assets/Images/logos/cadillac.png",  car: "assets/Images/cars/cadillac.png",  href: "teams.html#cadillac",
    d1: { first: "VALTTERI",  last: "BOTTAS",     num: 77, img: "assets/Images/drivers/Bottas.png"  },
    d2: { first: "ESTEBAN",   last: "OCON",       num: 31, img: "assets/Images/drivers/Ocon.png"    },
  },
];


/* ===================== SLOT POSITIONS ===================== */
// [left%, top%] — all centered via translate(-50%,-50%)
const SLOT_POS = {
  ul: { l: 20,  t: 18  },
  ur: { l: 72,  t: 18  },
  ml: { l: 10,  t: 48  },
  mr: { l: 76,  t: 48  },
  ll: { l: 20,  t: 78  },
  lr: { l: 72,  t: 78  },
};

const slots = {
  ul: document.getElementById("slot-ul"),
  ur: document.getElementById("slot-ur"),
  ml: document.getElementById("slot-ml"),
  mr: document.getElementById("slot-mr"),
  ll: document.getElementById("slot-ll"),
  lr: document.getElementById("slot-lr"),
};

const teamCard = document.getElementById("teamCard");
const tccLogo  = document.getElementById("tccLogo");
const tccCar   = document.getElementById("tccCar");
const tccName  = document.getElementById("tccName");
const tccTag   = document.getElementById("tccTag");

let current = 0;
let isAnimating = false;


/* ===================== POSITION SLOTS ===================== */
Object.entries(SLOT_POS).forEach(([key, pos]) => {
  slots[key].style.left = pos.l + "%";
  slots[key].style.top  = pos.t + "%";
});


/* ===================== FILL DRIVER SLOT ===================== */
function fillSlot(slotEl, driver, clr, isActive) {
  slotEl.style.setProperty("--clr", clr);

  slotEl.innerHTML = `
    <img class="d-photo" src="${driver.img}" alt="${driver.last}"
      onerror="this.style.background='#1a1a1a'"/>
    <div class="d-num">${driver.num}</div>
    <div class="d-info">
      <div class="d-first">${driver.first}</div>
      <div class="d-last">${driver.last}</div>
    </div>
  `;

  if (isActive) {
    slotEl.classList.remove("dimmed");
  } else {
    slotEl.classList.add("dimmed");
  }
}


/* ===================== RENDER TEAM ===================== */
function render() {
  const total = teams.length;
  const curr  = teams[current];
  const prev  = teams[(current - 1 + total) % total];
  const next  = teams[(current + 1) % total];

  // Active drivers — mid slots, big, colorful
  fillSlot(slots.ml, curr.d1, curr.clr, true);
  fillSlot(slots.mr, curr.d2, curr.clr, true);

  // Neighboring drivers — corner slots, small, dimmed
  fillSlot(slots.ul, prev.d1, prev.clr, false);
  fillSlot(slots.ll, prev.d2, prev.clr, false);
  fillSlot(slots.ur, next.d1, next.clr, false);
  fillSlot(slots.lr, next.d2, next.clr, false);

  // Team card
  teamCard.style.setProperty("--clr",      curr.clr);
  teamCard.style.setProperty("--clr-dark", curr.dark);
  tccLogo.src = curr.logo;
  tccLogo.alt = curr.name;
  tccCar.src  = curr.car;
  tccCar.alt  = curr.name;
  tccName.textContent = curr.name;
  tccTag.textContent  = curr.tag;

  // Show team card with slight delay
  teamCard.classList.remove("visible");
  setTimeout(() => teamCard.classList.add("visible"), 80);

  // Update dots
  document.querySelectorAll(".tn-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}


/* ===================== NAVIGATE ===================== */
function goTo(index) {
  if (isAnimating) return;
  isAnimating = true;

  // Hide team card briefly for clean transition
  teamCard.classList.remove("visible");

  setTimeout(() => {
    current = ((index % teams.length) + teams.length) % teams.length;
    render();
    isAnimating = false;
  }, 200);
}


/* ===================== BUILD NAV DOTS ===================== */
const dotsEl = document.getElementById("teamDots");
teams.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "tn-dot";
  dot.addEventListener("click", () => goTo(i));
  dotsEl.appendChild(dot);
});


/* ===================== BUTTON EVENTS ===================== */
document.getElementById("teamPrev").addEventListener("click", () => goTo(current - 1));
document.getElementById("teamNext").addEventListener("click", () => goTo(current + 1));


/* ===================== KEYBOARD ===================== */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft")  goTo(current - 1);
  if (e.key === "ArrowRight") goTo(current + 1);
});


/* ===================== SWIPE ===================== */
let touchStartX = 0;
const stage = document.getElementById("teamsStage");

stage.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

stage.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (dx > 60)       goTo(current - 1);
  else if (dx < -60) goTo(current + 1);
});


/* ===================== INIT ===================== */
render();