/*jshint esversion: 6 */
/*jshint asi: true */


;
(function() {
    'use strict'
    /*global $ */
    // Math

    let zero = 0,
        countArr = [],
        tmpInput
    $(document).ready(function() {})


    /* 还要为 -数优化
    //除法  替换 /n 为 (/n)
    s.replace(/(\/\d{1,}(\.\d{1,})?)/g,"*("+"$1"+")") 
    //除法  计算 (/n) 为 数字
    s.replace(/\(\/\d{1,}(\.\d{1,})?\)/g,x=> {return 1 / x.replace(/[\(\)\/]/g,"")})
    //乘法  替换 m*n*o 为 [m,n,o]的乘积
    s.replace(/(\d{1,}(\.\d{1,})?(\*\d{1,}(\.\d{1,})?){1,})/g,x=>x.split("*").reduce( (r, value) => { return r * value },1) )
    //减法  替换 -n 为 +(-n)
    s.replace(/(\-\d{1,}(\.\d{1,})?)/g,"+("+"$1"+")") 
    //加法  通过 )+( 分割 并求和
    s.replace(/[\(\)]/g,"").split(/\)?\+\(?/g).reduce( (r, value) => { return r * 1 + value * 1 },0)
     */

    function calc(x) {
        function basic(v) { // 基础运算
            return v.replace(/(\/\-?\d{1,}(\.\d{1,})?)/g, '*(' + '$1' + ')').replace(/\(\/\-?\d{1,}(\.\d{1,})?\)/g, x => {
                return 1 / x.replace(/[\(\)\/]/g, '')
            }).replace(/(\-?\d{1,}(\.\d{1,})?(\*\-?\d{1,}(\.\d{1,})?){1,})/g, x => x.split('*').reduce((r, value) => {
                return r * value
            }, 1)).replace(/(\-\-?\d{1,}(\.\d{1,})?)/g, '+(' + '$1' + ')').replace(/[\(\)]/g, '').split(/\)?\+\(?/g).reduce((r, value) => {
                return r * 1 + value * 1
            }, 0)
        }
        if (/^[\+\-\*\/\.\d]+$/.test(x)) { // 没有括号则进行基础运算
            x = /^-/.test(x) ? '0' + x : x; // -n 开头换为 0-n 
            let t = basic(x)
            countArr.push(x, t)
            console.table(countArr)
            countArr = []
            return t
        } else if (/^[\(\)\+\-\*\/\.\d]+$/.test(x)) { // 有括号先处理括号
            countArr.push(x)
            let t = x
            t = calc(t.replace(/\(([\+\-\*\/\.\d]+)+\)/g, x => {
                return basic(x)
            }))
            return t
        } else {
            console.log('出现错误')
        }
    }


    // 计算器 点击事件
    $('#calc').on('input', function() {
        let val = $('#calc').val().replace("（", "(").replace("）", ")").split(' ').join('')
        $('#calc').attr('maxlength', '')
        if (!val) {
            $('#calc_tip_sub').attr('class', '').text('')
            $('#calc_result').attr('class', '').text('归零')
        } else if (!/^[0-9\+\-\*\/\.\(\)]+$/g.test(val)) {
            $('#calc_tip_sub').text('输入不正确').attr('class', 'error')
            $('#calc_result').text('错误').attr('class', 'error')
            $('#calc').attr('maxlength', val.length)
        } else if (val == tmpInput) {
            $('#calc_tip_sub').text('请继续输入').attr('class', 'warn')
        } else if (Number(val)) {
            $('#calc_tip_sub').text('请继续输入').attr('class', 'warn')
        } else if (/[\-\+\*\/]{2,}/g.test(val) || /\([\-\+\*\/]/g.test(val)) {
            $('#calc_tip_sub').text('同时输入了多个运算符').attr('class', 'warn')
            $('#calc_result').text('错误').attr('class', 'error')
            $('#calc').attr('maxlength', val.length)
        } else if (val.indexOf("()") !== -1) {
            $('#calc_tip_sub').text('请继续输入数字').attr('class', 'warn')
        } else if (/[\+\-\*\/]\)/g.test(val)) {
            $('#calc_tip_sub').text('请继续输入数字').attr('class', 'warn')
        } else if (/\((\-?\d+?(\.(\d+)?)?)?\)/g.test(val)) {
            $('#calc_tip_sub').text('请继续输入数字').attr('class', 'warn')
        } else if (/\/0+$/g.test(val)) {
            $('#calc_tip_sub').text('分母不能为零').attr('class', 'error')
            $('#calc_result').text('无穷').attr('class', 'error')
            $('#calc').attr('maxlength', val.length)
        } else if (/[\+\-\*]0\/$/g.test(val)) {
            $('#calc_tip_sub').text('分子为零').attr('class', 'warn')
        } else if (/\)\d$/g.test(val) || /\d\($/g.test(val)) {
            $('#calc_tip_sub').text('缺少运算符').attr('class', 'error')
            $('#calc_result').text('错误').attr('class', 'error')
            $('#calc').attr('maxlength', val.length)
        } else if (/^[\+\*\/]+/g.test(val)) {
            $('#calc_tip_sub').text('开头不要运算符号').attr('class', 'warn')
            $('#calc_result').text('错误').attr('class', 'error')
            $('#calc').attr('maxlength', val.length)
        } else if (!/[\d\)]$/g.test(val)) {
            $('#calc_tip_sub').text('请继续输入数字').attr('class', 'warn')
        } else if (/\(/g.test(val) && !/\)/g.test(val)) {
            $('#calc_tip_sub').text('请输入收括号').attr('class', 'warn')
        } else if (/\(/g.test(val) && /\)/g.test(val) && val.match(/\)/g).length < val.match(/\(/g).length) {
            $('#calc_tip_sub').text('请输入收括号').attr('class', 'warn')
        } else if (/\(/g.test(val) && /\)/g.test(val) && val.match(/\)/g).length > val.match(/\(/g).length) {
            $('#calc_tip_sub').text('输入了多余的收括号').attr('class', 'error')
            $('#calc').attr('maxlength', val.length)
        } else { // 计算
            tmpInput = val;
            let r = calc(val)
            $('#calc_tip_sub').text('计算结果').attr('class', '')
            $('#calc_result').attr('class', '').text(r)
            $('#calc_his').prepend('<li class="input_his"><span class="myInput_his">' + val + '</span><span class="eq_his">=</span><span class="result_his">' + r + '</span><span class="index_his"># ' + (zero += 1) + '</span></li>')
        }
        if ($('#calc_his li').length > 10) { // li 超出移除
            $('#calc_his li:gt(9)').remove()
        }
        if ($('#calc_toggle').text() === '展开') { // 大于5不显示
            $('#calc_his li:gt(4)').css('display', 'none')
        } else {
            $('#calc_his li:gt(4)').css('display', 'block')
        }
        $('#calc_his li:has(span)').hover( // hover事件，添加回退按钮
            function() {
                if ($('.index_his_tip').length === 0) {
                    $(this).append('<span class="index_his_tip">回退</span>')
                }
            },
            function() {
                $(this).children('.index_his_tip').remove()
            }
        )
        $('#calc_his li:has(span)').on('click', function() { // li点击事件
            $('#calc').val($(this).children('.myInput_his').text())
            $('#calc_result').text($(this).children('.result_his').text())
            $('#calc_tip_sub').text('')
            $('#calc_result,#calc_tip_sub').attr('class', ' ')
        })
    })

    $('#calc_clear').on('click', function() { // 清空
        $('#calc_his li').empty().removeAttr('class')
        $('#calc_his li').unbind('click')
        $('#calc_his li:has(span)').unbind('hover')
        return (zero = 0)
    })
    $('#calc_reset').on('click', function() { // 归零
        $('#calc_his li').empty().removeAttr('class')
        $('#calc_his li').unbind('click')
        $('#calc_his li:has(span)').unbind('hover')
        $('#calc_tip_sub').text('')
        $('#calc_result').text('归零')
        $('#calc_result,#calc_tip_sub').attr('class', ' ')
        $('#calc').val('')
        return (zero = 0)
    })
    $('#calc_toggle').click(function() { // 展开和收起事件
        if ($('#calc_toggle').text() === '收起') {
            $('#calc_toggle').text('展开')
            $('#calc_his li:gt(4)').slideUp(300, 'linear')
        } else if ($('#calc_toggle').text() === '展开') {
            $('#calc_toggle').text('收起')
            $('#calc_his li:gt(4)').slideDown(300, 'linear')
        }
    })

    // 二进制
    $('input#type_bin').on('input', function() {
            var data_bin = $('#type_bin').val().split(' ').join('')
            if (data_bin.match(/[\D2-9]+/g) !== null) {
                $('#hex_tip').html('请输入 <kbd>0</kbd> 到 <kbd>1</kbd> 范围内的字符').attr('class', 'error')
            } else if (data_bin === '') {
                $('input').val('')
                $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
            } else {
                $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
                $('#type_dec').val(parseInt(data_bin, 2))
                $('#type_oct').val(parseInt(data_bin, 2).toString(8))
                $('#type_hex').val(parseInt(data_bin, 2).toString(16))
            }
        })
        // 八进制
    $('input#type_oct').on('input', function() {
            var data_oct = $('#type_oct').val().split(' ').join('')
            if (data_oct.match(/[\D89]+/g) !== null) {
                $('#hex_tip').html('请输入 <kbd>0</kbd> 到 <kbd>7</kbd> 范围内的字符').attr('class', 'error')
            } else if (data_oct === '') {
                $('input').val('')
                $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
            } else {
                $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
                $('#type_dec').val(parseInt(data_oct, 8))
                $('#type_bin').val(parseInt(data_oct, 8).toString(2))
                $('#type_hex').val(parseInt(data_oct, 8).toString(16))
            }
        })
        // 十进制
    $('input#type_dec').on('input', function() {
            var data_dec = $('#type_dec').val().split(' ').join('')
            if (data_dec.match(/\D+/g) !== null) {
                $('#hex_tip').html('请输入 <kbd>0</kbd> 到 <kbd>9</kbd> 范围内的字符').attr('class', 'error')
            } else if (data_dec === '') {
                $('input').val('')
                $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
            } else {
                $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
                $('#type_bin').val(parseInt(data_dec, 10).toString(2))
                $('#type_oct').val(parseInt(data_dec, 10).toString(8))
                $('#type_hex').val(parseInt(data_dec, 10).toString(16))
            }
        })
        // 十六进制
    $('input#type_hex').on('input', function() {
        var data_hex = $('#type_hex').val().split(' ').join('')
        if (data_hex.match(/[g-zG-Z\W]+/g) !== null) {
            $('#hex_tip').html('请输入数字字符及 <kbd>A</kbd> 到 <kbd>F</kbd> 范围内的字母').attr('class', 'error')
        } else if (data_hex === '') {
            $('input').val('')
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
        } else {
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ')
            $('#type_dec').val(parseInt(data_hex, 16))
            $('#type_oct').val(parseInt(data_hex, 16).toString(8))
            $('#type_bin').val(parseInt(data_hex, 16).toString(2))
        }
    })

    // Unicode字符互转
    // 添加正則 检测输入合法性
    $('#type_charCode').on('input', function() {
        let getChar = $('#type_charCode').val()
        $('#type_unicode').val(getChar.split('').map(val => '\\u' + ('00' + val.charCodeAt().toString(16)).slice(-4)).join(''))
        $('#type_htmlCode').val(getChar.split('').map(val => '\&#' + val.charCodeAt() + '\;').join(''))
    })
    $('#type_unicode').on('input', function() {
        let getUni = $('#type_unicode').val()
        $('#type_charCode').val(getUni.split('\\u').map(x => String.fromCharCode(parseInt(x, 16))).splice(1).join(''))
        $('#type_htmlCode').val(getUni.split('\\u').map(x => '&#' + parseInt(x, 16) + ';').splice(1).join(''))
    })
    $('#type_htmlCode').on('input', function() { // 处理输入十六进制的
        let getHtml = $('#type_htmlCode').val()
        $('#type_unicode').val(getHtml.split(/\W+/g).filter(x => x !== '').map(x => '\\u' + ('00' + (x * 1).toString(16)).slice(-4)).join(''))
        $('#type_charCode').val(getHtml.split(/\W+/g).filter(x => x !== '').map(x => String.fromCharCode(x)).join(''))
    })

    // b64 编码 add char filter
    $('#type_b64Encode').on('input', function() {
        let b64_Encode = $('#type_b64Encode').val()
        $('#type_b64Decode').val(window.btoa(unescape(encodeURIComponent(b64_Encode))))
    })
    $('#type_b64Decode').on('input', function() {
        let b64_Decode = $('#type_b64Decode').val()
        $('#type_b64Encode').val(decodeURIComponent(escape(window.atob(b64_Decode))))
    })

    // ip to address
    $('#ip2num').click(function() {
        let input_ip = $('#ipAddr').val()
        let numAddr = input_ip.split('.').map(x => {
            x = parseInt(x, 10).toString(16)
            x = x.length === 1 ? '0' + x : x
            return x
        }).join('')
        $('#numAddr').attr('href', 'http://' + parseInt(numAddr, 16))
        $('#numAddr').text('http://' + parseInt(numAddr, 16))
    })

    // uri编码
    $('#type_uriEncode').on('input', function() {
        let uri_Encode = $('#type_uriEncode').val()
        if ($('#uri_mode')[0].checked) {
            $('#type_uriDecode').val(encodeURIComponent(uri_Encode))
        } else {
            $('#type_uriDecode').val(encodeURI(uri_Encode))
        }
    })
    $('#type_uriDecode').on('input', function() {
        let uri_Decode = $('#type_uriDecode').val()
        if ($('#uri_mode')[0].checked) {
            $('#type_uriEncode').val(decodeURIComponent(uri_Decode))
        } else {
            $('#type_uriEncode').val(decodeURI(uri_Decode))
        }
    })
    $('#uri_mode').change(function() {
        if ($('#type_uriEncode').val() && $('#type_uriDecode').val()) {
            let uri_Encode = $('#type_uriEncode').val()
            if ($('#uri_mode')[0].checked) {
                $('#type_uriDecode').val(encodeURIComponent(uri_Encode))
            } else if (!$('#uri_mode')[0].checked) {
                $('#type_uriDecode').val(encodeURI(uri_Encode))
            }
        }
    })
}())