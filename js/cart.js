window.onload = function() {
    cartlist()

}

var promoPrice;
var fadeTime = 300;

async function cartlist() {
    const response = await fetch(`${BACK_END_URL}/product/cart/`, {
        headers: {
            "content-type": "applycation/son",
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODU1OTI4LCJpYXQiOjE2NzA4MTI3MjgsImp0aSI6IjIxZTAyYThjMmM3YzQ5ZTg5MGFkYzU2MTZhYjNlNDZjIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.nKz_eNokXLnEQLMfNPdKY6xiAw4Q6DgWh0zys7wTajk",
        },
        method: "GET"
    })
    var response_json = await response.json()
    var cart_frame = document.getElementById('append-product')
    console.log(response_json)
    response_json.forEach(element => {
        const cart = document.createElement('div')
        var total_price = element.price * element.count
        cart.setAttribute("class", "basket-product")
        cart.innerHTML = `<div class="item">
                            <div class="product-image">
                                <a href="${BACK_END_URL}/product/detail/?product_id=${element.product.id}"><img src="${BACK_END_URL}${element.product.image}" alt="Placholder Image 2" class="product-frame"></a>
                            </div>
                            <div class="product-details">
                                <h2><strong><span class="item-quantity"></span>${element.product.product_name}</strong>
                                </h2>
                                <p><strong>${element.weight}g</strong></p>
                            </div>
                        </div>
                        <div class="content">
                            <div class="price" id="price">${element.price}원</div>
                            <div class="quantity" id="count">${element.count}</div>
                            <div class="subtotal" id="subtotal">${total_price} 원</div>
                        </div>
                        <div class="remove">
                            <button>지우기</button>
                        </div>`
        cart_frame.appendChild(cart)
    })
}

/* Assign actions */

$('.remove button').click(function () {
    removeItem(this);
});

$(document).ready(function () {
    updateSumItems();
});

function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.basket-product').each(function () {
        subtotal += parseFloat($(this).children('#subtotal').text());
    });

    /* Calculate totals */
    var total = subtotal;

    /*If switch for update only total, update only total display*/
    if (123) {
        /* Update total display */
        $('#total-value').fadeOut(fadeTime, function () {
            $('#basket-total').html(total.toFixed(2));
            $('#total-value').fadeIn(fadeTime);
        });
    } else {
        /* Update summary display. */
        $('.final-value').fadeOut(fadeTime, function () {
            $('#basket-subtotal').html(subtotal.toFixed(2));
            $('#basket-total').html(total.toFixed(2));
            if (total == 0) {
                $('.checkout-cta').fadeOut(fadeTime);
            } else {
                $('.checkout-cta').fadeIn(fadeTime);
            }
            $('.final-value').fadeIn(fadeTime);
        });
    }
}

// /* Update quantity */
// function updateQuantity() {
//     /* Calculate line price */
//     var productRow = document;
//     var price = parseFloat(productRow.children('.price').text());
//     var quantity = $(quantityInput).val();
//     var linePrice = price * quantity;

//     /* Update line price display and recalc cart totals */
//     productRow.children('.subtotal').each(function () {
//         $(this).fadeOut(fadeTime, function () {
//             $(this).text(linePrice.toFixed(2));
//             recalculateCart();
//             $(this).fadeIn(fadeTime);
//         });
//     });

//     productRow.find('.item-quantity').text(quantity);
//     updateSumItems();
// }

function updateSumItems() {
    var sumItems = 0;
    $('.quantity input').each(function () {
        sumItems += parseInt($(this).val());
    });
    $('.total-items').text(sumItems);
}

function removeItem(removeButton) {
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
        updateSumItems();
    });
}