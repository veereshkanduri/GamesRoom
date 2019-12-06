<template>
  <div class="create-account">
    <form class="form-signup" @submit.prevent="createAccount">
      <img class="mb-4" src="../assets/create-account.svg" alt width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Create an account</h1>
      <div
        class="alert alert-danger"
        role="alert"
        v-for="(error, index) in errorMessage"
        :key="index"
      >{{error}}</div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            id="firstName"
            placeholder="First Name"
            v-model="user.firstName"
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="user.lastName"
            id="lastName"
            placeholder="Last Name"
            value
            required
          >
          <div class="invalid-feedback">Valid last name is required.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md mb-3">
          <input
            type="text"
            class="form-control"
            v-model="user.email"
            id="emailId"
            placeholder="Email address"
            value
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md mb-3">
          <input
            type="password"
            class="form-control"
            id="act-password"
            placeholder="New password"
            value
            v-model="user.password"
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md mb-3">
          <input
            type="password"
            class="form-control"
            id="act-password"
            placeholder="Confirm password"
            value
            v-model="user.repassword"
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-1">
          <input
            type="text"
            class="form-control"
            id="act-aptno"
            placeholder="Apt NO"
            value
            v-model="user.aptno"
            required
          >
        </div>
        <div class="col-md-4 mb-1">
          <input
            type="text"
            class="form-control"
            id="act-street"
            placeholder="Street Name"
            value
            v-model="user.street"
            required
          >
        </div>
        <div class="col-md-4 mb-1">
          <input
            type="text"
            class="form-control"
            id="act-city"
            placeholder="City Name"
            value
            v-model="user.city"
            required
          >
        </div>
        </div>
        <div class="row">
        <div class="col-md-6 mb-1">
          <input
            type="text"
            class="form-control"
            id="act-state"
            placeholder="State Name"
            value
            v-model="user.state"
            required
          >
        </div>
        <div class="col-md-6 mb-1">
          <input
            type="number"
            class="form-control"
            id="act-zip"
            placeholder="ZIP code"
            value
            v-model="user.zip"
            required
          >
        </div>
      </div>
      <div class="row">
        <div class="col-md mb-3">
          <input
            type="text"
            class="form-control"
            id="act-phonenumber"
            placeholder="Phone Number"
            value
            v-model="user.phonenumber"
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <h3 class="h3 mb-3 font-weight-normal" style="font-size:20px">Please select the user type</h3>
          <select
            class="form-control"
            id="user_type"
            v-model="user.usertype"
          >
            <option
              v-for="(category, index) in categories"
              :key="index"
              v-bind:value="category"
            >{{category}}</option>
          </select>
      <br>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        <i class="fa fa-spinner fa-spin mr-1" v-if="showLoader"></i>Sign Up
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import toastr from 'toastr';
import { successToaster, errorToaster } from "./shared/service/ErrorHandler.js";
export default {
  name: "CreateAccount",
  data() {
    return {
      showLoader: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        aptno:"",
        street:"",
        city:"",
        state:"",
        zip:"",
        phonenumber:"",
        usertype: "Guest",
      },    
      categories:['Guest', 'Host'],
      errorMessage: []
    };
  },
  methods: {
    createAccount(e) {
      this.showLoader = true;
      this.errorMessage = [];

      if (this.user.firstName.length < 3) {
        this.errorMessage.push(
          "FirstName should contains more than 3 character"
        );
      }
      if (this.user.password != this.user.repassword){
        this.errorMessage.push(
          "Password not matching"
        );
      }
      if (this.ValidateEmail(this.user.email) === false) {
        this.errorMessage.push("Please provide a valid Email address");
      }
      if (this.errorMessage.length === 0) {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/users`, this.user)
          .then(response => {
            this.showLoader = false;
            if(response.data=="this is already created")
            errorToaster(
              "Registeration Failed",
              "This is already created"
            );
            else
            {successToaster(
              "Registeration success",
              "successfully created"
            );
            location.reload();
            }
          })
          .catch(error => {
            errorToaster(
              "Registeration Failed",
              "Please try again after sometime"
            );
          });
      }
    },

    ValidateEmail(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
.form-signup {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: auto;
}
</style>
