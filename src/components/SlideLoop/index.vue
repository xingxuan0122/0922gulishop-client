<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div
          class="swiper-slide"
          v-for="(banner, index) in bannerList"
          :key="banner.id"
      >
        <img :src="banner.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  props: ['bannerList'],
  watch: {
    // 在listContainer内部，轮播图直接在这实例化是不行的，最终采用watch+nextTrick才完成的
    // 而floor当中的轮播图，为啥就直接成功了？
    // 它肯定是在页面形成之后才实例化的
    // 原因： 刚才在banner的时候，数据是在mounted里面请求的
    // 必须等待数据请求回来，然后根据数据创建好结构，才能实例化swiper

    // 现在我们的floor不需要，因为在floor当中，不存在请求数据，数据早就都请求回来了
    // 在Home组件当中请求的数据，而且floor组件的创建必须是根据请求回来的数据v-for才能创建
    // 所以floor中实例化的时候，数据一定是存在的，结构也就不需要等待数据，早早就形成了
    bannerList: {
      immediate: true, // 这里加它没什么用，就是为了让和floor的代码一致
      handler() {
        // 当数据一旦有变化，那么我们就去实例化swiper，但是发现不行
        // 我们就得考虑是不是页面还是没形成呢？答案是肯定的，也就说有了数据，上面页面才开始v-for形成结构
        // 得等结构完全形成之后再去实例化

        // 在最近一次页面更新完成之后，执行nextTick当中传递的回调函数
        // nextTick是页面最近的一次更新完成之后才会执行
        // updated 是只要页面有数据更新，那么就会执行，执行不关心是不是最近一次更新
        this.$nextTick(() => {
          new Swiper(this.$refs.bannerSwiper, {
            // direction: 'vertical', // 垂直切换选项
            autoplay:true, // 设置为true启动自动切换
            loop: true, // 循环模式选项 无缝

            // 如果需要分页器  小圆点
            pagination: {
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.swiper-button-prev{
  /*--swiper-theme-color: #ff6600;!* 设置Swiper风格 *!*/
  --swiper-navigation-color: #fff;/* 单独设置按钮颜色 */
  /*--swiper-navigation-size: 30px;!* 设置按钮大小 *!*/
}
.swiper-button-next {
  --swiper-navigation-color: #fff;/* 单独设置按钮颜色 */
}
</style>