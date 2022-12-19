var fadeTime = 300;
window.onload = function () {
    $("#headers").load("header.html");
    $("#menu-bar").load("header_user.html");
    cartlist()
}

async function cartlist() {
    const response = await fetch(`${BACK_END_URL}/mypage/orderlist/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODYxMDQ3LCJpYXQiOjE2NzA4MTc4NDcsImp0aSI6ImQxZjdmNmUyMjg5ZjQ0YjE5YTEyNGM0MzBhYjhmNzMzIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.lZhyYuOKCXhkO9CeFfXDiLc6tOQuX_ftjHjU_AFm8fs",
        },
        method: "GET"
    })
    const response_json = await response.json()
    var order_frame = document.getElementById('append_order')
    response_json.forEach(element => {
        if (element.status == 0) {
            var order_status = "확인 대기중";
        } else if (element.status == 1) {
            var order_status = "주문 확인";
        } else if (element.status == 2) {
            var order_status = "배송중";
        }
        var order_price = element.count * element.order_price
        const order = document.createElement('div')
        order.setAttribute("class", "basket-product")
        console.log(element)
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
                                <div class="price">금액 : ${element.order_price}</div><br>
                                <div class="quantity">수량 : ${element.count}</div><br>
                                <div class="quantity">용량 : ${element.weight}g</div>
                            </td>
                            <td>${order_status}</td>
                        </tr>
                        <tr>
                            
                            <td></td>
                            <td></td>
                            <td><hr> 총 금액 : ${order_price}</td>
                        </tr>
                    </table>`
        order_frame.appendChild(order)
    })
}



// function removeItem(removeButton) {
//     var productRow = $(removeButton).parent().parent();
//     productRow.slideUp(fadeTime, function () {
//         productRow.remove();
//     });
// }
