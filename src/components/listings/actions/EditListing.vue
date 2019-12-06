<template>
    <div class="edit-listing">
       <modal :header="'Edit Product'" :isShow="showModal" v-if="showModal" @close="showModal = false">
            <edit-form :listing="listing" v-on:submit-form="listingAction"/>
       </modal>
    </div>
</template>

<script>
import Modal from "../../shared/Modal";
import EditForm from "./EditListingForm";
import {successToaster, errorToaster} from "../../shared/service/ErrorHandler.js"
import axios from "axios";

export default {
  name: "editListing",
  components: { Modal, EditForm },
  data() {
    return {
      listing: new Object(),
      showModal: false
    };
  },
  methods: {
    setListing(listing) {
      this.showModal = true;
      this.listing = listing;
    },

    listingAction: function(listing) {
      console.log(listing);
      this.showModal = false;
      axios
          .put(`${process.env.VUE_APP_BASE_URL}/listings/${listing._id}`, listing)
          .then(response => {
            
              successToaster(
                "Edit success",
                "successfully updated"
              );
              // location.reload();
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

<style>
</style>