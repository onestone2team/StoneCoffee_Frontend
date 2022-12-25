var payload1 = localStorage.getItem("payload")
var parsed_payload = JSON.parse(payload1)

access_token = localStorage.getItem("access")
var loginText = document.getElementById("loginout")

if(access_token) {
    const username = document.getElementById("user")
    username.innerText = `${parsed_payload["profilename"]}님 반갑습니다`
    loginText.innerText = "로그아웃"
    if(parsed_payload["is_admin"]==true){
        username.href = "admin_order_list.html"
    }
} else {
    loginText.innerText = "로그인"
}

async function logoutUser() {
    kakao_token = localStorage.getItem("kakao")
    if (kakao_token) {
        const response_logout = await fetch(`https://kapi.kakao.com/v1/user/unlink`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("kakao")
            },
            method: 'GET',
        })
        const response_json = await response_logout.json()
    }

    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    localStorage.removeItem("kakao")

    window.location.replace(`../signupin.html`);
}
function enterkey(e){
    const code = e.code;
    if(code == 'Enter'){
        searchButton()
 }
}

function searchButton() {

        const searchtage = document.getElementById("searchtage").value
        location.replace(`${FRONT_END_URL}/search.html?search=${searchtage}`)

}
async function timeOut() {
    const payload = JSON.parse(localStorage.getItem("payload"));
    // console.log(payload)
    // console.log(payload["jti"])
    // console.log(payload["exp"])
    // console.log(payload["iat"])
    // console.log(payload["user_id"])
    // console.log(Date.now)

    if (payload.exp <(Date.now()/7200)){
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("payload")
        localStorage.removeItem("user")
        localStorage.removeItem("pk")

        alert("세션이 만료 되어서 로그아웃 되었습니다\n메인페이지로 이동하겠습니다.")
        window.location.replace(`../index.html`);
    };
}timeOut()



// 토큰 완료 자동 로그아웃//
// async function timeOut() {
//     const payload = JSON.parse(localStorage.getItem("payload"));
//     if (payload.exp <(Date.now()/1000)){
//         localStorage.removeItem("access")
//         localStorage.removeItem("refresh")
//         localStorage.removeItem("payload")
//         localStorage.removeItem("user")
//         localStorage.removeItem("pk")
//         Swal.fire({
//             title: '토큰세션이 만료되었습니다!',
//             text: '다시로그인 해주세요',
//             icon: 'warning',
//             confirmButtonColor: '#FFCCCC',
//             confirmButtonText: '확인',
//         }).then(result =>{
//             if(result.isConfirmed){
//                 window.location.href = "../templates/main.html"
//             }
//         })
//     };
// }timeOut()