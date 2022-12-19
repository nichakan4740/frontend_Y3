<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount} from "vue";
import moment from "moment";
import Swal from "sweetalert2";
const role = localStorage.getItem("role");
const users = ref([]);

  onBeforeMount(async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/users`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    }
  })
  if (res.status === 200) {
    users.value = await res.json();
    console.log(users.value);
  } 
  if (res.status === 403) {
    Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: "You don't have access to this page",
  })
  setTimeout(function () {
    home();
      }, 1000); 

  }
  if (localStorage.getItem("accesstoken") === null) {
    Swal.fire(
  'You are not login?',
  'Please Login',
  'question'
)
close();
  }



  // ตัว refresh
  if (res.status === 401) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/refresh`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('refreshtoken'),
    }
  })
  const rejwt = await res.json()
  localStorage.setItem('newrefreshtoken', rejwt.refreshtoken)

  const ress = await fetch(`${import.meta.env.VITE_BASE_URL}api/users`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    }
  })
  if (ress.status === 200) {
    users.value = await ress.json();
    console.log(users.value);
  } 
}
});



const deleteusers = async (deletusersid) => {
  if (confirm("You want to delete") == true) {
    const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}api/users/${deletusersid}`,
      {
        method: "DELETE",
        headers: {
      'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    }
      }
    );
    if (res.status === 200) {
      Swal.fire("Delete!!!", `You delete users success`, "success");
      setTimeout(function () {
        users.value = users.value.filter((u) => u.id !== deletusersid);
      }, 1000);
      console.log("delete success");
    } else console.log("cannot delete");
  
  if (res.status === 401) {
    const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}api/users/${deletusersid}`,
      {
        method: "DELETE",
        headers: {
      'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    }
      }
    )
    if (res.status === 200) {
      Swal.fire("Delete!!!", `You delete users success`, "success");
      setTimeout(function () {
        users.value = users.value.filter((u) => u.id !== deletusersid);
      }, 1000);
      console.log("delete success");
    } else console.log("cannot delete");
  }
}
}

const appRouter = useRouter();
const close = () => appRouter.push({ name: "login" });
const home = () => appRouter.push({ name: "home" });


</script>

<template>
  <svg
    id="home2"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    height="100%"
    width="100%"
    viewBox="0 0 1370.134 792"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1="1"
        y1="0.01"
        x2="0"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#a52eff" />
        <stop offset="1" stop-color="#3d58f3" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-2"
        x1="1"
        y1="0.01"
        x2="0"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#fff" stop-opacity="0.161" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-3"
        x1="1"
        y1="0.01"
        x2="0"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#fff" stop-opacity="0.2" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g id="Group_182" data-name="Group 182" transform="translate(0)">
      <path
        id="Path_152"
        data-name="Path 152"
        d="M1436,788s138.5-112.93,310-121.387,208.5,80.593,376,87.558S2281.5,638.754,2430,628.8s188.5,92.533,286,85.568,90-47.759,90-47.759V-4H1436Z"
        transform="translate(-1436 4)"
        fill="url(#linear-gradient)"
      />
      <path
        id="Path_196"
        data-name="Path 196"
        d="M-1436,44h316.021C-1102.053,249.709-834.214,278.539-986,346c-162,72-212,170-168,270,19.387,44.062,32.951,76.089,42.058,98.13-4.58.088-9.274.248-14.058.484C-1297.5,723.071-1436,836-1436,836Z"
        transform="translate(1436 -44)"
        fill="url(#linear-gradient-2)"
      />
      <path
        id="Path_197"
        data-name="Path 197"
        d="M-466,432.543c98-120-200-10-234-116-25.527-79.584,5.034-151.278,48.3-210h232.179c51.83,55.043,162.617,101.094,297.518,92,27.563-1.858,45.6,3.178,56,13.757v83.669c-35,95.453-144.1,243.066-218,360.574-28.631,45.528-59.231,63.959-88.053,63.953C-466.046,720.477-541,524.381-466,432.543Z"
        transform="translate(1436 -106.543)"
        fill="url(#linear-gradient-3)"
      />
      <circle
        id="Ellipse_68"
        data-name="Ellipse 68"
        cx="13.5"
        cy="13.5"
        r="13.5"
        transform="translate(483 556)"
        fill="#fff"
        opacity="0.2"
      />
      <circle
        id="Ellipse_69"
        data-name="Ellipse 69"
        cx="15.5"
        cy="15.5"
        r="15.5"
        transform="translate(322 45)"
        fill="#fff"
        opacity="0.2"
      />
      <circle
        id="Ellipse_70"
        data-name="Ellipse 70"
        cx="8"
        cy="8"
        r="8"
        transform="translate(1147 45)"
        fill="#fff"
        opacity="0.2"
      />
      <g
        id="Path_155"
        data-name="Path 155"
        transform="matrix(0.259, 0.966, -0.966, 0.259, 73.396, 351.263)"
        fill="none"
        opacity="0.2"
      >
        <path
          d="M25.7,12.271a12.26,12.26,0,0,1,21.289,0L66.734,46.817A12.26,12.26,0,0,1,56.089,65.159H16.608A12.26,12.26,0,0,1,5.964,46.817Z"
          stroke="none"
        />
        <path
          d="M 36.34889602661133 14.0933837890625 C 35.6055793762207 14.0933837890625 33.75717926025391 14.30253219604492 32.65016174316406 16.23984909057617 L 12.90961456298828 50.7857666015625 C 11.81108093261719 52.70821380615234 12.55358123779297 54.39961624145508 12.92381286621094 55.03758239746094 C 13.29404449462891 55.6755485534668 14.39419555664063 57.15940093994141 16.60836410522461 57.15940093994141 L 56.08943176269531 57.15940093994141 C 58.30359649658203 57.15940093994141 59.40374755859375 55.6755485534668 59.77397918701172 55.03758239746094 C 60.14419555664063 54.39961624145508 60.88671112060547 52.70823287963867 59.78816223144531 50.78578186035156 L 40.04764556884766 16.23984909057617 C 38.94059753417969 14.30253219604492 37.09221267700195 14.0933837890625 36.34889602661133 14.0933837890625 M 36.34889602661133 6.0933837890625 C 40.49459838867188 6.0933837890625 44.64030456542969 8.152500152587891 46.99357986450195 12.27073287963867 L 66.73411560058594 46.81666564941406 C 71.40454864501953 54.98991394042969 65.50296020507813 65.15940093994141 56.08943176269531 65.15940093994141 L 16.60836410522461 65.15940093994141 C 7.194831848144531 65.15940093994141 1.293243408203125 54.98991394042969 5.963661193847656 46.81666564941406 L 25.7042121887207 12.27073287963867 C 28.05748748779297 8.152500152587891 32.20319366455078 6.0933837890625 36.34889602661133 6.0933837890625 Z"
          stroke="none"
          fill="#fff"
        />
      </g>
      <path
        id="Path_195"
        data-name="Path 195"
        d="M-1412.5,47a23.348,23.348,0,0,1-16.617-6.883A23.345,23.345,0,0,1-1436,23.5a23.347,23.347,0,0,1,6.883-16.618A23.348,23.348,0,0,1-1412.5,0a23.348,23.348,0,0,1,16.617,6.883A23.347,23.347,0,0,1-1389,23.5a23.345,23.345,0,0,1-6.883,16.617A23.348,23.348,0,0,1-1412.5,47Zm0-40.286A16.805,16.805,0,0,0-1429.285,23.5,16.8,16.8,0,0,0-1412.5,40.286,16.8,16.8,0,0,0-1395.714,23.5,16.805,16.805,0,0,0-1412.5,6.714Z"
        transform="translate(2668.999 556)"
        fill="#fff"
        stroke="rgba(0,0,0,0)"
        stroke-width="1"
        opacity="0.2"
      />
    </g>
  </svg>

<div class="container">

  <router-link :to="{ name: 'adduser' }" v-show="role === 'admin'"
                    >
  <img src="../assets/add.png" class="rigister" ></router-link>

  <div class="movie" v-for="(users, index) in users" :key="index">
    <div class="movie__hero">
      <img src="../assets/admin.png" class="movie__img" v-if="users.role === 'admin'"/>
      <img src="../assets/student.png" class="movie__img" v-if="users.role === 'student'"/>
      <img src="../assets/woman.png" class="movie__img" v-if="users.role === 'lecturer'"/>
    </div>
    <div class="movie__content">
      <div class="movie__title">
        <h1 class="heading__primary">
          {{ users.name }}<i class="fas fa-fire"></i>
        </h1>
        <div class="movie__tag movie__tag--1" v-if="users.role === 'admin'">{{ users.role }}</div>
        <div class="movie__tag movie__tag--2" v-if="users.role === 'student'">{{ users.role }}</div>
        <div class="movie__tag movie__tag--3" v-if="users.role === 'lecturer'">{{ users.role }}</div>
      </div>
      <p class="movie__description">
        {{ users.email }}
      </p>

      <p class="movie__detail">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-clock"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
          />
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
          />
        </svg>&nbsp;
        <div class="created">CreatedOn</div> &nbsp;&nbsp;{{moment(users.createdOn).format('DD MMM YYYY , HH:mm')}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
</svg>&nbsp; <div class="updated">UpdatedOn</div> &nbsp;&nbsp;{{moment(users.updatedOn).format('DD MMM YYYY , HH:mm')}}
      </p>

      

<router-link
                :to="{ name: 'editusers', params: { usersid: users.id } }"
              >
                <div class="edituser">Edit</div>
              </router-link>

      <div
      class="deleteuser" @click="deleteusers(users.id)">
      Delete
    </div>

    </div></div>

  </div>

  
  <div v-show="users.length === 0">
  <img src="../assets/newbie.png" class="picnouser"><br>
          <p class="nouser">No User </p>
        </div>


</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

.picnouser{
  opacity: 1;
  width: 18%;
  margin-left: 40%;
  margin-top: 2%;
  animation-name: question;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}


@keyframes question {
  0% {
    transform: scale(1), rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: scale(1.1), rotate(0deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: scale(1);
  }
}

.nouser {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 40px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 50px;
  opacity: 0.12;
  color: #fff;
  /* text-transform: uppercase; */
}

.movie {
  width: 800px;
  /* height: 220px; */
  height: auto;
  border-radius: 60px;
  display: flex;
  box-shadow: 0 5px 20px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-left: 14%;
  margin-top: -5%;
  margin-bottom: 80px;
}

/* .movie:hover {
transform: scale(1.02);
border-color: #ffffff;

} */


.movie__hero {
  flex: 0 0 25%;
  background-color: #210140;
}

.movie__img {
  width: 70%;
  margin: 50px 10px 10px 32px;
  display: block;
}

.movie__content {
  background-color: #fff;
  flex: 1;
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
}

.movie__title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.heading__primary {
  font-size: 25px;
  font-weight: bolder;
  margin-right: auto;
  color: rgb(81, 7, 179);
  font-family: 'Prompt', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.movie__tag {
  font-size: 10px;
  color: #fff;
  padding: 2px 7px;
  border-radius: 100px;
  margin-right: 8px;
  display: block;
  text-transform: uppercase;
}

.movie__tag--1 {
  /* background-color: #7473b6; */
  width: 25%;
  font-size: 15px;
  margin-top: -10px;
  letter-spacing: 2px;
  text-align: center;
  background: linear-gradient(to left, rgb(63, 105, 221) , rgb(76, 174, 240));
}

.movie__tag--2 {
  /* background-color: #7473b6; */
  width: 25%;
  font-size: 15px;
  margin-top: -10px;
  letter-spacing: 2px;
  text-align: center;
  background: linear-gradient(to left, rgb(4, 168, 59) , rgb(124, 232, 118));
}

.movie__tag--3 {
  /* background-color: #7473b6; */
  width: 25%;
  font-size: 15px;
  margin-top: -10px;
  letter-spacing: 2px;
  text-align: center;
  background: linear-gradient(to left, rgb(233, 206, 2) , rgb(245, 131, 0));
}


.movie__description {
  font-size: 18px;
  margin-top: -15px;
  opacity: 0.5;
  margin-left: 4px;
  font-family: 'Muli', sans-serif;
}

.movie__detail {
  font-size: 13px;
  /* margin-right: 20px; */
  display: flex;
  align-items: center;
  font-family: 'Muli', sans-serif;
}

.created{
  background-color: #a9aedab0;
  color: #ffffff;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 1px;
  padding-bottom: 2px;
  /* opacity: 0.5; */
  font-size: 12px;
  text-align: center;
}

.updated{
  background-color: #96c4e2b4;
  color: #ffffff;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 1px;
  padding-bottom: 2px;
  /* opacity: 0.5; */
  font-size: 12px;
  text-align: center;
}

.deleteuser {
  background-color: rgb(52, 4, 108);
  color: #fff;
  width: 14%;
  text-align: center;
  border-radius: 50px;
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: "Ubuntu", sans-serif;
  opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin-top: -33px;
  margin-left: 83%;
}
.deleteuser:hover {
  opacity: 0.8;
}

.deleteuser:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}

.edituser {
  background-color: rgb(121, 1, 145);
  color: #fff;
  width: 12%;
  text-align: center;
  border-radius: 50px;
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: "Ubuntu", sans-serif;
  opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  margin-left: 69%;
  margin-top: 10px;
  text-decoration: none;
}
.edituser:hover {
  opacity: 0.8;
}

.edituser:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}

.edituser:link{
  text-decoration: none;
}

.edituser:visited{
  text-decoration: none;
}

.rigister{
  width: 7%;
  margin-left: 82%;
  margin-top: 33%;
  margin-bottom: 2%;
  position: fixed;
}

.rigister:hover{
  opacity: 0.5;
}

#home2 {
  position: fixed;
  top: 0;
  left: -30%;
  height: 115%;
  width: 160%;
  z-index: -2;
}


</style>
