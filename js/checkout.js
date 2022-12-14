console.log("연결")

cartlist = []

// =====장바구니 리스트 불러오기========= //

window.onload=async function checkoutlist(){
    const response = await fetch (`${BACK_END_URL}/product/cart`, {
       headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")          
         },
        method:'GET'
    })
    const response_json = await response.json()
    const order_frame = document.getElementById('append-product')
        response_json.forEach(element => {
            const order = document.createElement('div')
            var total_price = element.price * element.count
            console.log(element.id)
            cartlist.push(element.id)
            console.log(cartlist)
            order.setAttribute("class", "basket-product")
            order.innerHTML=`<div >
                            <div id="cart_id" placeholder="${element.id}"></div>
                            <table>
                            <tr class="inner3">
                            <td><img src="${BACK_END_URL}${element.product["image"]}" class="tdimg"></td>
                            <td class="product" id="product">${element.product.product_name}</td>
                            <td class="count" id="count" >${element.count}</td>
                            <td class="price" id="price">${total_price}원</td>  
                            </tr>
                            </table>
                        </input>
                        </div>`
         order_frame.appendChild(order)
        }
        )
} 

//===주문금액====//
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



// =====개인정보 작성====== //
async function fillin(){
    let A=document.getElementById("cart_id")["placeholder"];    
    console.log(A)
    let cart_id = cartlist.join(",")
    
    const user_address = document.getElementById("user_address").value
    const user_phone = document.getElementById("user_phone").value
    const receiver = document.getElementById("receiver").value
    console.log(cartlist,user_address, user_phone , receiver)

    const response = await fetch(`${BACK_END_URL}/order/product/order/?cart_id=${cart_id}`
    , {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
         },
        method:'POST',
        body: JSON.stringify({
            "user_address":user_address,
            "user_phone":user_phone,
            "receiver":receiver

    
        }),
})
    
// if (kind in [0,1,2] & title != "" & content !="" ){
//    if (confirm("상품주문을 하시겠습니까?") == true){
//    } else {
//    }
// }

}

