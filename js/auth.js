import { select } from "./utils.js";

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
      if (select("nav.is-auth")) select("nav.is-auth").style.display = "flex";
      if (select("nav.not-auth")) select("nav.not-auth").style.display = "none";
      if (select("#app-bar")) select("#app-bar").classList.add("sm-block");
      if (select("#header")) select("#header").classList.add("sm-hidden");
      if (select(".user-email")) {
        select(".user-email").textContent = this.profile.email;
      }
    } else {
      if (select("nav.not-auth")) select("nav.not-auth").style.display = "flex";
      if (select("nav.is-auth")) select("nav.is-auth").style.display = "none";
      if (select("#app-bar")) select("#app-bar").classList.remove("sm-block");
      if (select("#header")) select("#header").classList.remove("sm-hidden");
      if (select(".user-email")) {
        select(".user-email").textContent = "";
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
      this.profile = this.values;
      console.log(this.values);
      this.setUsers(this.currentUser, [this.values]);
      this.setUsers(this.listUser, this.users);
      window.location.replace("/");
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
