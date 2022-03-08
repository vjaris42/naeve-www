<template>
  <div>
    <div class="row">
      <q-input class="col-6 q-pr-xs" outlined v-model="form.firstName" label="First Name" dense/>
      <q-input class="col-6" outlined v-model="form.lastName" label="Last Name" dense/>
    </div>

    <q-input class="col-6 q-my-sm" outlined :type="$q.platform.is.desktop ? 'text' : 'number'" 
    mask="##########" v-model="form.mobile" placeholder="Mobile Number" dense prefix="+91">
      <template v-slot:prepend>
        <q-icon name="smartphone" />
      </template>
    </q-input>

    <div class="row q-my-sm">
      <q-input outlined dense class="col-6 " v-model="form.dob"
      label="Date of Birth" type="date" stack-label />
      <q-select outlined dense class="col-6 q-pl-xs" v-model="form.gender"
      label="Gender" :options="['Female','Male']" stack-label />
    </div>


    <q-input dense outlined class="q-mb-xs" label="Password" v-model="form.pass"
    :type="isPwd ? 'password' : 'text'">
        <template v-slot:prepend>
          <q-icon name="lock"/>
        </template>      
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer" @click="isPwd = !isPwd"/>
        </template>
    </q-input>
    
    <q-checkbox v-model="terms" label="I've read & accept the Terms & Conditions" />

    <error class="bg-grey-7 text-white q-my-xs" v-if=error :name=error />

    <q-btn class="full-width q-mt-sm" color="red" :loading=loading outlined 
    label="Signup"  @click="trySignUp" />

  </div>
</template>

<script>
import error from 'components/display/error';
import {isEmail, isLength} from 'validator';
import { date } from 'quasar'

export default {
  components:{
    error
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        pass: '',
        mobile: '',
        gender:'Female',
        dob:null
      },
      error:false,
      terms:false,
      loading:false,
      isPwd: true
    }
  },
  computed:{
    above18(){
      if(!this.form.dob) return false;
      var d = new Date();
      var now = {date: d.getDate(), month:d.getMonth()+1, year:d.getFullYear() }        
      var birth = this.form.dob.split('-');
      var born = {date: birth[2], month: birth[1], year: birth[0]};
      var yearDiff = now.year - born.year;
      //checking for year more than 18
      if( yearDiff > 18 ) return true;
      else if(yearDiff == 18){
        var monthDiff = now.month - born.month;
        if( monthDiff > 0) return true;
        else if(monthDiff == 0){
          var dateDiff = now.date - born.date;
          if( dateDiff >= 0) return true;
        }
      } 
      return false;
      
      
    }
  },

  methods:{
    async trySignUp(){
      this.loading = true;
      this.error=false;
      if(this.validateData()){
        var res = await this.$axios.post('signup',this.form);
        if(res.status==202) this.$emit('success',this.form);
        else this.error = res.data;
      }
      this.loading = false;
    },
    validateData(){
      var form = this.form;

      var firstName = isLength(form.firstName,{min:2,max:20});
      var lastName = isLength(form.lastName,{min:2,max:20});
      var pass = isLength(form.pass, {min:3});
      var mobile = isLength(form.mobile, {min:10, min:10});

      if(firstName && lastName && mobile && pass && this.terms && this.above18) return true;

      else if(!firstName || !lastName) this.error = 'not_a_name';
      else if(!pass) this.error = 'not_a_pass';
      else if (!mobile) this.error = 'not_a_mobile_number';
      else if (!this.above18) this.error = 'under_age';
      else this.error='terms_not_accepted';
      return false;
    }
  }
}
</script>

<style>
</style>
