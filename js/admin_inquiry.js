var fadeTime = 300;
window.onload = function () {
    $("#headers").load("header.html");
    inquirylist()
}

async function inquirylist() {
    const response = await fetch(`${BACK_END_URL}/director/inquiry/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    const response_json = await response.json()
    console.log(response_json)
    var inquiry_frame = document.getElementById('append-inquiry')
    response_json.forEach(element => {
        const inquiry = document.createElement('div')
        inquiry.setAttribute("class", "basket-product")
        inquiry.innerHTML = `<div class="item">
                                <div class="product-details">
                                <span class="item-quantity"><h2 style="display: inline;">문의제목: </h2></span><span class="element_class">${element.title}</span><br>
                                    <h3 style="display: inline;">문의내용:</h3><span class="element_class">${element.content}</span><br>
                                    <h3 style="display: inline;">닉네임: </h3><span class="element_class">${element.user}</span><br>
                                    </div>
                                    <div class="status-date">
                                        <h3 id="status-${element.id}" style="display: inline;"></h3><br>
                                        <h4 class="date" style="display: inline;">${element.created_at}</h4><br>
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <h3 class="answer-line" style="display: inline;">답변:</h3> <span id="answer-${element.id}" class="element_class">${element.answer}</span>
                                    <textarea id=text-${element.id} class="usertext" placeholder=""></textarea>
                                    <button type="button" id="btn1-${element.id}" class="btn">답변작성</button>
                                    <button type="button" id="btn2-${element.id}" class="btn">답변수정</button>
                                </div>`
        inquiry_frame.appendChild(inquiry)

        if (element.status == false) {
            document.getElementById(`btn2-${element.id}`).style.display = "none"
            document.getElementById(`answer-${element.id}`).style.display = "none"
            document.getElementById(`status-${element.id}`).innerText = "문의 대기중"
        } else if (element.status == true){
            document.getElementById(`btn1-${element.id}`).style.display = "none"
            document.getElementById(`text-${element.id}`).style.display = "none"
            document.getElementById(`status-${element.id}`).innerText = "문의 완료"
        }
    })
}

$(document).on('click', '.btn', function () {
    var id = this.id.split("-")[1]
    if (this.innerText == "답변수정") {
        document.getElementById(`btn1-${id}`).style.display = ""
        document.getElementById(`btn2-${id}`).style.display = "none"
        document.getElementById(`text-${id}`).style.display = ""

    } else if ($(`#text-${id}`).val() == ""){
        document.getElementById(`btn1-${id}`).style.display = "none"
        document.getElementById(`btn2-${id}`).style.display = ""
        document.getElementById(`text-${id}`).style.display = "none"

    } else if (this.innerText == "답변작성"){
        answer(this)
    }
});

async function answer(status) {
    var id = status.id.split("-")[1]
    var answer = $(`#text-${id}`).val()
    const response = await fetch(`${BACK_END_URL}/director/inquiry/?Inquiry_id=${id}`,{
        headers:{
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "PUT",
        body: JSON.stringify({
            "answer": answer
        })
    })
    const response_json = await response.json()
    if (status.innerText == "답변작성") {
        document.getElementById(`btn1-${id}`).style.display = "none"
        document.getElementById(`btn2-${id}`).style.display = ""
        document.getElementById(`text-${id}`).style.display = "none"

    } else if (status.innerText == "답변수정"){
        document.getElementById(`btn2-${id}`).style.display = "none"
        document.getElementById(`btn1-${id}`).style.display = ""
    }
    console.log(document.getElementById(`answer-${id}`).innerText)
    $(`#answer-${id}`).text(`${response_json.data.answer}`)
    $(`#text-${id}`).val("")
}