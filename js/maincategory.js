window.addEventListener('load', function() {
    show_product_list()
});
const urlparams = new URLSearchParams(window.location.search);
const category_id= urlparams.get('id')
// console.log(category_id)

async function show_product_list() {
    const response = await fetch(`${BACK_END_URL}/product/category/?category_id=${category_id}`, {
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
        // console.log(data)
        var products = document.getElementById("products");
        // $("#products").empty();
        for (i = 0; i < 8; i++) {
            const product = document.createElement('p')
            // product.setAttribute("class", "aa-product-catg","style","max-width: 150; height: 150;")
            // console.log(category_id)
            // console.log(data["data"][0]["id"])
            product.innerHTML = `<li>
            <figure>
              <a  id="img" class="aa-product-img" href="product-detail.html?product_id=${data["data"][i]["id"]}/"><img style="max-width: 100%; height: 100%;" src="${BACK_END_URL}${data["data"][i]["image"]}" alt="${data["data"][i]["id"]}"></a>
              <a class="aa-add-to-cart-btn" onclick="cart()">장바구니 담기</a>
              <a class="aa-add-to-cart-btn" onclick="like()">좋아요</a>
                <figcaption>
                    <h4 class="aa-product-title">${data["data"][i]["product_name"]}</h4>
                    <span class="aa-product-price">${data["data"][i]["price"]}원</span>
                </figcaption>
            </figure>                        
          </li>`
            products.appendChild(product)
            total_page = data["max_page"]
        }

    })
}
async function cart() {
    console.log(product_id)
    console.log(id)
    const response = await fetch(`${BACK_END_URL}/product/${product_id}/cart/`, {
        headers: {
            "content-type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })  


    if (response.status==200 || response.status==202){
        alert("장바구니에 담겼습니다.")
        location.reload();
    }
    else if(response.status==401){
        alert("로그인을 해주세요")
        }
    
   
}
async function like() {
    
    const response = await fetch(`${BACK_END_URL}/product/${product_id}/like/`, {
        headers: {
            "content-type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })


    if (response.status==200 || response.status==202){
        alert("좋아요에 등록되었습니다.")
        location.reload();
    }
    else if(response.status==401){
        alert("로그인을 해주세요")
        }
    
   
}
function pageNext1() {
    console.log(total_page)
    if (pageNum > 0 && pageNum < total_page) {
        ++pageNum
        show_product_list()
    }
}

function pagePreview1() {
    if (pageNum > 1) {
        --pageNum
        show_product_list()
    }
}