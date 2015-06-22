    var tops = [];

function isScrolledIntoView(elem){
    $elem = $(elem);
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = $elem.offset().top;
    bounds.bottom = bounds.top + $elem.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
    /*var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    */
}

function getActualFrame(){
    for(i = 0; i < tops.length; i++){
        if(isScrolledIntoView(".frame[frame='"+i+"']")){
            return i;
        }
    }
}



$(document).ready(function() {
        
    var i = 0;

    $(".frame").each(function(){
        $(this).attr("frame", i);
        var scrollTop = $(window).scrollTop(),
	elementOffset = $(this).offset().top;
	
        tops[i] = elementOffset;
        i++;
    });

    //Parallax para singlePage

    var lastScrollTop = 0;

    $(window).scroll(function() {

        var lastPage = "";

       
        var st = $(this).scrollTop();
        index = getActualFrame();
        var fixo = index + 1;
        var relativo = index;
        lastScrollTop = st;


        $(".frame[frame='" + fixo + "']").css("position", "fixed");
        $(".frame[frame='" + fixo + "']").css("top", "0");
        $(".frame[frame='" + fixo + "']").css("z-index", "-1");
        $(".frame[frame='" + (fixo + 1) + "']").css("z-index", "-2");

        $(".frame[frame='" + relativo + "']").css("position", "relative");
        $(".frame[frame='" + relativo + "']").css("top", 0);//tops[index]
        $(".frame[frame='" + relativo + "']").css("z-index", "auto");
//        $(".frame[frame='" + (fixo + 2) + "']").css("z-index", "auto");
//        $(".frame[frame='" + (fixo + 2) + "']").css("position", "relative");

    });