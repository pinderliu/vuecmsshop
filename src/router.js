//引入vue-router路由
import VueRouter from 'vue-router';
// //安装到vue身上去，注册一下
// Vue.use(VueRouter);

//引入路由相关的.vue组件
import home from './components/tabbar/home.vue';
import menber from './components/tabbar/menber.vue';
import shoppingcart from './components/tabbar/shoppingcart.vue';
import search from './components/tabbar/search.vue';
import newslist from './components/news/newslist.vue';
import newsdetail from './components/news/newsdetail.vue';
import photolist from './components/photo/photolist.vue';
import photodetail from './components/photo/photodetail.vue';
// import photodetail from './components/photo/photodetail.vue';


//定义路由匹配
var router = new VueRouter({
    routes: [{
            path: "/",
            redirect: '/home'
        }, //重定向为首页
        {
            path: "/home",
            component: home
        },
        {
            path: "/menber",
            component: menber
        },
        {
            path: "/shoppingcart",
            component: shoppingcart
        },
        {
            path: "/search",
            component: search
        },
        {
            path: "/home/newslist",
            component: newslist
        },
        {
            path:"/home/newsdetail/:id",
            component:newsdetail
        },
        {
            path:"/home/photolist",
            component:photolist
        },
        // {
        //     path:"/home/photodetail",
        //     component:photodetail
        // },
        {path:"/home/photodetail/:id",component:photodetail},
    ],
    //修改路由匹配到的默认类
    'linkActiveClass': 'mui-active',
});

//暴露给外面
export default router;