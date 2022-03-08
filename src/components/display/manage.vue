<template>
<div class="bg-grey-3 q-pb-lg">
<q-toolbar class="bg-primary text-white">
    <q-toolbar-title>Manage Event</q-toolbar-title>
    <q-btn flat round dense icon="close" v-close-popup />
</q-toolbar>

<div class="row justify-around q-mt-md">

<div class="col-xl-3 col-lg-3 col-md-3 col-12 row justify-center">
    <div class="col-12 q-mb-md">
        <div class="full-width row shadow-3 bg-white q-pa-xs">
            <q-chip class="col" v-for="(val, key) in chip" :key="key" square
            :color="val.color" text-color="white">
            {{event[key]}} {{val.label}} 
            </q-chip>
        </div>

        <div class="desktop-only recGyan full-width q-pa-sm bg-white shadow-3 q-mt-sm">
            <div v-if="full">
                Positions are full for this event.
            </div>
            <div v-else>
                Firing people will attract a penalty. 
                <br>
                Carefully review users before selecting them.
            </div>        
        </div>
        <messageUs class="q-pa-xs q-pt-sm bg-white shadow-3 q-mt-sm"/>
    </div>
</div>

<div class="col-xl-8 col-lg-8 col-md-8 col-12">
    <div class="bg-white  shadow-4">
        <!--Upper Tabs-->
        <q-tabs  class="bg-primary text-white" dense v-model="showFrom" align="left">
            <q-tab dense v-for="(val,key) in statusInfo" :key=key :name=key :label=key />
        </q-tabs>

    <q-list separator>
        <q-item dense class="row q-my-xs" v-for="(item, index) in currApplies" :key="index">
            <!--Avatar-->
            <q-item-section avatar class="col-auto">
            <q-avatar class="shadow-1">
                <img :src="item.avatar | ourMedia"  />
            </q-avatar>
            </q-item-section>

            <!--Name Status-->
            <q-item-section class="col-auto">
                <router-link :to="{name:'user',params:{id:item.user_id}}" class="noDeco" >
                    <span class="name">{{item.name}}</span>
                </router-link>
                <span class="statusText">{{statusInfo[item.status][0]}}</span>
            </q-item-section>
            <q-item-section class="col-auto  text-center desktop-only">
                <q-chip dense>
                    <q-avatar class="bg-green-6 text-white" size="25px">
                        <q-icon name="phone" size="20px" />
                    </q-avatar>
                    {{item.mobile}}
                </q-chip>   
            </q-item-section>
            <q-space />
            <!--Actions-->

            <q-item-section class="col-auto text-capitalize">
                <q-chip square dense :color=statusInfo[item.status][1] 
                :text-color=statusInfo[item.status][2] class="cursor-pointer menuChip">
                    {{item.status}} 
                    <q-avatar v-if="actionsAvailable[item.status]" class="q-pl-sm" >
                        <q-icon name="keyboard_arrow_down" size="25px">
                        </q-icon>
                    </q-avatar>
                    <q-menu fit>
                        <q-list separator>
                            <span  v-for="(item2,index) in actionsAvailable[item.status]" 
                            :key="index">                            
                            <q-item class="bg-grey-4" v-if="showMenuItem(item2)"
                            dense clickable @click.native="act(item2,item)" v-close-popup >
                                <q-item-section class="text-capitalize">
                                    {{item2}}
                                </q-item-section>
                            </q-item>
                            </span>         
                        </q-list>
                    </q-menu>
                </q-chip>
                <q-chip dense class="mobile-only">
                    <q-avatar class="bg-green-6 text-white" size="25px">
                        <q-icon name="phone" size="20px" />
                    </q-avatar>
                    {{item.mobile}}
                </q-chip>                
            </q-item-section>
            <!--Actions Above-->            
        </q-item>


        <!--SPINNER LOADING-->
        <q-inner-loading :showing="loading">
            <q-spinner-gears size="80px" color="indigo" />
        </q-inner-loading>        
        <!--SPINNER LOADING-->
    </q-list>
    <div class="q-pa-xs recGyan text-center" v-if="currApplies.length<1">
        {{statusInfo[showFrom][3]}}
    </div>

    </div>
</div>




<!--Confirm Action-->
<q-dialog v-model="confirmBox"  position="top" >
      <q-card class="bg-white q-mt-md confirmBox" >
        <q-card-section>
            <span class="actionResult">
                {{user.name + ' ' + actionResult[action]}}
            </span>
            <div class="actionEffect">
                {{actionEffect[action]}}
            </div>            
        </q-card-section>
        <q-card-actions dense align="right" class="text-primary">
          <q-btn flat dense label="Cancel" v-close-popup />
          <q-btn flat dense class="bg-primary text-white" label="Confirm" v-close-popup 
          @click='performAct' />
        </q-card-actions>
      </q-card>    
</q-dialog>
<!--Confirm Action-->


</div>

</div>
</template>

<script>
import messageUs from 'components/form/messageUs'

export default {
    components:{
        messageUs
    },
    props:['inp'],
    data(){
        return{
            showFrom:'applied',
            chip:{
                strength:{color:'orange-8',label:'required'},
                selected:{color:'brown',label:'selected'},
                applied:{color:'primary',label:'applied'}
            },            
            user:{},
            confirmBox:false,
            applies:false,
            action:'',
            actionResult:{
                select:"will be selected for the event",
                adverse:"will be marked as adverse for the event",
                unfit:"will be marked unfit for the event",
                fire:"will be fired from the event."
            },
            actionEffect:{
                select:"Firing them from the event later will result in a penalty",
                adverse:"Our team will further investigate the matter",
                unit:"You will not be able to select them later",
                fire:"You will have to pay 10% of the per day amount as compensation"
            },
            actionsAvailable:{
                'applied':['select','unfit'],
                'selected':['fire'],
                'completed':['adverse']
            },
            statusInfo:{
                'applied':['has applied','pink','white','No New/Pending applications so far'],
                'selected':['has been selected','indigo','white',"You haven't selected anyone"],
                'fired':['was fired by you','orange','black',"You haven't fired anyone"],
                'unfit':['was marked unfit','black','white',"You haven't marked anyone as unfit"],
                'backout':['backed out of the event','yellow','black',"Nobody has backed out so far"],
                'adverse':['was marked adverse','green','black',"No adverse users on this event"],
                'complete':['has completed the event','brown','white',"Event not yet completed"]
            }
        }
    },
    computed:{
        currApplies(){
            var currApplies = [];
            var currStatus = this.showFrom;
            for(var i=0; i<this.applies.length; i++){
                var item = this.applies[i];
                if(item.status==currStatus) currApplies.push(item);
            }
            return currApplies;
        },
        event(){
            return this.inp;
        },
        full(){
            return (this.event.strength == this.event.selected)
        }
    },
    methods:{
        act(name,user){
            this.action=name;
            this.user=user;
            this.confirmBox=true;
        },
        async performAct(){
            var res = await this.$axios.post('manage',{
                action:this.action,
                userId:this.user.user_id,
                eventId:this.event.id,
            });
            if(res.status!=202) return;
            this.$emit('statModified');
            this.fetchApplications();
            
        },
        async fetchApplications(){
            this.loading=true;
            var res = await this.$axios.get('applications',{params:{eventId:this.event.id}});
            this.applies = res.data;
            this.loading=false;
        },
        showMenuItem(item){
            return !(item=='select' && this.full);
            
        }
    },
    created(){
        this.fetchApplications();
    }
}
</script>

<style>
.name{
    font-family: 'Poppins';
    font-size: 1.15em;
}
.actionResult{
    font-family: 'Poppins';
    font-size: 1.2em;
}
.actionEffect{
    font-family: 'Lato';
    font-size: 1.1em;
}
.statusText{
    font-weight:400;
    font-size:1.05em;
}
.confirmBox{
    border:5px solid brown;
    max-width:700px;
}
.menuChip{
    font-family:'Raleway';
    font-size:1.0em;
    font-weight: 600;
    letter-spacing: 0.8px;
}
.recGyan{
    font-family:'Ubuntu';
    font-size:1.2em;
    line-height: 140%;
}
</style>
