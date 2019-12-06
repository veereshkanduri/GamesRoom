<template>
  <div class="listing-details">
    <div class="container" style="margin-top:30px">
      <div class="row mb-3">
        <div class="col-sm-4">
          <div class="listing-image">
            <div class="view hm-zoom z-depth-2" style="cursor: pointer">
              <img
                v-bind:src="listing.pic1"
                v-bind:alt="listing.listingName"
                class="img-fluid rounded"
                style="height: 150px; width: 230px;margin: 5px"
              >
            </div>
            <div class="view hm-zoom z-depth-2" style="cursor: pointer">
              <img
                v-bind:src="listing.pic2"
                v-bind:alt="listing.listingName"
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
                  > ${{listing.price}} / hr</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Listing ZIP</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  > {{listing.address.zip}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Phone Number</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  >{{listing.phonenumber}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed" v-if="is_reivew">
                  <div>
                    <h6 class="my-0">Ratings</h6>
                  </div>
                  <span
                    class="text-muted"
                  ><star-rating v-model="listing.rating" v-if="is_reivew" :read-only="true" :star-size="20"></star-rating>
                  <star-rating :rating="0" v-if="!is_reivew" :read-only="true" :star-size="20"></star-rating></span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <button class="btn btn-primary" @click="back">Back</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="listing-detail">
            <h5 class="listing-head">Listing Details</h5>
            <table class="table" cellspacing="0" style="max-height: 28px">
              <tbody>
                <tr>
                  <th scope="row">Listing Name</th>
                  <td>{{listing.listingName}}</td>
                </tr>
                <tr>
                  <th scope="row">GameType</th>
                  <td>{{listing.gametype}}</td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>{{listing.description}}</td>
                </tr>
                <tr>
                  <th scope="row">Listing Address</th>
                  <td>{{listing.address.aptno}}, {{listing.address.street}}, {{listing.address.city}}, {{listing.address.state}}</td>
                </tr>                
                <tr>
                  <th scope="row">Available Information</th>
                  <td>
                      <div class="row" v-if="listing.av_info.mon.flag">
                        <div  style="margin-left:18px ">
                           Monday: {{listing.av_info.mon.from}}:00 to {{listing.av_info.mon.to}}:00
                        </div>
                      </div>
                      <div class="row" v-if="listing.av_info.tue.flag">
                        <div  style="margin-left:18px ">
                           Tuesday: {{listing.av_info.tue.from}}:00 to {{listing.av_info.tue.to}}:00
                        </div>
                      </div>
                      <div class="row" v-if="listing.av_info.wed.flag">
                        <div  style="margin-left:18px ">
                           Wednesday: {{listing.av_info.wed.from}}:00 to {{listing.av_info.wed.to}}:00
                        </div>
                      </div>
                      <div class="row" v-if="listing.av_info.thu.flag">
                        <div  style="margin-left:18px ">
                           Thursday: {{listing.av_info.thu.from}}:00 to {{listing.av_info.thu.to}}:00
                        </div>
                      </div>
                      <div class="row" v-if="listing.av_info.fri.flag">
                        <div  style="margin-left:18px ">
                           Friday: {{listing.av_info.fri.from}}:00 to {{listing.av_info.fri.to}}:00
                        </div>
                      </div>
                      <div class="row" v-if="listing.av_info.sat.flag">
                        <div  style="margin-left:18px ">
                           Saturday: {{listing.av_info.sat.from}}:00 to {{listing.av_info.sat.to}}:00
                        </div>
                      </div>
                      <div class="row" v-if="listing.av_info.sun.flag">
                        <div  style="margin-left:18px ">
                           Sunday: {{listing.av_info.sun.from}}:00 to {{listing.av_info.sun.to}}:00
                        </div>
                      </div>
                  </td>
                </tr>
                <tr v-if='is_reivew'>
                  <th scope="row">Recent Review</th>
                  <td>{{recent_review}}</td>
                </tr>                
                <tr>
                  <th scope="row">Host   Information</th>
                  <td>                    
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Name: {{listing.host.fullName}}
                        </div>
                      </div>
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Email: {{listing.host.email}}
                        </div>
                      </div>
                      <div class="row" >
                        <div  style="margin-left:18px ">
                               Phone Number: {{listing.host.phonenumber}}
                        </div>
                      </div>
                  </td>
                </tr> 
              </tbody>
            </table>
          </div>
          <div class="forbooking" v-if="!isHost()">
            <div class=row>
              <div class="form-control">
                Please book for your game ( you can book place 7 days ahead of today)
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col-md-6">
                Date: 
                <input type="date" v-bind:max="maxdate" v-bind:min="mindate" v-on:change="change_date()" v-model="date">

              </div>
              <div class="col-md-6">
                Available time : {{available_time}}
              </div>
            </div>
            <br>
            <div class="row" v-if="is_time">
              <div class="col-md-6">
                Time 
                from: <input type="number" min="0" max="24" style="width:50px" v-on:change="change_time()" v-model="from_time" >
                to: <input type="number" min="0" max="24"  style="width:50px"  v-on:change="change_time()" v-model="to_time" >

              </div>
              <div class="col-md-6" v-if="!is_av">
                {{warning}}
              </div>
              <div class="col-md-6" v-if="is_av">
                <button class="btn btn-success" v-on:click="next_click" >Next</button>
              </div>
            </div>
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
import { successToaster, errorToaster } from "../../components/shared/service/ErrorHandler.js";
import {
  isHost, decryptUser,
} from "../../components/shared/service/authService";
import StarRating from 'vue-star-rating'

export default {
  name: "listingDetail",
  components: { CardTemplate, StarRating },
  data() {
    return {
      recent_review:"",
      is_reivew:false,
      is_av:false,
      is_time:false,
      warning:"",
      from_time:0,
      to_time:0,
      mindate:Date,
      maxdate:Date,
      date:Date,
      available_time:"",
      seleted_weekday:Number,
      listing: {
        address: {
            aptno: String,
            street: String,
            city: String,
            state: String,
            zip:String,
        },
        host:{
          fullName:"",
        },
        av_info: {
          mon:{
            flag:"",
            from:"",
            to:"",
          },
          tue:{
            flag:"",
            from:"",
            to:"",
          },
          wed:{
            flag:"",
            from:"",
            to:"",
          },
          thu:{
            flag:"",
            from:"",
            to:"",
          },
          fri:{
            flag:"",
            from:"",
            to:"",
          },
          sat:{
            flag:"",
            from:"",
            to:"",
          },
          sun:{
            flag:"",
            from:"",
            to:"",
          }
        }
      },
      // similarProduct: []
    };
  },
  methods: {
    next_click(){
      // alert('checkout passed');
      this.listing.guest = decryptUser();
      this.listing.date = this.date;
      this.listing.time_from = Number(this.from_time);
      this.listing.time_to = Number(this.to_time);
      this.listing.total_price = (Number(this.to_time)-Number(this.from_time))*this.listing.price;
      this.listing.weekday = this.selected_weekday;      
      if(confirm("Are you sure?"))
      axios
          .post(`${process.env.VUE_APP_BASE_URL}/bookings`, this.listing)
          .then(response => {
            
              successToaster(
                "Creation success",
                "successfully created"
              );
              // location.reload();
              this.$router.push(this.$route.query.from || "/current_bookings");  
          })
          .catch(error => {
            errorToaster(
              "Creation Failed",
              "Please try again after sometime"
            );
          });
    },
    change_time(){      
      if(Number(this.from_time)<Number(this.to_time))
      {
        switch(this.selected_weekday){
          case 0:
            {
              for(var i=0; i < this.listing.av_info.sun.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.sun.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.sun.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;//it will be need in backend
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          case 1:
            {
              for(var i=0; i < this.listing.av_info.mon.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.mon.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.mon.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          case 2:
            {
              for(var i=0; i < this.listing.av_info.tue.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.tue.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.tue.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          case 3:
            {
              for(var i=0; i < this.listing.av_info.wed.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.wed.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.wed.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          case 4:
            {
              for(var i=0; i < this.listing.av_info.thu.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.thu.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.thu.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          case 5:
            {
              for(var i=0; i < this.listing.av_info.fri.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.fri.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.fri.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          case 6:
            {
              for(var i=0; i < this.listing.av_info.sat.av_time.length; i++)
              {
                if((Number(this.from_time)>=this.listing.av_info.sat.av_time[i].from)&&(Number(this.to_time)<=this.listing.av_info.sat.av_time[i].to))
                {
                  this.is_av = true;
                  this.listing.is_av = i;
                  this.warning = "";
                  break;
                }
                else
                {
                  this.is_av = false;
                  this.warning = "Please reselect the time, it is not available.";
                }
              }
              break;
            }
          
        }
      }
      else
      {
        this.warning = "Please reselect the time, it is not available.";          
        this.is_av = false;
      }
    },
    change_date(){
      var date = new Date(this.date);
      this.selected_weekday = (date.getDay()+1)%7;
      console.log(this.selected_weekday);
      switch(this.selected_weekday){
        case 0:
          { 
            this.available_time = "";
            if(this.listing.av_info.sun.flag&&this.listing.av_info.sun.av_time.length)
              for(var i=0; i < this.listing.av_info.sun.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.sun.av_time[i].from + ':00 to ' + this.listing.av_info.sun.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
        case 1:
          {
            this.available_time = "";
            if(this.listing.av_info.mon.flag&&this.listing.av_info.mon.av_time.length)
              for(var i=0; i< this.listing.av_info.mon.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.mon.av_time[i].from + ':00 to ' + this.listing.av_info.mon.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
        case 2:
          {
            this.available_time = "";
            if(this.listing.av_info.tue.flag&&this.listing.av_info.tue.av_time.length)
              for(var i=0; i< this.listing.av_info.tue.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.tue.av_time[i].from + ':00 to ' + this.listing.av_info.tue.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
        case 3:
          {
            this.available_time = "";
            if(this.listing.av_info.wed.flag&&this.listing.av_info.wed.av_time.length)
              for(var i=0; i< this.listing.av_info.wed.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.wed.av_time[i].from + ':00 to ' + this.listing.av_info.wed.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
        case 4:
          {
            this.available_time = "";
            if(this.listing.av_info.thu.flag&&this.listing.av_info.thu.av_time.length)
              for(var i=0; i< this.listing.av_info.thu.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.thu.av_time[i].from + ':00 to ' + this.listing.av_info.thu.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
        case 5:
          {
            this.available_time = "";
            if(this.listing.av_info.fri.flag&&this.listing.av_info.fri.av_time.length)
              for(var i=0; i< this.listing.av_info.fri.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.fri.av_time[i].from + ':00 to ' + this.listing.av_info.fri.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
        case 6:
          {
            this.available_time = "";
            if(this.listing.av_info.sat.flag&&this.listing.av_info.sat.av_time.length)
              for(var i=0; i< this.listing.av_info.sat.av_time.length; i++)
                {
                  this.available_time += this.listing.av_info.sat.av_time[i].from + ':00 to ' + this.listing.av_info.sat.av_time[i].to + ':00';
                  this.available_time +=", ";
                  this.is_time = true;
                }
            else
            {
              this.available_time = "Excuse, on that day, it is not available";              
              this.is_time = false;
            }
            break;
          }
      }
      // alert(date.getDay());
    },
    back(){
      this.$router.go(-1);
    },
    isHost(){
      return isHost();
    },
    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  },
  created() {
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    if(m<10)
      m = "0"+m;
    this.mindate= y+"-"+m+"-"+d;
    var max = this.addDays(this.mindate, 6);
    y = max.getFullYear();
    m = max.getMonth() + 1;
    d = max.getDate();
    if(m<10)
      m = "0"+m;
    this.maxdate = y+"-"+m+"-0"+d;
    axios
      .get(`${process.env.VUE_APP_BASE_URL}/listings/${this.$route.params.id}`)
      .then(response => {
        this.listing = response.data;
        if(this.listing.rating)
        {
          this.is_reivew =true;
          this.recent_review = '\"'+response.data.review[response.data.review.length-1]+'\"';
        }

        // Getting Similar Product
        // this.getSimilarProduct(this.product.productSeller);
      })
      .catch(error => {
        errorToaster("Error while fetching listings", "");
      });
  }
};
</script>

<style>
.listing-detail {
  text-align: start;
}

.listing-detail .product-head {
  padding: 10px;
  font-weight: 500;
}

.listing-detail .table th {
  width: 152px;
}

.listing-ship {
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
