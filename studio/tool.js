(function() {
    "use strict";
    /*global $ */
    $(document).ready(function() {


        $.ajax({
            type: 'GET',
            url: "../文赋.txt",
            dataType: "text",
            done: function(data) {
                console.log(data);
            }
        });

        // weibo 还原
        $("#tcn_s").on("input", function() {
            //     let tcn_s = $("#tcn_s").val();
            //     console.log(tcn_s)
            //     $.ajax({
            //         url: "https://api.weibo.com/2/short_url/expand.json?access_token=2.00mPMnoBYIQqED2d4d5efa831zmlHD&_=?&url_short=" + tcn_s + "",
            //         dataType: "json",
            //         beforeSend: function() {
            //             console.log("beforesend")
            //         },
            //         done: function(data) {
            //             console.log(data)
            //         },
            //         fail: function() {
            //             console.log("error")
            //         }


            $.getJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN" + "&callback=?", function(data) {
                console.log(data)
            });


        });

        // uri解码






    });

}());