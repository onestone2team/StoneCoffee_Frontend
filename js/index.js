
window.onload = async function (){
    checkCookie = getCookie('guestCheck')
    console.log(checkCookie)
    if (checkCookie!='True'){
        location.replace('survey.html')
    }

}

function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    for (i=0;i<cookie.length;i++){
        cookie[i] = cookie[i].replace(' ','')
        var dic = cookie[i].split('=');
        if (key == dic[0]){
            result = dic[1];
            return dic[1]
        }
    }
    return false
}