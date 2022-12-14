var fadeTime = 300;
window.onload = function () {

}

$(document).on('click', '.li2', function () {
    kind = this.value
    if (this.value == 0) {
        $(".ul1")[0].innerHTML =`<li class="li1" id="kind">상품&dtrif;
                                    <ul class="dropdown1">
                                        <li class="li2" value="1">배송</li>
                                        <li class="li2" value="2">기타</li>
                                    </ul>
                                </li>`

    } else if (this.value == 1) {
        $(".ul1")[0].innerHTML =`<li class="li1" id="kind">배송&dtrif;
                                    <ul class="dropdown1">
                                        <li class="li2" value="0">상품</li>
                                        <li class="li2" value="2">기타</li>
                                    </ul>
                                </li>`

    } else if (this.value == 2) {
        $(".ul1")[0].innerHTML =`<li class="li1" id="kind">기타&dtrif;
                                    <ul class="dropdown1">
                                        <li class="li2" value="0">상품</li>
                                        <li class="li2" value="1">배송</li>
                                    </ul>
                                </li>`
    }
});

async function inquiry() {
    title = document.getElementById("checkId").value
    content = document.getElementById("checkPw").value
    var category = kind
    const response = await fetch(`${BACK_END_URL}/mypage/inquiry/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify({
            "title":title,
            "content":content,
            "category":category,
        })
    })
    $(location).attr('href', `${FRONT_END_URL}/inquiry_list.html`);
}

$(document).on('click', '.btn2', function () {
    title = document.getElementById("checkId").value
    content = document.getElementById("checkPw").value
    if (kind in [0,1,2] && title != "" && content !="" ){
        if (confirm("문의를 등록 하시겠습니까?") == true){
            alert("문의등록 완료");
            inquiry()
        } else {
            alert("취소되었습니다");
        }
    } else if (title == ""){
        alert("문의 제목을 선택해 주세요")
    } else if (content == "") {
        alert("문의 내용을 선택해 주세요")
    } else {
        alert("문의 유형을 선택해 주세요")
    }
});

