<template>
  <div>
    <!-- 轮播图开始 -->
    <!-- 1.3 在对应的位置放置swiper组件并传入对应的值 -->
    <swiper :lunbotuList="lunbotuList"></swiper>
    <!-- 轮播图结束 -->
    <!-- 九宫格开始 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
            <!-- <span class="mui-badge">5</span> -->
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/productlist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
    <!-- 九宫格结束 -->
  </div>
</template>
<script>
import { Toast } from "mint-ui";
//1.1导入swiper组件
import swiper from "../subcomponents/swiper.vue"
export default {
  data() {
    return {
      //保存轮播图的数组
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          //console.log(result.body);
          if (result.body.status === 0) {
            //请求数据成功
            this.lunbotuList = result.body.message;
            //Toast("请求数据成功");
          } else {
            //请求数据失败
            Toast("请求数据失败");
          }
        });
    }
  },
  //1.2 在methods后添加components
  components:{
    swiper
  }
};
</script>
<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
    background-color: #ffffff;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}
</style>