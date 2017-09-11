'use strict'


require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');

require('util/validation/index.js');

var _mytools    = require('util/mytools.js');
var _user       = require('service/user-service.js');
var navSide     = require('page/common/nav-side/index.js');


var userPassUpadate = {
	init: function() {
		this.onload()
	},

	onload: function() {
		var _this = this;
		navSide.init({name: 'user-pass-update'})
		// 验证表单
		this.test();
		// 提交验证
		$('.updatepassword').click(function() {
			_this.submit();
		});
		$('.content').keyup(function(e){
			if(e.keyCode == 13) {
				_this.submit();
			}
		})
	},

	// 表单验证方法
	test: function() {
		$('#update-pass').validate({
			rules: {
				oldpass: {
					required: true,
					minlength: 6
				},
				newpass: {
					required: true,
					minlength: 6
				},
				confirm: {
					required: true,
					equalTo: "#newpass"
				}
			},
			messages: {
				oldpass: {
					required: '输入不能为空',
					minlength: '密码长度不能小于6位'
				},
				newpass: {
					required: '输入不能为空',
					minlength: '密码长度不能小于6位'
				},
				confirm: {
					required: '输入不能为空',
					equalTo: '两次输入密码不一致'
				}
			}
		})
	},

	// 提交
	submit: function() {
		if(!$('#update-pass').valid()) {
			return;
		};
		// 表单信息
		var info = {
			oldpass: $.trim($('#oldpass').val()),
			newpass: $.trim($('#newpass').val())
		};
		_user.updatePassword(
			// 参数必须是下面这种格式
            {
                passwordOld : info.oldpass,
                passwordNew : info.newpass
            },
            function(res, msg){
                _mytools.successTips(msg)
            },
            function(errMsg){
                _mytools.errorTips(errMsg);
            }
        );		
	}

}

$(function() {
	userPassUpadate.init()
})