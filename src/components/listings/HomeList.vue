<template>
    <div class="listings" style="margin-top:0px">
           <div class="row">
                <div class="col-md-3" 
                v-for="(item, index) in listings_list" 
                :key="index">
                   <card-template :item="item" />
                </div>
           </div>
    </div>
</template>


<script>
import axios from "axios";
import CardTemplate from "../shared/CardTemplate";
import EditListing from "./actions/EditListing"
import {successToaster, errorToaster} from "../shared/service/ErrorHandler.js"
import UpdatePic from "./actions/UpdatePic"
export default {
  name: "homelist",
  props: ["listings_list"],
  components: { CardTemplate, EditListing, UpdatePic },
  data() {
    return {
      
    };
  },
  methods: {
    //manadatory function called from cardTemplate while onClick 'edit'
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
