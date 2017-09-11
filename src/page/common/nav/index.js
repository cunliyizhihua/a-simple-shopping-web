/*
* @Author: p
* @Date:   2017-07-19 16:19:58
* @Last Modified by:   p
* @Last Modified time: 2017-07-19 17:36:57
*/

'use strict';

require('./index.less');

var _mytools = require('util/mytools.js');
var _user    = require('service/user-service.js');

// 我要实现的功能
// 1. 收藏网站功能
// 2. 加载用户信息
// 3. 退出登录

var nav = {
	// 初始化
	init: function() {
		this.bindEvent();
		// 加载用户信息
		this.loadUserInfo();
	},

	// 方法
	bindEvent: function(){
		// 登录点击
		$('.js-login').click(function() {
			_mytools.doLogin()
		});
		// 注册点击
		$('.js-register').click(function() {
			window.location.href = './user-register.html';
		});
		// 退出登录
		$('.js-logout').click(function() {
			_user.logout(
				// logout有两个参数
				// 参数1: 成功执行函数
				function(res) {
					//浏览器重新从服务器请求资源,在http请求头中不会包含缓存标记。
					window.location.reload();
				},
				// 参数2: 失败
				function(errMsg) {
					_mytools.errorTips(errMsg);
				}
			);
		});

		// 收藏网站
		$('#save-web').click(function() {
		    var url = window.location;
		    var title = document.title;
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.indexOf("360se") > -1) {
		      	alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
		    }
		    else if (ua.indexOf("msie 8") > -1) {
		      	window.external.AddToFavoritesBar(url, title); //IE8
		    }
		    else if (document.all) {
		      try{
		        	window.external.addFavorite(url, title);
		      }catch(e){
		        	alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		      }
		    }
		    else if (window.sidebar) {
		      	window.sidebar.addPanel(title, url, "");
		    }
		    else {
		      	alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		    }
		})
	},

	// 加载用户信息
	loadUserInfo: function() {
		_user.checkLogin(
			// 成功
			function(res) {
				// 隐藏登录注册
				$('.user.not-login').hide()
					.siblings('.user.login').show()
					.find('.username').text(res.data.username);
			},
			// 失败
			function(errMsg) {
				// do nothing
			}

		)
	}

}

module.exports = nav.init();