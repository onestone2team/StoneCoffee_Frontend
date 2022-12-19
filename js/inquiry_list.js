var fadeTime = 300;
window.onload = function () {
    $("#headers").load("header.html");
    $("#menu-bar").load("header_user.html");
    inquirylist()
}

// $(document).on('click','.remove button',function(){
//     if (confirm("문의내역을 삭제 하시겠습니까?") == true){
//         alert("문의내역을 삭제하였습니다");
//         removeItem(this)
//     } else {
//         alert("취소되었습니다");
//     }
// });

// function removeItem(removeButton) {
//     var productRow = $(removeButton).parent().parent();
//     productRow.slideUp(fadeTime, function () {
//         productRow.remove();
//     });
// }

async function inquirylist() {
    const response = await fetch(`${BACK_END_URL}/mypage/inquiry/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    const response_json = await response.json()
    var inquiry_frame = document.getElementById('append_inquiry')
    response_json.forEach(element => {
        const inquiry = document.createElement('div')
        inquiry.innerHTML = `<div class="basket-product">
                                <div class="item">
                                    <div class="product-details">
                                        <h3 class="item-quantity" id="inquiry"><strong><span>${element.title}</span></strong></h3>
                                    </div>
                                </div>
                                <div class="price">${element.content}</div>
                                <div class="quantity"></div>
                                <div class="subtotal" id="inquiry-subtotal">${element.created_at}</div>
                            </div>
                            <span id="not${element.id}">미확인</span><span id="see${element.id}">답변: ${element.answer}</span>
                            <hr>`
        inquiry_frame.appendChild(inquiry)
        if (element.status == true) {
            document.getElementById(`not${element.id}`).style.display = "none"
        } else if (element.status == false || element.answer == null) {
            document.getElementById(`see${element.id}`).style.display = "none"
        }
    })
}
