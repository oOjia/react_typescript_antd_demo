上一次介绍过了什么是TypeScript、如何安装TypeScript和TypeScript的特点。
这次主要介绍：
- 构建一个ts项目
- js项目向ts迁移

### Webpack中配置TypeScript

#### 1.1 初始化工程
`npm init`

一路用默认配置即可

#### 1.2 安装配置webpack
首先要安装webpack：

`npm install -save-dev webpack webpack-dev-server`

如果安装的是webpack v4+版本，则还需要安装webpack-cli

`npm install -save-dev webpack-cli`

在项目根目录下，新建webpack.config.js
```js
module.exports = {
    // 入口文件
    entry: "./src/greeter.ts",
    // 输出文件和目录
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // 打开 sourcemaps 调试 webpack 的输出
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".html"]
    },

    module: {
        rules: [
            // '.ts' or '.tsx' 后缀的文件将被 loadr 'awesome-typescript-loader' 处理。
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // 所有输出的 '.js' 有 sourcemaps 的文件将被 'source-map-loader' 预处理。
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};
```

#### 1.3 安装TypeScript及依赖
`npm install --save-dev typescript awesome-typescript-loader source-map-loader`

这些依赖会让 TypeScript 和 webpack 更好合作

- awesome-typescript-loader：可以让 webpack 使用 TypeScript 的标准配置文件 tsconfig.json 编译 TypeScript 代码。

- source-map-loader：使用 TypeScript 输出的 sourcemap 文件来告诉 webpack 何时生成自己的 sourcemaps。

生产环境中的代码出现bug，调试的时候只能定位到压缩处理后的代码的位置，sourcemap就是为了解决这个问题，方便开发人员定位到开发环境中的源代码。

安装后package.json最终变成这样：
![image](https://ask.qcloudimg.com/draft/2221081/qlsabhj5jy.png?imageView2/2/w/1620)

#### 1.4 配置TypeScript
在工程根目录下新建文件tsconfig.json文件，它包含了输入文件列表以及编译选项，添加以下内容：
```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
    },
    "include": [
        "./src/**/*"
    ]
}
```
#### 1.5 代码结构
新建index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    Hello TypeScript!
    <script src="./dist/bundle.js"></script>
</body>
</html>
```
新建greeter.ts，放到src目录下
```ts
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "zhaiyj";

document.body.innerHTML = greeter(user);
```
文件目录

![image](https://ask.qcloudimg.com/draft/2221081/oavbfhflxb.png?imageView2/2/w/1620)

最后执行：

```
npm run build
npm run dev
```

### JavaScript 迁移到 TypeScript

#### 2.1 后缀替换
首先使用重命名工具`renamex-cli`将项目目录`./src`中的所有 js 文件后缀批量改成`.ts`
```
npm i -g renamex-cli
//then
renamex start -p "src/**/*.js" -r "[name].ts" -t no
```

#### 2.2 根目录新建tsconfig.json
```js
{
    "compilerOptions": {
        "target": "es5",//将编译的.ts文件编译为指定标准js
        "module": "commonjs",//模块规范
        "sourceMap": true, //生成资源映射，以便于调试
        "noEmitHelpers": true,//不生成辅助方法，对应importHelpers
        "importHelpers": true,//引用外部的辅助方法
        "allowUnreachableCode": true,//允许代码中途return产生无法执行代码
        "lib": ["es2017"],//定义编译时依赖
        "typeRoots": ["node_modules/@types"],//定义类型定义文件的根目录
        "types": [
         //添加新的类型定义库如 @types/lodash 需要在此处定义
        "lodash"
        ],
        "outDir": "./build",//编译输出文件目录，默认等于rootDir
        "rootDir": "./src" //源代码目录在这个目录里编写你的ts文件
    },
    "exclude": [
        "node_modules", //忽略目录
        "**/*.test.ts" //忽略指定类型文件
    ]
}
```
#### 2.3 typescript配置tsconfig.json

- compilerOptions -> target

>配置项，表明需要将typescript编译到哪一个js标准
>
>可以根据自己的实际需求配置 es5|es6|es7...
>
>nodejs 7.10已经原生支持es7,可以配置为es2017，如果应用在前端可以改为es5
- [编译列表](https://www.tslang.cn/docs/handbook/compiler-options.html)

读取所有可识别的src目录下的文件（通过include）。

接受JavaScript做为输入（通过allowJs）。

生成的所有文件放在built目录下（通过outDir）。

将JavaScript代码降级到低版本比如ECMAScript 5（通过target）。

`baseUrl: string`

baseUrl用于处理项目中的非相对路径，比如指定为`"baseUrl":"./src/util"`,在你的任意文件中`import Common from 'common'`,则编译器会优先去查找根目录下的`./src/util/common`文件。

`paths: <custom object>`

`paths`需要搭配`baseUrl`使用，举例来说，设置了`paths: { c: ['common'] }`之后，则可以直接使用`import Common from 'c'`的形式。数组是表示按优先级查找的顺序。

`experimentalDecorators: boolean = false`

`experimentalDecorators`允许开启类似ES提案中的装饰器功能，用法几乎一模一样。

`jsx: 'preserve' | 'react'`

`jsx`这个配置项去处理如何解析tsx文件，`preserve`是只转换成jsx文件，后续操作交给比如`babel`之类的`loader`，而`react`则是直接在`tsloader`这层完成解析的操作，建议改成react。


`lib: string[]`

`lib`当我们需要在ts中使用一些高级的API，比如`Proxy`,`Reflect`甚至`Element.prototype.matches(DOM API)`，我们需要引入TypeScript的内置库,比如`es2015`, `dom`等等。

`sourceMap: boolean = false`

sourceMap是否生成sourceMap，建议开启，方便调试。

`module: 'commonjs' | 'ES6'`

module最终模块生成方式，如果target是ES5的话就使用CommonJS。

...

#### 2.4 代码风格规范tslint.json
`npm install --save-dev tslint`
```
{
    "scripts": {
        "lint": "tslint \"src/**/*.ts\" "
    }
}
```

#### 2.5 安装typescript
`npm install --save-dev typescript`
- 可以在npm run scripts里使用tsc命令将.ts文件编译为.js文件
- "tsc": "tsc" 编译.ts文件
- "tsc:w": "tsc -w" 监听.ts文件 实时编译
```
{
    "scripts": {
        "tsc": "npm run clear && tsc",
        "tsc:w": "npm run clear && tsc -w",
        "lint": "tslint \"src/**/*.ts\" "
    }
}
```
`npm install --save tslib` 从外部引入额外的辅助方法集([tslib](https://www.npmjs.com/package/tslib))
- 会在编译后的.js文件里自动require('tslib')
- 编译后的代码更美观,不用在每个编译后的.js文件都生成辅助方法
- 减少前端场景中打包体积
- 属于运行时依赖,无须主动引用,必须放在dependencies配置里
- 需要配置tsconfig.js -> compilerOptions -> importHelpers:true

#### 2.6 安装 typescript 类型定义(@types/[package])
默认所有可见的"@types"包会在编译过程中被包含进来，`node_modules/@types`文件夹下以及它们子文件夹下的所有包都是可见的；

如果指定了types，只有被列出来的包才会被包含进来，例如
```
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```
这个tsconfig.json文件将仅会包含 `./node_modules/@types/node`，`./node_modules/@types/lodash`和`./node_modules/@types/express`。`node_modules/@types/*`里面的其它包不会被引入进来。

指定`"types": []`来禁止自动引入@types包。

- npm install --save-dev @types/node (nodejs环境)
- 其它比如lodash,react,vue,koa,jquery都已经有了相关的类型定义库
- 配置类型定义库,需要将tsconfig.json->compilerOptions->types添加对应的库名
```
{
    "compilerOptions": {
        "outDir": "./build",
        "allowJs": true,
        "strictNullChecks": true,
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,
        "target": "es6",
        "lib": [
        "dom", //如果是前端环境需要添加此配置
        "es7" //适配es7的语法
        ],
        "types": ["lodash"]
    },
    "exclude": ["node_modules"]
}
```
接下来你就可以在开发工具里看到对应的提示了,`lodash`:

![image](http://segmentfault.com/img/remote/1460000009630938?w=612&h=353)

#### 2.7 修改 import 语法
现在引用模块推荐的写法是 import 语法
- nodejs 原生或者 webpack 默认环境并不支持
- 通常我们使用babel来实现 import 语法支持
- typescript支持更为标准的 import 语法
- 普通export写法
```ts
//a.ts
module.export = { a: 1, b: 2 }
//a2.ts
export let data = { x: 1, y: 2 }
//b.ts
//这种写法一般用于引用node_modules上安装的其他库
import * as aData from './a'
import { data } from './a2'
```
默认export写法
```ts
//x.ts
export default { a: 1, b: 2 }
//y.ts
import data from './x'
//>这种写法用于引入我们使用export default定义的默认导出
```
混合写法
```ts
//x.ts
export let data = { a: 1, b: 2 }
export default { c: 3 }
//y.ts
import other, { data } from './x'
console.log(data) // { a : 1 , b : 2 }
console.log(other) // { c : 3 }
```
别名
```ts
//m.ts
export let data = { o: 1, p: 2 }
export default { u: 3 }
//n.ts
import data, { data as data2 } from './m'
console.log(data)//{ u : 3 }
console.log(data2)//{ o : 1 , p : 2 }
```
修改项目中的引库语法由`require('libName')`改为`import * as libName from 'lib'`

#### 2.8 为项目中的全局变量创建自定义类型定义文件`globals.d.ts`

```ts
 //globals.d.ts
//应用程序工具库
declare var appUtils: any
//指向 src/common 的绝对路径
declare var COMMON_PATH: string
//node程序的运行环境状态 development | test | production
declare var NODE_ENV: string

//shims.d.ts 第三方插件变量全局定义
import * as lodash from 'lodash'
declare global {
    const _: typeof lodash
}
```

#### 2.9 再排除一些小问题就能跑起来了

注意点:

- render等方法的类型，数组等类型定义
- 新的`import`语法 [import](http://www.tuicool.com/articles/MZNJ3uQ)
- class语法与es6略有不同 [class](http://www.cnblogs.com/whitewolf/p/4107970.html)
- 全局变量需要定义globals.d.ts [http://www.cnblogs.com/ys-ys/archive/2016/03/24/5314693.html](http://www.cnblogs.com/ys-ys/archive/2016/03/24/5314693.html)
- key按照字母顺序排序[object-literal-sort-keys](https://stackoverflow.com/questions/45792683/tslint-preventing-error-the-key-is-not-sorted-alphabetically)（禁用："object-literal-sort-keys": false）
- render中的匿名函数`"jsx-no-lambda":false`
- 连续添加属性
>有些人可能会因为代码美观性而喜欢先创建一个对象然后立即添加属性：
```js
var options = {};
options.color = "red";
options.volume = 11;
```
>TypeScript会提示你不能给color和volumn赋值，因为先前指定options的类型为{}并不带有任何属性。 如果把声明变成以下形式将不会产生错误：
```js
let options = {
    color: "red",
    volume: 11
};
```
>还可以定义options的类型并且添加类型断言到对象字面量上
```ts
interface Options { color: string; volume: number }

let options = {} as Options;
options.color = "red";
options.volume = 11;
```
>或者，将options指定成any类型，这是最简单的，但也是获益最少的。

#### 使用感受
*  typescript的配置比babel简单多了,只有一两个库依赖,却可以直接用最新的ECMA语法及功能
*  可选择性的编译生成ES5以及其它更高ES版本,完全不用担心实际运行问题
*  很多以前容易发生的错误,现在在编译阶段就可以暴露出来,提高了项目的稳定性

在项目中用TypeScript是一件很需要魄力的事情，因为这门语言会对习惯了弱类型的开发人员带来很大的冲击。


我这里不去比较弱类型和强类型的好坏，只简单说一下引用TypeScript的好处：

- 提升使用第三方类库的效率，编译器智能提示入参出参，可以避免一直去查文档。
- 在项目中定义关键部分数据的类型检查(比如Redux Store管理的State)，开发效率和可维护性大大提升。
- 定义请求的参数和返回值类型，避免频繁的去NEI查看返回值类型，同时后续换人维护的话也方便。
- 有助于在编译阶段就及早发现错误。

在以下情况下适合用TypeScript开发（个人想法）：

- 一个提供给他人使用的第三方类库或者API包
- 一个可能会迭代很久的完整的大项目，需要团队成员达成框架和技术的共识。

