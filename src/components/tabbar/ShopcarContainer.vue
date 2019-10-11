<template>
    <div class="shopcar-container">
        <div class="product-list">
            <!-- 购物车商品区域 -->
            <!-- 由于用户删除购物车中的商品时，不单单localstorage中的数据也要删除，而且此页面遍历出来的数据也要删除，i使用保存我删除的商品标记 -->
            <div class="mui-card" v-for="(item, i) in productlist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        
                        <mt-switch 
                        v-model="$store.getters.getProductSelected[item.id]"
                         @change="selectedChange(item.id, $store.getters.getProductSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getProductCount[item.id]" :productid="item.id"></numbox>
                                <!-- 怎么获取我们储存在localstroage中的购物车商品数量呢？
                                我们可以创建一个空的对象，把localstroage中的id作为变量，
                                count作为属性值，保存到我们的空对象中，然后通过遍历xx.id[count]来获取数量 -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>   
                    </div>
                </div>
            </div>
            <!-- 购物车结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner sum">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>以勾选商品 <span class="red">{{$store.getters.getProductCountAndAmount.count}}</span> 件，总价：{{$store.getters.getProductCountAndAmount.amount}}<span class="red">¥0</span></p>
                        </div>
                        <mt-button type="danger">结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <p>{{$store.getters.getProductSelected}}</p>
    </div>
</template>
<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return{
            //用来保存购物车的商品数据
            productlist:[]
        };
    },
    created(){
        this.getProductList();
    },
    methods:{
        getProductList(){
            //展示购物车商品数据，由于购物车里存在多个商品，而且接口接收的参数id是多个，所以需要获取car里面所有的id并拼接起来
            let idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id));
            //如果购物车中没有数据，即没有id传递空字符串会导致报错，需要在id为空的时return掉
            if(idArr.length <= 0){
                return;
            }
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
                if(result.body.status === 0){
                    this.productlist = result.body.message;
                }
            })
        },
        remove(id, index){
            //点击删除按钮，把商品从store中根据传递的id删除，
            //同时把当前组件的productlist中对应要删除的商品，使用index来删除
            this.productlist.splice(index,1)
            this.$store.commit('removeFromCar',id)
        },
        selectedChange(id, val){
            //每次点击开关后把最新的开关状态同步到localstroage中
            //console.log(id +'---'+ val)
            this.$store.commit('updateProductSelected', {id, selected:val});
        }
    },
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .product-list{
            mt-switch{
                display: block;
                box-sizing: border-box;
            }
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;
                margin: 0 10px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 10px;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
    .sum {
        display: flex;
        justify-content: space-between;
        text-align: center;
        .red{
            color: red;
            font-size: 16px;
        }
        }
    }
</style>