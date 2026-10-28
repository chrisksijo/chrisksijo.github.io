/* =========================================
   CKS PORTFOLIO — JAVASCRIPT
   Change these constants to update the site
========================================= */
const PORTFOLIO_CONFIG = {
  ownerName: "Chris K Sijo",
  email: "chrisksijo@gmail.com",
  instagramUrl: "https://www.instagram.com/_chris_k_sijo_/",
  menuOpenClass: "open",
  successMessage: "Your email draft is ready in your email app."
};

const menuToggle = document.querySelector("#menuToggle");
const navigation = document.querySelector("#nav");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const yearElement = document.querySelector("#year");

// Keep the footer year current automatically.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation: open/close and update accessibility state.
if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle(PORTFOLIO_CONFIG.menuOpenClass);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove(PORTFOLIO_CONFIG.menuOpenClass);
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Toggle navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Contact form: validates fields and creates an email draft.
// No backend is used; the visitor's email app handles sending.
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const senderName = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio message from ${senderName}`);
    const body = encodeURIComponent(
      `Hi ${PORTFOLIO_CONFIG.ownerName},\n\n${message}\n\nFrom: ${senderName}\nReply to: ${senderEmail}`
    );

    if (formNote) {
      formNote.textContent = PORTFOLIO_CONFIG.successMessage;
    }

    window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

// Smoothly reveal cards as they enter the viewport (with a safe fallback).
const revealTargets = document.querySelectorAll(
  ".skill-card, .project-card, .about-card, .contact-form"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
}
