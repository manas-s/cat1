$(document).ready(function (e) {
    $(".drop_a").click(function (e) {
        $(".contextMenu").fadeOut();
        $(".hhide1").hide();
        $(".hhide2").hide();
        $(".hhide3").hide();
        $(".hhide4").hide();
        $(".hhide").toggle();

        $(document).click(function () {
            $(".hhide").hide();
        });
        e.stopPropagation();
    });

    $(".hhide").click(function (e) {
        $(document).click(function () {
            $(".hhide").hide();
        });
        e.stopPropagation();
    });

    $(document).click(function () {
        $(".hhide").hide();
    });


});

$(document).ready(function (e) {
    $(".drop_a1").click(function (e) {
        $(".contextMenu").fadeOut();
        $(".hhide").hide();
        $(".hhide2").hide();
        $(".hhide3").hide();
        $(".hhide4").hide();
        $(".hhide1").toggle();
        $(".contextMenu").hide();
        $(document).click(function () {
            $(".hhide1").hide();
        });

        e.stopPropagation();
    });
    $(".hhide1").click(function (e) {
        $(document).click(function () {
            $(".hhide1").hide();
        });

        e.stopPropagation();
    });

    $(document).click(function () {
        $(".hhide1").hide();
    });

});


$(document).ready(function (e) {

    $(".drop_a2").click(function (e) {
        $(".contextMenu").fadeOut();
        $(".hhide1").hide();
        $(".hhide").hide();
        $(".hhide3").hide();
        $(".hhide4").hide();
        $(".hhide2").toggle();
        $(".contextMenu").hide();

        $(document).click(function () {
            $(".hhide2").hide();
        });
        e.stopPropagation();
    });

    $(".hhide2").click(function (e) {

        $(document).click(function () {
            $(".hhide2").hide();
        });
        e.stopPropagation();
    });

    $(document).click(function () {
        $(".hhide2").hide();
    });

});



$(document).ready(function (e) {

    $(".drop_a3").click(function (e) {
        $(".contextMenu").fadeOut();
        $(".hhide1").hide();
        $(".hhide2").hide();
        $(".hhide").hide();
        $(".hhide4").hide();
        $(".hhide3").toggle();
        $(document).click(function () {
            $(".hhide3").hide();
        });

        e.stopPropagation();
    });

    $(".hhide3").click(function (e) {
        $(document).click(function () {
            $(".hhide3").hide();
        });

        e.stopPropagation();
    });

    $(document).click(function () {
        $(".hhide3").hide();
    });

});



//$(".drop_a4").click(function (e) {
//    $(".hhide4").show();
//    e.stopPropagation();
//});


//$(".hhide4").click(function (e) {
//    e.stopPropagation();
//});

//$(document).click(function () {
//    $(".hhide4").hide();
//});