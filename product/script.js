fetch("../data/products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (product) {
    let products = document.querySelector("#data-output");

    let output = "";
    for (let item of product) {
      output += `

        <div class="post-top">
        <div class="image-thumbnail">
            <img src="${item.thumbnail}" alt="${item.title}" />
        </div>
        <div class="harga">
            <h2>
                Rp ${
                  (item.price * 14000) // 1 dollar = 14.000 jadi dikali
                    .toString() // dijadikan string
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // regex setelah angka 3 isi titik
                }
            </h2>
            <button class="text-xl btn" id="btn">
                <i class="fa-solid fa-cart-plus"></i>
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        <div class="category-name text-xl">
            <h2>${item.title}</h2>
        </div>
        <div class="cate">
            <ul>
                <li><a href="#">${item.categories[0]}</a></li>
                <li><a href="#">${item.categories[1]}</a></li>
            </ul>
        </div>
        
    </div> 

      `;
    }

    products.innerHTML = output;
  });
