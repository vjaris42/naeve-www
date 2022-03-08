<template>
<div class="no-padding">
    <q-list v-if="wallet.length > 0" separator bordered>
    <q-item clickable v-for="(item,index) in wallet" :key="index" class="row"  >
              <div class="col-12 row">
                  <div class="col-7">
                      {{item.title}}
                  </div>
                  <div class="col-1">
                      {{item.amount}}₹
                  </div>   
                  <div class="col-2">
                      {{item.born | dateHuman}}
                  </div>                
                  <q-chip class="col-auto text-capitalize absolute-right" dense square >
                  {{item.action}}
                  </q-chip>
              </div>
    </q-item>
  </q-list>
  <div v-else class="text-center text-subtitle1 q-pa-sm">
    No wallet history found
  </div>
</div>
</template>

<script>
export default {
    data(){
        return{
          wallet:[]
        }
    },
    methods:{
      async fetchWallet(){
        var res = await this.$axios.get('wallet');
        this.wallet = res.data;
      }
    },
    created(){
      this.fetchWallet();
    }
}
</script>

<style>

</style>
