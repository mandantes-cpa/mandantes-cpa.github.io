/*
  Ledger Parade interaction reminder: interactions should feel deliberate and filing-tab tactile.
  Keep every essential action usable without JavaScript; use JavaScript only to enhance navigation,
  section awareness, CSV-driven content, copy feedback, and restrained reveal effects.
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

  const serviceAccordion = document.querySelector("[data-service-accordion]");
if (serviceAccordion) {
  const makeServiceItem = (service, index) => {
    const details = document.createElement("details");
    details.open = index === 0;
    const summary = document.createElement("summary");
    const number = document.createElement("span");
    number.className = "service-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const title = document.createElement("span");
    title.textContent = service.title;
    const icon = document.createElement("i");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "+";
    summary.append(number, title, icon);
    const detail = document.createElement("div");
    detail.className = "service-detail";
    const description = document.createElement("p");
    description.textContent = service.description;
    detail.append(description);
    details.append(summary, detail);
    return details;
  };

  fetch("assets/data/services.csv", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Services CSV was unavailable.");
      return response.text();
    })
    .then((csvText) => {
      const published = parseCsv(csvText).filter((item) => item.status.trim().toLowerCase() === "published" && item.title && item.description);
      if (!published.length) {
        const empty = document.createElement("p");
        empty.className = "service-empty";
        empty.textContent = "No published services are available yet.";
        serviceAccordion.replaceChildren(empty);
        return;
      }
      serviceAccordion.replaceChildren(...published.map(makeServiceItem));
    })
    .catch(() => {
      // The static HTML entries remain available as the deliberately useful fallback.
    });
}

const softwareCarousel = document.querySelector("[data-software-carousel]");
if (softwareCarousel) {
  const viewport = softwareCarousel.querySelector("[data-software-viewport]");
  const track = softwareCarousel.querySelector("[data-software-track]");
  const empty = softwareCarousel.querySelector("[data-software-empty]");
  const status = softwareCarousel.querySelector("[data-software-status]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoFrame = null;
  let singleSetWidth = 0;
  let isPaused = false;
  let isDragging = false;
  let pointerStartX = 0;
  let scrollStart = 0;
  let autoScrollCarry = 0;

  const stopAutoScroll = () => {
    if (autoFrame) cancelAnimationFrame(autoFrame);
    autoFrame = null;
  };

  const keepLoopPosition = () => {
    if (!viewport || !singleSetWidth) return;
    while (viewport.scrollLeft < singleSetWidth) viewport.scrollLeft += singleSetWidth;
    while (viewport.scrollLeft > singleSetWidth * 3) viewport.scrollLeft -= singleSetWidth;
  };

  const startAutoScroll = () => {
    if (!viewport || reduceMotion || isPaused || singleSetWidth <= 0 || autoFrame) return;
    const step = () => {
      if (!isPaused && !isDragging) {
        autoScrollCarry -= 0.35;
        const wholePixelMove = Math.trunc(autoScrollCarry);
        if (wholePixelMove) {
          viewport.scrollLeft += wholePixelMove;
          autoScrollCarry -= wholePixelMove;
          keepLoopPosition();
        }
      }
      autoFrame = requestAnimationFrame(step);
    };
    autoFrame = requestAnimationFrame(step);
  };

  const makeSoftwareCard = (software) => {
    const card = document.createElement("article");
    card.className = "software-logo-card";
    const image = document.createElement("img");
    image.src = `assets/images/software/${software.logo_filename}`;
    image.alt = `${software.name} logo`;
    image.addEventListener("error", () => {
      image.remove();
      card.classList.add("is-missing-logo");
    }, { once: true });
    const label = document.createElement("span");
    label.textContent = software.name;
    card.append(image, label);
    return card;
  };

  const makeSoftwareSet = (softwareList, hiddenFromAssistiveTechnology) => {
    const set = document.createElement("div");
    set.className = "software-strip__set";
    if (hiddenFromAssistiveTechnology) set.setAttribute("aria-hidden", "true");
    softwareList.forEach((software) => set.append(makeSoftwareCard(software)));
    return set;
  };

  const renderSoftware = (softwareList) => {
    if (!track || !viewport || !status) return;
    stopAutoScroll();
    track.replaceChildren();
    if (!softwareList.length) {
      if (empty) track.append(empty);
      status.textContent = "No published software logos are available yet.";
      return;
    }
    const primarySet = makeSoftwareSet(softwareList, false);
    track.append(primarySet);
    status.textContent = `${softwareList.length} supported software ${softwareList.length === 1 ? "platform is" : "platforms are"} published. Drag sideways to browse.`;
    requestAnimationFrame(() => {
      singleSetWidth = primarySet.getBoundingClientRect().width;
      const requiredSetCount = Math.ceil(viewport.clientWidth / singleSetWidth) + 5;
      for (let copyIndex = 1; copyIndex < requiredSetCount; copyIndex += 1) {
        track.append(makeSoftwareSet(softwareList, true));
      }
      viewport.scrollLeft = singleSetWidth * 2;
      if (softwareList.length > 1) startAutoScroll();
    });
  };

  viewport?.addEventListener("pointerdown", (event) => {
    if (!singleSetWidth || event.pointerType === "keyboard") return;
    isDragging = true;
    isPaused = true;
    pointerStartX = event.clientX;
    scrollStart = viewport.scrollLeft;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
    stopAutoScroll();
  });
  viewport?.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    viewport.scrollLeft = scrollStart - (event.clientX - pointerStartX);
    keepLoopPosition();
  });
  const endDrag = (event) => {
    if (!isDragging || !viewport) return;
    isDragging = false;
    isPaused = false;
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    startAutoScroll();
  };
  viewport?.addEventListener("pointerup", endDrag);
  viewport?.addEventListener("pointercancel", endDrag);
  viewport?.addEventListener("focusin", () => { isPaused = true; stopAutoScroll(); });
  viewport?.addEventListener("focusout", () => { isPaused = false; startAutoScroll(); });
  viewport?.addEventListener("keydown", (event) => {
    if (!viewport || !singleSetWidth) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      viewport.scrollLeft += event.key === "ArrowLeft" ? -140 : 140;
      keepLoopPosition();
    }
  });

  fetch("assets/data/supported-software.csv", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Supported-software CSV was unavailable.");
      return response.text();
    })
    .then((csvText) => {
      const published = parseCsv(csvText).filter((item) => item.status.trim().toLowerCase() === "published" && item.name && /^[A-Za-z0-9][A-Za-z0-9._-]*\.png$/i.test(item.logo_filename));
      renderSoftware(published);
    })
    .catch(() => renderSoftware([]));
}

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

  const workSampleCarousel = document.querySelector("[data-work-sample-carousel]");
  if (workSampleCarousel) {
    const status = workSampleCarousel.querySelector("[data-work-sample-status]");
    const index = workSampleCarousel.querySelector("[data-work-sample-index]");
    const title = workSampleCarousel.querySelector("[data-work-sample-title]");
    const description = workSampleCarousel.querySelector("[data-work-sample-description]");
    const link = workSampleCarousel.querySelector("[data-work-sample-link]");
    const count = workSampleCarousel.querySelector("[data-work-sample-count]");
    const previous = workSampleCarousel.querySelector("[data-work-sample-previous]");
    const next = workSampleCarousel.querySelector("[data-work-sample-next]");
    let workSamples = [];
    let currentIndex = 0;

    const updateWorkSample = () => {
      const sample = workSamples[currentIndex];
      if (!status || !index || !title || !description || !link || !count || !previous || !next) return;
      if (!sample) {
        status.textContent = "No published work samples are available yet.";
        index.textContent = "Work sample / awaiting entry";
        title.innerHTML = "ADD A<br />WORK SAMPLE.";
        description.innerHTML = "Open <code>assets/data/work-samples.csv</code>, add a reviewed public presentation link, and set its status to <code>published</code>.";
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("tabindex", "-1");
        link.setAttribute("href", "#work-samples");
        count.textContent = "00 / 00";
        previous.disabled = true;
        next.disabled = true;
        previous.setAttribute("aria-label", "Previous work sample unavailable; no published work samples");
        next.setAttribute("aria-label", "Next work sample unavailable; no published work samples");
        return;
      }
      const total = workSamples.length;
      status.textContent = `Work sample ${currentIndex + 1} of ${total}. Autoplay is paused.`;
      index.textContent = `Work sample / ${String(currentIndex + 1).padStart(2, "0")}`;
      title.textContent = sample.title;
      description.textContent = sample.description;
      link.href = sample.presentation_url;
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
      link.setAttribute("aria-label", `View ${sample.title} presentation in a new tab`);
      count.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      const unavailable = total <= 1;
      previous.disabled = unavailable;
      next.disabled = unavailable;
      previous.setAttribute("aria-label", unavailable ? "Previous work sample unavailable; one work sample is published" : "Show previous work sample");
      next.setAttribute("aria-label", unavailable ? "Next work sample unavailable; one work sample is published" : "Show next work sample");
    };

    const moveWorkSample = (direction) => {
      if (workSamples.length <= 1) return;
      currentIndex = (currentIndex + direction + workSamples.length) % workSamples.length;
      updateWorkSample();
    };

    previous?.addEventListener("click", () => moveWorkSample(-1));
    next?.addEventListener("click", () => moveWorkSample(1));
    workSampleCarousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); moveWorkSample(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); moveWorkSample(1); }
    });
    link?.addEventListener("click", (event) => {
      if (link.getAttribute("aria-disabled") === "true") event.preventDefault();
    });

    fetch("assets/data/work-samples.csv", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Work-sample CSV was unavailable.");
        return response.text();
      })
      .then((csvText) => {
        const published = parseCsv(csvText).filter((item) => {
          try {
            const url = new URL(item.presentation_url);
            return item.status.trim().toLowerCase() === "published" && item.title && item.description && ["http:", "https:"].includes(url.protocol);
          } catch {
            return false;
          }
        });
        if (!published.length) return updateWorkSample();
        workSamples = published;
        currentIndex = 0;
        updateWorkSample();
      })
      .catch(() => updateWorkSample());
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

});
