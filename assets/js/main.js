document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    e.preventDefault();
    const section = document.querySelector(targetId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth" });
  });
});

// ─────────────────────────────────────────────
// 🌗 Theme toggle
// ─────────────────────────────────────────────
const THEME_KEY = "nova-theme";
const themeToggleBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
  }
}

// 초기 테마 결정 (로컬스토리지 → 시스템 설정 → 기본 dark)
(function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
})();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

// ─────────────────────────────────────────────
// 🌀 Smooth scroll for internal links
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const section = document.querySelector(targetId);
    if (!section) return;

    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// ─────────────────────────────────────────────
// 📧 Contact form + EmailJS
// ─────────────────────────────────────────────
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactSubmitBtn = document.getElementById("contact-submit");

// ✅ TODO: 여기에 본인 EmailJS 정보 넣기
const EMAILJS_PUBLIC_KEY = "dvniGEtx4cmBDW1fN";
const EMAILJS_SERVICE_ID = "service_wmxzapl";
const EMAILJS_TEMPLATE_ID = "template_iqo2dfe";

if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      if (contactStatus) {
        contactStatus.textContent =
          "이메일 설정이 아직 완료되지 않았습니다. (EmailJS 설정 필요)";
      }
      return;
    }

    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.textContent = "보내는 중...";
    }
    if (contactStatus) {
      contactStatus.textContent = "";
    }

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, "#contact-form")
      .then(
        () => {
          if (contactStatus) {
            contactStatus.textContent =
              "메시지가 성공적으로 전송되었습니다. 감사합니다!";
          }
          contactForm.reset();
        },
        (error) => {
          console.error(error);
          if (contactStatus) {
            contactStatus.textContent =
              "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
          }
        }
      )
      .finally(() => {
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.textContent = "보내기";
        }
      });
  });
}
