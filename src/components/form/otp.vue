<template>
<div>
    <div class="row justify-around">
        <q-input class="col-8" outlined v-model="otp" placeholder="Enter OTP" dense type="number" />
        <q-space />
        <q-btn class="col-3 q-pl-md" color="primary"  
        dense label="submit" :loading=loading @click="tryOtp" />        
    </div>
    
    <error class="bg-grey-7 text-white q-my-sm" v-if=error :name=error />

</div>
</template>

<script>
import error from 'components/display/error';

export default {
    props:['type'],
    components:{
        error
    },
    data(){
        return{
            otp:'',
            error:false,
            loading:false,
            endPoints:{
                "signup":"signup_otp_confirm",
                "forgot":"forgot_otp_confirm"
            }
        }
    },
    methods:{
        async tryOtp(){
            this.loading = true;
            this.error=false;
            var res = await this.$axios.post(this.endPoints[this.type],{otp:this.otp});
            if(res.status == 202) this.$emit('success');
            else this.error = res.data;
            this.loading = false;
        }
    }
}
</script>

<style>

</style>
