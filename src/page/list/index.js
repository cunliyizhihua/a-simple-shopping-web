
'use strict';

require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');

// 分页插件
require('util/pagination/index.js');

var prodcutTpl = require('./index.string');
var _mytools   = require('util/mytools.js');
var _product   = require('service/product-service.js');

var list = {
	data : {
        // 产品分类 关键词 价格排序 当前页 每页放多少个产品
        listParam : {
            categoryId      : _mytools.getUrlParam('categoryId') || '',
            keyword         : _mytools.getUrlParam('keyword')    || '',
            orderBy         : _mytools.getUrlParam('orderBy')    || 'default',
            pageNum         : _mytools.getUrlParam('pageNum')    || 1,
            pageSize        : _mytools.getUrlParam('pageSize')   || 10
        }
    },
	init: function() {
		this.loadList();
		this.bindEvent()
	},

	bindEvent: function() {
		// 点击价格排序
		var _this = this;
		$('.sort-item').click(function() {
			var $this = $(this);
			// 点击之后 回到第一页
			_this.data.listParam.pageNum = 1;
			// 改变样式 左侧
			if($this.data('type') === 'default'){
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active');
					_this.data.listParam.orderBy = 'default';
				}
			};
			if($this.data('type') === 'price'){
				// 改变样式
				$this.addClass('active').siblings('.sort-item').removeClass('active');
				// 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_desc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
			};
			// 重新加载页面
			_this.loadList();
		})
	},

	// 加载产品列表
	loadList: function() {
		var _this     = this;
		var listParam = this.data.listParam;
		var $pListCon = $('.p-list-con');
		var listHtml  = '';
		// 先放入加载的图片
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);

        // 请求数据
        _product.getProductList(
        	// 数据 
        	listParam,
        	// 成功
        	function(res) {
        		// 加载商品list
        		listHtml = _mytools.renderHtml(prodcutTpl, {list: res.data.list});
        		$pListCon.html(listHtml);

        		// 加载分页信息
        		// 判断是否已经初始化 如果初始化过了 则不再初始化
        		var isInited = $("#page-con").pagination();
        		if(!isInited) {
        			_this.loadPagination(res);
        		}else{
        			return
        		}
        	},
        	// 失败
            function(errMsg){
                _mytools.errorTips(errMsg);
            }
        )
	},

	// 加载分页信息
	loadPagination: function(res) {
		var _this     =   this;
		var $total    =   res.data.total;
		var $pageSize =   res.data.pageSize
		$('#page-con').pagination({
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
			_this.loadList()

		})
	}
};

$(function() {
	list.init()
})