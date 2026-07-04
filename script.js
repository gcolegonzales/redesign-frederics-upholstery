/* Frederic's Upholstery — redesign concept
   Nav behavior, mobile menu, scroll reveal, before/after slider, quote form. */
(function () {
  "use strict";

  /* ---- current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- sticky header: shrink on scroll + reveal on any upward scroll ---- */
  var header = document.getElementById("siteHeader");
  var lastScrolled = false;
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    var scrolled = y > 24;
    if (scrolled !== lastScrolled) {
      header.classList.toggle("scrolled", scrolled);
      lastScrolled = scrolled;
    }
    // Reveal on ANY upward scroll; hide when scrolling down past the header.
    var menuOpen = menu && menu.classList.contains("open");
    if (menuOpen || y <= 24) {
      header.classList.remove("nav-hidden");
    } else if (y > lastY + 2) {
      header.classList.add("nav-hidden");     // scrolling down
    } else if (y < lastY) {
      header.classList.remove("nav-hidden");   // scrolling up (even a few px)
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  var menuClose = document.getElementById("menuClose");
  var scrim = document.getElementById("mobileScrim");
  var mainEl = document.getElementById("main");
  var footerEl = document.querySelector(".site-footer");
  var DESKTOP_MQ = window.matchMedia("(min-width: 981px)");

  // Elements outside the drawer to make inert / aria-hidden while it's open.
  var backgroundEls = [mainEl, footerEl].filter(Boolean);

  function focusableIn(container) {
    return Array.prototype.slice.call(container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
    });
  }

  function setBackgroundInert(on) {
    backgroundEls.forEach(function (el) {
      if (on) {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("inert", "");
      } else {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("inert");
      }
    });
  }

  // Keep the closed drawer out of the tab order (and hidden from AT) so Tab
  // can't reach its off-canvas links.
  function setMenuTabbable(on) {
    menu.querySelectorAll("a, button").forEach(function (el) {
      if (on) el.removeAttribute("tabindex");
      else el.setAttribute("tabindex", "-1");
    });
  }

  function setMenu(open) {
    var wasOpen = menu.classList.contains("open");
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    // Scroll-lock via overflow:hidden on <body> ONLY. This freezes the page at
    // its current position with NO jump-to-top. (Setting overflow on <html>/the
    // scrolling element collapses the scroll offset and shifts the page, so we
    // must not touch it.)
    document.body.style.overflow = open ? "hidden" : "";
    // The single, always-available close control is the in-drawer X button
    // (#menuClose), which lives inside the position:fixed drawer — the top-most
    // layer — so it is on-screen whenever the menu is open, at ANY scroll
    // position. The header (and its hamburger) is redundant while open and, once
    // <body> is locked, would stop sticking and drift off-screen anyway; hide it
    // so there is never a second, competing close control.
    header.style.visibility = open ? "hidden" : "";
    setMenuTabbable(open);
    setBackgroundInert(open);
    if (scrim) {
      if (open) {
        scrim.hidden = false;
        // force reflow so the opacity transition runs
        void scrim.offsetWidth;
        scrim.classList.add("open");
      } else {
        scrim.classList.remove("open");
        setTimeout(function () { if (!menu.classList.contains("open")) scrim.hidden = true; }, 420);
      }
    }
    if (open) {
      var f = focusableIn(menu);
      if (f.length) f[0].focus({ preventScroll: true });
    } else if (wasOpen) {
      // Return focus to the toggle after closing.
      if (toggle) toggle.focus();
    }
  }

  if (toggle && menu) {
    setMenuTabbable(false); // start closed → not tabbable
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    if (menuClose) menuClose.addEventListener("click", function () { setMenu(false); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (!menu.classList.contains("open")) return;
      if (e.key === "Escape") { setMenu(false); return; }
      if (e.key === "Tab") {
        // Trap Tab within the drawer.
        var f = focusableIn(menu);
        if (!f.length) { e.preventDefault(); return; }
        var first = f[0], last = f[f.length - 1];
        var active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !menu.contains(active)) { e.preventDefault(); last.focus(); }
        } else {
          if (active === last || !menu.contains(active)) { e.preventDefault(); first.focus(); }
        }
      }
    });
    // Reset drawer + toggle state when crossing into desktop widths.
    DESKTOP_MQ.addEventListener("change", function (e) {
      if (e.matches && menu.classList.contains("open")) setMenu(false);
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- before / after slider ---- */
  var widget = document.getElementById("baWidget");
  var before = document.getElementById("baBefore");
  var handle = document.getElementById("baHandle");
  var range = document.getElementById("baRange");
  if (widget && before && handle && range) {
    function setPos(pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.width = pct + "%";
      handle.style.left = pct + "%";
      range.value = pct;
    }
    range.addEventListener("input", function () { setPos(parseFloat(range.value)); });
    function pointerMove(e) {
      var rect = widget.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setPos((x / rect.width) * 100);
    }
    var dragging = false;
    widget.addEventListener("pointerdown", function (e) {
      dragging = true; pointerMove(e); range.focus();
    });
    window.addEventListener("pointermove", function (e) { if (dragging) pointerMove(e); });
    window.addEventListener("pointerup", function () { dragging = false; });
    setPos(50);
  }

  /* ---- quote form (concept — validates, does not transmit) ---- */
  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var valid = input.value.trim() !== "";
        if (field) field.classList.toggle("invalid", !valid);
        if (!valid && ok) { input.focus(); }
        if (!valid) ok = false;
      });
      if (!ok) {
        note.textContent = "Please fill in the highlighted fields so we can get back to you.";
        note.style.color = "#7c2c2a";
        return;
      }
      var name = form.querySelector("#q-name").value.trim().split(" ")[0];
      note.textContent = "Thanks" + (name ? ", " + name : "") + "! In the live site this reaches the shop. For now, call (225) 644-3535 to get started.";
      note.style.color = "#5b7a3a";
      form.querySelectorAll("input, select, textarea").forEach(function (el) { el.disabled = true; });
      form.querySelector("button[type=submit]").disabled = true;
    });
    /* clear invalid state on input */
    form.querySelectorAll("[required]").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field && input.value.trim() !== "") field.classList.remove("invalid");
      });
    });
  }
})();
