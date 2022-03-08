<template>
<div>
    <div  class="row q-mx-md q-py-sm" >
        <div class="col-12">
            <div class="text-h6" >Date of birth:</div>
            <q-separator/>
            <div class="text-body2">{{profile.dob | dateHumanFull}}</div>
        </div>

        <div class="col-12">
            <div class="text-h6">Gender:</div>
            <q-separator/>
            <div class="text-body2 text-capitalize">{{profile.gender}}</div>
        </div>

        <div class="col-12">
            <div class="text-h6">Skills:</div>
            <q-separator/>
            <div class="">
                <q-chip class="chipText" dense color="blue" text-color="white" icon="check"
                v-for="(criteria, index) in skills" :key="index">
                    {{criteria | formatName}}
                </q-chip>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    props:['inp'],
    computed:{
        profile(){
            return this.inp;
        },
        skills() {
            return (this.profile.skills) ? this.profile.skills.split(',')  : false;
        },
        recruiter(){
            return this.profile.recruiter;
        }       
    }
}
</script>

<style scoped>

</style>
