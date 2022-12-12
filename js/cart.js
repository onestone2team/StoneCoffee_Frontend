fadeTime = 300;

window.onload = function () {
    cartlist()
}

total = 0
async function recalculateCart() {

    let num = document.getElementById("subtotal").innerHTML.slice(0, -1) * 1;
    total = total + num
    $("#basket-subtotal").html(total)
    if (total >= 50000) {
        $('#delivery_price').fadeOut(fadeTime) && $('#delivery_price2').fadeIn(fadeTime);
    } else {
        $('#delivery_price2').fadeOut(fadeTime) && $('#delivery_price').fadeIn(fadeTime);
    }
    delivery_price = $("#delivery_price").innerHTML * 1;
    final_total = total + delivery_price
    $('.final-value').fadeIn(fadeTime, function () {
        $('#basket-total').html(total);
        if (total == 0) {
            $('.checkout-cta').fadeOut(fadeTime);
        } else {
            $('.checkout-cta').fadeIn(fadeTime);
        }
        $('.final-value').fadeIn(fadeTime);
    });
};

$(document).on('click','.remove button',function(){
    removeItem(this)
});


async function cartlist() {
    const response = await fetch(`${BACK_END_URL}/product/cart/`, {
        headers: {
            "content-type": "applycation/son",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODYxMDQ3LCJpYXQiOjE2NzA4MTc4NDcsImp0aSI6ImQxZjdmNmUyMjg5ZjQ0YjE5YTEyNGM0MzBhYjhmNzMzIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.lZhyYuOKCXhkO9CeFfXDiLc6tOQuX_ftjHjU_AFm8fs",
        },
        method: "GET"
    })
    var response_json = await response.json()
    var cart_frame = document.getElementById('append-product')
    response_json.forEach(element => {
        const cart = document.createElement('div')
        var total_price = element.price * element.count
        cart.setAttribute("class", "basket-product")
        cart.innerHTML = `<div class="item">
                            <div class="product-image">
                                <a href="/product-detail.html?product_id=${element.product.id}"><img src="${BACK_END_URL}${element.product.image}" class="product-frame"></a>
                            </div>
                            <div class="product-details">
                                <h2><strong><span class="item-quantity"></span>${element.product.product_name}</strong>
                                </h2>
                                <p><strong>${element.weight}g</strong></p>
                            </div>
                        </div>
                        <div class="price" id="price">${element.price}원</div>
                        <div class="quantity" id="count">${element.count}</div>
                        <div class="subtotal" id="subtotal">${total_price}원</div>
                        <div class="remove">
                            <button>지우기</button>
                        </div>`
        cart_frame.appendChild(cart)
        recalculateCart()
    })
}

function removeItem(removeButton) {
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        total = 0
        product = $(".basket-product").length
        if (product > 0) {
            recalculateCart();
        } else {
            $("#basket-subtotal").html(total)
            $('#basket-total').html(total);
            $('#delivery_price').fadeOut(fadeTime) && $('#delivery_price2').fadeIn(fadeTime)
        }
    });
}

