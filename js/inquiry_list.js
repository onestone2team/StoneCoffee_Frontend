var fadeTime = 300;
window.onload = function () {
    inquirylist()
}

$(document).on('click','.remove button',function(){
    if (confirm("문의내역을 삭제 하시겠습니까?") == true){
        alert("문의내역을 삭제하였습니다");
        removeItem(this)
    } else {
        alert("취소되었습니다");
    }
});

function removeItem(removeButton) {
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
    });
}

async function inquirylist() {
    const response = await fetch(`${BACK_END_URL}/mypage/inquiry/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODYxMDQ3LCJpYXQiOjE2NzA4MTc4NDcsImp0aSI6ImQxZjdmNmUyMjg5ZjQ0YjE5YTEyNGM0MzBhYjhmNzMzIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.lZhyYuOKCXhkO9CeFfXDiLc6tOQuX_ftjHjU_AFm8fs",
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
                                <div class="remove">
                                    <button>삭제</button>
                                </div>
                            </div>
                            <hr><span id="not${element.id}">미확인</span></hr>
                            <hr><span id="see${element.id}">답변: ${element.anser}</span></hr>`
        inquiry_frame.appendChild(inquiry)

        if (element.status == true) {
            document.getElementById(`not${element.id}`).style.display = "none"
        } else if (element.status == false) {
            document.getElementById(`see${element.id}`).style.display = "none"
        }
    })
}
