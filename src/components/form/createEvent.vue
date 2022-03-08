<template>
<div class="q-pb-md">
<!--Toolbar -->
<q-toolbar >
    <q-btn flat round dense icon="close" @click="$emit('close')" />
    <q-toolbar-title class="text-center">
        Create an Event
    </q-toolbar-title>
    <q-btn flat round dense icon="done" @click="submit"  />
</q-toolbar>
<!--Toolbar -->

<!--Form body begins -->
<div class="q-pa-sm">
<!--Error Display -->
<error v-if="error" class="q-pa-xs bg-grey-7 text-white" :name=error />

<fieldset>
    <legend class="text-subtitle1">About the Event</legend>
<div class="row justify-center items-center">
<q-input class="col-11" stack-label maxlength="50" counter   dense outlined 
v-model="form.title" placeholder="Ex Waitering for a Marriage Reception" />    
</div>

</fieldset>

<fieldset class="q-mt-md">
<legend class="text-subtitle1">Requirement</legend>

<div class="row justify-center  items-center">
    <div class="col-5 text-right q-pr-md">
        No. of People
    </div>
    <q-input class="col-6" mask="##" dense outlined  v-model="form.strength" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5  text-right q-pr-md">
        Total Days
    </div>
    <q-input class="col-6" mask="#" dense outlined v-model.number="form.days" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Event {{ (form.gender=='All') ? 'open'  : 'only' }} for
    </div>
    <q-select class="col-6" outlined dense v-model="form.gender" 
    :options="genderOptions"  label="Gender" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Eligibility
    </div>
    <!--
    <q-input class="col-6" outlined dense v-model="form.eligibility" />
    -->
    <tag class="col-6" type='skill' v-model=form.eligibility outlined />

</div>

</fieldset>


<fieldset class="q-mt-md">
<legend class="text-subtitle1">When & Where</legend>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        {{ (multiDayEvent) ? 'Starting from'  : 'Date' }}
    </div>
    <q-input class="col-6" type="date"  dense outlined  v-model="form.begin" />
</div>

<div v-if="multiDayEvent" class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Ends on
    </div>
    <q-input class="col-6" type="date" dense outlined  v-model="form.end" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Working Hours
    </div>
    <q-input class="col-6" outlined dense v-model="form.workday" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Event Venue
    </div>
    <q-input class="col-6" outlined dense v-model="form.venue" />
</div>

</fieldset>


<fieldset>
<legend class="text-subtitle1">Offering</legend>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Pay Per Day
    </div>
    <q-input class="col-6" mask="####" outlined dense v-model="form.pay_per_day" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Perks & Benefits
    </div>
    <tag class="col-6" type='perk' v-model=form.perks outlined />

</div>

</fieldset>


<fieldset>
<legend class="text-subtitle1">More Info</legend>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Interview / Selection
    </div>
    <q-input class="col-6" autogrow outlined dense v-model="form.interview" />
</div>

<div class="row justify-center q-mt-sm items-center">
    <div class="col-5 text-right q-pr-md">
        Description
    </div>
    <q-input class="col-6" outlined dense autogrow v-model="form.description" 
    maxlength="200" counter />
</div>

</fieldset>

</div>
<!--form body ends-->
</div>
</template>

<script>
import error from 'components/display/error'
import tag from 'components/form/tag'


export default {
    components:{
        error,
        tag
    },
    data() {
        return {
            error:false,
            interview: false,
            eligibility: false,
            dress:false,
            genderOptions: ['Male','Female','All'],
            form: {
                title: '',
                strength: null,
                days: null,                      
                gender:'All',
                eligibility:null,
                begin: null,
                end: null,
                workday:null,
                venue: '',
                pay_per_day: null,
                perks:"lunch,travel-cost",                
                interview: null,
                description:null, 
            },

        }
    },
    methods:{
        async submit(){
            if(this.validateData() ){
                var res = await this.$axios.post('create_event',this.form);
                if(res.status!=201) this.error  = res.data;
                else{
                    this.$emit('close');
                    this.$q.notify({
                        message:'Your event has been submitted',
                        color:'primary',
                        position:'center',
                        timeout:1500
                    });
            }
            }

        },
        validateData(){
            var form = this.form;
            if(!this.multiDayEvent) form.end = form.begin;
            var error = false;
            if(form.title.length < 10) error = 'not_for_task';
            else if(form.strength < 1 || form.strength > 50) error='hire_strength_limit';
            else if( form.days < 1 || form.days > 9 ) error = 'hire_day_limit';
            else if( form.pay_per_day < 300 ) error = 'hire_pay_limit';
            else if( !form.begin  || !form.end ) error = 'event_date_not_set';             
            this.form = form;
            this.error=error;
            return (typeof error === 'boolean')
            // ? true : false;  
        },
    },
    computed:{
        multiDayEvent(){
            return (this.form.days > 1);
        }
    },
    
}
</script>

<style>

</style>
