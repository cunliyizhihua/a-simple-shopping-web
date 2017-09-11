var _mytools = require('util/mytools.js');
var _user    = require('service/user-service.js');
require('util/validation/index.js');

require('./index.less');
require('page/common/nav/index.js');
require('page/common/nav-simple/index.js');

var page = {
	init: function() {
		this.bindEvent()
	},

	// 方法
	bindEvent:function() {
		var _this = this;
		// 验证表单
		$('#login-form').validate({
			rules: {
				username: 'required',
				password: 'required'
			},
			messages: {
				username: '用户名不能为空',
				password: '密码不能为空'
			},
			errorPlacement:function(error,element) {  
				error.appendTo($('.error-tip'));
			}
		});
		// 点击登录
		$('.submit-button').click(function(){
			_this.submit()
		});
		// enter 登录
		$('.item-content').keyup(function(e) {
			// console.log(e.keyCode);
			if(e.keyCode === 13) {
				_this.submit()
			}
		})
	},

	// 表单提交
	submit: function() {
		var formData = {
			username : $.trim($('#username').val()),
      		password : $.trim($('#password').val())
		};

		// 如果表单合法
		var isOk = $('#login-form').valid();
		if(isOk) {
			_user.login(
				// 数据
				formData,
				// 成功回调 返回上一页 或者首页
				function(res) {
					window.location.href = _mytools.getUrlParam('redirect') || './index.html';
				},
				function(errMsg){
			        _mytools.errorTips(errMsg);
			    }
			)
		}
	}

}

$(function() {
	page.init({})
})