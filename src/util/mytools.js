/*
 * @Author: p
 * @Date:   2017-07-20 09:21:04
 * @Last Modified by:   p
 * @Last Modified time: 2017-07-20 09:30:22
 */

'use strict';

var Hogan = require('hogan.js');
var conf = {
    // 数据库的ip??
    serverHost: ''
}

var _mytools = {
    // 网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                // 如果请求成功 返回数据
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res)
                }
                // 没有登录状态, 需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        });
    },
    // 获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: function(name) {
        // '以空或者&开头'
        // 以= 非&的其他字符串 *匹配1个或多个 以等号或者空为结尾
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        // 如果有result 那么返回 解码(..) 否则返回空
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板方法
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function(msg) {
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips: function(msg) {
        alert(msg || '哪里不对了~');
    },

    // 跳转到登录界面 而且参数等于当前网站目录
    doLogin: function() {
        // console.log('正跳转到登录界面');
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    // 返回主页
    goHome: function() {
        window.location.href = './index.html'
    }
};

module.exports = _mytools;