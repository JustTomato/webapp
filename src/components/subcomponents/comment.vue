<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最大数字120）" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key=item.add>
                <div class="cmt-title">
                    {{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body" v-html="item.content === 'undefined' ? '此用户暂无发表评论':item.content"></div>
            </div> 
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            //默认页码数为1
            pageIndex: 1,
            comments: []
        };
    },
    created(){
        this.getComments();
    },
    methods:{
        //获取评论数据
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex=' + this.pageIndex).then(result => {
                if(result.body.status === 0){
                    //console.log(result.body.message)
                    //this.comments = result.body.message
                    //这里需要对评论数据进行拼接
                    this.comments = this.comments.concat(result.body.message);
                }else{
                    Toast('获取评论数据失败');
                }
            });
        },
        //加载更多评论数据
        getMore(){
            this.pageIndex++;
            this.getComments();
        }
    },
    props:["id"]
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 90px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #ccc;
                line-height: 40px;

            }
            .cmt-body{
                line-height: 40px;
                text-indent: 2em;
            }
        }

    }
}
</style>