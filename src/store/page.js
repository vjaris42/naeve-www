import {api} from 'boot/axios';
import {merge} from 'lodash';

export default {
    namespaced: true,
    state: () => ({
        page:false
    }),
    getters:{
        default(state){ return state.page } ,
    },
    mutations:{
        set(state,data){
            state.page = data;
        },
        extend(state,data){
            state.page = merge(state.page,data);
        }
    },
    actions:{
        fetch(context, inp){
            return new Promise(resolve=>{
                api.get(inp.path,{params:inp.params})   
                .then(function(res){                    
                    context.commit('set',res.data);
                    resolve();
                });
                
            });            
        }
    }
}
