<template>
  <div class="contents animate__animated animate__fadeIn">
    <div class="contTitle">메모 <span>리스트</span></div>
    <Sildes v-if="sizing" @clickObj="goDetail"/>
    <div class="warp2 animate__zoomIn" v-if="!sizing">
      <div class="items">
        <div class="item" v-for="(i,index) in selectList" :key="index" @click="goDetail(i)">
          <p>{{i}}</p>
        </div>
      </div>
    </div>

    <div class="up" @click="goUp">
      <div class="arrow">˅</div>
      <div class="arrow">˅</div>
    </div>
  </div>
</template>

<script>
import Sildes from "@/components/Slide.vue";
export default {
  name: "contents",
  components: {
    Sildes,
  },
  mounted(){
    if(window.innerWidth<1000){
      this.sizing = false;
    }else{
      this.sizing = true;
    }
    this.elArrow = document.querySelectorAll(".arrow");
    this.elTilte = document.getElementsByClassName("contTitle");
    this.elItem = document.querySelectorAll(".item");

    if(this.$store.state.thema=="black") {
      this.elTilte[0].style.color="white";
      for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="white";
      for(var i=0; i<this.elItem.length;i++) this.elItem[i].style.border="1px solid white";
    }
    else{
      this.elTilte[0].style.color="black";
      for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="black";
      for(var i=0; i<this.elItem.length;i++) this.elItem[i].style.border="1px solid black";
    }
    window.addEventListener('resize', () => {
      if(window.innerWidth<1000){
        this.sizing = false;
      }else{
        this.sizing = true;
      }
    });
  },
  data(){
      return{
        up:true,
        elArrow:'',
        elTilte:'',
        elItem:'',
        sizing:true,
        selectList:['Movie',"Book","Animation","Sweet","Travel"],
        movieCate:['액션','범죄','SF','코미디','로맨스','스릴러','공포','스포츠','판타지','애니메이션'],
        aniCate:['추리','어드벤처','학원','스포츠','순정','코믹','액션','SF','판타지','일상'],
        bookCate:['추리','판타지','SF','호러/공포','무협','액션','로맨스'],
        sendList:[],
      }
  },
  methods:{
    goUp(){
      this.$emit('goUp',this.up);
    },
    goDetail(val){
      if(val!="Sweet" && val!="Travel") this.SetCate(val);
      else this.sendList = [];
      this.$store.commit("saveCate", {cate:val, arr:this.sendList});
      this.$router.replace("/detail");
    },
    SetCate(val){
      switch (val) {
        case "Movie":
            this.sendList = this.movieCate;
            break;
        case "Book":
            this.sendList = this.bookCate;
            break;
        case "Animation":
            this.sendList = this.aniCate;
            break;
        default:
            break;
      }
    },
  },
  computed:{
    check_Thema(){return this.$store.getters.getThema},
  },
  watch:{
    check_Thema(val){
      if(val=="black") {
        this.elTilte[0].style.color="white";
        for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="white";
        for(var i=0; i<this.elItem.length;i++) this.elItem[i].style.border="1px solid white";
      }
      else{
        this.elTilte[0].style.color="black";
        for(var i=0; i<this.elArrow.length;i++) this.elArrow[i].style.color="black";
        for(var i=0; i<this.elItem.length;i++) this.elItem[i].style.border="1px solid black";
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/contents.scss';
</style>
