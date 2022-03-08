<template>
<div class="no-padding">
    <q-list v-if="events.length > 0" separator bordered>
        <q-item clickable v-for="(item,index) in events" :key="index" 
        :to="{name:'event',params:{id:item.id}}" class="row"> 
            
            <div class="col-12 row">
                <div class="col-8">
                    {{item.title}}
                </div>
                <div class="col-2">
                    {{item.begin | dateHuman}}
                </div>                
                <q-chip class="col-auto text-capitalize absolute-right" 
                dense square >{{item.status}}</q-chip>
            </div>
        </q-item>
    </q-list>
  <div v-else class="text-center text-subtitle1 q-pa-sm">
    No event history found
  </div>    
</div>
</template>

<script>
export default {
    data(){
        return{
            events:[]
        }
    },
    computed:{
        recruiter(){
            return this.$store.getters['user/recruiter'];
        }
    },
    methods:{
        async fetchApplications(){
            var path = (this.recruiter) ? 'events' : 'applies';
            var res = await this.$axios.get(path);
            this.events = res.data;
        }
    },
    created(){
        this.fetchApplications();
    }
}
</script>

<style>
.protect{
    width:100%;
}
</style>
