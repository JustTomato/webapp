<template>
    <div>
        <!-- nav lists -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
					</a>				
				</div>
			</div>
		</div>
        <!-- img lists -->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/' + item.id" tag="li" v-for="item in imglist" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="title">{{item.title}}</h1>
                    <div class="body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
        <h3>shared from photos</h3>
    </div>
</template>
<script>
//初始化Photo页面中导航条左右滑动功能
//1.1 引入mui的js插件
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
        return{
            //所有导航分类列表数组
            cates:[],
            //所有图片列表的数组
            imglist:[]
        };
    },
    created(){
        this.getAllCategory();
        //页面一进入即是默认全部图片分类数据，所以为0
        this.getPhotoListByCateId(0);
    },
    mounted(){
        //1.2 调用mui官方提供的函数来手动调用滑动功能
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.0005
        });
    },
    methods:{
        //获取图片页导航分类
        getAllCategory(){
            this.$http.get('api/getimgcategory').then(result => {
                if(result.body.status === 0){
                    //手动拼接出一个全部按钮选项数据
                    result.body.message.unshift({title:'全部',id:0});
                    this.cates = result.body.message;
                }
            })
        },
        //获取图片列表
        getPhotoListByCateId(cateId){
            this.$http.get('api/getimages/' + cateId).then(result => {
                if(result.body.status === 0){
                    this.imglist = result.body.message;
                }else{

                }
            })
        }
    }    
};
</script>
<style lang="scss" scoped>
* { touch-action: pan-y; }
//* { touch-action: none; }
//图片懒加载样式

.photo-list{
    list-style: none;
    margin: 0;
    padding: 2px;
    padding-bottom: 0px;
    li{
        background-color: #cccccc;
        text-align: center;
        margin-bottom: 2px;
        box-shadow: 0 0 5px #ffffff;
        position: relative;
        img{
            width: 100%;
            display: block;
            box-sizing: border-box;
        }
        .info{
            background-color: rgba(0,0,0, 0.2);
            //background-color: transparent;
            position: absolute;
            max-height: 90px;
            bottom: 0;
            text-align: left;
            color: #ffffff;
            .title{
                font-size: 14px;   
            }
            .body{
                font-size: 12px;
            }
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}
</style>