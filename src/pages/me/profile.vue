<template>

<div class="row">
  <div class="col-xl-6 col-lg-6 col-md-6 col-12">
    <editProfile class="q-pr-sm" :inp=profile @success="fetchProfile" />
  </div>
  <div class="col-xl-6 col-lg-6 col-md-6 col-12" >
    <div :class="{'q-pr-md q-pt-sm':$q.platform.is.desktop,'q-pt-lg':$q.platform.is.mobile}" >
      <mediaView :id=myId />
    </div>
  </div>
</div>
</template>

<script>
import error from 'components/display/error';
import editProfile from 'components/form/editProfile';
import mediaView from 'components/display/mediaView';

export default {
  components:{
    error,
    editProfile,
    mediaView
  },
  data(){
    return{
      profile:false,
    }
  },
  computed:{
    myId(){
      return this.$store.getters['user/id'];
    }
  },
  methods:{
    async fetchProfile(){
      var res = await this.$axios.get('profile');
      this.profile = res.data;
    }
  },
  created(){
    this.fetchProfile();
  }
}
</script>

<style scoped>
.avatarImage{
  max-width:50px;
}
</style>
