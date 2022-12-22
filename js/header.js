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

function searchButton() {
    const searchtage = document.getElementById("searchtage").value
    location.replace(`${FRONT_END_URL}/search.html?search=${searchtage}`)
}
