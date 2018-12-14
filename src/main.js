//引入vue
import Vue from 'vue';

//引入vue-resource模块，用来发送ajax请求
import VueResource from 'vue-resource';
//安装到vue身上去
Vue.use(VueResource);

//全局设置ajax请求的根域名
Vue.http.options.root = "http://127.0.0.1:3000/";
//全局设置post请求体，默认post表单传递数据
Vue.http.options.emulateJSON = true;

//引入vue-router路由
import VueRouter from 'vue-router';
//安装到vue身上去，注册一下
Vue.use(VueRouter);

//选项卡的vant的组件
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);

//图片懒加载

Vue.use(Lazyload);

//moment组件，用的那个时间格式的工具，定义过滤器格式化时间
import moment from 'moment';
//定义全局过滤器
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dateStr).format(pattern);
});


//引入路由相关的.vue组件
// import home from './components/tabbar/home.vue';
// import menber from './components/tabbar/menber.vue';
// import shoppingcart from './components/tabbar/shoppingcart.vue';
// import search from './components/tabbar/search.vue';
// import newslist from './components/news/newslist.vue';
//定义路由匹配
// var router = new VueRouter({
//     routes: [{
//             path: "/",
//             redirect: '/home'
//         }, //重定向为首页
//         {
//             path: "/home",
//             component: home
//         },
//         {
//             path: "/menber",
//             component: menber
//         },
//         {
//             path: "/shoppingcart",
//             component: shoppingcart
//         },
//         {
//             path: "/search",
//             component: search
//         },
//         {
//             path: "/home/newslist",
//             component: newslist
//         },
//     ],
//     //修改路由匹配到的默认类
//     'linkActiveClass': 'mui-active',
// });

//引入路由模块router.js
import router from './router.js';

//引入min-ui 的头 的组件
import {
    Header,
    Button
    
} from 'mint-ui';
//引入min-ui的css
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);

//首页轮播图
import {
    Swipe,
    SwipeItem,
    Lazyload
} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);


//引入mui底部的插件
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//引入图片预览插件
import VuePreview from 'vue-preview'
// 安装到vue身上去
Vue.use(VuePreview);


//引入app根组件
import app from './app.vue';



//实例化vue
new Vue({
    el: "#app",
    // render:c=>c(app),
    render: function (c) {
        return c(app);
    },
    //挂载
    router: router
});