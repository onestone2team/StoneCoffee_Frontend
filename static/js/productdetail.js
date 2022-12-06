var num = 0
var size = 0
var money = 30000
var amount_money = 0
var inputnum = document.getElementById("countNum");
var moneynum = document.getElementById("amout_money");

let urlParameter = window.location.search;
var product_id = urlParameter.split('=')[1]

//=======게시글 불러오기========
window.onload = async function ProductDetail() {

    const payload = localStorage.getItem("payload")
    const parsed_payload = JSON.parse(payload)

    // if(!parsed_payload){
    //     alert("권한이 없습니다. 로그인 해주세요")
    //     location.replace("../templates/index.html")
    // }

    const product = await fetch(`${BACK_END_URL}/product/${product_id}/view/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    console.log(data)


//========게시글 이미지 불러오기========
    product_json = await product.json()

    const product_image = document.getElementById("productimage")
    product_image.setAttribute("src", `${BACK_END_URL}${product_json.image}`)



    //======북마크 되어 있는지 확인
    bookmark_list = product_json["bookmark"]
    if (bookmark_list.includes(user_data_json["id"])){
        const bookmark_icon = document.getElementById('bookmark_icon')
        bookmark_icon.className = "bi bi-heart-fill"
    }


}



        
async function bookmark() {
    
    const response = await fetch(`${BACK_END_URL}/products/${product_id}/bookmark/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    })


    if (response.status==200 || response.status==202){
        alert("북마크 변경 완료")
        location.reload();
    }
    
   
}

async function orderButton() {
    
    if (num!=0 && size!=0 && amount_money !=0){

        const url = `${BACK_END_URL}/order/list/${product_id}/`
        console.log(url)
        const response = await fetch(url, {
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            body: JSON.stringify({
                "price":String(amount_money),
                "size":size,
                "count":String(num)
            })
            })

            if (response.status == 201) {
                alert("주문 완료")
                location.replace("../templates/profile.html")
            }
            else {
                alert(response.status)
            }
    } else{
        alert("주문 옵션을 다시 확인해 주세요")
    }
    
     
}    
//==================================================================    
function selectButton() {
    const select_form = document.getElementById("select_form")
    if (select_form.style.display == 'none') {
        select_form.style.display = 'block';
    } else {
        select_form.style.display = 'none';
    }
}

function changeValue() {
    var value_str = document.getElementById('select_value');
    size = value_str.options[value_str.selectedIndex].text
    // size 값 전달
    var size_text = document.getElementById('size_select');
    size_text.innerText = size;
}

function upButton() {
    num += 1;
    inputnum.innerText = num;
    amount_money = money * num;
    moneynum.innerText = amount_money;
}

function downButton() {
    if (num > 0) {
        num -= 1;
        inputnum.innerText = num;
        amount_money = money * num;
        moneynum.innerText = amount_money;
    }

}

