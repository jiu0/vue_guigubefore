const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  productionSourceMap:false,  // 去掉打包生成的map 文件  map文件的作用是 检查打包时 文件具体报错的位置
  lintOnSave:false,  // 关闭eslint
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',　　/*publicPath 作用就是本地打开项目 url 后面拼接的域名*/

  // 将构建好的文件输出到哪里（或者说将编译的文件）  输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist': 'devdist',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    //name: name,
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js', // 改变main.js 引入vue 的指向    vue$ 这里要起个别名 不能用vue 
        '@': resolve('src'),
        '@modules': resolve('src/modules'),
        '@assets': resolve('src/assets'),
        '@vendor': resolve('vendor'),
        assets: resolve('src/assets'),
        components: resolve('src/components'),
        views: resolve('src/views'),
        apis: resolve('src/apis')
      }
    }
  },
  devServer: {
    proxy: {
        '/api':{ 
          target: "http://39.98.123.211",   // 访问 localhost:8080 就等于访问 https://www.rufeike.top
          changeOrigin: true, // 允许websockets跨域
          // pathRewrite: {
          //     '^/api':''
          // }
      },
    },
  },
}