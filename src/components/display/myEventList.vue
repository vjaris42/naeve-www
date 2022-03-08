<template>
<q-item >
<q-item-section>
            <div class="eventTitle"> {{inp.title}}</div>

</q-item-section>
</q-item>
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
