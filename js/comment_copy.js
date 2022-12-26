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
                                            <button type="button" onclick="save_nested(${element.id})">수정</button>
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
    $("#headers").load("header.html");

    nestedcommentlist()

    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../index.html")
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
    //이미지 없는 경우 그냥 이미지 없는 채로 올라가게하기
    if (comment_detail_json.image == null){
        const commentBox = document.getElementById('commentBox')
        commentBox.innerHTML=`<table>
                                <tr class="comment-content-Box">
                                    <td colspan="2" class="comment-text">
                                        <p id="comment_text">${comment_detail_json.comment}
                                        </p>
                                    </td>
                                </tr>
                                <tr class="comment-info-Box">
                                    <td class="comment-date">
                                        <span id="date">${comment_detail_json.created_at.substr(0, 10)}</span>
                                    </td>                                    
                                    <td class="clike-button like-count">
                                        <span><button id='cbtn' onclick ="comment_like(${comment_detail_json.id})"><i id="like_icon${comment_detail_json.id}" class="bi bi-heart"></i></button></span>
                                        <span id="like_count${comment_detail_json.id}">좋아요 ${comment_detail_json.like.length}개</span>                                
                                        <span class="comment-editdel id="comment-editdel${comment_detail_json.id}"><span id="" onclick="editCommentBtn()">수정</span>/<span
                                        id="" onclick="deleteComment()">삭제</span></span>
                                    </td> 
                                </tr>
                            </table>`
    
    }
    else{
        const commentBox = document.getElementById('commentBox')
        commentBox.innerHTML= `<table>
                                <tr class="comment-content-Box">
                                    <td rowspan="2" class="comment-image"><img id="comment_image" src=${BACK_END_URL}${comment_detail_json.image}></td>
                                    <td colspan="2" class="comment-text">                                    
                                        <p id="comment_text">${comment_detail_json.comment}
                                        </p>                                                                            
                                    </td>
                                </tr>
                                <tr class="comment-info-Box">
                                    <td class="comment-date">
                                        <span id="date">${comment_detail_json.created_at.substr(0, 10)}</span>
                                    </td>
                                    <td class="clike-button like-count">
                                        <span><button id='cbtn' onclick ="comment_like(${comment_detail_json.id})"><i id="like_icon${comment_detail_json.id}" class="bi bi-heart"></i></button></span>
                                        <span id="like_count${comment_detail_json.id}">좋아요 ${comment_detail_json.like.length}개</span>                                
                                        <span class="comment-editdel id="comment-editdel${comment_detail_json.id}"><span id="" onclick="editCommentBtn()">수정</span>/<span
                                        id="" onclick="deleteComment()">삭제</span></span>
                                    </td> 
                                </tr>
                            </table>`
    }

    var star_point = document.getElementById('taste-grade')
    star_point.innerHTML = ""
    for (var i = 0; i < comment_detail_json.point; i++) {

        star_point.innerHTML+=`<span id="coffeebean">⭐</span>`
    }
    for (var i = 0; i < 5 - comment_detail_json.point; i++) {

        star_point.innerHTML += `<span id="coffeebean_">⭐</span>`
    }

    like_list = comment_detail_json["like"]
    console.log(like_list)
    
    const like_icon = document.getElementById(`like_icon${comment_detail_json.id}`)
    if (like_list.includes(parsed_payload["user_id"])) {
        like_icon.className = "bi bi-heart-fill"
    } else { like_icon.className = "bi bi-heart" }

    const check_author = document.getElementById(`comment-editdel${comment_detail_json.id}`)
    
    if (comment_detail_json.user.id != parsed_payload.user_id) {
        check_author.style.display = "none"
    }
}//window.onload

async function comment_like(id) {

    const response = await fetch(`${BACK_END_URL}/comment/like/?comment_id=${id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })
    
    const response_json = await response.json()

    var like_count=document.getElementById(`like_count${id}`)
    var heart = document.getElementById(`like_icon${id}`)
    if (response.status == 201){
        heart.className = "bi bi-heart-fill"
        like_count.innerText= `좋아요 ${response_json.count}개`
    } else if (response.status == 200) {
        heart.className = "bi bi-heart"
        like_count.innerText= `좋아요 ${response_json.count}개`
    } else {
        alert(response_json["message"])
    }

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

    // if (response.status == 201 || 200) {
    //     alert(nested_json.message)
    // }
    nestedcommentlist()
    //댓글 작성란 비우기
    document.getElementById('nested-create-text').value=''
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

//커멘트 모달창
const modal = document.querySelector('.modal');

const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
});

$("#input_image").change(function(){
    readFile(this);
});

function readFile(input_image){
    var reader = new FileReader();
    reader.onload = function(e){
        $('#output_image').attr('src', e.target.result);
    }
    reader.readAsDataURL(input_image.files[0]);
}

async function editCommentBtn() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    modal.style.top = window.pageYOffset + 'px';
    document.body.style.overflowY = "hidden";

    const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${comment_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET",
    })
    var response_json = await response.json()
    
    const editmodalImage = document.getElementById("output_image");
    editmodalImage.src = BACK_END_URL+response_json["image"]
    const editmodalComment = document.getElementById("edit-text");
    editmodalComment.innerText = response_json["comment"]
    const editcomment_point = document.getElementById("editcomment_point");
    editcomment_point.value = response_json["point"]
    const editCommentbtn = document.getElementById("edit-commentbtn");
    editCommentbtn.value = response_json["id"]
}

async function deleteComment() {

    var del_comment_confirm = confirm('리뷰를 삭제하시겠습니까?')
    
    if(del_comment_confirm){
        const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${comment_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "DELETE",
    })

    var target = document.getElementById('detailBox')
    if (response.status==204){
            target.remove();
            location.href=document.referrer       
    } else{
            alert("삭제되지 않았습니다")
          }
    }
  
}
    
async function saveeditCommentBtn() {
    const modal = document.querySelector('.modal');
    const editCommentbtn = document.getElementById("edit-commentbtn");
    var num = editCommentbtn.value
    // const comment_form= document.querySelector("comment_form")
    const comment_content=document.getElementById("edit-text").value
    const comment_img=document.getElementById("input_image")
    const comment_point=document.getElementById("editcomment_point").value
    let formdata = new FormData
    formdata.append('comment', comment_content)
    formdata.append('point', comment_point)
    if (comment_img.files[0] != undefined){
        formdata.append('image', comment_img.files[0])
    }

    const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${num}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formdata
    })

    var response_json = await response.json()
    if(response.status == 201){
        alert(response_json["message"])
        modal.style.display = "none";
        document.body.style.overflowY = "visible";
        window.location.reload()
    }
}

