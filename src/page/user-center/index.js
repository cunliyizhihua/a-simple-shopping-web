'use strict'


require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mytools    = require('util/mytools.js');
var _user       = require('service/user-service.js');
var navSide     = require('page/common/nav-side/index.js');
var userinfoTpl = require('./index.string')

var userCenter = {
	
	// 初始化
	init: function() {
		// 左侧列表
		navSide.init({name:'user-center'})

		// 加载用户信息
		this.loadUserInfo()
	},

	loadUserInfo: function() {
		_user.getUserInfo(
			function(res) {
				// console.log(res);
				var html = _mytools.renderHtml(userinfoTpl,res.data);
				$('.user-info').html(html);

			},
			function(errMsg){
	          _mytools.errorTips(errMsg);
	        }

		)
	}
};

$(function() {
	userCenter.init()
})