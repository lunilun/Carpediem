<template>
  <div class="slide animate__animated animate__fadeIn">

    <div class="warp1">
      <button class="next" @click="next">Next</button>
  
      <ul id="imgholder" class="imgs">
        <li v-for="(i, index) in 5" :key="index">
          <div :id="'inner'+index" class="inner" @click="send($event)">
            <span class="txt">{{txtData[index]}}</span>
          </div>
        </li>
      </ul>
  
      <button class="prev" @click="prev">Prev</button>
    </div>


  </div>
</template>

<script>
export default {
  name: "slide",
  components: {
  },
  mounted(){    
    this.holderEl = document.getElementById("imgholder");
    this.setSlide();
  },
  data(){
      return{
        holderEl:'',
        index:[],
        zPos:[],
        zItem:[],
        tempP:'',tempI:'',
        txtData:['Movie',"Book","Animation","Sweet","travel"]
      }
  },
  methods:{
    send(e){
      const clickEl = document.getElementById(e.target.id);
      this.$emit('clickObj',clickEl.childNodes[0].innerText);
    },
    setSlide(){
      for(var i=0; i<this.holderEl.childNodes.length;i++){
        const child = this.holderEl.childNodes[i];
        child.childNodes[0].style.zIndex = `${-i}`;
        child.childNodes[0].style.transform = `translateX(${((i+1)*20)}%) translate(-50%, ${50-(i*20)}px)`;

        this.index.push(child.childNodes[0].style.zIndex);
        this.zPos.push(child.childNodes[0].style.transform);
        this.zItem.push(document.getElementById(child.childNodes[0].id));
      }
    },
    prev(){
      this.tempP = this.zPos[this.zItem.length-1];
      this.tempI = this.index[this.zItem.length-1];
      this.check("prev");
    },
    next(){
      this.tempP = this.zPos[0];
      this.tempI = this.index[0];
      this.check("next");
    },
    check(type){
      if(type=="next"){
        for(var i=0;i<this.zItem.length;i++){
          if(i>=this.zItem.length-1){
            this.$set(this.zPos,i,this.tempP);
            this.$set(this.index,i,this.tempI);
          }else{
            this.$set(this.zPos,i,this.zPos[i+1]);
            this.$set(this.index,i,this.index[i+1]);
          }
        }
      }
      else if(type=="prev"){
        for(var j=this.zItem.length-1; j>=0; j--){
          if(j<=0){
            this.$set(this.zPos,j,this.tempP);
            this.$set(this.index,j,this.tempI);
          }
          else{
            this.$set(this.zPos,j,this.zPos[j-1]);
            this.$set(this.index,j,this.index[j-1]);
          }
        }
      }

      for(var num=0;num<this.zItem.length;num++){
        this.zItem[num].style.transform = this.zPos[num];
        this.zItem[num].style.zIndex = this.index[num];
        this.zItem[num].style.transition="0.8s"
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/Slide.scss';
</style>
