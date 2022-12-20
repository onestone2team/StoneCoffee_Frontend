cartlist = []

// =====장바구니 리스트 불러오기========= //

window.onload = async function checkoutlist() {
    $("#headers").load("header.html");
    const response = await fetch(`${BACK_END_URL}/product/cart`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })
    const response_json = await response.json()
    let product_total_price = 0
    const order_frame = document.getElementById('append-product')
    response_json.forEach(element => {
        const order = document.createElement('div')
        var total_price = element.price * element.count
        cartlist.push(element.id)
        order.setAttribute("class", "basket-product")
        order.innerHTML = `<div>
                                <div id="cart_id" placeholder="${element.id}"></div>
                                <table>
                                    <tr class="inner3">
                                        <td class="img-box"><img src="${BACK_END_URL}${element.product["image"]}"></td>
                                        <td class="product" id="product">${element.product.product_name}</td>
                                        <td class="count" id="count" >${element.count}개</td>
                                        <td class="price" id="price">${total_price}원</td>  
                                    </tr>
                                </table>
                            </div><hr>`
        order_frame.appendChild(order)
        product_total_price = product_total_price + total_price
    }
    )
    calculator(product_total_price)

    // 유저 주소랑 핸드폰번호 불러오기
    const profile = await fetch(`${BACK_END_URL}/mypage/profile/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'GET',
    })

    const profile_json = await profile.json()
    const profile_address = document.getElementById("user_address")
    profile_address.setAttribute("value", profile_json.address)
    const profile_phone = document.getElementById("user_phone")
    profile_phone.setAttribute("value", profile_json.phone)

}//onload끝

// 총 상품 금액 및 배송비 및 결제 금액 계산
async function calculator(product_total_price) {
    let products_price = document.getElementById('products-price')
    products_price.innerText = product_total_price + ' 원'
    let delivery_price = document.getElementById('delivery-price')
    if (product_total_price >= 50000) {
        delivery_price.innerText = 0 + ' 원'
    } else { delivery_price.innerText = 3000 + ' 원' }
    let final_total_price = document.getElementById('final-total-price')
    final_total_price.innerText = String(parseInt(products_price.innerText) + parseInt(delivery_price.innerText)) + ' 원'
}

// =====개인정보 작성====== //
async function fillin() {

    let cart_id = cartlist.join(",")

    const user_address = document.getElementById("user_address").value
    const user_phone = document.getElementById("user_phone").value
    const receiver = document.getElementById("receiver").value

    const response = await fetch(`${BACK_END_URL}/order/product/order/?cart_id=${cart_id}`
        , {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            body: JSON.stringify({
                "user_address": user_address,
                "user_phone": user_phone,
                "receiver": receiver
            }),
            
        })
        response_json=await response.json()
    
        if (response.status==200 || response.status==202 || response.status == 201){
            alert("정상적으로 결제가 되었습니다.")
            location.reload();

        }
        else if(response.status==401 || response.status == 400){
            alert("오류가 발생했습니다. 관리자에게 문의해주세요")
            location.reload();
        }

}

