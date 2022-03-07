<template>
    <div class="detailitem">
        <div class="search">
           <div class="btns" v-for="(i,index) in search_item_lists" :key="index">
               <button :id="'catebtn'+index" class="animate__animated" @click="onoffCate($event)" @mouseenter="Enter($event)" @mouseleave="Leave($event)">{{i}}</button>
           </div>
        </div>

        <div class="items">
            <template  v-for="(i,index) in paginatedData">
                <li v-if="fliterList[cateList.findIndex(item=>item==i.cate)]" :key="index">
                    <div class="data_items" @click="viewItem(index)">
                        <div class="data_no">{{index+1}}</div>
                        <div class="data_title">{{i.title}}</div>
                        <div class="data_back"></div>
                    </div>
                </li>
            </template>
        </div>
        
        <div class="btn-cover">
            <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                <p>이전</p>
            </button>
            <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
            <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                <p>다음</p>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'detailitem',
    mounted() {
        this.countEl = document.getElementsByClassName("page-count");
        if(this.$store.state.thema=="black") {
            this.countEl[0].style.color="white";
        }
        else{
            this.countEl[0].style.color="black";
        }
        this.search_item_lists = this.$store.state.itemList;
        this.getData();
    },
    data() {
        return {
            item_lists:[],
            search_item_lists:[],
            pageNum: 0,
            shareCount:0,
            listcount:0,
            countEl:'',
            itemEl:'',
            cateList:[],
            fliterList:[],
            shareList:[],
            pList:[],
            pCount:0,
        };
    },
    computed: {
        pageCount () {
            let listLeng, listSize, page;
            listLeng = this.item_lists.length;
            listSize = 12,
            page = Math.floor(listLeng / listSize);
            page = Math.floor((listLeng - 1) / listSize) + 1;
            return page;
        },
        paginatedData () {
            var start=0, end=0
            start = this.pageNum * 12; 
            end = start + 12;
            return this.item_lists.slice(start, end);
        },
        check_Thema(){return this.$store.getters.getThema},
        get_state(){return this.$store.getters.getState},
    },
    methods: {
        nextPage () {
        this.pageNum += 1;
        },
        prevPage () {
        this.pageNum -= 1;
        },
        viewItem(val){
            setTimeout(() => {
                this.$emit("read",{value:true,lists:this.item_lists[val]});
            }, 200);
        },
        getData(){
            axios.get(`http://127.0.0.1:3000/load/${this.$store.state.cate}`)
            .then((response) => {
                if(response.data.count !=0){
                    this.listcount = response.data.count;
                    this.item_lists = response.data.data;
                    this.item_lists.reverse();
                }
                this.setvalue();
            });
        },
        setvalue(){
            setTimeout(() => {
            var count=0;
            for(let i=0; i<this.item_lists.length;i++){
                if(!this.cateList.includes(this.item_lists[i].cate)) {
                    this.$set(this.cateList,count,this.item_lists[i].cate);
                    this.$set(this.fliterList,count,true);
                    count++;
                }
            }
            for(let i=0; i< this.search_item_lists.length;i++){
                if(!this.cateList.includes(this.search_item_lists[i])){
                    const btnEl = document.getElementById(`catebtn${i}`);
                    this.$set(this.shareList,this.shareCount,this.search_item_lists[i]);
                    btnEl.disabled ='true';
                    this.shareCount++;
                }
            }
            this.$store.commit('saveState',{state:this.fliterList});
        }, 100);
        },
        onoffCate(e){
            const getBtnEl = document.getElementById(e.target.id);
            if(getBtnEl.style.textDecoration!="line-through") {
                getBtnEl.style.textDecoration="line-through";
                for(let i=0;i<this.cateList.length;i++){
                    if(this.cateList[i]==getBtnEl.innerText) this.$set(this.fliterList,i,false);
                }
            }
            else {
                getBtnEl.style.textDecoration="none"
                for(let i=0;i<this.cateList.length;i++){
                    if(this.cateList[i]==getBtnEl.innerText) this.$set(this.fliterList,i,true);
                }
            }
            this.$store.commit('saveState',{state:this.fliterList});
        },
        Enter(e){
            const el = document.getElementById(e.target.id);
            el.classList.add("animate__rubberBand");
        },
        Leave(e){
            const el = document.getElementById(e.target.id);
            el.classList.remove("animate__rubberBand");
        },
    },
    watch:{
        check_Thema(val){
            if(val=="black") {
                this.countEl[0].style.color="white";
            }
            else{
                this.countEl[0].style.color="black";
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/base.scss';
@import '@/scss/item.scss';
</style>