'use strict'

require('./index.less');
require('page/common/nav-simple/index.js');

var _mytools = require('util/mytools.js');

$(function(){
	// 默认default-success显示
    var type      =  _mytools.getUrlParam('type') || 'default';
    var $element  =  $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})