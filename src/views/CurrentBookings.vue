<template>
    <div class="listings">
                <card-loader :loopCount=8 v-if="loading"/>
                <bookings-list :bookings_list="listing_duplicate"  />
                <h6 v-if="!listing_duplicate.length" style="margin-top:50px; margin-bottom:30px">There are no bookings</h6>
    </div>
    
</template>


<script>
import BookingsList from "../components/listings/BookingsList";
import CardLoader from "../components/shared/CardLoader";
import axios from "axios";
import _ from "lodash";
import {
    decryptUser, isHost
} from '../components/shared/service/authService'

export default {
  name: "allListings",
  components: { BookingsList, CardLoader,},
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
    getBookings: function() {
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/need_current_bookings`, decryptUser())
        .then(response => {
          this.loading = false;
          this.listing_duplicate = response.data;
        })
        .catch(error => {
        });
    },
  },
  created() {
    this.getBookings();
  }
};
</script>

<style lang="scss">
.listings {
  margin-top: 20px;
}
</style>
