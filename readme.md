# 复习webpack配置



## 入口和出口

```
var path = require('path');
module.exports = {
    entry:"./src/main.js",
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    }
}
```



配置好上面之后，在项目根目录，就可以输入webpack进行打包



## webpack-dev-server实时热更新打包

- 生成的bundle.js是在内存中，默认开启本地8080端口。
- 在index.html中访问

```
<script src="/bundle.js"></script>
```

- 如果是使用webpack进行打包（一般发布时候）

```
<script src="../dist/bundle.js"></script>
```





## webpack打包css文件

webpack默认只能加载.js后缀的文件，如果失败，会报错 ,需要加载合适的loader。

1. 加载两个loader:

```
npm install style-loader css-loader -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
module:{
    rules:[
    	//从右到左加载
        {test:/\.css$/,use:['style-loader','css-loader']}
    ]
}
```



## webpack打包css中的字体和图片



1. 加载两个loader:

```
npm install url-loader file-loader -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
module:{
    rules:[
    	//从右到左加载
        {test:/\.(jpg|png|jpeg|bmp|gif)$/,use:[{
            loader:"url-loader",
            options:{
                limit:5000,
                name:'[hash:8]-[name].[ext]'
            }
        }]},
        {test:/\.(ttf|ttf2|woff|woff2|eot|svg)$/,use:['url-loader']}
    ]
}
```



## webpack打包高级es6语法

注意：默认一些高级的es6语法，webpack不可以打包，如静态变量 static

1. 加载两个loader:

```
npm install babel-core babel-loader babel-preset-env babel-preset-stage-0 -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
module:{
    rules:[
    	//从右到左加载
        {test:/\.js$/,use:['babel-loader']}
    ]
}
```

3. 需要在根目录创建一个`.babelrc`的配置文件，需要指定转化js的语法规则

```
{
    "presets":['env','stage-0']
}
```



注意：默认不指定babel-loader版本，安装的是目前最新8版本，需要安装7版本才行。

www.npmjs.com,在这里找对应的版本进行下载即可

```
npm install babel-loader@7.1.4  -D
```



## webpack打包  .vue组件的

1. 加载两个loader:

```
npm install vue-loader vue-template-compiler -D
```

2. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```
var VueLoaderPlugin = require("vue-loader/lib/plugin.js");
module:{
    rules:[
    	//从右到左加载
        {test:/\.vue$/,use:['vue-loader']}
    ]
},
plugins:[
    new VueLoaderPlugin();
]
```

3. 需要在根目录创建一个`.babelrc`的配置文件，需要指定转化js的语法规则

```
{
    "presets":['env','stage-0']
}
```



## webpack打包scss文件

1. 加载两个loader:

```
npm install sass-loader node-sass -D
```

1. 配置webpack.config.js配置文件，设置module属性，进行匹配文件，加载对应的loader

```

module:{
    rules:[
    	//从右到左加载
        {test:/\.scss$/,use:['style-loader',css-loader',sass-loader']}
    ]
}
```

1. 需要在根目录创建一个`.babelrc`的配置文件，需要指定转化js的语法规则

```
{
    "presets":['env','stage-0']
}
```



## es6中的导入和导出模块

- 两个语法： export defualt（一个）  、 export(导出多个，按需导出)
- 当使用 export defualt导出的时候，import 模块名 from '模块的标识符'
- 当使用export导出的时候，应该使用 import { title,content} from '模块的标识符'

==注意==： 模块的标识符可以是路径，也可以是node_modules中的模块名 

- 当js模块没有使用export default 或者是export进行导出，我们可以直接采用 import  '模块的路径即可'

  这种情况，一般加载css较多 

  ```
  import './lib/mui/css/style.css'
  ```



# vue项目第一天

项目仓库地址：`git@github.com:ww24kobe/vuecmsshop.git`

包含两个项目：cms、shop

cms: content manger system ，内容管理系统



## 完成app组件的头部header部分

- 找页面所需要的组件，优先考虑mint-ui,再找mui.
- 这里我们用mintui的header组件
- 在main.js中引入mint-ui的header组件（按需导入），并且要引入样式文件
- 在App.vue，中头部设置以下代码：

```
 <mt-header fixed title="vue-cmsshop"></mt-header>
```

- 设置app-container样式，距离上内边距padding-top:40px



## 完成app组件的底部的tabbar部分

- 找到mui组件的==example/tabbar.html==组件，复制对应的tabbar代码部分即可
- 需要在main.js中引入mui的css样式



### 完成tabbar图标部分

- 其中购物车需要使用mui的扩展字体和扩展字体的css文件 icons-extra.css
- 需要在main.js将上面的css文件需要引过来
- 同时还需复制mui中扩展字体mui-icons-extra.ttf放到lib/mui/fonts文件夹下面



### 点击tabbar显示不同的组件

- 把a链接修改为router-link,指定to属性
- 在main.js文件中，导入vue-router,创建路由匹配的对象，把路由对象挂在vm实例身上
- 在app.vue设置路由匹配到的容器 router-view

### 点击tabbar高亮显示

- 修改路由对象的默认类

```
'linkActiveClass':'mui-active'
```

- 设置路由` '/'`重定向到`/home`

  



# 完成home组件的头部的轮播图

- 找mint-ui的轮播图

```
<mt-swipe :auto="2000">
      <mt-swipe-item>111111</mt-swipe-item>
      <mt-swipe-item>2222</mt-swipe-item>
      <mt-swipe-item>333333333333333333</mt-swipe-item>
</mt-swipe>
```

- 在main.js，按需导入轮播图所需要的组件
- 在home.vue中，要给轮播图设置高度，

```
 .mint-swipe{
      height: 200px;
  }
```



## 完成home组件的头部的轮播图数据的获取

- 安装vue-resource，模块
- 在main.js中引入我们的vue-resource
- 在home.vue的created生命周期函数中，发起ajax请求，获取轮播图数据，赋值到当前data的lunbo
- 在使用v-for遍历数据
- 把img中宽度和高度比例设置100%



# 完成home组件的九宫格布局设置

- 找mui组件的9宫格，复制其对应的html代码即可
- 修改9宫格的图标为自己的图片（6个）
- 设置样式：
  - 设置9宫格的背景色为白色 #fff
  - 把每个单元格边框去掉
- 设置每个单元格中的img宽度为50%



# 修改首页的新闻资讯的链接地址，展示对应的组件

# 完成新闻列表的布局

- 使用mui列表组件examples/media-list.html

- 后续需要微调样式即可。

  

# 完成新闻列表的数据的获取

- 发送ajax请求，获取数据 ，可以在main.js中设置ajax请求的根路径:

  ```
  //全局设置ajax请求的根域名
  Vue.http.options.root = "http://127.0.0.1:3000/";
  ```

  

- 使用v-for进行数据的渲染即可



# 抽出路由模块

- 首先把所有的路由匹配封装一个router.js文件中。
- router.js中通过export default 暴露出路由对象
- 在main.js中通过import  ‘router’ from 'router.js路径'



# 把代码提交到github

注意：创建仓库的时候，记住，不要把前面的复选框给勾选，这样相当于创建了一个空仓库，

- 然后再去本地通过git init 把项目变为一个仓库，

- 提交代码： git add .      、   git commit -m  '备注信息'

- 设置本地的远程仓库地址（如果是ssh协议，前提要在本地配置好公钥和私钥）

  ```
  git remote add origin  git@github.com:ww24kobe/vuecmsshop.git
  ```

- 推送代码

  ```
  git push -u origin master:master
  ```



# 修改新闻列表的详情的链接地址，展示对应的组件

- 修改链接地址，把a标签改为router-link ,其中to属性需要参数绑定

  ```
  <router-link :to="'/home/newsdetail/'+item.id">
  ```

  ==注意==：其中字符串部分/home/newsdetail/需要用引号包起来，同时和变量item.id，进行拼接，to属性需要属性绑定：to.

- 在router.js进行路由匹配对应的组件

- 在组件中获取路由参数

  - 模板：

    ```
    $route.params.id
    ```

  - 在script中通过加this来获取即可

  ```
   this.$route.params.id
  ```

  



# vue项目第二天

## 有关vue项目相关错误解决

- 只要是报`node_modules/`错误，解决办法，看具体是什么错误
  - 假设报node-sass错误，解决办法：把对应的pageage.json中的node-sass依赖选项给删除，在重新安装此模块 npm install node-sass -D
  - 上面办法如果解决不了，再把node_modules整个目录重新删除，在运行npm install 安装所有的依赖







## 获取新闻详情的数据渲染到页面

- 使用data中的id保存当前文章的id,
- 在methods发送ajax请求，获取文章详情数据
- 在created生命周期函数中，进行初始化调用
- 模板渲染数据

## 定义好时间的过滤器，完成时间格式的转化

1. 安装moment时间处理模块
2. 在main.js中进行引入，定义一个全局的过滤器如名称为:dateFormat
3. 模板中使用过滤器 

```
{{  item.add_time | dateFormat }}
```





## 完成新闻详情的评论区域的样式绘制

## 获取评论数据，要渲染到页面中

## 发表评论

1. 给发表评论按钮绑定单击事件

2. 获取到评论的值，给评论元素设置v-model属性双向绑定即可。

3. 判断内容不能为空，为空则用Toast进行提示

4. 调用接口发布评论 

   ==注意==：发送post请求默认会报此错误。需要在post()第三个参数设置{emulateJSON:true},作用模拟post表单来传递数据,

   ```
   this.$http.post("api/postcomment/"+this.id,{content:this.content},{emulateJSON:true}).then()
   ```

   或通过main.js文件全局设置：

   ```javascript
   //全局设置post请求体，默认post表单传递数据
   Vue.http.options.emulateJSON = true;
   ```

   

5. 并且清空评论区域的内容



## 完善发表评论

- 当发表评论成功之后，不应该把评论数据直接显示在页面中，应该要重新加载最新的评论数据，这样可以防止读取到脏的评论数据。

  ```javascript
  //发表评论的方法
        postComment(){
          //判断数据是否为空
          if(this.content.trim() == ''){
            Toast('不能为空');
            return ;
          }
          //发送ajax请求，发布评论
          //post第二个参数post请求体参数  第三个是模拟post表单传递数据（也可以全局设置）
          this.$http.post("api/postcomment/"+this.id,{content:this.content},{emulateJSON:true}).then(function(res){
            if(res.body.status == 0){
               Toast('评论成功');
               //把当前的评论数据放在数组的末端
               this.content =''; //清空评论的信息
               this.comments = []; //清空数据
               this.getComments();  //重新加载最新的评论信息
            }
          });
        }
  ```

  

     ## 完成首页的图片分享的链接地址展示对应的组件



## 使用vant-ui组件完成图片分享的头部tab标签页

手册： https://youzan.github.io/vant/#/zh-CN/tab

1. 先安装vant-ui
2. 在项目中引入对应的组件和引入其css文件
3. 找到官网的tab可滑动的标签页html代码片段即可。



## 获取图片列表的标签页的数据

- 在methods中建立一个getImgCat 方法 ，还要额外追加对{id：0，title:全部}
- 找到vant-tab使用v-for进行遍历出来即可



## 实现图片的懒加载

- 使用mint-ui的lazyload组件,进行引入
- 给img标签设置v-lazy属性，值为图片的路径





## 完成图片的详情数据获取及渲染



## 抽离评论的子组件，完成父子组件间的传值



# 项目的第三天





## 获取图详情的缩略图数据



## 完成图片详情缩略图的图片预览

- 需要借助一个插件 vue-preview





## 前端flex弹性布局

参考地址：https://www.runoob.com/w3cnote/flex-grammar.html





## 设置首页的商品购买的链接地址跳转到对应的组件



## 实现商品列表的两列布局



## 获取商品列表中的数渲染到模板中



## 完成商品列表跳转商品详情



## 实现商品列表的加载更多和图片的懒加载

## 实现商品详情的卡片布局

- 使用mui组件  example/card.html

## 抽离首页的轮播图为单独组件



## 商品详情第一个卡片轮播图

## 商品详情第二个卡片样式绘制

- 使用到了mui组件，数字输入框 number-box组件

## 商品详情第三个卡片样式绘制





## 完成商品详情的第二个卡片数字输入框numbox组件



- 要引入mui.js文件。

  ```
   //引入mui的js文件
   import mui from "../../lib/mui/js/mui.js";
  ```

- 使用mui组件 `number-box`数字输入框，默认是不可以点击`+-`

```
<div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
	<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
	<input id="test" class="mui-input-numbox" type="number" value="1" />
	<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
</div>
```



- 引来发现报错：

```
'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to the
```

这是因为，webpack默认是严格模式打包，严格模式上面mui.js文件中出现了caller', 'callee', and 'arguments，这是在严格模式中不可以使用的。



解决办法：

- 不要使用mui中的组件,可以找其他的组件
- 移除严格模式（npm安装模块）

```
参考地址：https://www.npmjs.com/package/babel-plugin-transform-remove-strict-mode 
```

	1. 安装包

```
npm  --registry https://registry.npm.taobao.org  install babel-plugin-transform-remove-strict-mode -D
```

2. 安装好之后修改.babelrc配置文件，加一个插件plugins选项

   ```
   //.babelrc
   
   {
     "plugins": ["transform-remove-strict-mode"]
   }
   ```




## 解决数字输入框+-按钮失效的问题

是因为我们所引入的numbox-box是mui的js组件。这和我们vue中提供的虚拟dom挂载到真实DOM中有顺序问题。

```javascript
 mounted(){
      //执行这里，说明虚拟dom已经挂载到真实dom中，这时候，可以用js去操作页面中的dom元素
      //初始化我们的number-box组件
      mui('.mui-numbox').numbox(); 
},
```



## 完成商品详情的图文介绍

### 使用编程式导航进行跳转



注意：不可以把mt-button组件使用router-link来进行跳转。



解决办法：

​	使用vue提供的编程式导航来进行跳转。

```
this.$router.push()
```





==注意==： this.$route和this.$router的区别：

- this.$route : 路由参数对象。  this.$route.params.id
- this.$router:路由跳转对象      this.$router.push(path)



### 获取图文数据，进行渲染





## style的scope总结

scope作用： 尤大大设计的初衷就是实现组件样式私有化。对其他引入的子组件是不会产生任何影响。



scope实现原理：（底层是使用css属性选择器）

- 给当前组件的dom加上一个data的属性（类似data-v-5454545）,用来标识元素的唯一性。

- 最终样式是写在当前style标签中

  ```
   .click{
          float:right;
    }
    
    
    //加上scope属性，变成如下
     .click[data-v-5454545]{
          float:right;
    }
  ```

  

如果想让组件中的子组件或者是富文本编辑器中的内容可以设置样式。解决办法：

- 去掉scope

- 使用更深层的css选择器  

  ```css
  
  /deep/ img{
      width: 100%;
  }
     //或者
    .detail-container /deep/ img{
      width: 100%;
    }
  ```

  

  参考地址：https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements



# 项目的第三天

## 实现商品详情的评论子组件导入





## Vuex用法总结

1、npm 安装

2、 在main.js文件中，进行导入，并安装到Vue身上

```
import Vuex from 'vuex'; //导入vuex组件
Vue.use(Vuex); // 显示安装到vue身上去
```

3、 创建store创建对象，实现数据的共享

```
var store  = new Vuex.Store({
    state:{},
    mutations:{},
    getters:{}
});
```

4、 把store对象挂载到vue实例身上

```
new Vue({
    store:store //简写为store
});
```











5、有关仓库中state数据的操作

- mutations中的方法最多只能有2个参数
  - 第一个参数是state
  - 传进来的唯一参数

- 不可以直接去修改state中的数据，只能通过mutations提供的方法的来进行修改。

```
this.$store.commit('方法名','唯一的参数')
```

- 可以通过`this.$store.state.***`可以获取数据，但是不建议。
- 获取数据最好统一通过getters来获取共享中的数据

```
this.$store.getter.***
```

- vuex中的state数据是==响应==的。如果state中的数据发生变化，那么通过this.$store.getters.**获取到的数据可以得到及时响应。



完整代码：

```
var store = new  Vuex.Store({
  //数据共享定义在state(data)中
  state:{
    //要获取这里的共享，需要通过 this.$store.state.***
    //这里的共享数据子组件不可以更改，要通过mutations提供的方法才可以更改
    price:100,
    
  },

  //属性 mutations 专门用来实现修改state中的数据，这是唯一的办法
  mutations:{
    //里面所有的函数第一个参数一定都是state，这是固定写法
    //调用这里的方： this.$store.commit('方法名',"唯一的一个参数"), 
    //如果需要传递多个参数，可以封装一个数组或者对象传进来
    change(state,obj){
        console.log(obj);
        state.price = obj.newPrice+obj.new2Price;
    }
  },

  // 只要是vuex向外提供的数据，建议使用getters把暴露给外的数据进行一层封装
  // 调用形式： this.$store.getters.方法名
  getters:{ //类似计算属性computed
    //方法名(state){}   // 第一个参数也是固定的state
    getPrice(state){
      return state.price;
    }
  }
});
```









## 购物车的设计

- 把购物车的数据存储到本地存储，只要一修改购物车数据，就通过vuex实现数据共享同步。
- 创建一个数组，数组中的每个元素都是购物车中的一个商品

- 最终购物车的数组的格式

```
[{},{},{}]
```



- 每个商品都是一个对象

```
{
    id:商品的id,
    number:商品的数量
    price:商品的价格
    selected:商品的选中状态,默认true
}
```





## 把商品加入到购物车

## app组件中，获取购物车商品的总数量



## 完成购物车商品样式布局绘制





## 获取购物车数据并渲染

- 数据从哪里来?  vuex 中的state.cartData



## 获取购物车商品的购买数量并赋值给number-box

重点构造如下的对象结构，方便获取数据：

{商品id:数量}

{ "88": 20, "91": 15, "92": 20, "95": "10" } 



## 获取购物车商品的选中状态

重点构造如下的对象结构，方便获取数据：

{商品id:选中状态}

{ "88": true, "91": true, "92": true, "95": true } 



## 获取购物车==选中==商品的总数量和总价格

重点构造如下的对象结构，方便获取数据：

{

​	selectedNumber:23,

​	selectedPrice:67790

}







## 完成购物车商品的删除

- 获取要删除商品的id





## 修改购物车的购买数量

- 给numbox数字输入框绑定onchange事件，要获取到数量
- 父给子组件（numbox）传递商品的id.
- 调用mutations,最后同步到本地存储





## 实现项目返回按钮

- 修改app.vue的header部分

```
    <!-- header头部分 -->
    <mt-header fixed title="vue-cmsshop">
      <span slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
```





# 项目小结：

- 学会用vuejs构建单页面应用程序（SPA）

- 用vuejs能够处理各种复杂的数据关系（Vuex）

- 要会写==页面布局==

  

  

  

# phpexcel导入和导出

主要实现数据批量导入和导出的实现。