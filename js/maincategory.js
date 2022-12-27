window.addEventListener('load', function() {
    $("#headers").load("header.html");
    category_check()
    show_product_list(1)
    
});
const urlparams = new URLSearchParams(window.location.search);
const category_id= urlparams.get('id')
const titlename = document.getElementById("titlename")


if (category_id==1){
    titlename.innerText= "모든 원두 커피"
} else if (category_id==2){
    titlename.innerText= "스톤커피 굿즈"      
} else if (category_id==3){
    titlename.innerText= "커피용품"
} else if (category_id==4){
    titlename.innerText= "바디감"
} else if (category_id==5){
    titlename.innerText= "산미"
}

async function show_product_list(page) {
    var sort = "down"
    if (category_id==4||category_id==5){
        var category_sort = document.getElementById("category_sort");
        var sort = category_sort.value
    }
    

    const response = await fetch(`${BACK_END_URL}/product/category/?category_id=${category_id}&page=${page}&&sort=${sort}`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        var products = document.getElementById("products");
        maxnum = data["page"].total_page
        loadpagenation()
        $("#products").empty();
        for (i = 0; i < data["data"].length; i++) {
            const product = document.createElement('div')
            product.className = "product-layout"
            product.className = "product-layout"
            product.innerHTML = `<li>
            <figure>
              <a id="img" class="aa-product-img" href="product-detail.html?product_id=${data["data"][i]["id"]}/"><img class="product-image" src="${BACK_END_URL}${data["data"][i]["image"]}" alt="${data["data"][i]["id"]}"></a>
                <figcaption>
                    <h4 class="aa-product-title">${data["data"][i]["product_name"]}</h4>
                    <span class="aa-product-price">${data["data"][i]["price"].toLocaleString('ko-KR')}원</span>
                </figcaption>
            </figure>                  
          </li>`
            products.appendChild(product)
            total_page = data["page"]["total_page"]
        }
    })

    
}

async function cart() {
    const response = await fetch(`${BACK_END_URL}/product/${product_id}/cart/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })  


    if (response.status==200 || response.status==202){
        alert("장바구니에 담겼습니다.")
        location.reload();
    }
    else if(response.status==401){
        alert("로그인을 해주세요")
        }
    
   
}
async function like() {
    
    const response = await fetch(`${BACK_END_URL}/product/${product_id}/like/`, {
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
        }
}

// 페이지네이션  함수
var now = 1
var prev = 1
var firstPage = 1
var nextPage = firstPage + 6
var maxnum = 23
var minnum = 1
const backButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
backButton.style.display = "none";

function loadpagenation() {

    for (i=1;i<8;i++){
        const pagenate = document.getElementById(i);
        if (maxnum==1) {
            pagenate.style.display="none"
            next.style.display = "none"
        }
        else if ((i) > maxnum) {
            pagenate.style.display="none"
        }
    }
}


if (now == minnum) {
    backButton.style.display = "none";
} else {
    backButton.style.display = "inline";
}

$(".pagenation a").click(function (e) {
    e.preventDefault();
    var $item = $(this);
    var $id = $item.attr("id");
    var selectedPage = $item.text();
    selectedPage = parseInt(selectedPage)
    if ($id == "next") selectedPage = now + 1;
    if ($id == "prev") selectedPage = now - 1;
    if ($id == "allprev") selectedPage = 1;
    if ($id == "allnext") selectedPage = totalPage;

    if (selectedPage < firstPage){
        // $("#pagenumber").empty();
        for (i=0;i<7;i++){
            id = firstPage+i
            const pagenate = document.getElementById(id);
            pagenate.innerText = nextPage + i + 1 -14
            pagenate.id = nextPage + i + 1 -14
            pagenate.style.display="inline"
        }
        firstPage -= 7
        nextPage = firstPage + 6

        prev = firstPage
        now = selectedPage

        const nowbutton = document.getElementById(now)
        const prevbutton = document.getElementById(prev)

        prevbutton.className = ""
        nowbutton.className = "active"

    } else if (selectedPage>nextPage){
        for (i=0;i<7;i++){
            id = firstPage+i
            const pagenate = document.getElementById(id);
            pagenate.innerText = nextPage + i + 1
            pagenate.id = nextPage + i + 1
            if ((nextPage + i + 1) > maxnum) {
                pagenate.style.display="none"
            }
        }
        firstPage += 7
        nextPage = firstPage + 6

        prev = firstPage+6
        now = selectedPage

        const nowbutton = document.getElementById(now)
        const prevbutton = document.getElementById(prev)

        prevbutton.className = ""
        nowbutton.className = "active"

    } else {
        prev = now
        now = selectedPage

        const nowbutton = document.getElementById(now)
        const prevbutton = document.getElementById(prev)

        prevbutton.className = ""
        nowbutton.className = "active"
    }

    //now 가 1 일떄 비활성화
    if (now == minnum) {
        backButton.style.display = "none";
    } else {
        backButton.style.display = "inline";
    }
    if (now == maxnum){
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "inline";
    }
    show_product_list(now)
});

function chageLangSelect(){
    var category_sort = document.getElementById("category_sort");
    var selectValue = category_sort.value;

    sch = location.search
    var params = new URLSearchParams(sch);
    params.set('sort', selectValue);

    url = params.toString();
    location.replace(`${FRONT_END_URL}/mainAll.html?${url}`)

}

function category_check() {
    if (category_id==4 || category_id==5){
        const categorySort = document.getElementById('category_sort')
        categorySort.style.display='block'

        sch = location.search
        var params = new URLSearchParams(sch);
        var sort_keyword = params.get('sort')
        if (sort_keyword){
            categorySort.value = sort_keyword
        }
    }
}

