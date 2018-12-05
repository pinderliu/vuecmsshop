<template>
    <div class="detail-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <div class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
            <span class="click">点击：{{newsInfo.click}}次</span>
        </div>
        <hr>
        <div class="content" v-html="newsInfo.content">
        </div>
        <!-- 评论 -->
        <div class="comment">
            <h2 class="title">发表评论</h2>
            <textarea cols="30" rows="10" placeholder="请输入" v-model="content"></textarea>
            <mt-button type="primary" size="large" @click="postComment">评论</mt-button>
        </div>
        <div class="list">

            <div class="list-item" v-for="(item,index) in comments" :key="index">
                <div class="user">
                    {{ index+1 }}楼用户 {{ item.user_name }} 发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="content">
                    {{ item.content }}
                </div>
            </div>
            
            <mt-button plain type="primary" size="large" @click="loadMore">加载更多</mt-button>

        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsInfo: {},
                pageindex:1,//默认加载第一页
                comments:[],
                content:''
            }
        },
        created() {
            this.getNewsInfo();
            this.getComments();
        },
        methods: {
            getNewsInfo() {
                this.$http.get('api/getnew/' + this.id).then(function (res) {
                    if (res.body.status == 0) {
                        this.newsInfo = res.body.message[0];
                    }
                });
            },
            //获取评论
            getComments() {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(function (res) {
                    if (res.body.status == 0) {
                        if(res.body.message.length == 0){
                            Toast('没有更多了');
                        }
                        this.comments = this.comments.concat(res.body.message);
                    }
                    // console.log(111111);
                });
            },
            postComment(){
                if( this.content.trim() == '' ){
                    Toast('不能为空');
                    return;
                }
                this.$http.post('api/postcomment/' + this.id,{content:this.content},{emulateJSON:true}).then(function(res){
                    if(res.body.status == 0){
                        Toast('评论成功');
                        this.content = '';
                        // this.comments.push({add_time:Data.now(),content:this,content});
                        this.content = [];
                        this.getComments();
                    }
                    
                });
            },
            loadMore(){
                //页面+1
                this.pageindex = this.pageindex + 1;
                //调用getcomment获取最新的评论
                this.getComments();
            }
        }
    }
</script>

<style lang='scss' scoped>
    .detail-container {
    padding:0 10px;
    .title{
      font-size:16px;
      color:red;
      text-align: center;
      padding:10px 0;
      
    }

    .subtitle{
      color:blue;
      font-size:13px;

      .click{
        float:right;
      }
    }
    .comment{
        .title{
            color: black;
            font-size: 18px;
            text-align: left;
        }
        textarea{
            line-height:10px;
        }
    }
    .list{
        padding-bottom: 5px;
        .list-item{
            font-size: 14px;
            .user{
                background-color: #ccc;
            }
            .content{
                line-height: 25px;
                padding-left: 10px;
                // height: 30px;
            }
        }
    }
  }
</style>