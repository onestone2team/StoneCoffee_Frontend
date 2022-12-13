//=======================모달맨============================
const modal = document.getElementById("modal")

function modalOn() {
    modal.style.display = "flex"
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
// ==============프로필 이미지 변경=================
function readURL(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {document.getElementById('preview').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
    }
}
// ============프로필 수정 페이지 js===================

window.onload = 
async function ProfileView(){ 

    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    console.log(parsed_payload)
    console.log(parsed_payload.user_id)

    if(!parsed_payload){
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../templates/main.html")
    }

    const profile = await fetch(`${BACKEND_URL}/mypage/profile/`,{
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'GET',
    })

    const profile_json = await profile.json()
    const user_profile = profile_json.data
    console.log(user_profile)
    console.log(user_profile.profilename)
    console.log(user_profile.profile)
    console.log(user_profile.address)
    console.log(user_profile.phone)

    const profile_imageo = document.getElementById("preview")
    profile_imageo.setAttribute("src",`${BACKEND_URL}${user_profile.profile}`)
    // const profile_name = document.getElementsById('profile_email') 이메일 받아와야함
    // profile_name.innerText() = 
    const profile_nameo = document.getElementById("profilename")
    profile_nameo.setAttribute("value", user_profile.profilename)
    const profile_addresso = document.getElementById("address")
    profile_addresso.setAttribute("value", user_profile.address)
    const profile_phoneo = document.getElementById("phone")
    profile_phoneo.setAttribute("value", user_profile.phone)


}//window.onload 종료

async function update_profile(){

    const profile_name = document.getElementById("profilename").value;
    const profile_phone = document.getElementById("phone").value;
    const profile_address = document.getElementById("address").value;
    const profile_image = document.querySelector("input[type='file']");
    console.log(profile_image.files[0])
    

    let formData = new FormData();
    if (profile_image.value != "") {
        formData.append('profile', profile_image.files[0]);
    }
    
    formData.append("profilename", profile_name);
    formData.append("phone", profile_phone);
    formData.append("address", profile_address);

    fetch(`${BACKEND_URL}/mypage/profile/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formData,
    })
    .then((data) => console.log(data))
    alert("수정 버튼 클릭");
    location.reload();
}

async function edit_password(){

    const password = document.getElementById("password").value;
    const new_password = document.getElementById("new_password").value;
    const new_password_check = document.getElementById("password_check").value;
    console.log(new_password_check)

    let formData = new FormData();
    formData.append("old_password", password);
    formData.append("password", new_password);
    formData.append("password_check", new_password_check);

    fetch(`${BACKEND_URL}/mypage/profile/password/`,{
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: formData,
    })
    .then((data) => console.log(data))
    alert("비밀번호 수정 버튼 클릭");
    location.reload();
   
}
