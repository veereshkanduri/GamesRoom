<template>
    <div class="listings" style="margin-top:0px">
           <div class="row">
                <div class="col-md-4" 
                v-for="(item, index) in listings_list" 
                :key="index">
                   <card-template :item="item" />
                </div>
           </div>
           <edit-listing ref="editListing" />
           <update-pic ref="updatepic" />
    </div>
</template>


<script>
import axios from "axios";
import CardTemplate from "../shared/CardTemplate";
import EditListing from "./actions/EditListing"
import {successToaster, errorToaster} from "../shared/service/ErrorHandler.js"
import UpdatePic from "./actions/UpdatePic"
export default {
  name: "listingslist",
  props: ["listings_list"],
  components: { CardTemplate, EditListing, UpdatePic },
  data() {
    return {
      
    };
  },
  methods: {
    //manadatory function called from cardTemplate while onClick 'edit'
    editListing(listing){
      // this.will pass the product to the editProduct to bind with Product Object
      this.$refs.editListing.setListing(listing);
    },
    updatepic(number, listing){
      this.$refs.updatepic.setupdatepic(number, listing);
    },
    deleteListing(id){
      if(confirm("Really?"))
      axios
          .delete(`${process.env.VUE_APP_BASE_URL}/listings/${id}`)
          .then(response => {
            location.reload();
          })
          .catch(error => {
            errorToaster("Deleting failed", "");
          });      
        }
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
