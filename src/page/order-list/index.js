'use strict';

require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');

// 分页插件
require('util/pagination/index.js');

var _mytools    = require('util/mytools.js');
var _order      = require('service/order-service.js');
var navSide     = require('page/common/nav-side/index.js');
var listTpl     = require('./index.string');

var orderList = {
	// 请求订单的参数
	data: {
		listParam: {
			pageNum: 1,
			pageSize : 10
		}
	},

	init: function() {
		this.onLoad()
	},

	// 初始化
	onLoad: function() {
		// 加载左侧列表
		navSide.init({name: 'order-list'});

		// 加载订单列表
		this.loadOrderList();
	},

	loadOrderList: function() {
		var _this       = this;
		var $listInfo   = $('.list-info');
		var listParam   = this.data.listParam;

		$listInfo.html('<div class="loading"></div>');
		_order.getOrderList(
			listParam,
			function(res){
				// console.log(res);
				var html = _mytools.renderHtml(listTpl, res.data);
				$listInfo.html(html);

				// 加载分页列表
				var $pageCon = $('#order-list-page-con');
				var isInited = $pageCon.pagination();
        		if(!isInited) {
        			_this.loadPagination(res, $pageCon);
        		}else{
        			return
        		};

        		// 把左侧导航美化一下
        		var $height = $listInfo.height();
        		$('.nav-side').height($height);

			},
			function(errMsg) {
				$listInfo.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
			}

		)

	},

	// 加载分页信息
	loadPagination: function(res, $pageCon) {
		var _this     =   this;
		var $total    =   res.data.total;
		var $pageSize =   res.data.pageSize
		$pageCon.pagination({
			total               :  $total,
			pageSize            :  $pageSize,
			fshowFirstLastBtn   :  true,
			firstBtnText        :  '首页',
			lastBtnText         :  '尾页',
			prevBtnText         :  '上一页',
			nextBtnText         :  '下一页',
		}).on("pageClicked", function(event, data){
			// 如果当前页一致 不需要加载
			if(_this.data.listParam.pageNum == data.pageIndex + 1){return};
			_this.data.listParam.pageNum = data.pageIndex + 1;
			_this.loadOrderList()

		})
	}

};

$(function() {
	orderList.init();
});