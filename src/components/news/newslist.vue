<template>
    <div class="newslist-container">
        <ul class="mui-table-view">

            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsdetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h4>{{item.title}}</h4>
                        <p class='mui-ellipsis'>
                            <span class='mui-ellipsis'>发布时间：{{item.add_time | dateFormat}}</span>
                            <span class='mui-ellipsis newslist-click'>点击:{{item.click}} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
            
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newslist:[]
            }
        },
        created() {
            //生命周期,会在当前组件实例等待data和methods属性准备好之后才执行此函数
            this.getnewslist();
        },
        methods:{
            getnewslist(){
                this.$http.get("api/getnewslist").then(function (res) {
                    console.log(res.body);
                    if (res.body.status == 0) {
                        this.newslist = res.body.message;
                    }
                    
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .newslist-container{
        .mui-table-view{
            h4{
                font-size: 15px;
            }
        }
        .mui-ellipsis{
            font-size: 12px;
            color: blue;
            .newslist-click{
                float: right;
            }
        }

    }
</style>