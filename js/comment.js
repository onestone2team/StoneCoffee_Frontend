// 없애도될듯
const detail_page = document.getElementById("detail_page")

fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
    .then(response => response.text())
    .then(result => detail_page.innerHTML = result)


const modal = document.getElementById("modal")

function modalOn() {
    modal.style.display = "flex"
}

function isModalOn() {
    return modal.style.display === "flex"
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

modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})
//esc눌렀을때 꺼짐
window.addEventListener("keyup", e => {
    if(isModalOn() && e.key === "Escape") {
        modalOff()
    }
})

//게시글 불러오기
window.onload=async function ProductDetail() {

    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    console.log(parsed_payload)

    // if(!parsed_payload){
    //     alert("권한이 없습니다. 로그인 해주세요")
    //     location.replace("../templates/main.html")
    // }

    // $("#headers").load("../templates/navigation.html");

    const product_detail = await fetch(`${BACKEND_URL}/product/${product_id}/view/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    product_detail_json = await product_detail.json()
    console.log(product_detail_json)
    comments = product_detail_json.comments_set
}//Product detail
