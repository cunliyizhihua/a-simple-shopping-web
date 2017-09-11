/*
* @Author: p
* @Date:   2017-07-14 08:01:36
* @Last Modified by:   p
* @Last Modified time: 2017-07-14 08:02:09
*/

'use strict';
var _mytools = require('util/mytools.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收件人
    save : function(addressInfo, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人
    update : function(addressInfo, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除收件人
    deleteAddress : function(shippingId, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId, resolve, reject){
        _mytools.request({
            url     : _mytools.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _address;