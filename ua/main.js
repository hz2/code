/*jshint asi: true */ ! function(window) {
    'use strict'

    var ua = window.navigator.userAgent,
        browser, hardware, system,
        getData, iconNode, bgColor

    browser = function(ua) {
        var arr, isNew
        if (/hahhaha2017/i.test(ua)) {
            arr = ["", ""]
        } else if (ua.match(/micromessenger\/(\d+\.\d+)/i)) { // weixin
            arr = ["wechat", "微信 " + RegExp.$1]
        } else if (ua.match(/(tim)[\d\.]*\/(\d+\.\d+)/i)) { // tim
            arr = ["qqtim", "TIM " + RegExp.$2]
        } else if (ua.match(/qzone\/[\d\-A-z]+qz_(\d+\.\d+)/i)) { // qzone
            arr = ["qzone", "QQ空间 " + RegExp.$1]
        } else if (ua.match(/(qq\/\d+\.\d+)/i)) { // 腾讯qq
            arr = ["qqo", RegExp.$1.replace("/", " ")]
        } else if (ua.match(/AlipayClient\/(\d+\.\d+)/i)) { // 支付宝
            arr = ["alipay", "支付宝 " + RegExp.$1]
        } else if (ua.match(/dingtalk\/(\d+\.\d+)/i)) { // 钉钉
            arr = ["dingtalk", "钉钉 " + RegExp.$1]
        } else if (/weibo/i.test(ua)) { // weibo
            arr = ["weibo", "微博"]
        } else if (/twitter/i.test(ua)) { // twitter
            arr = "Twitter"
        } else if (ua.match(/coolmarket\/(\d+\.\d+)/i)) { // coolapk
            arr = ["coolapk", "酷安 " + RegExp.$1]
        } else if (ua.match(/tieba\/(\d+\.\d+)/i)) { // tieba
            arr = ["tieba", "贴吧 " + RegExp.$1]
        } else if (/BaiduYunGuanJia/i.test(ua)) { // BaiduYunGuanJia
            arr = ["bdpan", "百度网盘"]
        } else if (ua.match(/liebaofast\/(\d+\.\d+)/i)) { // liebao
            arr = ["liebao", "猎豹 " + RegExp.$1]
        } else if (ua.match(/sogoumobilebrowser\/(\d+\.\d+)/i)) { //  sogou 浏览器
            arr = ["sgllq", "搜狗 " + RegExp.$1]
        } else if (/sogousearch|sogou/i.test(ua)) { // sogou 搜索
            arr = ["sogou", "搜狗搜索"]
        } else if (ua.match(/(bdmobile|baiduboxapp)\/(\d+\.\d+)+/i)) { // 掌上百度
            arr = ["baidu", "掌上百度 " + RegExp.$2]
        } else if (ua.match(/bdbrowser\/(\d+\.\d+)/i)) { // 百度手机浏览器
            arr = ["bdmllq", "百度浏览器 " + RegExp.$1]
        } else if (ua.match(/mobile[\w\d\.\/\ ]+baidubrowser\/(\d+\.\d+)/i)) { // 百度手机浏览器
            arr = ["bdmllq", "百度浏览器 " + RegExp.$1]
        } else if (ua.match(/lebrowser\/(\d+\.\d+)/i)) { // 绿茶浏览器
            arr = ["lcllq", "绿茶浏览器 " + RegExp.$1]
        } else if (ua.match(/mxbrowser\/(\d+\.\d+)/i)) { // 傲游
            arr = ["maxthon", "傲游 " + RegExp.$1]
        } else if (ua.match(/baidubrowser\/(\d+\.\d+)/i)) { // 百度浏览器
            arr = ["bdllq", "百度浏览器 " + RegExp.$1]
        } else if (ua.match(/(waterfox\/\d+)/i)) { //水狐
            arr = RegExp.$1.replace("/", " ")
        } else if (ua.match(/(palemoon\/\d+)/i)) { //苍月
            arr = ["palemoon", RegExp.$1.replace("/", " ")]
        } else if (ua.match(/(Focus\/[\d\.]+)/i)) { // 火狐 focus
            arr = ["firefox", RegExp.$1.replace("/", " "), "focus"]
        } else if (ua.match(/(firefox\/\d+)/i)) { // 火狐系最后
            arr = RegExp.$1.replace("/", " ")
            isNew = true
        } else if (ua.match(/yabrowser\/(\d+\.\d+)/i)) {
            arr = "Yandex " + RegExp.$1
        } else if (ua.match(/(midori\/\d+\.\d+)/i)) {
            arr = RegExp.$1.replace("/", " ")
        } else if (ua.match(/(qupzilla\/\d+\.\d+)/i)) {
            arr = RegExp.$1.replace("/", " ")
        } else if (ua.match(/(Vivaldi\/\d+\.\d+)/i)) {
            arr = RegExp.$1.replace("/", " ")
        } else if (ua.match(/bidubrowser\/(\d+\.\d+)/i)) {
            arr = ["bdllq", "百度浏览器 " + RegExp.$1]
        } else if (ua.match(/qqbrowser\/(\d+\.\d+)/i)) {
            arr = ["qqllq", "QQ浏览器 " + RegExp.$1]
        } else if (ua.match(/(UCBrowser|UBrowser)\/(\d+\.\d+)/i)) {
            arr = ["uc", "UC浏览器 " + RegExp.$2]
        } else if (ua.match(/UCweb(\d+\.\d+)/i)) {
            arr = ["uc", "UC浏览器 " + RegExp.$1]
        } else if (ua.match(/dolphin[A-Za-z]+\/ (\d+\.\d+)/i)) {
            arr = ["dolphin", "海豚浏览器 " + RegExp.$1]
        } else if (ua.match(/maxthon\/(\d+\.\d+)/i)) {
            arr = ["maxthon", "遨游 " + RegExp.$1]
        } else if (ua.match(/thunder\/(\d+\.\d+)/i)) {
            arr = ["xunlei", "迅雷 " + RegExp.$1]
        } else if (/LBBROWSER|liebaofast|ACHEETAHI/i.test(ua)) {
            arr = ["liebao", "猎豹"]
        } else if (/MetaSr/i.test(ua)) {
            arr = ["sgllq", "搜狗浏览器"]
        } else if (/360SE|360browser/i.test(ua)) {
            arr = ["q360se", "360安全浏览器"]
        } else if (/360EE/i.test(ua)) {
            arr = ["q360chr", "360极速浏览器"]
        } else if (/360 mso/i.test(ua)) {
            arr = ["q360so", "360搜索"]
        } else if (/miuibrowser/i.test(ua)) { // 小米浏览器
            arr = ["miuib", "小米浏览器"]
        } else if (/SamsungBrowser/i.test(ua)) { // 三星浏览器
            arr = ["samsungb", "三星浏览器"]
            isNew = true
        } else if (/silk/i.test(ua)) {
            arr = ["silk", "Silk"]
        } else if (ua.match(/(TheWorld\ \d+)/i)) {
            arr = ["theworld", RegExp.$1.replace("/", " ")]
        } else if (ua.match(/((thunderbird|electron|qiyu|quark|HuohouBrowser|quickbrowser|nokiabrowser|Otter)\/\d+\.?\d+)/i)) { // 已知但没图标
            arr = ["browser", RegExp.$1.replace("/", " ")]
        } else if (/bingweb/i.test(ua)) {
            arr = ["bing", "Bing搜索"]
        } else if (/bing/i.test(ua)) {
            arr = ["bing", "Bing爬虫"]
        } else if (/baiduspider|Baidu Transcoder|(baidu[\w\-]+bot)/i.test(ua)) {
            arr = ["baidu", "百度爬虫"]
        } else if (/Google Search|Googlebot|Google Web Preview|Google-Site/i.test(ua)) {
            arr = ["google", "谷歌爬虫"]
        } else if (/HaosouSpider|360spider/i.test(ua)) {
            arr = ["q360so", "360爬虫"]
        } else if (ua.match(/(rv\:\d+)/i)) {
            arr = ["ie", RegExp.$1.replace(/rv/i, "IE").split(":").join(" ")]
        } else if (ua.match(/(msie\ \d+)/i)) {
            arr = ["ie", RegExp.$1.replace(/MSIE/i, "IE")]
        } else if (ua.match(/(edge\/\d+)/i)) {
            arr = ["edge", RegExp.$1.replace("/", " ")]
        } else if (ua.match(/mms\/(\d+\.\d+)/i)) { // opera Neon浏览器
            arr = ["operaneon", "Opera NEON " + RegExp.$1]
        } else if (ua.match(/opr\/(\d+\.\d+)[\S\ ]+developer/i)) { // opera 开发版
            arr = ["operanew", "Opera " + RegExp.$1, "operadev"]
        } else if (ua.match(/opr\/(\d+\.\d+)/i)) { // opera 浏览器
            arr = ["operanew", "Opera " + RegExp.$1]
        } else if (ua.match(/(opera\/\d+)/i)) { // 旧版 opera 浏览器
            arr = ["opera", RegExp.$1.replace("/", " ")]
        } else if (ua.match(/(Chromium\/\d+)/i)) { // Chromium
            arr = ["chrome", RegExp.$1.replace("/", " "), "chromium"]
        } else if (ua.match(/(chrome\/\d+)/i)) { // chrome 是最后的
            arr = RegExp.$1.replace("/", " ")
        } else if (/android/i.test(ua) && /webkit/i.test(ua)) { // webkit
            arr = "Webkit"
        } else if (ua.match(/(safari\/\d+)/i)) { // safari
            arr = RegExp.$1.replace("/", " ")
        } else if (ua.match(/(webkit\/\d+)/i)) { // webkit
            arr = RegExp.$1.replace("/", " ")
        } else { // 回退
            arr = ["browser", "未知"]
        }
        return { arr: arr, isNew: isNew }
    }

    system = function(ua) {
        var arr, isNew

        if (/nt 10/i.test(ua)) {
            arr = ["win", "Windows 10"]
        } else if (/Windows Phone OS/i.test(ua)) {
            arr = ["winphone", "Windows Phone 7"]
        } else if (/Windows Phone 8\.1/i.test(ua)) {
            arr = ["winphone", "Windows Phone 8.1"]
        } else if (/Windows Phone 10/i.test(ua)) {
            arr = ["win", "Windows 10 Mobile"]
        } else if (/Windows Phone/i.test(ua)) {
            arr = ["winphone", "Windows Phone 8"]
        } else if (/nt 5\.0/i.test(ua)) {
            arr = ["winxp", "Windows 2000"]
        } else if (/nt 5\.1/i.test(ua)) {
            arr = ["winxp", "Windows XP"]
        } else if (/nt 6\.0/i.test(ua)) {
            arr = ["winxp", "Windows Vista"]
        } else if (/nt 6\.1/i.test(ua)) {
            arr = ["winxp", "Windows 7"]
        } else if (/nt 6\.2/i.test(ua)) {
            arr = ["win", "Windows 8"]
        } else if (/nt 6\.3/i.test(ua)) {
            arr = ["win", "Windows 8.1"]
        } else if (/windows/i.test(ua)) {
            arr = ["win", "Windows"]
        } else if (/ubuntu/i.test(ua)) {
            arr = "Ubuntu"
        } else if (ua.match(/(android\ [\d\.]+)/i)) {
            arr = RegExp.$1
        } else if (ua.match(/(bb10|meego|symbian)/i)) {
            arr = ["system", RegExp.$1]
        } else if (/tablet os/i.test(ua)) {
            arr = ["tablet", "tablet"]
        } else if (ua.match(/(os\ [\d\.\_]+)/i)) {
            arr = ["ios", RegExp.$1.replace("_", ".")]
        } else if (/mac os|macos/i.test(ua)) {
            arr = "MacOS"
        } else if (/linux/i.test(ua)) {
            arr = "Linux"
        } else if (/android/i.test(ua)) {
            arr = "Android"
        } else if (/spider|bot|slurp/i.test(ua)) { // 爬虫
            arr = ["search", "搜索引擎"]
        } else { // 回退
            arr = ["system", "未知"]
        }
        return { arr: arr, isNew: isNew }
    }

    hardware = function(ua) {
        var arr, isNew
        if (/xbox one/i.test(ua)) {
            arr = ["xbox", "XBOX ONE"]
        } else if (/xbox/i.test(ua)) {
            arr = "XBOX"
        } else if (/nokia/i.test(ua)) {
            arr = ["nokia", "诺基亚"]
        } else if (/GT-|SM-|SCH-/i.test(ua)) {
            arr = ["samsung", "三星"]
        } else if (/vivo/i.test(ua)) {
            arr = "vivo"
        } else if (/oppo/i.test(ua)) {
            arr = "OPPO"
        } else if (/ HM|RedMi/i.test(ua)) {
            arr = ["mi", "红米", "Redmi", "redmi"]
        } else if (/mi |mi-|xiaomi/i.test(ua)) {
            arr = ["mi", "小米", "Xiaomi"]
        } else if (/mx\d+|PRO \d+/i.test(ua)) {
            arr = ["meizuicon", "魅族"]
        } else if (/huawei/i.test(ua)) {
            arr = ["huawei", "华为"]
        } else if (/honor/i.test(ua)) {
            arr = ["honor", "荣耀"]
        } else if (/zte/i.test(ua)) {
            arr = ["zte", "中兴"]
        } else if (/coolpad/i.test(ua)) {
            arr = ["coolpad", "酷派"]
        } else if (/gionee|gn\d+/i.test(ua)) {
            arr = ["gionee", "金立"]
        } else if (/doov/i.test(ua)) {
            arr = ["doov", "朵唯"]
        } else if (/htc/i.test(ua)) {
            arr = ["htc", "HTC"]
        } else if (/moto/i.test(ua)) {
            arr = "MOTO"
        } else if (/lg/i.test(ua)) {
            arr = "LG"
        } else if (/lenovo/i.test(ua)) {
            arr = ["lenovo", "联想", "Lenovo"]
        } else if (/bb10|rim/i.test(ua)) {
            arr = ["bb", "黑莓", "Lenovo"]
        } else if (ua.match(/(lumia\ \w+)/i)) {
            arr = ["lumia", RegExp.$1]
        } else if (ua.match(/(nexus\ \w+)/i)) {
            arr = ["googleg", RegExp.$1]
        } else if (/ipad/i.test(ua)) {
            arr = ["apple", "iPad"]
        } else if (/iphone/i.test(ua)) {
            arr = ["apple", "iPhone"]
        } else if (/mac/i.test(ua)) {
            arr = "Apple"
        } else if (/arm/i.test(ua)) {
            arr = "ARM"
        } else if (/tablet/i.test(ua)) {
            arr = ["tablet", "平板电脑", "Tablet"]
        } else if (/mobile/i.test(ua)) {
            arr = ["mobile", "移动设备", "Mobile"]
        } else if (/kf/i.test(ua) && /silk/i.test(ua)) {
            arr = ["kindle", "Kindle"]
            arr = ["amazon", "Amazon"]
        } else if (/x64|win64|wow64|x86_64|aarch64|i686/i.test(ua)) {
            arr = ["x64r", "64 位", "64 bit"]
        } else if (/win32|x86|i586|i486|i386/i.test(ua)) {
            arr = ["x32r", "32 位", "32 bit"]
        } else if (/spider|bot|slurp/i.test(ua)) { // 爬虫
            arr = ["browser", "爬虫", "Spider"]
        } else {
            arr = ["pc", "未知", "Unknown"]
        }
        return { arr: arr, isNew: isNew }
    }


    function build(data) {

        var arr = data.arr
            // [图标，中文，英文，颜色]
            // [英文，中文，图标，颜色]
            // 中文 = arr[1] || 
        if (typeof arr === "string") {
            var newName = arr.toLowerCase().replace(/[\d\.\ ]+/, "")
            this.icon = newName
            this.color = newName
            this.name = arr
            this.en = arr

        } else {
            this.icon = arr[0]
            this.color = arr[3] || arr[0]
            this.name = arr[1]
            this.en = arr[2] || arr[1]
        }
        this.isNew = data.isNew

    }

    function iconSet(obj, type, ie, en) {

        console.log("obj", obj)
        var div = document.createElement("div")
        div.className = type + " icon-" + obj.color

        type === "browser" ? bgColor = "icon-" + obj.color : void 0

        if (obj.isNew || ie) {
            var img = document.createElement("img")
            img.src = "single/" + obj.icon + ".svg"
            img.alt = obj.icon
            div.appendChild(img)

        } else {

            div.innerHTML = "<svg><use xlink:href=\"symbol.svg#" + obj.icon + "\"></use></svg>"

        }

        var title = document.createElement("div")
        if (en) {

            title.textContent = obj.en

        } else {

            title.textContent = obj.name
        }

        div.appendChild(title)

        return div
    }

    function loadByBrowser(ie) {
        iconNode = document.createDocumentFragment()
        if (ie) {
            return function loadBylang(en) {
                if (en) {

                    iconNode.appendChild(iconSet(new build(browser(ua)), "browser", true, true))
                    iconNode.appendChild(iconSet(new build(system(ua)), "system", true, true))
                    iconNode.appendChild(iconSet(new build(hardware(ua)), "hardware", true, true))

                } else {
                    iconNode.appendChild(iconSet(new build(browser(ua)), "browser", true, false))
                    iconNode.appendChild(iconSet(new build(system(ua)), "system", true, false))
                    iconNode.appendChild(iconSet(new build(hardware(ua)), "hardware", true, false))

                }
            }
        } else {

            return function loadBylang(en) {
                if (en) {
                    iconNode.appendChild(iconSet(new build(browser(ua)), "browser", false, true))
                    iconNode.appendChild(iconSet(new build(system(ua)), "system", false, true))
                    iconNode.appendChild(iconSet(new build(hardware(ua)), "hardware", false, true))

                } else {
                    iconNode.appendChild(iconSet(new build(browser(ua)), "browser", false, false))
                    iconNode.appendChild(iconSet(new build(system(ua)), "system", false, false))
                    iconNode.appendChild(iconSet(new build(hardware(ua)), "hardware", false, false))

                }
            }

        }
    }



    getData = function(lang) {
        var navCom, navPri, uaList, ua = window.navigator.userAgent,
            load
        navCom = [
            ['appCodeName', '代码名'],
            ['appName', '应用名'],
            ['language', '语言'],
            ['cookieEnabled', 'Cookie'],
            ['maxTouchPoints', '多点触控'],
            ['onLine', '联网状态'],
            ['platform', '平台'],
            ['product', '产品']
        ]
        if (/MSIE|Trident|windows\ phone/i.test(ua)) { // ie
            navPri = [
                ['browserLanguage', '浏览器语言'],
                ['cpuClass', 'CPU 类'],
                ['msPointerEnabled', '启用光标'],
                ['msManipulationViewsEnabled', '控制视图'],
                ['systemLanguage', '系统语言'],
                ['userLanguage', '用户语言'],
                ['webdriver', '网络驱动']
            ]
            load = loadByBrowser(ie)
        } else { // not ie
            load = loadByBrowser()
            navPri = [
                ['doNotTrack', '禁止追踪'],
                ['hardwareConcurrency', '硬件并发'],
                ['productSub', '次级产品']
            ]
            if (/Firefox|IceWeasel|IceCat|SeaMonkey|CamIno|like\ Firefox/i.test(ua)) { // firefox
                navPri = navPri.concat([
                    ['appVersion', '应用版本'],
                    ['buildID', '构建 ID'],
                    ['mozE10sEnabled', '多进程 E10s']
                ])
            } else {
                navPri = navPri.concat([
                    ['vendor', '供应商']
                ])
            }
        }

        if (lang === "eng") {
            load("en")
            uaList = navCom.concat(navPri).sort().map(function(arr) {
                var newName = arr[0].replace(/([A-Z]+)/g, " $1").replace(/^[a-z]/, function(RegExp) { return RegExp.toUpperCase() })
                return {
                    name: newName,
                    value: window.navigator[arr[0]]
                }
            })
            uaList.unshift({ name: 'User Agent', value: ua })
            uaList.push({ name: 'Screen Size', value: window.screen.width + 'x' + window.screen.height })
        } else {
            load()
            uaList = navCom.concat(navPri).sort().map(function(arr) {
                return {
                    name: arr[1],
                    value: window.navigator[arr[0]]
                }
            })
            uaList.unshift({ name: '用户代理', value: ua })
            uaList.push({ name: '屏幕尺寸', value: window.screen.width + 'x' + window.screen.height })
        }

        //console.log(uaList)

        return {
            list: uaList
        }
    }
    window.lang = function(lang) {
        var i, list, text = ''
        if (window.navigator.language.indexOf('zh') === -1 || lang === "en") {
            list = getData("eng").list
        } else {
            list = getData().list
        }


        var frag = document.createDocumentFragment();
        list.forEach(function(e) {
            var li = document.createElement("li");
            var name = document.createElement("div");
            name.textContent = e.name
            name.className = "nav_name"
            var val = document.createElement("div");
            val.textContent = e.value
            val.className = "nav_value"
            li.appendChild(name)
            li.appendChild(val)
            frag.appendChild(li);
        });

        document.getElementById('ua-nav').appendChild(frag);
        document.getElementById('ua-nav').children[0].setAttribute('class', 'user-agent')
        document.getElementById("icon").appendChild(iconNode);
        document.body.setAttribute('class', bgColor)

    }

    if (window.location.hash === "#en") {
        window.lang("en")
    } else {
        window.lang()

    }

    return window.lang
}(window)
