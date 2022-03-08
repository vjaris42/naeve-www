<template>
<div>
    
<!-- Upper Toolbar -->
<div class="row items-center q-pa-xs bg-white shadow-3">    
    <div class="col-9 row">
        <div class="col-3 text-subtitle2">Page {{page}}</div>
        <div class="col-9 text-subtitle2 text-center">
        {{(recruiter || $route.name=='events') ? 'My Events' : 'New Events'}}
        </div>
    </div>
    <div class="col-3 text-right">
        <q-btn dense flat icon="chevron_left" :disabled="page==1" @click="prevPage" />
        <q-btn dense flat icon="chevron_right" :disabled=noMorePages @click="nextPage" />
    </div>
</div>    
<!-- Event detail Cards -->
<div v-if="currPageEvents.length > 0">
    <div v-for="(item,index) in currPageEvents" :key="index" class="q-my-md">
        <eventCard :inp=item class="bg-white shadow-3" />
    </div>
</div>
<div v-else>
    <div class="q-pa-md q-my-md bg-white shadow-3 row full-width">
        <div class="youHavent ">
            Nothing To show
        </div> 
    </div>
</div>
<!--  Event detail Cards -->

<!--NEXT PAGE -->
<div class="row items-center q-pa-xs q-mt-md bg-white shadow-3">   
    <div class="col-9 row">
        <div class="col-3 text-subtitle2">Page {{page}}</div>
        <div class="col-9 text-subtitle2 text-center">
        {{(recruiter || $route.name=='events') ? 'My Events' : 'New Events'}}
        </div>
    </div>
    <div class="col-3 text-right">
        <q-btn dense flat icon="chevron_left" :disabled="page==1" @click="prevPage" />
        <q-btn dense flat icon="chevron_right" :disabled=noMorePages @click="nextPage" />
    </div>
</div>    
<!--NEXT PAGE -->
<!--SPINNER LOADING-->
<q-inner-loading :showing="loading">
    <q-spinner-gears size="80px" color="indigo" />
</q-inner-loading>        
<!--SPINNER LOADING-->
</div>
</template>

<script>
import eventCard from './eventCard';
import {concat} from 'lodash';

export default {
    props:['inp'],
    components:{
        eventCard,
    },
    data(){
        return{
            loading:false,
            page:1,
            allEvents:[],
            dataPoints:[
                {key:'pay_per_day',label:'Pay Per Day'},
                {key:'begin', label:'Date'},
                {key:'days', label:'No of Days'},
                {key:'gender', label:'Gender'}
            ],
            lastPage:1
        }
    },
    computed:{

        recruiter(){
            return this.$store.getters['user/recruiter'];
        },
        currPageEvents(){
            var currPageEvents = [];
            var allEvents = this.allEvents;
            var currPageMax = this.inp.limit * this.page;
            var currPageMin = currPageMax - this.inp.limit;
            for(var i=currPageMin; i < currPageMax ;i++){
                if(allEvents[i]) currPageEvents.push(allEvents[i]);
            }
            return currPageEvents;
        },
        totalEvents(){
            return this.allEvents.length;
        },
        noMorePages(){
            return (this.lastPage == this.page);
        }
    },
    methods:{
        async nextPage(){
            if(this.totalEvents == (this.inp.limit * this.page)){
                this.page = this.page+1;
                await this.getEvents();
            }else{
                this.page = this.page+1;
            }
        },
        prevPage(){
            this.page = this.page-1;
        },
        async getEvents(){
            var currPage = this.page;
            if(currPage===1) this.loading = true;
            var allEvents = this.allEvents;
            var query = {limit:this.inp.limit, skip: this.totalEvents };
            var res = await this.$axios.get(this.inp.path,{ params: query });
            if(res.data.length > 0){
                this.allEvents = concat(allEvents, res.data);
                this.lastPage = (res.data.length < this.inp.limit) ? currPage : currPage+1;
            }else{
                this.page = (this.page == 1) ? 1 : currPage - 1;
                this.lastPage = this.page;
            }
            this.loading = false;

        }
    },
    created(){
        this.getEvents();
    }

}
</script>
<style>
.youHavent{
    font-size: 1.3em;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
}
</style>

