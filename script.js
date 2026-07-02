/* Frederic's Upholstery — redesign concept
   Nav behavior, mobile menu, scroll reveal, before/after slider, quote form. */
(function () {
  "use strict";

  /* ---- current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- sticky header shrink on scroll ---- */
  var header = document.getElementById("siteHeader");
  var lastScrolled = false;
  function onScroll() {
    var scrolled = window.scrollY > 24;
    if (scrolled !== lastScrolled) {
      header.classList.toggle("scrolled", scrolled);
      lastScrolled = scrolled;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
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
