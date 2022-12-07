fetch(` `)
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
                <a href="main.html">
                  <p>STONE<strong>COFFEE</strong> <span>Your Shopping Partner</span></p>
                </a>
                
              </div>
              <div class="aa-cartbox">
                <div class="aa-cartbox-summary">
                  <ul>
                    <li>
                      <a class="aa-cartbox-img" href="#"><img src="../img/wom an-small-2.jpg" alt="img"></a>
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
                  <input type="text" name="" id="" placeholder="검색할 상품명을 입력해주세요.">
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
  fetch(`../index.html`)
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
              <li><a href="main.html">Home</a></li>
              <li><a href="#">원두 전체보기</a> 
              </li>
              <li><a href="#">바디감</a>
              </li>
              <li><a href="#">산미 </a>
              </li>
              <li><a href="#">커피 용품</a></li>
             <li><a href="#">스톤커피 굿즈</a>
              </li>
              <li><a href="servicecenter.html">1:1문의</a></li>            

        </div>
      </div>       
    </div>
    `;
  });
