<template>
    <div class="productdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            //图文详情
            info:[],
            id:this.$route.params.id
        };
    },
    created(){
        this.getProductDesc();
    },
    methods:{
        getProductDesc(){
            this.$http.get('api/goods/getdesc/' + this.id).then(result => {
                if(result.body.status === 0){
                    //console.log(result)
                    this.info = result.body.message[0];
                }
            })
        }
    }    
}
</script>
// 由于content里的内容获取到的数据是html格式，若要定义html的样式，需要去掉 scoped
<style lang="scss">
 .productdesc-container{
     padding: 0 5px;
     h3{
         font-size: 16px;
         color: #226aff;
         text-align: center;
         padding: 15px 0;
     }
     .content{
         img{
            width: 100%;
         }  
     }
 }   
</style>