(() => {
  "use strict";

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const navBtn = document.getElementById("navBtn");
  const nav = document.getElementById("nav");
  if (navBtn && nav) {
    navBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navBtn.setAttribute("aria-expanded", String(open));
    });

    // Close on link click (mobile)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Slider (ONLY TWO IMAGES - DO NOT CHANGE PATHS)
  const slides = ["assets/img/logo.png", "assets/img/logo2.png"];
  const img = document.getElementById("slideImg");
  const btn = document.getElementById("toggleSlide");
  const dot1 = document.getElementById("dot1");
  const dot2 = document.getElementById("dot2");

  if (!img) return;

  // Preload
  slides.forEach(src => { const i = new Image(); i.src = src; });

  let idx = 0;
  let playing = true;
  let timer = null;

  const setDots = (i) => {
    if (!dot1 || !dot2) return;
    dot1.classList.toggle("dot--on", i === 0);
    dot2.classList.toggle("dot--on", i === 1);
  };

  const swap = () => {
    idx = (idx + 1) % slides.length;

    img.classList.add("is-fading");
    window.setTimeout(() => {
      img.src = slides[idx];
      setDots(idx);
      img.classList.remove("is-fading");
    }, 250);
  };

  const start = () => {
    stop();
    timer = window.setInterval(swap, 4200);
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  setDots(0);
  start();

  if (btn) {
    btn.addEventListener("click", () => {
      playing = !playing;
      btn.textContent = playing ? "Pause" : "Play";
      if (playing) start();
      else stop();
    });
  }
})();
