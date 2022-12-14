window.onload =
    function () {
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
    };

product_list()
async function product_list() {
    const response = await fetch(`${BACK_END_URL}/mypage/bookmark/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODU1OTI4LCJpYXQiOjE2NzA4MTI3MjgsImp0aSI6IjIxZTAyYThjMmM3YzQ5ZTg5MGFkYzU2MTZhYjNlNDZjIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.nKz_eNokXLnEQLMfNPdKY6xiAw4Q6DgWh0zys7wTajk",
        },
        method: "GET"
    })
    var response_json = await response.json()
    var coffee_data = response_json.coffee
    var etc_data = response_json.product
    const coffee_wish_container = document.getElementById("coffee_container")
    const etc_wish_container = document.getElementById("etc_container")
    if (coffee_data.length == 0) {
        coffee_wish_container.style.dispaly = "none"
    } else {
        coffee_data.forEach(element => {
            $('#append-coffee').slick('slickAdd',
            `<a href=${BACK_END_URL}/product/detail/?product_id=${element.id}>
            <div class="image" style="background-image: url(${BACK_END_URL}${element.image});"></div>
            </a>`
            );
        })
    }
    if (etc_data.length == 0) {
        etc_wish_container.setAttribute("style", "display: none;")
    } else {
        etc_data.forEach(element => {
            $('#append-etc').slick('slickAdd',
            `<a href=${BACK_END_URL}/product/detail/?product_id=${element.id}>
            <div class="image" style="background-image: url(${BACK_END_URL}${element.image});"></div>
            </a>`
            );
        })
    }

}


