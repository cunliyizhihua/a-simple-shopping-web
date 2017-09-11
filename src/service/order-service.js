/*
* @Author: p
* @Date:   2017-07-14 07:59:52
* @Last Modified by:   p
* @Last Modified time: 2017-07-14 08:01:25
*/

'use strict';
var _mytools = require('util/mytools.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;