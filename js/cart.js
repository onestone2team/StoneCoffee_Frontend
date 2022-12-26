fadeTime = 300;

window.onload = function () {
    $("#headers").load("header.html");
    $("#menu-bar").load("header_user.html");
    cartlist()
}

total = 0
async function recalculateCart(price, count) {

    let num = document.getElementById("subtotal").innerHTML.slice(0, -1) * 1;
    total = total + price*count
    $("#basket-subtotal").html(total.toLocaleString('ko-KR'))
    if (total >= 50000) {
        $('#delivery_price').fadeOut(fadeTime) && $('#delivery_price2').fadeIn(fadeTime);
        delivery_price = 0
    } else {
        $('#delivery_price2').fadeOut(fadeTime) && $('#delivery_price').fadeIn(fadeTime);
        delivery_price = 3000
    }
    final_total = total + delivery_price
    $('.final-value').fadeIn(fadeTime, function () {
        $('#basket-total').html(final_total.toLocaleString('ko-KR'));
        if (total == 0) {
            $('.checkout-cta').fadeOut(fadeTime);
        } else {
            $('.checkout-cta').fadeIn(fadeTime);
        }
        $('.final-value').fadeIn(fadeTime);
    });
};

$(document).on('click', '.remove button', function () {
    removeItem(this)
});


async function cartlist() {
    
    const response = await fetch(`${BACK_END_URL}/product/cart/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    var response_json = await response.json()
    var cart_frame = document.getElementById('append-product')
    response_json.forEach(element => {
        
        const cart = document.createElement('div')
        var total_price = element.price * element.count
        cart.setAttribute("class", "basket-product")
        cart.innerHTML = `<div class="item" id="item_box">
                            <div class="product-image">
                                <a href="/product-detail.html?product_id=${element.product.id}"><img src="${BACK_END_URL}${element.product.image}" class="product-frame"></a>
                            </div>
                            <div class="product-details">
                                <h4><span class="item-quantity"></span>${element.product.product_name}</h4>
                                <p id="product_weight${element.product.id}"><strong>${element.weight*100}g</strong></p>
                            </div>
                        </div>
                        <div id="flex_row">
                            <div class="price" id="price${element.id}">${element.price.toLocaleString('ko-KR')}원</div>
                            <div class="quantity" id="count${element.id}">${element.count}개</div>
                            <div class="subtotal" id="subtotal">${total_price.toLocaleString('ko-KR')}원</div>
                        </div>
                        <div class="remove" id="${element.id}">
                            <button>삭제하기</button>
                        </div>`
        cart_frame.appendChild(cart)
        if (element.product["category"] =="article" || element.product["category"] =="goods"){
            if (element.weight ==1) {
                    document.getElementById(`product_weight${element.product.id}`).style.display = "none"
                }      
        }
        recalculateCart(element.price, element.count)
    
    })
}

function removeItem(removeButton) {
    var result =confirm("장바구니에서 삭제 하시겠습니까?");
    if (result){
        var cart_id = removeButton.closest("div").id
        var price = document.getElementById(`price${cart_id}`).innerText
        var count = document.getElementById(`count${cart_id}`).innerText
        price_num=price.replace("원","")
        const response = fetch(`${BACK_END_URL}/product/cart/?cart_id=${cart_id}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "DELETE",
        })

        var productRow = $(removeButton).parent().parent();
        
        productRow.slideUp(fadeTime, function () {
        productRow.remove();
        product = $(".basket-product").length
        if (product > 0) {
            price_a=price.replace('원',' ')
            price_b=price_a.replace(',','')
            recalculateMinusCart(parseFloat(price_b), parseFloat(count));
        } else if (product == 0) {
            $("#basket-subtotal").html("0");
            $('#basket-total').html("0");
        }
        });}
        else{
            
        }

}


async function recalculateMinusCart(price, count) {
    total = total - price*count
    $("#basket-subtotal").html(total.toLocaleString('ko-KR'))
    if (total >= 50000) {
        $('#delivery_price').fadeOut(fadeTime) && $('#delivery_price2').fadeIn(fadeTime);
        delivery_price = 0
    } else {
        $('#delivery_price2').fadeOut(fadeTime) && $('#delivery_price').fadeIn(fadeTime);
        delivery_price = 3000
    }
    final_total = total + delivery_price
    $('.final-value').fadeIn(fadeTime, function () {
        $('#basket-total').html(final_total.toLocaleString('ko-KR'));
        if (total == 0) {
            $('.checkout-cta').fadeOut(fadeTime);
        } else {
            $('.checkout-cta').fadeIn(fadeTime);
        }
        $('.final-value').fadeIn(fadeTime);
    });
};