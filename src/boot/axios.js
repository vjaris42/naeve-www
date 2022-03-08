var isNode = require('detect-node');
import axios from 'axios';
const api = axios.create();

export default async ({ Vue, ssrContext, store}) => {
  api.defaults.baseURL = isNode ? process.env.api_ip : process.env.api_proxy_path;
  
  //We aren't using this for routes and other stuff doesn't need it
  
  api.interceptors.request.use(config=>{
    /*
    if(isNode){
      config.headers = ssrContext.req.headers;
      config.headers.remote_addr = ssrContext.req.connection.remoteAddress;
    }
    */
    return config;
  });


  api.interceptors.response.use(function(response){
    return handleAuth(response);
  },function(error){
    return handleAuth(error.response);
  });
  
  
  function handleAuth(res){
    if(res == undefined ) return false;
    ///everything is client rendered
    
    /*
    if(isNode && res.headers["set-cookie"] ) {
      ssrContext.res.set("set-cookie", res.headers["set-cookie"] );
    }
    */
    var authStatus = (res.headers.auth == 'true');
    store.commit('user/auth',authStatus);
    if(!authStatus) store.commit('user/setProfile',false); 
    return res;
  }

  Vue.prototype.$axios = api;
}

export {api}

