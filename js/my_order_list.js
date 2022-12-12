window.onload = function() {
    cartlist()

}
var fadeTime = 300;

function cartlist() {
    const response = fetch(`${BACK_END_URL}/mapage/orderlist/`, {
        headers: {
            "content-type": "applycation/son",
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODAzMzc3LCJpYXQiOjE2NzA3NjAxNzcsImp0aSI6ImQ4MmZhZjcwNjcxNjRkNzE5MjdmZGFhYzY4ZGQ1NjNlIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.FkHIk_jzYxX-hPLHry7LDjq5g2WuPq3pSdyetmtb_sY",
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
                                <a href="${BACK_END_URL}/product/detail/?product_id=${id}"><img src="img/logo.png" alt="Placholder Image 2" class="product-frame"></a>
                            </div>
                            <div class="product-details">
                                <h2><strong><span class="item-quantity"></span> 케냐 AA</strong>
                                </h2>
                                <p><strong>300g</strong></p>
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
    })
}

$('.remove button').click(function () {
    removeItem(this);
});

$(document).ready(function () {
    updateSumItems();
});

function recalculateCart(onlyTotal) {
    var subtotal = 0;

    $('.basket-product').each(function () {
        subtotal += parseFloat($(this).children('.subtotal').text());
    });

    /* Calculate totals */
    var total = subtotal;

    //If there is a valid promoCode, and subtotal < 10 subtract from total
    var promoPrice = parseFloat($('.promo-value').text());
    if (promoPrice) {
        if (subtotal >= 10) {
            total -= promoPrice;
        } else {
            alert('Order must be more than £10 for Promo code to apply.');
            $('.summary-promo').addClass('hide');
        }
    }

    /*If switch for update only total, update only total display*/
    if (onlyTotal) {
        /* Update total display */
        $('.total-value').fadeOut(fadeTime, function () {
            $('#basket-total').html(total.toFixed(2));
            $('.total-value').fadeIn(fadeTime);
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

/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent();
    var price = parseFloat(productRow.children('.price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.subtotal').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });

    productRow.find('.item-quantity').text(quantity);
    updateSumItems();
}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}