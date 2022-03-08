<template>
<q-page>
<q-no-ssr>
    
<div class="row justify-center q-mt-xl">
    <div class="col-xl-6 col-lg-6 col-md-6 col-12 bg-white shadow-3 q-pa-sm">
    <div class="text-center text-h6 q-py-sm">Log-In</div>
        <loginForm  @success=loginSuccess />
        <div class="row q-pt-sm q-px-sm text-subtitle1">
            <div class="col-6" >
                <router-link class="noDeco" to="/forgot">Forgot Password ?</router-link>
            </div>
            <div class="col-6 text-right" >
                <router-link class="noDeco" to="/signup">Create an Account</router-link>
            </div>
        </div>
    </div>
    
</div>

</q-no-ssr>
</q-page>

</template>

<script>
import loginForm from 'components/form/login';

export default {
    components:{
        loginForm,
    },
    data(){
        return{
            
        }
    },
    methods:{
        loginSuccess(){
            this.$q.notify({color:'primary',message:'You have been logged In'});
            var redirect = this.$route.params.redirect || '/home'; 
                this.$router.push(redirect);
        }
    }

}
</script>

<style>

</style>
