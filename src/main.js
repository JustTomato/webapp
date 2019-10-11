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

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//由于在localstorage上保存了car的数据，所以在刷新页面时，不能给我们的car为一个空数组
//而是判断：是否有localstroage数据，若是没有则为空
let car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
    state:{
        //this.$store.state.***
        //将购物车中的商品数据，用一个数组存储起来
        //将它设计成{id:商品的id, count:商品的数量, price:商品的价格, selected:商品是否选中}}
        car:car
    },
    mutations:{
        //this.$store.commit('方法名称','唯一参数')
        //定义 点击加入购物车按钮后 把商品所需要的数据加入到state定义的car中，给其他组件共享数据 的函数
        addToCar(state,productinfo){
            //分析：
            //1. 如果购物车中已经存在商品了，则只增加该商品的数量
            //2. 如果没有，则直接把商品数据push到我们的state中的car上
            //由于some方法后面不能加else，所以需要定义一个开关来判断是否找到或者是否要push
            let flag = false;
            state.car.some(item => {
                if(item.id == productinfo.id){
                    item.count += parseInt(productinfo.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                //把商品数据直接push添加到car中
                state.car.push(productinfo)
            }
            //当更新car的数据之后，当用户刷新页面时会导致数据丢失，所以需要保存到localstorage上
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateProductInfo(state,productinfo) {
        //修改购物车页面商品数量值
            state.car.some(item =>{
                if(item.id == productinfo.id){
                    item.count = parseInt(productinfo.count)
                    return true
                }
            })
            //当用户在购物车页面修改完商品数量后也要把商品数量的数据保存到localstorage中
            localStorage.setItem('car',JSON.stringify(state.car))    
        },
        removeFromCar(state, id){
            //根据id从store中的购物车中删除对应的商品数据
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i, 1)
                    return true
                } 
            })
            //将最新删除的购物车数据保存到localstorage中
            localStorage.setItem('car',JSON.stringify(state.car)) 
        },
        updateProductSelected(state, info) {
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                    //return true
                }
            })
            //将最新的购物车商品状态数据保存到localstorage中
            localStorage.setItem('car',JSON.stringify(state.car)) 
        },
    },
    getters:{
        //this.$store.getters.***
        getAllCount(state){
            let c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getProductCount(state){
            let o = {}
            state.car.forEach(item => {
               o[item.id] = item.count  
            })
            return o
        },
        getProductSelected(state){
            let d = {}
            state.car.forEach(item => {
                d[item.id] = item.selected
             })
             return d
        },
        getProductCountAndAmount(state){
            let f = {
                //勾选的数量
                count:0,
                //勾选的数量总价
                amount:0
            }
            state.car.forEach(item => {
                if(item.selected){
                    f.count += item.count
                    f.amount += item.price * item.count
                }
            })
            return f
        }
    }
})

//全局配置请求数据的接口地址
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局配置请求数据的格式 默认是：application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

//使用cnpm i moment -S安装时间格式插件
//导入时间插件
import moment from 'moment'
//定义全局过滤器 修改日期格式
Vue.filter('dateFormat', function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})


//按需导入mint-ui的组件
// import { Header,Swipe, SwipeItem, Button } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


//导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

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
    router,  //1.4 挂在路由对象
    store   //挂载store
})