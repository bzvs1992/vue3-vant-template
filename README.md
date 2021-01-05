# 基于 vue3.x+Ts+Webpack+Vant 的移动端开发脚手架

### 1. 调整 eslint 与 prettier 的冲突

```JavaScript
    // .eslinrc.js
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        indent: ["warn", 4]
    }
    // editorconfig 团队协作,不同ide下的一致性
    root = true
    [*]
    charset = utf-8
    indent_style = space
    indent_size = 4
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
    // .vscode>.settings.json, 同步开启vscode插件eslint
    {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        }
    }
```

### 2. 配置 vue.config.js 以及环境变量

根目录创建 `.env`, `.env.production`, `.env.development`, 不用区分环境的 写在`.env`, 变量以 `VUE_APP`开头 例如`VUE_APP_API`

以及 alias, 全局 css reset 文件 less 文件

## 3. 使用 vw 进行适配

```javascript
yarn add postcss-px-to-viewport

// vue.config.js
const autoprefixer = require("autoprefixer");
const px2vw = require("postcss-px-to-viewport");

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
```

## 4. 安装配置 vant

```javascript
yarn add vant@next ts-import-plugin

// vue.config.js
// 使用ts-important-plugin 动态引入
// 1. 配置动态引入
configureWebpack: {
    module: {
        rules: [
            {
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
            }
        ]
    },
},
// 2. 创建 /plugins/vantImport.ts 并在 main.js中use此插件, 用到组件 在此全局引入一次即可
```

## 5. vue-router 的设置

vueRouter 和之前没什么区别,模块划分和配置都和以前一样即可,但部分地方有改动, 以前可以使用`<keep-alive></keep-alive>`和`<transition></transition>`包裹`<router-view/>`标签, 但是现在现在不可以

```html
<!-- 使用keepAlive优化, 这里写法不同于2.x版本 -->
<router-view class="view" v-slot="{ Component }">
    <keep-alive :include="url">
        <component :is="Component" />
    </keep-alive>
</router-view>
```

## 6. vuex 的配置

vuex 的配置基本没有变, 但是方法变了, 具体看项目

## 7. axios 的封装

具体看`utils/request`和`utils/http`文件
