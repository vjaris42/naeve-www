<template>
<q-page>
<q-no-ssr>

<div class="row justify-center q-mt-xl">
  <div class="col-xl-6 col-lg-6 col-md-6 col-12 bg-white shadow-3 q-pa-sm">
    <div class="text-center text-h6 q-py-sm">Sign-Up</div>
    <signupForm v-if="signupPending" @success="signupBegan"/>
    <div v-else>
      <div class="q-pa-sm text-subtitle1">
          Hey {{form.firstName}}, We've sent you an OTP(One Time Password) on {{form.mobile}}.
        </div>
      <otpForm type="signup" @success="signupComplete" />
    </div>
    <div class="q-pt-sm q-px-sm text-subtitle1 text-center">
      <router-link class="noDeco" to="/login">Have an Account? Log-In.</router-link>
    </div>
  </div>


</div>

</q-no-ssr>
</q-page>

</template>

<script>
import signupForm from "components/form/signup";
import otpForm from "components/form/otp";

export default {
  components: {
    signupForm,
    otpForm
  },
  data() {
    return {
      form:{},
      signupPending: true
    };
  },
  methods: {
    signupBegan(form){
      this.form = form;
      this.signupPending=false;
    },
    signupComplete() {
      this.$q.notify("Your account has been created");
      this.$router.push('/home');
    }
  }
};
</script>

<style>
</style>
