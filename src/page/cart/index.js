'use strict';

require('./index.less')
require('page/common/nav/index.js');
var header   = require('page/common/header/index.js');
var cartTpl  = require('./index.string')

var _mytools = require('util/mytools.js');
var _cart    = require('service/cart-service.js');

var cart = {
	// 待会会设置一个notempty属性 以确定购物车里面是否有商品 然后作出不同的渲染
	data: {

	},

	init: function() {
		this.onLoad();
		this.bindEvent();
	},

	// 事件
	bindEvent: function() {
		var _this = this;
		// 单个商品的选中/取消
		$(document).on('click', '.simple-select', function() {
			var $this = $(this);
			var productId = $(this).parents('.cart-table').data('product-id');
			// 选中
			if($this.is(':checked')) {
				_cart.selectProduct(
                    productId,
                    function(res){
                        _this.renderCart(res.data);
                    },
                    function(errMsg){
                        _this.showCartError();
                    }
                );
			}
			// 取消选中
			else {
				_cart.unselectProduct(
					productId,
					function(res){
	                    _this.renderCart(res.data);
	                }, 
	                function(errMsg){
	                    _this.showCartError();
	                }
                );
			}
		});
		// 全选/全取消
		$(document).on('click', '.cart-select-all', function() {
			var $this = $(this);
			// 选中
			if($this.is(':checked')){
                _cart.selectAllProduct(
                    function(res){
                        _this.renderCart(res.data);
                    },
                    function(errMsg){
                        _this.showCartError();
                    }
                );
            }
            // 取消全选
            else{
                _cart.unselectAllProduct(
                    function(res){
                        _this.renderCart(res.data);
                    },
                    function(errMsg){
                        _this.showCartError();
                    }
                );
            }
		});
		// 删除单个商品
		$(document).on('click', '.simple-del', function() {
			var productId = $(this).parents('.cart-table').data('product-id');
			_this.deleteCartProduct(productId);
		});
		// 删除选中商品
		$(document).on('click', '.del-select', function() {
			var arrId          = new Array();
			var $simpleSelect  = $('.simple-select:checked');
			// console.log($simpleSelect);
			$simpleSelect.each(function(){
				arrId.push($(this).parents('.cart-table').data('product-id'))				
			});
			if(arrId.length) {
				_this.deleteCartProduct(arrId.join(','));
			}else{
				_mytools.errorTips('您还没有选中要删除的商品');
			}
		});
		// 修改数量
		$(document).on('click', '.change-count a', function(){
			var $this        = $(this);
			var $num         = $this.siblings('.num');
			var currentCount = parseInt($num.text());
			var newCount     = 0;
			var productId    = $this.parents('.cart-table').data('product-id');
			var maxNum       = $this.parents('.cart-table').data('max-num');
			var minNum       = 1;
			var type         = $this.hasClass('add') ? 'add' : 'inc';
			if(type == 'add' && currentCount < maxNum) {
				newCount = currentCount + 1;
			};
			// console.log('currentCount:' + currentCount)
			if(type == 'inc') {
				if(currentCount == 1){return};
				newCount = currentCount - 1
			};
			// 更新购物车商品数量
            _cart.updateProduct(
                {
                    productId : productId,
                    count : newCount
                },
                function(res){
                    _this.renderCart(res.data);
                },
                function(errMsg){
                    _this.showCartError();
                }
            );
		});
		 // 提交购物车
        $(document).on('click', '.balance', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mytools.errorTips('请选择商品后再提交');
            }
        });
	},

	onLoad: function() {
		this.loadCart();
	},

	// 加载购物车列表页面
	loadCart: function() {
		var _this = this;
		_cart.getCartList(
			function(res) {
				
				// 渲染页面
				_this.renderCart(res.data);
			},
			function(errMsg) {
				_this.showCartError();
			}
		)
	},

	// 
	renderCart: function(data) {
		// 设置data的notEmpty属性
		this.filter(data);
		// 缓存购物车信息
		this.data.cartInfo = data;
		// 生成html
		// console.log(this.data)
		var cartHtml = _mytools.renderHtml(cartTpl, this.data);

		$('.cart-con').find('.w').html(cartHtml);

		header.loadCartCount();

	},

	// 判断
	filter: function(data) {
		// 强制转布尔值
		this.data.notEmpty = !!data.cartProductVoList.length;
	},

	// 删除商品 批量删除 参数id以逗号隔开
	deleteCartProduct: function(productIds) {
		var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res.data);
        }, function(errMsg){
            _this.showCartError();
        });
	},
	// 显示错误信息
    showCartError: function(){
        $('.cart-con').find('.w').html('<p class="err-tip">404错误,请刷新下!!</p>');
    }
};

$(function() {
	cart.init()
})