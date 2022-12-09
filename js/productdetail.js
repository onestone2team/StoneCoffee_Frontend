let urlParameter = window.location.search;
var product_id1 = urlParameter.split('=')[1]
var product_id = product_id1.split('/')[0]

//=======게시글 불러오기========
window.onload = async function ProductDetail() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    // if(!parsed_payload){
    //     alert("권한이 없습니다. 로그인 해주세요")
    //     location.replace("../index.html")
    // }
    // data["data"]["coffee"]["0"]["product_name"]

    const product = await fetch(`${BACK_END_URL}/product/detail/?product_id=${product_id} `, {
        headers: {
            'content-type': 'application/json',
            // "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })


//========제품 정보 불러오기========
    product_json = await product.json()
    console.log(product_json.products["id"])
    console.log(product_json)
    const product_image = document.getElementById("productimage")
    product_image.setAttribute("src", `${BACK_END_URL}${product_json.products["image"]}`)
//이름,가격불러오는 코드
    productinformation=document.getElementById('productinformation')
    const productinformations = document.createElement('p')
    productinformation.innerHTML=`<h3>${product_json.products["product_name"]}</h3>
    <div class="aa-price-block">
      <span class="aa-product-view-price">가격:${product_json.products["price"]}</span>
      <li class="aa-product-view-price">향${product_json.products["aroma_grade"]}</li>
      <li class="aa-product-view-price">당도${product_json.products["sweet_grade"]}</li>
      <li class="aa-product-view-price">산도${product_json.products["acidity_grade"]}</li>
      <li class="aa-product-view-price">무게감${product_json.products["body_grade"]}</li>
    </div>
    </p>`
    productinformation.appendChild(productinformations)
    //상품 내용 description 
    productinformation2=document.getElementById('description')
    const productinformations2 = document.createElement('p')
    productinformation2.innerHTML=`<h3>${product_json.products["content"]}</h3>`
    productinformation2.appendChild(productinformations2)
}



        
async function cart() {
    
    const response = await fetch(`${BACK_END_URL}/product/cart/`, {
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

async function orderButton() {
    
    if (num!=0 && size!=0 && amount_money !=0){

        const url = `${BACK_END_URL}/order/list/${product_id}/`
        console.log(url)
        const response = await fetch(url, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            body: JSON.stringify({
                "price":String(amount_money),
                "size":size,
                "count":String(num)
            })
            })

            if (response.status == 201) {
                alert("주문 완료")
                location.replace("../profile.html")
            }
            else {
                alert(response.status)
            }
    } else{
        alert("주문 옵션을 다시 확인해 주세요")
    }
    
     
}    
//==================================================================    
function selectButton() {
    const select_form = document.getElementById("select_form")
    if (select_form.style.display == 'none') {
        select_form.style.display = 'block';
    } else {
        select_form.style.display = 'none';
    }
}

function changeValue() {
    var value_str = document.getElementById('select_value');
    size = value_str.options[value_str.selectedIndex].text
    // size 값 전달
    var size_text = document.getElementById('size_select');
    size_text.innerText = size;
}

function upButton() {
    num += 1;
    inputnum.innerText = num;
    amount_money = money * num;
    moneynum.innerText = amount_money;
}

function downButton() {
    if (num > 0) {
        num -= 1;
        inputnum.innerText = num;
        amount_money = money * num;
        moneynum.innerText = amount_money;
    }

}

