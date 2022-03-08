<template>
<q-page>
<q-no-ssr>

  <div class="row">

    <!-- Left side widgets mobile top -->

    <div class="col-xl-3 col-lg-3 col-md-3 col-12 text-center">
      <div class="sticky">
        <div class="bg-white shadow-3 q-pa-sm">
          <homeProfileCard />
        </div>

        <div :class="{'q-ma-sm':$q.platform.is.mobile}">
          <q-btn v-if="recruiter && !createEvent" class="q-mt-sm full-width" label="Create an Event" color="red" 
          @click="createEvent=true"/>
        </div>
      </div>
    </div>

    <!-- Left side widgets mobile top -->

    <!-- Central part -->
    <div class="col-xl-9 col-lg-9 col-md-9 col-12" >
      <div class="col-12 row justify-around" :class="{'q-ml-md':$q.platform.is.desktop}">

          <div class="col-xl-9 col-lg-9 col-md-9 col-12">
            <div :class="{'q-mr-md':$q.platform.is.desktop,'q-mt-md':$q.platform.is.mobile}">
            <div v-if="createEvent">
              <createEvent class="bg-white shadow-3" @close="createEvent=false" />
            </div>
            <div v-else>
                <paginateEvents :inp=paginateInp class="q-mx-sm q-mb-md"  />    
            </div>             
            </div>          
          </div>

          <!--Right side banner Ad -->
          <div  class="col-3 desktop-only" >
            <div class="shadow-3 bg-white">
              <trendingEvents />
            </div>
          </div>
               <!--Right side banner Ad -->

      </div>      
    </div>
    <!-- Central part -->

</div>

</q-no-ssr>
</q-page>

</template>

<script>
import homeProfileCard from 'components/display/homeProfileCard';
import paginateEvents from 'components/display/paginateEvents';
import createEvent from 'components/form/createEvent';
import trendingEvents from 'components/display/trendingEvents';


export default {
  components:{
    homeProfileCard,
    paginateEvents,
    createEvent,
    trendingEvents
  },
  data(){
    return{
      createEvent:false
    }
  },
  computed: {
    paginateInp(){
      var path = (this.recruiter) ? 'created_events' : 'new_events';
      return {path:path, limit:6};
    },
    recruiter() {
      return this.$store.getters["user/recruiter"];
    },
  }
};
</script>

<style>
.advImage{
  width:100%;
}
</style>
