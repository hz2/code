function setSlider(index) {
    $("#slider").find("li:eq(" + index + ")").attr("class", "front").siblings("li").attr("class", "");
    $("#dot").find("li:eq(" + index + ")").attr("class", "dot active").siblings("li").attr("class", "dot");
}


function autoSlider(type) {
    if (type === "start") {
        console.log("开始");
        t = setInterval(function() {
            var x = parseInt($("#slider").find(".front").index());
            x += 1;
            if (x > 6) {
                x = 0;
            }

            setSlider(x);
        }, 4000);
    } else if (type === "stop") {
        clearInterval(t);
        console.log("停止");

    }
}
setSlider(0);

$("#next").on("click", function() {
    autoSlider("stop");
    var nav_index = parseInt($("#slider").find(".front").index()) + 1;
    if (nav_index > 6) {
        nav_index = 0;
    }
    setSlider(nav_index);
    autoSlider("start");
});

$("#prev").on("click", function() {
    autoSlider("stop");
    var nav_index = parseInt($("#slider").find(".front").index()) - 1;
    if (nav_index < 0) {
        nav_index = 6;
    }
    setSlider(nav_index);
    autoSlider("start");

});
$("#dot li").on("click", function() {
    autoSlider("stop");
    var nav_index = $(this).index();
    setSlider(nav_index);
    autoSlider("start");
});

setTimeout(autoSlider("start"), 5000);

$("#load1").on("click", function(e) {
    e.preventDefault();
    $("#text1").load("1.html").hide().fadeIn(600);
    $("#text2").load("2.html").hide().fadeIn(600);
    $("#text3").load("3.html").hide().fadeIn(600);
});
$("#load2").on("click", function(e) {
    e.preventDefault();
    $("#text1").load("4.html").hide().fadeIn(600);
    $("#text2").load("5.html").hide().fadeIn(600);
    $("#text3").load("6.html").hide().fadeIn(600);
});
$("#load3").on("click", function(e) {
    e.preventDefault();
    $("#text1").load("7.html").hide().fadeIn(600);
    $("#text2").load("8.html").hide().fadeIn(600);
    $("#text3").load("9.html").hide().fadeIn(600);
});
$("#m_menu").on("click", function(e) {
    $(".left_menu").fadeToggle(300);
});