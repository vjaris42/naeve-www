<template>
<div>
    <div class="row justify-center q-my-sm">
            <q-input class="full-width" dense v-model="form.newEmail" outlined  label="New Email" />

            <q-input class="full-width q-my-sm" dense outlined label="Password" 
            v-model="form.pass" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
                <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
                />
            </template>
            </q-input>  

    </div>

    <error v-if="error" :name=error class="text-white q-my-sm bg-grey-6" />

    <div class="row q-my-md justify-center">
        <div class="col-6">
            <q-btn class="full-width" label="Submit" color="primary" @click=updateEmail />
        </div>      
    </div>

</div>
</template>

<script>
import error from 'components/display/error';
import {isEmail, isLength} from 'validator';

export default {
    components:{
        error
    },
    props:['val'],
    data(){
        return {
            isPwd:true,
            error:false,
            form:{
                newEmail:'',
                pass:''
            },
        }
    },
    methods:{
        async updateEmail(){
            if(this.validateData() ){
            var res = await this.$axios.post('change_email',this.form);
            if(res.status!=202) this.error = res.data;
                else this.$emit('success');
            }
        },
        validateData(){
            var email = isEmail(this.form.newEmail) ;
            var pass = isLength(this.form.pass,{min:3}) ;
            if (!email) this.error = 'not_an_email';
            if(!pass) this.error = 'incorrect_pass';
            return (email && pass);
        }
    }
}
</script>

<style>

</style>
