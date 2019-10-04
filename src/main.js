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
//按需导入mint-ui的组件
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
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