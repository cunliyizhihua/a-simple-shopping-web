'use strict';

require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var aList    = require('./address-list.string');
var pList    = require('./product-list.string');
var aEdit    = require('./address-edit.string');
var aAdd     = require('./address-add.string');
// 地区联动
var distPic  = require('util/distpicker/index.js');
// 表单验证
var validate = require('util/validation/index.js');

var _mytools = require('util/mytools.js');
var _order   = require('service/order-service.js');
var _address = require('service/address-service.js');

var confirm = {
	data : {
        selectedAddressId : null
    },
	init: function() {
		this.onLoad();
		this.bindEvent();

	},

	// 事件
	bindEvent: function() {
		var _this = this;
		var $document = $(document);

		// 地址的选择
		$document.on('click', '.address-list-con', function() {
			$(this).addClass('active')
                   .siblings('.address-list-con').removeClass('active');
            // console.log($(this).data('id'));
            _this.data.selectedAddressId = $(this).data('id');
		});

		// 删除地址
		$document.on('click', '.item-opera .del', function(e) {
			// 阻止事件传播 免得框框变红
			e.stopPropagation();
			var id = $(this).parents('.address-list-con').data('id');
			if(window.confirm('确认要删除该地址？')){
                _address.deleteAddress(
                	id, 
                	function(res){
	                    _this.loadAddress();
	                },
	                function(errMsg){
	                    _mytools.errorTips(errMsg);
	                }
                );
            }
		});

		// 编辑地址 / 提交
		$document.on('click', '.item-opera .edit', function(e) {
			e.stopPropagation();
			var id = $(this).parents('.address-list-con').data('id');
			_address.getAddress(
                id,
                function(res){
                	var $adModal = $('.address-modal')
                    $adModal.css('display', 'block');
                    var html = _mytools.renderHtml(aEdit, res.data);
                    $adModal.html(html);

                    //　渲染地址二级联动
                    $('#distpick').distpicker({
					    province: res.data.receiverProvince ,
					    city: res.data.receiverCity
					});

					// 点击关闭弹窗
					$('#edit-form').find('.close').click(function() {
						$adModal.css('display', 'none');
					});

					// 保存地址
					$('.sub-btn').click(function() {
						var newInfo = {};
						newInfo.receiverName       = $.trim($adModal.find('#username').val());
				        newInfo.receiverProvince   = $adModal.find('#prov-sel option:selected').val();
				        newInfo.receiverCity       = $adModal.find('#city-sel option:selected').val();
				        newInfo.receiverAddress    = $.trim($adModal.find('#address').val());
				        newInfo.receiverPhone      = $.trim($adModal.find('#mobile').val());
				        newInfo.receiverZip        = $.trim($adModal.find('#code').val());
				        newInfo.id                 = res.data.id;
				        // console.log(newInfo);
				        _address.update(
				        	newInfo,
				        	function(res) {
				        		_mytools.successTips('地址修改成功');
				        		$adModal.css('display', 'none');
				        		// 然后重新刷新界面
				        		_this.loadAddress()
				        	},
				        	function(errMsg) {
				        		_mytools.errorTips(errMsg);
				        	}
				        )
					})	
                },
                function(errMsg){
                    _mytools.errorTips(errMsg);
                }
            );
		});

		// 添加新地址
		$document.on('click', '#address-add .icon', function(e){
			e.stopPropagation();
			var $adModal = $('.address-modal')
            $adModal.css('display', 'block');
            var html = _mytools.renderHtml(aEdit);
            $adModal.html(html);
            // 关闭弹窗
            $('#edit-form').find('.close').click(function() {
				$adModal.css('display', 'none');
			});
            // 二级联动
            $('#distpick').distpicker();
            // 构造信息
            $('.sub-btn').click(function() {
            	var newInfo = {};
				newInfo.receiverName       = $.trim($adModal.find('#username').val());
		        newInfo.receiverProvince   = $adModal.find('#prov-sel option:selected').val();
		        newInfo.receiverCity       = $adModal.find('#city-sel option:selected').val();
		        newInfo.receiverAddress    = $.trim($adModal.find('#address').val());
		        newInfo.receiverPhone      = $.trim($adModal.find('#mobile').val());
		        newInfo.receiverZip        = $.trim($adModal.find('#code').val());
		        // 向服务器添加地址
		        _address.save(
		        	newInfo,
		        	function(res) {
		        		_mytools.successTips('地址添加成功');
		        		$adModal.css('display', 'none');
		        		// 然后重新刷新界面
		        		_this.loadAddress()	
		        	},
		        	function(errMsg) {
		        		_mytools.errorTips(errMsg)
		        	}
		        )
            })

		});

		// 提交订单

		$document.on('click', '#sub-order', function(e){
			e.stopPropagation();
			var shippingId = _this.data.selectedAddressId;
			if(!shippingId){
				_mytools.errorTips('您还没有选择地址呢!');
				return;
			};
			_order.createOrder(
                {
                    shippingId : shippingId
                },
                function(res){
                    // console.log(res);
                    window.location.href = './payment.html?orderNumber=' + res.data.orderNo;
                },
                function(errMsg){
                    _mytools.errorTips(errMsg)
                }
            )
		});
	},

	onLoad: function() {
		this.loadAddress();
		this.loadProduct();
	},

	// 加载地址列表
	loadAddress: function() {
		var _this    = this;
		var $address = $('.confirm-con').find('.address');
		var html     = '';
		$address.html('<div class="loading"></div> ')
		_address.getAddressList(	
			function(res) {
				// console.log(res);
				_this.addressFilter(res.data);
				html = _mytools.renderHtml(aList, res.data);
				$address.html(html);
			},
			function(errMsg) {
				$address.html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
			}
		)
	},
	// 处理地址列表中选中状态
    addressFilter : function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            // 如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },

	// 加载产品列表
	loadProduct: function() {
		var $productList  = $('.confirm-con').find('.product-list');
		var html          = ''
        $productList.html('<div class="loading"></div>');
        // 获取地址列表
        _order.getProductList(function(res){
        	// console.log(res);
            html = _mytools.renderHtml(pList, res.data);
            $productList.html(html);
        },
        function(errMsg){
            $productList.html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        })
	}
};

$(function() {
	confirm.init();
})