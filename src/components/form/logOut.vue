<template>
<div>
<!-- the BIG RED log out button     -->
<q-btn  dense color="red" class="full-width" label="Log-Out" @click="modal=true" />

<!-- The accompanying modal -->
<q-dialog v-model="modal"  position="top" >
      <q-card class="bg-white q-mt-md confirmBox" >
        <q-card-section>
            Would you like to Log-Out from all other devices ?          
        </q-card-section>
        <q-card-actions dense align="right" class="text-primary">
          <q-btn flat dense class="text-capitalize" label="Yes" v-close-popup 
          @click="act(true)" />
          <q-btn dense color="primary" class="text-capitalize" 
          label="No, Just Here" v-close-popup 
          @click="act(false)" />
        </q-card-actions>
      </q-card>    
</q-dialog>
</div>
</template>

<script>
export default {
    data(){
        return{
            modal:false,
            all:false
        }
    },
    methods:{
        async act(all=false){
            var res = await this.$axios.post('logout',{all:all});
            this.$q.notify('You have been Logged Out');
            this.$router.push('/');
        }
    }
}
</script>

<style>
.confirmBox{
    border:5px solid brown;
}
</style>
