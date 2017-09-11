/*
* @Author: p
* @Date:   2017-06-29 07:59:15
* @Last Modified by:   p
* @Last Modified time: 2017-07-08 20:26:32
*/

'use strict';

var _mytools = require('util/mytools.js');
var _cart = {
	// 获取购物车数量
	getCartCount: function(resolve, reject) {
		_mytools.request({
			url: _mytools.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	},
	// 加入购物车
	addToCart : function(productInfo, resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/add.do'),
          data    : productInfo,
          success : resolve,
          error   : reject
      });
  },
  // 获取购物车列表
  getCartList : function(resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/list.do'),
          success : resolve,
          error   : reject
      });
  },
  // 选择购物车商品
  selectProduct : function(productId, resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/select.do'),
          data    : {
              productId : productId
          },
          success : resolve,
          error   : reject
      });
  },
  // 取消选择购物车商品
  unselectProduct : function(productId, resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/un_select.do'),
          data    : {
              productId : productId
          },
          success : resolve,
          error   : reject
      });
  },
  // 选中全部商品
  selectAllProduct : function(resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/select_all.do'),
          success : resolve,
          error   : reject
      });
  },
  // 取消选中全部商品
  unselectAllProduct : function(resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/un_select_all.do'),
          success : resolve,
          error   : reject
      });
  },
  // 更新购物车商品数量
  updateProduct : function(productInfo, resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/update.do'),
          data    : productInfo,
          success : resolve,
          error   : reject
      });
  },
  // 删除指定商品
  deleteProduct : function(productIds, resolve, reject){
      _mytools.request({
          url     : _mytools.getServerUrl('/cart/delete_product.do'),
          data    : {
              productIds : productIds
          },
          success : resolve,
          error   : reject
      });
  }
}

module.exports = _cart