window.addEventListener('load', function() {
    $("#headers").load("header.html");
    show_product_list()
});
const urlparams = new URLSearchParams(window.location.search);
const category_id= urlparams.get('id')
const titlename = document.getElementById("titlename")
current_page = 1


if (category_id==1){
    titlename.innerText= "모든 원두 커피"
} else if (category_id==2){
    titlename.innerText= "스톤커피 굿즈"      
} else if (category_id==3){
    titlename.innerText= "커피용품"
} else if (category_id==4){
    titlename.innerText= "바디감"
} else if (category_id==5){
    titlename.innerText= "산미"
}

async function show_product_list() {
    const response = await fetch(`${BACK_END_URL}/product/category/?category_id=${category_id}&page=${current_page}`, {
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
        console.log(data)
        var pagenums =document.getElementById("pagenums");
        $("#pagenums").empty();
        console.log(data["page"]["total_page"])
        for(i=1; i<data["data"].length; i++){
            const pagenum = document.createElement('span')
            pagenum.innerHTML=`<span>${data["data"].length}</span>`

            pagenums.appendChild(pagenum)
        }
    })

    
}

function pageNext1() {
    console.log(current_page)
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

async function cart() {
    const response = await fetch(`${BACK_END_URL}/product/${product_id}/cart/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
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
            "Authorization": "Bearer " + localStorage.getItem("access")
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