/* MARÉE — interface behaviour.
   Plain ES2019, no build step. data.js must load first. */

(function () {
  "use strict";

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var money = function (n) { return "$" + n.toFixed(2); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var bySku = function (sku) {
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].sku === sku) return PRODUCTS[i]; }
    return null;
  };
  var depthLabel = function (d) { return d === 0 ? "0 m" : "−" + d + " m"; };

  /* --- Header ------------------------------------------------------------ */

  function initHeader() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var nav = $("#primary-nav");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("is-open", !open);
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
        }
      });
    }
  }

  /* --- Scroll reveals ---------------------------------------------------- */

  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* --- Bag --------------------------------------------------------------- */

  var STORE = "maree-bag";
  var bag = [];

  function loadBag() {
    try {
      var raw = localStorage.getItem(STORE);
      bag = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(bag)) bag = [];
    } catch (err) { bag = []; }
    bag = bag.filter(function (l) { return bySku(l.sku); });
  }

  function saveBag() {
    try { localStorage.setItem(STORE, JSON.stringify(bag)); } catch (err) { /* private mode */ }
  }

  function bagCount() {
    return bag.reduce(function (n, l) { return n + l.qty; }, 0);
  }

  function bagTotal() {
    return bag.reduce(function (n, l) {
      var p = bySku(l.sku);
      return n + (p ? p.price * l.qty : 0);
    }, 0);
  }

  function addToBag(sku, qty) {
    var line = null;
    for (var i = 0; i < bag.length; i++) { if (bag[i].sku === sku) line = bag[i]; }
    if (line) { line.qty += qty || 1; }
    else { bag.push({ sku: sku, qty: qty || 1 }); }
    saveBag();
    renderBag();
    bump();
    var p = bySku(sku);
    toast(p ? p.name + " added" : "Added to bag");
  }

  function setQty(sku, qty) {
    bag = bag.reduce(function (out, l) {
      if (l.sku === sku) { if (qty > 0) { l.qty = qty; out.push(l); } }
      else { out.push(l); }
      return out;
    }, []);
    saveBag();
    renderBag();
  }

  function bump() {
    var btn = $(".bag-btn");
    if (!btn) return;
    btn.classList.remove("is-bumped");
    void btn.offsetWidth;
    btn.classList.add("is-bumped");
  }

  function renderBag() {
    var count = bagCount();
    $$(".bag-btn__count").forEach(function (el) { el.textContent = String(count); });

    var body = $("#bag-body");
    var foot = $("#bag-foot");
    if (!body || !foot) return;

    if (!bag.length) {
      body.innerHTML =
        '<div class="drawer__empty">' +
          "<p>Your bag is empty.</p>" +
          '<a class="btn btn--solid" href="shop.html">Browse the index</a>' +
        "</div>";
      foot.hidden = true;
      return;
    }

    foot.hidden = false;
    body.innerHTML = bag.map(function (l) {
      var p = bySku(l.sku);
      return (
        '<div class="line" data-sku="' + esc(p.sku) + '">' +
          '<img src="' + esc(p.images[0]) + '" alt="" loading="lazy">' +
          "<div>" +
            '<div class="line__name">' + esc(p.name) + "</div>" +
            '<div class="line__meta">' + depthLabel(p.depth) + " &middot; " + esc(p.size) + "</div>" +
            '<div class="line__row">' +
              '<span class="qty">' +
                '<button type="button" data-step="-1" aria-label="Remove one ' + esc(p.name) + '">&minus;</button>' +
                "<span>" + l.qty + "</span>" +
                '<button type="button" data-step="1" aria-label="Add one ' + esc(p.name) + '">+</button>' +
              "</span>" +
              '<span class="line__price">' + money(p.price * l.qty) + "</span>" +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    var total = bagTotal();
    $("#bag-total").textContent = money(total);
    $("#bag-ship").textContent = total >= 150
      ? "Shipping included. Dispatched from Roscoff within two working days."
      : "Add " + money(150 - total) + " for complimentary shipping.";
  }

  /* --- Drawer ------------------------------------------------------------ */

  var lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    $(".drawer").classList.add("is-open");
    $(".scrim").classList.add("is-open");
    $(".drawer").setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    var close = $("#bag-close");
    if (close) close.focus();
  }

  function closeDrawer() {
    $(".drawer").classList.remove("is-open");
    $(".scrim").classList.remove("is-open");
    $(".drawer").setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function initDrawer() {
    if (!$(".drawer")) return;

    $$(".bag-btn").forEach(function (b) { b.addEventListener("click", openDrawer); });
    var close = $("#bag-close");
    if (close) close.addEventListener("click", closeDrawer);
    $(".scrim").addEventListener("click", closeDrawer);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && $(".drawer").classList.contains("is-open")) closeDrawer();
    });

    $("#bag-body").addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-step]");
      if (!btn) return;
      var sku = btn.closest(".line").getAttribute("data-sku");
      var line = null;
      for (var i = 0; i < bag.length; i++) { if (bag[i].sku === sku) line = bag[i]; }
      if (line) setQty(sku, line.qty + Number(btn.getAttribute("data-step")));
    });

    var checkout = $("#bag-checkout");
    if (checkout) {
      checkout.addEventListener("click", function () {
        toast("Checkout is not wired up in this demo");
      });
    }
  }

  /* --- Toast ------------------------------------------------------------- */

  var toastTimer = null;

  function toast(message) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-open");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-open"); }, 2600);
  }

  /* --- Card markup ------------------------------------------------------- */

  function cardHTML(p) {
    return (
      '<article class="card reveal">' +
        '<div class="card__media">' +
          '<span class="card__tag">' + depthLabel(p.depth) + "</span>" +
          '<img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" loading="lazy">' +
          '<img src="' + esc(p.images[1]) + '" alt="" aria-hidden="true" loading="lazy">' +
          '<button class="card__quick" type="button" data-add="' + esc(p.sku) + '">Add to bag &mdash; ' + money(p.price) + "</button>" +
        "</div>" +
        '<div class="card__body">' +
          '<a class="card__name" href="product.html?sku=' + esc(p.sku) + '">' + esc(p.name) + "</a>" +
          '<span class="card__price">' + money(p.price) + "</span>" +
          '<span class="card__meta">' + esc(p.active) + "</span>" +
        "</div>" +
      "</article>"
    );
  }

  function wireQuickAdd(root) {
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-add]");
      if (!btn) return;
      e.preventDefault();
      addToBag(btn.getAttribute("data-add"), 1);
    });
  }

  /* --- Depth index (home) ------------------------------------------------ */

  function initDepthIndex() {
    var list = $("#depth-list");
    if (!list) return;

    var sorted = PRODUCTS.slice().sort(function (a, b) { return a.depth - b.depth; });
    var flip = 5; /* below −40 m the column stops carrying usable light, and the type inverts */

    /* The light ramp. Row i is painted RAMP[i] → RAMP[i+1], so the bands butt
       together into a continuous column while each row's own contrast stays
       fixed regardless of how tall the section happens to be. The step across
       the thermocline is the one that falls off a cliff — that is the point. */
    var RAMP = ["#EDF1F0", "#E4ECEB", "#D6E2E1", "#C4D5D6", "#B0C6C8", "#9DB8BC",
                "#1D525E", "#17454F", "#103440", "#08171C"];

    var band = function (a, b) { return "linear-gradient(180deg," + a + "," + b + ")"; };

    var html = sorted.map(function (p, i) {
      var deep = i >= flip;
      /* one extra ramp index is consumed by the thermocline block itself */
      var top = deep ? RAMP[i + 1] : RAMP[i];
      var bottom = deep ? RAMP[i + 2] : RAMP[i + 1];

      var row =
        '<a class="depth-row' + (deep ? " is-deep" : "") + ' reveal" href="product.html?sku=' + esc(p.sku) +
            '" style="background:' + band(top, bottom) + '">' +
          '<span class="depth-row__inner">' +
            '<span class="depth-row__depth">' + depthLabel(p.depth) + "</span>" +
            "<span>" +
              '<span class="depth-row__name">' + esc(p.name) + "</span>" +
              '<span class="depth-row__zone">' + esc(p.zone) + " &middot; " + esc(p.family) + "</span>" +
            "</span>" +
            '<span class="depth-row__active">' + esc(p.active) +
              '<span class="gauge" aria-hidden="true"><span class="gauge__pin" style="left:' +
                (p.depth / 180 * 100).toFixed(1) + '%"></span></span>' +
            "</span>" +
            '<span class="depth-row__price">' + money(p.price) + " &middot; " + esc(p.size) + "</span>" +
            '<span class="depth-row__thumb"><img src="' + esc(p.images[0]) + '" alt="" loading="lazy"></span>' +
          "</span>" +
        "</a>";

      if (i === flip) {
        row =
          '<div class="thermocline reveal" style="background:' + band(RAMP[flip], RAMP[flip + 1]) + '">' +
            '<div class="thermocline__inner">' +
              '<span class="mono">Thermocline &middot; light falls below 1% of surface</span>' +
            "</div>" +
          "</div>" + row;
      }
      return row;
    }).join("");

    list.innerHTML = html;
  }

  /* --- Home: featured + journal ------------------------------------------ */

  function initHome() {
    var journal = $("#journal-list");
    if (journal) {
      journal.innerHTML = JOURNAL.map(function (j) {
        return (
          '<a class="entry reveal" href="#">' +
            '<div class="entry__media"><img src="' + esc(j.image) + '" alt="" loading="lazy"></div>' +
            '<span class="mono" style="display:block;margin-top:16px;opacity:.62">' + esc(j.tag) + " &middot; " + esc(j.date) + "</span>" +
            "<h3>" + esc(j.title) + "</h3>" +
            "<p>" + esc(j.excerpt) + "</p>" +
          "</a>"
        );
      }).join("");
    }

    var cond = $("#conditions");
    if (cond) {
      cond.innerHTML =
        '<span class="readout__dot" aria-hidden="true"></span>' +
        [
          ["Harvest site", conditions.site],
          ["Water", conditions.temp],
          ["Salinity", conditions.salinity],
          ["Tide", conditions.tide]
        ].map(function (pair) {
          return '<span class="readout__item"><span class="readout__k">' + esc(pair[0]) +
                 '</span><span class="readout__v">' + esc(pair[1]) + "</span></span>";
        }).join("");
    }
  }

  /* --- Shop -------------------------------------------------------------- */

  function initShop() {
    var grid = $("#shop-grid");
    if (!grid) return;

    var state = { family: "All", sort: "depth" };

    function render() {
      var list = PRODUCTS.filter(function (p) {
        return state.family === "All" || p.family === state.family;
      });

      list.sort(function (a, b) {
        if (state.sort === "price-asc") return a.price - b.price;
        if (state.sort === "price-desc") return b.price - a.price;
        if (state.sort === "name") return a.name.localeCompare(b.name);
        return a.depth - b.depth;
      });

      grid.innerHTML = list.length
        ? list.map(cardHTML).join("")
        : '<p class="empty-state">Nothing filed under that heading yet.</p>';

      var count = $("#result-count");
      if (count) {
        count.textContent = list.length + (list.length === 1 ? " formulation" : " formulations");
      }
      initReveals();
    }

    $$(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.family = chip.getAttribute("data-family");
        $$(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        render();
      });
    });

    var sort = $("#sort");
    if (sort) {
      sort.addEventListener("change", function () {
        state.sort = sort.value;
        render();
      });
    }

    wireQuickAdd(grid);
    render();
  }

  /* --- Product detail ---------------------------------------------------- */

  function initProduct() {
    var root = $("#pdp");
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var p = bySku(params.get("sku")) || bySku("MR-005");
    document.title = p.name + " — MARÉE";

    $("#pdp-crumb").textContent = p.name;
    $("#pdp-eyebrow").textContent = p.sku + " · " + p.zone + " · filed at " + depthLabel(p.depth);
    $("#pdp-title").textContent = p.name;
    $("#pdp-price").textContent = money(p.price);
    $("#pdp-size").textContent = p.size + " · " + p.texture;
    $("#pdp-short").textContent = p.short;
    $("#pdp-long").textContent = p.long;
    $("#pdp-use").textContent = p.use;
    $("#pdp-ing").textContent = p.ingredients;

    $("#pdp-actives").innerHTML = p.actives.map(function (a) {
      return (
        '<div class="active-row">' +
          "<dt>" + esc(a.pct) + "</dt>" +
          "<dd>" + esc(a.name) + " <em>&mdash; " + esc(a.note) + "</em></dd>" +
        "</div>"
      );
    }).join("");

    $("#pdp-spec").innerHTML = [
      ["Filed at", depthLabel(p.depth) + " · " + p.zone],
      ["Principal active", p.active],
      ["pH", p.ph.toFixed(1)],
      ["Texture", p.texture],
      ["Volume", p.size],
      ["Batch", p.batch],
      ["Annual yield", p.yield]
    ].map(function (r) {
      return "<tr><th scope=\"row\">" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>";
    }).join("");

    var main = $("#gallery-main");
    var thumbs = $("#gallery-thumbs");
    main.src = p.images[0];
    main.alt = p.name;
    thumbs.innerHTML = p.images.map(function (src, i) {
      return '<button type="button" aria-current="' + (i === 0) + '" aria-label="View image ' + (i + 1) + '">' +
             '<img src="' + esc(src) + '" alt="" loading="lazy"></button>';
    }).join("");

    thumbs.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var i = $$("button", thumbs).indexOf(btn);
      main.src = p.images[i];
      $$("button", thumbs).forEach(function (b) { b.setAttribute("aria-current", String(b === btn)); });
    });

    var qty = 1;
    var qtyOut = $("#pdp-qty");
    $$("[data-qstep]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        qty = Math.max(1, Math.min(9, qty + Number(btn.getAttribute("data-qstep"))));
        qtyOut.textContent = String(qty);
      });
    });

    $("#pdp-add").addEventListener("click", function () {
      addToBag(p.sku, qty);
      openDrawer();
    });

    /* Accordion.

       An open panel is held at an explicit pixel height rather than `auto`,
       because `auto` is not an interpolable value — transitioning to it snaps
       instead of animating. Where `auto` is needed to re-measure after a
       resize, the transition is suppressed around it. */

    var measure = function (panel) {
      panel.style.transition = "none";
      var prev = panel.style.height;
      panel.style.height = "auto";
      var h = panel.getBoundingClientRect().height;
      panel.style.height = prev;
      void panel.offsetHeight;
      panel.style.transition = "";
      return h;
    };

    var afterTransition = function (el, fn) {
      var done = function (e) {
        if (e && e.propertyName !== "height") return;
        el.removeEventListener("transitionend", done);
        clearTimeout(el._accTimer);
        fn();
      };
      el.addEventListener("transitionend", done);
      clearTimeout(el._accTimer);
      el._accTimer = setTimeout(done, 600);
    };

    $$(".acc__trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var panel = trigger.nextElementSibling;
        var open = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!open));

        if (open) {
          /* A panel open since page load has no inline height yet */
          panel.style.height = panel.getBoundingClientRect().height + "px";
          void panel.offsetHeight;
          panel.style.height = "0px";
          afterTransition(panel, function () {
            panel.classList.remove("is-open");
            panel.style.height = "";  /* 0px → 0, same value, starts nothing */
          });
        } else {
          var target = panel.firstElementChild.getBoundingClientRect().height;
          panel.classList.add("is-open");
          panel.style.height = "0px";
          void panel.offsetHeight;
          panel.style.height = target + "px";
        }
      });
    });

    /* Text reflows at a new width, so re-measure whatever is open */
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        $$(".acc__panel.is-open").forEach(function (panel) {
          panel.style.height = measure(panel) + "px";
        });
      }, 150);
    });

    /* Three others, nearest in depth */
    var related = PRODUCTS
      .filter(function (o) { return o.sku !== p.sku; })
      .sort(function (a, b) { return Math.abs(a.depth - p.depth) - Math.abs(b.depth - p.depth); })
      .slice(0, 3);

    var relGrid = $("#related-grid");
    relGrid.innerHTML = related.map(cardHTML).join("");
    wireQuickAdd(relGrid);
  }

  /* --- Newsletter -------------------------------------------------------- */

  function initSignup() {
    var form = $("#signup");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("input[type=email]", form);
      toast("Subscribed — " + input.value);
      form.reset();
    });
  }

  /* --- Boot -------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    var year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    loadBag();
    initHeader();
    initDrawer();
    initDepthIndex();
    initHome();
    initShop();
    initProduct();
    initSignup();
    renderBag();
    initReveals();
  });
})();
