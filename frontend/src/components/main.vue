<template>
  <div class="mains animate__animated animate__fadeIn">

    <div class="mainTitle"><p>Carpe diem</p></div>
    <div class="down" @click="goDown">
      <div class="arrow">˅</div>
      <div class="arrow">˅</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mains",
  components: {
  },
  mounted(){
    this.elArrow = document.querySelectorAll(".arrow");
    this.elTilte = document.getElementsByClassName("mainTitle");
    if(this.$store.state.thema=="black") {
      this.elTilte[0].style.color="white";
      for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="white";
    }
    else{
      this.elTilte[0].style.color="black";
      for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="black";
    }
  },
  data(){
      return{
        down:true,
        elArrow:'',
        elTitle:'',
      }
  },
  methods:{
    goDown(){
      this.$emit('goDown',this.down);
    },
  },
  computed:{check_Thema(){return this.$store.getters.getThema}},
  watch:{
    check_Thema(val){
      if(val=="black") {
        this.elTilte[0].style.color="white";
        for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="white";
      }
      else{
        this.elTilte[0].style.color="black";
        for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="black";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/main.scss';
</style>
