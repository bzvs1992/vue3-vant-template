/* eslint-disable */
const path = require("path");
const autoprefixer = require("autoprefixer");
const px2vw = require("postcss-px-to-viewport");
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
    publicPath: "/",
    outputDir: "dist",
    parallel: false, // 打包时是否为ts和babel用多线程
    productionSourceMap: false, // 关闭生产环境的sourceMap
    // 配置代理
    devServer: {
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "http://api.gcourt.cn/",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            "/api_course": {
                target: "http://api.gcourt.cn/",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    configureWebpack: {
        // 使用ts-important-plugin 动态引入
        module: {
            rules: [{
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [ tsImportPluginFactory( {
                            libraryName: 'vant',
                            libraryDirectory: 'es',
                            style: true
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                exclude: /node_modules/
            }]
        },
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@com", resolve("./src/components"))
            .set("@view", resolve("./src/views"))
            .set("@static", resolve("./static"))
            .set("@src", resolve("./src"));
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    hack: `true; @import "~@src/assets/css/theme.less";`
                }
            },
            postcss: {
                plugins: [
                    autoprefixer(),
                    px2vw({
                        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        unitPrecision: 8, // 指定`px`转换为视窗单位值的小数位数
                        viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
                        selectorBlackList: [".ignore", ".hairlines", "van"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                        minPixelValue: 0.5, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                        mediaQuery: false // 允许在媒体查询中转换`px`
                    })
                ]
            }
        }
    }
};

// 路径映射
function resolve(dir) {
    return path.join(__dirname, dir);
}
