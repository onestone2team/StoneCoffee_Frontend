console.log("연결")

window.onload=function () {
    checkoutlist()
}




// =====장바구니 리스트 불러오기=========

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
            console.log(element.id)
            card_id=element.id
            console.log(card_id)
            order.setAttribute("class", "basket-product")
            order.innerHTML=`<div >
                            <input id="cart_id" placeholder="${element.id}" readonly>
                            <table>
                            <tr class="inner3">
                            <td class="imgbox"><img src="${BACK_END_URL}${element.product["image"]}"></td>
                            <td class="product" id="product">${element.product.product_name}</td>
                            <td class="count" id="count" >${element.count}</td>
                            <td class="price" id="price">${element.price}원</td>  
                            </tr>
                            </table>
                        </input>
                        </div>`
         order_frame.appendChild(order)
        }
        )
} 


// =====개인정보 작성======
async function fillin(){
    let A=document.getElementById("cart_id")["placeholder"];    
    console.log(A)
    console.log(Number(A))
    
    const user_address = document.getElementById("user_address").value
    const user_phone = document.getElementById("user_phone").value
    const receiver = document.getElementById("receiver").value
    console.log(Number(A),user_address, user_phone , receiver)

    const response = await fetch(`${BACK_END_URL}/order/product/order/?cart_id=${Number(A)}`
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
} 
