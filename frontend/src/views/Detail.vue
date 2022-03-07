<template>
  <div class="detail">

    <div class="gohome">
      <button @click="gohome"></button>
    </div>

    <div class="goWrite">
      <button @click="gowrite"></button>
    </div>

    <WriteForm v-if="iswriting" @off="outwrite"/>
    <ReadForm v-if="isreading" :readList="readList" @off="outread"/>

    <div class="warp">
      <div class="inner">
        <div class="topmenu">
          <p id="topTitle">Memo for {{nowCate}}</p>
          <div class="menus">
              <div class="mlist" v-for="(i,index) in selectList" :key="index">
                <button :id="'btn'+index" :class="selectList[index]" @click="gootherPage(selectList[index])">{{selectList[index]}}</button>
              </div>
          </div>
        </div>
        <Item @read="read"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import Item from '@/components/detailItem.vue'
import WriteForm from '@/components/writeForm.vue'
import ReadForm from '@/components/readForm.vue'

export default {
  name: "detail",
  components: {
    Item,
    WriteForm,
    ReadForm,
  },
  mounted() {
    this.nowCate = this.$store.state.cate;
    this.DeTilteEl = document.getElementById("topTitle");
    this.mListEl = document.querySelectorAll(".mlist");
    this.setColor(this.$store.state.thema);
    this.sizingcon();
    window.addEventListener('resize', () => {
      this.sizingcon();
    });
  },
  data(){
    return{
      nowCate:'',
      selectList:['Movie',"Book","Animation","Sweet","Travel"],
      movieCate:['액션','범죄','SF','코미디','로맨스','스릴러','공포','스포츠','판타지','애니메이션'],
      aniCate:['추리','어드벤처','학원','스포츠','순정','코믹','액션','SF','판타지','일상'],
      bookCate:['추리','판타지','SF','호러/공포','무협','액션','로맨스'],
      sendList:[],
      readList:[],
      sizing:true,
      iswriting:false,
      isreading:false,
      isrevise:false,
      ttime:'',
      DeTilteEl:'',
      mListEl:'',
    }
  },
  methods: {
    gohome(){
      this.$store.commit("clearCate");
      this.$router.replace("/");
    },
    gowrite(){this.iswriting = true;},
    outwrite(val){
      this.iswriting = val.value
      if(val.refresh) window.location.reload();
    },
    other(val){this.gootherPage(val);},
    read(val){
      this.$set(this.readList,0,val.lists.no);
      this.$set(this.readList,1,val.lists.title);
      this.$set(this.readList,2,val.lists.cate);
      this.$set(this.readList,3,val.lists.date);
      this.$set(this.readList,4,val.lists.contents);
      this.$set(this.readList,5,val.lists.img);
      this.$set(this.readList,6,val.lists.thema);
      
      this.isreading=val.value;
    },
    outread(val){
      this.isreading = val.value;
      if(val.refresh) window.location.reload();
    },
    outrevise(val){
      this.isreading = !val.value;
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
    gootherPage(val){
      if(val!="Sweet" && val!="Travel") this.SetCate(val);
      else this.sendList = [];
      this.$store.commit("saveCate", {cate:val, arr:this.sendList});
      window.location.reload();
    },
    setColor(thema){
      if(thema=="black") {
        this.DeTilteEl.style.color="white";
        for(let i=0; i<this.mListEl.length;i++) {
            this.mListEl[i].style.background="black";
            this.mListEl[i].childNodes[0].style.color="white";
          }
        }
        else{
          this.DeTilteEl.style.color="black";
          for(let i=0; i<this.mListEl.length;i++){
            this.mListEl[i].style.background="white";
            this.mListEl[i].childNodes[0].style.color="black";
          }
        }
      },
      sizingcon(){
        if(window.innerWidth<750){
          this.sizing = false;
        }else{
          this.sizing = true;
        }
      }
    },
    computed:{check_Thema(){return this.$store.getters.getThema}},
    watch:{
      check_Thema(val){
        this.setColor(val);
      },
      'sizing'(){
        if(this.sizing) {
          this.setColor(this.$store.state.thema);
        }
      }
    }
};
</script>
<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/Detail.scss';
</style>
