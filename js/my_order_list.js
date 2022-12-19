var fadeTime = 300;
window.onload = function () {
    $("#menu-bar").load("header_user.html");
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
            var order_status = "주문 확인";
        } else if (element.status == 2) {
            var order_status = "배송중";
        }
        var order_price = element.count * element.order_price
        const order = document.createElement('div')
        order.setAttribute("class", "basket-product")
        order.innerHTML = `<div class="item">
                            <div class="product-image">
                                <a href="product-detail.html?product_id=${element.product}"><img src="${BACK_END_URL}${element.product_image}"/></a>
                            </div>
                            <div class="product-details">
                                <h2><strong><span class="item-quantity">${element.product_name}</span></strong></h2>
                                <p><strong>${element.weight}g</strong></p>
                                <p>${element.created_at}</p>
                            </div>
                        </div>
                            <div class="price">${element.order_price}</div>
                            <div class="quantity">${element.count}</div>
                            <div class="order_status">${order_status}</div></div>
                        <div class="subtotal">${order_price}</div>`
        order_frame.appendChild(order)
    })
}



// function removeItem(removeButton) {
//     var productRow = $(removeButton).parent().parent();
//     productRow.slideUp(fadeTime, function () {
//         productRow.remove();
//     });
// }
