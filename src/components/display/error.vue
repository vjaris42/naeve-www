<template>
<div class="full-width q-pa-sm">{{errorText}}</div>
</template>

<script>
const errorDict = require('boot/errorDict.json');

export default {
    props:['name'],
    computed:{
        errorText(){
            return errorDict[this.name];
        }
    }
}
</script>

<style>

</style>
