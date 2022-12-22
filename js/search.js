window.addEventListener('load', function() {
    $("#headers").load("header.html");
    show_product_list(1)
});
const urlparams = new URLSearchParams(window.location.search);
const searchtag= urlparams.get('search')
const titlename = document.getElementById("titlename")
titlename.innerText= `'${searchtag}' 검색 결과입니다.`
current_page = 1
async function show_product_list(num) {
    const response = await fetch(`${BACK_END_URL}/product/search/?search=${searchtag}&page=${num}`, {
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
                                            <span class="aa-product-price">${data["data"][i]["price"]}원</span>
                                        </figcaption>
                                    </figure>
                                </li>`
            products.appendChild(product)
            total_page = data["page"]["total_page"]
        }
    })
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

if (now == minnum) {
    backButton.style.display = "none";
} else {
    backButton.style.display = "inline";
}

$(".pagenation a").click(function (e) {
    const addpagenum = document.getElementById("pagenumber")

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