<template>
  <div class="home-component">

    <div class="jumbotron jumbotron-fluid" style="margin-top:30px">
        <div class="container">
          <img alt="Vue logo" src="../assets/logo.png" width="100px">
          <h3 class="display-5 "><span style="color:#42b983">GamesRooms</span></h3>
          <p class="lead">GamesRooms - BookingSite</p>
        </div>
    </div>
    <div v-if="isLogged()&&!isHost()">
      <card-loader :loopCount=8 v-if="loading"/>
      <home-list :listings_list="listing_duplicate"  />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "../components/HelloWorld.vue";
import HomeList from "../components/listings/HomeList.vue";
import CardLoader from "../components/shared/CardLoader";
import axios from 'axios';
import {
  isLoggedIn,
  isHost,
  getLoggedInUser
} from "../components/shared/service/authService";
export default {
  name: "home",
  components: {
    HomeList,CardLoader
  },
  data() {
    return {
      listing_duplicate: [],
      loading: false,
    };
  },
  methods: {
    isLogged(){
      return isLoggedIn();
    },
    isHost(){
      return isHost();
    },
    getAllListings: function() {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/listings`, )
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
<style>
.jumbotron {
  padding: 1rem 0rem;
}
</style>
