<template>
  <div class="writefrom">
    
    <div class="cover"></div>
    <div class="writeCont">
        <img class="memoImg" :src="defalutUrl">

         <div class="file">
            <label for="imgs">파일 선택</label>
            <div id="selName">{{nowUrl}}</div>
            <input ref="image" type="file" id="imgs" accept="image/jpg, image/png, image/jpeg" @change="uploadImg">
        </div>

        <div class="inner">
            <div class="memoTitle"><input id="title" type="text" placeholder="Enter the Title" maxlength="15"></div>
            <div class="memoCate">
                <select id="nowSel" name="thema" v-if="!offSelecet">
                    <option v-for="(i,index) in nowCate" :key="index" :value="i">{{i}}</option>
                </select>
            </div>
            
            <div class="maincontent">
                <textarea id="cont" maxlength="120"></textarea>
            </div>
            <div class="evbtns">
                <button @click="save">저장</button>
                <button @click="off">나가기</button>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "writefrom",
  mounted() {
    this.today = this.getDate();
    this.nowUrl = '선택파일 없음';
    if(this.defalutUrl=='') this.defalutUrl=require("@/Img/base.png");
    this.nowCate = this.$store.state.itemList;
    if(this.nowCate.length == 0) this.offSelecet=true;
    else this.offSelecet = false;
  },
  data(){
    return{
        today:'',
        nowUrl:'',
        defalutUrl:'',
        nowCate:[],
        offSelecet:'',
        sendingCate:'',
        sendingImg:'',
        sendingImgUrl:'',
        isrefresh:false,
    }
  },
  methods: {
    off(){this.$emit("off",{value:false,refresh:this.isrefresh});},
    save(){
        const titleEL = document.getElementById("title");
        const constentEL = document.getElementById("cont");
        const selEL = document.getElementById("nowSel");

        if(titleEL.value == "" || constentEL.value == "") alert("제목 및 내용은 필수 입력사항입니다.")
        else{
            if(this.offSelecet==true) this.sendingCate = "none"
            else this.sendingCate  = selEL.options[selEL.selectedIndex].text;

            if(this.nowUrl == '선택파일 없음') this.sendingImg = "none"
            else this.sendingImg = this.nowUrl;

            var sendData = {
                title: titleEL.value,
                cate:this.sendingCate,
                date:this.today,
                content:constentEL.value,
                img:this.sendingImg,
                thema:this.$store.state.cate,
                imgUrl:this.defalutUrl,
            };
            
            axios.post(`http://127.0.0.1:3000/save`, sendData)
            .then((response) => {
                if(response.data=="save"){
                    this.isrefresh=true;
                    this.off(); 
                }
            })
        }
    },
    getDate(){
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month  + '-' + day;
      return dateString;
    },
    uploadImg(e) {
      const img = e.target.files[0];
      this.imgpath = img;
      var reader = new FileReader(); 
      reader.onload = (e) => { this.defalutUrl = e.target.result;} 
      reader.readAsDataURL(this.imgpath);
      this.nowUrl = img.name;
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/writeform.scss';
</style>
