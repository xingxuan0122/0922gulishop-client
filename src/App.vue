<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 在这发请求去获取三级分类的数据，那么就只会发一次，而且一次就够了，因为数据不变。
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style>

</style>
