let urlParameter = window.location.search;
var product_id1 = urlParameter.split('=')[1]
var product_id = product_id1.split('/')[0]

//=======게시글 불러오기========
window.onload = async function ProductDetail() {
    $("#headers").load("header.html");
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)
    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../index.html")
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

    //========좋아요 아이콘 변경=======
    const likeIcon = document.getElementById("like_icon")
    if (product_json["products"]['like'].includes(parsed_payload['user_id'])) {
        likeIcon.setAttribute('class', 'bi bi-heart-fill')
    } else {
        likeIcon.setAttribute('class', 'bi bi-heart')
    }
    one_price = product_json.products["price"]
    //이름,가격불러오는 코드
    name2 = document.getElementById('name')
    const name1 = document.createElement('p')
    name1.innerHTML = `<h3>${product_json.products["product_name"]}</h3>`
    name2.appendChild(name1)
    //상품 평가 점수
    
    //커피인 상품만 점수 표시하도록
    if (product_json.products.category_id == 1) {
        aroma2 = document.getElementById('aroma')
        const aroma1 = document.createElement('span')
        aroma1.innerHTML = `<span class="coffeebean-text">향</span>`
        aroma2.appendChild(aroma1)
        for (i = 0; i < 5; i++) {
            const aromaBean = document.createElement('img')
            aromaBean.setAttribute('class', 'coffeebean-image')
            if (i < product_json.products["aroma_grade"]) {
                aromaBean.setAttribute('src', 'img/comment/coffeebean.png')
            } else {
                aromaBean.setAttribute('src', 'img/comment/coffeebean-outline.png')
            }
            aroma2.appendChild(aromaBean)
        }

        acidity2 = document.getElementById('acidity')
        const acidity1 = document.createElement('span')
        acidity1.innerHTML = `<span class="coffeebean-text">산미</span>`
        acidity2.appendChild(acidity1)
        for (i = 0; i < 5; i++) {
            const acidityBean = document.createElement('img')
            acidityBean.setAttribute('class', 'coffeebean-image')
            if (i < product_json.products["acidity_grade"]) {
                acidityBean.setAttribute('src', 'img/comment/coffeebean.png')
            } else {
                acidityBean.setAttribute('src', 'img/comment/coffeebean-outline.png')
            }
            acidity2.appendChild(acidityBean)
        }

        body2 = document.getElementById('body')
        const body1 = document.createElement('span')
        body1.innerHTML = `<span class="coffeebean-text">바디</span>`
        body2.appendChild(body1)

        for (i = 0; i < 5; i++) {
            const bodyBean = document.createElement('img')
            bodyBean.setAttribute('class', 'coffeebean-image')
            if (i < product_json.products["body_grade"]) {
                bodyBean.setAttribute('src', 'img/comment/coffeebean.png')
            } else {
                bodyBean.setAttribute('src', 'img/comment/coffeebean-outline.png')
            }
            body2.appendChild(bodyBean)
        }

        sweet2 = document.getElementById('sweet')
        const sweet1 = document.createElement('span')
        sweet1.innerHTML = `<span class="coffeebean-text">당도</span>`
        sweet2.appendChild(sweet1)

        for (i = 0; i < 5; i++) {
            const sweetBean = document.createElement('img')
            sweetBean.setAttribute('class', 'coffeebean-image')
            if (i < product_json.products["sweet_grade"]) {
                sweetBean.setAttribute('src', 'img/comment/coffeebean.png')
            } else {
                sweetBean.setAttribute('src', 'img/comment/coffeebean-outline.png')
            }
            sweet2.appendChild(sweetBean)
        }

        //용량 선택하는 select
        w_option = document.getElementById('option')
        const w_option2 = document.createElement('p')
        w_option2.innerHTML = `<div class="size">
                                <h4>용량 선택</h4>
                                <select size="1" id="weight" onchange="valeChange()">
                                <option value="1">100g</option>
                                <option value="3">300g</option>
                                <option value="5">500g</option>
                                </select>
                            </div>`
        w_option.appendChild(w_option2)

        // 가격
        var price_per_100g = document.getElementById('price')
        var price_per_100g_2 = document.createElement('div')
        price_per_100g_2.innerHTML = `<h3 class="price_per_100g">100g당 가격 : <span>${product_json.products["price"].toLocaleString('ko-KR')}</span> 원</h3>`
        price_per_100g.appendChild(price_per_100g_2)

        productprice = product_json.products["price"]
        var product_price = document.getElementById('price')
        var product_price2 = document.createElement('div')
        product_price2.innerHTML = `<h3 class="product_price">상품 가격 : <span id="product_price">${productprice.toLocaleString('ko-KR')}</span> 원</h3>`
        product_price.appendChild(product_price2)
 
        totalprice = product_json.products["price"]
        var price2 = document.getElementById('price')
        var price1 = document.createElement('div')
        price1.innerHTML = `<h3 class="price">총 가격 : <span id="priceText">${totalprice.toLocaleString('ko-KR')}</span> 원</h3>`
        price2.appendChild(price1)

    } else {
        var price_per_100g = document.getElementById('price')
        var price_per_100g_2 = document.createElement('div')
        price_per_100g_2.innerHTML = `<h3 class="price_per_100g">1개 가격 : <span id="one_product_price">${product_json.products["price"].toLocaleString('ko-KR')}</span> 원</h3>`
        price_per_100g.appendChild(price_per_100g_2)
        totalprice = product_json.products["price"]
        var price2 = document.getElementById('price')
        var price1 = document.createElement('div')
        price1.innerHTML = `<h3 class="price">가격 : <span id="priceText">${totalprice.toLocaleString('ko-KR')}</span> 원</h3>`
        price2.appendChild(price1)
    }

    //상품 내용 description
    productinformation2 = document.getElementById('description')
    const productinformations2 = document.createElement('p')
    productinformation2.innerHTML = `<h3>${product_json.products["content"]}</h3>`
    productinformation2.appendChild(productinformations2)
    //용량

    const product_list = product_json.products
    const commentPut = document.getElementById('comment-list')
    const commentform = document.createElement('div')
    commentform.className = "comment-form"
    for (i = 0; i < product_list.comment_set.length; i++) {
        const commentSet = product_list.comment_set[i]
        const commentform = document.createElement('div')
        commentform.id = `total_commnet${commentSet.id}`
        createTime = commentSet.created_at
        createTime = createTime.split("T")
        commentform.className = "comment-form"
        commentform.innerHTML = `
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
                        <td class="table-image" width="150px" rowspan="4" align = "center" style="background-image:url(${BACK_END_URL}${commentSet.image});"></td>
                        <td rowspan="4" align = "left">
                            <span class="table-content" style="text-overflow:ellipsis;">${commentSet.comment}</span>
                        </td>
                        <td class="table-font" width="150px" id ="table-star${commentSet.id}">
                            <span class="table-righttext">평점</span>
                            <span class="table-lefttext">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-font">
                            <span class="table-righttext" width="150px>좋아요</span>
                            <span class="table-lefttext" id="like_${commentSet.id}">좋아요 ${commentSet.like.length}개</span>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                        <td class="table-font" width="150px">
                            <span class="table-righttext">작성일</span>
                            <span class="table-lefttext">${createTime[0]}</span>
                        </td>
                    <tr>
                        <td colspan = "3" span style="color:black">
                        <span style="cursor: pointer;" onclick="CommentDetail(${commentSet.id})">댓글 더보기</span>
                            <span style="float: right; margin-right: 10px;" id="editView${commentSet.id}">
                            <span onclick="editCommentBtn(${commentSet.id})" style="cursor: pointer;">수정</span>
                            <span>/</span>
                            <span onclick="deleteComment(${commentSet.id})" style="cursor: pointer;">삭제</span></span>
                        </td>
                    </tr>
                </table>
            </div>`

        commentPut.appendChild(commentform)

        // 별 추가하기
        const starInput = document.getElementById(`table-star${commentSet.id}`)
        const starForm = document.createElement('span')
        starForm.innerHTML = '⭐'.repeat(commentSet.point) + `<span id='coffee'>⭐</span>`.repeat(5 - commentSet.point)
        starInput.appendChild(starForm)

        // 하트 모양 변경하기
        const heart = document.getElementById(`profile-icon${commentSet.id}`)
        if (commentSet['like'].includes(parsed_payload['user_id'])) {
            heart.className = "bi bi-heart-fill"
        }
        // 수정 삭제 제거
        const editComment = document.getElementById(`editView${commentSet.id}`)
        if (commentSet.user.id != parsed_payload['user_id']) {
            editComment.style.display = "none"
        }
    }

    $('.recommend-form').slick({
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: true,
        responsive: [{
            breakpoint: 5000,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
            }
        }, {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            }
        }, {
        }, {
            breakpoint: 1150,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            }
        }, {
        }, {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }]
    });
    var recommend_list = product_json.recommend
    for (i = 0; i < 6; i++) {
        $('.recommend-form').slick('slickAdd',
            `<div>
                        <a href="product-detail.html?product_id=${recommend_list[i]["id"]}">
                        <div class="image" style="background-image: url(${BACK_END_URL}${recommend_list[i]["image"]});"></div>
                        <span >${recommend_list[i]["product_name"]}</span>
                        </a></div>`
        );
    }
}

async function comment_like(id) {
    const response = await fetch(`${BACK_END_URL}/comment/like/?comment_id=${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
    })
    var heart = document.getElementById(`profile-icon${id}`)
    response_json = await response.json()
    if (response.status == 201) {
        heart.className = "bi bi-heart-fill"
        document.getElementById(`like_${id}`).innerHTML = `좋아요 ${response_json.count}개`
    } else if (response.status == 200) {
        heart.className = "bi bi-heart"
        document.getElementById(`like_${id}`).innerHTML = `좋아요 ${response_json.count}개`
    } else {
        alert(response_json["message"])
    }
}

async function cart() {

    var priceText = document.getElementById("priceText")
    var etc_price = document.getElementById("one_product_price")
    var product_price = document.getElementById("product_price")
    const count = document.querySelector(".readonly");

    if (product_json.products.category_id != 1) {
        const weight = 1;
        var price_a = etc_price.innerText.replace(/,/g,'')
        var price_b = parseFloat(price_a)

        let formdata = new FormData
        formdata.append('count', count.value)
        formdata.append('price', price_b)
        formdata.append('weight', weight)
        const response = await fetch(`${BACK_END_URL}/product/cart/?product_id=${product_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: formdata
        })
        response_json = await response.json()

        if (response.status == 200 || response.status == 202 || response.status == 201) {

            alert("장바구니에 담겼습니다.")

        }
        else if (response.status == 401 || response.status == 400) {
            alert("로그인을 해주세요s")
        }
    }

    else if (product_json.products.category_id == 1) {
        const count = document.querySelector(".readonly");
        const weight = document.querySelectorAll("select")[0];
        var price_a=product_price.innerText.replace(/,/g,'')
        var price_b=parseFloat(price_a)
        let formdata = new FormData
        formdata.append('count', count.value)
        formdata.append('price', price_b)
        formdata.append('weight', weight.value)
        const response = await fetch(`${BACK_END_URL}/product/cart/?product_id=${product_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: formdata
        })
        response_json = await response.json()

        if (response.status == 200 || response.status == 202 || response.status == 201) {

            alert("장바구니에 담겼습니다.")

        }
        else if (response.status == 401 || response.status == 400) {

            alert("로그인을 해주세요")

        }
    }
}

async function orderButton() {
    var priceText = document.getElementById("priceText")
    var product_price = document.getElementById("product_price")
    const count = document.querySelector(".readonly");
    var etc_price = document.getElementById("one_product_price")

    if (product_json.products.category_id != 1) {
        const weight = 1;
        var price_a=etc_price.innerText.replace(/,/g,'')
        var price_b=parseFloat(price_a)
        let formdata = new FormData

        formdata.append('count', count.value)
        formdata.append('price', price_b)
        formdata.append('weight', weight)
        const response = await fetch(`${BACK_END_URL}/product/cart/?product_id=${product_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: formdata
        })
        response_json = await response.json()

        if (response.status == 200 || response.status == 202 || response.status == 201) {
            alert("주문하기")
            location.replace("cart.html");
        }
        else if (response.status == 401 || response.status == 400) {
            alert("로그인을 해주세요")
            location.reload();
        }
    }

    else if (product_json.products.category_id == 1) {
        const count = document.querySelector(".readonly");
        const weight = document.querySelectorAll("select")[0];

        var price_a=product_price.innerText.replace(/,/g,'')

        var price_b=parseFloat(price_a)
        let formdata = new FormData
        formdata.append('count', count.value)
        formdata.append('price', price_b)
        formdata.append('weight', weight.value)

        const response = await fetch(`${BACK_END_URL}/product/cart/?product_id=${product_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: formdata
        })
        response_json = await response.json()

        if (response.status == 200 || response.status == 202 || response.status == 201) {
            alert("주문하기")
            location.replace("cart.html");

        }
        else if (response.status == 401 || response.status == 400) {
            alert("로그인을 해주세요")
            location.reload();
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

    if (responproduct_jsonse.status == 200 || responproduct_jsonse.status == 202) {
        alert("좋아요에 등록되었습니다.")
        location.reload();
    }
    else if (responproduct_jsonse.status == 401) {
        alert("로그인을 해주세요")
        location.reload();
    }
}
// 댓글 이미지 출력 js
$('#comment_img').on('change', function () {
    ext = $(this).val().split(".").pop().toLowerCase(); //확장자
    //배열에 추출한 확장자가 존재하는지 체크
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        alert('이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)');
        $(this).val("")
        $('#image_preview img').attr('src', "/img/icon.png");
        $('#image_preview').slideDown();

    } else {
        file = $('#comment_img').prop("files")[0];
        blobURL = window.URL.createObjectURL(file);
        $('#image_preview img').attr('src', blobURL);
        $('#image_preview').slideDown(); //업로드한 이미지 미리보기
    }
}); document.querySelector('input[name="product_price"]:checked')

// 댓글 등록하는 js
async function commentrg() {
    const comment_form = document.querySelector("comment_form")
    const comment_content = document.getElementById("comment-input").value
    const comment_img = document.querySelector("input[type='file']");
    var comment_point = document.querySelector('input[name="point"]:checked');

    if (comment_content.value == "") {
        alert("리뷰를 작성해 주세요")
    } else if (comment_content.value == " ") {
        alert("리뷰를 작성해 주세요")
    } else if (comment_point == null) {
        alert("평점을 선택해 주세요")
    } else {
        let formdata = new FormData
        formdata.append('comment', comment_content)
        formdata.append('point', comment_point.value)
        if (comment_img.files[0] != undefined) {
            formdata.append('image', comment_img.files[0])
        } else {

        }
        const response = await fetch(`${BACK_END_URL}/comment/?product_id=${product_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: 'POST',
            body: formdata
        })
        response_json = await response.json()
        if (response.status == 200 || response.status == 202 || response.status == 201) {
           
            location.reload();
            return response.json()
        }
        else if (response.status == 400) {
            alert("게시글당 한번의 리뷰만 작성이 가능합니다.")
        } else {
            alert("주문을 한 회원만 댓글을 등록할 수 있습니다")
        }
        location.reload();
        return response.json()
    }
}

async function deleteComment(num) {
    var reviewdelete = confirm("리뷰를 삭제 하시겠습니까?");
    if (reviewdelete) {
        const response = await fetch(`${BACK_END_URL}/comment/edit/?comment_id=${num}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: "DELETE",
        })

        var total_commnet = document.getElementById(`total_commnet${num}`)
        if (response.status == 204) {
            total_commnet.parentNode.removeChild(total_commnet)
        }
        else {
            alert("삭제되지 않았습니다")
        }
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
    editmodalImage.src = BACK_END_URL + response_json["image"]
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

$("#input_image").change(function () {
    readFile(this);
});

function readFile(input_image) {
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#output_image').attr('src', e.target.result);
    }
    reader.readAsDataURL(input_image.files[0]);
}

async function saveeditCommentBtn() {
    const modal = document.querySelector('.modal');
    const editCommentbtn = document.getElementById("edit-commentbtn");
    var num = editCommentbtn.value
    const comment_content = document.getElementById("edit-text").value
    const comment_img = document.getElementById("input_image")
    const comment_point = document.getElementById("editcomment_point").value
    let formdata = new FormData
    formdata.append('comment', comment_content)
    formdata.append('point', comment_point)
    if (comment_img.files[0] != undefined) {
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
    if (response.status == 201) {
        alert(response_json["message"])
        modal.style.display = "none";
        document.body.style.overflowY = "visible";
        window.location.reload()
    }
}

function valeChange() {
    if (product_json.products.category_id == 1) {
        var weight = document.getElementById("weight").value
        var count = document.querySelector(".readonly").value
        productprice = weight * one_price
        total_price = weight * one_price * count
        var product_price = document.getElementById("product_price")
        var priceText = document.getElementById("priceText")
        priceText.innerText = total_price.toLocaleString('ko-KR')
        product_price.innerText = productprice.toLocaleString('ko-KR')
    } else {
        var count = document.querySelector(".readonly").value
        total_price = one_price * count
        var priceText = document.getElementById("priceText")
        priceText.innerText = total_price.toLocaleString('ko-KR')
    }
}

var $quantity = $('.quantity'),
    $unitprice = $quantity.attr('data-unitprice'),
    $qtyBtn = $quantity.find('span'),
    $qytInput = $quantity.find('input'),
    $targetTotal = $('.total_price .price');

$qtyBtn.click(function () {
    var currentCount = $qytInput.val();
    if ($(this).hasClass('plus')) {
        $qytInput.val(++currentCount);
        valeChange()
    } else {
        if (currentCount > 1) {
            $qytInput.val(--currentCount);
            valeChange()
        }
    }
});


//커멘트 디테일 페이지로 이동
async function CommentDetail(num) {
    comment_id = num
    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    if (!parsed_payload) {
        alert("권한이 없습니다. 로그인 해주세요")
        location.replace("../templates/index.html")
    }
    location.href = `${FRONT_END_URL}/comment_copy.html?comment_id=${comment_id}`
}