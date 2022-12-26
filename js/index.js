payload = localStorage.getItem("payload")
parsed_payload = JSON.parse(payload)

adminCheck = false


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

window.addEventListener('load', function () {
    $("#headers").load("header.html");
    checkCookie = getCookie('guestCheck')
    if (checkCookie!='True'){
        location.replace('survey.html')
    }

    show_product_list()
});

async function show_product_list() {

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

    const response = await fetch(`${BACK_END_URL}/product/`, {
        headers: header_edit,
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        var products = document.getElementById("products");
        var recommends = document.getElementById("slide_list");
        recommend_datas = data['recommend']
        
        if (parsed_payload) {
            for (i=0; i<recommend_datas.length;i++) {
                const recommendFrame = document.createElement('div')
                recommendFrame.setAttribute("class", "slide")
                recommendFrame.innerHTML = `<img class="slide_image" src="${BACK_END_URL}${recommend_datas[i]['image']}" alt="이미지">
                <h4>${recommend_datas[i]['product_name']}</h4>`
    
                recommends.appendChild(recommendFrame)
            }
            
        } else {
            document.getElementById('slide_wrap').style.display = 'none'
        }
        
        slideWrap = $(".slide_wrap"),
        slideShow = slideWrap.find(".slide_show"),
        slideList = slideShow.find(".slide_list"),
        slides = slideList.find(".slide"),
        slideCount = slides.length,
        slideWidth = slides.innerWidth(),
        console.log(slideCount)
        slideCopy = $(".slide:lt("+ showNum +")").clone();
        slideList.append(slideCopy);

        for (i = 0; i < 8; i++) {
            const product = document.createElement('div')
            product.setAttribute("class", "aa-product-catg","style","max-width: 150; height: 150;")
            product.innerHTML = `<li>
                                    <figure>
                                        <a id="img" class="aa-product-img" href="product-detail.html?product_id=${data["data"]["coffee"][i]["id"]}">
                                        <img style="max-width:80%; height: 150%; margin:0 auto; display: block;" src="${BACK_END_URL}${data["data"]["coffee"][i]["image"]}" alt="${data["data"]["coffee"][i]["id"]}"></a>
                                        <figcaption>
                                            <h4 class="aa-product-title">${data["data"]["coffee"][i]["product_name"]}</h4>
                                            <span class="aa-product-price">${data["data"]["coffee"][i]["price"]}원</span><span class="aa-product-price"></span>
                                        </figcaption>
                                    </figure>
                                </li>`
                products.appendChild(product)
            }
        })
}

// checkout
async function checkout() {
    const response = await fetch(`${BACK_END_URL}/product/cart`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
}

// 추천슬라이드//
slideWrap = $(".slide_wrap"),
slideShow = slideWrap.find(".slide_show"),
slideList = slideShow.find(".slide_list"),
slides = slideList.find(".slide"),
slideBtn = slideWrap.find(".slide_btn");

slideCount = slides.length,
slideWidth = slides.innerWidth()
showNum = 4
num = 0
currentIndex = 0

//이미지 움직이기
function backShow(){
    if( num == 0 ){
        //시작
        num= slideCount;
        slideList.css("left", -num * slideWidth + "px");
    }
    num--;
    slideList.stop().animate({ left : -slideWidth * num +"px"}, 400);
}

function nextShow(){
    if( num == slideCount ){
        //마지막
        num= 0;
        slideList.css("left", num);
    }
    num++;
    slideList.stop().animate({ left : -slideWidth * num +"px"}, 400);
}

//왼쪽, 오른쪽 버튼 설정
slideBtn.on("click","button",function(){
    if( $(this).hasClass("prev")){
        //왼쪽 버튼을 클릭
        backShow();
    } else {
        //오른쪽 버튼을 클릭
        nextShow();
    }
});

