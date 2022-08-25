import { select, getRandomAvatar } from "./utils.js";

class Auth {
  constructor() {
    this.listUser = "list-user";
    this.currentUser = "current-user";
    this.users = this.getUsers(this.listUser);
    this.profile = this.getUsers(this.currentUser)[0];
    this.values = {
      email: "",
      password: "",
    };
  }
  init() {
    this.profile = this.getUsers(this.currentUser)[0];
    if (!!this.profile) {
      if (select("#app-bar")) select("#app-bar").classList.add("sm-block");
      if (select("#side-bar")) select("#side-bar").classList.add("auth");
      if (select("#header")) select("#header").classList.add("sm-hidden");
      if (select(".user-email")) {
        select(".user-email").textContent = this.profile.email;
      }
      if (select(".user-profile")) {
        getRandomAvatar().then(function (data) {
          const {
            picture: { thumbnail },
          } = data.results[0];
          const userProfiles = select(".user-profile", true);
          userProfiles.map(function (profile) {
            profile.innerHTML = `<img src="${thumbnail}" class="w-10 h-10 rounded-full" alt="" />`;
          });
        });
      }
      if (select(".not-auth")) {
        const notAuths = select(".not-auth", true);
        notAuths.map(function (element) {
          element.classList.add("hidden");
        });
      }
      if (select(".is-auth")) {
        const notAuths = select(".not-auth", true);
        notAuths.map(function (element) {
          element.classList.remove("hidden");
        });
      }
      if (window.location.pathname.includes("auth"))
        window.location.replace("/");
    } else {
      if (select("#app-bar")) select("#app-bar").classList.remove("sm-block");
      if (select("#side-bar")) select("#side-bar").classList.remove("auth");
      if (select("#header")) select("#header").classList.remove("sm-hidden");
      if (select(".user-email")) {
        select(".user-email").textContent = "";
      }
      if (select(".user-profile")) {
        const userProfiles = select(".user-profile", true);
        userProfiles.map(function (profile) {
          profile.innerHTML = `<i class="fa-regular fa-user"></i>`;
        });
      }

      if (select(".not-auth")) {
        const notAuths = select(".not-auth", true);
        notAuths.map(function (element) {
          element.classList.remove("hidden");
        });
      }
      if (select(".is-auth")) {
        const notAuths = select(".not-auth", true);
        notAuths.map(function (element) {
          element.classList.add("hidden");
        });
      }
    }
  }
  login() {
    this.values = this.getValues();
    this.users = this.getUsers(this.listUser);
    const user = this.users.find((user) => {
      return (
        user.email === this.values.email &&
        user.password === this.values.password
      );
    });
    if (user) {
      this.profile = user;
      this.setUsers(this.currentUser, [user]);
      window.location.replace("/");
    } else {
      alert("Invalid user or password");
    }
  }
  logout() {
    this.profile = [];
    localStorage.removeItem(this.currentUser);
    this.init();
  }
  register() {
    this.values = this.getValues();
    this.users = this.getUsers(this.listUser);
    const userExists = this.users.filter((user) => {
      return (
        user.email === this.values.email && user.password === this.values.email
      );
    });

    if (!!userExists) {
      this.users.push(this.values);
      this.setUsers(this.listUser, this.users);
      window.location.replace("/auth/login.html");
    } else {
      alert("User is already exists");
    }
  }
  getUsers(itemUser) {
    return JSON.parse(window.localStorage.getItem(itemUser)) || [];
  }
  setUsers(itemUser, data) {
    localStorage.setItem(itemUser, JSON.stringify(data));
  }
  getValues() {
    const values = {
      email: document.querySelector('[name="email"]').value || "",
      password: document.querySelector('[name="password"]').value || "",
    };
    return values;
  }
}

export default Auth;
