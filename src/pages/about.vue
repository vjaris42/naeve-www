<template>
<q-page>
<div class="row">

    <div class="col-xl-6 col-lg-6 col-md-6 col-12 row justify-center q-mt-md">
        <div class="col-11">
            
            <div class="bg-white shadow-3 q-pa-md">
                <div class="text-subtitle1 text-bold">About Us</div>
                <div class="aboutText">
                We are a startup aiming to match relevant volunteers for various events.
                Our platform  will help both.<br/>

                1 . Event organizers looking for the best matching people for their events.
                <br/>
                2 . The volunteers that intend to participate in said events.
                <br />
                <br />
                We are looking for investors and incubators that can help accelarate our product.
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6 col-md-6 col-12 row justify-center">
        <div class="col-11 bg-white shadow-3 q-pa-md q-my-md" >
            <div class="text-subtitle1 text-bold" >Send us a message</div>
            <div class="text-weight-light">(Do mention your email or phone number)</div>
            <messageUs class="q-py-md" />
            <q-separator />
            <div class="text-subtitle1 text-bold q-py-md">Give us a Call</div>
            <div class="text-weight-light">
                +91 79770 39793 
                <br />
                 +91 84509 38298
            </div>
        </div>
    </div>    
</div>
</q-page>
</template>

<script>
import messageUs from 'components/form/messageUs';

export default {
    components:{
        messageUs
    }
}
</script>

<style scoped>
.aboutText{
    font-family: 'Raleway';
}
</style>
