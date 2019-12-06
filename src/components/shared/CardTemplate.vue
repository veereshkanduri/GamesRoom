<template>
  <div class="cardTemplate">
    <div class="card mb-4 shadow-sm">
      <div class=row>
          <img
            class="card-img-top mt-2"
            v-bind:src="item.pic1"
            alt="Card image cap"
            style="height: 160px; width: 240px;margin: 10px; margin-left:20px"
          > 
          <span v-if="isHost()">
        <button    style="margin-top:70px; margin-left:20px"
            type="button"
            class="btn btn-sm btn-outline-secondary"
            id="edit_pic1"
            v-on:click="updatepic('pic1', item)"
          >Edit</button></span>
      </div>
      <div class=row>
          <img
            class="card-img-top mt-2"
            v-bind:src="item.pic2"
            alt="Card image cap"
            style="height: 160px; width: 240px;margin: 10px; margin-left:20px"
          > 
          <span v-if="isHost()">
        <button    style="margin-top:70px; margin-left:20px"
            type="button"
            class="btn btn-sm btn-outline-secondary"
            id="edit_pic2"
            v-on:click="updatepic('pic2', item)"
          >Edit</button></span>
      </div>      
      <div class="card-body">
        <h6 class="card-text">{{item.listingName}}</h6>
        <p class="card-text">gametype: {{item.gametype}}</p>
        <p class="card-text">Price: ${{item.price}} / hr &nbsp;&nbsp;&nbsp;
        </p>
        <p class="card-text">Address: {{item.address.aptno}}, {{item.address.street}}, {{item.address.city}}</p>        
        <p class="card-text" style="font-size:14px">Phone number: {{item.phonenumber}}.</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="navigateListingDetail(item)"
            >View</button>
            
            <button 
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="updateEditListing(item, item._id)"
              v-if="isHost()"
            >Edit</button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="deleteListing(item._id)"
              v-if="isHost()"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { infoToaster, successToaster } from "./service/ErrorHandler";
import {
  isLoggedIn,
  isHost,
  getLoggedInUser
} from "../shared/service/authService";

import _ from "lodash";
export default {
  name: "cardTemplate",
  props: ["item"],
  data() {
    return {
      showModal: false
    };
  },
  components: {},
  computed: mapState(["loggedUser"]),
  methods: {
    isHost(){
      return isHost();
    },
    navigateListingDetail(listing) {
      this.$router.push({
        name: "listingDetails",
        params: { id: listing._id }
      });
    },
    updateEditListing(listing, id) {
      this.$parent.editListing(listing);
    },
    updatepic(number, listing){
      this.$parent.updatepic(number, listing);
    },
    deleteListing(id){
      this.$parent.deleteListing(id);
    }
  },
  mounted() {}
};
</script>