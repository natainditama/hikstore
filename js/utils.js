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

const getRandomAvatar = async () => {
  const url = "https://randomuser.me/api/";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

const getAllProduct = (target = "#products", total = 8) => {
  fetch("/data/products.json")
    .then((res) => res.json())
    .then(function (data) {
      const element = select(target, false);
      if (element) {
        for (let i = 0; i < total; i++) {
          element.insertAdjacentHTML(
            "beforeend",
            `<div class="flex-col gap-4">
                <div class="thumbnail">
                  <img
                    src="${data[i].thumbnail}"
                    class="front"
                    alt="${data[i].title}"
                    srcset="${data[i].thumbnail}"
                  />
                  <img
                    src="${data[i].images[0]}"
                    class="back"
                    alt="${data[i].title}"
                    srcset="${data[i].images[0]}"
                  />
                  <button class="btn-wish text-xl"></button>
                  <button class="btn-cart flex-row text-sm px-4 py-2">
                    Add to Cart
                  </button>
                </div>
                <div class="flex-col gap-2 px-2">
                  <div class="flex-row flex-wrap gap-x-2">
                    ${data[i].categories
                      .map(function (category) {
                        return `<a href="#">${category}</a>`;
                      })
                      .join("")}
                  </div>
                  <a href="#" class="-mt-1">
                    <h2 class="text-xl">${data[i].title}</h2>
                  </a>
                  <span class="font-medium">IDR ${
                    (data[i].price * 14000) // 1 dollar = 14.000 jadi dikali
                      .toString() // dijadikan string
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // regex setelah angka 3 isi titik
                  } </span>
                </div>
              </div>`
          );
        }
      }
    });
};

export { select, addEvent, getRandomAvatar, getAllProduct };
