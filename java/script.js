$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 2){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
    })
});