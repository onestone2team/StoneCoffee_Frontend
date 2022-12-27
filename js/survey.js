const payload = localStorage.getItem("payload")
const parsed_payload = JSON.parse(payload)

window.onload = function(){
    access = localStorage.getItem("access")
    refresh = localStorage.getItem("refresh")
    

    if (access==null||refresh==null||payload==null){

        document.getElementById("removeText2").innerHTML="⊗ 로그인 하러 가기"       
    }
    else{       
        document.getElementById("removeText2").innerHTML="⊗ 메인화면으로 가기"
    }
}


function check(){

    if (access==null||refresh==null||payload==null){

        location.replace('signupin.html')
    }
    else{
        location.replace('index.html')
    }

}


function saveCookie(name, value, unixTime){

    var date = new Date();
    date.setTime(date.getTime() + unixTime*1000*60*60*24);

    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/';
    //   location.replace('signupin.html')
    // 
    check()

}

function startSurvey(){
    const icon = document.getElementById('icon')
    const removeText1 = document.getElementById('removeText1')
    const removeText2 = document.getElementById('removeText2')
    const showSurvey = document.getElementById('showSurvey')

    icon.style.display = "none"
    removeText1.style.display = "none"
    removeText2.style.display = "none"
    showSurvey.style.display = "block"
}

async function sendSurvey(){
    const aroma_grade = document.querySelector('input[name="aroma"]:checked').value;
    const sweet_grade = document.querySelector('input[name="sweet"]:checked').value;
    const acidity_grade = document.querySelector('input[name="acidity"]:checked').value;
    const balance_grade = document.querySelector('input[name="balance"]:checked').value;
    const sendSurvey = document.getElementsByClassName('sendSurvey')[0].style
    const showSurvey = document.getElementById('showSurvey')

    if (localStorage.getItem("access")){
        header_edit = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        }
        
    } else {
        header_edit = {
            'Content-Type': 'application/json',
        }
    }

    const response_survey = await fetch(`${BACK_END_URL}/survey/`, {
        headers: header_edit,
        method: 'POST',
        body: JSON.stringify({
            "aroma_grade": aroma_grade,
            "sweet_grade": sweet_grade,
            "acidity_grade": acidity_grade,
            "body_grade": balance_grade,
        })
    })
    const response_json = await response_survey.json()
    const coffeedata = response_json["data"]["1"]

    const recommend_content = document.getElementById("recommend_content")
    recommend_content.innerText = coffeedata.content
    const recommend_img = document.getElementById("recommend_img")
    recommend_img.src = `${BACK_END_URL}${coffeedata.image}`
    const recommend_name = document.getElementById("recommend_name")
    recommend_name.innerText = coffeedata.product_name

    const coffeeshow = document.getElementById('coffeeShow')
    showSurvey.style.display = "none"
    sendSurvey.display= "none"
    coffeeshow.style.display = "block";

    // 로그인 시 구매 위치로 이동
    const nextButton = document.querySelector('.signup-btn')
    const nextLink = document.querySelector('.fourth-sec a')
    const loginText = document.querySelector('.login-text')

    if (parsed_payload) {
        nextButton.innerText = '구매하러 가기'
        nextLink.href = `product-detail.html?product_id=${coffeedata.id}`
        loginText.style.display = 'none'
    }

}

const sweetChecks = document.querySelectorAll('input[name="sweet"]');
const aromaChecks = document.querySelectorAll('input[name="aroma"]');
const acidityChecks = document.querySelectorAll('input[name="acidity"]');
const balanceChecks = document.querySelectorAll('input[name="balance"]');

function sweet_listener(){
    const aromaform = document.getElementsByClassName('aromaform')[0].style
    aromaform.opacity = 1;
}
function aroma_listener(){
    const acidityCheck = document.getElementsByClassName('acidityform')[0].style
    acidityCheck.opacity = 1;
}
function acidity_listener(){
    const balanceCheck = document.getElementsByClassName('balanceform')[0].style
    balanceCheck.opacity = 1;
}
function balance_listener(){
    const sendSurvey = document.getElementsByClassName('sendSurvey')[0].style
    sendSurvey.display= "flex"
}

[].forEach.call(sweetChecks, function(sweetCheck){
    sweetCheck.addEventListener("click", sweet_listener);
});
[].forEach.call(aromaChecks, function(aromaCheck){
    aromaCheck.addEventListener("click", aroma_listener);
});
[].forEach.call(acidityChecks, function(acidityCheck){
    acidityCheck.addEventListener("click", acidity_listener);
});
[].forEach.call(balanceChecks, function(balanceCheck){
    balanceCheck.addEventListener("click", balance_listener);
});
