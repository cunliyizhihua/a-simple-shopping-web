//引入webpack plugins里面有用到
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量设置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 返回HtmlWebpackPlugin插件参数
var getHtmlConfig = function(name,title) {
  return {
      // 模板
      template  : './src/view/'+name+'.html',
      // 输出 dist/view/ 名称index.html
      filename  : 'view/'+name+'.html',
      // 生成
      title     : title,
      inject    : true,
      hash      : true,
      chunks    : ['common',name],
      favicon   : './favicon.ico'
    }
}

// webpack config
var config = {
  entry: {
    'common'               : ['./src/page/common/index.js'],
    'result'               : ['./src/page/result/index.js'],
    'index'                : ['./src/page/index/index.js'],
    'user-login'           : ['./src/page/user-login/index.js'],
    'user-register'        : ['./src/page/user-register/index.js'],
    'user-center'          : ['./src/page/user-center/index.js'],   
    'user-center-update'   : ['./src/page/user-center-update/index.js'],
    'user-pass-update'     : ['./src/page/user-pass-update/index.js'],
    'user-pass-reset'      : ['./src/page/user-pass-reset/index.js'],
    'list'                 : ['./src/page/list/index.js'],
    'detail'               : ['./src/page/detail/index.js'],
    'cart'                 : ['./src/page/cart/index.js'],
    'order-confirm'        : ['./src/page/order-confirm/index.js'],
    'order-list'           : ['./src/page/order-list/index.js'],
    'order-detail'         : ['./src/page/order-detail/index.js'],
    'payment'              : ['./src/page/payment/index.js']
  },
  output: {
    // 生成文件存放目录
    path      :  __dirname + '/dist/',
    // 判断是否是开发环境
    publicPath:  'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
    filename  :  'js/[name].js'
  },
  // 配置别名
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util        : __dirname + '/src/util',
      page        : __dirname + '/src/page',
      image       : __dirname + '/src/image',
      service     : __dirname + '/src/service'
    }
  },
  module: {
    loaders: [
      // 考虑到兼容 使用webpack自带的js编译 无需神马babel-loader.....
      // css
      // {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      {
        test : /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      // 图片
      { 
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)\??.*$/, 
        loader: 'url-loader',
        // 注意 这里其实是需要fileloader的
        query: {
          limit: 8192,
          name: 'resourse/[name].[ext]'
        }
      },
      {
        test: /\.string$/, 
        loader: 'html-loader',
        query : {
          minimize : true,
          // 压缩的时候 不要删除引号
          removeAttributeQuotes : false
        }
      }
    ]
  },
  externals: {
    'jquery':'window.jQuery'
  },
  plugins: [
    // 因为这个是自带的插件,所以不需要require插件???
    //  默认会把所有入口节点的公共代码提取出来,生成一个common.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 把css单独打包到文件里 
    new ExtractTextPlugin("css/[name].css"),
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index'              ,   '首页'        )),
    new HtmlWebpackPlugin(getHtmlConfig('result'             ,   '成功提示'    )),
    new HtmlWebpackPlugin(getHtmlConfig('user-login'         ,   '欢迎登录'    )),
    new HtmlWebpackPlugin(getHtmlConfig('user-register'      ,   '注册新账户'  )),
    new HtmlWebpackPlugin(getHtmlConfig('user-center'        ,   '用户中心'    )),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update' ,   '个人信息更新')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update'   ,   '密码更新'    )),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset'    ,   '忘记密码重设')),
    new HtmlWebpackPlugin(getHtmlConfig('list'               ,   '商品列表页面')),
    new HtmlWebpackPlugin(getHtmlConfig('detail'             ,   '商品详情页面')),
    new HtmlWebpackPlugin(getHtmlConfig('cart'               ,   '购物车'      )),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm'      ,   '订单确认'    )),
    new HtmlWebpackPlugin(getHtmlConfig('order-list'         ,   '订单列表'    )),
    new HtmlWebpackPlugin(getHtmlConfig('order-detail'       ,   '订单详情'    )),
    new HtmlWebpackPlugin(getHtmlConfig('payment'            ,   '支付页面'    ))
  ],


  // 代理配置
  devServer: {
    proxy: {
      '/user': {
        target: 'http://happymmall.com',
        changeOrigin: true,
        secure: false
      },
      '/product': {
        target: 'http://happymmall.com',
        changeOrigin: true,
        secure: false
      },
      '/cart': {
        target: 'http://happymmall.com',
        changeOrigin: true,
        secure: false
      },
      '/order': {
        target: 'http://happymmall.com',
        changeOrigin: true,
        secure: false
      },
      '/shipping': {
        target: 'http://happymmall.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
  
};

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8001/');
}

module.exports = config;