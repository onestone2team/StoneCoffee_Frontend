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
                            <td class="status_${element.id}" style="display:flex; flex-direction:column; align-items:center; justify-content:center;"><p>${order_status}</p><button id="${element.id}" class="status_btn">취소하기</button></td>
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
        const cancel_btn = document.getElementById(`${element.id}`)
        cancel_btn.style.display = 'none'
        if (element.status == 0) {
            cancel_btn.style.display = 'block';
        }
    })
}

async function order_cancel_at_import(order_id) {
    var order_cancel = await fetch(`${BACK_END_URL}/order/product/order_cancel/?order_id=${order_id}`, {
        headers: {
            "Authorization": access_token,
            "Content-type": "applycation/json"
        },
        method: "POST"
    })
    var order_cancel_json = await order_cancel.json()
    console.log(order_cancel_json)
}

$(document).on('click', '.status_btn', async function () {
    var order_id = this.id
    console.log(order_id)
    const cancel_btn = document.getElementById(`${order_id}`)

    const response = await fetch(`${BACK_END_URL}/order/product/order_cancel/?order_id=${order_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify({
        }),
    })
    const response_json = await response.json()
    if (response.status == 200) {
        alert(response_json.message)
    }
    await order_cancel_at_import(order_id)

    var new_status = document.getElementsByClassName(`status_${order_id}`)[0]
    new_status.innerHTML = `<p>취소됨</p><button style="display: none;" id="${order_id}" class="status_btn">취소하기</button>`
});
