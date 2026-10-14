document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const navToggle = document.getElementById("mobile-nav-toggle");
  const primaryNav = document.getElementById("primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  const closeMobileMenu = () => {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  };

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      primaryNav.classList.toggle("is-open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        closeMobileMenu();
        navToggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (
        primaryNav.classList.contains("is-open") &&
        !primaryNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  const toggleResumeBtn = document.getElementById("toggle-resume-drawer");
  const closeResumeBtn = document.getElementById("close-resume-drawer");
  const resumePanel = document.getElementById("resume-dossier-panel");

  if (toggleResumeBtn && resumePanel) {
    toggleResumeBtn.addEventListener("click", () => {
      const isHidden = resumePanel.hasAttribute("hidden");
      if (isHidden) {
        resumePanel.removeAttribute("hidden");
        toggleResumeBtn.setAttribute("aria-expanded", "true");
        resumePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        resumePanel.setAttribute("hidden", "");
        toggleResumeBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (closeResumeBtn && resumePanel && toggleResumeBtn) {
    closeResumeBtn.addEventListener("click", () => {
      resumePanel.setAttribute("hidden", "");
      toggleResumeBtn.setAttribute("aria-expanded", "false");
      toggleResumeBtn.focus();
    });
  }

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${currentId}`);
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }
});
