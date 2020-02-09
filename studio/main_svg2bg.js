/*jshint esversion: 6 */
/*jshint asi: true */

;
(function() {
    'use strict'
    /*global $ */
    // Svg2bg

    if (!/firefox/i.test(window.navigator.userAgent)) {
        $('#svgopen').hide()
    }
    // SVG 转 data image
    $('#type_svg2data').on('input', function() {
        let inputVal = $('#type_svg2data').val().replace(/(<\?xml[\w \"\.\=\-]+\?>\n*)|version\ *\=\ *\"[\d\.]+\" |(\ id\=[\w\-\_\"\']+)/g, '').replace(/(\n\ +)|[\n\r\t]+/g, ' '),
            // 去除 xml 声明 版本 空格 宽高id
            $result = $('#type_svg2result')
        if (inputVal) {
            if ($('#svg4')[0].checked) {
                inputVal = /http\:\/\/\www\.w3\.org\/2000\/svg/i.test(inputVal) ? inputVal : inputVal.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
                    // 添加 xml 命名空间
            }
            if ($('#svg3')[0].checked) {
                $('#svg1,#svg2').attr('disabled', 'disabled')
                $result.val('data:image/svg+xml;base64,' + btoa(inputVal))
            } else {
                $('#svg1,#svg2').removeAttr('disabled')
                if ($('#svg1')[0].checked) {
                    $result.val('data:image/svg+xml,' + inputVal.replace(/[<>#]/g, x => encodeURIComponent(x)).replace(/\"/g, "'"))
                } else if ($('#svg2')[0].checked) {
                    $result.val('data:image/svg+xml,' + inputVal.replace(/[<>#]/g, x => encodeURIComponent(x)))
                }
            }
        }
    })
    $('#svg1').change(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            let r = $('#type_svg2result').val().replace(/\"/g, "'")
            $('#type_svg2result').val(r)
        }
    })
    $('#svg2').change(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            let r = $('#type_svg2result').val().replace(/\'/g, '"')
            $('#type_svg2result').val(r)
        }
    })
    $('#svg3,#svg4').change(function() {
        $('#type_svg2data').trigger('input')
    })
    $('#svgtest').click(function() {
        if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
            $('#testimage').css({
                'height': '200px',
                'width': '200px',
                'background': '',
                'display': 'inline-block'
            })
            $('#testdata').css({
                'height': '188px',
                'width': '275px',
                'margin': '0 20px',
                'vertical-align': 'top',
                'display': 'inline-block'
            })
            if ($('#svg2')[0].checked) {
                $('#testimage')[0].style.background = "rgb(238, 238, 238) url('" + $('#type_svg2result').val() + "') no-repeat 100% 100% / cover"
                $('#testdata').val("height: 200px;\nwidth: 200px;\nbackground: rgb(238, 238, 238) url('" + $('#type_svg2result').val() + "') no-repeat 100% 100% / cover;")
            } else {
                $('#testimage')[0].style.background = 'rgb(238, 238, 238) url("' + $('#type_svg2result').val() + '") no-repeat 100% 100% / cover'
                $('#testdata').val('height: 200px;\nwidth: 200px;\nbackground: rgb(238, 238, 238) url("' + $('#type_svg2result').val() + '") no-repeat 100% 100% / cover;')
            }
        } else {
            $('#testimage,#testdata').css({
                'display': 'none'
            })
        }
    })
    if (/firefox/i.test(window.navigator.userAgent)) {
        $('#svgopen').click(function() {
            if ($('#type_svg2data').val() && $('#type_svg2result').val()) {
                window.open($('#type_svg2result').val())
            }
        })
    }
    $('#svgsample').click(function() {
        if (!$('#type_svg2data').val()) {
            $('#type_svg2data').val('<svg opacity="1.0" fill="none" width="32" height="32" stroke-linecap="round" stroke-linejoin="round" stroke="#777" stroke-width="2" viewBox="0 0 32 32"><path d="M14 2 L14 6 M14 18 L14 30 M2 6 L2 18 24 18 30 12 24 6Z"></path></svg>')
        }
        $('#type_svg2data').trigger('input')
    })
}())
