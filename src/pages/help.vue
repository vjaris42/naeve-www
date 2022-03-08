<template>
<q-page>
<q-no-ssr>
<div class="row justify-center q-py-md">
    <div class="col-xl-8 col-lg-8 col-md-8 col-12">
        <div v-for="(item,index) in helpItems" :key="index">
            <q-expansion-item  class="bg-white shadow-3 label" :label="item.label">
                    <div class="q-pa-md content">
                        {{item.content}}
                    </div>
            </q-expansion-item>
        </div>
    </div>
</div>
</q-no-ssr>
</q-page>
</template>

<script>
export default {
    data(){
        return{
            helpItems:[
                {label:'How does it works ?', 
                content:'You apply for an event. The recruiter goes through your profile and selects you. In the meantime you can apply for more events.'},

                {label: 'How does the payment works',
                content: 'Your payment will be initiated withing 24-36 hours on successful event completion.'},

                {label: 'Different types of application status',
                content: 'There are 4 types of application status. Applied, Selected, Backout, Fired. Whenever you apply for an event your applicaton status changes to applied. A selection from the recruiters end changes your application status to selected. If you wish to back out from an event your application status changes to backed out. If adverse activities has been observed at the event you status will be changed to fired.'},

                {label: 'What if I backout ?',
                content: 'Backing out at the event will result in a 10% penalty and might also hurt your ratings.'},

                {label: 'What if the user doesnt show up ?',
                content: 'If a user doesnt shows up at the event, they will have to pay a penalty. Meanwhile we will send an immediate replacement'},

                {label: 'How to become a recruiter',
                content: 'You need to contact us via mail or phone(7977039793) and we will set you up within a few business hours'},

            ]
        }
    }
}
</script>

<style>
.label{
    font-family: 'Poppins'
}
.content{
    font-family: 'Raleway';
    font-size:1.05em;
}
</style>
