<template>
<q-page>
<q-no-ssr>

    <div class="row justify-center q-mt-lg">
      <div class="col-xl-6 col-lg-6 col-md-6 col-12 bg-white shadow-3 q-pa-md">
        <div class="text-h6 q-mb-sm text-center">Reset Your Password</div>
        <div v-if="requestPending">
          <div class="text-subtitle1">We will send you a message with an OTP</div>
          <q-input outlined dense class="q-my-sm" v-model="mobile" placeholder="Your phone number" 
          mask="##########">
            <template v-slot:prepend>
              <q-icon name="smartphone"/>
            </template>
          </q-input>

          <error class="bg-grey-7 text-white q-my-xs" v-if="error" :name="error" />

          <q-btn
            color="primary"
            label="submit"
            class="full-width q-my-sm"
            :loading="loading"
            @click="requestForgotOtp"
          />
        </div>
        <div v-else>
          <otpForm v-if="otpPending" type="forgot" @success="otpPending = false"/>
          <div v-else>
          <div class="text-subtitle1">Enter a new password for your account</div>
            <q-input
              dense
              outlined
              label="Password"
              class="q-mt-sm"
              v-model="pass"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <error class="bg-grey-7 text-white q-my-xs" v-if="error" :name="error"/>
            <q-btn color="primary" label="submit" class="full-width q-my-sm" 
            :loading="loading" @click="changePass" />
          </div>
        </div>

        <!--Form Footer hai ye-->
        <div class="row q-pt-sm q-px-sm text-subtitle1">
          <div class="col-6">
            <router-link class="noDeco" to="/forgot">Forgot Password ?</router-link>
          </div>
          <div class="col-6 text-right">
            <router-link class="noDeco" to="/signup">Create an Account</router-link>
          </div>
        </div>
      </div>
    </div>
  </q-no-ssr>
</q-page>

</template>

<script>
import error from "components/display/error";
import otpForm from "components/form/otp";
import { isLength } from "validator";

export default {
  components: {
    otpForm,
    error
  },
  data() {
    return {
      isPwd: true,
      error: false,
      pass:'',
      mobile: '',
      requestPending: true,
      otpPending: true,
      loading: false
    }
  },
  methods: {
    async requestForgotOtp() {
      if (isLength(this.mobile, { min: 10, max: 10 })) {
          this.loading = true;
          var res = await this.$axios.post("forgot_pass", { mobile: this.mobile });
          this.loading = false;
          if (res.status == 202) this.requestPending = false;
          else this.error = res.data;
      }
      else this.error = "not_a_mobile_number";
    },
    async changePass() {
      if (isLength(this.pass, { min: 3 })) {
          this.loading = true;
          var res = await this.$axios.post("forgot_change_pass", { pass: this.pass });
          console.log(res.data);
          this.loading = false;
          if (res.status != 202) this.error = res.data;
          else{
              this.$q.notify('Your password has been changed');
              this.$router.push('/login');
          }
      } else this.error = "not_a_pass";
    }
  }
};
</script>

<style>
</style>
