var $quantity=$('.quantity'),
    $unitprice = $quantity.attr('data-unitprice'),
    $qtyBtn = $quantity.find('span'),
    $qytInput =$quantity.find('input'),
    $targetTotal=$('.total_price .price');

    $qtyBtn.click(function(){
        var currentCount = $qytInput.val();
        if($(this).hasClass('plus')){
            $qytInput.val(++currentCount);
        }else{
            if(currentCount > 1){
                $qytInput.val(--currentCount);
            }
        }
    });