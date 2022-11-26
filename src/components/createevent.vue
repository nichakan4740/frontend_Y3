<script setup>
import { computed, ref, onBeforeMount } from "vue";
import moment from "moment";
import Swal from "sweetalert2";

 
defineEmits(["createevent"]);

const category = ref([]);

// get ค่าของตัว categories มาใส่ในตัวของการ add events
onBeforeMount(async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/categories`, {
    method: "GET",
    mode: "cors",
    headers: {
      // Authorization: "Bearer " + localStorage.getItem("accesstoken"),
    },
  });
  if (res.status === 200) {
    category.value = await res.json();
    console.log(category.value);
  }

  //  การเรียกใช้เมื่อ accesstoken นั้นหมดอายุ >>> เรียก refresh มาใหม่เพื่อสามารถดูข้อมูลได้ต่อ
  if (res.status === 401) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/refresh`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("refreshtoken"),
      },
    });
    const rejwt = await res.json();
    localStorage.setItem("newrefreshtoken", rejwt.refreshtoken);

    const ress = await fetch(`${import.meta.env.VITE_BASE_URL}api/categories`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("newrefreshtoken"),
      },
    });

    if (ress.status === 200) {
      category.value = await ress.json();
      console.log(category.value);
    }
  }
});

const token = localStorage.getItem("accesstoken");
const role = localStorage.getItem("role");
// const emailtoken = localStorage.getItem("email");

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const toISOStringWithTimezone = (date) => {
  const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
};

const StartTimeISO = computed(() => {
  // return new Date(StartTime.value).toISOString();
  return toISOStringWithTimezone(new Date(StartTime.value));
});

const Name = ref("");
const Email = ref("");
// const Emaildecode = parseJwt(token).sub;
const Emaildecode = computed(() => {
  return token == null ? "" : parseJwt(token).sub;
});
// const Emaildecode = emailtoken;
const CategoryID = ref("");
const Notes = ref();
const StartTime = ref("");

const Duration = computed(() => {
  if (CategoryID.value == "") {
    return null;
  } else {
    return category.value.filter((c) => c.id == CategoryID.value)[0]
      .eventDuration;
  }
});

const fileupload = ref();
const onFileChange = (e) => {
  fileupload.value = e.target.files[0];

  let Size = 10 * 1024 * 1024; //10MB
  if (e.target.files[0].size > Size) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'The file size cannot be larger than 10 MB !!!',
    })
    clearfile();
  }
};

const clearfile = () => {
  document.getElementById("fileinput").value = "";
  document.getElementById("fileinput1").value = "";
  fileupload.value = ''
};

const validation = () => {
  let email = document.getElementById("email").value;
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/;

  if (email.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
  }
  if (email == "") {
    form.classList.remove("valid");
    form.classList.remove("invalid");
  }
};

const cleartext = () => {
  (Name.value = ""),
    (Email.value = ""),
    (CategoryID.value = ""),
    (Notes.value = null),
    (StartTime.value = ""),
    (Duration.value = "");
  clearfile();
};

// const date = new Date();
// const today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
//   .toISOString()
//   .replace(/\..+/, "");

const today = computed(() => {
  var d = new Date(),
    dformat =
      [
        d.getFullYear(),
        (d.getMonth() + 1).padLeft(),
        d.getDate().padLeft(),
      ].join("-") +
      "T" +
      [d.getHours().padLeft(), d.getMinutes().padLeft()].join(":");
  return dformat;
});

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};
</script>

<template>
  <!-- admin / guest -->
  <div class="modal-body" v-show="role === 'admin' || role === null">
    <div class="bg-light p-3 rounded">
      <p class="text">
        Name &nbsp;
        <span style="font-size: 10px; color: rgb(177, 109, 241)">
          ( Characters must not exceed 100 )
        </span>
      </p>
      <input
        type="text"
        class="form-control"
        v-model.trim="Name"
        maxlength="100"
      />

      <div>
        <p v-if="Name.length" class="input-count" id="count">
          {{ Name.length }}/100
        </p>
      </div>

      <div>
        <p v-show="Name.length < 1" id="checkname">
          * Please input your name <span></span>
        </p>
        <p v-show="Name.length >= 100" id="checkname">
          * Characters must not exceed 100
        </p>
      </div>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">Email</p>
      <form action="#" id="form">
        <div class="input-box">
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Ex. kw2@kmutt.ac.th"
            v-on:keydown="validation"
            v-model.trim="Email"
          />
          <p v-show="Email < 1" id="checkname">* Please input your Email</p>
        </div>
      </form>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">CategoryName</p>
      <select class="form-select" v-model="CategoryID">
        <option v-for="cat in category" :value="cat.id">
          {{ cat.eventCategoryName }}
        </option>
      </select>
      <p v-show="CategoryID.length === 0" id="checkname">
        * Please select categoryname
      </p>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">Duration</p>
      <input v-model="Duration" class="form-control" disabled />
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">
        Notes &nbsp;
        <span style="font-size: 10px; color: rgb(177, 109, 241)"
          >( Characters must not exceed 500 )</span
        >
      </p>
      <textarea
        type="text"
        class="form-control"
        v-model.trim="Notes"
        Maxlength="500"
        rows="3"
      >
      </textarea>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">StartTimes</p>
      <input
        type="datetime-local"
        class="form-control"
        :min="today"
        v-model="StartTime"
      />
      <p v-show="StartTime.length === 0" id="checkname">
        * Please select a future time
      </p>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <label for="formFileSm" class="text"
        >Upload file &nbsp;
        <span style="font-size: 10px; color: rgb(177, 109, 241)"
          >( The file size cannot be larger than 10 MB. )</span
        ></label
      >

      <div class="input-group mb-3">
        <input
          type="file"
          class="form-control"
          id="fileinput"
          @change="onFileChange($event)"
        />
        <button class="input-group-text" @click="clearfile">Clear</button>
      </div>

    </div>
  </div>




  <!-- student -->
  <div class="modal-body" v-show="role === 'student'">
    <div class="bg-light p-3 rounded">
      <p class="text">
        Name &nbsp;
        <span style="font-size: 10px; color: rgb(177, 109, 241)">
          ( Characters must not exceed 100 )
        </span>
      </p>
      <input
        type="text"
        class="form-control"
        v-model.trim="Name"
        maxlength="100"
      />

      <div>
        <p v-if="Name.length" class="input-count" id="count">
          {{ Name.length }}/100
        </p>
      </div>

      <div>
        <p v-show="Name.length < 1" id="checkname">
          * Please input your name <span></span>
        </p>
        <p v-show="Name.length >= 100" id="checkname">
          * Characters must not exceed 100
        </p>
      </div>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">Email</p>
      <input v-model.trim="Emaildecode" class="form-control" disabled />
      <p v-show="Emaildecode < 1" id="checkname">* Please input your Email</p>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">CategoryName</p>
      <select class="form-select" v-model="CategoryID">
        <option v-for="cat in category" :value="cat.id">
          {{ cat.eventCategoryName }}
        </option>
      </select>
      <p v-show="CategoryID.length === 0" id="checkname">
        * Please select categoryname
      </p>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">Duration</p>
      <input v-model="Duration" class="form-control" disabled />
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">
        Notes &nbsp;
        <span style="font-size: 10px; color: rgb(177, 109, 241)"
          >( Characters must not exceed 500 )</span
        >
      </p>
      <textarea
        type="text"
        class="form-control"
        v-model.trim="Notes"
        Maxlength="500"
        rows="3"
      >
      </textarea>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <p class="text">StartTimes</p>
      <input
        type="datetime-local"
        class="form-control"
        :min="today"
        v-model="StartTime"
      />
      <p v-show="StartTime.length === 0" id="checkname">
        * Please select a future time
      </p>
    </div>
    <br />

    <div class="bg-light p-3 rounded">
      <label for="formFileSm" class="text"
        >Upload file &nbsp;
        <span style="font-size: 10px; color: rgb(177, 109, 241)"
          >( The file size cannot be larger than 10 MB. )</span
        ></label
      >

      <div class="input-group mb-3">
        <input
          type="file"
          class="form-control"
          id="fileinput1"
          @change="onFileChange($event)"
        />
        <button class="input-group-text" @click="clearfile">Clear</button>
      </div>
    </div>
  </div>

  <div class="modal-footer">
    <div class="clearbooking" @click="cleartext">Clear</div>
    &nbsp;

    <!-- save admin / guest -->
    <div
      v-show="role === 'admin' || role === null"
      class="addbooking"
      @click="
        $emit(
          'createevent',
          Name,
          Email,
          Notes,
          Duration,
          StartTimeISO,
          CategoryID,
          fileupload
        ),
          clearfile(),
          cleartext()
      "
    >
      Add Event
    </div>

    <!-- save student -->
    <div
      v-show="role === 'student'"
      class="addbooking"
      @click="
        $emit(
          'createevent',
          Name,
          Emaildecode,
          Notes,
          Duration,
          StartTimeISO,
          CategoryID,
          fileupload
        ),
          clearfile(),
          cleartext()
      "
    >
      Add Event
    </div>
  </div>
</template>

<style>
.modal-body {
  font-family: "Prompt", sans-serif;
}

.text-danger {
  font-family: "Ubuntu", sans-serif;
  opacity: 0.5;
  font-size: 12px;
}

#form {
  position: relative;
}

#form #email {
  width: 573px;
  height: 41px;
  background: #ffffff;
  outline: none;
  padding: 10px;
  border-radius: 4px;
  color: rgb(0, 0, 0);
  font-style: 18px;
  border-color: rgb(220, 220, 220);
}

#form .input-box {
  position: relative;
}

#form.invalid .input-box::before {
  content: "";
  position: absolute;
  right: 12px;
  top: 9px;
  width: 24px;
  height: 24px;
  background: url(https://fadzrinmadu.github.io/hosted-assets/email-validation-check-using-javascript/invalid.png);
  -webkit-background-size: cover;
  background-size: cover;
}

#form.valid .input-box::before {
  content: "";
  position: absolute;
  right: 12px;
  top: 9px;
  width: 24px;
  height: 24px;
  background: url(https://fadzrinmadu.github.io/hosted-assets/email-validation-check-using-javascript/valid.png);
  -webkit-background-size: cover;
  background-size: cover;
}

#checkname {
  color: rgb(192, 6, 6);
  font-family: "Prompt", sans-serif;
  font-weight: 700;
  font-size: 10px;
  width: 50%;
  border-radius: 120px;
  margin-top: 10px;
  margin-bottom: -5px;
}

#count {
  font-size: 10px;
  opacity: 0.5;
  margin-left: 95%;
  margin-top: 10px;
  margin-bottom: -5px;
}
</style>
