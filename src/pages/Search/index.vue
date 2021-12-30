<template>
  <div>
    <TypeNav></TypeNav>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ['keyword', 'keyword1'],
  mounted() {
    console.log(this)
  }
}
</script>

<style scoped>

</style>