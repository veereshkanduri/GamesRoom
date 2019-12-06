<template>
    <div class="createListing" >
        <modal :header="'Add Listing'" :isShow="showModal" v-if="showModal" @close="showModal = false">
            <listing-form :listing="listing" v-on:submit-form="listingAction"/>
       </modal>
    </div>
</template>
<script>
import Modal from "../../shared/Modal.vue";
import {successToaster, errorToaster} from "../../shared/service/ErrorHandler.js"
import ListingForm from "./ListingForm";
import axios from "axios";
import {
    decryptUser
} from '../../../components/shared/service/authService'
export default {
  name: "createListing",
  components: { Modal, ListingForm },
  data() {
    return {
      listing: new Object(),
      showModal: false,
      host:new Object(),
    };
  },
  methods: {
    showModalForm: function() {
      this.showModal = true;
    },

    listingAction: function(listing) {
      this.showModal = false;
      this.listing = new Object();
      listing.host = decryptUser();
      axios
          .post(`${process.env.VUE_APP_BASE_URL}/listings`, listing)
          .then(response => {
            
              successToaster(
                "Creation success",
                "successfully created"
              );
              location.reload();
          })
          .catch(error => {
            errorToaster(
              "Creation Failed",
              "Please try again after sometime"
            );
          });
          
    }
  }
};
</script>
<style lang="scss">
</style>