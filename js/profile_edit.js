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