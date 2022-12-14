const detail_page = document.getElementById("detail_page")

// fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
//     .then(response => response.text())
//     .then(result => detail_page.innerHTML = result)


const detail_modal = document.getElementById("detail_modal")

function modalOn() {
    detail_modal.style.display = "flex"
    detail_modal.style.top = window.pageYOffset + 'px';
}

function modalOff() {
    detail_modal.style.display = "none"
}

const closeBtn = detail_modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})

detail_modal.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})


comment_id = 0
async function CommentDetail(num) {
    modalOn()
    comment_id = num
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../templates/main.html")
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
    for (var i = 0; i < 5-comment_detail_json.point; i++) {
        point.innerHTML += "<img id='coffeebean_img_' src='../img/comment/coffeebean-outline.png'>";
    }

    
        
    // 좋아요 색깔 들어가는거 해야함
    // 대댓글에 유저 프로필이미지 필요함
    // 대댓글 blank=False 해야함

    nested_comment_frame = document.getElementById('nestedcommentList')
    while ( nested_comment_frame.hasChildNodes() ) {
        nested_comment_frame.removeChild( nested_comment_frame.firstChild );       
    }
    const nested_list = comment_detail_json.nested_comment_set
    nested_list.forEach(element => {
        const nested = document.createElement('div')
        nested.innerHTML = `<li class="nestedcomment">
                                <div class="commenterImage">
                                    <img src="http://placekitten.com/50/50" />
                                </div>
                                <div class="commentText">
                                    <p> ${element.nested_comment}<p id="onlyme${element.id}"><span id = "del_nested" onclick="del_nested(${element.id})">삭제</span><span>/</span><span id = "edit_nested" onclick="edit_nested(${element.id})">수정</span></p>
                                    <p class="date sub-text">${element.created_at.substr(0, 10)}</p>
                                </div>
                            </li>
                            <!-- Comment Edit -->
                                <div class="nested-edit" id="edit_box${element.id}">
                                    <textarea class="input" name="comment_edit" id="edit_box" ng-model="cmntCtrl.comment.text"
                                    placeholder="Edit Review..." required></textarea>
                                    <div class="edit_button">
                                        <button type="button" onclick="save_nested(${element.id})">add Review</button>
                                    </div> 
                                </div> `

        nested_comment_frame.appendChild(nested)
        if (element.user.id != parsed_payload.user_id) {
            const check_author = document.getElementById(`onlyme${element.id}`)
            check_author.style.display = "none"
        }

    })
    console.log(comment_detail_json["like"], parsed_payload["user_id"])
    like_list = comment_detail_json["like"]
    if (like_list.includes(parsed_payload["user_id"])) {
        const like_icon = document.getElementById('detaillike_icon')
        like_icon.className = "bi bi-heart-fill"
    }




    }//comment detail
async function detailcomment_like() {

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

    const nested_text = document.getElementById('nested_text').value;
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
    console.log(nested_json)
}

function edit_nested(id) {

    const editBox = document.getElementById(`edit_box${id}`)
    if (editBox.style.display == 'none') {
        editBox.style.display = 'block';
    } else {
        editBox.style.display = 'none';
    }
}

async function save_nested(nestedcomment_id) {

    const updated_nested = document.getElementById('edit_box').value
    const response = await fetch(`${BACK_END_URL}/comment/nested/edit/?nestedcomment_id=${nestedcomment_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "comment": updated_nested
        })
    })

}

async function del_nested(comment_id) {
    const response = await fetch(`${BACK_END_URL}/comment/nested/edit/?nestedcomment_id=${comment_id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE'
    })
    const target = document.querySelector(".nestedcomment");
    target.remove();
}

