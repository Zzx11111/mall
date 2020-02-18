<template>
  <div>
    <div class="image">
      <img :src="info.image" alt="">
    </div>
    <div class="title">
      {{info.title}}
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      info: {
        type: Object,
        default() {
          return {}
        }
      },
    },
  }
</script>

<style scoped>

</style>