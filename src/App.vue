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
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("newrefreshtoken");
      setTimeout(function () {
      location.reload()
    }, 1000);
      close();
      Swal.fire("Logout !!!", "You Logout success.", "success");
      
    }
  });
};


const guest =()=>{
  Swal.fire({
    title: "You want to booking as guest ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "1E90FF",
    cancelButtonColor: "#8A2BE2",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
 if (result.isDismissed) {
      Swal.fire({ title: 'Please Sign-in before booking',})
    setTimeout(function () {
      signin();
    }, 500);
  }
  });
}


const appRouter = useRouter();
const close = () => appRouter.push({ name: "home" });
const signin = () => appRouter.push({ name: "login" });
</script>

<template>
  
  <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <a class="logo">
              <router-link :to="{ name: 'home' }"><img src="./assets/booking.png" alt="Softy Pinko" /></router-link>
            </a>

            <ul class="nav" v-show="role === null">
              <!-- <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li> -->

              <li>
                <a 
                  ><router-link :to="{ name: 'showcategory' }"
                    >Clinic</router-link
                  ></a
                >
              </li>

              <li>
                <a 
                  ><router-link :to="{ name: 'addevent' }"
                    @click="guest">Booking</router-link
                  ></a
                >
              </li>

              <li>
                <a class="active_signin"
                  ><router-link :to="{ name: 'login' }"
                  id="active_signin">Sign in</router-link
                  ></a
                >
              </li>

              <li>
                <a class="active_signup"
                  ><router-link :to="{ name: 'adduser' }"
                  id="active_signup">Sing up</router-link
                  ></a
                >
              </li>

              
            </ul>

            <!-- lecturer -->
            <ul class="nav" v-show="role === 'lecturer'">
              <!-- <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li> -->

              <li>
                <a 
                  ><router-link :to="{ name: 'showcategory' }"
                    >Clinic</router-link
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

              <li class="activesss">
                <a @click="deletetoken" id="active_logout_l">Logout</a>
              </li>
              
            </ul>
              
            <!-- admin -->
            <ul class="nav" v-show="role === 'admin'">
              <!-- <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li> -->

              <li>
                <a 
                  ><router-link :to="{ name: 'showcategory' }"
                    >Clinic</router-link
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

            <!-- student -->
            <ul class="nav" v-show="role === 'student'">
              <!-- <li>
                <a class="active"
                  ><router-link :to="{ name: 'home' }">Home</router-link></a
                >
              </li> -->

              <li>
                <a 
                  ><router-link :to="{ name: 'showcategory' }"
                    >Clinic</router-link
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

          <div class="username" v-show="role === 'student' || role === 'admin' || role === 'lecturer'" >

            <ul class="nav">
     
              <!-- <li class="movie__tag--name">
                  <a>{{username}}</a>
              </li> -->

              <li class="movie__tag--role">
                  <a  id="name">{{username}}</a>
                  🧿<a id="role">{{ role }}</a>🧿
              </li>
        
             </ul> 

            <!-- <h1 id="username">{{username}}</h1>
            <div class="movie__tagr movie__tag--role" >{{ role }}</div> -->
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

.active_signin{
  background-color: #d6cbfeb4;
  border-radius: 30px;
  padding-left: 18px;
  padding-right: 18px;
  margin-right: -30px;
}

#active_signin:hover {
  color: #7300ff;
  cursor: pointer;
}

#active_signup:hover {
  color: #0011fa;
  cursor: pointer;
}


.active_signup{
  background-color: #a8b9fdb4;
  border-radius: 30px;
  padding-left: 18px;
  padding-right: 18px;
  margin-right: -15px;
}

.actives {
  background-color: #32016e;
  border-radius: 30px;
  margin-left: 15px;
  width: 21%;

}

.activess {
  background-color: #32016e;
  border-radius: 30px;
  margin-left: 15px;
  width: 18%;

}

#active_logout:hover {
  color: #8800ff;
  cursor: pointer;
}

#active_logout {
  color: #ffffff;
  font-weight: 500;
}


.activesss {
  background-color: #32016e;
  border-radius: 30px;
  margin-left: 15px;
  width: 29.5%;

}
#active_logout_l:hover {
  color: #8800ff;
  cursor: pointer;
}

#active_logout_l {
  color: #ffffff;
  font-weight: 500;
}

.username{
  margin-top: -12%;
}

#username{
  color: #ffffff;
  font-weight: 500;
  /* text-align: end; */
  /* margin-left: 68%; */
  margin-left: 73%;
  font-family: 'Prompt', sans-serif;
}

.movie__tag--role {
  padding: 2px 7px;
  border-radius: 100px;
  margin-left: 2%;
  position: absolute;
  right: 90px;  
  background: linear-gradient(to left, rgb(25, 0, 255) , rgb(33, 100, 243));
  box-shadow: 0px 0px 5px rgb(255, 255, 255);
}

#role{
  font-size: 11px;
  color: rgb(255, 255, 255);
  padding: 2px 7px;
  text-align: center;
  letter-spacing: 3px;
  text-transform: uppercase;
}

#name{
  font-size: 10px;
  font-weight: 400;
  color: rgb(230, 230, 230);
  padding: 2px 7px;
  margin-right: 5px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: capitalize;
}

</style>
