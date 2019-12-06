<template>
    <div class="listings">
        <div class="row">
            <div class="col-md-9 order-md-2">
                <card-loader :loopCount=8 v-if="loading"/>
                <listings-list :listings_list="listing_duplicate"  />
                <h6 v-if="!listing_duplicate.length" style="margin-top:70px">There are no results</h6>
            </div>
            <div class="col-md-3 order-md-1 mb-4">
                <listing-filter :categories="categories" :sellers="sellers" /> 
            </div> 
         </div>
        <div class="row">
          <createListing ref="createListing"/>
        </div>
    </div>
    
</template>


<script>
import ListingsList from "../components/listings/ListingsList";
import CardLoader from "../components/shared/CardLoader";
import ListingFilter from "../components/listings/filters/ListingFilter"
import CreateListing from "../components/listings/actions/CreateListing"
import axios from "axios";
import _ from "lodash";
import {
    decryptUser
} from '../components/shared/service/authService'

export default {
  name: "allListings",
  components: { ListingsList, CardLoader, CreateListing, ListingFilter },
  data() {
    return {
      categories: [],
      sellers:[],
      listing_duplicate: [],
      listing_list:[],
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
        .get(`${process.env.VUE_APP_BASE_URL}/listings`, )
        .then(response => {
          this.loading = false;
          this.listing_duplicate = response.data;
          this.listing_list = response.data;
          this.categories = _.uniqBy(
            _.map(this.listing_duplicate, function(object) {
              return _.pick(object, ["gametype"]);
            }),
            "gametype"
          );
          this.categories.unshift({ gametype: "All" });
          this.sellers = _.uniqBy(
            _.map(this.listing_duplicate, function(object) {
              return _.pick(object.address, ["city"]);
            }),
            "city"
          );
          this.sellers.unshift({ city: "All" });
          
        })
        .catch(error => {
        });
    },
    
    filterListingBy(selected_gametype, selected_city) {
        var listingList = this.listing_list;
        let filteredData = [];
        if (selected_gametype !== "All") {
          if(selected_city !== "All"){
            listingList.map(listing => {
              if((listing.address.city === selected_city)&& (listing.gametype === selected_gametype)){
                filteredData.push(listing);
              }
            });
          }
          else{
            listingList.map(listing => {
              if(listing.gametype === selected_gametype){
                filteredData.push(listing);
              }
            });
          }
        }
        else{
          if(selected_city !== "All"){
            listingList.map(listing => {
              if(listing.address.city === selected_city){
                filteredData.push(listing);
              }
            });
          }
          else{
            filteredData = this.listing_list;
          }
        }
        this.listing_duplicate = filteredData;
            
    }
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
