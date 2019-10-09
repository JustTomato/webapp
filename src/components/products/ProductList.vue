<template>
    <div class="product-list">
        <!-- <router-link :to="'/home/productinfo/' + item.id" class="product-item" v-for="item in productslist" :key="item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余：{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <div class="product-item" v-for="item in productslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余：{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageindex:1,
            productslist:[]
        };
    },
    created(){
        this.getProductList();
    },
    methods:{
        getProductList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                if(result.body.status === 0){
                    //this.productslist = result.body.message;
                    this.productslist = this.productslist.concat(result.body.message);
                }
            });
        },
        getMore(){
            this.pageindex++;
            this.getProductList();
        },
        goDetail(id){
            //1.第一种方式
            //this.$router.push('/home/productinfo/' + id);
            //2.第二种方式 传递对象方式
            //this.$router.push({path:'/home/productinfo/'+id});
            //3.第三种方式 传递命名路由
            //this.$router.push({name:'productinfo',params:{id}});
            this.$router.push({ name: "productinfo", params: { id } });
            //4.第四种方式
        }
    }
}
</script>
<style lang="scss" scoped>
.product-list{
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .product-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 294px;
        img{
            width: 100%;
        }
        .title{
            font-size: 16px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                display: flex;
                justify-content: space-between;
                .now{
                  font-size: 16px;
                  color: red;  
                }
                .old{
                    text-decoration: line-through;
                    font-size: 13px;
                    margin-top:2px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>