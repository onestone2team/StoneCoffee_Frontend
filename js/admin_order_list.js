var fadeTime = 300;
window.onload = function() {
    $("#headers").load("header.html");
    $("#menu-bar").load("header_admin.html");
    adminorderlist()
}


async function adminorderlist() {
    const response = await fetch(`${BACK_END_URL}/director/order`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    const response_json = await response.json()
    var admin_frame = document.getElementById('tbody')
    response_json.data.forEach(element => {
    
        if (element.status == 0) {
            var admin_status = "확인 대기중";
        } else if (element.status == 1) {
            var admin_status = "주문 확인";
        } else if (element.status == 2) {
            var admin_status = "배송중";
        }
        // img src="${BACK_END_URL}${element.product_image}"/>
        var admin_price = element.count * element.order_price
        const order = document.createElement('tr')
        order.innerHTML = `<tr>
                                            <td>${element.id}</td>
                                            <td class="orderbox">
                                                <div class=imgbox>
                                                    <img src="${BACK_END_URL}${element.product_image}" onclick="answer(${element.id})">
                                                </div>
                                                </div>
                                                <div class="namebox">
                                                    <p onclick="answer(${element.id})">${element.product_name}</p>
                                                </div>
                                            </td>
                                            <td>${element.created_at}</td>
                                            <td>
                                                <div role="navigation" class="order_status_dropdown2">
                                                    <ul class="ul1">
                                                        <li class="li1">${admin_status}&dtrif;
                                                            <ul class="dropdown1">
                                                                <li class="li2" id="${element.id}" value="0">확인 대기중</li>
                                                                <li class="li2" id="${element.id}" value="1">주문 확인</li>
                                                                <li class="li2" id="${element.id}" value="2">배송중</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>`
        admin_frame.prepend(order)
    })
}

async function answer(id){
    const response = await fetch(`${BACK_END_URL}/director/order`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
    var content_frame = document.getElementById('content')
    $("#content").empty();
    for (i = 0; i < data["data"].length; i ++) {
        if (data["data"][i]['id'] == id) {
            const content = document.createElement('content')
            content.innerHTML = `<div style="text-align:left; margin-left:40%">
                                 갯수 :${data["data"][i].count}<br/>
                                 총 가격 :${data["data"][i].order_price}원<br/>
                                 요청 사항:${data["data"][i].receiver}<br/>
                                 고객 ID: ${data["data"][i].user}<br/>
                                 주소 : ${data["data"][i].user_address}<br/>
                                 받는분 핸드폰 번호 :${data["data"][i].user_phone}<br/>
                                 </div>
                                 `
            content_frame.appendChild(content)
        }
    }
})}
$(document).on('click','.li2',function(){
    var order_id = this.id
    if (this.value == 0){
        var admin_status = "확인 대기중";
        var status = "0"
    } else if (this.value == 1){
        var admin_status = "주문 확인";
        var status = "1"
    } else if (this.value == 2){
        var admin_status = "배송중"
        var status = "2"
    }
    $(this).parent().parent().closest("ul")[0].innerHTML = `<li class="li1">${admin_status}&dtrif;
                                                                <ul class="dropdown1">
                                                                    <li class="li2" id="${order_id}" value="0">확인 대기중</li>
                                                                    <li class="li2" id="${order_id}" value="1">주문 확인</li>
                                                                    <li class="li2" id="${order_id}" value="2">배송중</li>
                                                                </ul>
                                                            </li>`

    const requset = fetch(`${BACK_END_URL}/director/order/?order_id=${order_id}`,{
        headers:{
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "PUT",
        body: JSON.stringify({
            "status": status,
        })
    })
});
