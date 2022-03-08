<template>
<div class="row items-center">
    <div class="col-4 row">
        <q-avatar class="q-pr-xs" size="80px">
            <q-img :src="profile.avatar | ourMedia" /> 
        </q-avatar>          
    </div>

    <div class="col-7">
        <div class="full-width name text-left">{{profile.name}}</div>
        <div class="text-left">
            <q-chip dense square color="indigo" text-color="white">
                <span class="statVal">{{wallet}}  </span>₹ in Wallet  
            </q-chip>
            <q-chip dense  square color="orange-8" text-color="white">
                <span class="statVal">{{stats.complete}}</span> &nbsp; complete events 
            </q-chip>            
        </div>

    </div>        

<br>
<span class="full-width text-h6"></span>

</div>    
</template>

<script>
export default {
    data(){
        return{
            stats:{}
        }
    },
    computed:{
        wallet(){
            var amnt = this.stats.wallet;
            if(!amnt) return 0;
            return (amnt > 999) ? (amnt/1000).toFixed(1)+'k' : amnt;
        },
        profile(){
            return this.$store.getters['user/profile'];
        }
    },
    methods:{
        async fetchStats(){
            var res = await this.$axios.get('stats');
            this.stats = res.data;
        }
    },
    created(){
        this.fetchStats();
    }
}
</script>

<style scoped>
.name{
    font-size:1.2em;
    font-family: 'Raleway';
    font-weight: 600;
}
.statVal{
    font-size: 1.2em;
}
</style>
