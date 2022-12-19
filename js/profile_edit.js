//=======================모달맨============================
const modal = document.getElementById("modal")
// const modal = document.getElementsByClassName("modal-window")

function modalOn() {
    modal.style.display = "block"
    modal.style.top = window.pageYOffset + 'px';
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
        $("#headers").load("header.html");
        $("#menu-bar").load("header_user.html");
        const payload = localStorage.getItem("payload")
        const parsed_payload = JSON.parse(payload)

        if (!parsed_payload) {
            alert("권한이 없습니다. 로그인 해주세요")
            location.replace("../templates/index.html")
        }

        const profile = await fetch(`${BACK_END_URL}/mypage/profile/`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access"),
                'content-type': 'application/json',
            },
            method: 'GET',
        })

        const profile_json = await profile.json()

        const profile_image = document.getElementById("preview")
        profile_image.setAttribute("src", `${BACK_END_URL}${profile_json.profile}`)
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


    let formData = new FormData();

    formData.append("profilename", profile_name);
    formData.append("phone", profile_phone);
    formData.append("address", profile_address);
    if (profile_image.value != "") {
        formData.append('profile', profile_image.files[0]);
    }

    const response = await fetch(`${BACK_END_URL}/mypage/profile/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formData,
    })
    
    new_profile_json = await response.json()

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

    const response = await fetch(`${BACK_END_URL}/mypage/profile/password/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: formData,
    })
    new_pw_json = await response.json()
    alert(new_pw_json.message)
    location.reload();

}

function cancel() {

    location.replace("../index.html")

}