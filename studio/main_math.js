/*jshint esversion: 6 */
/*jshint asi: true */
(function() {
    'use strict';
    /*global $ */
    // Math
    $(document).ready(function() {
        function inCalc(mathString) {
            var a = mathString,
                b = a.split('+'),
                // console.log(" \n用 加法 分割 \n b:" + b)
                n = 0,
                o = 0,
                p = 0,
                c = [],
                d = [],
                e = [],
                i,
                j,
                k,
                l,
                result_cheng,
                result_chu,
                array_chu = [],
                array_cheng = [],
                array_jian = [],
                array_jia = e,
                result_jia = 0,
                result_jian = 0,
                result_jian1,
                errorResult;

            for (n in b) {
                if (b.hasOwnProperty(n)) {
                    c[n] = b[n].split('-');
                    // console.log(" \n用 减法 分割 \n c[" + n + "]:" + c[n])

                    for (o in c[n]) {
                        if (c[n].hasOwnProperty(o)) {
                            d[n][o] = c[n][o].split('*');
                            // console.log(" \n用 乘法 分割 \n d[" + n + "][" + o + "]:" + d[n][o])
                            for (p in d[n][o]) {
                                if (d[n][o].hasOwnProperty(p)) {
                                    e[n][o][p] = d[n][o][p].split('/');
                                    // console.log(" \n用 除法 分割 \n e[" + n + "][" + o + "][" + p + "]:" + e[n][o][p])

                                }
                            }
                        }
                    }
                }
            }

            for (l in array_jia) {
                if (array_jia.hasOwnProperty(l)) {
                    if (array_jia[l].length === 1 && array_jia[l][0].length === 1 && array_jia[l][0][0].length === 1) {
                        // console.log("只有一位跳过之后的所以运算,返回 " + array_jia[l][0][0][0])
                        array_jia[l] = array_jia[l][0][0][0];
                    } else {
                        array_jian = array_jia[l];
                        // array_jian = [[[4],[5]],[[4,2]],[[5]]]
                        for (k in array_jian) {
                            if (array_jian.hasOwnProperty(k)) {
                                if (array_jian[k].length === 1 && array_jian[k][0].length === 1) {
                                    // console.log("只有一位跳过之后的运算,返回 " + array_jian[k][0][0])
                                    array_jian[k] = array_jian[k][0][0];
                                } else {
                                    array_cheng = array_jian[k];
                                    // array_cheng = [ [81, 9, 1], [3], [2, 4] ]
                                    result_cheng = 1;
                                    for (j in array_cheng) {
                                        if (array_cheng.hasOwnProperty(j)) {
                                            if (array_cheng[j][0] === '0' && array_cheng[j].length === 1) {
                                                // console.log("乘法结果是 0 ")
                                                array_cheng[j] = 0;
                                            } else if (array_cheng[j][0] !== 0 && array_cheng[j].length === 1) {
                                                // console.log("只有一位跳过除法,返回 " + array_cheng[j][0])
                                                array_cheng[j] = array_cheng[j][0];
                                            } else {
                                                array_chu = array_cheng[j];
                                                //   array_chu = [56, 7, 2]
                                                result_chu = array_chu[0] * array_chu[0];
                                                for (i in array_chu) {
                                                    if (array_chu.hasOwnProperty(i)) {
                                                        if (i > 0 && array_chu[i] === '0') {
                                                            // console.log("提示分母不能为零!!!!")
                                                            $('#calc_tip2').text(' 分母不能为零');
                                                            $('#calc_tip2').attr('class', 'error');
                                                            $('#calc_result').attr('class', 'error');
                                                            errorResult = '无穷';
                                                            return errorResult;
                                                        } else if (array_chu[0] === '0') {
                                                            //       console.log("返回0")
                                                            $('#calc_tip2').text(' 分子为零');
                                                            $('#calc_tip2').attr('class', 'warn');
                                                            result_chu = 0;
                                                        } else {
                                                            result_chu /= array_chu[i];
                                                            // console.log("除法第" + i + "次，数值" + array_chu[i] )
                                                        }
                                                    }
                                                }

                                                // 除法
                                                array_cheng[j] = parseFloat(result_chu);
                                                // console.log("最终除法结果是" + array_cheng[j])
                                            }
                                            // 乘法
                                            result_cheng *= array_cheng[j];
                                        }
                                    }
                                    array_jian[k] = parseFloat(result_cheng);
                                    // console.log("乘法结果是" + array_jian[k])

                                }

                                // 减法 
                                result_jian -= array_jian[k];
                                // console.log("减法第" + k + "次数，结果" + array_jian[k])

                            }
                        }
                        result_jian1 = 2 * array_jian[0] + parseFloat(result_jian);
                        // console.log("减法结果后" + result_jian1)
                        array_jia[l] = parseFloat(result_jian1);
                    }
                    result_jia += parseFloat(array_jia[l]);
                    // console.log("加法第" + l + "次数，结果" + array_jia[l])
                }
            }
            // console.log("加法结果最终" + result_jia)
            return result_jia;
        }

        // 计算器 初始化

        var zero = 0;
        $('#calc_toggle').text('展开');
        $('#calc_his li:gt(4)').css('display', 'none');


        // 计算器 点击事件
        $('#calc').on('input', function() {
            var newInput = $('#calc').val().split(' ').join(''),
                calcResult;
            if (newInput === '') {
                $('#calc_tip2').text('')
                $('#calc_result').text('归零')
                $('#calc_result,#calc_tip2').attr('class', ' ')
            } else if (newInput.match(/[^0-9\+\-\*\/\.]+/g) !== null) {
                $('#calc_tip2').text('输入不正确')
                $('#calc_result').text('错误')
                $('#calc_result,#calc_tip2').attr('class', 'error')
            } else if (newInput.match(/[\-\+\*\/]{2,}/g) !== null) {
                $('#calc_tip2').text('同时输入了多个运算符')
                $('#calc_tip2').attr('class', 'warn')
                $('#calc_result').text('错误')
                $('#calc_result').attr('class', 'error')
            } else if (newInput.match(/^[\+\*\/]+/g) !== null) {} else if (newInput.match(/\D$/g) !== null) {
                $('#calc_tip2').text(' 请继续输入数字')
                $('#calc_tip2').attr('class', 'warn')
            } else {
                $('#calc_result,#calc_tip2').attr('class', ' ')
                $('#calc_tip2').text('计算结果')
                calcResult = inCalc(newInput);
                $('#calc_result').text(calcResult);
                $('#calc_his').prepend('<li class="input_his"><span class="myinput_his">' + newInput + '</span><span class="eq_his">=</span><span class="result_his">' + calcResult + '</span><span class="index_his"># ' + (zero += 1) + '</span></li>');
            }
            if ($('#calc_his li').length > 10) { // li 超出移除
                $('#calc_his li:gt(9)').remove();
            }
            $('#calc_his li:has(span)').hover( // hover事件，添加回退按钮
                function() {
                    if ($('.index_his_tip').length === 0) {
                        $(this).append('<span class="index_his_tip">回退</span>');
                    }
                },
                function() {
                    $(this).children('.index_his_tip').remove();
                }
            );
            if ($('#calc_toggle').text() === '展开') { // 大于5不显示
                $('#calc_his li:gt(4)').css('display', 'none');
            }
            $('#calc_his li:has(span)').on('click', function() { // li点击事件
                $('#calc').val($(this).children('.myinput_his').text());
                $('#calc_result').text($(this).children('.result_his').text());
                $('#calc_tip2').text('');
                $('#calc_result,#calc_tip2').attr('class', ' ');
            });
        });

        $('#calc_clear').on('click', function() { // 清空
            $('#calc_his li').empty().removeAttr('class');
            $('#calc_his li').unbind('click');
            $('#calc_his li:has(span)').unbind('hover');
            return (zero = 0);
        });
        $('#calc_reset').on('click', function() { // 归零
            $('#calc_his li').empty().removeAttr('class');
            $('#calc_his li').unbind('click');
            $('#calc_his li:has(span)').unbind('hover');
            $('#calc_tip2').text('');
            $('#calc_result').text('归零');
            $('#calc_result,#calc_tip2').attr('class', ' ');
            $('#calc').val('');
            return (zero = 0);
        });
        $('#calc_toggle').click(function() { // 展开和收起事件
            if ($('#calc_toggle').text() === '收起') {
                $('#calc_toggle').text('展开');
                $('#calc_his li:gt(4)').slideUp(300, 'linear');
            } else if ($('#calc_toggle').text() === '展开') {
                $('#calc_toggle').text('收起');
                $('#calc_his li:gt(4)').slideDown(300, 'linear');
            }
        });



    });

    // 二进制
    $('input#type_bin').on('input', function() {
        var data_bin = $('#type_bin').val().split(' ').join('');
        if (data_bin.match(/[\D2-9]+/g) !== null) {
            $('#hex_tip').html('请输入 <kbd>0</kbd> 到 <kbd>1</kbd> 范围内的字符').attr('class', 'error');
        } else if (data_bin === '') {
            $('input').val('');
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
        } else {
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
            $('#type_dec').val(parseInt(data_bin, 2));
            $('#type_oct').val(parseInt(data_bin, 2).toString(8));
            $('#type_hex').val(parseInt(data_bin, 2).toString(16));
        }
    });
    // 八进制
    $('input#type_oct').on('input', function() {
        var data_oct = $('#type_oct').val().split(' ').join('');
        if (data_oct.match(/[\D89]+/g) !== null) {
            $('#hex_tip').html('请输入 <kbd>0</kbd> 到 <kbd>7</kbd> 范围内的字符').attr('class', 'error');
        } else if (data_oct === '') {
            $('input').val('');
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
        } else {
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
            $('#type_dec').val(parseInt(data_oct, 8));
            $('#type_bin').val(parseInt(data_oct, 8).toString(2));
            $('#type_hex').val(parseInt(data_oct, 8).toString(16));
        }
    });
    // 十进制
    $('input#type_dec').on('input', function() {
        var data_dec = $('#type_dec').val().split(' ').join('');
        if (data_dec.match(/\D+/g) !== null) {
            $('#hex_tip').html('请输入 <kbd>0</kbd> 到 <kbd>9</kbd> 范围内的字符').attr('class', 'error');
        } else if (data_dec === '') {
            $('input').val('');
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
        } else {
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
            $('#type_bin').val(parseInt(data_dec, 10).toString(2));
            $('#type_oct').val(parseInt(data_dec, 10).toString(8));
            $('#type_hex').val(parseInt(data_dec, 10).toString(16));
        }
    });
    // 十六进制
    $('input#type_hex').on('input', function() {
        var data_hex = $('#type_hex').val().split(' ').join('');
        if (data_hex.match(/[g-zG-Z\W]+/g) !== null) {
            $('#hex_tip').html('请输入数字字符及 <kbd>A</kbd> 到 <kbd>F</kbd> 范围内的字母').attr('class', 'error');
        } else if (data_hex === '') {
            $('input').val('');
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
        } else {
            $('#hex_tip').text('输入数字，自动转化成其他进制').attr('class', ' ');
            $('#type_dec').val(parseInt(data_hex, 16));
            $('#type_oct').val(parseInt(data_hex, 16).toString(8));
            $('#type_bin').val(parseInt(data_hex, 16).toString(2));
        }
    });

    // Unicode字符互转
    // 添加正則 检测输入合法性
    $('#type_charcode').on('input', function() {
        let getChar = $('#type_charcode').val();
        $('#type_unicode').val(getChar.split('').map(val => '\\u' + ('00' + val.charCodeAt().toString(16)).slice(-4)).join(''))
        $('#type_htmlcode').val(getChar.split('').map(val => '\&#' + val.charCodeAt() + '\;').join(''))
    })
    $('#type_unicode').on('input', function() {
        let getUni = $('#type_unicode').val()
        $('#type_charcode').val(getUni.split('\\u').map(x => String.fromCharCode(parseInt(x, 16))).splice(1).join(''))
        $('#type_htmlcode').val(getUni.split('\\u').map(x => '&#' + parseInt(x, 16) + ';').splice(1).join(''))
    })
    $('#type_htmlcode').on('input', function() { // 处理输入十六进制的
        let getHtml = $('#type_htmlcode').val()
        $('#type_unicode').val(getHtml.split(/\W+/g).filter(x => x !== '').map(x => '\\u' + ('00' + (x * 1).toString(16)).slice(-4)).join(''))
        $('#type_charcode').val(getHtml.split(/\W+/g).filter(x => x !== '').map(x => String.fromCharCode(x)).join(''))
    })

    // ip to address
    $('#ip2num').click(function() {
        let input_ip = $('#ipaddr').val()
        let numaddr = input_ip.split('.').map(x => {
            x = parseInt(x, 10).toString(16)
            x = x.length === 1 ? '0' + x : x
            return x
        }).join('')
        $('#numaddr').attr('href', 'http://' + parseInt(numaddr, 16))
        $('#numaddr').text('http://' + parseInt(numaddr, 16))
    })

    // uri编码
    $('#type_uriencode').on('input', function() {
        let uri_encode = $('#type_uriencode').val()
        if ($('#uri_mode')[0].checked) {
            $('#type_uridecode').val(encodeURIComponent(uri_encode))
        } else {
            $('#type_uridecode').val(encodeURI(uri_encode))
        }
    })
    $('#type_uridecode').on('input', function() {
        let uri_decode = $('#type_uridecode').val()
        if ($('#uri_mode')[0].checked) {
            $('#type_uriencode').val(decodeURIComponent(uri_decode))
        } else {
            $('#type_uriencode').val(decodeURI(uri_decode))
        }
    })
    $('#uri_mode').change(function() {
        if ($('#type_uriencode').val() && $('#type_uridecode').val()) {
            let uri_encode = $('#type_uriencode').val()
            if ($('#uri_mode')[0].checked) {
                $('#type_uridecode').val(encodeURIComponent(uri_encode))
            } else if (!$('#uri_mode')[0].checked) {
                $('#type_uridecode').val(encodeURI(uri_encode))
            }
        }
    })

    // b64 编码 add char filter
    $('#type_b64encode').on('input', function() {
        let b64_encode = $('#type_b64encode').val()
        $('#type_b64decode').val(window.btoa(unescape(encodeURIComponent(b64_encode))))
    })
    $('#type_b64decode').on('input', function() {
        let b64_decode = $('#type_b64decode').val()
        $('#type_b64encode').val(decodeURIComponent(escape(window.atob(b64_decode))))
    })


    // SVG 转 data image
    $('#type_svg2data').on('input', function() {
        let inputVal = $('#type_svg2data').val().replace(/(<\?xml[\w \"\.\=\-]+\?>\n*)|version\ *\=\ *\"[\d\.]+\" |(\n\ +)|[\n\r\t]+|(\ (width|height|id)\=[\w\-\_\"\']+)/g, ""),
            // 去除 xml 声明 版本 空格 宽高id
            $result = $('#type_svg2result');
        if (inputVal) {
            if ($('#svg4')[0].checked) {
                inputVal = /http\:\/\/\www\.w3\.org\/2000\/svg/i.test(inputVal) ? inputVal : inputVal.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
                // 添加 xml 命名空间
            }
            if ($('#svg3')[0].checked) {
                $('#svg1,#svg2').attr("disabled", "disabled")
                $result.val('data:image/svg+xml;base64,' + btoa(inputVal))
            } else {
                $('#svg1,#svg2').removeAttr("disabled")
                if ($('#svg1')[0].checked) {
                    $result.val('data:image/svg+xml,' + inputVal.replace(/[<>#]/g, x => encodeURIComponent(x)).replace(/\"/g, "'"));
                } else if ($('#svg2')[0].checked) {
                    $result.val('data:image/svg+xml,' + inputVal.replace(/[<>#]/g, x => encodeURIComponent(x)));
                }
            }
        }
    });
    $('#svg1').change(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            let r = $('#type_svg2result').val().replace(/\"/g, "'");
            $('#type_svg2result').val(r);
        }
    });
    $('#svg2').change(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            let r = $('#type_svg2result').val().replace(/\'/g, '"');
            $('#type_svg2result').val(r);
        }
    });
    $('#svg3,#svg4').change(function() {
        $("#type_svg2data").trigger("input");
    });
    $('#svgtest').click(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            $('#testimage').css({
                'height': '200px',
                'width': '200px',
                'background': '',
                'display': 'inline-block'
            });
            $('#testdata').css({
                'height': '188px',
                'width': '275px',
                'margin': '0 20px',
                'vertical-align': 'top',
                'display': 'inline-block'
            });
            if ($('#svg2')[0].checked) {
                $('#testimage')[0].style.background = "rgb(238, 238, 238) url('" + $('#type_svg2result').val() + "') no-repeat 100% 100% / cover";
                $('#testdata').val("height: 200px;\nwidth: 200px;\nbackground: rgb(238, 238, 238) url('" + $('#type_svg2result').val() + "') no-repeat 100% 100% / cover;");
            } else {
                $('#testimage')[0].style.background = 'rgb(238, 238, 238) url("' + $('#type_svg2result').val() + '") no-repeat 100% 100% / cover';
                $('#testdata').val("height: 200px;\nwidth: 200px;\nbackground: rgb(238, 238, 238) url(\"" + $('#type_svg2result').val() + "\") no-repeat 100% 100% / cover;");
            }
        } else {
            $('#testimage,#testdata').css({
                'display': 'none'
            });

        }
    });
    $('#svgopen').click(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            window.open($('#type_svg2result').val());
        }
    });
    $('#svgsample').click(function() {
        if (!$('#type_svg2data').val()) {
            $('#type_svg2data').val("<svg fill=\"#757575\" opacity=\"1.0\" width=\"17\" height=\"17\" viewBox=\"0 0 17 17\"><path d=\"M16.64 5.41L13.83 2H9V0H8v2H1v7h7v8h1V9h4.838l2.803-3.59zM9 8H2V3h11.358l2 2.426L13.35 8H9z\"/></svg>");
        }
    });


}());