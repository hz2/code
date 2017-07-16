var ua = window.navigator.userAgent,
    navi = [
        ["用户代理", window.navigator.userAgent],
        ["代码名", window.navigator.appCodeName],
        ["应用名", window.navigator.appName],
        ["产品", window.navigator.product],
        ["次级产品", window.navigator.productSub],
        ["Cookie", window.navigator.cookieEnabled],
        ["禁止追踪", window.navigator.doNotTrack],
        ["硬件并发", window.navigator.hardwareConcurrency],
        ["语言", window.navigator.language],
        ["多点触控", window.navigator.maxTouchPoints],
        ["联网状态", window.navigator.onLine],
        ["平台", window.navigator.platform],
        ["供应商", window.navigator.vendor],
        ["屏幕尺寸", window.screen.width + "x" + window.screen.height]
    ],
    ua_b = [],
    ua_s = [],
    ua_h = [],
    icon_b,
    icon_s,
    icon_h,
    v,
    v1,
    v2,
    res = "",
    i;
// 浏览器
if (/hahhaha2017/i.test(ua)) {
    ua_b = ["", ""];
} else if (ua.match(/micromessenger\/(\d+\.+\d+)/i)) { // weixin
    ua_b = ["wechat", "微信 " + RegExp.$1];
} else if (ua.match(/(tim)[\d\.]*\/(\d+\.+\d+)/i)) { // tim
    ua_b = ["qqtim", "TIM " + RegExp.$2];
} else if (ua.match(/qzone\/[\d\-A-z]+qz_(\d+\.+\d+)/i)) { // qzone
    ua_b = ["qzone", "QQ空间 " + RegExp.$1];
} else if (ua.match(/qq\/\d+\.+\d+/i)) { // 腾讯qq
    ua_b = ["qqo", v[0].split("/").join(" ")];
} else if (ua.match(/AlipayClient\/(\d+\.+\d+)/i)) { // 支付宝
    ua_b = ["alipay", "支付宝 " + RegExp.$1];
} else if (ua.match(/dingtalk\/(\d+\.+\d+)/i)) { // 钉钉
    ua_b = ["dingtalk", "钉钉 " + RegExp.$1];
} else if (/weibo/i.test(ua)) { // weibo
    ua_b = ["weibo", " 微博"];
} else if (ua.match(/coolmarket\/(\d+\.+\d+)/i)) { // coolapk
    ua_b = ["coolapk", "酷市场 " + RegExp.$1];
} else if (ua.match(/tieba\/(\d+\.+\d+)/i)) { // tieba
    ua_b = ["tieba", "贴吧 " + RegExp.$1];
} else if (/BaiduYunGuanJia/i.test(ua)) { // BaiduYunGuanJia
    ua_b = ["bdpan", "百度网盘"];
} else if (ua.match(/liebaofast\/(\d+\.+\d+)/i)) { // liebao
    ua_b = ["liebao", "猎豹 " + RegExp.$1];
} else if (ua.match(/sogoumobilebrowser\/(\d+\.+\d+)/i)) { //  sogou 浏览器
    ua_b = ["sgllq", "搜狗 " + RegExp.$1];
} else if (/sogousearch|sogou/i.test(ua)) { // sogou 搜索
    ua_b = ["sogou", "搜狗搜索"];
} else if (ua.match(/(bdmobile|baiduboxapp)\/(\d+\.+\d+)+/i)) { // 掌上百度
    ua_b = ["baidu", "掌上百度 " + RegExp.$2];
} else if (ua.match(/bdbrowser\/(\d+\.+\d+)/i)) { // 百度手机浏览器
    ua_b = ["bdmllq", "百度浏览器 " + RegExp.$1];
} else if (ua.match(/mobile[\w\d\.\/\ ]+baidubrowser\/(\d+\.+\d+)/i)) { // 百度手机浏览器
    ua_b = ["bdmllq", "百度浏览器 " + RegExp.$1];
} else if (ua.match(/lebrowser\/(\d+\.+\d+)/i)) { // 绿茶浏览器
    ua_b = ["lcllq", "绿茶浏览器 " + RegExp.$1];
} else if (ua.match(/mxbrowser\/(\d+\.+\d+)/i)) { // 傲游
    ua_b = ["maxthon", "傲游 " + RegExp.$1];
} else if (ua.match(/baidubrowser\/(\d+\.+\d+)/i)) { // 百度浏览器
    ua_b = ["bdllq", "百度浏览器 " + RegExp.$1];
} else if (ua.match(/waterfox\/\d+/i)) { //水狐
    ua_b = ["waterfox", v[0].split("/").join(" ")];
} else if (ua.match(/palemoon\/\d+/i)) { //苍月
    ua_b = ["palemoon", v[0].split("/").join(" ")];
} else if (ua.match(/Focus\/[\d\.]+/i)) { // 火狐 focus
    ua_b = ["firefox", v[0].split("/").join(" "), "focus"];
} else if (ua.match(/firefox\/\d+/i)) { // 火狐系最后
    ua_b = ["firefox", v[0].split("/").join(" ")];
} else if (ua.match(/yabrowser\/(\d+\.+\d+)/i)) {
    ua_b = ["yandex", "Yandex " + RegExp.$1];
} else if (ua.match(/midori\/(\d+\.+\d+)/i)) {
    ua_b = ["midori", v[0].split("/").join(" ")];
} else if (ua.match(/qupzilla\/(\d+\.+\d+)/i)) {
    ua_b = ["qupzilla", v[0].split("/").join(" ")];
} else if (ua.match(/Vivaldi\/(\d+\.+\d+)/i)) {
    ua_b = ["vivaldi", v[0].split("/").join(" ")];
} else if (ua.match(/bidubrowser\/(\d+\.+\d+)/i)) {
    ua_b = ["bdllq", "百度浏览器 " + RegExp.$1];
} else if (ua.match(/qqbrowser\/(\d+\.+\d+)/i)) {
    ua_b = ["qqllq", "QQ浏览器 " + RegExp.$1];
} else if (ua.match(/(UCBrowser|UBrowser)\/(\d+\.+\d+)/i)) {
    ua_b = ["uc", "UC浏览器 " + RegExp.$2];
} else if (ua.match(/UCweb(\d+\.+\d+)/i)) {
    ua_b = ["uc", "UC浏览器 " + RegExp.$1];
} else if (ua.match(/dolphin[A-Za-z]+\/ (\d+\.+\d+)/i)) {
    ua_b = ["dolphin", "海豚浏览器 " + RegExp.$1];
} else if (ua.match(/maxthon\/(\d+\.+\d+)/i)) {
    ua_b = ["maxthon", "遨游 " + RegExp.$1];
} else if (ua.match(/thunder\/(\d+\.+\d+)/i)) {
    ua_b = ["xunlei", "迅雷 " + RegExp.$1];
} else if (/LBBROWSER|liebaofast|ACHEETAHI/i.test(ua)) {
    ua_b = ["liebao", "猎豹"];
} else if (/MetaSr/i.test(ua)) {
    ua_b = ["sgllq", "搜狗浏览器"];
} else if (/360SE|360browser/i.test(ua)) {
    ua_b = ["q360se", "360安全浏览器"];
} else if (/360EE/i.test(ua)) {
    ua_b = ["q360chr", "360极速浏览器"];
} else if (/360 mso/i.test(ua)) {
    ua_b = ["q360so", "360搜索"];
} else if (/silk/i.test(ua)) {
    ua_b = ["silk", "Silk"];
} else if (ua.match(/TheWorld\ \d+/i)) {
    ua_b = ["theworld", v[0].split("/").join(" ")];
} else if (ua.match(/(thunderbird|electron|qiyu|quark|HuohouBrowser|quickbrowser|nokiabrowser|miuibrowser|Otter)\/(\d+\.?\d+)/i)) { // 已知但没图标
    ua_b = ["browser", v[0].split("/").join(" ")];
} else if (/bingweb/i.test(ua)) {
    ua_b = ["bing", "Bing搜索"];
} else if (/bing/i.test(ua)) {
    ua_b = ["bing", "Bing爬虫"];
} else if (/baiduspider|Baidu Transcoder|(baidu[\w\-]+bot)/i.test(ua)) {
    ua_b = ["baidu", "百度爬虫"];
} else if (/Google Search|Googlebot|Google Web Preview|Google-Site/i.test(ua)) {
    ua_b = ["google", "谷歌爬虫"];
} else if (/HaosouSpider|360spider/i.test(ua)) {
    ua_b = ["q360so", "360爬虫"];
} else if (ua.match(/rv\:\d+/i)) {
    ua_b = ["ie", v[0].replace(/rv/i, "IE").split(":").join(" ")];
} else if (ua.match(/msie\ \d+/i)) {
    ua_b = ["ie", v[0].replace(/MSIE/i, "IE")];
} else if (ua.match(/edge\/\d+/i)) {
    ua_b = ["edge", v[0].split("/").join(" ")];
} else if (ua.match(/mms\/(\d+\.+\d+)/i)) { // opera Neon浏览器
    ua_b = ["operaneon", "Opera NEON " + RegExp.$1];
} else if (ua.match(/opr\/(\d+\.+\d+)[\S\ ]+developer/i)) { // opera 开发版
    ua_b = ["operanew", "Opera " + RegExp.$1, "operadev"];
} else if (ua.match(/opr\/(\d+\.+\d+)/i)) { // opera 浏览器
    ua_b = ["operanew", "Opera " + RegExp.$1];
} else if (ua.match(/opera\/\d+/i)) { // 旧版 opera 浏览器
    ua_b = ["opera", v[0].split("/").join(" ")];
} else if (ua.match(/Chromium\/\d+/i)) { // Chromium
    ua_b = ["chrome", v[0].split("/").join(" "), "chromium"];
} else if (ua.match(/chrome\/\d+/i)) { // chrome 是最后的
    ua_b = ["chrome", v[0].split("/").join(" ")];
} else if (/android/i.test(ua) && /webkit/i.test(ua)) { // webkit
    ua_b = ["webkit", "Webkit"];
} else if (ua.match(/safari\/\d+/i)) { // safari
    ua_b = ["safari", v[0].split("/").join(" ")];
} else if (ua.match(/webkit\/\d+/i)) { // webkit
    ua_b = ["webkit", v[0].split("/").join(" ")];
} else { // 回退
    ua_b = ["browser", "未知"];
}
// 系统
if (/nt 10/i.test(ua)) {
    ua_s = ["win", "Windows 10"];
} else if (/Windows Phone OS/i.test(ua)) {
    ua_s = ["winphone", "Windows Phone 7"];
} else if (/Windows Phone 8\.1/i.test(ua)) {
    ua_s = ["winphone", "Windows Phone 8.1"];
} else if (/Windows Phone 10/i.test(ua)) {
    ua_s = ["win", "Windows 10 Mobile"];
} else if (/Windows Phone/i.test(ua)) {
    ua_s = ["winphone", "Windows Phone 8"];
} else if (/nt 5\.0/i.test(ua)) {
    ua_s = ["winxp", "Windows 2000"];
} else if (/nt 5\.1/i.test(ua)) {
    ua_s = ["winxp", "Windows XP"];
} else if (/nt 6\.0/i.test(ua)) {
    ua_s = ["winxp", "Windows Vista"];
} else if (/nt 6\.1/i.test(ua)) {
    ua_s = ["winxp", "Windows 7"];
} else if (/nt 6\.2/i.test(ua)) {
    ua_s = ["win", "Windows 8"];
} else if (/nt 6\.3/i.test(ua)) {
    ua_s = ["win", "Windows 8.1"];
} else if (/windows/i.test(ua)) {
    ua_s = ["win", "Windows"];
} else if (/ubuntu/i.test(ua)) {
    ua_s = ["ubuntu", "Ubuntu"];
} else if (v1 = ua.match(/android\ [\d\.]+/i)) {
    ua_s = ["android", v1];
} else if (v1 = ua.match(/bb10|meego|symbian/i)) {
    ua_s = ["system", v1[0]];
} else if (v1 = ua.match(/tablet os/i)) {
    ua_s = ["tablet", v1[0]];
} else if (v1 = ua.match(/os\ [\d\.\_]+/i)) {
    ua_s = ["ios", v1[0].split("_").join(".")];
} else if (/mac os|macos/i.test(ua)) {
    ua_s = ["macos", "MacOS"];
} else if (/linux/i.test(ua)) {
    ua_s = ["linux", "Linux"];
} else if (/android/i.test(ua)) {
    ua_s = ["android", "Android"];
} else if (/spider|bot|slurp/i.test(ua)) { // 爬虫
    ua_s = ["search", "搜索引擎"];
} else { // 回退
    ua_s = ["system", "未知"];
}
// 硬件
if (/xbox one/i.test(ua)) {
    ua_h = ["xbox", "XBOX ONE"];
} else if (/xbox/i.test(ua)) {
    ua_h = ["xbox", "XBOX"];
} else if (/nokia/i.test(ua)) {
    ua_h = ["nokia", "诺基亚"];
} else if (/GT-|SM-|SCH-/i.test(ua)) {
    ua_h = ["samsung", "三星"];
} else if (/GT-|SM-|SCH-/i.test(ua)) {
    ua_h = ["samsung", "三星"];
} else if (/vivo/i.test(ua)) {
    ua_h = ["vivo", "vivo"];
} else if (/oppo/i.test(ua)) {
    ua_h = ["oppo", "OPPO"];
} else if (/ HM|RedMi/i.test(ua)) {
    ua_h = ["mi", "红米", "redmi"];
} else if (/mi |mi-/i.test(ua)) {
    ua_h = ["mi", "小米"];
} else if (/mx\d+/i.test(ua)) {
    ua_h = ["meizuicon", "魅族"];
} else if (/huawei/i.test(ua)) {
    ua_h = ["huawei", "华为"];
} else if (/honor/i.test(ua)) {
    ua_h = ["honor", "荣耀"];
} else if (/zte/i.test(ua)) {
    ua_h = ["zte", "中兴"];
} else if (/coolpad/i.test(ua)) {
    ua_h = ["coolpad", "酷派"];
} else if (/gionee|gn\d+/i.test(ua)) {
    ua_h = ["gionee", "金立"];
} else if (/doov/i.test(ua)) {
    ua_h = ["doov", "朵唯"];
} else if (/htc/i.test(ua)) {
    ua_h = ["htc", "HTC"];
} else if (/moto/i.test(ua)) {
    ua_h = ["moto", "MOTO"];
} else if (/lg/i.test(ua)) {
    ua_h = ["lg", "LG"];
} else if (/lenovo/i.test(ua)) {
    ua_h = ["lenovo", "联想"];
} else if (/bb10|rim/i.test(ua)) {
    ua_h = ["bb", "黑莓"];
} else if (v2 = ua.match(/lumia\ \d\w+/i)) {
    ua_h = ["lumia", v2[0]];
} else if (v2 = ua.match(/nexus\ \d+/i)) {
    ua_h = ["googleg", v2[0]];
} else if (/x64|win64|wow64/i.test(ua)) {
    ua_h = ["x64r", "64 位"];
} else if (/ipad/i.test(ua)) {
    ua_h = ["apple", "iPad"];
} else if (/iphone/i.test(ua)) {
    ua_h = ["apple", "iPhone"];
} else if (/mac/i.test(ua)) {
    ua_h = ["apple", "Apple"];
} else if (/arm/i.test(ua)) {
    ua_h = ["arm", "ARM"];
} else if (/tablet/i.test(ua)) {
    ua_h = ["tablet", "平板电脑"];
} else if (/mobile/i.test(ua)) {
    ua_h = ["mobile", "移动设备"];
} else if (/kf/i.test(ua) && /silk/i.test(ua)) {
    ua_s = ["kindle", "Kindle"];
    ua_h = ["amazon", "Amazon"];
} else if (/x64|win64|wow64|x86_64|i686/i.test(ua)) {
    ua_h = ["x64r", "64 位"];
} else if (/win32|x86|i586|i486|i386/i.test(ua)) {
    ua_h = ["x32r", "32 位"];
} else if (/spider|bot|slurp/i.test(ua)) { // 爬虫
    ua_h = ["browser", "爬虫"];
} else {
    ua_h = ["pc", "未知"];
}
/**
ua_b.length === 2 ? icon_b = "icon-" + ua_b[0] : icon_b = "icon-" + ua_b[2];
ua_s.length === 2 ? icon_s = "icon-" + ua_s[0] : icon_s = "icon-" + ua_s[2];
ua_h.length === 2 ? icon_h = "icon-" + ua_h[0] : icon_h = "icon-" + ua_h[2];
**/
if (ua_b.length === 2) {
    icon_b = "icon-" + ua_b[0];
} else {
    icon_b = "icon-" + ua_b[2];
}
if (ua_s.length === 2) {
    icon_s = "icon-" + ua_s[0];
} else {
    icon_s = "icon-" + ua_s[2];
}
if (ua_h.length === 2) {
    icon_h = "icon-" + ua_h[0];
} else {
    icon_h = "icon-" + ua_h[2];
}
// 写入文档
if (/triden|msie|windows phone/i.test(ua)) {
    document.getElementById("icon").innerHTML = "<div class=\"browser " + icon_b + "\"><img src=\"forie/" + ua_b[0] + ".svg\" alt=\"" + ua_b[0] + "\"><div>" + ua_b[1] + "</div></div><div class=\"system " + icon_s + "\"><img src=\"forie/" + ua_s[0] + ".svg\" alt=\"" + ua_s[0] + "\"><div>" + ua_s[1] + "</div></div><div class=\"hardware " + icon_h + "\"><img src=\"forie/" + ua_h[0] + ".svg\" alt=\"" + ua_h[0] + "\"><div>" + ua_h[1] + "</div></div>";
} else {
    document.getElementById("icon").innerHTML = "<div class=\"browser " + icon_b + "\"><svg><use xlink:href=\"symbol.svg#" + ua_b[0] + "\"></use></svg><div>" + ua_b[1] + "</div></div>" + "<div class=\"system " + icon_s + "\"><svg><use xlink:href=\"symbol.svg#" + ua_s[0] + "\"></use></svg><div>" + ua_s[1] + "</div></div>" + "<div class=\"hardware " + icon_h + "\"><svg><use xlink:href=\"symbol.svg#" + ua_h[0] + "\"></use></svg><div>" + ua_h[1] + "</div></div>";
}
for (i = 0; i < navi.length; i += 1) {
    res += "<li><div class=\"nav_name\">" + navi[i][0] + "</div><div class=\"nav_key\">" + navi[i][1] + "</div></li>";
}
document.getElementById("uanavi").innerHTML = res;
document.body.setAttribute("class", icon_b);
