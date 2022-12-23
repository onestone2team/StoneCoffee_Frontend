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
function autoHypenPhone(str){
            str = str.replace(/[^0-9]/g, '');
            var tmp = '';
            if( str.length < 4){
                return str;
            }else if(str.length < 7){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3);
                return tmp;
            }else if(str.length < 11){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 3);
                tmp += '-';
                tmp += str.substr(6);
                return tmp;
            }else{              
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }
            return str;
        }
// =======자동으로 하이픈 입력하기 ===========
function autoHypenPhone(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 10){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
}

var cellphone = document.getElementById('phone');
cellphone.onkeydown = function(event){
    event = event || window.event;
    var _val = this.value.trim();
    this.value = autoHypenPhone(_val);
}

// ========프로필 수정 눌렀을때 inputbox 보이기===========
function edit_profile() {

    //보여준 글씨 숨기기
    document.getElementById("show_name").style.display="none"
    document.getElementById("show_address").style.display="none"
    document.getElementById("show_phone").style.display="none"
    document.querySelectorAll(".show-button").forEach(box => { 
        box.style.display = "none" 
    })

    // 숨겨논 설정 창 보여주기
    
    document.querySelector(".pw-change-btn button").style.display = "inline-block"
    document.querySelectorAll(".input-boxes .input-group-text i").forEach(box => { 
        box.style.display = "inline-block" 
    })
    document.querySelectorAll(".input-boxes input").forEach(input => { 
        input.style.display = "inline-block" 
    })
    document.querySelectorAll(".hide-button").forEach(box => { 
        box.style.display = "inline" 
    })
}

// =======아이콘 눌렀을때 이미지 변경 클릭=============
function onClickUpload() {
    let profileInput = document.getElementById("file");
    profileInput.click();
}

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
        // $("#b1").hover(inputinfo)
        // $("#b2").hover(inputinfo)
        // $("#b3").hover(inputinfo)
        const payload = localStorage.getItem("payload")
        const parsed_payload = JSON.parse(payload)

        if (!parsed_payload) {
            alert("권한이 없습니다. 로그인 해주세요")
            location.replace(`${FRONT_END_URL}/signupin.html`)
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
        const profile_email = document.getElementById("profile_email")
        profile_email.innerText = profile_json.email
        const profile_name = document.getElementById("profilename")
        profile_name.setAttribute("value", profile_json.profilename)
        const profile_address = document.getElementById("address")
        profile_address.setAttribute("value", profile_json.address)
        const profile_phone = document.getElementById("phone")
        profile_phone.setAttribute("value", profile_json.phone)

        // 처음 프로필 글자로 보여주기
        const show_name = document.getElementById("show_name")
        const show_address= document.getElementById("show_address")
        const show_phone = document.getElementById("show_phone")
        show_name.innerText = profile_json.profilename
        show_address.innerText = profile_json.address
        show_phone.innerText = profile_json.phone


    }//window.onload 종료

async function update_profile() {

    const profile_name = document.getElementById("profilename").value;
    const profile_phone = document.getElementById("phone").value;

    const postcode = document.getElementById("postcode").value;
    const address = document.getElementById("address").value;
    const detailAddress = document.getElementById("detailAddress").value;
    const extraAddress = document.getElementById("extraAddress").value;
    const profile_address = '(' + postcode + ')' + ' ' + address + ' ' + detailAddress + ' ' + extraAddress
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
        location.reload()
    } else { alert(new_profile_json.message) }

}

async function edit_password() {

    const password = document.getElementById("password").value;
    const new_password = document.getElementById("new_password").value;
    const new_password_check = document.getElementById("password_check").value;

    if (new_password != new_password_check){
        alert('변경할 비밀번호가 일치하지 않습니다')
    }
    
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

    location.reload()

}

// ================주소 입력==================
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {

            var addr = '';
            var extraAddr = '';

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === 'R') {

                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }

                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }

                document.getElementById("extraAddress").value = extraAddr;

            } else {
                document.getElementById("extraAddress").value = '';
            }

            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            document.getElementById("detailAddress").focus();
        }
    }).open();
}
//====================입력해야하는 정보 제공------------------
// function inputinfo(){
//     const pfnameinfo = document.getElementById('b1')
//     pfnameinfo.innerText="프로필 이름은 4글자 이상, 특수문자는 '_'만 허용됩니다"
//     const addressinfo = document.getElementById('b2')
//     addressinfo.innerText='우편번호를 먼저 찾아주세요'
//     const phoneinfo = document.getElementById('b3')
//     phoneinfo.innerText='-를 포함해서 입력해주세요'
// }