'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.less');

var _mytools        = require('util/mytools.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');
 
var orderDetail = {

	data: {
        orderNumber : _mytools.getUrlParam('orderNumber')
    },

	init: function() {
		this.onLoad();
		this.bindEvent();
	}, 

	onLoad: function() {
		// 加载detail数据
        this.loadDetail();
	},

	// 点击事件
	bindEvent: function() {
		var _this = this;
		// 取消订单按钮
		$(document).on('click', '#order-del-btn', function() {
			if(window.confirm('确实要取消该订单？')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _mytools.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function(errMsg){
                    _mytools.errorTips(errMsg);
                });
            }
		})
	},

	loadDetail: function() {
		var _this = this;
		var $orderDetail = $('.order-detail');
		var orderNumber  = this.data.orderNumber;
		// 初始填充
		$orderDetail.html('<div class="loading"></div>');
		// 请求数据
		_order.getOrderDetail(
			orderNumber,
			function(res) {
				var data = res.data;
				_this.dataFilter(data);
				var html = _mytools.renderHtml(templateIndex, data);
				$orderDetail.html(html);
			},
			function(errMsg) {
				$orderDetail.html('<p class="err-tip">' + errMsg + '</p>');
			}
		)
	},
	// 数据的适配
    dataFilter : function(data){
        // 未支付的订单 status==10 , 这时候 付款和取消的按钮都应该显示
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
};


$(function() {
	orderDetail.init();
})