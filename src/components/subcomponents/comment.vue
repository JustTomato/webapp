<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最大数字120）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
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
            //所有的评论数据
            comments: [],
            //评论输入的内容
            msg:''
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
        },
        postComment(){
            //需要获取的评论的数据进行校验
            if(this.msg.trim().length === 0){
                //return的作用是返回return后的语句后不再执行后面的代码
                Toast('评论不能为空！');
                return; 
            }

            //参数1:请求的url地址
            //参数2:提交给服务器的数据对象{content:this.msg}
            //参数3:定义提交时表单中的数据格式{emulateJSON:true}。因为全局配置了参数三所以只配置两个参数
            //注意:this.msg.trim()去除文本内容中的空格
            this.$http.post('api/postcomment/' + this.$route.params.id, {content:this.msg.trim()})
            .then(function(result){
                if(result.body.status === 0){
                    let cmt = {
                        user_name:'匿名用户',
                        add_time: Date.now(),
                        content:this.msg.trim()
                    };
                    //将发表后的评论直接加入到评论数据数组中
                    this.comments.unshift(cmt);
                    //评论成功后需要把textarea中的文本内容清空
                    this.msg = "";
                }
            });
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