let urlParameter = window.location.search;
var product_id1 = urlParameter.split('=')[1]
var product_id = product_id1.split('/')[0]

//=======게시글 불러오기========
window.onload = async function ProductDetail() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    console.log(product_id+"접속")
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


//========제품 이미지 불러오기========
    product_json = await product.json()
    console.log(product_json.products["id"])
    console.log(product_json)
    const product_image = document.getElementById("productimage")
    product_image.setAttribute("src", `${BACK_END_URL}${product_json.products["image"]}`)
    product_image.setAttribute("style", `width:80%; height:80%;`)
//제품 가격 넣어주는 코드(수량x가격 에필요함)
    
    const totalprice=document.getElementById("quantity")
    totalprice.setAttribute("data-unitprice",`${product_json.products["price"]}`)


    
//이름,가격불러오는 코드
    name2=document.getElementById('name')
    const name1 = document.createElement('p')
    name1.innerHTML=`<h3>${product_json.products["product_name"]}</h3>`
    name2.appendChild(name1)
    //상품 평가 점수 
    if (product_json.products["aroma_grade"] >=1){
        aroma2=document.getElementById('aroma')
        const aroma1 = document.createElement('p')
        aroma1.innerHTML=`<h3>향 ${product_json.products["aroma_grade"]}</h3>`
        aroma2.appendChild(aroma1)

        acidity2=document.getElementById('acidity')
        const acidity1 = document.createElement('p')
        acidity1.innerHTML=`<h3>산미 ${product_json.products["acidity_grade"]}</h3>`
        acidity2.appendChild(acidity1)

        body2=document.getElementById('body')
        const body1 = document.createElement('p')
        body1.innerHTML=`<h3>바디 ${product_json.products["body_grade"]}</h3>`
        body2.appendChild(body1)

        sweet2=document.getElementById('sweet')
        const sweet1 = document.createElement('p')
        sweet1.innerHTML=`<h3>당도 ${product_json.products["sweet_grade"]}</h3>`
        sweet2.appendChild(sweet1)
    }
    // 가격
        price2=document.getElementById('price')
        const price1 = document.createElement('p')
        price1.innerHTML=`<h3>가격 : ${product_json.products["price"]} 원</h3>`
        price2.appendChild(price1)
    //상품 내용 description 
    productinformation2=document.getElementById('description')
    const productinformations2 = document.createElement('p')
    productinformation2.innerHTML=`<h3>${product_json.products["content"]}</h3>`
    productinformation2.appendChild(productinformations2)
    //용량?없는 제품들
    w_option=document.getElementById('option')
    const w_option2 =document.createElement('p')
    console.log("Asd")
    w_option2.innerHTML=`<div class="size">
    <h4>용량 선택</h4>
    <select size="1">
        <option value="1">300g</option>
        <option value="2">500g</option>
            </select>
        </div>`
    w_option.appendChild(w_option2)
    console.log("Asdasd")
    //                      <div class="size">
    //                         <h4>용량 선택</h4>
    //                         <select size="1">
    //                             <option value="1">용</option>
    //                             <option value="2">량</option>
    //                             <option value="3">단</option>
    //                             <option value="4">위</option>
    //                             <option value="5">?</option>
    //                         </select>
    //                     </div>
    
    
    
    
    
    // 추천 상품
    for (i = 0; i < 6; i++) {
        recommend=document.getElementById('recommend')
        const recommends = document.createElement('div')
        recommends.setAttribute("class", `divrecommend`)
        recommends.setAttribute("style", `float: left;width: 250px;`)
        const recommend_image = document.getElementById("recommendimage")
        recommends.innerHTML=`<ui id="header_navi"><li text-align : center;>
        <a href="product-detail.html?product_id=${product_json.recommend[i]["id"]}/"><img  src="${BACK_END_URL}${product_json.recommend[i]["image"]}" ></a>
        <span >${product_json.recommend[i]["product_name"]}</span></li></ui>`
        
        recommend.appendChild(recommends)
    }

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
        location.reload();
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
        location.reload(false);
    }
    else if(response.status==401){
        alert("로그인을 해주세요")
        location.reload(false);
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

                location.reload(true);
            }
    } else{
        alert("주문 옵션을 다시 확인해 주세요")
        location.reload(true);
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

