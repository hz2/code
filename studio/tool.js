(function() {
    "use strict";
    /*global $ */
    $(document).ready(function() {


        $.ajax({
            type: 'GET',
            url: "https://r.qler.cn/易藏/术数/皇极经世心易发微-6.html",
            dataType: "json",
            success: function(data) {
				$("#test").val(data.content)
            }
        });

 //      // weibo 还原
 //      $("#tcn_s").on("input", function() {
 //          //     let tcn_s = $("#tcn_s").val();
 //          //     console.log(tcn_s)
 //          //     $.ajax({
 //          //         url: "https://api.weibo.com/2/short_url/expand.json?access_token=2.00mPMnoBYIQqED2d4d5efa831zmlHD&_=?&url_short=" + tcn_s + "",
 //          //         dataType: "json",
 //          //         beforeSend: function() {
 //          //             console.log("beforesend")
 //          //         },
 //          //         done: function(data) {
 //          //             console.log(data)
 //          //         },
 //          //         fail: function() {
 //          //             console.log("error")
 //          //         }
 //
 //
 //          $.getJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN" + "&callback=?", function(data) {
 //              console.log(data)
 //          });
 //
 //
 //      });
 //
 //      // uri解码
 //
 //




    });

}());