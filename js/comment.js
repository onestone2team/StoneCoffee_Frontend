// 없애도될듯
const detail_page = document.getElementById("detail_page")

fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
    .then(response => response.text())
    .then(result => detail_page.innerHTML = result)


const modal = document.getElementById("modal")

function modalOn() {
    modal.style.display = "flex"
}

function isModalOn() {
    return modal.style.display === "flex"
}

function modalOff() {
    modal.style.display = "none"
}


const btnModal = document.getElementById("btn-modal")
btnModal.addEventListener("click", e => {
    modalOn()
})

const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})

modal.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})
//esc눌렀을때 꺼짐
window.addEventListener("keyup", e => {
    if (isModalOn() && e.key === "Escape") {
        modalOff()
    }
})

//글 불러오기
let urlParameter = window.location.search;
var comment_id = urlParameter.split('=')[1]
window.onload =
    async function CommentDetail() {

        const payload = localStorage.getItem("payload")
        const parsed_payload = JSON.parse(payload)
        console.log(parsed_payload)
        console.log(parsed_payload.user_id)

        if (!parsed_payload) {
            alert("권한이 없습니다. 로그인 해주세요")
            location.replace("../templates/main.html")
        }

        // let urlParameter = window.location.search;
        // var comment_id = urlParameter.split('=')[1]
        // console.log(comment_id)
        const comment_detail = await fetch(`${BACKEND_URL}/comment/edit/?comment_id=${comment_id}`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'GET',
        })

        const comment_detail_json = await comment_detail.json()
        console.log(comment_detail_json)
        // console.log(comment_detail_json.product)
        // console.log(comment_detail_json.id)
        // console.log('-----댓글-----')
        // console.log(comment_detail_json.image)
        // console.log(comment_detail_json.comment)
        // console.log(comment_detail_json.point)
        // console.log(comment_detail_json.like.length)
        // console.log(comment_detail_json.created_at)
        // console.log(comment_detail_json.created_at.split("-",1))
        // console.log(comment_detail_json.created_at.split("-")[1])
        // console.log(comment_detail_json.created_at.split("-")[2].substr(0, 2))
        // console.log(comment_detail_json.updated_at)
        // console.log('-----대댓글-----')
        // console.log(comment_detail_json.nested_comment_set)
        console.log(comment_detail_json.nested_comment_set[0])
        // console.log(comment_detail_json.nested_comment_set[0].nested_comment)
        // console.log(comment_detail_json.nested_comment_set[0].created_at)
        // console.log('-----사용자-----')
        // console.log(comment_detail_json.user)
        // console.log(comment_detail_json.user.id)
        // console.log(comment_detail_json.user.profile)
        // console.log(comment_detail_json.user.profilename)

        //작성자 정보
        const comment_profileimage = document.getElementById("comment_profileimage")
        comment_profileimage.setAttribute("src", `${BACKEND_URL}${comment_detail_json.user.profile}`)
        const comment_profilename = document.getElementById("comment_profilename")
        comment_profilename.innerText = comment_detail_json.user.profilename
        //댓글 정보
        const comment_image = document.getElementById("comment_image")
        comment_image.setAttribute("src", `${BACKEND_URL}${comment_detail_json.image}`)
        const comment_text = document.getElementById("comment_text")
        comment_text.innerText = comment_detail_json.comment
        // const point = document.getElementById("point")
        // point.innerText = comment_detail_json.point
        const date = document.getElementById("date")
        date.innerText = comment_detail_json.created_at.substr(0, 10)
        const like_count = document.getElementById("like_count")
        like_count.innerText = '좋아요 ' + comment_detail_json.like.length + '개'
        
        // function comment_point(paragraph_id, how_many_times){
        //     var paragraph = document.getElementById(paragraph_id);
        //                 for (var i = 0; i < how_many_times; i++) {
        //                     paragraph.innerHTML += "<img src='location_of_your_photo_file/file_name.jpg'";
        //                 }

        // }
        
        var point = document.getElementById('coffeebean');
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
        const nested_list = comment_detail_json.nested_comment_set
        // console.log(nested_list[0].id)
        nested_list.forEach(element => {
            const nested = document.createElement('div')
            nested.innerHTML = `<li class="nestedcomment">
                                    <div class="commenterImage">
                                        <img src="http://placekitten.com/50/50" />
                                    </div>
                                    <div class="commentText">
                                        <p> ${element.nested_comment}<p id="onlyme${element.id}"><span id = "del_nested" onclick="del_nested(${element.id})">삭제</span><span>/</span><span id = "edit_nested" onclick="edit_nested(${element.id})">수정</span></p></p>
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

            if (element.user != parsed_payload.user_id) {
                const check_author = document.getElementById(`onlyme${element.id}`)
                check_author.style.display = "none"
            }

        })
        console.log(comment_detail_json.like)
        like_list = comment_detail_json.like
        if (like_list.includes(parsed_payload.user_id)) {
            const like_icon = document.getElementById('like_icon')
            like_icon.className = "bi bi-heart-fill"
        }




    }//comment detail
async function comment_like() {

    const response = await fetch(`${BACKEND_URL}/comment/like/?comment_id=${comment_id}`, {
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
    const response = await fetch(`${BACKEND_URL}/comment/nested/?comment_id=${comment_id}`, {
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
    const response = await fetch(`${BACKEND_URL}/comment/nested/edit/?nestedcomment_id=${nestedcomment_id}`, {
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
    const response = await fetch(`${BACKEND_URL}/comment/nested/edit/?nestedcomment_id=${comment_id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE'
    })
    const target = document.querySelector(".nestedcomment");
    target.remove();
}

