var fadeTime = 300;
window.onload = function () {
    $("#headers").load("header.html");
    $("#menu-bar").load("header_user.html");
    inquirylist()
}


async function inquirylist() {
    const response = await fetch(`${BACK_END_URL}/mypage/inquiry/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    const response_json = await response.json()
    var inquiry_frame = document.getElementById('tbody')
    response_json.forEach(element => {
        const inquiry = document.createElement('tr')
        inquiry.innerHTML = `<tbody class="tbody">
                                <tr>
                                    <td>${element.id}</td>
                                    <td><button1 onclick="answer(${element.id})" >${element.title}</button1 ></td>
                                    <td id="category_${element.id}">${element.category}</td>
                                    <td>${element.created_at}</td>
                                    <td id="not${element.id}">미확인</td><td id="see${element.id}">확인</td>
                                </tr>
                            </tbody>`
        inquiry_frame.prepend(inquiry)
        if (element.status == true) {
            document.getElementById(`not${element.id}`).style.display = "none"
        } else if (element.status == false || element.answer == null) {
            document.getElementById(`see${element.id}`).style.display = "none"
        }

        if (`${element.category}` == 0) {
            document.getElementById(`category_${element.id}`).innerText = "상품"
        } else if (`${element.category}` == 1) {
            document.getElementById(`category_${element.id}`).innerText = "배송"
        } else if (`${element.category}` == 2) {
            document.getElementById(`category_${element.id}`).innerText = "기타"
        }
    })
}
async function answer(id){
    const response = await fetch(`${BACK_END_URL}/mypage/inquiry/`, {
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

    for (i = 0; i < data.length; i ++) {
        if (data[i]['id'] == id) {
            const content = document.createElement('content')
            content.innerHTML = `${data[i].content}`
            content_frame.appendChild(content)
        }
    }


    var answer_frame = document.getElementById('answer')
    $("#answer").empty();

    for (i = 0; i < data.length; i++) {
        if (data[i]['id'] == id) {
            if(data[i]["answer"] == null) {
                const answer = document.createElement('answer')
                answer.innerHTML = `아직 답변이 등록되지 않았습니다.`
                answer_frame.appendChild(answer)
 
            } else {
                const answer = document.createElement('answer')
                answer.innerHTML = `${data[i].answer}`
                answer_frame.appendChild(answer)
            }
        }
        }
})}
