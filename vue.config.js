"use strict";
const path = require("path");
// const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "威尔药业·智慧检测管理系统"; // page title

const port = 8080;

module.exports = {
  publicPath: "./",
  assetsDir: "public",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // 在webpack的名称字段中提供应用程序的标题，以便
    //可以在index.html中对其进行访问以注入正确的标题
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    config.resolve.alias.set('@images', resolve('./src/assets/images'));
    config.resolve.alias.set('@svg', resolve('./src/icons/svg'));
    config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg,

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

  }
}
