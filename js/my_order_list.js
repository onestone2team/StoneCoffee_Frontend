window.onload = function() {
    cartlist()

}


var promoCode;
var promoPrice;
var fadeTime = 300;

function cartlist() {
    const response = fetch(`${BACK_END_URL}/mapage/orderlist/`, {
        headers: {
            "content-type": "applycation/son",
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODU1OTI4LCJpYXQiOjE2NzA4MTI3MjgsImp0aSI6IjIxZTAyYThjMmM3YzQ5ZTg5MGFkYzU2MTZhYjNlNDZjIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.nKz_eNokXLnEQLMfNPdKY6xiAw4Q6DgWh0zys7wTajk",
        },
        method: "GET"
    })
    response_json = response.json()
    console.log(response_json)
    cart_frame = document.getElementsByClassName('append-product')
    response_json.foreach(element => {
        const cart = document.createElement('div')
        cart.setAttribute("class", "basket-product")
        cart.innerHTML = `<div class="item">
                            <div class="product-image">
                                <a href=${BACK_END_URL}/product/detail/?product_id=${element.product.id}><img src="${BACK_END_URL}${element.product.image}" class="product-frame"></a>
                            </div>
                            <div class="product-details">
                                <h2><strong><span class="item-quantity"></span> 케냐 AA</strong>
                                </h2>
                                <p><strong>${element.weight}g</strong></p>
                                <p>2022-12-08</p>
                            </div>
                        </div>
                        <div class="content">
                            <div class="price">26.00원</div>
                            <div class="quantity">4</div>
                            <div class="subtotal">26.00원</div>
                        </div>
                        <div class="remove">
                            <button>지우기</button>
                        </div>`

        // const weight = element.weight
        // const price = element.price *
    })
}

/* Assign actions */
$('.quantity input').change(function () {
    updateQuantity(this);
});

$('.remove button').click(function () {
    removeItem(this);
});

$(document).ready(function () {
    updateSumItems();
});

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
        updateSumItems();
    });
}