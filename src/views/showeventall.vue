<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, computed } from "vue";
import Swal from "sweetalert2";
import moment from "moment";



const events = ref([]);

onBeforeMount(async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/events`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    }
  })
  if (res.status === 200) {
    events.value = await res.json();
    console.log(events.value);
  } 
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

  const ress = await fetch(`${import.meta.env.VITE_BASE_URL}api/events`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    }
  })
  if (ress.status === 200) {
    events.value = await ress.json();
    console.log(events.value);
  } 
}
});


//delete event
const deleteevent = async (deleteeventid) => {
  if (confirm("You want to delete") == true) {
    const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}api/events/${deleteeventid}`,
      {
        method: "DELETE",
        headers: {
        'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    }
      }
    );
    if (res.status === 200) {
      Swal.fire("Delete!!!", `You delete event success`, "success");
      setTimeout(function () {
        events.value = events.value.filter((e) => e.id !== deleteeventid);
      }, 1000);
      console.log("delete success");
    } else console.log("cannot delete");
  

   //  การเรียกใช้เมื่อ accesstoken นั้นหมดอายุ >>> เรียก refresh มาใหม่เพื่อสามารถดูข้อมูลได้ต่อ
   if (res.status === 401) {
  const ress = await fetch(  `${import.meta.env.VITE_BASE_URL}api/events/${deleteeventid}`,
      {
        method: "DELETE",
        headers: {
        'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    }
  });
if (ress.status === 200) {
  Swal.fire("Delete!!!", `You delete event success`, "success");
      setTimeout(function () {
        events.value = events.value.filter((e) => e.id !== deleteeventid);
      }, 1000);
      console.log("delete success");
    } else console.log("cannot delete");
  }}

  const resfile = await fetch(
    `${import.meta.env.VITE_BASE_URL}api/files/${deleteeventid}`,
      {
        method: "DELETE",
        headers: {
        'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    }
      }
    );
    if (resfile.status === 200) {
      console.log("delete file success");
    }
    if (resfile.status === 401) {
      const resfile = await fetch(
    `${import.meta.env.VITE_BASE_URL}api/files/${deleteeventid}`,
      {
        method: "DELETE",
        headers: {
        'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    }
      }
    );
    if (resfile.status === 200) {
      console.log("delete file success");
    }
    }
};

// const token = localStorage.getItem("accesstoken")
// const Emaildecode = parseJwt(token).sub;
const role = localStorage.getItem("role");
const search = ref("");

// const filteremail = computed(() => {
//     return events.value.filter((sf) => sf.eventEmail.includes(Emaildecode));
//   })

  const filsearch = computed(() => {
  return events.value.filter((sf) => sf.bookingName.includes(search.value));
});

// function parseJwt(token) {
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }


</script>

<template>
  <svg
    id="home"
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
    <div class="row">
      <div class="clinic">
        <div class="showtotal">
          <lord-icon
            src="https://cdn.lordicon.com/dxoycpzg.json"
            trigger="loop"
            delay="2000"
            state="hover"
            colors="primary:#e8308c,secondary:#646e78,tertiary:#4bb3fd,quaternary:#d1e3fa,quinary:#f9c9c0"
            style="width: 40px; height: 40px"
          >
          </lord-icon>

          <p class="total" >
            <b>Total Event : {{ events.length }}</b>
          </p>
        </div>

        <div id="search">
          <input
            id="ins"
            placeholder="Search name do you want ?"
            v-model="search"
          />
          <img src="../assets/search.png" id="iconsearch" />
        </div>
        <br />

        <table>
          <tr v-show="role === 'admin' || role === 'student'">
            <th>Booking Name</th>
            <!-- <th>Email</th> -->
            <th>CategoryName</th>
            <th>Date</th>
            <th>StartTime</th>
            <th>
              Duration <br />
              <span style="font-size: 10px">( minute )</span>
            </th>
            <th id="editcolumn">Edit</th>
            <th id="deletecolumn">Delete</th>
            <th id="detailcolumn">Detail</th>
          </tr>

          <tr v-show="role === 'lecturer'">
            <th>Booking Name</th>
            <!-- <th>Email</th> -->
            <th>CategoryName</th>
            <th>Date</th>
            <th>StartTime</th>
            <th>
              Duration <br />
              <span style="font-size: 10px">( minute )</span>
            </th>
            <th id="detailcolumn">Detail</th>
          </tr>

          <!-- show email student -->
          <tr v-for="(event, index) in filsearch" :key="index" v-show="role === 'student'">
            <td>{{ event.bookingName }}</td>
    
            <td>{{ event.eventCategoryID.eventCategoryName }}</td>

            <td>{{ moment(event.eventStartTime).format("DD MMM YYYY") }}</td>

            <td>
              {{ moment(event.eventStartTime).format("HH:mm") }}
            </td>

            <td>{{ event.eventDuration }}</td>

            <td>
              <router-link
                :to="{ name: 'editevent', params: { editid: event.id } }"
              >
                <img src="../assets/edit.png" id="info" />
              </router-link>
            </td>

            
            <td>
              <img
                src="../assets/delete.png"
                id="info"
                @click="deleteevent(event.id)"
              />
            </td>

            <td>
              <router-link
                :to="{ name: 'showeventwithid', params: { eventid: event.id } }"
              >
                <img src="../assets/information.png" id="infodetail" />
              </router-link>
            </td>
          </tr>

      <!-- show admin -->
      <tr v-for="(event, index) in filsearch" :key="index" v-show="role === 'admin'">
            <td>{{ event.bookingName }}</td>
    
            <td>{{ event.eventCategoryID.eventCategoryName }}</td>

            <td>{{ moment(event.eventStartTime).format("DD MMM YYYY") }}</td>

            <td>
              {{ moment(event.eventStartTime).format("HH:mm") }}
            </td>

            <td>{{ event.eventDuration }}</td>

            <td>
              <router-link
                :to="{ name: 'editevent', params: { editid: event.id } }"
              >
                <img src="../assets/edit.png" id="info" />
              </router-link>
            </td>
            <td>
              <img
                src="../assets/delete.png"
                id="info"
                @click="deleteevent(event.id)"
              />
            </td>

            <td>
              <router-link
                :to="{ name: 'showeventwithid', params: { eventid: event.id } }"
              >
                <img src="../assets/information.png" id="infodetail" />
              </router-link>
            </td>
          </tr>

          <!-- lecturer -->
          <tr v-for="(event, index) in filsearch" :key="index" v-show="role === 'lecturer'">
            <td>{{ event.bookingName }}</td>
    
            <td>{{ event.eventCategoryID.eventCategoryName }}</td>

            <td>{{ moment(event.eventStartTime).format("DD MMM YYYY") }}</td>

            <td>
              {{ moment(event.eventStartTime).format("HH:mm") }}
            </td>

            <td>{{ event.eventDuration }}</td>

      
            <td>
              <router-link
                :to="{ name: 'showeventwithid', params: { eventid: event.id } }"
              >
                <img src="../assets/information.png" id="infodetail" />
              </router-link>
            </td>
          </tr>

        </table>

        <div v-show="events.length === 0" class="noevent">
          No Scheduled Event
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap");

.noevent {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  margin-top: 70px;
  margin-bottom: 50px;
  opacity: 0.15;
}

#editcolumn {
  background-color: #d694f5;
  width: 6%;
}

#deletecolumn {
  background-color: #e283f5;
  width: 6%;
}

#detailcolumn {
  background-color: #e96dd4;
  width: 6%;
}

#home {
  position: fixed;
  top: 0;
  left: -30%;
  height: 115%;
  width: 160%;
  z-index: -1;
}

.container {
  margin-top: 15%;
  margin-bottom: 5%;
  font-family: "Montserrat", sans-serif;
}

.clinic {
  position: relative;
  z-index: 1;
  padding-top: 30px;
  padding-bottom: 50px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.394);
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
}

.clinic h4 {
  font-size: 45px;
  margin-bottom: 120px;
  padding-top: 20px;
  font-family: "Ubuntu", sans-serif;
}

table {
  border-collapse: collapse;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

th,
td {
  text-align: center;
  padding: 8px;
}

td {
  font-size: 12px;
  font-weight: bold;
  font-family: "Prompt", sans-serif;
  opacity: 0.8;
}

tr:nth-child(even) {
  background-color: #f4f4f4;
  color: #3c106e;
}

th {
  background-color: #7183e9;
  color: white;
  font-weight: 500;
}

.booking {
  background-color: rgb(52, 4, 108);
  color: #fff;
  width: 15%;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
  margin-top: 50px;
  margin-left: 40%;
  margin-right: 40%;
  padding-top: 10px;
  padding-bottom: 10px;
  opacity: 1;
  font-family: "Ubuntu", sans-serif;
}

.booking:hover {
  opacity: 0.8;
}

.booking:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}

#info {
  width: 30px;
  opacity: 1;
}

#info:hover {
  opacity: 0.5;
}

#info:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}

#infodetail {
  width: 23px;
  opacity: 1;
}

#infodetail:hover {
  opacity: 0.5;
}

#infodetail:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}

#logo {
  width: 50%;
  position: absolute;
  margin-top: -16%;
}

.showtotal {
  background-color: #000000;
  border-radius: 40px;
  width: 170px;
  height: 40px;
  margin-bottom: 20px;
  margin-top: 1px;
  margin-left: 1.5%;
  box-shadow: 0px 0px 15px rgb(184, 184, 184);
}
.total {
  margin-top: -27px;
  font-size: 12px;
  padding-left: 20px;
  color: #ffffff;
}
lord-icon {
  margin-left: 115px;
}

#search {
  background-color: #aeaeae46;
  padding: 10px 10px 10px 10px;
  width: 28%;
  border-radius: 30px;
  position: relative;
  margin-top: -60px;
  margin-left: 70%;
  margin-bottom: 10px;
}

#ins {
  background-color: #ffffff;
  width: 80%;
  border: none;
  text-align: center;
  border-radius: 30px;
  margin-left: 10px;
  color: #000000;
  outline: none;
  font-size: 12px;
  margin-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

#iconsearch {
  width: 30px;
}
</style>
