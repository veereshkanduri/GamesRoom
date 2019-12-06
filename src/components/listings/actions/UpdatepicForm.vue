<template>
    <div class="listingForm">
        <form id="updatepic"  v-if="!loading" enctype="multipart/form-data">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </p>
                <br>
              <div class="form-group">
                <label for="listingName">Listing Name : {{listing.listingName}}</label>
              </div>
              <div class="form-group">
                <img
                    v-if="number=='pic1'"
                    v-bind:src="listing.pic1"
                    v-bind:alt="listing.listingName"
                    class="img-fluid rounded"
                    style="height: 250px; width: 390px;margin: 5px; margin-left:40px"
                >
                <img
                    v-if="number!='pic1'"
                    v-bind:src="listing.pic2"
                    v-bind:alt="listing.listingName"
                    class="img-fluid rounded"
                    style="height: 250px; width: 390px;margin: 5px; margin-left:40px"
                >
             </div>
             <div class="form-group">
                <label for="listingName">Please select the photo</label>
                <input type="file"  v-on:change="handleFileUpload()" id="file" ref="file"  required>
                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
              </div>
              <br>
              <button  class="btn buttonGreen"  v-on:click="submitFile()">Save changes</button>
        </form>

        <div class="lds-dual-ring" v-if="loading"></div>
    </div>
</template>
<script>
import axios from "axios";
import vueDropzone from "vue2-dropzone";
import {successToaster, errorToaster} from "../../shared/service/ErrorHandler.js"
export default {
  name: "updatepicForm",
  props: ["listing", "number"],
  components: {
    vueDropzone
  },
  data() {
    return {
      errors: [],
      file:'',
      loading: false,
      // dropOptions: {
      //   url: "https://httpbin.org/post",
      //   maxFilesize: 2, // MB
      //   maxFiles: 2,
      //   chunking: true,
      //   chunkSize: 500, // Bytes
      //   thumbnailWidth: 170, // px
      //   thumbnailHeight: 160,
      //   addRemoveLinks: true
      // },
    };
  },
  methods: {
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);
            formData.append('number', this.number);
            formData.append('id', this.listing._id);

        /*
          Make the request to the POST /single-file URL
        */  console.log(formData);
            axios.post( 'http://localhost:8080/upload',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
          location.reload();
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
  },
  created() {
    this.loading = false;
    console.log(this.number);
    
  }
};
</script>
<style lang="scss">
.listingForm {
  div {
    text-align: start;
  }
  #listingCU {
    div {
      text-align: start;
    }
    button {
      text-align: center;
    }
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #41b883 transparent #41b883 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>