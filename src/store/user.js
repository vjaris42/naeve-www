export default {
    namespaced: true,
    state: () => ({
        profile:false,
        loggedIn:false,
        enRout:false
    }),
    getters:{
        enRoute(state){
            return state.enRoute;
        },
        loggedIn(state){
            return state.loggedIn;
        },
        profile(state){
            return state.profile;
        },
        id(state){
            return state.profile.id;
        },        
        recruiter(state){
            return state.profile.recruiter;
        }                              
    },
    mutations:{
        enRoute (state,data) {
            state.loggedIn = false;
        },
        auth (state,data) {
            if(!data) state.profile = false;
            state.loggedIn = data;
        },
        setProfile(state,data){
            state.profile = data;
        },
        unAlert(state,data=null){
            var dedBy = data || state.profile.alerts;
            state.profile.alerts = state.profile.alerts - dedBy;
        }
    
    },
    actions:{
        async fetchProfile(){
            var res = await this.fetchProfile.$axios.get('user_profile')
        }
    }
}
