<template>
<q-page>
<q-no-ssr>

<div v-if="event" class="row justify-center" 
:class="{'q-mx-md':$q.platform.is.mobile, 'q-my-md': $q.platform.is.mobile}">    
    <div class="col-xl-3 col-lg-3 col-md-3 col-12">
        <profileCard :inp="recruiterDetails" class="bg-white shadow-3"
        :class="{'q-mb-md': $q.platform.is.mobile}"/>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-12" >
        <div class="col-11" :class="{'q-ml-md':$q.platform.is.desktop}">
            <eventCard :inp="eventCard" class="bg-white shadow-3" />
            <eventDetails :inp="event" class="q-pa-md bg-white shadow-3 q-mt-md" />
        </div>
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-12 row justify-center " >
        <div class="col-xl-11 col-lg-11 col-md-11 col-12" :class="{'q-mt-md':$q.platform.is.mobile}" >
            <div class="bg-white shadow-3">
                <eventStats v-if=recruiter :inp=eventStats @manage="manageModal = true" />
                <applyForEvent v-else :id="event.id" />
            </div>          
        </div>
    </div>
</div>


<div v-else class="row justify-center">
  <notFound class="q-mt-xl q-pt-xl" />
</div>

<q-dialog  v-model="manageModal" maximized fullscreen >
    <manage :inp=manageInp  @statModified="fetchStats" />
</q-dialog>

</q-no-ssr>
</q-page>

</template>
<script>
import profileCard from 'components/display/profileCard';
import eventDetails from 'components/display/eventDetails';
import eventCard from  'components/display/eventCard';
import trendingEvents from  'components/display/trendingEvents';
import applyForEvent from  'components/display/applyForEvent';
import eventStats from 'components/display/eventStats';
import manage from 'components/display/manage';
import {pick, merge} from  'lodash';
import notFound from 'components/display/notFound';

export default{
    preFetch ({ store, currentRoute }) {
        var inp = {path:'event',params:{id:currentRoute.params.id} } ;
        return store.dispatch('page/fetch',inp);
    },
    meta(){
        if(!this.event) return {};        
        return{
            meta:{
                og_title:{
                    property:'og:title',
                    content:this.event.title,
                },                    
                og_description:{
                    property:'og:description',
                    content:this.event.pay_per_day+'₹ per day | On '+ 
                    this.$options.filters.dateHuman(this.event.begin) +
                    ' | ' + this.event.days +' Days'
                },                                
            }
        }
    },
    components:{
        notFound,
        eventDetails,
        profileCard,
        eventCard,
        trendingEvents,
        applyForEvent,
        eventStats,
        manage      
    },
    data(){
        return{
            manageModal : false
        }
    },
    watch:{
        $route(val){
            var inp = {path:'event',params:{id:val.params.id} } ;
            this.store.dispatch('page/fetch',inp);            
        }
    },
    methods:{
        async fetchStats(){
            var res = await this.$axios.get('event_stats',{ params : {id:this.event.id} });
            this.$store.commit('page/extend',res.data);
        }
    },
    computed:{
        recruiter(){
            return this.$store.getters['user/recruiter'];
        },
        eventStats(){
            return pick(this.event,['user_id','applied','selected','strength','pay_per_day'])
        },        
        event(){
            return this.$store.getters["page/default"];
        },
        manageInp(){
            return merge(this.eventStats, pick(this.event,['id','status','begin']) )          
        },
        recruiterDetails() {
            return pick(this.event,['name','bio','avatar','user_id', 'recruiter']);
        },
        eventCard() {
            return pick(this.event,['id','status','title', 'venue', 'strength', 'pay_per_day', 'days', 'begin','gender'])
        }

    }
}


</script>

<style scoped>

@media only screen and (max-width: 1200px) {
    .manageModal{
        min-width:100vw;
    }
}

.manageModal{
    min-width:70vw;
}
</style>
