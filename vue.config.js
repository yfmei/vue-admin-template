const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // lintOnSave: true,
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {
  //     css: {
  //       // options here will be passed to css-loader
  //     },
  //     postcss: {
  //       // options here will be passed to postcss-loader
  //     }
  //   },
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
  chainWebpack: (config) => {
    config.devtool("#inline-source-map")
    // 生产环境才混淆压缩代码
    // config.when(process.env.NODE_ENV === "production",
    //   config => config.plugin("minify").use(MiniCssExtractPlugin),
    //   config => config.devtool("source-map")
    // )
    config.devtool("source-map")
    config.resolve.extensions
      .add(".js'")
      .add(".vue'")
      .add(".json'")

    config.resolve.alias
      .set("@", resolve("src"))
      .set("api", resolve("src/api"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("store", resolve("src/store"))
      .set("style", resolve("src/style"))
      .set("util", resolve("src/util"))
      .set("views", resolve("src/views"))

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        return options
      })
  },

  configureWebpack: {
    plugins: [
      //  压缩 css 插件
      new MiniCssExtractPlugin({
        filename: "styles/[name].css"
      })
    ]
  },
  publicPath: process.env.NODE_ENV === "production"
    ? "./"
    : "./",
  outputDir: "dist",
  assetsDir: "./"
}
