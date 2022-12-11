var $quantity=$('.quantity'),
    $unitprice = $quantity.attr('data-unitprice'),
    $qtyBtn = $quantity.find('span'),
    $qytInput =$quantity.find('input'),
    $targetTotal=$('.total_price .price');   

    $qtyBtn.click(function(){
        var currentCount = $qytInput.val();
        if($(this).hasClass('plus')){
            $qytInput.val(++currentCount);
            console.log($qytInput)
        }else{
            if(currentCount > 1){
                $qytInput.val(--currentCount);
            }
        }
        console.log(currentCount)
        console.log($unitprice)
        var total = (currentCount * $unitprice).toLocaleString('en');
        $targetTotal.text(total+'$'); 
    });