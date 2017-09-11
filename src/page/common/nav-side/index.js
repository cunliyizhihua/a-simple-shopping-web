'use strict';

// 工具
var _mytools = require('util/mytools.js');

require('./index.less');
var navSideTpl = require('./index.string');

var navSide = {
	option: {
		name: '',
		navList: [
			{name : 'user-center', desc : '个人中心', href: './user-center.html'},
			{name : 'order-list', desc : '我的订单', href: './order-list.html'},
			{name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'}
		]
	},

	init: function(option) {
		// 根据传的值 来决定哪个高亮
		$.extend(this.option, option);
		this.rederNav();
	},

	rederNav: function() {
		var len = this.option.navList.length;
		for(var i = 0; i < len; i++) {
			// console.log(this.option);
			// 下面的不能用= 最低==
			if(this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}
		};

		// 渲染
		var navHtml = _mytools.renderHtml(navSideTpl,{navList: this.option.navList});

		// 把生成的页面插入html
		$('.nav-side').html(navHtml);
	}
}

// 待会在其他页面调用nvaSide.init(传真)
module.exports = navSide