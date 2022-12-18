window.addEventListener('load', function() {
    show_product_list()
});
const urlparams = new URLSearchParams(window.location.search);
const searchtag= urlparams.get('search')
const titlename = document.getElementById("titlename")
titlename.innerText= `'${searchtag}' 검색 결과입니다.`
current_page = 1
async function show_product_list() {
    const response = await fetch(`${BACK_END_URL}/product/search/?search=${searchtag}&page=${current_page}`, {
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
        $("#products").empty();
        console.log(data)
        for (i = 0; i < data["data"].length; i++) {
            const product = document.createElement('div')
            product.className = "product-layout"
            product.className = "product-layout"
            product.innerHTML = `<li>
                                    <figure>
                                    <a id="img" class="aa-product-img" href="product-detail.html?product_id=${data["data"][i]["id"]}/"><img class="product-image" src="${BACK_END_URL}${data["data"][i]["image"]}" alt="${data["data"][i]["id"]}"></a>
                                        <figcaption>
                                            <h4 class="aa-product-title">${data["data"][i]["product_name"]}</h4>
                                            <span class="aa-product-price">${data["data"][i]["price"]}원</span>
                                        </figcaption>
                                    </figure>
                                </li>`
            products.appendChild(product)
            total_page = data["page"]["total_page"]
        }
    })
}

function pageNext1() {
    if (current_page > 0 && current_page < total_page) {
        ++current_page
        show_product_list()
    }
}

function pagePreview1() {
    if (current_page > 1) {
        --current_page
        show_product_list()
    }
}
