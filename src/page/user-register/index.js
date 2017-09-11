
'use strict';

require('page/common/nav-simple/index.js');
require('./index.less');

var _mytools = require('util/mytools.js');
var _user    = require('service/user-service.js');
require('util/validation/index.js');

// 我要干什么?
// 1. 验证表单
// 2. 验证通过之后, 提交
// 3. 有一个异步验证 当输入用户名框框失去焦点之后 进行账户名是否已经被注册过


var register = {
	// 初始化
	init: function() {
		this.bindEvent()
	},

	// 方法
	bindEvent: function() {
		var _this = this;

		// 异步验证账户是否已经存在
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			// 如果用户名为空，我们不做验证
            if(!username){
            	$('.test').text('用户名不能为空')
                return;
            }
            _user.checkUsername(
                username,
                function(res){
                    $('.test').text('')
                }, 
                function(errMsg){
                    $('.test').text(errMsg)
                }
            );
		});

		// 验证表单
		$('#register-form').validate({
			rules: {
				// username: 'required',
				password: {
			        required: true,
			        minlength: 6
			    },
			    confirm_password: {
			        required: true,
			        minlength: 6,
			        equalTo: "#password"
			    },
			    email: {
			    	required: true,
			    	email: true
			    },
			    phone: {
			    	required: true,
			    	phone: true
			    }
			},
			messages: {
				// username: '用户名不能为空',
				password: {
			        required: "密码不能为空",
			        minlength: "密码长度不能小于6位"
			    },
			    confirm_password: {
			    	required: "密码不能为空",
			        minlength: "密码长度不能小于6位",
			        equalTo: '两次输入的密码不一致'
			    },
			    email: {
			    	required: '邮箱不能为空',
			    	email: '邮箱格式不正确'
			    },
			    phone: {
			    	required: '手机号码不能为空',
			    	phone: '手机号格式不正确'
			    }
			},
			errorPlacement:function(error,element) {  
				 error.appendTo(element.parent('.item').next());
			},
		});

		// 提交
		$('#submit-reg-btn').click(function() {
			_this.submit();
		})
		$('.item-content').keyup(function(e) {
			if(e.keyCode == 13) {
				_this.submit();
			}
		})
	},

	// 提交
	submit: function() {
		// 表单不合法 return
		if(!$('#register-form').valid()){
			return;
		};
		// 获取表单的数据
		var formData = {
	            username        : $.trim($('#username').val()),
	            password        : $.trim($('#password').val()),
	            passwordConfirm : $.trim($('#confirm_password').val()),
	            phone           : $.trim($('#phone').val()),
	            email           : $.trim($('#email').val()),
	            question        : $.trim($('#question').val()),
	            answer          : $.trim($('#answer').val())
	        };
	    // 把数据传到服务器
	    _user.register(
	    		// 参数
				formData,
				// 成功回调
				function(res) {
					// console.log('注册成功,马上跳转到注册成功提示页')
					window.location.href = './result.html?type=register'				
				},
				// 失败回调
				function(errMsg) {
					// 注册失败
				}
	    	)

	}
}

$(function() {
	register.init()
})