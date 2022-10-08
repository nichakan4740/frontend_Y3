<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { ref ,onBeforeMount} from "vue";

const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

const deletetoken = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to Logout !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "1E90FF",
    cancelButtonColor: "#8A2BE2",
    confirmButtonText: "Yes, Logout !",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("newrefreshtoken");
      setTimeout(function () {
      location.reload()
    }, 100);
      close();
      Swal.fire("Logout !!!", "You Logout success.", "success");
      
    }
  });
};


const appRouter = useRouter();
const close = () => appRouter.push({ name: "home" });
</script>

<template>
  <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <a class="logo">
              <img src="./assets/booking.png" alt="Softy Pinko" />
            </a>

            <ul class="nav" v-show="role === null">
              <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li>

              <li>
                <a
                  ><router-link :to="{ name: 'login' }"
                    >Login</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'adduser' }"
                    >Sing up</router-link
                  ></a
                >
              </li>

              
            </ul>
              
            <ul class="nav" v-show="role === 'admin'">
              <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'showcategory' }"
                    >Category</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'showeventall' }"
                    >Event All</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'addevent' }"
                    >Booking</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'showusers' }"
                    >User List</router-link
                  ></a
                >
              </li>

              <li class="activess">
                <a @click="deletetoken" id="active_logout">Logout</a>
              </li>
              
            </ul>

            <ul class="nav" v-show="role === 'student'">
              <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'showcategory' }"
                    >Category</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'showeventall' }"
                    >Event All</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'addevent' }"
                    >Booking</router-link
                  ></a
                >
              </li>


              <li class="actives">
                <a @click="deletetoken" id="active_logout">Logout</a>
              </li>
              
            </ul>
          </nav>

          <div class="username" v-show="role === 'student' || role === 'admin'">
            <h1 id="username">username : {{username}}</h1>
            <div class="movie__tagr movie__tag--role" >{{ role }}</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap");

.header-area {
  position: fixed;
  top: -150px;
  left: 0px;
  right: 0px;
  z-index: 100;
  height: 100px;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.header-area .main-nav {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
  min-height: 80px;
  background: rgb(250, 250, 250);
}

.header-area .main-nav .logo img {
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  margin-top: 16px;
  margin-left: 30px;
  width: 20%;
}

.header-area .main-nav .nav {
  float: right;
  margin-top: 27px;
  margin-left: 0px;
  margin-right: 30px;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  position: relative;
  z-index: 999;
}

.header-area .main-nav .nav li {
  padding-left: 25px;
  padding-right: 25px;
}

.header-area .main-nav .nav li:last-child {
  padding-right: 50px;
}

.header-area .main-nav .nav li a {
  display: block;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  height: 40px;
  line-height: 40px;
  border: transparent;
  letter-spacing: 1px;
  text-decoration: none;
  opacity: 0.9;
}

.header-area .main-nav .nav li a:hover {
  color: #ff589e;
}

.header-area.header-sticky .nav {
  margin-top: 20px !important;
}

.header-area.header-sticky .nav li a {
  color: #1e1e1e;
}

.active {
  background-color: #dddde0b4;
  border-radius: 30px;
  padding-left: 18px;
  padding-right: 18px;
  margin-right: -15px;
}

.actives {
  background-color: #32016e;
  border-radius: 30px;
  margin-left: 15px;
  width: 17%;

}

.activess {
  background-color: #32016e;
  border-radius: 30px;
  margin-left: 15px;
  width: 14.3%;

}

#active_logout:hover {
  color: #8800ff;
  cursor: pointer;
}

#active_logout {
  color: #ffffff;
  font-weight: 500;
}

.username{
  margin-top: -9.5%;
}

#username{
  color: #ffffff;
  font-weight: 400;
  font-size: 15px;
  /* text-align: end; */
  margin-left: 78%;
}

.movie__tag--role {
  width: 8%;
  letter-spacing: 2px;
  text-align: center;
  background: linear-gradient(to left, rgb(25, 0, 255) , rgb(33, 100, 243));
  box-shadow: 0px 0px 5px rgb(255, 255, 255);
}

.movie__tagr {
  font-size: 11px;
  color: rgb(255, 255, 255);
  padding: 2px 7px;
  border-radius: 100px;
  margin-right: 8px;
  display: block;
  text-transform: uppercase;
  margin-top: -27px;
  margin-left: 88%;
}

</style>
