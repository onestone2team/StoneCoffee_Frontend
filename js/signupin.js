document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
  });

//-----------------------------회원가입------------------------------
async function signupButton() {
    console.log('회원가입 실행')
    const profilename = document.getElementById("signup_profilename").value;
    const password = document.getElementById("signup_password").value;
    const password_check = document.getElementById("signup_password2").value;
    const email = document.getElementById("signup_email").value;
  
    const response = await fetch(`${BACKEND_URL}/user/signup/`, {
        headers:{
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
  
    if (response.status == 201){
      alert(response_json["message"])
      window.location.replace(`${FRONTEND_URL}/signupin.html`);
    }
      else{
      if(response_json["email"]){
        alert("email :"+response_json["email"])
      } else if(response_json["password"]){
        alert("password :"+response_json["password"])
      } else if(response_json["password_check"]){
        alert("password_check :"+response_json["password_check"])
      } else if(response_json["profilename"]){
        alert("profilename :"+response_json["profilename"])
      } else {
        alert("회원 가입 정보 이상")
      }
      }
      
  }


//------------------------------로그인---------------------------------
async function loginButton() {
console.log('로그인 실행')
const email = document.getElementById("login_email").value
const password = document.getElementById("login_password").value

const response = await fetch(`${BACKEND_URL}/user/login/`, {
    headers:{
    "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
        "email": email,
        "password": password
    })
})

if (response.status == 200){
    alert("로그인 완료")
    const response_json = await response.json()
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    window.location.replace(`${FRONTEND_URL}/main.html`);
  }
  else{
    alert("아이디와 비밀번호를 확인해주세요")
  }
    
  console.log(response)

}