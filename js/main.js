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
    const menuIcon = select(".menu-icon", false, this);
    menuIcon.classList.toggle("is-open");
    const sidebar = select("#side-bar");
    if (sidebar) sidebar.classList.toggle("is-open");
  },
  true
);

addEvent("click", ".logout", function () {
  const confirm = window.confirm("Are you sure to logout?");
  if (confirm) auth.logout();
});

const navLinks = select(".nav-link", true);
if (navLinks) {
  navLinks.forEach(function (item) {
    const location = window.location.pathname;
    const route = item.getAttribute("href");
    if (location == route) item.classList.add("current");
  });
}

console.log("Loaded");
