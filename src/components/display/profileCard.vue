<template>
<div>
    <div class="row bg-orange-9 shadow-3 q-pa-xs text-center">
        <span class="col title">About the {{(user.recruiter) ? 'Recruiter' : 'User'}}</span>
    </div>
    <div class="q-px-sm q-my-sm">
        <div class="row items-center q-pb-sm">
            <div class="col-auto">
                <q-avatar size="60px">
                    <q-img :src="user.avatar | ourMedia"/>
                </q-avatar>
            </div>                  
            <router-link class="q-pl-sm col-auto noDeco" :to="{name:'user',params:{id:user.user_id}}" >
                <span class="name text-capitalize">{{user.name || fullName}} </span>
            </router-link>  
        </div>       
        <div class="full-width">
            <div class="q-px-sm bio">
                {{user.bio}}
            </div>
        </div>

</div>

</div>
</template>

<script>
export default {
    props:['inp'],
    computed:{
        user(){
            return this.inp;
        }
    }
}
</script>


<style scoped>
.title{
    font-size: 1.25em;
    font-weight: 450;
    color:whitesmoke;
}
.name{
    font-size: 1.3em;
    font-weight: 600;
    font-family: 'Raleway';
    word-wrap: break-word;
}
.bio{
    font-size: 1.0em;
    font-family: 'Monsterrat', sans-serif;
    color:dark-brown;
}

</style>
