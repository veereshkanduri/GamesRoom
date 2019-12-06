<template>
  <div class="cardTemplate">
    <div class="card mb-4 shadow-sm">
      <div class=row>
          <img
            class="card-img-top mt-2"
            v-bind:src="item.listing.pic1"
            alt="Card image cap"
            style="height: 170px; width: 270px;margin: 10px; margin-left:55px"
          > 
      </div>
      <div class=row>
          <img
            class="card-img-top mt-2"
            v-bind:src="item.listing.pic2"
            alt="Card image cap"
            style="height: 170px; width: 270px;margin: 10px; margin-left:55px"
          > 
      </div>      
      <div class="card-body">
        <h6 class="card-text">{{item.listing.listingName}}</h6>
        <p class="card-text">Gametype: {{item.listing.gametype}}</p>
        <p class="card-text">Booking Total Price: ${{item.total_price}}</p>
        <p class="card-text">Date and time: {{item.date}}, {{item.time.from}}:00 to {{item.time.to}}:00</p>        
        <p class="card-text">Phone number: {{item.listing.phonenumber}}.</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="navigateListingDetail(item)"
            >View</button>
            
          </div>
          <small class="text-muted footerIcons">
          </small>
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
  name: "bookingCard",
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
        name: "bookingDetails",
        params: { id: listing._id }
      });
    },

    updateEditListing(listing, id) {
      this.$parent.editListing(listing);
    },
    deleteListing(id){
      this.$parent.deleteListing(id);
    }
  },
  mounted() {}
};
</script>