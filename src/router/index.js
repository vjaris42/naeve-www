import Vue from 'vue'
import VueRouter from 'vue-router'
import {api} from  'boot/axios'
import routes from './routes'
var isNode = require('detect-node');

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ( { store/*, ssrContext */} ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next)=>{
    if(isNode) return next();
    if(!store.state.user.profile){
      var res = await api.get('me');
      store.commit('user/setProfile',res.data);      
    }
    var loggedIn = store.state.user.loggedIn;

    if (to.meta.includes('adm')) return next();
    if(to.meta.includes('an') ){
      return (loggedIn) ? next('/home') : next();
    }else if (to.meta.includes('ay')) {
      return (loggedIn) ? next() : next('/login');
    }    

  });


  return Router
}


