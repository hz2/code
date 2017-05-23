$(document).ready(function() {
    // 切换页面时重新加载状态文字
    console.clear();
    console.log('%c觉得页面很棒？😊\n联系作者 hu2x@qq.com', 'color:teal;');

    // github ribbon 
    (function() {
        var $el = $("#ribbon_text");
        if (/oschina/i.test(window.location.host)) {
            $el.attr("href", "//git.oschina.net/h2x/h2x/tree/master" + window.location.pathname).find("span").text("GitOSC")
        } else {
            $el.attr("href", "//github.com/hcw/hcw.github.io/tree/master" + window.location.pathname).find("span").text("Github")
        }
    })();

    function loadStatus() {
        $(".user_status").text($("input[type=\"radio\"]:checked+label").text());
    }

    // 加载 json
    function loadSearch(x) {
        var d_url, d_random = Math.floor(Math.random() * (5000 - 100 + 1) + 100);
        if (x === "books") {
            d_url = "https://api.douban.com/v2/book/search?tag=%E6%96%87%E5%AD%A6&start=" + d_random + "&count=1&fields=id,title,author,pubdate,images,rating&callback=?";
        } else if (x === "musics") {
            d_url = "https://api.douban.com/v2/music/search?tag=%E5%8D%8E%E8%AF%AD&start=" + d_random + "&count=1&callback=?";
        } else if (x === "movies") {
            d_url = "https://api.douban.com/v2/movie/in_theaters?callback=?";
        } else if (x === "bookid") { // 输入 ID
            d_url = "https://api.douban.com/v2/book/" + $("#text_1").val() + "?callback=?";
        } else if (x === "musicid") {
            d_url = "https://api.douban.com/v2/music/" + $("#text_1").val() + "?callback=?";
        } else if (x === "movieid") {
            d_url = "https://api.douban.com/v2/movie/subject/" + $("#text_1").val() + "?callback=?";
        }
        //console.log(d_url);
        $.ajax({
            url: d_url,
            dataType: "json",
            beforeSend: function() {
                if (x === "books" || x === "movies" || x === "musics") {
                    $('.loading').show();
                }
            },
            success: function(data) {
                //    console.log(data);
                var d_id, d_title, d_average, d_num, d_author, d_date, d_image, d_star, d_data;

                if (x === "books") {
                    d_data = data.books[0];
                } else if (x === "musics") {
                    d_data = data.musics[0];
                } else if (x === "movies") {
                    d_data = data.subjects[Math.floor(Math.random() * (19 - 0 + 1))];
                } else if (x === "bookid" || x === "musicid" || x === "movieid") {
                    d_data = data;
                }

                if (x === "books" || x === "bookid") {
                    d_num = d_data.rating.numRaters;
                    d_author = d_data.author[0];
                    d_date = d_data.pubdate;
                    d_image = d_data.images.large;
                } else if (x === "musics" || x === "musicid") {
                    d_num = d_data.rating.numRaters;
                    d_author = d_data.author[0].name;
                    d_date = d_data.attrs.pubdate[0];
                    d_image = d_data.image.replace(/spic/i, "lpic");
                } else if (x === "movies" || x === "movieid") {
                    d_num = d_data.collect_count;
                    d_author = d_data.directors[0].name;
                    d_date = d_data.casts[0].name;
                    d_image = d_data.images.large;
                }
                d_id = d_data.id;
                d_title = d_data.title;
                d_average = d_data.rating.average;
                d_star = parseFloat(d_average).toFixed() * 10 / 2;
                $("#text_1").val(d_id);
                $("#title").text(d_title);
                $("#title").attr("title", d_title);
                $("#bigstar").attr("class", "bigstar" + d_star);
                $("#num").text(d_num);
                $("#star").text(d_average);
                $("#director").text(d_author);
                $("#director").attr("title", d_author);
                $("#actor").text(d_date);
                $("#actor").attr("title", d_date);
                $("#pic,.screen").css("background-image", "url(" + d_image + ")");
                $(".loading,.error").hide();
            },
            error: function() {
                $('.loading').hide();
                $(".error").show();
                $(".error").text("输入的 id 不正确");
                if ($("#text_1").val() === "" && x === "bookid") {
                    $(".error").text("请输入书籍ID");
                } else if ($("#text_1").val() === "" && x === "musicid") {
                    $(".error").text("请输入音乐ID");
                } else if ($("#text_1").val() === "" && x === "movieid") {
                    $(".error").text("请输入电影ID");
                } else {
                    $('.loadinginfo').text("加载失败，请刷新页面");
                    $('.loadingicon').addClass("loadingicon2").removeClass("loadingicon");
                }
            }
        });

    }

    // 页面切换
    function bookPage() {
        $("#booktab").addClass("current");
        $(".tab>div:not(#booktab)").removeClass("current");
        $("#your_id").text("请输入书籍ID");
        $("#text_2").val("读者");
        $("#text_4").val("很不错的书！");
        $("#dmovie [for=\"d_todo\"]").text("想读");
        $("#d_doing,#dmovie [for=\"d_doing\"]").removeAttr("style");
        $("#dmovie [for=\"d_doing\"]").text("在读");
        $("#dmovie [for=\"d_done\"]").text("读过");
        $("#title_d").text("作者：");
        $("#title_a").text("出版时间：");
        loadStatus();
        loadSearch("books");
        $("#user_name").text($("#text_2").val());
        $("#user_text").text($("#text_4").val());

    }

    function musicPage() {
        $("#musictab").addClass("current");
        $(".tab>div:not(#musictab)").removeClass("current");
        $("#your_id").text("请输入音乐ID");
        $("#text_2").val("听众");
        $("#text_4").val("很好听的音乐！");
        $("#dmovie [for=\"d_todo\"]").text("想听");
        $("#d_doing,#dmovie [for=\"d_doing\"]").removeAttr("style");
        $("#dmovie [for=\"d_doing\"]").text("在听");
        $("#dmovie [for=\"d_done\"]").text("听过");
        $("#title_d").text("表演者：");
        $("#title_a").text("发行时间：");
        loadStatus();
        loadSearch("musics");
        $("#user_name").text($("#text_2").val());
        $("#user_text").text($("#text_4").val());
    }

    function moviePage() {
        $("#movietab").addClass("current");
        $(".tab>div:not(#movietab)").removeClass("current");
        $("#your_id").text("请输入电影ID");
        $("#text_2").val("观众");
        $("#text_4").val("很棒的电影！");
        $("#dmovie [for=\"d_todo\"]").text("想看");
        $("#dmovie [for=\"d_doing\"],#d_doing").css("display", "none");
        $("#dmovie [for=\"d_done\"]").text("看过");
        $("#title_d").text("导演：");
        $("#title_a").text("主演：");
        loadStatus();
        loadSearch("movies");
        $("#user_name").text($("#text_2").val());
        $("#user_text").text($("#text_4").val());
    }

    // 页面加载时填入数值
    $("#dmovie input").click(function(e) {
        if ($("#d_todo").prop('checked') === true) {
            $("#user_star,.starval,#starval").hide();
            $("#user_status").css("margin", "15px");
        } else {
            $("#user_star,.starval,#starval").show();
            $("#user_status").removeAttr("style");
        }
    });
    $("#user_name").text($("#text_2").val());
    $("#user_pic").css("background-image", "url(" + $("#text_3").val() + ")");
    $("#user_text").text($("#text_4").val());
    // 状态改变时改变数值
    $("#starval").change(function() {
        $("#user_star").attr("class", $("#starval").val());
    });
    $("input[type=\"radio\"]").change("input", function() {
        $(".user_status").text($("input[type=\"radio\"]:checked+label").text());
    });
    $("#text_2").on("input", function() {
        $("#user_name").text($("#text_2").val());
    });
    $("#text_3").on("input", function() {
        $("#user_pic").css("background-image", "url(" + $("#text_3").val() + ")");
    });
    $("#text_4").on("input", function() {
        $("#user_text").text($("#text_4").val());
    });

    // 输入 id 时 加载 json
    $("#text_1").on("input", function() {
        if (window.location.hash === "#book") {
            loadSearch("bookid");
        } else if (window.location.hash === "#music") {
            loadSearch("musicid");
        } else if (window.location.hash === "#movie") {
            loadSearch("movieid");
        } else {
            loadSearch("movieid");
        }
    });
    // tab栏点击
    $("#booktab").click(function() {
        bookPage();
    });
    $("#musictab").click(function() {
        musicPage();
    });
    $("#movietab").click(function() {
        moviePage();
    });

    //地址栏直接输入
    var hash = window.location.hash;
    switch (hash) {
        case "#book":
            bookPage();
            break;
        case "#music":
            musicPage();
            break;
        case "#movie":
            moviePage();
            break;
        default:
            moviePage();
            break;
    }





});