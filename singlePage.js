var afterLoad = function() {

    var tops = [];

    for (i = 0; i < order.length; i++) {
        tops[i] = $(order[i]).css("top");
    }

    //Parallax para singlePage

    var lastScrollTop = 0;

    $window.bind("scroll resize", function() {

        var lastPage = "";

        var page = (window.location + "").substring((window.location + "").lastIndexOf("/") + 1);

        if (page == "") {
            page = "index";
        }
        index = order.indexOf("#" + page);

        var st = $(this).scrollTop();
        if (st >= lastScrollTop) {
            // downscroll code
            var fixo = index + 1;
            var relativo = index;
        } else {
            // upscroll code
            var fixo = index + 1;
            var relativo = index;
        }
        lastScrollTop = st;


        $(".frame" + order[fixo]).css("position", "fixed");
        $(".frame" + order[fixo]).css("top", "0");
        $(".frame" + order[fixo]).css("z-index", "-1");
        $(".frame" + order[fixo + 1]).css("z-index", "-2");

        $(".frame" + order[relativo]).css("position", "relative");
        $(".frame" + order[relativo]).css("top", tops[index]);
        $(".frame" + order[relativo]).css("z-index", "auto");
        if (((window.location + "").lastIndexOf("/") + mais) === ((window.location + "").length - 1)) {
            $Nav.css({
                position: 'absolute',
                top: (parseInt(maxTop) + 50)
            });
            window.navFixed = 1;
        } else {
            $Nav.css({
                position: 'fixed',
                top: '0%'
            });
            window.navFixed = 1;
        }
        $("nav .ativo").removeClass("ativo");

        pagina = (window.location + "").substring((window.location + "").lastIndexOf("/") + 1);
        if ((window.location + "").indexOf("en_") == -1) {
            if (pagina == "") {
                $('a[data-frame="#index"]').addClass("ativo");
            } else {
                $('a[data-frame="#' + pagina + '"]').addClass("ativo");
            }
        } else {
            if (pagina == "") {
                $('a[data-frame="#en_index"]').addClass("ativo");
            } else {
                $('a[data-frame="#' + pagina + '"]').addClass("ativo");
            }
        }
    }).scroll();

}

var order = ["#index", "#who_we_are", "#portfolio", "#contact"];
$('.singlepage').singlepage({
    pages: [{
        frame: "#index",
        action: "index",
        url: "/"
    }, {
        frame: "#who_we_are",
        action: "who_we_are",
        url: "/who_we_are"
    }, {
        frame: "#portfolio",
        action: "portfolio",
        url: "/portfolio"
    }, {
        frame: "#contact",
        action: "contact",
        url: "/contact"
    }],
    order: order,
    minWidth: 767,
    ajaxLoad: {
        url: 'ajax_load',
        callback: afterLoad
    }
});
