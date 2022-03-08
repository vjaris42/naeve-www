<template>
<q-page class="caraousel">
<q-no-ssr>
   <div class="row q-pb-md">
       <div class="col-12 ">
            <q-carousel  animated v-model="slide" navigation infinite
            :autoplay=2300>
            <q-carousel-slide v-for="index in 3" :key="index" 
            :name=index :img-src="'statics/banner/'+index+'.png'" />
            </q-carousel>
       </div>
</div>

<div class="text-center text-h5 q-pa-md text-weight-light">
    We provide people for such events and many more
</div>

<div class="row justify-center">
<div class="col-xl-10 col-lg-10 col-md-10 col-12 row  justify-center">
       <div class="col-lg-2 col-md-2 col-xl-2 col-sm-3 col-xs-3 col-4 q-pa-md"
       v-for="(item, index) in eventTypes" v-bind:key="index">
           <q-card class="my-card">
                <q-img :src="'statics/event_types/'+item.image" basic />
            </q-card>
       </div>    
</div>
</div>
<div class="row col-12 q-pa-md"><q-separator /></div>

<div class="row justify-center q-pa-md">
<div class="col-xl-10 col-lg-10 col-md-10 col-12 row justify-center">
    <div class="col-md-3 col-lg-3 col-xl-3 col-11 row justify-center"
    v-for="(step, index) in steps" v-bind:key="index" :class="{'q-pr-md':$q.platform.is.desktop}">
        <q-card class="my-custom-card shadow-8 q-mb-md">
            <q-card-section>
            <img :src="'statics/process/'+step.src" 
            style="height: 150px; width: 100%; text-align: vertical;">
            </q-card-section>
            <q-card-section>
                <div class="text-h6 text-center text-weight-light q-pb-xs">{{step.title}}</div>
                <div class="text-body text-center text-weight-light">{{step.caption}}</div>
            </q-card-section>
        </q-card>
    </div>
</div>
</div>

</q-no-ssr>
</q-page>
</template>

<script>

export default {
    meta(){
        
    },
    components:{
        
    },
    data(){
        return{
            slide: 1,
            eventTypes: [
                {name: 'Catering', image: 'catering.jpg'},
                {name: 'Marketing', image: 'marketing.jpg'},
                {name: 'Volunteer', image: 'volunteer.jpg'},
                {name: 'Survey', image: 'survey.jpg'},
                {name: 'Entertainer', image: 'entertainment.jpg'},
                {name: 'Assisting', image: 'help.jpg'}
            ],
            steps: [
                {
                    src: 'create.jpg',
                    title: 'Create an account',
                    caption: 'Fill in your details and apply for an event'
                },
                {
                    src: 'apply.jpg',
                    title: 'Apply for an event',
                    caption: 'Select the appropriate event for which you are eligible'
                },
                {
                    src: 'attend.jpg',
                    title: 'Attend the event',
                    caption: 'Be on time and perform the necessary tasks'
                },
                {
                    src: 'paid.jpg',
                    title: 'Get Paid',
                    caption: 'On successful completion of the event you will get paid.'
                }
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>
.caraousel{
    padding:0px;
    width:100%;
}

.my-custom-card
  min-width:100%
</style>