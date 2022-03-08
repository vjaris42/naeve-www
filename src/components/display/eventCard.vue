<template>
<div>

<div class="q-pa-sm">
<!--Task name and VENUE-->
<div class="row">
    <div class="col-10">
        <router-link class="noDeco" :to="{name:'event',params:{id:inp.id}}" >
            <div class="eventTitle"> {{inp.title}}</div>
        </router-link>
    </div>
    <div class="col-2 text-right">
        <q-chip dense :color="color[inp.status]" class="text-capitalize" text-color="white">
            {{inp.status}}
        </q-chip>
    </div>
</div>

<div class="row q-pb-xs">
    <span class="venuKey q-pr-xs"> Venue : </span>
    <span class="venuVal">{{inp.venue}}</span>
</div>


<!--Task name and Photo-->

<!--Core Data Points-->

<div class="row justify-between q-pt-sm">
    <div v-for="(item,index2) in dataPoints" :key="index2" class="col-auto">
        <div class="full-width itemKey text-center">
            {{item.label}}
        </div>
        <div class="full-width itemVal text-capitalize text-center">
            {{eventsHuman[item.key]}}
        </div>
    </div>
</div>

<!--Core Data Points-->
      
</div>

<!--Footer-->
<div v-if="$route.name!='event'" class="full-width row justify-around bg-green-7 shadow-6 q-pa-xs text-white">
    <div class="col-6">
        Posted on {{inp.born | dateHuman}}
    </div>
    
    <div class="col-5 text-right">
        <router-link class="text-white noDeco mota" :to="{name:'event',params:{id:inp.id}}" >
            More Details  >>
        </router-link>
    </div>            
</div>
<!--Footer-->

</div>
</template>


<script>
export default {
    props:['inp'],
    data(){
        return{
            dataPoints:[
                {key:'pay_per_day',label:'Per Day'},
                {key:'begin', label:'Date'},
                {key:'strength', label:'Total'},
                {key:'days', label:'Days(#)'},
                //{key:'gender', label:'Gender'}
            ],
            color:{
                'pending':'grey-7',
                'active':'blue',
                'held':'green',
                'cancel':'red-7',
                'complete':'orange',
                'applied':'primary',
                'selected':'green',
                'fired':'orange',
                'unfit':'red-7',
                'backout':'brown',
                'adverse':'black',
            },
            genderDict:{
                male:{
                    single:'Boy',
                    plural:'Boys'
                },
                female:{
                    single:'Girl',
                    plural:'Girls'
                },
                all:{
                    single:'Person',
                    plural:'People'
                }
            }
        }
    },
    computed:{
        event(){
            return this.inp;
        },
        eventsHuman(){
            var currEvent = this.inp;
            var gender = currEvent['gender'];
            var strengthForm = (currEvent['strength'] > 1) ? 'plural' : 'single'; 
            return {
                pay_per_day:currEvent['pay_per_day'] + " ₹",
                begin:this.$options.filters.dateHuman(currEvent['begin']),
                days:currEvent['days'],
                strength:currEvent['strength'] +' '+ 
                this.genderDict[gender][strengthForm]
            }            
        }
    }

}
</script>


<style scoped>
.eventTitle{
    font-size: 1.2em;
    font-family: 'Lato', sans-serif;
}
.mota{
    font-weight: 425;
}
.name{
    font-size: 1.15em;
}
.venuKey{
    font-family: 'Noto Sans';
    font-size: 1.2em;
    font-weight: bold;
}
.venuVal{
    font-family: 'Noto Sans';
    font-size: 1.15em;
}
.itemKey{
    padding-bottom: 2px;
    font-size:1.15em;
    font-weight: 450;
}
.itemVal{
    font-size: 1.05em;
}
</style>
