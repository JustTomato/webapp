//入口文件
import Vue from 'vue'
//1.1 导入vue-router组件
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)
//2.1导入 vue-resource
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)

//全局配置请求数据的接口地址
Vue.http.options.root = 'http://www.liulongbin.top:3005'

//使用cnpm i moment -S安装时间格式插件
//导入时间插件
import moment from 'moment'
//定义全局过滤器 修改日期格式
Vue.filter('dateFormat', function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})


//按需导入mint-ui的组件
import { Header,Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
//导入mui样式
import './lib/mui/css/mui.min.css'
//导入mui的字体图标的样式类
import './lib/mui/css/icons-extra.css'
//1.3 导入自己的router.js模块
import router from './router.js'
//导入app组件
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router  //1.4 挂在路由对象
})