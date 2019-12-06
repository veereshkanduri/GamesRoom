<template>
    <div class="listings">
      
        <div class="row">
          <div class="col-md-3 order-md-1 mb-4">
            <button type="button" class="btn btn-success" @click="add_listing">Add Listing</button>
          </div>
        </div>
            <card-loader :loopCount=8 v-if="loading"/>
            <listings-list :listings_list="listing_duplicate"  />
        <div class="row">
          <createListing ref="createListing"/>
        </div>
    </div>
    
</template>


<script>
import ListingsList from "../components/listings/ListingsList";
import CardLoader from "../components/shared/CardLoader";
import CreateListing from "../components/listings/actions/CreateListing"
import axios from "axios";
import _ from "lodash";
import {
    decryptUser
} from '../components/shared/service/authService'

export default {
  name: "allListings",
  components: { ListingsList, CardLoader, CreateListing },
  data() {
    return {
      categories: [],
      listing_duplicate: [],
      loading: false
    };
  },
  methods: {
    add_listing: function(){
      this.$refs.createListing.showModalForm();
    },
    getAllListings: function() {
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/need_listings`, decryptUser())
        .then(response => {
          this.loading = false;
          this.listing_duplicate = response.data;
        })
        .catch(error => {
        });
    },
    
    
  },

  created() {
    this.getAllListings();
  }
};
</script>

<style lang="scss">
.listings {
  margin-top: 20px;
}
</style>
