<template>
  <div class="photo-container">
      <h2 class="title">{{ photoInfo.title }}</h2>
      <p class="subtitle" >
        <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
        <span class="click">点击 {{ photoInfo.click }} 次</span>
      </p>
      <hr>
      <!-- <div class="images" v-for="item in images" :key="item.src">
          <img :src="item.src" alt="">
      </div> -->
      <vue-preview :slides="images"></vue-preview>
      <div class="content" v-html="photoInfo.content">
      </div>


      <!-- 引入评论的子组件 -->
      <comment :id="id"></comment>
  </div>
</template>

<script>
  //引入子组件评论模块
  import comment from "../common/comment.vue";
  export default {
    data(){
      return {
        //设置id属性，保存当前图片的id.
        id:this.$route.params.id,
        photoInfo:{}, //存储当前图片的详情数据
        images:[]
      }
    },
    created(){
      //初始化图片的详情数据
      this.getImgInfo();
      this.getThumbImages();
    },
    methods:{
      getImgInfo(){
        //获取当前文章id的详情
        this.$http.get('api/getimageInfo/'+this.id).then(function(res){
          if(res.body.status == 0){
            this.photoInfo = res.body.message[0];
          }
        });
      },
      getThumbImages(){
        this.$http.get('api/getthumbImages/'+this.id).then(function(res){
          console.log(res.body);
          if(res.body.status == 0){
            res.body.message.forEach(ele =>{
              console.log(ele);
              ele.msrc = ele.src;
              ele.w = 600;
              ele.h = 400;
            });
            this.images = res.body.message
          }
        })
      }
    },
    components:{
      comment
    }
  }
</script>

<style lang='scss' scoped>
  .photo-container{
    .title{
      text-align: center;
      padding:5px 5px;
      color:blue;
      font-size: 15px;
    }
    .subtitle{
      color:#ccc;

      .click{
        float:right;
      }
    }

    .images img{
      width: 100%;
      padding: 5px;
    }

    .content{
      font-size:13px;
      line-height: 30px;
    }
  }
</style>