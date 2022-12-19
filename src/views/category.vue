<script setup>
import { ref, onBeforeMount, computed } from "vue";

const categorys = ref([]);
const role = localStorage.getItem("role");

onBeforeMount(async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/categories`,{
    method: "GET",
    mode: "cors",
    headers: {
      // 'Authorization' : "Bearer " + localStorage.getItem('accesstoken'),
    }
  })
  if (res.status === 200) {
    categorys.value = await res.json();
    console.log(categorys.value);
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

  const ress = await fetch(`${import.meta.env.VITE_BASE_URL}api/categories`,{
    method: "GET",
    mode: "cors",
    headers: {
      'Authorization' : "Bearer " + localStorage.getItem('newrefreshtoken'),
    }
  })
  if (ress.status === 200) {
    categorys.value = await ress.json();
    console.log(categorys.value);
  } 
}
});


</script>

<template>
  <svg
    class="cat"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="Group_2"
    data-name="Group 2"
    width="1366"
    height="769"
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

  <div class="container" >
  <div class="row" >
    
    <div class="col-lg-2" v-for="(category, index) in categorys" :key="index">
      <div class="our-team" >
        <div class="picture">
          <img src="../assets/project-management.png" class="card__image" v-if="category.eventCategoryName === 'Project Management Clinic'" />
          <img src="../assets/infrastructure.png" class="card__image1" v-if="category.eventCategoryName === 'DevOps-Infra Clinic'" />
          <img src="../assets/database.png" class="card__image2" v-if="category.eventCategoryName === 'Database Clinic'" />
          <img src="../assets/client.png" class="card__image3" v-if="category.eventCategoryName === 'Client-side Clinic'" />
          <img src="../assets/backend.png" class="card__image4" v-if="category.eventCategoryName === 'Server-side Clinic'" />
        </div>
        <div class="team-content">
          <p class="minute">{{ category.eventDuration }} minute</p>
          <h3 class="name">{{ category.eventCategoryName }}</h3>
          <h4 class="title">{{ category.eventCategoryDescription }} <span
              v-if="category.eventCategoryDescription === null"
              class="nodescription"
            >
              No Description
            </span></h4>

        </div>
        <ul class="social">
          <router-link
          :to="{ name: 'editcategory', params: { categoryid: category.id } }"
          v-show="role === 'admin'">
          <img src="../assets/pencil.png" class="card__icon"/>
        </router-link>

        </ul>
      </div>
    </div>
      
  </div>
</div>

</template>

<style>
.cat {
  width: 160%;
  height: 125%;
  margin-left: -30%;
  position: fixed;
  transform: rotate(180deg) translate(0px, 0px) scale(0.9, 1);
  z-index: -1;
  margin-top: -19%;
}

.card__icon {
  width: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
}
.card__icon:hover{
  opacity: 0.2;
}


.minute{
  background: linear-gradient(to left, rgb(182, 73, 229) , rgb(86, 221, 245));
  color: #ffffff;
  padding: 2px 2px 2px 2px;
  border-radius: 20px;
  font-size: 10px;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  text-transform: uppercase;
}

.our-team {
  margin-top: -30%;
  padding: 30px 0 40px;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: #efefef; */
  /* background: linear-gradient(to left, rgb(233, 233, 233) , rgb(248, 248, 248)); */
  background-image: radial-gradient(rgb(255, 255, 255), rgb(245, 244, 244), rgb(220, 220, 220));
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius: 2%;
  height: 110%;
}

.our-team .picture {
  display: inline-block;
  height: 130px;
  width: 130px;
  margin-bottom: 40px;
  z-index: 1;
  position: relative;
}

.our-team .picture::before {
  content: "";
  width: 100%;
  height: 0;
  border-radius: 50%;
  /* background-color: #d28eef; */
  background: linear-gradient(to left, rgb(104, 14, 178) , rgb(54, 5, 133));
  position: absolute;
  bottom: 135%;
  right: 0;
  left: 0;
  opacity: 0.9;
  transform: scale(3);
  transition: all 0.3s linear 0s;
}

.our-team:hover .picture::before {
  height: 100%;
}

.our-team .picture::after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(to left, rgba(208, 208, 208, 0.178) , rgba(173, 173, 173, 0.137));
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.our-team .picture img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
}

.our-team:hover .picture img {
  box-shadow: 0 0 0 14px #f7f5ec;
  transform: scale(0.7);
}

.our-team .title {
  display: block;
  font-size: 11px;
  color: #0000008e;
  text-transform: capitalize;
  font-family: "Prompt", sans-serif;
  margin-top: 18px;
}

.our-team .name {
  display: block;
  font-size: 18px;
  color: #4e5052;
  text-transform: uppercase;
}


.our-team .social {
  width: 100%;
  padding: 0;
  margin: 0;
  /* background: linear-gradient(to left, rgb(104, 14, 178) , rgb(54, 5, 133)); */
  background-color: #fafafa;
  position: absolute;
  bottom: -100px;
  left: 0;
  transition: all 0.5s ease 0s;
}

.our-team:hover .social {
  bottom: 0;
}

.our-team .social li {
  display: inline-block;
}

.our-team .social li a {
  display: block;
  padding: 10px;
  font-size: 17px;
  color: white;
  transition: all 0.3s ease 0s;
  text-decoration: none;
}

.our-team .social li a:hover {
  color: #1369ce;
  background-color: #f7f5ec;
}

.col-lg-2{
  margin-left: 5.3%;
  margin-right: -45px;
}


</style>
