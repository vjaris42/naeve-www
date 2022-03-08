<template>
<div class="q-pa-xs">
    <div v-if="myEvent" class="row">
        <div class="col-12">
            <q-chip v-for="(val, key) in chip" :key="key" square dense
            :color="val.color" text-color="white">
            {{event[key]}} {{val.label}} 
            </q-chip>          
        </div>
        <q-btn class="full-width q-mt-sm" color="red" label="Manage Applications" 
        @click="$emit('manage')" />

    </div>

    <div v-else class="notMyEvent">
        {{myId}} {{inp}}
        You may also create events and hire people
    </div>    

</div>
</template>

<script>
import {pick} from 'lodash'
export default {
    props:['inp'],
    data(){
        return{
            chip:{
                strength:{color:'orange-8',label:'required'},
                applied:{color:'primary',label:'applied'},
                selected:{color:'brown',label:'selected'}
            }
        }
    },
    computed:{
        stats(){
            return pick(this.event,['selected','applications','strength']);
        },
        event(){
           return this.inp; 
        },  
        myEvent(){
            return (this.event.user_id == this.myId);
        },
        myId(){
            return this.$store.getters['user/id'];
        }
    }

}
</script>

<style>
.notMyEvent{
    font-family:'Poppins';
    font-size:1.2em;
}
</style>
