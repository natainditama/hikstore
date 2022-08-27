import Auth from "./auth.js";
import { select, addEvent } from "./utils.js";

const auth = new Auth();
auth.init();

addEvent("submit", ".form-register", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  formData = Object.fromEntries(formData);
  if (formData.password === formData.confirm) {
    auth.register();
  } else {
    alert("Passwords do not match");
  }
});

addEvent("submit", ".form-login", (e) => {
  e.preventDefault();
  auth.login();
});

addEvent(
  "click",
  ".btn-menu",
  function () {
    const sidebar = select("#side-bar");
    if (sidebar) sidebar.classList.toggle("is-open");
    toggleMenuIcons();
  },
  true
);

addEvent(
  "click",
  ".logout",
  function () {
    if (auth.profile) {
      const confirm = window.confirm("Are you sure to logout?");
      if (confirm) auth.logout();
    } else {
      window.location.href = "/auth/login.html";
    }
  },
  true
);

const navLinks = select(".nav-link", true);
if (navLinks) {
  navLinks.forEach(function (item) {
    const location = window.location.pathname;
    const route = item.getAttribute("href");
    if (location == route) item.classList.add("current");
  });
}

const links = select(".link", true);
if (links) {
  links.forEach(function (item) {
    const location = window.location.pathname;
    const route = item.getAttribute("href");
    if (location == route) item.classList.add("current");
  });
}

function toggleMenuIcons() {
  const menuIcons = select(".menu-icon", true);
  const sidebar = select("#side-bar");
  if (menuIcons && sidebar) {
    if (sidebar.classList.contains("is-open")) {
      menuIcons.forEach(function (menu) {
        menu.classList.add("is-open");
      });
    } else {
      menuIcons.forEach(function (menu) {
        menu.classList.remove("is-open");
      });
    }
  }
}

console.log("Loaded");
