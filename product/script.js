fetch('../data/products.json')
.then(function(response){
    return response.json()
})


.then(function(product){
    let products = document.querySelector(".sections_group");


    let output = " ";

    for(let item of product){
        output =+ `

        <div class="post-top">
        <div class="color-list">
            <ul>
                <li>
                    <span onclick="getRandomColor()" class="option1">
                    </span>
                </li>
                <li>
                    <span onclick="getRandomColor()" class="option2">
                    </span>
                </li>
                <li>
                    <span onclick="getRandomColor()" class="option3">
                    </span>
                </li>
                <li>
                    <span onclick="getRandomColor()" class="option4">
                    </span>
                </li>
            </ul>
        </div>
        <div class="category-name">
            <h1>${item.title}</h1>
        </div>
        <div class="cate">
            <ul>
                <li><a href="#">${item.categories}</a></li>
                <li><a href="#">${item.categories}</a></li>
            </ul>
        </div>
        <div class="harga">
            <h2>
                ${item.price}
            </h2>
        </div>
    </div> 

      `
        

    }

   products.innerHTML = output
})
