/*
* @Author: p
* @Date:   2017-07-19 13:28:52
* @Last Modified by:   p
* @Last Modified time: 2017-07-20 10:43:46
*/

'use strict';

require('./index.less')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var bannerTpl = require('./banner.string')

// 工具包
var _mytools = require('util/mytools.js');
// 轮播图
require('util/slider/index.js')

$(function() {
	// 鼠标移到左侧导航栏
	$('.keywords-item').hover(
		function(){
			$(this).addClass('mousehover')
				.find('.left-sub-list').show()
			
		},
		function() {
			$(this).removeClass('mousehover')
				.find('.left-sub-list').hide()
		}
	);

	// 把banner渲染到页面
	var bannerHtml = _mytools.renderHtml(bannerTpl);
	$('.banner-con').html(bannerHtml);

	// 初始化unslider 然后设置前后箭头点击
	// http://www.bootcss.com/p/unslider/
	var unslider = $('.banner').unslider({dots: true});
	$('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];
        unslider.data('unslider')[fn]();
    });

    
	// 滚动事件
    $(window).scroll(function() {
    	var top       = $(document).scrollTop();
    	var $floors   = $('.floor');
	    var $menu     = $('.menu');
	    var currentId = '';
	    // 当document.body.scrollTop >500 侧边楼层导航show
	    top > 300 ?  $menu.show() : $menu.hide()

	    // 便利所有层的 得到他的offsetTop 
	    $floors.each(function() {
	    	var $this = $(this);
	    	if(top > $this.offset().top - 300){
	    		currentId = '#' +  $this.attr('id');
	    	}else{
	    		return false;
	    	}
	    })

	    var currentLink = $menu.find('.current');
	    var $a = $menu.find('a[href="'+currentId+'"]');
	    if(currentId && currentLink != currentId){
	    	currentLink.removeClass('current');
	    	$a.addClass('current')
	    }


    }) 
})