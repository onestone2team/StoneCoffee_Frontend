fetch(`/index.html`)
	.then(response => {
		return response.text()
	})
	.then(data => {
		document.querySelector("header").innerHTML =
                `<!-- start header top  -->
        <div class="aa-header-top">
        <div class="container">
            <div class="row">
            <div class="col-md-12">
                <div class="aa-header-top-area">
                <!-- start header top left -->
                <div class="aa-header-top-left">
                </div>
                <!-- / header top left -->
                <div class="aa-header-top-right">
                    <ul class="aa-head-top-nav-right">
                    <li><a href="account.html">내 계정</a></li>
                    <li class="hidden-xs"><a href="wishlist.html">좋아요</a></li>
                    <li class="hidden-xs"><a href="cart.html">장바구니</a></li>
                    <li class="hidden-xs"><a href="checkout.html">결제하기</a></li>
                    <li class="hidden-xs"><a href="servicecenter.html">고객 센터</a></li>
                    <li class="hidden-xs"><a href="createproduct.html">상품 등록</a></li>
                    <li><a href="" data-toggle="modal" data-target="#login-modal">로그인</a></li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <!-- / header top  -->

        <!-- start header bottom  -->
        <div class="aa-header-bottom">
        <div class="container">
            <div class="row">
            <div class="col-md-12">
                <div class="aa-header-bottom-area">
                <!-- logo  -->
                <div class="aa-logo">
                    <!-- Text based logo -->
                    <a href="index.html">
                    <!-- <span class="fa fa-shopping-cart"></span> -->
                    <p>STONE<strong>COFFEE</strong> <span>Your Shopping Partner</span></p>
                    </a>
                    <!-- img based logo -->
                    <!-- <a href="index.html"><img src="img/logo.jpg" alt="logo img"></a> -->
                </div>
                <!-- / logo  -->
                <!-- cart box -->
                <div class="aa-cartbox">
                    <div class="aa-cartbox-summary">
                    <ul>
                        <li>
                        <a class="aa-cartbox-img" href="#"><img src="../img/woman-small-2.jpg" alt="img"></a>
                        <div class="aa-cartbox-info">
                            <h4><a href="#">Product Name</a></h4>
                            <p>1 x $250</p>
                        </div>
                        <a class="aa-remove-product" href="#"><span class="fa fa-times"></span></a>
                        </li>
                        <li>
                        <a class="aa-cartbox-img" href="#"><img src="../img/woman-small-1.jpg" alt="img"></a>
                        <div class="aa-cartbox-info">
                            <h4><a href="#">Product Name</a></h4>
                            <p>1 x $250</p>
                        </div>
                        <a class="aa-remove-product" href="#"><span class="fa fa-times"></span></a>
                        </li>
                        <li>
                        <span class="aa-cartbox-total-title">
                            Total
                        </span>
                        <span class="aa-cartbox-total-price">
                            $500
                        </span>
                        </li>
                    </ul>
                    <a class="aa-cartbox-checkout aa-primary-btn" href="checkout.html">Checkout</a>
                    </div>
                </div>
                <!-- / cart box -->
                <!-- search box -->
                <div class="aa-search-box">
                    <form action="">
                    <input type="text" name="" id="" placeholder="Search here ex. 'man' ">
                    <button type="submit"><span class="fa fa-search"></span></button>
                    </form>
                </div>
                <!-- / search box -->
                </div>
            </div>
            </div>
        </div>
        </div>
        <!-- / header bottom  -->

`;
	});
fetch(`/index.html`)
	.then(response => {
		return response.text()
	})
	.then(data => {
		document.querySelector("section").innerHTML = `
        <div class="container">
        <div class="menu-area">
            <!-- Navbar -->
            <div class="navbar navbar-default" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse">
                <!-- Left nav -->
                <ul class="nav navbar-nav">
                <li><a href="index.html">Home</a></li>
                <li><a href="#">Men아하하 <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Formal</a></li>
                    <li><a href="#">Standard</a></li>
                    <li><a href="#">T-Shirts</a></li>
                    <li><a href="#">Shirts</a></li>
                    <li><a href="#">Jeans</a></li>
                    <li><a href="#">Trousers</a></li>
                    <li><a href="#">And more.. <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                        <li><a href="#">Sleep Wear</a></li>
                        <li><a href="#">Sandals</a></li>
                        <li><a href="#">Loafers</a></li>
                        </ul>
                    </li>
                    </ul>
                </li>
                <li><a href="#">Women <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="#">Kurta & Kurti</a></li>
                    <li><a href="#">Trousers</a></li>
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Formal</a></li>
                    <li><a href="#">Sarees</a></li>
                    <li><a href="#">Shoes</a></li>
                    <li><a href="#">And more.. <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                        <li><a href="#">Sleep Wear</a></li>
                        <li><a href="#">Sandals</a></li>
                        <li><a href="#">Loafers</a></li>
                        <li><a href="#">And more.. <span class="caret"></span></a>
                            // <ul class="dropdown-menu">
                            <li><a href="#">Rings</a></li>
                            <li><a href="#">Earrings</a></li>
                            <li><a href="#">Jewellery Sets</a></li>
                            <li><a href="#">Lockets</a></li>
                            <li class="disabled"><a class="disabled" href="#">Disabled item</a></li>
                            <li><a href="#">Jeans</a></li>
                            <li><a href="#">Polo T-Shirts</a></li>
                            <li><a href="#">SKirts</a></li>
                            <li><a href="#">Jackets</a></li>
                            <li><a href="#">Tops</a></li>
                            <li><a href="#">Make Up</a></li>
                            <li><a href="#">Hair Care</a></li>
                            <li><a href="#">Perfumes</a></li>
                            <li><a href="#">Skin Care</a></li>
                            <li><a href="#">Hand Bags</a></li>
                            <li><a href="#">Single Bags</a></li>
                            <li><a href="#">Travel Bags</a></li>
                            <li><a href="#">Wallets & Belts</a></li>
                            <li><a href="#">Sunglases</a></li>
                            <li><a href="#">Nail</a></li>
                            </ul>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </li>
                <li><a href="#">Kids <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Formal</a></li>
                    <li><a href="#">Standard</a></li>
                    <li><a href="#">T-Shirts</a></li>
                    <li><a href="#">Shirts</a></li>
                    <li><a href="#">Jeans</a></li>
                    <li><a href="#">Trousers</a></li>
                    <li><a href="#">And more.. <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                        <li><a href="#">Sleep Wear</a></li>
                        <li><a href="#">Sandals</a></li>
                        <li><a href="#">Loafers</a></li>
                        </ul>
                    </li>
                    </ul>
                </li>
                <li><a href="#">Sports</a></li>
                <li><a href="#">Digital <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="#">Camera</a></li>
                    <li><a href="#">Mobile</a></li>
                    <li><a href="#">Tablet</a></li>
                    <li><a href="#">Laptop</a></li>
                    <li><a href="#">Accesories</a></li>
                    </ul>
                </li>
                <li><a href="#">Furniture</a></li>
                <li><a href="blog-archive.html">Blog <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="blog-archive.html">Blog Style 1</a></li>
                    <li><a href="blog-archive-2.html">Blog Style 2</a></li>
                    <li><a href="blog-single.html">Blog Single</a></li>
                    </ul>
                </li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="#">Pages <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a href="product.html">Shop Page</a></li>
                    <li><a href="product-detail.html">Shop Single</a></li>
                    <li><a href="404.html">404 Page</a></li>
                    </ul>
                </li>
                </ul>
            </div><!--/.nav-collapse -->
            </div>
        </div>
        </div>
        `;
	});

fetch(`/index.html`)
	.then(response => {
		return response.text()
	})
	.then(data => {
		document.querySelector("section1").innerHTML = `<div class="container">
                                                            <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="aa-client-brand-area">
                                                                <ul class="aa-client-brand-slider">
                                                                    <li><a href="#"><img src="../img/client-brand-java.png" alt="java img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-jquery.png" alt="jquery img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-html5.png" alt="html5 img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-css3.png" alt="css3 img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-wordpress.png" alt="wordPress img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-joomla.png" alt="joomla img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-java.png" alt="java img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-jquery.png" alt="jquery img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-html5.png" alt="html5 img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-css3.png" alt="css3 img"></a></li>
                                                                    <li><a href="#"><img src="../img/client-brand-wordpress.png" alt="wordPress img"></a></li>
                                                                </ul>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>`;
	});

fetch(`/index.html`)
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("footer").innerHTML =
            `<!-- footer bottom -->
        <div class="aa-footer-top">
        <div class="container">
            <div class="row">
            <div class="col-md-12">
                <div class="aa-footer-top-area">
                <div class="row">
                    <div class="col-md-3 col-sm-6">
                    <div class="aa-footer-widget">
                        <h3>Main Menu</h3>
                        <ul class="aa-footer-nav">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><a href="#">Our Products</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                    <div class="aa-footer-widget">
                        <div class="aa-footer-widget">
                        <h3>Knowledge Base</h3>
                        <ul class="aa-footer-nav">
                            <li><a href="#">D123elivery</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Discount</a></li>
                            <li><a href="#">Special Offer</a></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                    <div class="aa-footer-widget">
                        <div class="aa-footer-widget">
                        <h3>Useful Links</h3>
                        <ul class="aa-footer-nav">
                            <li><a href="#">Site Map</a></li>
                            <li><a href="#">Search</a></li>
                            <li><a href="#">Advanced Search</a></li>
                            <li><a href="#">Suppliers</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                    <div class="aa-footer-widget">
                        <div class="aa-footer-widget">
                        <h3>Contact Us</h3>
                        <address>
                            <p> 25 Astor Pl, NY 10003, USA</p>
                            <p><span class="fa fa-phone"></span>+1 212-982-4589</p>
                            <p><span class="fa fa-envelope"></span>dailyshop@gmail.com</p>
                        </address>
                        <div class="aa-footer-social">
                            <a href="#"><span class="fa fa-facebook"></span></a>
                            <a href="#"><span class="fa fa-twitter"></span></a>
                            <a href="#"><span class="fa fa-google-plus"></span></a>
                            <a href="#"><span class="fa fa-youtube"></span></a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <!-- footer-bottom -->
        <div class="aa-footer-bottom">
            <div class="container">
            <div class="row">
            <div class="col-md-12">
                <div class="aa-footer-bottom-area">
                <p>Designed by <a href="http://www.markups.io/">MarkUps.io</a></p>
                <div class="aa-footer-payment">
                    <span class="fa fa-cc-mastercard"></span>
                    <span class="fa fa-cc-visa"></span>
                    <span class="fa fa-paypal"></span>
                    <span class="fa fa-cc-discover"></span>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>`;
        });