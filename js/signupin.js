const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
};


window.onload = async function () {

    let urlParameter = window.location.search;
    var code_name = urlParameter.split('=')[0]
    var code_id = urlParameter.split('=')[1]

    if (code_name == "?code") {
        const response = await fetch(`${BACK_END_URL}/user/kakao/callback/?code=${code_id}`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })

        if (response.status == 200) {
            alert("카카오 로그인 완료")
            const response_json = await response.json()
            localStorage.setItem("access", response_json.access);
            localStorage.setItem("refresh", response_json.refresh);
            localStorage.setItem("kakao", response_json.kakao_access);
            const base64Url = response_json.access.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            localStorage.setItem("payload", jsonPayload);
            window.location.replace(`../index.html`);
        }
        else {
            alert("아이디와 비밀번호를 확인해주세요")
        }


    }

}

async function kakaologin() {

  KAKAO_CONFIG = {
      "KAKAO_REST_API_KEY": "5508ff8ddc147381284f4cad3a77cf87",
      "KAKAO_REDIRECT_URI": `${FRONT_END_URL}/signupin.html`
  };

    kakao_login_uri = "https://kauth.kakao.com/oauth/authorize"
    kakao_token_uri = "https://kauth.kakao.com/oauth/token"

    client_key = KAKAO_CONFIG["KAKAO_REST_API_KEY"]
    redirect_uri = KAKAO_CONFIG["KAKAO_REDIRECT_URI"]

    uri = `${kakao_login_uri}?client_id=${client_key}&redirect_uri=${redirect_uri}&response_type=code`

    location.replace(uri)

}
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
nameError.style.display = "none"
emailError.style.display = "none"
passwordError.style.display = "none"
//-----------------------------회원가입------------------------------
async function signupButton() {
    const profilename = document.getElementById("signup_profilename").value;
    const password = document.getElementById("signup_password").value;
    const password_check = document.getElementById("signup_password2").value;
    const email = document.getElementById("signup_email").value;

    // 에러 메시지 초기화
    nameError.style.display = "none"
    emailError.style.display = "none"
    passwordError.style.display = "none"

    //validate
    var name_re =/^[a-zA-Z0-9+_]{4,}/;
    var email_re = /^[a-zA-Z0-9+-_.]+@([a-zA-Z0-9-]{4,})+\.[a-zA-Z0-9-.]+$/;
    var password_re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;

    if (profilename==""){
        nameError.innerText = "유저 이름을 입력하세요"
        nameError.style.display = "inline"
    }
    else if (!name_re.test(profilename)){
        nameError.innerText = "영어로 4글자 이상 특수문자는 _만 사용가능합니다"
        nameError.style.display = "inline"
    }
    else if (email==""){
        emailError.innerText = "email을 입력하세요"
        emailError.style.display = "inline"
    } 
    else if (!email_re.test(email)){
        emailError.innerText = "email형식을 확인해 주세요"
        emailError.style.display = "inline"
    }
    else if (password==""){
        passwordError.innerText = "패스워드를 입력하세요"
        passwordError.style.display = "inline"
    }
    else if (password_check==""){
        passwordError.innerText = "패스워드 확인을 입력하세요"
        passwordError.style.display = "inline"
    }
    else if (password!=password_check){
        passwordError.innerText = "패스워드가 서로 다릅니다"
        passwordError.style.display = "inline"
    }
    else if (!password_re.test(password)){
        passwordError.innerText = "패스워드 형식을 확인해주세요 특수문자 포함 8글자 이상입니다"
        passwordError.style.display = "inline"
    }

    else{ 
        const response = await fetch(`${BACK_END_URL}/user/signup/`, {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "profilename": profilename,
                "email": email,
                "password": password,
                "password_check": password_check
            })
        })
        const response_json = await response.json()
    
        if (response.status == 201) {
            alert(response_json["message"])
            window.location.replace(`${FRONT_END_URL}/signupin.html`);
        }
        else {
            if (response_json["email"]) {
                alert("email :" + response_json["email"])
            } else if (response_json["password"]) {
                alert("password :" + response_json["password"])
            } else if (response_json["password_check"]) {
                alert("password_check :" + response_json["password_check"])
            } else if (response_json["profilename"]) {
                alert("profilename :" + response_json["profilename"])
            } else {
                alert("회원 가입 정보 이상")
            }
        }
    }
}


//------------------------------로그인---------------------------------
async function loginButton() {
    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value

    const response = await fetch(`${BACK_END_URL}/user/login/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    if (response.status == 200) {
        alert("로그인 완료")
        const response_json = await response.json()
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${FRONT_END_URL}/index.html`);
    }
    else {
        alert("아이디와 비밀번호를 확인해주세요")
    }
}