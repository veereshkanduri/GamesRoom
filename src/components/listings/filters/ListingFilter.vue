<template>
  <div class="listingFilter">
    <div id="prdfilter">
      <h4 class="d-flex mb-3">
        <span class="text-muted">Filters:</span>
      </h4>
      <div class="form-group">
        <label for="filterPrdCty">By GameType:</label>
        <select
          class="form-control"
          id="filterPrdCty"
          v-model="selectedGametype"
          @change="(event) => updateListingCategory()"
        >
          <option
            v-for="(category, index) in categories"
            :key="index"
            v-bind:value="category.gametype"
          >{{category.gametype}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="filterPrdSlr">By City:</label>
        <select
          class="form-control"
          id="filterPrdSlr"
          v-model="selectedCity"
          @change="(event) => updateListingCategory()"
        >
          <option
            v-for="(seller, index) in sellers"
            :key="index"
            v-bind:value="seller.city"
          >{{seller.city}}</option>
        </select>
      </div>
    </div>
    <create-listing ref="createListing"/>
  </div>
</template>

<script>
import CreateListing from "../actions/CreateListing";
import { mapState } from "vuex";
export default {
  name: "listingFilter",
  props: ["categories", "sellers"],
  components: { CreateListing },
  computed: mapState(["loggedUser"]),
  data() {
    return {
      selectedGametype: "All",
      selectedCity: "All",
      // showCreateListingModal: false
    };
  },
  methods: {
    // This method will trigger the parent Components (Prodcuts Component) function
    updateListingCategory() {
      this.$parent.filterListingBy(this.selectedGametype, this.selectedCity);
    },

    // This method will trigger the function in createListing Component
    // openCreateModal() {
    //   this.$refs.createListing.showModalForm();
    // }
  }
};
</script>

<style lang="scss">
.listingFilter {
  #prdfilter {
    text-align: start !important;
  }
}
</style>