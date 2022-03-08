<template>
<q-page>
<q-no-ssr>

<div v-if="profile" class="row justify-center" 
:class="{'q-mx-sm q-mt-sm':$q.platform.is.mobile}">    
    <div class="col-xl-3 col-lg-3 col-md-3 col-12">
        <profileCard :inp="profile" class="bg-white shadow-3"
        :class="{'q-mb-sm': $q.platform.is.mobile}"  />
    </div>
    <div class="col-xl-6 col-lg-6 col-md-6 col-12" >
        <div class="col-11" :class="{'q-ml-md':$q.platform.is.desktop}">
            <!--This component is only for non recruiters-->
            <profileDetails v-if="!profile.recruiter" :inp="profile" 
            class="q-mb-sm bg-white shadow-3" />
            <mediaView  :id=profile.user_id class="q-pa-xs bg-white shadow-3" />
        </div>
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-12 row justify-around desktop-only" >
        <div class="col-11">
            <trendingEvents class="bg-white shadow-3" />
        </div>
    </div>
</div>    

<div v-else class="row justify-center">
      <notFound class="q-mt-xl q-pt-xl" />
</div>

</q-no-ssr>
</q-page>
</template>

<script>
import profileCard from 'components/display/profileCard';
import profileDetails from 'components/display/profileDetails'
import trendingEvents from 'components/display/trendingEvents'
import mediaView from 'components/display/mediaView'
import {pick} from 'lodash';
import notFound from 'components/display/notFound';

export default{
    preFetch ({ store, currentRoute }) {
        var inp = {path:'user',params:{id:currentRoute.params.id} } ;
        return store.dispatch('page/fetch',inp);
    },
    meta(){
        if (!this.profile) return {};        
        return{
            meta:{
                og_title:{
                    property:'og:title',
                    content:this.$options.filters.formatName(this.profile.name)
                },
                og_image:{
                    property:'og:image',
                    content:this.$options.filters.ourMedia(this.profile.avatar)
                },            
                og_description:{
                    property:'og:description',
                    content:this.profile.bio
                }
                                                 
            }
        }
    },
    components:{
        notFound,
        mediaView,
        profileCard,
        profileDetails,
        trendingEvents
    },
    computed:{
        profile(){
            return this.$store.getters["page/default"];
        },

    }
}
</script>