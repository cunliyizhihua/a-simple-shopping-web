'use strict'

require('./index.less')
require('page/common/nav-simple/index.js')
var _user      = require('service/user-service.js');
var _mytools   = require('util/mytools.js');

// 表单里的错误提示
var formError = {
  show : function(errMsg){
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide : function(){
    $('.error-item').hide().find('.err-msg').text('');
  }
};

// 逻辑部分
var page = {
  data : {
    username    : '',
    question    : '',
    answer      : '',
    token       : ''
  },
    init: function() {
    this.onload();
        this.bindEvent();
    },
  onload: function() {
    this.loadStepUsername();
  },
    bindEvent: function() {
        var _this = this;
        // 输入用户名之后 点击下一步
    $('#submit-username').click(function() {
      var username = $.trim($('#username').val())
      // 用户名存在
      if(username){
        _user.getQuestion(
          username,
          // 请求成功
          function(res){
            // 将这些数据保存在data对象里面 方便复用
            _this.data.username = username;
            _this.data.question = res.data;
            // 然后运行第二步
            _this.loadStepQuestion();
          },
          // 请求失败
          function(errMsg){
            formError.show(errMsg);
          }
        );
      }
      // 用户名不存在
      else{
        formError.show('请输入用户名');
      }
    });
    // 完成上一步之后,输入提示问题的答案,然后点击
    $('#submit-question').click(function() {
      var answer = $.trim($('#answer').val());
      if(answer) {
        _user.checkAnswer(
          // 检查密码提示问题答案
          {
            username : _this.data.username,
            question : _this.data.question,
            answer   : answer
          },
          // 成功之后 记录答案 然后进行第三步
          function(res){
            _this.data.answer   = answer;
            _this.data.token    = res.data;
            _this.loadStepPassword();
          },
          // 请求失败,错误提示
          function(errMsg){
            formError.show(errMsg);
          }
        )
      } else {
        formError.show('请输入密码提示问题答案');
      }
    });
    // 输入新密码后的按钮点击
    $('#submit-password').click(function(){
      var password = $.trim($('#password').val());
      // 密码不为空
      if(password && password.length >= 6){
        // 检查密码提示问题答案
        _user.resetPassword(
        {
          username        : _this.data.username,
          passwordNew     : password,
          forgetToken     : _this.data.token
        }, 
        function(res){
          window.location.href = './result.html?type=pass-reset';
        }, 
        function(errMsg){
          formError.show(errMsg);
        });
      }
      // 密码为空
      else{
          formError.show('请输入不少于6位的新密码');
      }
    });
    },
  // step1: 加载用户名
  loadStepUsername: function() {
    $('.step-username').show();
  },
  // step2: 加载输入 密码提示问题 
  loadStepQuestion: function() {
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(this.data.question);
  },
  // step3: 加载password
  loadStepPassword : function(){
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-question').hide()
        .siblings('.step-password').show();
  }
    
}

$(function(){
    page.init()
})