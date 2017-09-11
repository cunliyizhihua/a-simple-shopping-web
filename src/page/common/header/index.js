/*
* @Author: p
* @Date:   2017-07-19 18:39:41
* @Last Modified by:   p
* @Last Modified time: 2017-07-19 19:11:17
*/

'use strict';
require('./index.less')

var _mytools = require('util/mytools.js');
var _cart    = require('service/cart-service.js');


// 我要实现的功能
// 1. 加载购物车数量

var header = {
	init: function() {
		// 加载购物车数量
		this.loadCartCount();
		// 填充关键词
		this.loadKeywords()
		// 事件
		this.bindEvent()

		return this;
	},

	// 方法
	bindEvent: function() {
		var _this = this;
		$('#search-button').click(function() {
			_this.submit();
		});
		$('#search-input').keyup(function(e) {
			if(e.keyCode === 13) {
				_this.submit();
			}
		})

	},

	// 加载购物车数量
	loadCartCount: function() {
		_cart.getCartCount(
			// 成功
			function(res) {
				var num = '(' + res.data + ')'
				$('.cart-count').find('.count').text(num);
			}

		)
	},

	// 如果url有关键词 把关键词填充进输入框
	loadKeywords: function() {
		var keyword = _mytools.getUrlParam('keyword');
		if(keyword) {
			$('#search-input').val(keyword);
		}
	},

	// 点击搜索 进入商品列表页
	submit: function() {
		var keyword = $.trim($('#search-input').val());
		if(keyword) {
			window.location.href = './list.html?keyword='+keyword;
		}
	}

}

$(function() {
	header.init()
});

module.exports = header;