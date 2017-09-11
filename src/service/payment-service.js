/*
* @Author: p
* @Date:   2017-07-14 19:07:52
* @Last Modified by:   p
* @Last Modified time: 2017-07-14 19:08:54
*/

'use strict';

var _mytools = require('util/mytools.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取订单状态
    getPaymentStatus : function(orderNumber, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;