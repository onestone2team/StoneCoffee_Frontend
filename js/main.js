window.addEventListener('load', function () {
    show_product_list()
});

async function show_product_list() {
    const response = await fetch(`${BACK_END_URL}/product/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        
        var products = document.getElementById("products");
        for (i = 0; i < 8; i++) {
            const product = document.createElement('p')
            product.setAttribute("class", "aa-product-catg","style","max-width: 150; height: 150;")
            product.innerHTML = `<li>
            <figure>
                  <a  id="img" class="aa-product-img" href="product-detail.html?product_id=${data["data"]["coffee"][i]["id"]}"><img style="max-width: 100%; height: 100%;" src="${BACK_END_URL}${data["data"]["coffee"][i]["image"]}" alt="${data["data"]["coffee"][i]["id"]}"></a>
              <a class="aa-add-to-cart-btn" onclick="like()">좋아요</a>
                <figcaption>
                    <h4 class="aa-product-title">${data["data"]["coffee"][i]["product_name"]}</h4>
                    <span class="aa-product-price">${data["data"]["coffee"][i]["price"]}원</span><span class="aa-product-price"></span>
                </figcaption>
            </figure>
          </li>`
                products.appendChild(product)
            }
        })
}
async function like() {
    const response = await fetch(`${BACK_END_URL}/product/like/`, {

        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })


    if (response.status == 200 || response.status == 202) {
        alert("좋아요에 등록되었습니다.")
        location.reload();
    }
    else if (response.status == 401) {
        alert("로그인을 해주세요")
        }
    
   
}

