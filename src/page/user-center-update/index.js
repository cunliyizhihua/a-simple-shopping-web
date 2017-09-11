'use strict'


require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mytools    = require('util/mytools.js');
var _user       = require('service/user-service.js');
var navSide     = require('page/common/nav-side/index.js');
var infoUpTpl   = require('./index.string')

// 表单验证插件
require('util/validation/index.js');


var userCenterUpdate = {
	init: function() {
		// 初始化
		this.onloade();
		this.bindEvent()
	},

	// 初始化
	onloade: function() {
		// 左侧菜单
		navSide.init({name: 'user-center'});
		// 加载用户信息
		this.loadUserInfo()
	},

	// 方法
	bindEvent: function() {
		var _this = this;
		$(document).on('click', '.updateinfo', function() {
			_this.submit()
		});
		$(document).on('keyup', '.content', function(e) {
			if(e.keyCode !== 13) {return};
			_this.submit()
		});

	},

	// 加载用户信息
	loadUserInfo: function() {
		var _this = this;
		_user.getUserInfo(
			function(res) {
				// console.log(res);
				var xhtml = _mytools.renderHtml(infoUpTpl,res.data);
				$('.user-info').html(xhtml);
				_this.test()
			},
			function(errMsg){
	          _mytools.errorTips(errMsg);
	        }

		);
	},

	// 提交
	submit: function() {
		var info = {
			phone       : $.trim($('#phone').val()),
            email       : $.trim($('#email').val()),
            question    : $.trim($('#question').val()),
            answer      : $.trim($('#answer').val())
		};
		// 数据更新
		_user.updateUserInfo(
            info,
            function(res, msg){
                _mytools.successTips(msg);
                window.location.href = './user-center.html';
                
            },
            function(errMsg){
                _mytools.errorTips(errMsg);
            }
        );
	},

	// 表单验证
	test: function() {
		console.log('调用验证方法')
		$('#update-form').validate(			

			$('#answer').rules('add',{
				required: true,
				messages: {
					required: '输入不能为空'
				}
			})
		)
		
	}
};

$(function() {
	userCenterUpdate.init()
})