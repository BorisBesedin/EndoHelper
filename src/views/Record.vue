<template>
  <div class="record">
    <div class="record__menu">
      <button
        class="record__tab"
        v-for="procedure in procedures"
        :key="procedure.name"
        v-bind:class="[{ active: currentProcedure === procedure.name }]"
        v-on:click="currentProcedure = procedure.name"
      >
        {{ procedure.title }}
      </button>
    </div>
    <p class="record__file-link">
      Терминология: <a href="files/MST3_EE.pdf" target="_blank">МСТ 3.0</a>
    </p>

    <Passport
      v-bind:patient="patient"
      v-bind:doctor="doctor"
      @clear-doctor="clearDoctorInfo"
    />

    <component
      class="record__content"
      v-bind:is="currentComponent"
      v-bind:patient="patient"
      v-bind:doctor="doctor"
    ></component>
  </div>
</template>

<script>
import Gastroscopy from "../components/Gastroscopy";
import Colonoscopy from "../components/Colonoscopy";
import Bronchoscopy from "../components/Bronchoscopy";
import axios from 'axios';
import Passport from "../components/Passport";
export default {
  name: "Record",
  props: ['tab', 'isAuth'],
  components: {
    Gastroscopy,
    Colonoscopy,
    Bronchoscopy,
    Passport,
  },
  data() {
    return {
      procedures: [
        {
          name: "gastroscopy",
          title: "Гастроскопия",
        },
        {
          name: "colonoscopy",
          title: "Колоноскопия",
        },
        {
          name: "bronchoscopy",
          title: "Бронхоскопия",
        },
      ],
      currentProcedure: this.tab || "gastroscopy",
      descriprion: {},
      patient: {
        patient: "",
        birth: "",
        anestesia: "",
        endoscope: ""
      },
      doctor: {},
    };
  },
  computed: {
    currentComponent() {
      return this.currentProcedure.toLowerCase();
    },
  },
  mounted() {
    if (localStorage.patient) {
      this.patient = JSON.parse(localStorage.patient);
    }
    
    if (!this.isAuth) {
      this.$router.push('/login')
    }

    axios
      .get('https://endohelper.herokuapp.com/api/users')
      .then(res => {
        this.doctor = res
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    setTab(tab) {
      this.currentProcedure = tab;
    },
    clearDoctorInfo() {
      if (localStorage.patient) {
        localStorage.patient = "";
      }

      this.patient = {
        patient: "",
        birth: "",
        anestesia: "",
        endoscope: ""
      };
    },
  },
};
</script>

<style lang="scss">
.record__file-link {
  margin-top: 20px;
  color: #000000;
  font-size: 16px;
}
.record__menu {
  margin-top: 40px;
}
.record__tab {
  border: none;
  border-bottom: 4px solid transparent;
  background-color: #fff;
  padding: 10px;
  font-size: 18px;
  outline: none;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background-color: #7aafd37e;
  }

  &.active {
    border-color: #0a67a3;
    background-color: #65a6d1;
    color: #ffffff;
    transition: 0.3s ease-in-out;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
.record__content {
  margin-top: 40px;
}

.description__title {
  text-align: left;
  font-size: 18px;
  margin-bottom: 20px;
}
.description__normal-btn {
  margin-right: 10px;
}
.description {
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: 0 auto;
}

.description__buttons {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
