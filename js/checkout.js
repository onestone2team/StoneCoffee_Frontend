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
    delivery = 3000
    let products_price = document.getElementById('products-price')
    products_price.innerHTML = product_total_price.toLocaleString('ko-KR') + ' 원'
    let delivery_price = document.getElementById('delivery-price')
    if (product_total_price >= 50000) {
        delivery_price.innerText = '무료'
    } else {
        delivery_price.innerText = delivery.toLocaleString('ko-KR') + ' 원'
    }
    let final_total_price = document.getElementById('final-total-price')
    if (product_total_price > 50000) {
        final_total_price.innerText = product_total_price.toLocaleString('ko-KR') + ' 원'
    } else {
        final_total_price.innerText = (product_total_price + 3000).toLocaleString('ko-KR') + ' 원'
    }
}

function is_checked() {
    const checkbox = document.getElementById("checkbox")
    const orderbutton = document.getElementById("orderbutton")
    const is_checked = checkbox.checked;
    if (is_checked == true) {
        orderbutton.disabled = false

    } else {
        orderbutton.disabled = true
    }
}


// =====개인정보 작성====== //
async function fillin() {

    let cart_id = cartlist.join(",")
    var blank_pattern = /[\s]/g;

    var user_address = document.getElementById("user_address").value
    const postcode = document.getElementById("postcode").value;
    const address = document.getElementById("address").value;
    const detailAddress = document.getElementById("detailAddress").value;
    const extraAddress = document.getElementById("extraAddress").value;
    
    if (postcode != ""){
        user_address = '(' + postcode + ')' + ' ' + address + ' ' + detailAddress + ' ' + extraAddress
    } 

    const user_phone = document.getElementById("user_phone").value
    const receiver = document.getElementById("receiver").value
    const total_price = document.getElementById("final-total-price").innerText
    
    if (user_address == " " ||  user_address == null || user_address == ("" >= 1)) {
        alert("주소는 필수 입력사항입니다")
    } else if(user_phone == null || user_phone == "-" || user_phone == ("" >= 1)) {
        alert("핸드폰 번호는 필수 입력사항입니다")
    } else if (total_price == "3,000 원") {
        alert("결제하실 상품들을 담아주세요")
    } else {
        var payment = document.querySelector('input[name="payment"]:checked').value
        if (payment == 'kakaopay') {
            paymethod = 'kakaopay'
        } else if (payment == 'kcp') {
            paymethod = 'card'
        }

        var IMP = window.IMP;
        var code = "imp85781414";  // FIXME: 가맹점 식별코드
        IMP.init(code);

        // 결제요청
        IMP.request_pay({
            // name과 amount만 있어도 결제 진행가능
            pg: payment, // pg 사 선택
            pay_method: paymethod,
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: '주문명:stonecoffee',
            amount: total_price,
            buyer_email: user_email,
            buyer_name: user_name,
            buyer_tel: user_phone,
            buyer_addr: user_address,
            m_redirect_url: `${FRONT_END_URL}/payment.html`
        }, async function (rsp) {
            if (rsp.success) {

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
                response_json = await response.json()

                if (response.status == 200 || response.status == 202 || response.status == 201) {
                    alert("정상적으로 결제가 되었습니다.")
                    location.replace("../payment.html");

                }
                else if (response.status == 401 || response.status == 400) {
                    alert("오류가 발생했습니다. 관리자에게 문의해주세요")
                    location.reload();
                }
            }
            else {
                alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });

    }
}
function new_addr() {
    const new_addr = document.getElementById("new-addr")
    const org_addr = document.getElementById("user_address")
    if (new_addr.style.display == 'none') {
        new_addr.style.display = 'block'
        org_addr.style.display = 'none'
    } else { new_addr.style.display = 'none'; 
             org_addr.style.display = 'block'; }
}
// 우편번호 입력
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("extraAddress").value = extraAddr;

            } else {
                document.getElementById("extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();
        }
    }).open();
}


