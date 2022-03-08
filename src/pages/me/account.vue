<template>

<div class="row q-px-md">
  <div class="col-xl-6 col-lg-6 col-md-6 col-12">
    <div class="row">
      <div class="col-4 heading">
        Full Name :  
      </div>
      <div class="col-7 detail q-mr-md">
        {{account.name}}
      </div>
      <div class="col-11 q-mr-md">
        <q-separator class="q-mb-md"/>
      </div>

      <div class="col-4 heading">
        Gender :  
      </div>
      <div class="col-7 detail q-mr-md">
        {{account.gender}}
      </div>
      <div class="col-11 q-mr-md">
        <q-separator class="q-mb-md"/>
      </div> 

      <div class="col-4 heading">
        Mobile :  
      </div>
      <div class="col-7 detail q-mr-md">
        {{account.mobile}}
      </div>
      <div class="col-11 q-mr-md">
        <q-separator class="q-mb-md"/>
      </div>

      <div class="col-4 heading">
        D.O.B. :  
      </div>
      <div class="col-7 detail q-mr-md">
        {{account.dob | dateHumanFull}}
      </div>
      <div class="col-11 q-mr-md">
        <q-separator class="q-mb-md"/>
      </div>   
    </div> 
  </div>

  <div class="col-xl-6 col-lg-6 col-md-6 col-12" >
    <div :class="{'q-pr-md q-pt-sm':$q.platform.is.desktop,'q-pt-sm':$q.platform.is.mobile}" >
      <messageUs />
      <logOut class="q-mt-sm" />
    </div>
  </div>
  <div class="col-12 ending q-mt-md">
    Your account was created on {{account.born | dateHumanFull}}
  </div>
</div>
</template>

<script>
import messageUs from 'components/form/messageUs';
import logOut from 'components/form/logOut';

export default {
    components:{
        messageUs,
        logOut
    },
  data(){
    return{
      account:{},
    }
  },
  methods:{
    async fetchAccountDetails(){
      var res = await this.$axios.get('account_details');
      this.account = res.data;
    },

  },
  created(){
    this.fetchAccountDetails();
  }
}
</script>

<style scoped>
.avatarImage{
  max-width:50px;
}

.heading{
  font-family: 'Poppins', sans-serif;
  font-size: 1.2em;
  text-align: end;
}

.ending{
  font-family: 'Poppins', sans-serif;
  font-size: 1.2em;
  text-align: center;
}

.detail {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2em;
  vertical-align: center;
  text-align: end;
  text-transform: capitalize;
  text-align: center
}
</style>
