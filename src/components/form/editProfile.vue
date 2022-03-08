<template>
<div>
  <div class="col-12 row">
      <q-toggle class="col-6"
        v-model= edit
        label="Edit Profile"
      />
      <div class="col-6">
				<q-btn class="float-right"  flat round dense
        v-if="edit" icon="check" @click="updateProfile"/>
      </div>
  </div>

  <div class="col-12 row">
    <error v-if="error" class="q-mb-sm text-white bg-grey-6" :name=error />
  </div>

  <div class="col-12 row items-bottom q-mb-md">
    <q-avatar class="col" size="100px">
    <img :src="form.avatar | ourMedia" @click="$refs.avatar.click()" >
      <input v-if="edit" @change="openImageCropper" ref="avatar"
      accept="image/x-png,image/jpeg"  type="file" style="display:none"/>
  </q-avatar>
   <div class="col-8 q-ml-md ">
       <q-input class="full-width" v-model=form.name dense 
       disable label="Name"  maxlength="20" borderless />

    <q-input class="full-width" v-model="form.bio"
      :disable="!edit" label="About Me" dense
      autogrow counter maxlength="100" :borderless=!edit  />        
   </div>
 
  </div>

<div v-if="!recruiter">

    <tag v-model=form.skills :disable=!edit type='skill' label="My Skills" />
</div>
    <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 400px">
            <q-card-section>
              <div class="text-h6">Crop Image</div>
            </q-card-section>

            <q-card-section>
              <vue-cropper
                ref='cropper'
                :guides="true"
                :view-mode="2"
                drag-mode="crop"
                :auto-crop-area="1.0"
                :max-container-width="300"
                :max-container-height="300"
                :background="true"
                :rotatable="true"
                :src="imgSrc"
                :aspect-ratio="1"
                alt="Source Image"
                />

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Crop" @click="uploadAvatar"  />
              <!--
              <q-btn flat label="Rotate" @click="$refs.cropper.rotate(90)" />
              -->
              <q-btn flat label="Cancel" v-close-popup />
            </q-card-actions>
          </q-card>
    </q-dialog>
</div>

</template>

<script>
import error from 'components/display/error'
import tag from 'components/form/tag'
import { pick } from 'lodash'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
    props:['inp'],
    components:{
      VueCropper,
      error,
      tag
    },
  data(){
    return{
      edit:false,
      error:false,
      form:{},
      prompt: false,
      imgSrc: '',
      cropImg: ''
    }
  },
  computed:{
    recruiter(){
      return this.$store.getters['user/recruiter'];
    },
  },
  watch:{
    edit(){
      this.error=false;
      this.form = JSON.parse(JSON.stringify(this.inp));
    },
    inp(val){
        this.form = JSON.parse(JSON.stringify(val));
    }
  },
  methods:{   
    async updateProfile(){
        var newForm = pick(this.form,['bio','skills','avatar']);
        var res = await this.$axios.post('update_profile',newForm);
        if(res.status=!202) this.error = error;
        else{
          this.edit = false;
          this.$q.notify({message:'Your profile has been updated',timeout:1500});
          this.$emit('success');
        }
    },
    async uploadAvatar(){
      this.prompt = false;      
      var profilePic = this.$refs.cropper.getCroppedCanvas({width:480});
      this.form.avatar = profilePic.toDataURL();
      profilePic.toBlob(profileBlob=>{
        var formData = new FormData();
        formData.append('avatar',profileBlob);
        this.$axios.post('avatar_upload',formData); 
      });      
    },
    openImageCropper(e) {
      this.prompt = true;
      const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          alert('Please select an image file');
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Sorry, FileReader API not supported');
        }
    }
  }
}
</script>

<style scoped>
.avatarImage{
  max-width:50px;
}
</style>