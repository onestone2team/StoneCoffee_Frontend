// var index = 0;   //이미지에 접근하는 인덱스
// var banner_left = 0;
// var img_cnt = 0;
// var first=1;
// var last;
// var interval;
// window.onload = function(){
//     slideShow();
//     rolling();
// }

// function slideShow() {
// var i;
// var x = document.getElementsByClassName("slide1");  //slide1에 대한 dom 참조
// for (i = 0; i < x.length; i++) {
//    x[i].style.display = "none";   //처음에 전부 display를 none으로 한다.
// }
// index++;
// if (index > x.length) {
//     index = 1;  //인덱스가 초과되면 1로 변경
// }   
// x[index-1].style.display = "block";  //해당 인덱스는 block으로
// setTimeout(slideShow, 3000);   //함수를 4초마다 호출



// }
// function rolling() {
// $(".rolling_wrap a").each(function() {
//   $(this).css("left", banner_left);
//   banner_left += $(this).width()+5;
//   $(this).attr("id", "content"+(++img_cnt));
// });

// last = img_cnt;
// startAction();

// $(".content").hover(
//   function() { stopAction(); }, 
//   function() { startAction(); });
// };

// function startAction() {
// interval = setInterval(function() {
//   $(".rolling_wrap a").each(function() {
//     $(this).css("left", $(this).position().left-1);
//   });

//   var first_content = $("#content"+first);
//   var last_content = $("#content"+last);

//   // if(first_content.position().left < "-"+$(first_content).width()) {
//   //   first_content.css("left", last_content.position().left+last_content.width()+5);
//   //   first++;
//   //   last++;
//   //   if(last > img_cnt) { last = 1;}
//   //   if(first > img_cnt) {first = 1;}
//   // }
// }, 15);
// }

// function stopAction() {
// clearInterval(interval);
// }

