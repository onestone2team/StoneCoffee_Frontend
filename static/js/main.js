window.addEventListener('load', function() {
    show_product_list()
});
pageNum = 1

async function show_product_list() {
    const response = await fetch(`${BACK_END_URL}/product/`, {
        headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true,
            // "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT,PATCH",
            'content-type': 'application/json'
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        var products = document.getElementById("products");
        // $("#products").empty();
        for (i = 0; i < 8; i++) {
            const product = document.createElement('p')
            // product.setAttribute("class", "aa-product-catg","style","max-width: 150; height: 150;")
            product.innerHTML = `<li>
            <figure>
              <a class="aa-product-img" href="product-detail.html?${data["data"][i]['id']}/view/"><img style="max-width: 100%; height: 100%;" src="${BACK_END_URL}${data["data"][i]["image"]}" alt="${data["data"][i]["id"]}"></a>
              <a class="aa-add-card-btn"href="#">장바구니 담기</a>
                <figcaption>
                    <h4 class="aa-product-title"><a href="#">${data["data"][i]["name"]}</a></h4>
                    <span class="aa-product-price">${data["data"][i]["price"]}원</span><span class="aa-product-price"></span>
                </figcaption>
            </figure>                        
                <div class="aa-product-hvr-content">           
                <a class="aa-add-card-btn"href="#">좋아요</a>
                </div>
          </li>`
            products.appendChild(product)
        }
    })
}

