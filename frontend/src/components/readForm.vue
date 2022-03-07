<template>
  <div class="readfrom">
    
    <div class="cover"></div>
    <div class="readCont">
        <div class="Imgcover" v-if="!coverOff"></div>
        <img class="memoImg" :src="upUrl">

        <div class="inner">
            <div class="memoTitle"><span>{{readList[1]}}</span></div>
            <div class="memoDate"><span>{{readList[3]}}</span></div>
            <div class="memoCate"><span>장르-{{readList[2]}}</span></div>
            <div class="maincontent">
                <textarea id="cont" readonly v-model="readList[4]"></textarea>
            </div>
            <div class="evbtns">
                <button @click="del">삭제</button>
                <button @click="off">나가기</button>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "readfrom",
  props:{
    readList:{
        Type:Array,
    }
  },
  mounted() {
    this.imgName = this.readList[5].split(".")[0];
    const BackEl = document.getElementsByClassName("Imgcover");
    BackEl[0].style.background = 'white';

    axios.get(`http://127.0.0.1:3000/Download/${this.readList[6]}/${this.imgName}`)
    .then((response) => {
        this.upUrl=response.data;
        BackEl[0].style.background = 'none';
        BackEl[0].style.transition = 'all 1.5s';
        setTimeout(() => {
            this.coverOff=true;
        }, 1600);
    })
  },
  data(){
    return{
        upUrl:'',
        imgName:'',
        isrefresh:false,
        coverOff:false,
        sendingCate:'',
        sendingImg:'',
        sendingImgUrl:'',
    }
  },
  methods: {
    off(){this.$emit("off",{value:false,refresh:this.isrefresh});},
    del(){
        axios.post(`http://127.0.0.1:3000/delete`,{no:this.readList[0],name:this.imgName,roots:this.readList[6]})
        .then((response) => {
            if(response.data=="delete") {
                this.isrefresh=true;
                this.off();
            }
            else alert("삭제 실패하였습니다.");
        })
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/readform.scss'
</style>
