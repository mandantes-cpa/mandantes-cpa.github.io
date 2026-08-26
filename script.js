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

  const parseCsv = (csvText) => {
    const rows = [];
    let cell = "";
    let row = [];
    let insideQuotes = false;
    for (let index = 0; index < csvText.length; index += 1) {
      const character = csvText[index];
      const nextCharacter = csvText[index + 1];
      if (character === '"' && insideQuotes && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        insideQuotes = !insideQuotes;
      } else if (character === "," && !insideQuotes) {
        row.push(cell.trim());
        cell = "";
      } else if ((character === "\n" || character === "\r") && !insideQuotes) {
        if (character === "\r" && nextCharacter === "\n") index += 1;
        row.push(cell.trim());
        if (row.some((value) => value)) rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += character;
      }
    }
    row.push(cell.trim());
    if (row.some((value) => value)) rows.push(row);
    const [headers, ...values] = rows;
    if (!headers) return [];
    return values.map((valueRow) => Object.fromEntries(headers.map((header, position) => [header, valueRow[position] || ""])));
  };

  const carousel = document.querySelector("[data-testimonial-carousel]");
  const carouselStatus = document.querySelector("#carousel-status");
  if (carousel && carouselStatus) {
    const quote = carousel.querySelector("[data-testimonial-quote]");
    const attribution = carousel.querySelector("[data-testimonial-attribution]");
    const organization = carousel.querySelector("[data-testimonial-organization]");
    const count = carousel.querySelector("[data-testimonial-count]");
    const previous = carousel.querySelector("[data-testimonial-previous]");
    const next = carousel.querySelector("[data-testimonial-next]");
    const fallbackTestimonial = [{
      quote: quote?.textContent?.trim().replace(/^“|”$/g, "") || "",
      attribution: attribution?.textContent?.trim() || "",
      organization: organization?.textContent?.trim() || ""
    }];
    let testimonials = fallbackTestimonial;
    let currentIndex = 0;

    const updateTestimonial = () => {
      const testimonial = testimonials[currentIndex];
      if (!testimonial || !quote || !attribution || !organization || !count || !previous || !next) return;
      quote.textContent = `“${testimonial.quote}”`;
      attribution.textContent = testimonial.attribution;
      organization.textContent = testimonial.organization;
      organization.hidden = !testimonial.organization;
      const total = testimonials.length;
      count.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      carouselStatus.textContent = `Testimonial ${currentIndex + 1} of ${total}. Autoplay is paused.`;
      const unavailable = total <= 1;
      previous.disabled = unavailable;
      next.disabled = unavailable;
      previous.setAttribute("aria-label", unavailable ? "Previous testimonial unavailable; one testimonial is published" : "Show previous testimonial");
      next.setAttribute("aria-label", unavailable ? "Next testimonial unavailable; one testimonial is published" : "Show next testimonial");
    };

    const moveTestimonial = (direction) => {
      if (testimonials.length <= 1) return;
      currentIndex = (currentIndex + direction + testimonials.length) % testimonials.length;
      updateTestimonial();
    };

    previous?.addEventListener("click", () => moveTestimonial(-1));
    next?.addEventListener("click", () => moveTestimonial(1));
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); moveTestimonial(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); moveTestimonial(1); }
    });

    fetch("assets/data/testimonials.csv", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Testimonial CSV was unavailable.");
        return response.text();
      })
      .then((csvText) => {
        const published = parseCsv(csvText).filter((item) => item.status.trim().toLowerCase() === "published" && item.quote && item.attribution);
        if (!published.length) return;
        testimonials = published;
        currentIndex = 0;
        updateTestimonial();
      })
      .catch(() => updateTestimonial());
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

  document.querySelectorAll("[data-canva-presentation]").forEach((link) => {
    const isPlaceholder = link.getAttribute("href")?.includes("REPLACE_WITH_");
    if (!isPlaceholder) return;
    link.classList.add("is-placeholder");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("tabindex", "-1");
    const sampleName = link.querySelector("img")?.getAttribute("alt")?.replace("Preview thumbnail for the ", "").replace(" work sample", "") || "Work sample";
    link.setAttribute("aria-label", `${sampleName} link awaiting a public Canva URL`);
    const label = link.querySelector("[data-canva-link-label]");
    if (label) label.innerHTML = "Canva link awaiting URL";
    link.addEventListener("click", (event) => event.preventDefault());
  });
});
