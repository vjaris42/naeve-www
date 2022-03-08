<template>
  <q-layout view="hHh lpR fff" class="bg">
    <q-header >
      <q-toolbar class="row bg-grey-9 toolbar" :class="{'justify-center':$q.platform.is.desktop}">
        <div class="col-lg-10 col-md-10 col-xl-10 col-12 row items-center">
          <q-toolbar-title class="col-3 siteName">
            <router-link class="noDeco siteName" to="/">
            naeve
            </router-link>
          </q-toolbar-title>

          <q-space />
          <q-no-ssr>
          <q-tabs>
            <q-route-tab v-for="(item,index) in navigation" :key="index" 
             :name=item.name  :to=item.to :label=item.label :icon=item.icon >
              <q-badge v-if="showBadge(item)" color="orange-5" text-color="black">
                {{me[item.name]}}
              </q-badge>
            </q-route-tab>             
          </q-tabs>
          </q-no-ssr>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="page row justify-center">
      <router-view class="col-xl-10 col-lg-10 col-md-10 col-12 justify-center"
       :class="{'q-py-md':$q.platform.is.desktop}" 
       v-touch-swipe.mouse.right.left="handleSwipe" />
    </q-page-container>


    <q-footer class="bg-grey-10 text-white q-py-sm ">
      <div class="row justify-center">
        <div class="text-center col-xl-8 col-lg-8 col-md-8 col-11">
          <q-chip  color="grey-9" dense text-color="white" square v-for="(item,index) in footerMenu" :key="index">
            <router-link :to=item.path class="noDeco"><span class="footerChip text-white">{{item.name}}</span></router-link>
          </q-chip>
        </div>
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",
  meta(){
    return{
      meta:{
        og_site_url:{
          property:'og:url',
          content: process.env.site_url
        },
        og_title:{
            property:'og:title',
            content:'Attend Events and make Money'
        },  
        og_description:{
            property:'og:description',
            content:'Volunteer for Events & Make Money'
        },
        og_image:{
          property:'og:image',
          content:process.env.site_url + 'statics/site/logo.png'
        }        
      }
    }
  },
  data() {
    return {
      navigationNew:[
        {name:"Login",to:"/login",label:"Login"},
        {name:"Signup",to:"/signup",label:"Signup"}
      ],      
      navigationExisting:[
        {name:"home",to:"/home",icon:"home"},
        {name:"alerts",to:"/alerts",icon:"notifications"},
        {name:"me",to:"/me",icon:"person"}
      ],
      footerMenu: [
        {name:'About',path:'/about'},
        {name:'Become a Recruiter',path:'/help'},
        {name:'Log-In',path:'/login'},
        {name:'Create an account',path:'/signup'},
        //{name:'Browse for events',path:'/events'},
        {name:'Privacy Policy',path:'/privacy'},
        {name:'Terms & Conditions',path:'/terms'},
        {name:'Help',path:'/help'}

      ]
      }
  },
  computed: {
    navigation(){
      return (this.loggedIn) ? this.navigationExisting : this.navigationNew;
    },
    me(){
      return this.$store.getters['user/profile'];
    },
    loggedIn(){
      return this.$store.getters['user/loggedIn'];
    }
  },
  methods:{
    handleSwipe(evt){
      var dirc = evt.direction;
      var currPath = this.$route.path;
      var totalNavItems =this.navigationExisting.length;
      for(var i=0; i < totalNavItems ;i++){
        var currItem = this.navigationExisting[i];
        //if looped path is not the current path continue
        if(currItem.to != currPath) continue;        
        //if swiped to left and this is not the last item then move to the next path
        if(dirc=='left'){
          if( i!= totalNavItems-1) {
            this.$router.push(this.navigationExisting[i+1].to);
            break;
          }
        }
        //if swiped to left and this is not the first item then move to the previous path
        else{
          if( i!= 0) {
            this.$router.push(this.navigationExisting[i-1].to);
            break;
          }
        }
      }
    },
    showBadge(item){
      return (item.name=='alerts' && this.me.alerts>0);
    }
  }
};
</script>

<style scoped>
.toolbar{
  width:100%;
}
.footerChip{
  font-size: 1.1em;
  text-decoration: none;
}
.toolBarLogo{
  max-width:100%;
  max-height:40px;
}
.siteName{
  font-family: 'Poppins';
  letter-spacing: 1px;
  color:white;
}

.page{
  min-height: 100vh;
}
@media only screen and (max-width: 1200px) {
  .footerChip{
    font-size: 0.95em;
  }
}

</style>


