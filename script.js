(function () {
  var root = document.documentElement;

  // Theme toggle (remembers choice; falls back to the system setting)
  var themeBtn = document.getElementById("theme");
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  themeBtn.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Expand / collapse all roles
  var tickets = Array.prototype.slice.call(document.querySelectorAll(".ticket"));
  var toggleBtn = document.getElementById("toggleAll");

  function syncLabel() {
    var allOpen = tickets.every(function (t) { return t.open; });
    toggleBtn.textContent = allOpen ? "Collapse all" : "Expand all";
  }

  toggleBtn.addEventListener("click", function () {
    var allOpen = tickets.every(function (t) { return t.open; });
    tickets.forEach(function (t) { t.open = !allOpen; });
    syncLabel();
  });
  tickets.forEach(function (t) { t.addEventListener("toggle", syncLabel); });
  syncLabel();

  // Open every role when printing or saving as PDF
  window.addEventListener("beforeprint", function () {
    tickets.forEach(function (t) { t.open = true; });
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
