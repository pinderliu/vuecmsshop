<template>
  <!-- 评论区域 -->
  <div class='comment'>
    <h2 class="title">发表评论</h2>
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="list">
      <!-- 组件一定要加key属性 -->
      <!-- index循环的索引，在组件中可以使用index作为我们的key的值 -->
      <div class="list-item" v-for="(item,index) in comments" :key="index">
        <div class="user">第{{ index+1 }}楼用户： {{ item.user_name }} 发表时间： {{ item.add_time | dateFormat }}</div>
        <div class="content">
          {{item.content}}
        </div>
      </div>

      <!-- 加载更多 -->
      <mt-button type="danger" plain size="large" @click="loadMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
  //引入弹框提示组件
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        content: '',
        pageindex:1,  //默认加载第一页的评论数据
        comments:[],  //保存评论的数据
      }
    },
    //接首父传过来的数据
    props:['id'],
    created(){
      //初始化获取评论的数据
      this.getComments();
    },
    methods: {
      //获取当前文章的评论数据
      getComments() {
        //现在id是父给子传递过来的。
        this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(function (res) {
          if (res.body.status == 0) {
            if (res.body.message.length == 0) {
              Toast('没有更多');
            }
            //赋值给data的comments属性
            //this.comments = res.body.message;
            //加载评论数据，不能覆盖原评论数据，应该要把旧数据使用concat链接在一起
            this.comments = this.comments.concat(res.body.message);
          }
        });
      },
      //发表评论的方法
      postComment() {
        //判断数据是否为空
        if (this.content.trim() == '') {
          Toast('不能为空');
          return;
        }
        //发送ajax请求，发布评论
        //post第二个参数post请求体参数  第三个参数是模拟post表单传递数据（也可以全局设置）
        this.$http.post("api/postcomment/" + this.id, {
          content: this.content
        }, {
          emulateJSON: true
        }).then(function (res) {
          if (res.body.status == 0) {
            Toast('评论成功');
            //把当前的评论数据放在数组的末端
            this.content = ''; //清空评论的信息
            this.comments = []; //清空数据
            this.getComments(); //重新加载最新的评论信息
          }
        });
      },
      //点击加载更多评论
      loadMore() {
        //页面进行+1
        this.pageindex++;
        //再调用getComment获取最新的评论数据
        this.getComments();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    .title {
      font-size: 18px;
    }

    textarea {
      height: 130px;
    }

    .list {
      padding: 5px 0px;

      .list-item {
        padding: 5px 1px;

        .user {
          background-color: #ccc;
          font-size: 12px;
        }
      }
    }
  }
</style>