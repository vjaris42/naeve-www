<template>
<q-page>
<q-no-ssr>

<div class="row justify-center">
    <div class="col-lg-2 col-xl-2 col-md-2 col-12" >
        <div class="sticky">
            <q-tabs inline-label :vertical="$q.platform.is.desktop" 
                :class="{'bg-primary text-white shadow-3':$q.platform.is.mobile}">

                    <q-route-tab class="name"  dense v-for="(item,index) in navigation" :key="index" 
                    :name=item.name  :to={name:item.to}  :label=item.name :icon=item.icon 
                    :class="{'q-router-link--exact-active q-router-link--active q-tab--active':
                    ($route.name=='me' && item.to=='account')}" />

            </q-tabs> 
        </div>     
    </div>


    <div class="col-lg-10 col-xl-10 col-md-10 col-12">
        <div class="row justify-center">
            <div class="col-xl-11 col-lg-11 col-md-11 col-12">
                <router-view class="bg-white q-pa-xs shadow-3"
                :class="{'q-px-xs':$q.platform.is.desktop,'q-mt-md':$q.platform.is.mobile}" />
            </div>
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
            navigation:[
                {name:"Account",to:"account",icon:"settings"},                
                {name:"Profile",to:"profile",icon:"person"},                
                {name:"Events",to:"events",icon:"calendar_today"},
                {name:"Wallet ",to:"wallet",icon:"account_balance_wallet"},
            ],
        }
    },
    computed:{
        profile(){
            return this.$store.getters['user/profile'];
        }
    }
}
</script>

<style>


 
</style>
