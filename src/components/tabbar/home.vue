<template>
    <div class="homecomment">
        <!-- <h1>home组件</h1> -->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in lunbo" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
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
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                lunbo: []
            }
        },
        created() {
            //生命周期,会在当前组件实例等待data和methods属性准备好之后才执行此函数
            this.getLunb();
        },
        methods: {
            getLunb() {
                // console.log('ajax请求');
                this.$http.get('http://127.0.0.1:3000/api/getlunbo').then(function (res) {
                    if (res.body.status == 0) {
                        this.lunbo = res.body.message;
                    }
                });
            }
        }
    }
</script>

<style scoped lang='scss'>
    .homecomment {
        .mint-swipe {
            height: 200px;
            img {
                width: 100%;
                height: 100%;
            }

            ;
        }

        .mui-grid-9 {
            border: none;
            background-color: #fff;
            .mui-col-sm-3 {
                font-size: 12px;

                img {
                    width: 50%;
                }
            }
        }
    }
</style>