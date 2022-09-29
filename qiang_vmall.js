// ==UserScript==
// @name         华为商城抢手机
// @namespace    http://itlaomao.net/
// @version      1.0
// @description  抢到手机分我一半！！！
// @author       IT老猫
// @match        https://www.vmall.com/product/*.html
// @icon         https://www.vmall.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var $node = $('#pro-operation')
    var $buttton = $('<a id="qiang_button">开始抢</a>')
    $buttton.attr('style', `
            display: block;
            float:left;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: deepskyblue;
            color: #fff;`)
    $buttton.bind('click', function () {
        if ($(this).hasClass('running')) {
            $(this).text('开始抢')
            clearInterval(this.t2)
            $msg_panel.text('')
        } else {
            $(this).text('停止抢')
            this.t2 = setInterval(fn_qiang, 1e1)
        }
        $(this).toggleClass('running')
    })
    var $msg_panel = $('<span id="qiang_msg" style="display: block;float:left;margin-left: 5px;line-height:30px;color: deeppink;"/>')


    var fn_qiang = function () {
        if (fn_qiang.times == undefined) {
            fn_qiang.times = 0
        }
        if (fn_qiang.times > 6) {
            fn_qiang.times = 0
        }
        if ($node.children('.product-button02').text() != '立即下单') {
            $msg_panel.text('正在自动抢手机' + '.'.repeat(fn_qiang.times))
        } else {
            rush.business.clickBtnRushBuy2(this) //执行抢动作
            $buttton.click()
            fn_qiang.times = 0
            $msg_panel.text('触发了1次抢手机动作，如果抢到一定要分我一半')
        }
        fn_qiang.times++
    }

    var fn_keep_online = function () {
        setInterval(function () {
            $.get('https://www.vmall.com/member/accountInfo.json')
        }, 60e4)
    }()


    var t = setInterval(function () {
        console.log('★★★华为抢手机脚本已经加载★★★')
        if ($node.children('.product-button02').text() != '即将开售') {
            console.error('当前页面不支持抢购，退出执行')
            return
        }
        var $div = $('<div style="clearfix:both;"/>')
        $div.append($buttton) // 添加自动抢按钮
        $div.append($msg_panel) // 添加消息面板
        $node.after($div)
        clearInterval(t)
    }, 1e3)

})();