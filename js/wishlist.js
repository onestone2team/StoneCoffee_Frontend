$(document).ready(function () {
	$('.customer-logos').slick({
		slidesToShow: 4,
		slidesToScroll: 3,
		autoplay: false,
		autoplaySpeed: 1500,
		arrows: false,
		dots: false,
		pauseOnHover: true,
		responsive: [{
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
});

async function product_list() {
	const response = await fetch(`${BACK_END_URL}/mypage/bookmark/`, {
		headers:{
			"content-type": "applycation/son",
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzc5NDc1LCJpYXQiOjE2NzA3MzYyNzUsImp0aSI6IjA1NDRlMGY5MGYyMTQwNzBiYmEzZmUzOWQ4YjNmZmMwIiwidXNlcl9pZCI6MiwicHJvZmlsZW5hbWUiOiJhZG1pbiJ9.kzNsDxn5WeC-M0kiUbRQexPM24VezpNsYpuWWC9BFf8",
		},
		method: "GET"
	})
	var response_json = await response.json()
	console.log(response_json)
	var coffee_data = response_json.coffee
	var etc_data = response_json.product
}


