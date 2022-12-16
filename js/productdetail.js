let urlParameter = window.location.search;
var product_id1 = urlParameter.split('=')[1]
var product_id = product_id1.split('/')[0]

one_price = 0
//=======게시글 불러오기========
window.onload = async function ProductDetail() {
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    if(!parsed_payload){
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../index.html")
    }
    // data["data"]["coffee"]["0"]["product_name"]



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
    product_image.setAttribute("style", `width:100%; height:100%;`)

    //========좋아요 아이콘 변경=======
    const likeIcon = document.getElementById("like_icon")
    if (product_json["products"]['like'].includes(parsed_payload['user_id'])){
        likeIcon.setAttribute('class','bi bi-heart-fill')
    } else{
        likeIcon.setAttribute('class','bi bi-heart')
    }
    one_price = product_json.products["price"]
//이름,가격불러오는 코드
    name2=document.getElementById('name')
    const name1 = document.createElement('p')
    name1.innerHTML=`<h3>${product_json.products["product_name"]}</h3>`
    name2.appendChild(name1)
    //상품 평가 점수 
    if (product_json.products["aroma_grade"] >=1){
        aroma2=document.getElementById('aroma')
        const aroma1 = document.createElement('span')
        aroma1.innerHTML=`<span class="coffeebean-text">향</span>`
        aroma2.appendChild(aroma1)
        for (i=0;i<5;i++){
            const aromaBean = document.createElement('img')
            aromaBean.setAttribute('class','coffeebean-image')
            if (i<product_json.products["aroma_grade"]){
                aromaBean.setAttribute('src','img/comment/coffeebean.png')
            } else {
                aromaBean.setAttribute('src','img/comment/coffeebean-outline.png')
            }
            aroma2.appendChild(aromaBean)
        }
        
        acidity2=document.getElementById('acidity')
        const acidity1 = document.createElement('span')
        acidity1.innerHTML=`<span class="coffeebean-text">산미</span>`
        acidity2.appendChild(acidity1)
        for (i=0;i<5;i++){
            const acidityBean = document.createElement('img')
            acidityBean.setAttribute('class','coffeebean-image')
            if (i<product_json.products["acidity_grade"]){
                acidityBean.setAttribute('src','img/comment/coffeebean.png')
            } else {
                acidityBean.setAttribute('src','img/comment/coffeebean-outline.png')
            }
            acidity2.appendChild(acidityBean)
        }

        body2=document.getElementById('body')
        const body1 = document.createElement('span')
        body1.innerHTML=`<span class="coffeebean-text">바디</span>`
        body2.appendChild(body1)

        for (i=0;i<5;i++){
            const bodyBean = document.createElement('img')
            bodyBean.setAttribute('class','coffeebean-image')
            if (i<product_json.products["body_grade"]){
                bodyBean.setAttribute('src','img/comment/coffeebean.png')
            } else {
                bodyBean.setAttribute('src','img/comment/coffeebean-outline.png')
            }
            body2.appendChild(bodyBean)
        }


        sweet2=document.getElementById('sweet')
        const sweet1 = document.createElement('span')
        sweet1.innerHTML=`<span class="coffeebean-text">당도</span>`
        sweet2.appendChild(sweet1)

        for (i=0;i<5;i++){
            const sweetBean = document.createElement('img')
            sweetBean.setAttribute('class','coffeebean-image')
            if (i<product_json.products["sweet_grade"]){
                sweetBean.setAttribute('src','img/comment/coffeebean.png')
            } else {
                sweetBean.setAttribute('src','img/comment/coffeebean-outline.png')
            }
            sweet2.appendChild(sweetBean)
        }




        //용량 선택하는 select
        w_option=document.getElementById('option')
        const w_option2 =document.createElement('p')
        w_option2.innerHTML=`<div class="size">
        <h4>용량 선택</h4>
        <select size="1" id="weight" onchange="valeChange(this)">
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
    price1.innerHTML=`<h3 class="price">가격 : <span id="priceText">${product_json.products["price"]}</span> 원</h3>`
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
            recommends.setAttribute("style", `width: 250px;`)
            const recommend_image = document.getElementById("recommendimage")
            recommends.innerHTML=`<ui id="header_navi"><li text-align : center;>
            <a href="product-detail.html?product_id=${product_json.recommend[i]["id"]}/"><img src="${BACK_END_URL}${product_json.recommend[i]["image"]}" ></a>
            <span >${product_json.recommend[i]["product_name"]}</span></li></ui>`

            recommend.appendChild(recommends)
        }
    }
    
    const product_list = product_json.products
    const commentPut = document.getElementById('comment-list')
    const commentform = document.createElement('div')
    commentform.className = "comment-form"
    for (i=0; i <product_list.comment_set.length; i++) {
        const commentSet = product_list.comment_set[i]
        const commentform = document.createElement('div')
        commentform.id = `total_commnet${commentSet.id}`
        createTime = commentSet.created_at
        createTime = createTime.split("T")
        commentform.className = "comment-form"
        commentform.innerHTML=`
            <div class="comment-form">
                <table class="comment-table">
                    <td colspan = "3" span style="color:black">
                        <img class="profile-image" src="${BACK_END_URL}${commentSet.user.profile}">
                        <span class="profile-name">${commentSet.user.profilename}</span>
                        <a class="profile-like" onclick="comment_like(${commentSet.id})">
                            <i id="profile-icon${commentSet.id}" class="bi bi-heart"></i>
                        </a>
                    </td>
                    <tr>
                        <td class="table-image" width="200" rowspan="4" align = "center" style="background-image:url(${BACK_END_URL}${commentSet.image});"></td>
                        <td rowspan="4" align = "left">
                            <span class="table-content">${commentSet.comment}</span>
                        </td>
                        
                        <td class="table-font" width="200" id ="table-star${commentSet.id}">
                            <span class="table-righttext">평점</span>
                            <span class="table-lefttext">
                                
                            </span>
                        </td>
                    </tr>
                    <tr>
                        
                        <td class="table-font">
                            <span class="table-righttext">좋아요</span>
                            <span class="table-lefttext">${commentSet.like.length}개</span>
                        </td>
                    </tr>
                    <tr>
                        
                    </tr>
                        <td class="table-font" width="200">
                            <span class="table-righttext">작성일</span>
                            <span class="table-lefttext">${createTime[0]}</span>
                        </td>
                    <tr>
                        <td colspan = "3" span style="color:black">
                        <span style="cursor: pointer;" onclick="CommentDetail(${commentSet.id})">댓글 더보기</span> 
                            <span style="float: right; margin-right: 10px;" id="editView${commentSet.id}"> 
                            <span onclick="editCommentBtn(${commentSet.id})" style="cursor: pointer;">수정</span> / 
                            <span onclick="deleteComment(${commentSet.id})" style="cursor: pointer;">삭제</span> </span>
                        </td>
                    </tr>
                </table>

            </div>
        `
        commentPut.appendChild(commentform)
        // 별 추가하기
        const starInput = document.getElementById(`table-star${commentSet.id}`)
        const starForm = document.createElement('span')
        starForm.className = "table-lefttext"
        for (j=0; j < commentSet.point; j++) {
            const starIcon = document.createElement('i')
            starIcon.className = 'bi bi-star-fill'
            starForm.appendChild(starIcon)
        }
        starInput.appendChild(starForm)
        // 하트 모양 변경하기
        const heart = document.getElementById(`profile-icon${commentSet.id}`)
        if (commentSet['like'].includes(parsed_payload['user_id'])){
            heart.className = "bi bi-heart-fill"
        }
        // 수정 삭제 제거
        const editComment = document.getElementById(`editView${commentSet.id}`)
        if (commentSet.user.id != parsed_payload['user_id']){
            editComment.style.display = "none"
        }
        
    }
}

async function comment_like(id) {
    const response = await fetch(`${BACK_END_URL}/comment/like/?comment_id=${id}`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
    }) 
    var heart =document.getElementById(`profile-icon${id}`)
    response_json=await response.json()
    if (response.status == 201){
        alert(response_json["message"])
        heart.className = "bi bi-heart-fill"

    } else if(response.status == 200) {
        alert(response_json["message"])
        heart.className = "bi bi-heart"
    } else {
        alert(response_json["message"])
    }

}

async function cart() {    
    var priceText = document.getElementById("priceText")
    const count=document.querySelector(".readonly");
    // 왜 null?
    if(product_json.products.aroma_grade == 0 || product_json.products.aroma_grade == null){
        const weight=1;

        let formdata = new FormData 
        formdata.append('count', count.value)
        formdata.append('price', priceText.innerText)
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
                location.reload();
            }
        else if(response.status==401 || response.status == 400){
                alert("로그인을 해주세요")
                location.reload();
        }}
        else if(product_json.products.aroma_grade >= 1) {
            const count=document.querySelector(".readonly");
            const weight=document.querySelectorAll("select")[0];
            if (weight.value ==0){
                alert("용량을 선택해주세요")
            }
            if (weight.value > 1){
                console.log(priceText.innerText)
                let formdata = new FormData 
                formdata.append('count', count.value)
                formdata.append('price', priceText.innerText)
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
                location.reload();

            }
            else if(response.status==401 || response.status == 400){
                alert("로그인을 해주세요")
                location.reload();
            }
        }
    }
}

async function orderButton() {
    var priceText = document.getElementById("priceText")
    const count=document.querySelector(".readonly");
    // 
    if(product_json.products.aroma_grade == 0 || product_json.products.aroma_grade == null){
        const weight=1;

        let formdata = new FormData 
        formdata.append('count', count.value)
        formdata.append('price', priceText.innerText)
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
                alert("주문하기")
                location.replace("cart.html");
            }
        else if(response.status==401 || response.status == 400){
                alert("로그인을 해주세요")
                location.reload();
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
                formdata.append('price', priceText.innerText)
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
                alert("주문하기")
                location.replace("cart.html");

            }
            else if(response.status==401 || response.status == 400){
                alert("로그인을 해주세요")
                location.reload();
            }
        }
    }
}

async function like() {
    const responproduct_jsonse = await fetch(`${BACK_END_URL}/product/like/?product_id=${product_id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })

    if (responproduct_jsonse.status==200 || responproduct_jsonse.status==202){
        alert("좋아요에 등록되었습니다.")
        location.reload();
    }
    else if(responproduct_jsonse.status==401){
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
        const comment_content=document.getElementById("comment-input").value
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
        console.log(comment_content)
        formdata.append('comment', comment_content)
        formdata.append('point', comment_point.value)
        if (comment_img.files[0] != undefined){
            formdata.append('image', comment_img.files[0])
        }else {

        }
        const response =await fetch(`${BACK_END_URL}/comment/?product_id=${product_id}`, {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: 'POST',
            body: formdata
        })
            response_json=await response.json()
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

async function deleteComment(num) {
    const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${num}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "DELETE",
    })

    var total_commnet = document.getElementById(`total_commnet${num}`)
    if (response.status==204){
        alert("삭제 되었습니다")
        total_commnet.parentNode.removeChild(total_commnet)
    }
    else {
        alert("삭제 실패")
    }
}

async function editCommentBtn(num) {

    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    modal.style.top = window.pageYOffset + 'px';
    document.body.style.overflowY = "hidden";

    const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${num}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "GET",
    })
    var response_json = await response.json()
    const editmodalImage = document.getElementById("output_image");
    editmodalImage.src = BACK_END_URL+response_json["image"]
    const editmodalComment = document.getElementById("edit-text");
    editmodalComment.innerText = response_json["comment"]
    const editcomment_point = document.getElementById("editcomment_point");
    editcomment_point.value = response_json["point"]
    const editCommentbtn = document.getElementById("edit-commentbtn");
    editCommentbtn.value = response_json["id"]
}

const modal = document.querySelector('.modal');

const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none";  
    document.body.style.overflowY = "visible";
});

$("#input_image").change(function(){
    readFile(this);
    
});

function readFile(input_image){
    var reader = new FileReader();
  
    reader.onload = function(e){
        $('#output_image').attr('src', e.target.result);
    }

    reader.readAsDataURL(input_image.files[0]);
}

async function saveeditCommentBtn() {
    const modal = document.querySelector('.modal');
    const editCommentbtn = document.getElementById("edit-commentbtn");
    var num = editCommentbtn.value
    // const comment_form= document.querySelector("comment_form")
    const comment_content=document.getElementById("edit-text").value
    const comment_img=document.getElementById("input_image")
    const comment_point=document.getElementById("editcomment_point").value
    let formdata = new FormData 
    formdata.append('comment', comment_content)
    formdata.append('point', comment_point)
    if (comment_img.files[0] != undefined){
        formdata.append('image', comment_img.files[0])
    }

    const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${num}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formdata
    })

    var response_json = await response.json()
    if(response.status == 201){
        alert(response_json["message"])
        modal.style.display = "none";
        document.body.style.overflowY = "visible";
        window.location.reload()
    }

}
function valeChange(obj){
    weight = obj.value / 100
    total_price = weight * one_price
    var priceText = document.getElementById("priceText")
    priceText.innerText = total_price
}
