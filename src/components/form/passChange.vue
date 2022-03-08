<template>
<div>

    <q-input class="full-width q-my-sm" dense outlined label="Current Password" 
    v-model="form.oldPass" :type="isPwd ? 'password' : 'text'">
    <template v-slot:append>
        <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
        />
    </template>
    </q-input>  


    <q-input class="full-width q-my-sm" dense outlined label="New Password" 
    v-model="form.newPass" :type="isPwd ? 'password' : 'text'">
    <template v-slot:append>
        <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
        />
    </template>
    </q-input>  

    <error v-if="error" :name=error class="text-white q-my-sm bg-grey-6" />

    <div class="row q-my-md justify-center">
        <div class="col-6">
            <q-btn class="full-width" label="Submit" color="primary" @click=updatePass />
        </div>      
    </div>

</div>
</template>

<script>
import error from 'components/display/error';

export default {
    components:{
        error
    },
    data(){
        return {
            isPwd:true,
            error:false,
            form:{
                oldPass:'',
                newPass:'',
            },
        }
    },
    methods:{
        async updatePass(){
            if(this.validateData() ){
                var res = await this.$axios.post('change_pass',this.form);
                if(res.status!=202) this.error = res.data;
                else this.$emit('success');
            }
        },
        validateData(){
            var form = this.form;
            if(form.oldPass.length > 3){
                if(form.newPass.length > 3){
                    if(form.newPass == form.oldPass){
                        this.error = 'same_pass';
                        return false;
                    }else return true;
                }else{
                    this.error='not_a_pass';
                    return false;
                }
            }
            this.error='incorrect_pass';
            return false;
        }
    }
}
</script>

<style>

</style>
