'use strict';

require('./index.less')
require('page/common/nav/index.js');
var header   = require('page/common/header/index.js');

var _mytools = require('util/mytools.js');
var _payment = require('service/payment-service.js');
var tplOrder = require('./index.string');

var payment = {
	// 得到订单号
	data: {
        orderNumber : _mytools.getUrlParam('orderNumber')
    },

    init: function(){
        this.onLoad();
    },

    onLoad : function(){
        // 加载detail数据
        this.loadPaymentInfo();
    },

    loadPaymentInfo: function() {
    	var _this      = this;
    	var $payment   = $('.payment');
    	var orderNo    = this.data.orderNumber;
    	// console.log(orderNo);

    	$payment.html('<div class="loading"></div>');

    	_payment.getPaymentInfo(
            // 参数
            orderNo,
            function(res){
                // 渲染html 生产二维码界面
                var paymentHtml = _mytools.renderHtml(tplOrder, res.data);
                $payment.html(paymentHtml);
                // 生产二维码之后 用户扫码付款 
                _this.listenOrderStatus();
            },
            function(errMsg){
                $payment.html('<p class="err-tip">' + errMsg + '</p>');
            }
        );

    },

    // 监听订单状态 每5s请求一次状态
    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(
            function(){
                _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                    if(res == true){
                        window.location.href 
                            = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                    }
                });
            },
            // 1e3 = 1*10的3次方
            5e3
        );
    } 


}

$(function() {
	payment.init();
})