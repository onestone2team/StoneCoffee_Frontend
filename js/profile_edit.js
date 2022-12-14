//=======================모달맨============================
const modal = document.getElementById("modal")
// const modal = document.getElementsByClassName("modal-window")

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

const gobackBtn = modal.querySelector(".gobackbtn")
gobackBtn.addEventListener("click", e => {
    modalOff()
})

// ==============프로필 이미지 변경=================
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
    }
}

// ============프로필 수정 페이지 js===================
window.onload =
    async function ProfileView() {

        const payload = localStorage.getItem("payload")
        const parsed_payload = JSON.parse(payload)
        console.log(parsed_payload)
        console.log(parsed_payload.user_id)

        if (!parsed_payload) {
            alert("권한이 없습니다. 로그인 해주세요")
            location.replace("../templates/main.html")
        }

        const profile = await fetch(`${BACKEND_URL}/mypage/profile/`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access"),
                'content-type': 'application/json',
            },
            method: 'GET',
        })

        const profile_json = await profile.json()
        // const user_profile = profile_json.data
        // console.log(profile_json)
        // console.log(profile_json['data'])
        // console.log(user_profile)
        // console.log(profile_json['profilename'])
        // console.log(profile_json.email)
        // console.log(profile_json.profile)
        // console.log(profile_json.address)
        // console.log(profile_json.phone)

        const profile_image = document.getElementById("preview")
        profile_image.setAttribute("src", `${BACKEND_URL}${profile_json.profile}`)
        const profile_email = document.getElementById("profile_email") //이메일 받아와야함
        profile_email.innerText = profile_json.email
        const profile_name = document.getElementById("profilename")
        profile_name.setAttribute("value", profile_json.profilename)
        const profile_address = document.getElementById("address")
        profile_address.setAttribute("value", profile_json.address)
        const profile_phone = document.getElementById("phone")
        profile_phone.setAttribute("value", profile_json.phone)


    }//window.onload 종료

async function update_profile() {

    const profile_name = document.getElementById("profilename").value;
    const profile_phone = document.getElementById("phone").value;
    const profile_address = document.getElementById("address").value;
    const profile_image = document.querySelector("input[type='file']");
    console.log(profile_image.files[0])


    let formData = new FormData();

    formData.append("profilename", profile_name);
    formData.append("phone", profile_phone);
    formData.append("address", profile_address);
    if (profile_image.value != "") {
        formData.append('profile', profile_image.files[0]);
    }

    const response = await fetch(`${BACKEND_URL}/mypage/profile/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formData,
    })
    
    new_profile_json = await response.json()
    console.log(new_profile_json)

    if (response.status == 200) {
        alert(new_profile_json.message);
    } else { alert("수정이 정상적으로 되지 않았습니다. 다시 시도해주세요.") }

    // location.reload();

}

async function edit_password() {

    const password = document.getElementById("password").value;
    const new_password = document.getElementById("new_password").value;
    const new_password_check = document.getElementById("password_check").value;

    let formData = new FormData();
    formData.append("old_password", password);
    formData.append("password", new_password);
    formData.append("password_check", new_password_check);

    const response = await fetch(`${BACKEND_URL}/mypage/profile/password/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: formData,
    })
        
    new_pw_json = await response.json()
    console.log(new_pw_json)
    alert(new_pw_json.message)
    location.reload();

}

function cancel() {

    location.replace("../main.html")

}