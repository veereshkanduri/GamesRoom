<template>
    <div class="update-pic">
       <modal :header="'Update picture'" :isShow="showModal" v-if="showModal" @close="showModal = false">
            <updatepic-form :listing="listing" :number="number" />
       </modal>
    </div>
</template>

<script>
import Modal from "../../shared/Modal";
import UpdatepicForm from "./UpdatepicForm";
import {successToaster, errorToaster} from "../../shared/service/ErrorHandler.js"
import axios from "axios";

export default {
  name: "updatePic",
  components: { Modal, UpdatepicForm },
  data() {
    return {
      listing: new Object(),
      showModal: false,
      number : '',
    };
  },
  methods: {
    setupdatepic(number, listing) {
      this.showModal = true;
      this.listing = listing;
      this.number = number;
    },

    toggle: function() {
      this.showModal = false;
      successToaster("success");
    
    }
  }
};
</script>

<style>

.modal-body{
  height:200px;
}
</style>