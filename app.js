/* ===================================================================
   Elian Voss — Portfolio interactions
   GSAP + ScrollTrigger + Lenis (all via CDN)
=================================================================== */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover:none)").matches || window.innerWidth < 900;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Curtain / page-load transition ---------- */
  function revealCurtain() {
    const curtain = document.getElementById("curtain");
    if (reduce || !curtain) { if (curtain) curtain.style.display = "none"; heroReveal(); return; }
    const word = curtain.querySelector(".curtain__word");
    const tl = gsap.timeline();
    tl.to(word, { opacity: 1, duration: .6, ease: "power2.out" })
      .to(word, { opacity: 0, duration: .4, delay: .35 })
      .to(curtain, { yPercent: -100, duration: 1, ease: "power4.inOut", onComplete: () => curtain.style.display = "none" }, "-=.1")
      .call(heroReveal, null, "-=.55");
  }

  /* ---------- Hero masked line reveal ---------- */
  function heroReveal() {
    if (reduce) {
      gsap.set(".line__inner, .hero__foot, .hero__roles, .overline", { y: 0, opacity: 1 });
      return;
    }
    const tl = gsap.timeline();
 	tl.fromTo(".hero__media-frame", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.out" })
      .fromTo(".hero__media img", { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out" }, "<")
      .fromTo(".hero .overline", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out" }, "-=1.1")
      .fromTo(".line__inner", { yPercent: 110 }, { yPercent: 0, duration: 1.4, ease: "power4.out", stagger: .12 }, "-=.5")
      .fromTo(".hero__roles", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=.9")
      .fromTo(".hero__foot", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=.8");
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  function initLenis() {
    if (reduce || typeof Lenis === "undefined") return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- ScrollTrigger reveals ---------- */
  function initReveals() {
    if (typeof gsap === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (!reduce) {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.to(el, {
          y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });
      gsap.utils.toArray(".reveal-fade").forEach((el) => {
        gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
      });
      // Bio image clip reveal
      const frame = document.querySelector(".reveal-img .bio__frame");
      if (frame) {
        gsap.to(frame, {
          clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: frame, start: "top 85%" }
        });
      }
    } else {
      gsap.set(".reveal, .reveal-fade", { opacity: 1, y: 0 });
    }

    // Parallax elements
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax"));
      if (reduce) return;
      gsap.to(el, {
        yPercent: -speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  /* ---------- Marquee ---------- */
  function initMarquee() {
    const track = document.getElementById("marquee");
    if (!track || reduce) return;
    const width = track.scrollWidth / 3;
    gsap.to(track, { x: -width, duration: 22, ease: "none", repeat: -1 });
  }

  /* ---------- Nav scroll state + smooth anchor ---------- */
  function initNav() {
    const nav = document.getElementById("nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll); onScroll();

    // progress bar
    const bar = document.getElementById("progress");
    window.addEventListener("scroll", () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / h) * 100 + "%";
    });

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.4 });
        else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
    });
  }

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  function closeMenu() { burger.classList.remove("open"); menu.classList.remove("open"); }
  function initMenu() {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      menu.classList.toggle("open", open);
    });
  }

  /* ---------- Custom cursor + magnetic ---------- */
  function initCursor() {
    if (isTouch) return;
    const ring = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    (function loop() {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a,button,.track,.nowplaying__bar").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
    });

    // magnetic buttons
    document.querySelectorAll(".btn-magnetic,.btn-submit").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * .3, y: y * .4, duration: .5, ease: "power3.out" });
      });
      btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.4)" }));
    });
  }

  /* ---------- Music bloom follows cursor within section ---------- */
  function initBloom() {
    const section = document.getElementById("music");
    const bloom = document.getElementById("musicBloom");
    if (!section || !bloom) return;
    section.addEventListener("mousemove", (e) => {
      const r = section.getBoundingClientRect();
      bloom.style.left = (e.clientX - r.left) + "px";
      bloom.style.top = (e.clientY - r.top) + "px";
    });
    section.addEventListener("mouseenter", () => bloom.style.opacity = "1");
    section.addEventListener("mouseleave", () => bloom.style.opacity = "0");
  }

  /* ---------- Audio player ---------- */
  function initPlayer() {
    const audio = document.getElementById("audio");
    const tracks = Array.from(document.querySelectorAll(".track"));
    const npTitle = document.getElementById("npTitle");
    const npTime = document.getElementById("npTime");
    const seek = document.getElementById("seek");
    const seekFill = document.getElementById("seekFill");
    let current = -1;

    const fmt = (s) => {
      if (isNaN(s)) return "0:00";
      const m = Math.floor(s / 60), sec = Math.floor(s % 60);
      return m + ":" + (sec < 10 ? "0" : "") + sec;
    };

    // preload durations
    tracks.forEach((t) => {
      const a = new Audio();
      a.preload = "metadata";
      a.src = t.dataset.src;
      a.addEventListener("loadedmetadata", () => {
        t.querySelector(".track__dur").textContent = fmt(a.duration);
      });
    });

    function load(i) {
      current = i;
      const t = tracks[i];
      audio.src = t.dataset.src;
      npTitle.textContent = t.dataset.title;
      tracks.forEach((x) => x.classList.remove("playing"));
    }

    function play(i) {
      if (i !== current) load(i);
      audio.play();
      tracks.forEach((x, idx) => x.classList.toggle("playing", idx === i));
    }

    function toggle(i) {
      if (i === current && !audio.paused) { audio.pause(); tracks[i].classList.remove("playing"); }
      else play(i);
    }

    tracks.forEach((t, i) => {
      t.querySelector(".track__play").addEventListener("click", (e) => { e.stopPropagation(); toggle(i); });
      t.addEventListener("click", () => toggle(i));
    });

    audio.addEventListener("timeupdate", () => {
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      seekFill.style.width = pct + "%";
      npTime.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
    });
    audio.addEventListener("ended", () => {
      const next = (current + 1) % tracks.length;
      play(next);
    });
    seek.addEventListener("click", (e) => {
      const r = seek.getBoundingClientRect();
      if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
  }

  /* ---------- Formspree AJAX submit ---------- */
  function initForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      const action = form.getAttribute("action");
      if (action.includes("YOUR_ENDPOINT")) {
        status.textContent = "⚙ Demo mode — add your Formspree endpoint in index.html to go live. (See README)";
        status.classList.add("ok");
        form.reset();
        return;
      }
      status.textContent = "Sending…";
      try {
        const res = await fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (res.ok) { status.textContent = "Thank you — your message has been sent."; status.classList.add("ok"); form.reset(); }
        else { status.textContent = "Something went wrong. Please try again."; status.classList.add("err"); }
      } catch (_) {
        status.textContent = "Network error. Please try again."; status.classList.add("err");
      }
    });
  }

  /* ---------- Boot ---------- */
  window.addEventListener("load", () => {
    initReveals();
    initLenis();
    initMarquee();
    initNav();
    initMenu();
    initCursor();
    initBloom();
    initPlayer();
    initForm();
    revealCurtain();
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
})();
