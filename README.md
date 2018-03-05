# Webpack 深入浅出学习与总结

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

DEMO00 [hello_webpack](/hello_webpack)

DEMO01 [hello_loader](/hello_devserver)

DEMO02 [hello_plugin](/hello_plugin)

DEMO03 [hello_devserver](/hello_devserver)



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