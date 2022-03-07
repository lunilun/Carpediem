<template>
  <div class="changeBright">
    <button class="dark_right" @click="changeBright"><div id="BrightImg"></div></button>
  </div>
</template>

<script>
export default {
  name: "changeBright",
  mounted() {
    this.elImg = document.getElementById("BrightImg");
    this.elApp = document.getElementById("app");
    if(this.$store.state.thema=="black"){
      this.elImg.style.background  = `url("${this.BrightUrl}") center no-repeat`;
      this.elImg.style.backgroundSize = "contain";
      this.elApp.style.background="black";
      this.iscolor="black";
    }
  },
  data(){
    return{
      isBright:true,
      BrightUrl: require('@/Img/Icon/bright.png'),
      DarkUrl: require('@/Img/Icon/dark.png'),
      iscolor:'white',
      elImg:'',
      elApp:'',
    }
  },
  methods: {
    changeBright(){
      this.isBright = !this.isBright;
      if(!this.isBright){
        this.elImg.style.background  = `url("${this.BrightUrl}") center no-repeat`;
        this.elImg.style.backgroundSize = "contain";
        this.elApp.style.background="black";
        this.iscolor="black";
      }else{
        this.elImg.style.background  = `url("${this.DarkUrl}") center no-repeat`;
        this.elImg.style.backgroundSize = "contain";
        this.elApp.style.background="white";
        this.iscolor="white";
      }
      this.$store.commit("changeThema", {color:this.iscolor});
      this.elImg.style.transition="all .6s";
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/base.scss';
.dark_right{
    position: absolute;
    right: 10px; top: 10px;
    @include size-set(50px,50px);
    padding: 5px;
    background: white;
    border-radius: 10px;
    z-index: 99;
    &:hover{cursor: pointer;}
    #BrightImg{
        @include size-set(100%,100%);
        background: url('../Img/Icon/dark.png') center no-repeat;
        background-size: contain;
    }
}
</style>
