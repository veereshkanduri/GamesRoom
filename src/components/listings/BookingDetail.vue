<template>
  <div class="booking-details">
    <div class="container" style="margin-top:30px">
      <div class="row mb-3">
        <div class="col-sm-4">
          <div class="listing-image">
            <div class="view hm-zoom z-depth-2" style="cursor: pointer">
              <img
                v-bind:src="booking.listing.pic1"
                v-bind:alt="booking.listing.listingName"
                class="img-fluid rounded"
                style="height: 150px; width: 230px;margin: 5px"
              >
            </div>
            <div class="view hm-zoom z-depth-2" style="cursor: pointer">
              <img
                v-bind:src="booking.listing.pic2"
                v-bind:alt="booking.listing.listingName"
                class="img-fluid rounded"
                style="height: 150px; width: 230px;margin: 5px"
              >
            </div>
            <div class style="margin-top:15px">
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Listing Price</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  > ${{booking.listing.price}} / hr</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Listing ZIP</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  > {{booking.listing.address.zip}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Phone Number</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  >{{booking.listing.phonenumber}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <button class="btn btn-primary" @click="back">Back</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="booking-detail">
            <h5 class="booking-head">Booking Details</h5>
            <table class="table" cellspacing="0" style="max-height: 28px">
              <tbody>
                <tr>
                  <th scope="row">Listing Name</th>
                  <td>{{booking.listing.listingName}}</td>
                </tr>
                <tr>
                  <th scope="row">GameType</th>
                  <td>{{booking.listing.gametype}}</td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>{{booking.listing.description}}</td>
                </tr>
                <tr>
                  <th scope="row">Listing Address</th>
                  <td>{{booking.listing.address.aptno}}, {{booking.listing.address.street}}, {{booking.listing.address.city}}, {{booking.listing.address.state}}</td>
                </tr>
                <tr>
                  <th scope="row">Booking date and time</th>
                  <td>{{booking.date}} &nbsp;&nbsp;&nbsp;&nbsp;{{booking.time.from}}:00 to {{booking.time.to}}:00</td>
                </tr>   
                <tr>
                  <th scope="row">Total price</th>
                  <td>${{booking.total_price}}</td>
                </tr>     
                <tr v-if="!isHost()">
                  <th scope="row">Host   Information</th>
                  <td >                    
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Name: {{booking.host.fullName}}
                        </div>
                      </div>
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Email: {{booking.host.email}}
                        </div>
                      </div>
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Phone Number: {{booking.host.phonenumber}}
                        </div>
                      </div>
                  </td>
                </tr> 
                <tr v-if="isHost()">
                  <th scope="row">Guest   Information</th>
                  <td >                    
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Name: {{booking.guest.fullName}}
                        </div>
                      </div>
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Email: {{booking.guest.email}}
                        </div>
                      </div>
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Phone Number: {{booking.guest.phonenumber}}
                        </div>
                      </div>
                  </td>
                </tr> 
                <tr v-if="!isHost()">
                  <th scope="row">Booking rating</th>
                  <td>                    
                      <star-rating v-if="!is_review" :star-size="20" v-model="booking.rating"></star-rating>
                      <star-rating v-if="is_review" :star-size="20" :read-only="true" v-model="booking.rating"></star-rating>
                  </td>
                </tr> 
                <tr v-if="isHost()&&is_review">
                  <th scope="row">Booking rating</th>
                  <td>                    
                      <star-rating v-if="is_review" :star-size="20" :read-only="true" v-model="booking.rating"></star-rating>
                  </td>
                </tr> 
                <tr v-if="!isHost()">
                  <th scope="row">Booking review</th>
                  <td>                    
                      <textarea v-model="booking.review" v-if="!is_review" placeholder="Please review and rate after you visit the place" style="width:400px" rows="3">
                      </textarea>
                                        
                      <div v-if="is_review">"{{booking.review}}"</div>
                      <button class="btn btn-success" style="margin-left:20px" v-if="!is_review" v-on:click="leave()">leave</button>
                  </td>
                </tr>
                <tr v-if="isHost()&&is_review">
                  <th scope="row">Booking review</th>
                  <td>                 
                                        
                      <div v-if="is_review">"{{booking.review}}"</div>
                      
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import CardTemplate from "../shared/CardTemplate";
import StarRating from 'vue-star-rating'
import { successToaster, errorToaster } from "../../components/shared/service/ErrorHandler.js";
import {
  isHost, decryptUser,
} from "../../components/shared/service/authService";

export default {
  name: "bookingDetail",
  components: { CardTemplate, StarRating },
  data() {
    return {
      is_review : false,
      booking:{
        listing:{
          pic1:"",
          pic2:"",
          zip:"",
          address: {
            aptno: String,
            street: String,
            city: String,
            state: String,
            zip:String,
          },
        },
        host:{
          firstName: String,
          lastName: String,
          fullName: String,
          email: String,
          password: String,
          address: {
              aptno: String,
              street: String,
              city: String,
              state: String,
              zip:String,
          },
          phonenumber: String,
          usertype: String,
          createdOn: String
        },
        guest:{
          firstName: String,
          lastName: String,
          fullName: String,
          email: String,
          password: String,
          address: {
              aptno: String,
              street: String,
              city: String,
              state: String,
              zip:String,
          },
          phonenumber: String,
          usertype: String,
          createdOn: String
        },
        time:{
          from:"",
          to:""
        }
      }
      // similarProduct: []
    };
  },
  methods: {
    leave(){
      if(this.booking.rating&&this.booking.review)
      {
        axios.put(`${process.env.VUE_APP_BASE_URL}/bookings/${this.$route.params.id}`, this.booking)
        .then(response=>{
          successToaster("success");
          location.reload();
        })
        .catch(error => {
          errorToaster("failed", "");
        });
      }
      else
      errorToaster("please leave rating and review");
    },
    back(){
        this.$router.go(-1)
    },
    isHost(){
      return isHost();
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/bookings/${this.$route.params.id}`)
      .then(response => {
        this.booking = response.data;
        if(this.booking.rating)
        this.is_review = true
      })
      .catch(error => {
        errorToaster("Error while fetching bookings", "");
      });
  }
};
</script>

<style>
.booking-detail {
  text-align: start;
}

.booking-detail .product-head {
  padding: 10px;
  font-weight: 500;
}

.booking-detail .table th {
  width: 152px;
}

.booking-ship {
  height: 15rem;
}

.stars-outer {
  display: inline-block;
  position: relative;
  font-family: FontAwesome;
}

.stars-outer::before {
  content: "\f006 \f006 \f006 \f006 \f006";
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  color: #f8ce0b;
}
</style>
