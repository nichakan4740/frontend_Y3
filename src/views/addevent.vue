<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import Createevent from "../components/createevent.vue";

const addsevent = async (
      Name,
      Email,
      Notes,
      duration,
      StartTimeISO,
      CategoryID,
      file
) => {

const formData = new FormData();
const newEvent = {
        "bookingName": Name,
        "eventEmail": Email,
        "eventNotes": Notes,
        "eventStartTime": StartTimeISO,
        "eventDuration": duration,
        "eventCategoryID": {
            "id": CategoryID
        }
  };
const blob = new Blob([JSON.stringify(newEvent)], { type: 'application/json' })
formData.append("event",blob);
formData.append("file",file);

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/events`
, {
    method: "POST",
    headers: {
      // "content-type": "application/json",
      'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    },
    body: formData
  });

  if (res.status === 200) {
    Swal.fire("DONE !!!", "You add event success!", "success");
    setTimeout(function () {
        close();
      }, 1500);
    console.log('You add event success');   
  }

  if (res.status === 401){
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/refresh`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('refreshtoken'),
    }
  })
  const rejwt = await res.json()
  localStorage.setItem('newrefreshtoken', rejwt.refreshtoken)

  const ress = await fetch(`${import.meta.env.VITE_BASE_URL}api/events`
, {
    method: "POST",
    headers: {
      // "content-type": "application/json",
      'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    },
    body: formData
  });

  if (ress.status === 200) {
    Swal.fire("DONE !!!", "You add event success!", "success");
    setTimeout(function () {
        close();
      }, 1500);
    console.log('You add event success');   
  } else {
    console.log("error,cannot add");
    Swal.fire({
      icon: "error",
      title: "Sorry !!!",
      text: "Cannot add Event!",
    });
  }

  }
};

const appRouter = useRouter();
const close = () => appRouter.push({ name: "showeventall" });


</script>

<template>
  <svg
    id="editsvg"
    data-name="Group 2"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1366 769"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1="1.193"
        y1="0.101"
        x2="-0.717"
        y2="1.389"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#a52eff" />
        <stop offset="0.498" stop-color="#6747f8" />
        <stop offset="0.647" stop-color="#6049f7" />
        <stop offset="0.863" stop-color="#4c51f4" />
        <stop offset="1" stop-color="#3d58f3" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-2"
        x1="1.171"
        y1="0.022"
        x2="0.189"
        y2="1.068"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#fff" stop-opacity="0.6" />
        <stop offset="0.686" stop-color="#fff" stop-opacity="0.051" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-3"
        x1="0.699"
        y1="0.078"
        x2="0.209"
        y2="1.476"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-4"
        x1="2.48"
        y1="-5.297"
        x2="0.032"
        y2="2.248"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-5"
        x1="2.465"
        y1="-4.879"
        x2="0.017"
        y2="2.068"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-6"
        x1="0"
        y1="0.5"
        x2="1"
        y2="0.5"
        xlink:href="#linear-gradient-2"
      />
    </defs>
    <path
      id="Path_2"
      data-name="Path 2"
      d="M825.493,769H1366V0H787.67c-34.018,19.44-80.6,54.269-112.17,112.5-46.16,85.132-57.327,214.893,2,262,67.775,53.815,176.03-41.145,240,6,71.738,52.87,78.814,222.855-4,323C887.855,734.511,856.568,755.2,825.493,769Z"
      fill="url(#linear-gradient)"
    />
    <path
      id="Path_3"
      data-name="Path 3"
      d="M1230,181c15.286,107.84,67.584,118.235,80,206,17.149,121.223-59.333,264.966-124,264-47.963-.716-26.671-130.619-132-228-77.4-71.562-197.516-104.326-228-70-5.268,5.932-7.568,13.54-7.932,22.159,36.815-9.023,72.151-14.765,99.432,5.341,51.19,37.726,69.442,135.081,45.617,224.144A994.57,994.57,0,0,1,1036,685c31.9,39.344,47.912,65.3,60.586,84H1366V0H1256.013C1222.947,44.995,1222.509,128.156,1230,181Z"
      opacity="0.3"
      fill="url(#linear-gradient-2)"
    />
    <path
      id="Path_4"
      data-name="Path 4"
      d="M354.425,250.868c3.09-22-44.15-65.247-90.1-79.993-13.042-4.185-88.4-28.369-114.082,36.36-5.543,13.973-16.084,46.978-5.814,60.6,9.575,12.7,56.678,9.7,122.8-13.333C336.936,230.228,352.533,264.342,354.425,250.868Z"
      opacity="0.14"
      fill="url(#linear-gradient-3)"
    />
    <path
      id="Path_5"
      data-name="Path 5"
      d="M302.5,640.5C188.141,626.27,61.9,670.114,0,718.08V769H568.728C482.868,728.31,422.313,655.409,302.5,640.5Z"
      fill="url(#linear-gradient-4)"
    />
    <path
      id="Path_6"
      data-name="Path 6"
      d="M0,675.837V755H523.728C437.868,714.31,377.313,641.409,257.5,626.5,166.35,615.158,67.651,640.71,0,675.837Z"
      opacity="0.19"
      fill="url(#linear-gradient-5)"
    />
    <circle
      id="Ellipse_1"
      data-name="Ellipse 1"
      cx="11.5"
      cy="11.5"
      r="11.5"
      transform="translate(1096 75)"
      fill="#fff"
      opacity="0.2"
    />
    <circle
      id="Ellipse_2"
      data-name="Ellipse 2"
      cx="3"
      cy="3"
      r="3"
      transform="translate(749 362)"
      fill="#fff"
      opacity="0.12"
    />
    <circle
      id="Ellipse_3"
      data-name="Ellipse 3"
      cx="8"
      cy="8"
      r="8"
      transform="translate(1118 404)"
      fill="#fff"
      opacity="0.2"
    />
    <circle
      id="Ellipse_4"
      data-name="Ellipse 4"
      cx="7"
      cy="7"
      r="7"
      transform="translate(775 35)"
      fill="#fff"
      opacity="0.13"
    />
    <path
      id="Path_7"
      data-name="Path 7"
      d="M816,287c27.106-49.532,13.91-119.492-20-138-25.707-14.031-48.9,9.377-72-6-22.227-14.8-19.04-48.639-19.675-73.317A271.263,271.263,0,0,0,675.5,112.5c-18.479,34.08-31.341,75.311-36.327,115.529A108.1,108.1,0,0,1,662,260c20.979,43.72,3.722,69.376,23,84C712.767,365.064,786.612,340.7,816,287Z"
      opacity="0.3"
      fill="url(#linear-gradient-6)"
    />
  </svg>

  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header border-bottom-0">
          <h2 class="modal-title"><b>Booking Event</b></h2>
        </div>
        <hr />
        <Createevent @createevent="addsevent" />
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");

#editsvg {
  position: fixed;
  top: 0;
  left: -20%;
  height: 115%;
  width: 137%;
  z-index: -1;
}

.modal-mask {
  position: absolute;
  margin-top: 120px;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
  z-index: 1;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 700px;
  margin: 0px auto;
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-header {
  margin-top: 0;
  color: #000000;
  font-size: 30px;
  font-family: "Ubuntu", sans-serif;
}
.modal-body {
  margin: 20px 0;
}
.modal-button {
  display: flex;
  justify-content: end;
}

.text {
  color: rgba(126, 126, 126, 0.616);
  margin-bottom: 7px;
  margin-top: -5px;
}

.addbooking {
  background-color: rgb(52, 4, 108);
  color: #fff;
  width: 23%;
  text-align: center;
  border-radius: 10px;
  font-size: 17px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: "Ubuntu", sans-serif;
  opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.addbooking:hover {
  opacity: 0.8;
}

.addbooking:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}

.clearbooking {
  background-color: rgb(121, 1, 145);
  color: #fff;
  width: 15%;
  text-align: center;
  border-radius: 10px;
  font-size: 17px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: "Ubuntu", sans-serif;
  opacity: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.clearbooking:hover {
  opacity: 0.8;
}

.clearbooking:active {
  transform: scale(0.9);
  transition: transform 0.05s;
}
</style>
