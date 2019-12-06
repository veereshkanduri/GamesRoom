<template>
    <div class="listingForm">
        <form id="listingCU" @submit="actionListing" v-if="!loading" enctype="multipart/form-data">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </p>

              <div class="form-group">
                <label for="listingName">Listing Name</label>
                <input type="text" class="form-control" id="listingName" v-model="listing.listingName" name="listingName"  placeholder="Enter Listing Name" required>
                <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
              </div>
              <div class="form-group">
                <label for="gametype">Game Type</label>
                <select class="form-control"  v-if="listing.gametype !== 'Create New'" id="gametype" name="gametype" v-model="listing.gametype" required>
                    <option 
                      v-for="(category, index) in categories" :key="index" 
                      v-bind:value="category.gametype" 
                      >{{category.gametype}}
                    </option>
                </select>
                <input type="text" class="form-control" id="gametypeDummy"  v-if="listing.gametype === 'Create New'" placeholder="New gametype" name="gametypeDummy" v-model="listing.gametypeDummy" required>
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" class="form-control" id="aptno" v-model="listing.aptno" name="aptno"  placeholder="Apt No" required>
                  </div>
                  <div class="col-md-4">
                    <input type="text" class="form-control" id="street" v-model="listing.street" name="street"  placeholder="Street Name" required>
                  </div>
                  <div class="col-md-4">
                    <input type="text" class="form-control" id="city" v-model="listing.city" name="city"  placeholder="City Name" required>
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-md-6">
                    <input type="text" class="form-control" id="state" v-model="listing.state" name="state"  placeholder="State Name" required>
                  </div>
                  <div class="col-md-6">
                    <input type="number" class="form-control" id="zip" v-model="listing.zip" name="zip"  placeholder="Zip Code" required>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" min="0" class="form-control" id="price" name="price" v-model="listing.price" placeholder="$ / hr" required>
                  </div>
                </div>
                <div class="col-md-8">
                    <div class="form-group">
                      <label for="description">Short Description</label>
                      <input type="input" class="form-control" id="description" name="description" v-model="listing.description" placeholder="short description" required>
                    </div>
                </div>
              </div>
              <div class="form-group">
                <label >Please select available days and times(ex: 13 to 17)24Hr-format</label>
                <div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      Mo
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="mon_flag" name="mon_flag" v-model="listing.mon_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="mon_from" name="mon_from" v-model="listing.mon_from" v-if="listing.mon_flag" placeholder="from" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px" v-if="listing.mon_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="mon_to" name="mon_to" v-model="listing.mon_to" placeholder="to" v-if="listing.mon_flag" required>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      Tu
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="tue_flag" name="tue_flag" v-model="listing.tue_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="tue_from" name="tue_from" v-model="listing.tue_from" placeholder="from" v-if="listing.tue_flag" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px" v-if="listing.tue_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="tue_to" name="tue_to" v-model="listing.tue_to" placeholder="to" v-if="listing.tue_flag" required>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      We
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="wed_flag" name="wed_flag" v-model="listing.wed_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="wed_from" name="wed_from" v-model="listing.wed_from" placeholder="from" v-if="listing.wed_flag" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px"  v-if="listing.wed_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="wed_to" name="wed_to" v-model="listing.wed_to" placeholder="to"  v-if="listing.wed_flag" required>
                    </div>
                  </div>
                </div><div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      Th
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="thu_flag" name="thu_flag" v-model="listing.thu_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="thu_from" name="thu_from" v-model="listing.thu_from" placeholder="from"  v-if="listing.thu_flag" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px"  v-if="listing.thu_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="thu_to" name="thu_to" v-model="listing.thu_to" placeholder="to"  v-if="listing.thu_flag" required>
                    </div>
                  </div>
                </div><div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      Fr
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="fri_flag" name="fri_flag" v-model="listing.fri_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="fri_from" name="fri_from" v-model="listing.fri_from" placeholder="from" v-if="listing.fri_flag" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px"  v-if="listing.fri_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="fri_to" name="fri_to" v-model="listing.fri_to" placeholder="to"  v-if="listing.fri_flag" required>
                    </div>
                  </div>
                </div><div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      Sa
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="sat_flag" name="sat_flag" v-model="listing.sat_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="tue_from" name="tue_from" v-model="listing.sat_from" placeholder="from"  v-if="listing.sat_flag" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px"  v-if="listing.sat_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="tue_to" name="tue_to" v-model="listing.sat_to" placeholder="to"  v-if="listing.sat_flag" required>
                    </div>
                  </div>
                </div><div class="row">
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px">
                      Su
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group" >
                      <input type="checkbox" class="form-control" id="sun_flag" name="sun_flag" v-model="listing.sun_flag" >
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="sun_from" name="sun_from" v-model="listing.sun_from" placeholder="from"  v-if="listing.sun_flag" required>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-group" >
                      <div style="text-align:center; font-size:25px" v-if="listing.sun_flag">
                       to                  
                      </div>  
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group" >
                      <input type="number" min="0" max="24" class="form-control" id="sun_to" name="sun_to" v-model="listing.sun_to" placeholder="to" v-if="listing.sun_flag" required>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="phonenumber">Phone Number</label>
                <input type="text" class="form-control" id="phonenumber" v-model="listing.phonenumber" placeholder="Phone Number" required>
              </div>
              <button type="submit" class="btn buttonGreen">Save changes</button>
        </form>

        <div class="lds-dual-ring" v-if="loading"></div>
    </div>
</template>
<script>
import axios from "axios";
import vueDropzone from "vue2-dropzone";
import {successToaster, errorToaster} from "../../shared/service/ErrorHandler.js"
export default {
  name: "listingForm",
  props: ["listing"],
  components: {
    vueDropzone
  },
  data() {
    return {
      errors: [],
      files:'',
      gametypeDummy: "",
      categories: [],
      loading: false,
     
    };
  },
  methods: {
    actionListing(event) {
      event.preventDefault();
      this.$emit("submit-form", this.listing);
    },
  },
  created() {
    this.loading = true;
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/listings`)
      .then(response => {
        
        this.categories = _.uniqBy(
          _.map(response.data, function(object) {
            return _.pick(object, ["gametype"]);
          }),
          "gametype"
        );
        this.categories.push({ gametype: "Create New" });

        this.loading = false;
      })
      .catch(error => {
        errorToaster("Error while fetching listings", "");
      });
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