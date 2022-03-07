<template>
  <div id="app">
    <Bright/>
    <router-view />
  </div>
</template>

<script>
import Bright from '@/components/changeBright.vue'
export default {
  name: "app",
  components: {
    Bright,
  },
  mounted(){
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li{
  list-style: none;
  text-decoration: none;
}
#app{
  background: white;
}
</style>
