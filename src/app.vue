<template>
    <div class="app-container">
        <!-- 头部分，PHP32期vue-app -->
        <mt-header fixed title="猪头">
            <div to="#" slot="left" @click="back">
            <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>

        <!-- 主体部分，内容 -->
        <!-- <span>主体</span> -->
        <router-view></router-view>

        <!-- 底部部分，四项导航栏 -->
        <!-- router-link -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/menber">
                <span class="mui-icon mui-icon-person-filled"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shoppingcart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>

    export default {
        methods:{
            back(){
                var Thisurl = window.location.href;
                console.log(Thisurl);
                if(Thisurl == 'http://localhost:2333/#/home' || Thisurl == 'http://localhost:2333/' || Thisurl == 'http://localhost:2333/home'){
                    console.log('首页');

                }else{
                    console.log('其他页');
                    history.back();
                }
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-container {
        padding-top: 40px;
        padding-bottom: 50px;
    }
    ;
</style>