<template>
  <div class="minaLoading">
    <div class="back">
        <div class="black"></div>
        <div class="black"></div>
        <div class="black"></div>
        <div class="black"></div>
    </div>

    <div class="gauge">
      <div class="per_one"></div>
      <div class="per_two"></div>
      <div class="msg">
        <div>L</div>
        <div>o</div>
        <div>a</div>
        <div>d</div>
        <div>i</div>
        <div>n</div>
        <div>g</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "minaLoading",
  props:{
    getColor:{
      Type:String,
    }
  },
  mounted(){
    this.nowColor="";
    this.nowColor = this.getColor;
    this.blackEl = document.querySelectorAll(".black");
    this.gaugeEl = document.getElementsByClassName("gauge");

    if(this.nowColor == "white"){
      this.bColors("black");
      this.cColors("white");
    }else{
      this.bColors("white");
      this.cColors("black");
    }

    setTimeout(() => {
      this.isopen = true;
    }, 2000);
  },
  data(){
    return{
      isopen:false,
      blackEl:'',
      gaugeEl:'',
      nowColor:'',
    }
  },
  methods: {
    bColors(bcolor){
      for(let i=0;i<this.blackEl.length;i++){
        this.blackEl[i].style.background = `${bcolor}`;
      }
    },
    cColors(ccolor){
      for(let i=0;i<this.gaugeEl[0].childNodes.length;i++){
        if(i!=this.gaugeEl[0].childNodes.length-1) this.gaugeEl[0].childNodes[i].style.border=`5px dashed ${ccolor}`;
        else this.gaugeEl[0].childNodes[i].style.color=`${ccolor}`;
      }
    }
  },
  watch:{
    'isopen'(){
      if(this.isopen){
        if(this.isopen){
          this.gaugeEl[0].classList.add("animate__animated","animate__fadeOut");
          for(let i=0;i<this.blackEl.length;i++){
              if(i%2==0) this.blackEl[i].classList.add("animate__animated","animate__fadeOutUp");
              else this.blackEl[i].classList.add("animate__animated","animate__fadeOutDown");
          }
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/mainloading.scss';
</style>
