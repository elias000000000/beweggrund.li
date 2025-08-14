// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Formular-Submit-Handler (Demo)
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Danke für Ihre Nachricht! Wir melden uns bald.");
  e.target.reset();
});
