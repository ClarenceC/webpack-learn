
# Webpack 深入浅出学习与总结

本文是阅读 **深入浅出 Webpack** 的学习笔记，书本[地址](http://webpack.wuhaolin.cn/),请购买纸质正版书籍。 

## 第一章入门

### 框架工具的发展

前端的发展越来越复杂，在架框越变复杂当中，直接编写JavaScript、CSS、HTML，已经无法应对全部功能的变化了，很多功能都虽要集成到项目中开发运行，比如模块化(CommonJS, AMD, CMD)，ES6或者更新ES2017 ES2018 新功能的装拼，样式文件的架框(SCSS, SASS, LESS)，TypeScript， Flow等，都需要架构装配到项目中。这时就需要构建项目来搭建了。

构建工具越来越多，都是向着配置简单，灵活，性能最好的方向发展从以前到现在的各构建工具：

NpmScript => Grunt => Gulp => Fis3 => Webpack | parcel 等。

### 安装Webpack

```javascript
npm i -D webpack //安装到本地项目依赖
npm i -g webpack //安装本全局
```

### 简述配置Webpack

webpack配置需要添加 `webpack.config.js` 文件在项目中。

```javascript
const path = require('path')

module.exports = {
    // JavaScript 执行入口文件
    entry: './main.js',
    // 出口文件
    output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist')
    }
}

```


### 简述配置 Loader
Loader 是具有文件转换功能的规则器，用来告诉 Webpack 在遇到哪些文件的时候使用那些 Loader 去加载和转换文件,以达到能出输到最终构建的文件里。

装载 Loader 写在 module.rules 里面，同时要在 npm 安装第三方插件 `npm i -D style-loader css-loader`
```javascript
const path = require('path')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname. './dist'),
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 css 文件
                test: /\.css$/,
                // 应该那个第三方插件 loader 来处理
                use: ['style-loader','css-loader?minimize']
            }
        ]
    },
    //or
    module: {
        rules: [
            {
                test: /\.css$/,
                use: {
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        }
                    }
                }
            }
        ]
    }
}
```


### 简述使用Plugin

Plugin 插件是用来扩展 Webpack 功能的， 通过在构建流程里面注入钩子实现，它给 Webpack 带来了很大的灵活性。

plugin插件是写在 plugins 中的，像下面这样
```javascript
const path = require('path')
// 通这 CommonJS 引入第三方插件包
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry : './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 钩子挂在 运行 css-loader 里面，运行的时候就会使用 ExtractTextPlugin 插件
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                }),
            }
        ]
    },
    plugins: [
        // 新建一个插件的对象
        new ExtractTextPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name]_[contenthash:8].css`,
        }),
    ]
}

```

当然在运行前，也需要安装 plugin `npm i -D extract-text-webpack-plugin`


### 简述使用 DevServer

在实际的开发中通常都需要使用到 HTTP 服务的，而 DevServer 就可以轻松模拟 HTTP 服务环境：
1. 提供 HTTP 服务而不是使用本地文件预览。
2. 监听文件的变化并自动刷新网页，做到实时预览。
3. 支持 Source Map, 以方便浏览的时候调试。

webpack-dev-server 也是以第三方存在的。

使用时需要安装 `npm i -D webpack-dev-server`

如果没有使用 `webpack` 生成构建文件， DevServer 会把 Webpack 构建出来的文件保存在内存中，在要访问输出的文件时，必须通过 HTTP 请求服务去访问的。

DevServer 同时有多个实用功能:
1. 实时预览
    
开启了实时预览后修改文件会实时显现到网页上面，除了 index.html。

2. 模块热替换

热模块技术开启后，可以在网站不重新加载的情况下替换模块。

3. 支持 Source Map 调试

在浏览器调试 JavaScript 代码中，你需要断点去调试问题这时 Source Map 能映射到你的源码中，而不是经过 Webpack 构建后的 js 代码。

### webpack 核心概念

- Entry: 主程序文件入口，Webpack 执行构建的第一步，重 Entry开始，可抽象成输入。
- Output: 输出构建的结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
- Module： 模块，在 Webpack 里一切都是模块，一个模块对应着一个文件，从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk: 代码块，一个 Chunk 由多个模块组合而成， 用于代码合并与分割。
- Loader: 模块转换器， 用于把模块原内容按照需求转换成新内容。
- Plugin: 扩展插件， 在 Webpack 构建流程中的特定时机注入扩展逻辑，挂载钩子来改变构建的结果或者做你想要做的事件。

DEMO0 [hello_webpack](/hello_webpack)

DEMO1 [hello_loader](/hello_devserver)

DEMO2 [hello_plugin](/hello_plugin)

DEMO3 [hello_devserver](/hello_devserver)



# 配置

## Entry

entry 是配置模块的入口，可抽象成输入， Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。**Entry** 是必填的，不填会报错。

### context

webpack 在寻找路径文件的时候会以 context 为根目录， context 默认执行启动在 Webpack 时所在的当前工作目录。context 必须是一个绝对路径的字符串。自己自定义的需要写在 `module.exports` 里面。context 是会影响到 Entry 所指的相对路径文件。

```javascript
    module.exports = {
        context: path.resolve(__dirname, 'app')
    }
```

或者 

在启动 Webpack 时带上 webpack --context。

### 入口Chunk

Webpack 会为每个生成的 Chunk 取一个名称，入口 Chunk 就会跟 Entry 的配置有关系了。

### Entry类型

可以是类型进行填写：

- string字符串 

入口模块的文件路径，是相对路径：
```javascript
    module.exports = {
        entry: './app/entry'
    }
```


- array数组

入口模块的路径，是数组的相对路径
```javascript
    module.exports = {
        entry: ['./app/entry1','./app/entry2']
    }
```
如果 entry 是一个 string 或者 array, 就会生成一个 Chunk, 这是 Chunk 的名称是 main.

- object是对像

可以用来配置多个入口
```javascript
    module.exports = {
        entry: {
            a: './app/entry-a',
            b: ['./app/entry-b1','./app/entry-b2']
        }
    }
```
如果 entry 是一个 object, 就可能会出现多个入口 Chunk, 这是 Chunk 的名称是 object 键值对里面的名称。比如 a b。

- 动态配置 Entry

如果项目里面有多个页面的入口 Entry, 而且这些入口是异步变化，不断增加的，这是 Entry 就不能写成静态的值。一般会设置成异步函数去返回上面的配置值。

```javascript
// 同步函数
    entry: () => {
        return {
            a: './pages/a',
            b: './pages/b',
        }
    }

// 异步函数
    entry: () => {
        return new Promise((resolve) => {
            resolve({
                a: './pages/a',
                b: './pages/b',
            })
        })
    }
```


## Output

output 配置是一个object对象,里面包含一些配置下面详细看看：

1. filename

`output.filename` 配置输出文件的名称，为string 类型。 如果只有一个输出的文件，则写成静态的:

```javascript
    module.exports = {
        entry: './main.js',
        output: {
            filename: 'bundle.js'
        }
    }
```

但是有多个 Chunk 要输出的时候，就需要借助模版和变量了。可以根据入口 Chunk 的名称来区分输出的文件名
变量有多种方式：

- `id` 变量名

    `filename: '[id].js'` 表示 Chunk 的唯一标识，从0开始。

- `name`变量名

    `filename: '[name].js'` 表示 Chunk 的名称。

- `hash`变量

    `filename: '[hash].js'` 表示 Chunk 的唯一标识 Hash 值。

- `chunkhash` 变量

    `filename: '[chunkhash].js'` 表示 Chunk 内容的 Hash 值.
    `hash` 和 `chunkhash` 长度都是可以指定的， [hash:8] 代表取8位 Hash 值，默认 20 位。

> 注意 ExtractTextWebpackPlugin 插件是使用 contenthash 来代表哈希值而不是 chunkhash， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。

2. chunkFilename

`output.chunkFilename` 是配置无入口的 Chunk 在输出时的文件名称。跟 filename 是不同的。

```javascript
    module.exports = {
        entry: './main.js',
        output: {
            // filename 是根据输入文件名，得出文件的比如 main.js。
            filename: '[name].js'
            // chunkFilename 是未被列在 entry 中,却又被 打包出来的文件命配置。会根据未列出来的打包成文件  tips.js 等。
            chunkFilename: '[name].js'
        }
    }
```

3. path 路径

`output.path` 配置输出文件存放在本地的目录路径，要是 string 类型的绝对路径。通常使用 Node.js 的 path 去获取绝对路径：

```javascript
    module.exports = {
        entry: './main.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist_[hash]')
        }
    }
```

4. publicPath 公共资源路径

`output.publicPath` 可以用来配置公共的异步资源，可以把原文件上传到 CDN 服务器上面，可以异步快速加载到 webpack 构建后的项目中。

5. crossOriginLoading

Webpack异步加载 JS 文件可以通过 `crossOriginLoading` 属性配置，`crossOriginLoading` 是通过 JSONP 方式实现的。

当如果使用 Webpack 去构建一个被其仔模块导入使用的库时，会使用到下面 `output` 属性:

- libraryTarget 和 library
- var 
- this
- window
- global
- libraryExport
- commonjs & commonjs2 等。

## Module

### 配置 Loader

还记得上一节配置过 **Loader** , **Loader** 是 `module` 里面的规则数组 `rules`,每个规则过滤不同要处理的文件，过滤后交给 **Loader** 去处理。

```javascript
    module: {
        rules: [
            {
                // 匹配上 js 文件
                test: /\.js$/, // test 也能写成数组
                // 用 babel-loader 转换 JavaScript 文件
                // ?cacheDirectory 表示传给 babel-loader 的参数,用于缓存 babel 编译结果加快重新编译速度
                use: ['babel-loader?cacheDirectory'],
                //or 如果多参数的时候，use 可以使用数组答对象来写，下面这个 use 等同于上面这个 use
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                        enforce: 'post' //执行顺序从后到前
                        //enforce: 'pre' 执行顺序从前到后
                    }
                ],
                // 只过滤 src 目录里面的 js 文件，加快 Webpack 搜索。
                include: path.resolve(__dirname, 'src')
                // or include 可以写成数组的方法
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'test')
                ]
            }, 
            {
                // 匹配上 SCSS 文件
                test: /\.scss$/,
                // 使用一组 Loader 去处理 SCSS 文件。
                // 处理顺序为从后到前，从 'sass-loader'到'style-loader'
                use: ['style-loader','css-loader','sass-loader'],
                // 不包含 node_modules 目录下的文件
                exclude: path.resolve(__dirname, 'node_modules'),
                // or exclude 很多的话可以写成数组
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'bower_modules'),
                ]
            },
            {
                // 对非文本文件采用 file-loader 加载
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: ['file-loader'],
            },
        ]
    }
```

### noParse

配置 noParse 可以配置些不需要模块化的文件比如 JQuery, ChartJS 等。

### parser

可以详细自定义模块化的类型，如下面：

```javascript
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                parser: {
                    amd: false,  //禁用 AMD
                    commonjs: false, // 禁用 CommonJS
                    system: false,  // 禁用 SystemJS
                    harmony: false, // 禁用 ES6 import export
                    requireInclude: false, //禁用 require.include
                    ...
                }
            }
        ]
    }
```


## Resolve

Resolve 也是写到 modules 里面的

```javascript
    module: {
        rules:[
            ...
        ],
        resolve: {
            // 别名 alias 用来配置 components 优化路径，当在 js 里面调用 components 下面组件的时候，可以直接使用 import Button from 'components/button'
            alias: {
                components: './src/components/'
                // or 支持 react结尾的匹配
                'react$': '/path/to/react.min.js'
            },
            // 在引入第三方模块的时候设置优先使用那份代码
            mainFields: ['browser','main'],
            // 在导入语句没带文件后缀时，尝试的后缀列表
            extensions: ['.js','.json'],
            // 设置去那里寻找第三方模块，可以优化你的查找速度
            modules: ['./src/components','node_modules'],
            // 配置描述你的第三方模块文件的名称，默认 package.json。
            descriptionFiles: ['package.json'],
            // 如果设置为 true 所有导入语句的文件都必须带后缀
            enforceExtension: true,
        }
    }
```

## Plgugin

Plugin 是第三方扩展的插件，可以帮助 Webpack 构建相关的事件，配置也不难。

```javascript
// 引入第三方 Plugin 插件包
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
    plugins: [
        // 所有页面都会用到的公共代码提取到 common 代码块中
        // 在 CommonsChunkPlugin 里面传入的参数，是插件提供的接口
        new CommonsChunkPlugin({
            name: 'common',
            chunks: ['a','b']
        })
    ]
}

```

## devServer

- `devServer.hot` 热模块替换功能

- `devServer.inline` 开启后会自动注入代码，刷新网页实现实时预览。

- `devServer.historyApiFallback` 开启后对匹配好的路由都返回一个对应的 HTML 文件。或者可以自定义 `historyApiFallback` 匹配的路径文件。

- `devServer.contentBase` 配置 DevServer HTTP 服务器的文件根目录。会暴露本地文件。

- `devServer.headers` 可以设置 HTTP 响应头。

- `devServer.port` 配置 DevServer 的服务监听端口

- `devServer.allowedHosts` 配置一个白名单列表里，只有里面的才能 HTTP 请求正常返回。

- `devServer.https` 用来配置是否使用 HTTPS 协议，和可以自定义要使用的证书。

- `devServer.clientLogLevel` 可以配置客户端日志等级，会影响到你在浏览器控制台所看到的日志内容。

- `devServer.compress` 配置是否启用 gzip 压缩。

- `devServer.open` 配置是否第一次启动后打开系统默认浏览器去打开网页。


## 其它配置项

1. Target 用来配置 Webpack 构建出不同运行环境的代码

    | target值 | 描述 |
    | -------- |:----|
    | web | 针对浏览器(默认), 所有代码都集中在一个文件里|
    | node | 针对 Node.js 使用 require 语句加载 Chunk 代码|
    |async-node| 针对Node.js,异步加载 Chunk 代码|
    |webworker| 针对 WebWorker|
    |electron-main| 针对 Electorn 主线程 |
    |electron-renderer | 针对 Electron 渲染线程 |

2. Devtool

    devtool 配置 Webpack 如何生成 Source Map, 默认值是 false 不生成 Source Map

```javascript
    module.export = {
        devtool: 'source-map'
    }
```

3. Watch 和 WatchOptions

设置 watch 可以打开 webpack 的监听模式，默认是关闭的：
在DevServer 监听是默认开启的：

```javascript
    module.export = {
        // 默认为 false, 不开启
        watch: true,
        // 开启监听模式时， watchOptions 才有意义
        watchOptions: {
            // 不监听文件或文件夹，支持正则
            ignored: /node_modules/,
            // 监听到变化后会等 300ms 再去执行动作，
            // 默认为 300ms
            aggregateTimeout: 300,
            // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
            // 默认每秒问 1000 次
            poll: 1000
        }
    }
```

4. Externals

设置 Externals 后， Webpack 构建代码中会忽略这些模块，不会打包进 Chunk.

```javascript
    module.export = {
        externals: {
            // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
            jquery: 'jQuery'
        }
    }
```

5. ResolveLoader

这配置通常用于加载本地的 `Loader` ，可以配置 webpack 在那里去寻找 Loader 实际代码。

```javascript
    module.exports = {
        resolveLoader: {
            // 去哪个目录下寻找 Loader
            modules: ['node_modules'],
            // 入口文件的后缀
            extensions: ['.js','.json'],
            // 指明入口文件位置的字段
            mainFields: ['loader','main']
        }
    }
```

## 整体的配置结构

整体的 `webpack.config.js` 结构

```javascript
const path = require('path')

module.exports = {
    // entry 表示入口， Webpack 执行构建的第一步将从 Entry 开始， 可抽象成输入。
    // entry 类型有 string | object | array
    entry: './app/entry', // 入口只有1个文件，一个入口
    entry: ['./app/entry1','./app/entry2'], // 只有1个入口, 入口有2个文件
    entry: { // 有2个入口
        a: './app/entry-a',
        b: ['./app/entry-b1','./app/entry-b2']
    },

    // 如何输出结果： 在 Webpack 经过一系列处理后，如何输出最终想要的代码。
    // 出口
    output: {
        // 输出文件存放的目录，必须是 string 类型的绝对路径。
        path: path.resolve(__dirname, 'dist'),

        // 输出文件的名称
        filename: 'bundle.js', // 完整的名称
        filename: '[name].js', // 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称
        filename: '[chunkhash].js' // 根椐文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件


        // 发布到线上的所有资源的 URL 前缀, string 类型
        publicPath: '/assets/', // 放到指定目录下
        publicPath: '', // 放到根目录下
        publicPath: 'https://cdn.example.com/' // 放到 CDN 上去

        // 导出库的名称，string 类型
        // 不填它时，默认输出格式是匿名的立即执行函数
        library: "MyLibrary",

        // 导出库的类型，枚举型，默认是 var
        // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ,
        libraryTarget: 'umd',

        // 是否包含有用的文件路径信息到生成的代码里去， boolean 类型
        pathinfo: true,

        // 附加 Chunk 的文件名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',

        // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
        jsonpFunction: 'myWebpackJsonp',

        // 生成的 Source Map 文件名称
        sourceMapFilename: '[file].map',

        // 浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

        //异步加载路域的资源时使用的方式
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false,

    },

    // 配置模块相关
    module: {
        rules: [ // 配置 Loader
            {
                // 配置正则表达式的 Loader 文件
                test: /\.jsx?$/,
                // 在这里查找匹配的文件
                include: [
                    path.resolve(__dirname, 'app')
                ],
                // 忽略这里面的文件
                exclude: [
                    path.resolve(__dirname, 'app/demo-files')
                ],
                // 匹配后使用那些 Loader,有先后次序，从后往前执行
                use: [
                    'style-loader', // 直接使用 Loader 的名称 
                    {
                        loader: 'css-loader',
                        options: {
                            // 给 html-loader 传一些参数
                        }
                    }
                ]
            }
        ]，
        noParse: [ //不用解释和处理的模块
            /special-library\.js$/ //正则匹配
        ],
    },

    // 配置插件
    plugis: [
    ],

    // 配置寻找模块的规则
    resolve: {
        modules: [ // 寻找模块的根目录， array 类型，默认以 node_modules 为根目录
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        extensions: ['.js','.json','.jsx','.css'], // 模块的后缀名
        alias: { //模块别名配置， 用于映射模块
            // 把 'module' 映射 'new-module', 同样的 'module/path/file' 也会被映射成 'new-module/path/file'
            'module': 'new-module',
            // 使用结尾符号 $ 后， 把 'only-module' 映射成 'new-module'
            // 但是不像上面的， 'module/path/file' 不会被映射成 'new-module/path/file'
            'only-module$': 'new-module',
        },
        alias: [ // alias 还支持使用数组来更详细的配置
            {
                name: 'module', // 旧的模块
                alias: 'new-module', //新的模块
                // 是否是只映射模块，如果是 true 只有 'module' 会被映射， 如果是false 'module/inner/path' 路径也会被映射
                onlyModule: true
            }
        ],
        symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
        descriptionFiles: ['package.json'], //模块的描述文件
        mainFields: ['main'],  // 模块的描述文件里的描述入口文件的字段名称
        enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
    },
    // 输出文件性能检查配置
    performance: {
        hints: 'warning', // 有性能问题时输出警告
        hints: 'error', // 有性能问题时输出错误
        hints: false, // 关闭性能检查
        maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
        maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
        assetFilter: function(assetFilename) { // 过滤要检查的文件
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        }
    },
    devtool: 'source-map', // 配置 source-map 类型
    context: __dirname, // Webpack 使用的根目录， string 类型必须是绝对路径

    // 配置输出代码的运行环境
    target: 'web', // 浏览器，默认
    target: 'webworker', // WebWorker
    target: 'node', // Node.js, 使用 'require' 语句加载 Chunk 代码
    target: 'async-node', // Node.js, 异步加载 Chunk 代码
    target: 'node-webkit', // nw.js
    target: 'electron-main', // electron, 主线程
    target: 'electron-renderer', electron, 渲染线程

    externals: { // 使用来自 JavaScript 运行环境提供的全局变量
        jquery: 'jQuery'
    },

    stats: { // 控制台输出日志控制
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
    },

    devServer: {    // DevServer 相关的配置
        proxy: {    // 代理到后端服务接口
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // 配置 DevServer HTTP 服务器的文件根目录
        compress: true, // 是否开启 gzip 压缩
        historyApiFallback: true, // 是否开发 HTML5 History API 网页
        hot: true, // 是否开启模块热替换功能
        https: false, // 是否开启 HTTPS 模式

        profile: true, // 是否捕捉 Webpack 构建的性能信息， 用于分析什么原因导致构建性能不佳

        cache: false, // 是否启用缓存提升构建速度

        watch: true, // 是否开始监听
        watchOptions: { // 监听模式选项
            // 不监听的文件或文件夹，支持正则匹配。默认为空
            ignored: /node_modules/,
            // 监听到变化发生后会等 300MS 再去执行动作，防止文件更新太快导致重新编译频率太高
            // 默认为 300 ms
            aggregateTimeout: 300,
            // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
            poll: 1000
        }

    }
}
```

## 整体 `webpack.config.js` 对像属性结构

```
module.exports
|
|-- entry 入口[让源文件加入到构建流程中]
|-- output 输出[输出文件的位置和名称]
|-- module 配置[Loader 转换文件的策略]
|-- plugins 配置[插件 其它额外的需求]
|-- resolve 配置寻找模块的规则 [寻找依赖模块时的策略]
|-- performance 配置输出文件性能检查配置 
|-- devtool 配置 source-map 类型
|-- context 的根目录路径
|-- target 输出的代码运行环境
|-- externals 使用来自 JavaScript 运行环境提供的全局变量
|-- stats 控制控制台输出日志
|__ devServer 配置 devServer 

```


## 多种配置类型

除了用一个 Object 来配置 webpack外， 还有其它更灵活的方式。

### 导出一个 Function

如果把 `webpack.config.js` 的配置写成一个 Function 的方法，可以通过 JavaScript 灵活的控制配置。

```javascript
    const path = require('path')
    const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

    // env 为当前的环境变量 argv 为 webpack 命令行的传入的参数。
    module.exports = function(env = {}, argv) {
        const plugins = []

        const isProduction = env['production']
        
        // 在生成环境才压缩
        if (isProduction) {
            plugins.push(
                // 压缩输出的 JS 代码
                new UglifyJsPlugin()
            )
        }

        return {
            plugins: plugins,
            // 在生成环境不输出  Source Map
            devtool: isProduction ? undefined: 'source-map',
        };
    }
```

### 返回一个 Promise 函数

```javascript
    module.exports = function(env = {}, argv) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    //...
                })
            }, 5000)
        })
    }
```

### 导出多份配置

webpack 3.1.0 以后支持导出一个数组,每份配置都会执行一遍构建。

```javascript
    module.exports = [
        // 采用 Object 描述的一份配置
        {
            //
        },
        // 采用函数描述的一份配置
        function() {
            return {
                // ...
            }
        },
        // 采用异步函数描述的一份配置
        function() {
            return Promise();
        }
    ]
```