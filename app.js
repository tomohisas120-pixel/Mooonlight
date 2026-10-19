(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const images = [...document.querySelectorAll("img[data-src]")];

  // Load images shortly before they enter the viewport.
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
        img.addEventListener("error", () => {
          img.alt = `${img.alt}（画像を読み込めませんでした）`;
          img.classList.add("loaded");
        }, { once: true });
        observer.unobserve(img);
      }
    }, { rootMargin: "250px 0px", threshold: 0.01 });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Compatibility fallback for older browsers.
    images.forEach(img => {
      img.src = img.dataset.src;
      img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
    });
  }

  // Keep scroll work event-driven and only update images currently near the viewport.
  const parallaxImages = [...document.querySelectorAll(".parallax-img")];
  let ticking = false;
  let visibleImages = new Set();

  if (!reduceMotion && "IntersectionObserver" in window) {
    const effectObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleImages.add(entry.target);
        else {
          visibleImages.delete(entry.target);
          entry.target.style.transform = "";
        }
      }
    }, { rootMargin: "100px 0px" });

    parallaxImages.forEach(img => effectObserver.observe(img));

    const updateEffects = () => {
      const viewportHeight = window.innerHeight || 1;
      for (const img of visibleImages) {
        if (!img.classList.contains("loaded")) continue;
        const rect = img.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const offset = Math.max(-12, Math.min(12, -progress * 12));
        img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
      }
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateEffects);
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateEffects);
    }, { passive: true });
  }

  // Conservative same-origin prefetch. Avoid data-heavy, external, or modified clicks.
  const canPrefetch = "relList" in document.createElement("link") &&
    document.createElement("link").relList.supports("prefetch");
  const prefetched = new Set();
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.saveData || /2g/.test(connection.effectiveType || ""));
  const hoverSupported = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function prefetchLink(anchor) {
    if (!canPrefetch || slowConnection || document.visibilityState === "hidden") return;
    if (!anchor || !anchor.href || anchor.dataset.noPrefetch === "true") return;
    if (anchor.target && anchor.target !== "_self") return;
    if (anchor.hasAttribute("download")) return;

    let url;
    try { url = new URL(anchor.href, location.href); } catch { return; }
    if (url.origin !== location.origin || url.pathname === location.pathname && url.search === location.search) return;
    if (!/^https?:$/.test(url.protocol) || prefetched.has(url.href)) return;

    prefetched.add(url.href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url.href;
    link.as = "document";
    document.head.appendChild(link);
  }

  document.addEventListener(hoverSupported ? "pointerover" : "focusin", event => {
    const anchor = event.target.closest && event.target.closest("a[href]");
    if (anchor) prefetchLink(anchor);
  }, { passive: true });

  // Mobile navigation.
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを表示");
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "メニューを表示");
      }
    });
  }
})();
