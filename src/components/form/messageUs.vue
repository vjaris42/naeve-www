<template>
<div class="row justify-center">
    
    <q-input class="full-width" placeholder="What's the matter ?" 
    dense outlined v-model=msg autogrow maxlength="180" />
    <div class="col-9 q-pa-xs text-left">
        <q-chip v-for="(item,index) in chips" :key="index" 
        :color=item[1] square :text-color=item[2] dense>{{item[0]}}</q-chip>
    </div>
    <q-btn class="col-3 q-my-sm" label="Send" dense color="primary" @click="submit" />
</div>
</template>

<script>

export default {
    data(){
        return{
            msg:'',
            chips:[
                ['Ask','red','white'],
                ['Suggest','yellow','black'],
                ['Help','indigo','white'],
                ['Complain','brown','white']
            ]
    }
    },
    methods:{
        async submit(){
            if(this.msg.length < 10) return;
            var res = await this.$axios.post('support_message',{
                path:this.$route.path,
                message:this.msg
            });
            if(res.status!=202) return;
            this.$q.notify('Your Message has been sent. We will look into it ASAP.');
            this.msg = '';
        }        
    }
}
</script>

<style>

</style>
