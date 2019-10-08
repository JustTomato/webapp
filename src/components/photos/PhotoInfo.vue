<template>
    <div class="photoinfo-container">
        <!-- 标题部分 -->
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发布时间：{{photoinfo.add_time | dateFormat}}</span>
            <span>阅读次数：{{photoinfo.click}}</span>
        </p>
        <hr>
        <!-- 缩略图部分 -->
        <div class="thumbs">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>    
        </div>
        <!-- 图片内容部分 -->
        <div class="content" v-html="photoinfo.content"></div>
        <!-- 评论字组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
//导入评论字组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            //从路由中获取的id
            id:this.$route.params.id,
            //获取到的图片详情对象
            photoinfo:{},
            //定义空数组来存放图片数据
            list:[]
        };
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0];
                }
            });
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if(result.body.status === 0){
                    //循环每个取到的图片数据，并补全图片的w和h
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.msrc=item.src;         
                    });
                    this.list = result.body.message;
                }
            });
        },
        handleClose () {
        console.log('close event')
      }
    },
    //注册评论子组件
    components:{
        'cmt-box':comment
    }    
}
</script>
<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: blue;
        font-size: 18px;
        font-weight: normal;
        text-align: center;
        margin: 25px 0;
    }
    .subtitle{
        display: flex;
        padding: 10px 10px;
        justify-content: space-between;
    }
    .content{
        font-size: 14px;
        padding: 0 5px;
        line-height: 30px;
    }
    .thumbs{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 48%;  
                  margin: 1%; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }
}
</style>