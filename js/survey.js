function saveCookie(name, value, unixTime){
    var date = new Date();
    date.setTime(date.getTime() + unixTime*1000*60*60*24);
    console.log(date)
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/';
    
}