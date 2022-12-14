$('#comment_img').on('change', function() {
    ext = $(this).val().split('.').pop().toLowerCase(); //확장자
    //배열에 추출한 확장자가 존재하는지 체크
    if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        resetFormElement($(this)); //폼 초기화
        window.alert('이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)');
    } else {
        file = $('#comment_img').prop("files")[0];
        blobURL = window.URL.createObjectURL(file);
        $('#image_preview img').attr('src', blobURL);
        $('#image_preview').slideDown(); //업로드한 이미지 미리보기 
        $(this).slideUp(); //파일 양식 감춤
    }
    });


    async function createproduct(){
        const category=document.querySelectorAll("select")[0];
        const product_img=document.querySelector("input[type='file']");
        const product_name=document.getElementById("product_name");
        const product_price=document.getElementById("product_price");
        const product_content=$('#textarea').val();
        const aroma_grade=document.querySelectorAll("select")[1];
        const sweet_grade=document.querySelectorAll("select")[2];
        const acidity_grade=document.querySelectorAll("select")[3];
        const body_grade=document.querySelectorAll("select")[4];
        if (category.value == 0){
            alert("카테고리는 필수 사항입니다")
        }else if(product_img.value == null || product_img.value ==undefined){
            alert("이미지는 필수 사항입니다")
        }else if(product_name.value == null || product_name.value ==undefined){
            alert("이름은 필수 사항입니다")
        }else if (product_price.value == null || product_price.value == undefined){
            alert("가격은 필수 사항입니다")
        }else if (product_content == null || product_content ==undefined){
            alert("상품 설명은 필수 사항입니다.")
        }else if ((category.value == 2 || category.value ==3)&&((aroma_grade.value!=0 || sweet_grade.value!=0||acidity_grade.value!=0||body_grade.value!=0))){
            alert("원두가 아닌상품은 원두평가를 내릴수 없습니다.")
        }else if ((category.value == 1)!=((aroma_grade.value> 0 )&&( sweet_grade.value>0)&&(acidity_grade.value >0 )&&((body_grade.value>0)))){
            alert("원두평가를 해주세요") 
        }else{
                let formdata = new FormData 
                formdata.append('category', category.value)
                formdata.append('image', product_img.files[0])
                formdata.append('product_name', product_name.value)
                formdata.append('price', product_price.value)
                formdata.append('content', product_content)
                formdata.append('aroma_grade', aroma_grade.value)
                formdata.append('sweet_grade', sweet_grade.value)
                formdata.append('acidity_grade', acidity_grade.value)
                formdata.append('body_grade',body_grade.value)
        const response =await fetch(`${BACK_END_URL}/product/create/`, {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method: 'POST',
            body: formdata
        })
            response_json=await response.json()
            console.log(response_json)
            if (response.status == 200 || response.status == 202 || response.status == 201) {
                alert("정상적으로 상품 등록이 되었습니다.")
                location.reload();
            }
            else if (response.status == 400) {
                alert("오류가 발생했습니다..")
                }
                location.reload();
            }

    }

        