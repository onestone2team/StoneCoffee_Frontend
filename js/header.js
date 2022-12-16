window.onload = function () {
    
}

async function logoutUser() {
    access_token = localStorage.getItem("kakao")
    if (access_token) {
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

    window.location.replace(`../../signupin.html`);
}

function searchButton() {
    console.log("버튼 눌림")
    const searchtage = document.getElementById("searchtage").value
    location.replace(`${FRONT_END_URL}/search.html?search=${searchtage}`)
}