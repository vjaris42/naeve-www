<template>
<div>
    <q-btn v-if="me" :loading="loading" label="Upload Photos" class="full-width q-px-sm" 
    dense color="primary"  @click="$refs.newPhoto.click()">
      <input @change="uploadMedia" ref="newPhoto"  type="file"
      accept="image/x-png,image/gif,image/jpeg" style="display:none"/>   
    </q-btn>
    <div v-if="media.length == 0" class="q-pa-sm">
        <span class="text-subtitle1 "> 
            {{ (me) ? "You haven't uploaded any" : 'No'}}    Photos yet
        </span>
    </div>

    <div v-else class="row q-py-sm ">
        <div class="col-3 q-pa-xs galleryItem" v-for="(item,index) in media" :key="index">
            <q-img
                transition="fade"
                :src="item.name | ourMedia"
                class="galleryImg"
                ratio="1"
                contain
                @click="openModal(index)"
            />

        </div>
    </div>

    <!--SINGLE IMAGE MODAL -->
    <q-dialog v-model="imgModal" persistent>
          <q-card style="min-width: 400px">
              <q-toolbar dense shrink class="bg-primary text-white">
                <q-btn v-if="me" dense round flat  icon="delete" 
                @click="deletePrompt=true" />   
                <q-space /> 
                <q-btn dense round flat  icon="cancel" 
                v-close-popup />                       
              </q-toolbar>                             
              <q-img contain :src="modalImg.name | ourMedia" />              
          </q-card>
    </q-dialog>
    <q-dialog v-model="deletePrompt" >
          <q-card class="q-pa-xs deleteWarn">
              <q-card-section>
                  Are you sure you want to delete this image
              </q-card-section>
        <q-card-actions dense align="right" class="text-primary">
            
          <q-btn flat dense label="Cancel" v-close-popup />
          <q-btn flat dense class="bg-primary text-white" label="Yes !!" v-close-popup 
          @click=deleteMedia />
        </q-card-actions>           
          </q-card>
    </q-dialog>    
</div>
</template>

<script>

export default {

    props:['id'],
    data(){
        return{
            loading:false,
            media:[],
            imgModal: false,
            modalIndex:null,
            deletePrompt:false
        }
    },
    methods:{
        async fetchMedia(){
            var res = await this.$axios.get('media',{params:{ id:this.userId }});
            this.media = res.data;
        },
        async uploadMedia(){
            this.loading = true;
            var newMedia = this.$refs.newPhoto.files[0];
            var formData = new FormData();
            formData.append('newMedia',newMedia);
            var res = await this.$axios.post('new_media',formData);
            if(res.status==201) this.media.unshift(res.data);
            this.loading = false;
        },
        openModal(index) {
            this.modalIndex = index;
            this.imgModal = true
        },
        async deleteMedia(){
            var res = await this.$axios.post('delete_media',{name:this.modalImg.name});
            if(res.status != 202) return;
            this.imgModal = false;
            var newMediaList = [];
            //creating new media list, coz vue data cannot be deleted
            for(var i=0;i<this.media.length;i++){
                if (this.modalIndex!=i) newMediaList.push(this.media[i]);
            }
            this.media = newMediaList;
            this.$q.notify('Your Media has been deleted');
        }
    },
    computed:{
        modalImg(){
            return this.media[this.modalIndex] || {};
        },
        userId(){
            return this.id;
        },        
        me(){
            var myId =  this.$store.getters['user/id'];
            return (this.id == myId);
        }
    },
    created(){
        this.fetchMedia();
    },
}
</script>

<style scoped>
.galleryItem:hover{
    box-shadow: 0px 1px 1px ;
}
.galleryImg{
    width: 100%;
    cursor:pointer;    
}
.deleteWarn{
    font-size: 1.1em;
    font-family: 'Poppins';
}
</style>
