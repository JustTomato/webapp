const path = require('path')
// 该配置文件为一个js文件，通过node中的模块操作向外暴露一个配置对象
// module.exports = {
//     //在该配置文件中需要手动配置指定的入口和出口
//     //入口，该代码表示需要使用webpack转译哪个文件，在这里指转译src/main.js文件
//     entry:path.join(__dirname,'./src/main.js'),
//     //出口，出口文件的相关配置
//     output:{
//         //指定转译好的文件为什么名字，这里是指bundle.js文件名字
//         filename:'bundle.js',
//         //指定转译好的文件输出到哪个文件目录下，这里是指输出到dist文件目录下
//         path:path.join(__dirname,'./dist')
//     }
// }

//启用热更新的第二步
const webpack = require('webpack')
//导入在内存中生成html页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')

//导入vue-loader需要的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devServer:{
        //这是配置webpack-dev-server常用命令的第二种方式，稍微麻烦
        open:true,
        port:8080,
        //启用热更新的第一步
        hot:true
    },
    //启用热更新的第三步
    plugins:[
        //启用热更新的第三步，new一个热更新的模块对象
        new webpack.HotModuleReplacementPlugin(),
        //这是创建在内存中生成html页面的插件
        new htmlWebpackPlugin({
            //指定模版页面，将来会根据指定的页面去生成内存中的html页面
            template:path.join(__dirname, './src/index.html'),
            //指定生成页面的名称
            filename:'index.html'
        }),
        new VueLoaderPlugin()
    ],
    //这个节点是配置所有的第三方配置模块加载器
    module:{
        //所有第三方模块的匹配规则
        rules:[
            //test里面是正则表达式，表示以什么文件类型结尾，以.css文件格式结尾
            //use是指使用哪个第三方工具进行配置处理.css格式文件
            {test: /\.css$/, use:['style-loader','css-loader']},
            //对less第三方包进行匹配规则
            {test: /\.less$/, use:['style-loader','css-loader','less-loader']},
            //对sass第三方包进行匹配规则
            {test: /\.scss$/, use:['style-loader','css-loader','sass-loader']},
            //对URL文件第三方进行匹配规则
            {test: /\.(jpg|jpeg|png|gif|bmp)$/, use:'url-loader?limit=200985&name=[name].[ext]'},
            //对字体文件图标进行匹配规则
            //字体图标文件格式有ttf eot svg woff woff2
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use:'url-loader'},
            //对babel第三方工具进行匹配
            {test:/\.js$/, use:'babel-loader',exclude:/node_modules/},
            //对vue第三方工具进行匹配
            {test:/\.vue$/, use:'vue-loader'}
        ]
    },
    //新增的配置导入vue
    resolve:{
        //修改被导入vue包的路径
        alias:{
            //"vue$": "vue/dist/vue.js"
        }
    }
}