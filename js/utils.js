function select(el, all = false, scope = document) {
  el = el.trim();
  if (all) {
    return [...scope.querySelectorAll(el)];
  } else {
    return scope.querySelector(el);
  }
}

const addEvent = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

const getRandomAvatar = () => {
  const url = "https://randomuser.me/api/";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export { select, addEvent, getRandomAvatar };
