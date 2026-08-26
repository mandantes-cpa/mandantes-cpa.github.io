/*
  Ledger Parade interaction reminder: interactions should feel deliberate and filing-tab tactile.
  Keep every essential action usable without JavaScript; use JavaScript only to enhance navigation,
  section awareness, safe PDF previews, copy feedback, and restrained reveal effects.
*/

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  root.classList.add("js-enabled");

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  let lastFocusedElement = null;

  const setMenu = (open) => {
    if (!menuButton || !navigation) return;
    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    if (open) {
      lastFocusedElement = document.activeElement;
      const firstLink = navigation.querySelector("a");
      if (firstLink) firstLink.focus();
    } else if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => setMenu(!navigation.classList.contains("is-open")));
    navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

    document.addEventListener("keydown", (event) => {
      if (!navigation.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setMenu(false);
      }
      if (event.key === "Tab") {
        const focusable = [...navigation.querySelectorAll('a[href], button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720 && navigation.classList.contains("is-open")) setMenu(false);
    });
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.01, 0.25, 0.5] }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealElements = [...document.querySelectorAll(".reveal")];
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-revealed"));
  }

  const carousel = document.querySelector(".testimonial-carousel");
  const carouselStatus = document.querySelector("#carousel-status");
  if (carousel && carouselStatus) {
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        carouselStatus.textContent = "Testimonial 1 of 1. Autoplay is paused; one source testimonial is published.";
      }
    });
  }

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.email;
      if (!email) return;
      copyStatus.textContent = "Copying email address…";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const helper = document.createElement("textarea");
          helper.value = email;
          helper.setAttribute("readonly", "");
          helper.style.position = "fixed";
          helper.style.opacity = "0";
          document.body.append(helper);
          helper.select();
          const copied = document.execCommand("copy");
          helper.remove();
          if (!copied) throw new Error("Legacy copy method was unavailable.");
        }
        copyStatus.textContent = "Email address copied to your clipboard.";
      } catch {
        copyStatus.textContent = "Copy was not available. Please use the email link instead.";
      }
    });
  }

  const showPdfFallback = (container, message) => {
    const preview = container.querySelector(".pdf-preview");
    const fallback = container.querySelector("[data-pdf-fallback]");
    if (!preview || !fallback) return;
    preview.replaceChildren(fallback);
    fallback.hidden = false;
    const text = fallback.querySelector("strong");
    if (text && message) text.textContent = message;
  };

  document.querySelectorAll("[data-pdf-preview]").forEach(async (container) => {
    const pdfUrl = container.dataset.pdf;
    const preview = container.querySelector(".pdf-preview");
    if (!pdfUrl || !preview) return;
    try {
      const response = await fetch(pdfUrl, { method: "HEAD", cache: "no-store" });
      if (!response.ok) throw new Error("The work-sample PDF is not available yet.");
      const frame = document.createElement("iframe");
      frame.src = pdfUrl;
      frame.loading = "lazy";
      frame.title = `${container.querySelector("h3")?.textContent?.trim() || "Work sample"} PDF preview`;
      frame.setAttribute("aria-label", frame.title);
      frame.addEventListener("error", () => showPdfFallback(container, "PDF preview unavailable"), { once: true });
      preview.replaceChildren(frame);
    } catch {
      showPdfFallback(container, "PDF preview awaiting file");
    }
  });
});
