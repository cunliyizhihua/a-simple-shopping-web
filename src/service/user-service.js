/*
* @Author: p
* @Date:   2017-06-28 19:23:47
* @Last Modified by:   p
* @Last Modified time: 2017-07-05 16:55:38
*/

'use strict';

// 引入工具包
var _mytools = require('util/mytools.js');

var _user = {
	// 用户登录
  login : function(userInfo, resolve, reject){
     _mytools.request({
      url     : _mytools.getServerUrl('/user/login.do'),
      data    : userInfo,
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 检查用户名
  checkUsername : function(username, resolve, reject){
    _mytools.request({
      url     : _mytools.getServerUrl('/user/check_valid.do'),
      data    : {
        type  : 'username',
        str   : username
      },
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 用户注册
  register : function(userInfo, resolve, reject){
    _mytools.request({
      url     : _mytools.getServerUrl('/user/register.do'),
      data    : userInfo,
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
	// 退出登录
	logout: function(resolve, reject) {
		_mytools.request({
			url: _mytools.getServerUrl('/user/logout.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		})
	},
	// 检查登录状态
	checkLogin   :  function(resolve, reject) {
		_mytools.request({
			url      : _mytools.getServerUrl('/user/get_user_info.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		})
	},
  // 获取用户密码提示问题
  getQuestion  : function(username, resolve, reject){
    _mytools.request({
      url      : _mytools.getServerUrl('/user/forget_get_question.do'),
      data     : {username : username},
      method   : 'POST',
      success  : resolve,
      error    : reject
    });
  },
  // 检查密码提示问题答案
  checkAnswer  : function(userInfo, resolve, reject){
    _mytools.request({
      url      : _mytools.getServerUrl('/user/forget_check_answer.do'),
      data     : userInfo,
      method   : 'POST',
      success  : resolve,
      error    : reject
    });
  },
  // 重置密码
  resetPassword : function(userInfo, resolve, reject){
    _mytools.request({
      url       : _mytools.getServerUrl('/user/forget_reset_password.do'),
      data      : userInfo,
      method    : 'POST',
      success   : resolve,
      error     : reject
    });
  },
  // 获取用户信息
  getUserInfo : function(resolve, reject){
    _mytools.request({
      url     : _mytools.getServerUrl('/user/get_information.do'),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 更新个人信息
  updateUserInfo : function(userInfo, resolve, reject){
    _mytools.request({
      url     : _mytools.getServerUrl('/user/update_information.do'),
      data    : userInfo,
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 登录状态下更新密码
  updatePassword : function(userInfo, resolve, reject){
    _mytools.request({
      url     : _mytools.getServerUrl('/user/reset_password.do'),
      data    : userInfo,
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  }
}

module.exports = _user;