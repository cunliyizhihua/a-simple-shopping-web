'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');

require('./index.less');

var _mytools   = require('util/mytools.js');
var _product   = require('service/product-service.js');
var _cart      = require('service/cart-service.js');
var detailTpl  = require('./index.string');

var detail = {
	// 获取产品ID
    data : {
        productId : _mytools.getUrlParam('productId') || ''
    },

	init: function() {
		this.onLoad();
		this.bindEvent();
	},

	// 初始化
	onLoad: function() {
		// 没有产品id 返回到主页
		if(!this.data.productId){
			_mytools.goHome();
		};
		this.loadDetail();
	},

	// 事件
	bindEvent: function() {
		var _this = this;
		// 图片预览
		$(document).on('mouseover', '.p-img-item', function() {
			var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
		});

		// 购物车数量操作
		$(document).on('click', '.p-count-btn', function() {
			var type        =  $(this).hasClass('add') ? 'add' :  'inc';
			var $pCount     =  $('.p-count');
			var currCount   =  parseInt($pCount.val());
			var minCount    =  1;
			var maxCount    =  _this.data.detailInfo.stock;  // 最大等于库存
			// console.log(_this.data);
			if(type === 'add' && maxCount !== 0) {
				$pCount.val(currCount < maxCount ? (currCount+1) : maxCount);
			};
			if(type === 'inc' && maxCount !== 0) {
				$pCount.val(currCount > minCount ? (currCount-1) : minCount); 
			};
		});

		// 加载购物车
		$(document).on('click', '.cart-add', function() {
			if(_this.data.detailInfo.stock == 0) return;
			_cart.addToCart(
                {
                    productId   : _this.data.productId,
                    count       : $('.p-count').val()
                },
                function(res){
                    window.location.href = './result.html?type=cart-add';
                },
                function(errMsg){
                    _mytools.errorTips(errMsg);
                }
            );
		});
	},

	// 加载产品详情
	loadDetail: function() {
		var _this       =  this;
		var $detailWrap =  $('#detail-wrap');
		var html        =  '';
		// loading
		$detailWrap.html('<div class="loading"></div>');
		_product.getProductDetail(
            this.data.productId, 
            function(res){
                // 因为得到的subImages是写在一起,用逗号隔开的
                _this.filter(res.data);
                // 缓存住detail的数据
                _this.data.detailInfo = res.data;
                // render
                html = _mytools.renderHtml(detailTpl, res.data);
                $detailWrap.html(html);
            }, 
            function(errMsg){
                $detailWrap.html('<p class="err-tip">此商品已经下架,在看看其他商品吧!</p>');
            }
        );
	},

	// 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};

$(function() {
	detail.init()
});