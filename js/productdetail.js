let urlParameter = window.location.search;
var product_id1 = urlParameter.split('=')[1]
var product_id = product_id1.split('/')[0]

//=======게시글 불러오기========
window.onload = async function ProductDetail() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    if(!parsed_payload){
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../main.html")
    }


    const product = await fetch(`${BACK_END_URL}/product/detail/?product_id=${product_id} `, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })


//========제품 이미지 불러오기========
    product_json = await product.json()
    const product_image = document.getElementById("productimage")
    product_image.setAttribute("src", `${BACK_END_URL}${product_json.products["image"]}`)
    product_image.setAttribute("style", `width:80%; height:80%;`)




//이름,가격불러오는 코드
    name2=document.getElementById('name')
    const name1 = document.createElement('p')
    name1.innerHTML=`<h3>${product_json.products["product_name"]}</h3>`
    name2.appendChild(name1)
    //상품 평가 점수 
    if (product_json.products["aroma_grade"] >=1){
        aroma2=document.getElementById('aroma')
        const aroma1 = document.createElement('p')
        aroma1.innerHTML=`<h3>향 ${product_json.products["aroma_grade"]}</h3>`
        aroma2.appendChild(aroma1)

        acidity2=document.getElementById('acidity')
        const acidity1 = document.createElement('p')
        acidity1.innerHTML=`<h3>산미 ${product_json.products["acidity_grade"]}</h3>`
        acidity2.appendChild(acidity1)

        body2=document.getElementById('body')
        const body1 = document.createElement('p')
        body1.innerHTML=`<h3>바디 ${product_json.products["body_grade"]}</h3>`
        body2.appendChild(body1)

        sweet2=document.getElementById('sweet')
        const sweet1 = document.createElement('p')
        sweet1.innerHTML=`<h3>당도 ${product_json.products["sweet_grade"]}</h3>`
        sweet2.appendChild(sweet1)
        //용량 선택하는 select
        w_option=document.getElementById('option')
        const w_option2 =document.createElement('p')
        w_option2.innerHTML=`<div class="size">
        <h4>용량 선택</h4>
        <select size="1" id=weight>
            <option value="0">중량</option>
            <option value="300">300g</option>
            <option value="500">500g</option>
                </select>
            </div>`
        w_option.appendChild(w_option2)
    }
    // 가격
        price2=document.getElementById('price')
        const price1 = document.createElement('div')
        price1.innerHTML=`<h3 class="price">가격 : ${product_json.products["price"]} 원</h3>`
        price2.appendChild(price1)
    //상품 내용 description 
    productinformation2=document.getElementById('description')
    const productinformations2 = document.createElement('p')
    productinformation2.innerHTML=`<h3>${product_json.products["content"]}</h3>`
    productinformation2.appendChild(productinformations2)
    //용량
    

    // 추천 상품
    if (product_json.products["aroma_grade"] >=1){
        for (i = 0; i < 6; i++) {
            recommend=document.getElementById('recommend')
            const recommends = document.createElement('div')
            recommends.setAttribute("class", `divrecommend`)
            recommends.setAttribute("style", `float: left;width: 250px;`)
            const recommend_image = document.getElementById("recommendimage")
            recommends.innerHTML=`<ui id="header_navi"><li text-align : center;>
            <a href="product-detail.html?product_id=${product_json.recommend[i]["id"]}/"><img  src="${BACK_END_URL}${product_json.recommend[i]["image"]}" ></a>
            <span >${product_json.recommend[i]["product_name"]}</span></li></ui>`
            
            recommend.appendChild(recommends)
        }
    }
    // reviews_counts
    review_count=document.getElementById('comment-count')
    const review_counts = document.createElement('span')
    review_counts.innerHTML=`<span id="count">${product_json.products.comment_set.length} 개</span>`
    review_count.appendChild(review_counts)
    // review
    for (i=0; i <product_json.products.comment_set.length; i++) {
        review=document.getElementById('review')
        const reviews = document.createElement('div')
        reviews.innerHTML=`
                <div class="user-block" id="reviewbox">      
                    <img style="width: 60px;height: 60px;"src=${BACK_END_URL}${product_json.products.comment_set[i].user.profile}>
                    <div class="username"><a>작성자 ${product_json.products.comment_set[i].user.profilename}</a></div>
                    <div class="content"><a> ${product_json.products.comment_set[i]["comment"]}</a></div>
                    <div class="like"><a>좋아요! ${product_json.products.comment_set[i]["like"]} 개 </a></div>
                    <div class="point"><a>점수 ${product_json.products.comment_set[i]["point"]}</a></div>
                    <div class="time"><a>작성시간${product_json.products.comment_set[i]["created_at"]}</a></div>
                    <a onclick="this.nextSibling.style.display=(this.nextSibling.style.display=='none')?'block':'none';" href="javascript:void(0)" class="img">
                    이미지 보기
                    </a><div style="DISPLAY: none">
                    <div class="image"><a><img src="${BACK_END_URL}${product_json.products.comment_set[i]["image"]}"></a></div>
                </div>
                <br/>`
                // <img  src="${BACK_END_URL}${product_json.recommend[i]["image"]}" >
        review.appendChild(reviews)
}

}


// const weight=document.querySelectorAll("select")[0];
        
async function cart() {
    const count=document.querySelector(".readonly");
    
    if(product_json.products.aroma_grade == 0){
        const weight=1;

        let formdata = new FormData 
            formdata.append('count', count.value)
            formdata.append('price', String(product_json.products["price"]))
            formdata.append('weight', weight)
            const response = await fetch(`${BACK_END_URL}/product/cart/?product_id=${product_id}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("access"),
                },
                method: "POST",
                body: formdata
            })
            response_json=await response.json()
        
            if (response.status==200 || response.status==202 || response.status == 201){
                alert("장바구니에 담겼습니다.")
                // location.reload();
            }
            else if(response.status==401 || response.status == 400){
                alert("로그인을 해주세요")
                // location.reload();
            }}
            else if(product_json.products.aroma_grade >= 1) {
                const count=document.querySelector(".readonly");
                const weight=document.querySelectorAll("select")[0];
                if (weight.value ==0){
                    alert("용량을 선택해주세요")
                }
                    if (weight.value > 1){
                        let formdata = new FormData 
                        formdata.append('count', count.value)
                        formdata.append('price', String(product_json.products["price"]))
                        formdata.append('weight', weight.value)

        const response = await fetch(`${BACK_END_URL}/product/cart/?product_id=${product_id}`, {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: formdata
        })
        response_json=await response.json()

        if (response.status==200 || response.status==202 || response.status == 201){
            alert("장바구니에 담겼습니다.")
            // location.reload();
            
        }
        else if(response.status==401 || response.status == 400){
            alert("로그인을 해주세요")
            // location.reload();
        }
    }
    }
    }


async function like() {
    const response = await fetch(`${BACK_END_URL}/product/like/?product_id=${product_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })


    if (response.status==200 || response.status==202){
        alert("좋아요에 등록되었습니다.")
        location.reload();
    }
    else if(response.status==401){
        alert("로그인을 해주세요")
        location.reload();
    }
    
   
}
// 댓글 이미지 출력 js
$('#comment_img').on('change', function() {
    ext = $(this).val().split('.').pop().toLowerCase(); //확장자
    //배열에 추출한 확장자가 존재하는지 체크
    if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        resetFormElement($(this)); //폼 초기화
        window.alert('이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)');
    } else {
        file = $('#comment_img').prop("files")[0];
        blobURL = window.URL.createObjectURL(file);
        $('#image_preview img').attr('src', blobURL);
        $('#image_preview').slideDown(); //업로드한 이미지 미리보기 
        $(this).slideUp(); //파일 양식 감춤
    }
    });
    // 댓글 등록하는 js
async function commentrg(){
        const comment_form= document.querySelector("comment_form")
        const comment_content=document.querySelectorAll("input")[2];
        const comment_img=document.querySelector("input[type='file']");
        const comment_point=document.querySelectorAll("#grade")[0];

        if (comment_content.value == ""){
            alert("리뷰를 작성해 주세요")
        } else if (comment_content.value == " "){
            alert("리뷰를 작성해 주세요")
        } else if (comment_point.value ==0){
            alert("평점을 선택해 주세요")
        }   else {
        let formdata = new FormData 
        formdata.append('comment', comment_content.value)
        formdata.append('point', comment_point.value)
        if (comment_img.files[0] != undefined){
            formdata.append('image', comment_img.files[0])
        }else {
        const response =await fetch(`${BACK_END_URL}/comment/?product_id=${product_id}`, {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: 'POST',
            body: formdata
        })
            response_json=await response.json()
            console.log(response_json)
            if (response.status == 200 || response.status == 202 || response.status == 201) {
                alert("정상적으로 리뷰 작성을 하였습니다.")
                location.reload();
                return response.json()
            }
            else if (response.status == 400) {
                alert("게시글당 한번의 리뷰만 작성이 가능합니다.")
                }
                location.reload();
                return response.json()
            
        }
        
    }
}

