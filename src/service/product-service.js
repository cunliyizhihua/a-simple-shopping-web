/*
* @Author: p
* @Date:   2017-07-06 13:55:28
* @Last Modified by:   p
* @Last Modified time: 2017-07-06 13:55:58
*/

'use strict';
var _mytools = require('util/mytools.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;