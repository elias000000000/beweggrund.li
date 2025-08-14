// Jahr im Footer
document.getElementById("y").textContent = new Date().getFullYear();

// Mobile Navigation
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav){
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Close on link click (mobile)
  nav.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=> {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded","false");
    });
  });
}

// Header Elevation on scroll
const header = document.querySelector("[data-elevate]");
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  header.classList.toggle("is-elevated", y > 4 && y > lastY);
  lastY = y;
}, {passive:true});

// Smooth Scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click", e=>{
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
      history.pushState(null, "", id);
    }
  });
});

// Hero Slider (fading, auto-advance)
const slider = document.querySelector("[data-slider]");
if (slider){
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  let i = 0;
  const show = (n) => {
    slides.forEach((s, idx)=> s.classList.toggle("is-active", idx === n));
  };
  show(i);
  const advance = () => {
    i = (i + 1) % slides.length;
    show(i);
  };
  let timer = setInterval(advance, 6000);

  // pause on hover/focus for accessibility
  slider.addEventListener("mouseenter", ()=> clearInterval(timer));
  slider.addEventListener("mouseleave", ()=> timer = setInterval(advance, 6000));
}

// Reveal on Scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
document.querySelectorAll("[data-reveal]").forEach(el=> io.observe(el));

// Kontaktformular (Frontend-Validation + Demo-Erfolgsmeldung)
const form = document.querySelector(".contact-form");
if (form){
  const note = form.querySelector(".form-note");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const dat
