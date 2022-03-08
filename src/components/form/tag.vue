<template>
<div>
    
    <q-select dense ref='select' v-model="skills" :outlined=outlined :disable=disable :borderless=disable
    :options=skillOptions use-input use-chips  multiple hide-dropdown-icon 
    input-debounce="0" @filter=filterFn new-value-mode="add" 
    @input="$refs.select.updateInputValue('')" :label="label" />  

</div>
</template>

<script>
export default {
    props:['value','disable','outlined','label','type'],
    data(){
        return{
            skillOptions:[],
            skills:(this.value) ? this.value.split(',') : null
        }
    },
    watch:{
        value(val){
            this.skills =  (val.length > 0 ) ? val.split(',') : null;
        },
        skills(val){
            this.$emit('input',val.toString());
        }
    },
    methods:{     
        async filterFn (val, update, abort) {
        if(val.length < 2){
            abort()
            return
        }      
        update(() => {
            var skills = [];
            //using axios to fetch matching stuff
            this.$axios.get('tag',{params:{keyword:val,type:this.type}})
            .then(res=>{
            for(var i=0;i<res.data.length;i++) skills.push(res.data[i].name);
            this.skillOptions = skills;
            });
        })
        return
        //update function ends above
        }
    },
    created(){
        //this.skills =  (val.length > 0 ) ? val.split(',') : null;

    }
}
</script>

<style>

</style>
