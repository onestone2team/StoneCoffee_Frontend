
const urlParameter = window.location.search
var params = new URLSearchParams(urlParameter)
var comment_id = params.get('comment_id')

async function nestedcommentlist() {

    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    const comment_detail = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${comment_id}`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    nested_comment_frame = document.getElementById('nestedcommentBox')
    while (nested_comment_frame.hasChildNodes()) {
        nested_comment_frame.removeChild(nested_comment_frame.firstChild);
    }
    const comment_detail_json = await comment_detail.json()
    const nested_list = comment_detail_json.nested_comment_set
    nested_list.forEach(element => {
        const nested = document.createElement('div')
        nested.innerHTML = `<table class="nestedcomment" id="nestedcomment${element.id}">
                                    <tr>
                                        <td class="first-column" rowspan="2"><img src="${BACK_END_URL}${element.user.profile}"/></td>
                                        <td class="second-column profilename">${element.user.profilename}</td>
                                        <td class="third-column">
                                            <p class="date">${element.created_at.substr(0, 10)}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="second-column comment">
                                            <p>${element.nested_comment}</p>
                                        </td>
                                        <td class="third-column" id="onlyme${element.id}"><span id="edit_nested" onclick="edit_nested(${element.id})">수정</span>/<span
                                                id="del_nested" onclick="del_nested(${element.id})">삭제</span>
                                        </td>
                                    </tr>
                                </table>
                                <!-- 대댓수정란 -->
                                <table class="nested-edit" id="nested-edit${element.id}">
                                    <tr id="nested-edit-text-tr${element.id}">
                                        <td class="nested-edit-text" ><textarea placeholder="" required id="nested-edit-text${element.id}"></textarea></td>
                                        <td class="nested-edit-btn">
                                            <button type="button" onclick="save_nested(${element.id})">수정하기</button>
                                        </td>
                                    </tr>
                                </table>`

        nested_comment_frame.appendChild(nested)
        if (element.user.id != parsed_payload.user_id) {
            const check_author = document.getElementById(`onlyme${element.id}`)
            check_author.style.display = "none"
        }

    })
}
window.onload=
async function CommentDetailPage() {

    // 임포트를 해보자!!
    nestedcommentlist()
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../main.html")
    }

    const comment_detail = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${comment_id}`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const comment_detail_json = await comment_detail.json()
    //작성자 정보
    const comment_profileimage = document.getElementById("comment_profileimage")
    comment_profileimage.setAttribute("src", `${BACK_END_URL}${comment_detail_json.user.profile}`)
    const comment_profilename = document.getElementById("comment_profilename")
    comment_profilename.innerText = comment_detail_json.user.profilename
    //댓글 정보
    const comment_image = document.getElementById("comment_image")
    comment_image.setAttribute("src", `${BACK_END_URL}${comment_detail_json.image}`)
    const comment_text = document.getElementById("comment_text")
    comment_text.innerText = comment_detail_json.comment
    const date = document.getElementById("date")
    date.innerText = comment_detail_json.created_at.substr(0, 10)
    const like_count = document.getElementById("like_count")
    like_count.innerText = '좋아요 ' + comment_detail_json.like.length + '개'

    var point = document.getElementById('coffeebean');
    point.innerHTML = ""
    for (var i = 0; i < comment_detail_json.point; i++) {
        point.innerHTML += "<img id='coffeebean_img' src='../img/comment/coffeebean.png'>";
    }
    for (var i = 0; i < 5 - comment_detail_json.point; i++) {
        point.innerHTML += "<img id='coffeebean_img_' src='../img/comment/coffeebean-outline.png'>";
    }

    like_list = comment_detail_json["like"]
    if (like_list.includes(parsed_payload["user_id"])) {
        const like_icon = document.getElementById('like_icon')
        like_icon.className = "bi bi-heart-fill"
    }

}//window.onload

async function comment_like() {

    const response = await fetch(`${BACK_END_URL}/comment/like/?comment_id=${comment_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })


    if (response.status == 201) {
        alert('좋아요')
    } else { alert('좋아요 취소') }
    location.reload()

}


async function create_nested() {

    const nested_text = document.getElementById('nested-create-text').value
    const response = await fetch(`${BACK_END_URL}/comment/nested/?comment_id=${comment_id}`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
            "nested_comment": nested_text
        })
    })
    nested_json = await response.json()

    if (response.status == 201 || 200) {
        alert(nested_json.message)
    }
    nestedcommentlist()
}

function edit_nested(id) {

    const editBox = document.getElementById(`nested-edit${id}`)
    const editBoxtr = document.getElementById(`nested-edit-text-tr${id}`)
    if (editBox.style.display == 'none') {
        $(editBox).show()
    } else {
        editBox.style.display = 'none';
    }
}

async function save_nested(nestedcomment_id) {

    const updated_nested = document.getElementById(`nested-edit-text${nestedcomment_id}`).value
    const response = await fetch(`${BACK_END_URL}/comment/nested/edit/?nestedcomment_id=${nestedcomment_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "nested_comment": updated_nested
        })
    })

    nested_json = await response.json()
    if (response.status == 201 || 200) {
        alert(nested_json.message)
    }

    nestedcommentlist()
    

}

async function del_nested(nestedcomment_id) {
    const response = await fetch(`${BACK_END_URL}/comment/nested/edit/?nestedcomment_id=${nestedcomment_id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE'
    })

    const target = document.getElementById(`nestedcomment${nestedcomment_id}`);
    
    nested_json = await response.json()
    if (response.status == 200) {
        target.remove();
        alert(nested_json.message)
    }

    nestedcommentlist()
}

