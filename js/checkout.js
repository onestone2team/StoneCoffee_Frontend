cartlist = []

// =====장바구니 리스트 불러오기========= //
user_name = ""
user_email = ""

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
                                        <td class="price" id="price">${total_price.toLocaleString('ko-KR')}원</td>  
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

    user_name = profile_json.profilename
    user_email = profile_json.email

}//onload끝

// 총 상품 금액 및 배송비 및 결제 금액 계산
async function calculator(product_total_price) {
    delivery=3000
    let products_price = document.getElementById('products-price')
    products_price.innerHTML = product_total_price.toLocaleString('ko-KR') + ' 원'
    let delivery_price = document.getElementById('delivery-price')
    if (product_total_price >= 50000) {
        delivery_price.innerText = '무료'
    } else {    
        delivery_price.innerText = delivery.toLocaleString('ko-KR')+ ' 원'
    }
    let final_total_price = document.getElementById('final-total-price')
    if (product_total_price > 50000){
        final_total_price.innerText = product_total_price.toLocaleString('ko-KR') + ' 원'
    }else{
        final_total_price.innerText = (product_total_price+3000).toLocaleString('ko-KR') + ' 원'
    }
}

function is_checked(){
    const checkbox = document.getElementById("checkbox")
    const orderbutton = document.getElementById("orderbutton")
    const is_checked = checkbox.checked;
    if (is_checked==true) {
        orderbutton.disabled = false
        
    } else{
        orderbutton.disabled = true
    }
}


// =====개인정보 작성====== //
async function fillin() {

    let cart_id = cartlist.join(",")

    const user_address = document.getElementById("user_address").value
    const user_phone = document.getElementById("user_phone").value
    const receiver = document.getElementById("receiver").value
    const total_price = document.getElementById("final-total-price").innerText
    if (user_address == "-" || user_phone == null || user_address == null || user_phone == "-"){
            alert("주소 또는 핸드폰 번호를 입력해주세요")
    }else if (total_price == "3,000 원"){
        alert("결제하실 상품들을 담아주세요")
    }else{
        var payment = document.querySelector('input[name="payment"]:checked').value
        if (payment == 'kakaopay'){
            paymethod = 'kakaopay'
        } else if (payment == 'kcp'){
            paymethod = 'card'
        }

        var IMP = window.IMP;
        var code = "imp85781414";  // FIXME: 가맹점 식별코드
        IMP.init(code);

        // 결제요청
        IMP.request_pay({
            // name과 amount만 있어도 결제 진행가능
            pg : payment, // pg 사 선택
            pay_method : paymethod,
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '주문명:stonecoffee',
            amount : total_price,
            buyer_email : user_email,
            buyer_name : user_name,
            buyer_tel : user_phone,
            buyer_addr : user_address,
            m_redirect_url : `${FRONT_END_URL}/payment.html`
        }, async function(rsp) {
            if ( rsp.success ) {
                            
                const response = await fetch(`${BACK_END_URL}/order/product/order/?cart_id=${cart_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("access")
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "user_address": user_address,
                        "user_phone": user_phone,
                        "receiver": rsp.imp_uid
                    }),
                    
                })
                response_json=await response.json()
            
                if (response.status==200 || response.status==202 || response.status == 201){
                    alert("정상적으로 결제가 되었습니다.")
                    location.replace("../payment.html");

                }
                else if(response.status==401 || response.status == 400){
                    alert("오류가 발생했습니다. 관리자에게 문의해주세요")
                    location.reload();
                }
            }
            else {
                alert("결제에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
            }
        });

}}

