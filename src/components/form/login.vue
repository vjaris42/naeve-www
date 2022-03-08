<template>
  <div>
    <q-input outlined v-model="form.accName" label="Mobile or E-Mail" dense/>

    <q-input dense outlined label="Password" class="q-mt-sm"
      v-model="form.pass" :type="isPwd ? 'password' : 'text'">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    
    <error class="bg-grey-7 text-white q-my-xs" v-if=error :name=error />

    <q-btn class="full-width q-my-sm" color="primary" 
    :loading="loading" outlined label="Log-In" @click="tryLogin" />
  </div>
</template>

<script>
import error from 'components/display/error';
import { isLength } from 'validator';

export default {
  components:{
    error
  },
  data() {
    return {
      error:false,
      form: {
        accName: "",
        pass: ""
      },
      loading: false,
      isPwd: true
    }
  },
  methods:{
    async tryLogin(){
      this.loading = true;
      this.error = false;
      if(this.validateData() ){
        var res = await this.$axios.post('login',this.form);
        if(res.status==201) this.$emit('success');
        else this.error = res.data;
        this.loading = false;
      }
      this.loading = false;

    },
    validateData(){
      return true;
    }
  }
}
</script>

<style>
</style>
