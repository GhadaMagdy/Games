$( document ).ready(function() {
    $('.shape').on("click",function(){
        console.log($(this).html());
        $(this).toggleClass('active');
    })
});