<template>
    <div class="listings" style="margin-top:0px">
           <div class="row">
                <div class="col-md-4" 
                v-for="(item, index) in bookings_list" 
                :key="index">
                   <booking-card :item="item" />
                </div>
           </div>
    </div>
</template>


<script>
import axios from "axios";
import BookingCard from "../shared/BookingCard";
import {successToaster, errorToaster} from "../shared/service/ErrorHandler.js"
export default {
  name: "bookingslist",
  props: ["bookings_list"],
  components: { BookingCard },
  data() {
    return {
      
    };
  },
  methods: {
      },
  mounted() {}
};
</script>

<style>
.footerIcons {
  font-size: 95%;
}

.card {
  height: 620px;
}
.card-text {
  height: 20px;
  overflow: hidden;
}
</style>
