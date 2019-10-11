<template>
    <div class="productinfo-container">
        <!-- 定义红色小球动画效果 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 产品轮播图展示区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 产品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{productinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>¥{{productinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">¥{{productinfo.sell_price}}</span>
                    </p>
                    <!-- 通过父子组件的事件调用机制把父组件定义的事件方法(getSelectedCount)传递给子组件（通过getcount来接收） -->
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="productinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <mt-button type="danger" size="small">立即购买</mt-button>
                    </p>
                </div>
            </div>
        </div>
		<!-- 产品图文展示区域 -->
        <div class="mui-card">
            <div class="mui-card-header">产品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>产品货号：{{productinfo.goods_no}}</p>
                    <p>库存情况：{{productinfo.stock_quantity}}</p>
                    <p>上架时间：{{productinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
//导入数字选择框组件
import numbox from '../subcomponents/productinfo_numbox.vue'
export default {
    data(){
        return{
            //将路由url中的id挂载到id上
            id:this.$route.params.id,
            //接收请求获取到的轮播图数据
            lunbotu:[],
            //接收请求获取到的商品详情数据
            productinfo:[],
            //控制购物车红色小球显示开关
            ballFlag:false,
            //默认的产品购买数量为1
            selectedCount:1
        }

    },
    created() {
    this.getLunbotu();
    this.getProductinfo();
    },
    methods: {
        //获取轮播图
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if(result.body.status === 0){
                    //console.log(result)
                    //由于swiper组件中img的src=item.img 所以需要把数据中的src换成img
                    result.body.message.forEach(item => {
                        item.img = item.src
                    });
                    this.lunbotu = result.body.message;
                }
            });
        },
        //获取商品详情
        getProductinfo(){
            this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                if(result.body.status === 0){
                    //console.log(result)
                    this.productinfo = result.body.message[0];
                }
            })
        },
        goDesc(id){
            //点进使用编程式路由 跳转到图文介绍
            this.$router.push({name:'productdesc',params:{id}});
        },
        goComment(id){
            //点进使用编程式路由 跳转到产品评论
            this.$router.push({name:'productcomment',params:{id}});
        },
        //定义小球添加到购物车
        addToShopCar(){
            //console.log(this.id)
            this.ballFlag = !this.ballFlag;
            //将它设计成{id:商品的id, count:商品的数量, price:商品的价格, selected:商品是否选中}}
            let productinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.productinfo.sell_price,
                selected: true
            };
            //调用store中的mutations的方法来将购物车的商品数据共享到state中car上
            this.$store.commit('addToCar',productinfo)
        },
        //定义红色小球动画效果
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            //小球动画优化：
            //由于不同手机屏幕分辨率会导致小球的位置不一样，或者滚动条滚动到一定的距离后都会导致动画出现偏移
            //所以不能把坐标给写死，需要获取动态坐标
            //先取得购车上徽标的横纵坐标再取得红色小球起始位置的横纵坐标，徽标横纵坐标减去红色小球起始位置的横纵坐标即是小球偏移的距离的横纵坐标
            //即两个位置的横纵坐标的差值
            //如何获取到这个两个位置的横纵坐标呢  domObject.getBoundingClientRect()
            //获取红色小球在页面中位置坐标
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //由于购物车是App.vue组件的属性，不能使用ref获取，只能使用父组件之间的传递操作
            //由于父组件中的传值相对比较麻烦，所以我们采用dom方式来获取购物车的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            //求值
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            //字符串拼接 使用``包括起来然后加${}
            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition ="all 1s cubic-bezier(.58,-0.46,1,.61)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        //分析：加入购物按钮是属于productinfo.vue 而按钮旁边的数量是product_numbox.vue
        //涉及到了父子组件之间的嵌套问题以及父子组件之间的传值问题
        //定义获取选择产品的数量
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件时，把选中的值保存到data中的selectedCount中
            this.selectedCount = count;
            console.log(this.selectedCount);
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.productinfo-container{
    background-color: #eee;
    overflow: hidden;
    .ball{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
    .now_price{
        color: red;
        font-size: 16px;
    }
    .mui-card-footer{
        display: block;
        .mint-button--large {
        margin: 20px 0;
        }   
    }
}    
</style>