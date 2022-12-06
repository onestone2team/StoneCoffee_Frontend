
$(document).ready(function (){
    // 			$("#doc_frm").ajaxForm({
    // 				url: "./service_ok.asp",
    // 				dataType: "xml",
    // 				beforeSubmit: function (data,form,option) {
    // 	       			//validation체크
    // 	            	//막기위해서는 return false를 잡아주면됨
    // 					//return true;
    
    // 					/*
    // 					if (checkFrm()) {
    // 						return true;
    // 					}else {
    // 						return false;
    // 					}
    // 					*/
    // 	    		},
    // 	        	success: function(response,status){
    // 	        		var state = $(response).find("state").text();
    // 					var msg = $(response).find("msg").text();
    
    // 					if (state == "1")
    // 					{
    // 						alert("등록 되었습니다.");
    // 						document.location.href = "./02_customer.asp";
    // 					}else {
    // 						alert(msg);
    // 					}
    // 	      		},
    // 		   		error: function(){
    // 	       			//에러발생을 위한 code페이지
    // 	      		}
    // 			});
      
            $('.radio').click(function(){
              $('.radio').removeClass('r-on');
              $(this).addClass('r-on');
            })
            $('.check').click(function(){
              if ($('.check input').length) {
                $('.check').each(function(){
                  $(this).removeClass('c-on');
                });
                $('.check input:checked').each(function(){
                  $(this).parent('label').addClass('c-on');
                });
              };
            })  
      });
    
    
    
    
    
            function goCheck()
            {
                var name 	= $("#name").val();
                var email1	= $("#email1").val();
                var email2 	= $("#email2").val();
                var tel1 	= $("#tel1").val();
                var tel2 	= $("#tel2").val();
                var tel3 	= $("#tel3").val();
                var zip 	= $("#zip").val();
                var addr1 	= $("#addr1").val();
                var addr2 	= $("#addr2").val();
                var con 	= $("#con").val();
    
                if(name.trim() == ""){
                    alert("이름을 입력하세요");
                    $("#name").focus();
                    return;
                }
    
                if(email1.trim() == ""){
                    alert("Email을 입력하세요");
                    $("#email1").focus();
                    return;
                }
    
                if(email2.trim() == ""){
                    alert("Email을 입력하세요");
                    $("#email2").focus();
                    return;
                }
    
                if(tel1.trim() == "" || tel1.length < 2)
                    {
                    alert("휴대폰번호를 입력하세요.");
                    $("#tel1").focus();
                    return;
                    }
    
                if(tel2.trim() == "" || tel2.length < 3)
                    {
                    alert("휴대폰번호를 입력하세요.");
                    $("#tel2").focus();
                    return;
                    }
    
                if(tel3.trim() == "" || tel3.length < 4)
                    {
                    alert("휴대폰번호를 입력하세요.");
                    $("#tel3").focus();
                    return;
                    }
    
                if(zip == ""){
                    alert("주소를 입력하세요");
                    searchPostCode();
                    return;
                }
                if(addr1 == ""){
                    alert("주소를 입력하세요");
                    searchPostCode();
                    return;
                }
                if(addr2.trim() == ""){
                    alert("주소를 입력하세요");
                    $("#addr2").focus();
                    return;
                }
    
                if(con.trim() == ""){
                    alert("내용을 입력하세요");
                    $("#con").focus();
                    return;
                }
    
                if($("#fname").val() != "")
                {
                    if(chkImgFormat($("#fileName").val()))
                    {
                        $("#fileName").focus();
                        return;
                    }
                }
    
                $("#doc_frm").submit();
    
            }
    
            function Email_Sel(field){
                var str = field.value;
                if(str == "메일없음"){
                    $("#email1").val("");
                    $("#email1").prop("disabled", true);
                    $("#email1").css("background-color","#ffffff");
                    $("#email2").val("");
                    $("#email2").prop("disabled", true);
                    $("#email2").css("background-color","#ffffff");
                }else{
                    $("#email1").prop("disabled", false);
                    $("#email1").css("background-color","#ffffff");
                    $("#email2").val(str);
                    $("#email2").prop("disabled", false);
                    $("#email2").css("background-color","#ffffff");
    
                    if(str == ""){
                        $("#email2").focus();
                        $("#email2").prop("readOnly", false);
                    }else{
                        $("#email2").prop("readOnly", true);
                    }
                }
            }
            
    