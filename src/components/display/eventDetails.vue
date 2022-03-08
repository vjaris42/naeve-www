<template>
<div>
<div class="row justify-center">
    <div class="col-12">
        <div class="text-h6 text-weight-regular">
            Event Date{{(multiDayEvent) ? 's' : ''}}
            <q-separator />
        </div>
        <div class="text-body1 q-mb-sm">
            {{event.begin | dateHuman}} 
            <span v-if="multiDayEvent">
                to {{event.end | dateHuman}} 
            </span>
        </div>
    </div>

    <div class="col-12">

        <div class="text-h6 text-weight-regular">
            Interview:
            <q-separator />
        </div>
        <div class="text-body1 q-mb-sm">
            {{event.interview}} 
        </div>
    </div>

    <div class="col-12">

        <div class="text-h6 text-weight-regular">
            Workday:
            <q-separator />
        </div>
        <div class="text-body1 q-mb-sm">
            {{event.workday}} 
        </div>
    </div>

    <div class="col-12" v-if="eligibility">

        <div class="text-h6 text-weight-regular">
            Eligibility:
            <q-separator />
        </div>
        <div class="text-body1 q-mb-sm">
            <q-chip class="chipText" dense color="blue" text-color="white" icon="check"
            v-for="(criteria, index) in eligibility" :key="index">
                {{criteria | formatName}}
            </q-chip>
        </div>
    </div>

    <div class="col-12" v-if="perks">
        <div class="text-h6 text-weight-regular">
            Perks:
            <q-separator />
        </div>
        <div class="q-mb-sm ">
            <q-chip class="chipText" dense color="red" text-color="white" icon="check"
            v-for="(perk, index) in perks" :key="index">
                {{perk | formatName}}
            </q-chip>
        </div>
    </div>

    <div class="col-12" v-if="event.description">
        <div class="text-h6 text-weight-regular">
            Description:
            <q-separator />
        </div>
        <div class="text-body1 q-mb-sm">
            {{event.description}} 
        </div>
    </div>
</div>

</div>    
</template>

<script>
export default {
    props: ['inp'],
    data(){
        return{
            called:{'strength':'Total Peopel'},
            items:['strength','pay_per_day','days']
        }
    },
    computed: {
        event() {
            return this.inp
        },
        multiDayEvent(){
            return (this.event.days > 1);
        },
        eligibility() {
            return (this.event.eligibility) ? this.event.eligibility.split(',') : false;
        },

        perks() {
            return (this.event.perks) ? this.event.perks.split(',')  : false;
        }
    }
}
</script>

<style scoped>
.chipText{
    font-family: 'Monsterrat', sans-serif;
    font-size: 0.9em;
}
</style>
