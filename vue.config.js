module.exports = {
  // 关闭ESLint语法检查
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // 转发的目标服务器
        target: 'http://39.98.123.211',
        // 是否把路径当中的/api去掉
        // pathRewrite: { '^/api': '' }, // 要不要去掉/api，要看接口路径里面有没有，如果有，那就不去
      },
    }
  }
}