<template>
  <div class="home">
    <Load v-if="!off" :getColor="this.$store.state.thema"/>
    <Main v-if="!isMain" @goDown="goDown"/>
    <Contents v-if="isMain" @goUp="goUp"/>
  </div>
</template>

<script>
import Main from '@/components/main.vue'
import Contents from '@/components/contents.vue'
import Load from '@/components/MainLoading.vue'

import 'animate.css';
export default {
  name: "Home",
  components: {
    Main,
    Contents,
    Load,
  },
  mounted() {
    this.$store.commit("clearCate");
    setTimeout(() => {
      this.off=true;
    }, 4000);
  },
  data(){
    return{
      isMain:false,
      isView:false,
      off:false,
    }
  },
  methods: {
    goDown(val){this.isMain=val;},
    goUp(val){this.isMain=!val;},
  },
};
</script>
<style lang="scss" scoped>
@import '@/scss/base.scss';
.home{
  @include size-set(100vw,100vh);
  overflow: hidden;
  position: relative;
  .cover{
    @include size-set(100%,100%);
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0;
  }
}
</style>
