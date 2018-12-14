<template>
    <div class="goodslistcontainer">

    <router-link class="item" :to="'/home/goodsdetail/'+item.id" tag="div" v-for="item in goodslist" :key="item.id">
      <img v-lazy="item.img_url" alt="">
      <h2 class="title">{{ item.title }}</h2>
      <div class="info">
        <p class="price">
          <span class="now">¥ {{ item.sell_price }} </span>
          <span class="old">¥ {{ item.market_price }} </span>
        </p>
        <p class="hot">
          <span>热卖中</span>
          <span>剩 {{ item.stock_quantity }} 件</span>
        </p>
      </div>
    </router-link>
    <!-- 点击加载更多 -->
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
   
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>