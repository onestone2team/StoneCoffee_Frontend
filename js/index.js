payload = localStorage.getItem("payload")
parsed_payload = JSON.parse(payload)

adminCheck = false


function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    for (i=0;i<cookie.length;i++){
        cookie[i] = cookie[i].replace(' ','')
        var dic = cookie[i].split('=');
        if (key == dic[0]){
            result = dic[1];
            return dic[1]
        }
    }
    return false
}

window.addEventListener('load', function () {
    $("#headers").load("header.html");
    checkCookie = getCookie('guestCheck')
    if (checkCookie!='True'){
        location.replace('survey.html')
    }

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
                  <a id="img" class="aa-product-img" href="product-detail.html?product_id=${data["data"]["coffee"][i]["id"]}"><img style="max-width: 100%; height: 100%;" src="${BACK_END_URL}${data["data"]["coffee"][i]["image"]}" alt="${data["data"]["coffee"][i]["id"]}"></a>
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

// checkout
async function checkout() {
    const response = await fetch(`${BACK_END_URL}/product/cart`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
}

