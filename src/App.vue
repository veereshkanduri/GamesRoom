<template>
  <div id="app" class="container">
    <main>
      <nav class="navbar navbar-expand-lg navbar-light bg-light" id="nav">
        <img alt="Vue logo" src="./assets/logo.png" width="50px">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/products" class="nav-link">All Products</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li> -->
            <li class="nav-item" v-if="isLogged()&&isHost()">
              <router-link to="/my_listings" class="nav-link">My Listings</router-link>
            </li>
            <li class="nav-item" v-if="isLogged()&&isHost()">
              <router-link to="/check_bookings" class="nav-link">Check Bookings</router-link>
            </li>
            <li class="nav-item" v-if="isLogged()&&!isHost()">
              <router-link to="/find_listings" class="nav-link">Find Listings</router-link>
            </li>
            <li class="nav-item" v-if="isLogged()&&!isHost()">
              <router-link to="/current_bookings" class="nav-link">Current Bookings</router-link>
            </li>
            <li class="nav-item" v-if="isLogged()&&!isHost()">
              <router-link to="/previous_bookings" class="nav-link">Previous Bookings</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            
            <li class="nav-item dropdown" v-if="isLogged()">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Welcome {{this.loggedUser.firstName +' '+this.loggedUser.lastName}}</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                
                <router-link
                  to="/"
                  class="dropdown-item text-danger"
                  @click.native="loc_logout"
                >Logout</router-link>
              </div>
            </li>
            <li class="nav-item" v-if="!isLogged()">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view/>
    </main>

    <footer class="container-fluid footer text-left mt-3">
      <p class="mr-auto">
        Developed by:
        <strong>Veeresh Kanduri</strong>
      </p>
      <div style="float:right">
        <a href="mailto:vivek2veeresh@gmail.com" style="margin-right:10px">
          <i class="fa fa-envelope-open" aria-hidden="true" style="font-size:20px"></i>
        </a>
        <a href="https://facebook.com" target="_blank" style="margin-right:10px">
          <i class="fa fa-facebook" aria-hidden="true" style="font-size:20px"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" style="margin-right:10px">
          <i class="fa fa-linkedin" aria-hidden="true" style="font-size:20px"></i>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
import {
  isLoggedIn,
  isHost,
  getLoggedInUser
} from "./components/shared/service/authService";
export default {
  data() {
    return {
    };
  },
  computed: mapState(["loggedUser"]),
  mounted: function(){
    this.todo()
  },
  methods: {
    /* Initially loading the cart products from local storage */

    ...mapMutations(["ADD_LOGGED_USER"]),

    todo : function(){          
        this.intervalid1 = setInterval(function(){
            var date = new Date();
            var hour = date.getHours();
            var min = date.getMinutes();
            var second = date.getSeconds();
            if((hour==0)&&(min==0)&&(second==5))
              {
                console.log('time to clear!!!');
                axios.get(`${process.env.VUE_APP_BASE_URL}/listings_time_clear` )
                .then(response=>{
                    console.log('success');
                })
                .catch(error => {
                  console.log(error);
                });
              }
        }, 900); /// this function clear the available time of previous day
    },
    isLogged() {
      return isLoggedIn();
    },
    isHost(){
      return isHost();
    },
    loc_logout() {
      localStorage.removeItem("_auth");
      this.$router.push("/");
      location.reload();
    }
  },
  created() {

    const loggedUser = getLoggedInUser();

    this.ADD_LOGGED_USER(loggedUser);

    console.log(process.env.NODE_ENV);
    console.log(process.env.VUE_APP_BASE_URL);
  }
};
</script>


<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 15px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  background-color: #f5f5f5;
}

footer {
  background-color: #f2f2f2;
  padding: 25px;
}

.footer p,
.footer div {
  display: inline;
  vertical-align: top;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 28px;
}
.footer p {
  font-weight: bold;
}

* a {
  color: #42b983;
}

* .fa {
  font-size: 18px;
}

.buttonGreen-outline {
  width: 100%;
  color: #41b883;
  background-color: transparent;
  border-color: #41b883;
}
.buttonGreen-outline:hover {
  color: #ffffff;
  background-color: #41b883;
  border-color: #41b883;
}

.buttonGreen {
  color: #fff;
  background-color: #41b883;
}

.buttonGreen:hover {
  background-color: #42a97b;
}
</style>
