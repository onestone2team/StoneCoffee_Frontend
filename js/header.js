fetch(` `)
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("header").innerHTML =
        `<div class="aa-header-top">
            <div class="container">
                <div class="header_top_row">
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
                                <li><a onclick="logoutUser()" data-toggle="modal" data-target="#login-modal">로그인</a></li>
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
                <div class="hearder_bottom_row">
                    <div class="col-md-12">
                        <div class="aa-header-bottom-area">
                            <!-- logo  -->
                            <div class="aa-logo" padding="30px">
                                <a href="main.html">
                                <p>STONE<strong>COFFEE</strong> <span>Your Shopping Partner</span></p>
                                <!-- <img src="../img/logo.png"  height="200px" width="200px"  >--!>
                                </a>
                            </div>
                            <!-- / cart box -->
                            <!-- search box -->
                            <div class="aa-search-box">
                                <form action="">
                                <input type="text" name="" id="" placeholder="검색할 상품명을 입력해주세요.">
                                <button type="submit"><span class="fa fa-search">검색 </span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
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
          
          </div>
          <div class="navbar-collapse collapse">
            <!-- Left nav -->
            <ul class="nav navbar-nav">
              <li><a href="main.html">Home</a></li>
              <li><a href="mainAll.html?id=1" >원두 전체보기</a> 
              </li>
              <li><a href="mainbody.html?id=4" vlaue=4,category_id=4>바디감</a>
              </li>
              <li><a href="mainacidy.html?id=5" vlaue=4,category_id=4>산미 </a>
              </li>
              <li><a href="mainproduct.html?id=3" vlaue=4,category_id=4 >커피 용품</a></li>
             <li><a href="maingoods.html?id=2" vlaue=4,category_id=4 >스톤커피 굿즈</a>
              </li>
              <li><a href="servicecenter.html">1:1문의</a></li>            


            </div>
        </div>
        </div>
      </div>       
    </div>
    `;
  });

async function logoutUser(){
  access_token = localStorage.getItem("kakao")
  if (access_token){
    const response_logout = await fetch(`https://kapi.kakao.com/v1/user/unlink`, {
      headers: { //https://kapi.kakao.com/v1/user/unlink
          'content-type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("kakao")
      },
        method: 'GET',
      })

    const response_json = await response_logout.json()

    console.log(response_json)
  }
  
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  localStorage.removeItem("payload")
  localStorage.removeItem("kakao")

  window.location.replace(`../../signupin.html`);
}

