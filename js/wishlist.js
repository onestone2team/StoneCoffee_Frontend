window.onload =
    function () {
        $("#headers").load("header.html");
        $("#menu-bar").load("header_user.html");
        $('#append-coffee').slick({
            slidesToShow: 4,
            slidesToScroll: 3,
            autoplay: false,
            autoplaySpeed: 1500,
            arrows: false,
            dots: false,
            pauseOnHover: true,
            responsive: [{
                breakpoint: 5000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            }, {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 570,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $('#append-etc').slick({
            slidesToShow: 4,
            slidesToScroll: 3,
            autoplay: false,
            autoplaySpeed: 1500,
            arrows: false,
            dots: false,
            pauseOnHover: true,
            responsive: [{
                breakpoint: 5000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            }, {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        product_list()
    };

async function product_list() {
    const response = await fetch(`${BACK_END_URL}/mypage/bookmark/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: "GET"
    })
    var response_json = await response.json()
    var coffee_data = response_json.coffee
    var etc_data = response_json.product
    const coffee_wish_container = document.getElementById("coffee_container")
    const etc_wish_container = document.getElementById("etc_container")

    coffee_data.forEach(element => {
        $('#append-coffee').slick('slickAdd',
        `<a href=product-detail.html?product_id=${element.id}>
        <div class="image" style="background-image: url(${BACK_END_URL}${element.image});"></div>
        </a>`
        );
    })
    etc_data.forEach(element => {
        $('#append-etc').slick('slickAdd',
        `<a href=product-detail.html?product_id=${element.id}>
        <div class="image" style="background-image: url(${BACK_END_URL}${element.image});"></div>
        </a>`
        );
    })
}



