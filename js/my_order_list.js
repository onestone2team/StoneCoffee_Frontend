var fadeTime = 300;
window.onload = function () {
    $("#menu-bar").load("header_user.html");
    $("#headers").load("header.html");
    cartlist()
}

async function cartlist() {
    const response = await fetch(`${BACK_END_URL}/mypage/orderlist/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    const response_json = await response.json()
    console.log(response_json)
    var order_frame = document.getElementById('append_order')
    response_json.forEach(element => {
        if (element.status == 0) {
            var order_status = "확인 대기중";
        } else if (element.status == 1) {
            var order_status = "배송 준비중";
        } else if (element.status == 2) {
            var order_status = "배송중";
        } else if (element.status == 3) {
            var order_status = "취소 요청됨";
        } else { var order_status = "취소됨"; }
        var order_price = element.count * element.order_price
        const order = document.createElement('div')
        order.setAttribute("class", "basket-product")
        order.innerHTML = `<table>
                        <tr>
                            <td colspan="1" width="20%" height="40px"> 주문번호 : ${element.id}<hr></td>
                            <td width="40%">주문 일자 : ${element.created_at}<hr></td>
                            <td width="20%">주문 용량<hr></td>
                            <td width="20%">주문상태<hr></td>
                        </tr>
                        <tr>
                            <td rowspan="2">
                                <div class="product-image">
                                    <a href="product-detail.html?product_id=${element.product}"><img src="${BACK_END_URL}${element.product_image}"/></a>
                                </div>
                            </td>
                            <td height="100px">
                                <strong>상품 이름 : <span class="item-quantity">${element.product_name}</span></strong>
                            </td>
                            <td>
                                <div class="price">금액 : ${element.order_price.toLocaleString('ko-KR')}원</div><br>
                                <div class="quantity">수량 : ${element.count}개</div><br>
                                <div id="quantity${element.id}" class="quantity">용량 : ${element.weight * 100}g</div>
                            </td>
                            <td style="display:flex; flex-direction:column; align-items:center; justify-content:center;"><p id='order_status${element.id}'>${order_status}</p><button id="cancel-order${element.id}" onclick="cancel_order(${element.id})">취소하기</button></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><hr> 총 금액 : ${order_price.toLocaleString('ko-KR')}원</td>
                        </tr>
                    </table>`
        order_frame.prepend(order)
        if (element.weight == 1) {
            const quantity = document.getElementById(`quantity${element.id}`)
            quantity.remove()
        }
        //주문 취소하기 버튼
        const cancel_btn = document.getElementById(`cancel-order${element.id}`)
        cancel_btn.style.display = 'none'
        if (element.status == 0) {
            cancel_btn.style.display = 'block';
        }

    })
}

async function cancel_order(id) {

    var cancel_confirm = confirm('해당 상품을 주문 취소하시겠습니까?')

    if (cancel_confirm) {
        const response = await fetch(`${BACK_END_URL}/order/product/order_cancel/?order_id=${id}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: JSON.stringify({

            }),
        })

        const response_json = await response.json()
        console.log(response_json)
        var order_status = document.getElementById(`order_status${id}`)
        var cancel_btn = document.getElementById(`cancel-order${id}`)

        if (response.status == 200) {
            alert(response_json.message)
            if (response_json.status == 3) {
                order_status.innerText = "취소 요청됨"
                cancel_btn.style.display = "none"
            } else {
                order_status.innerText = "취소됨"
                cancel_btn.style.display = "none"
            }
        }
    }

}