function saveCookie(name, value, unixTime){
    var date = new Date();
    date.setTime(date.getTime() + unixTime*1000*60*60*24);
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/';
    location.replace('main.html')
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



function sendSurvey(){
    const aroma_grade = document.querySelector('input[name="aroma"]:checked').value;
    const sweet_grade = document.querySelector('input[name="sweet"]:checked').value;
    const acidity_grade = document.querySelector('input[name="acidity"]:checked').value;
    const balance_grade = document.querySelector('input[name="balance"]:checked').value;
    const sendSurvey = document.getElementsByClassName('sendSurvey')[0].style
    const showSurvey = document.getElementById('showSurvey')



    const coffeeshow = document.getElementById('coffeeShow')
    showSurvey.style.display = "none"
    sendSurvey.display= "none"
    coffeeshow.style.display = "block";

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
