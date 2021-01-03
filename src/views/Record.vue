<template>
  <div class="record">
    <div class="record__tabs">
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
    <!-- <p class="record__file-link">
            Терминология: <br> <a href="files/MST3_EE.pdf" target="_blank">МСТ 3.0</a>
          </p>           -->

    <div class="record__section">
      <Passport
        class="record__passport"
        v-bind:patient="patient"
        @clear-doctor="clearPatient"
      />
      <component
        class="record__content"
        v-bind:is="currentComponent"
        v-bind:patient="patient"
        v-bind:doctor="doctor"
        @add-template="addTemplate"
        @create-protocol="createProtocol"
      ></component>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../src/axios.conf";
import Gastroscopy from "../components/Gastroscopy";
import Colonoscopy from "../components/Colonoscopy";
import Bronchoscopy from "../components/Bronchoscopy";
import Passport from "../components/Passport";
export default {
  name: "Record",
  props: ["tab", "isAuth"],
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
      patient: {
        patient: "",
        birth: "",
        complains: "",
        anamnesis: "",
        anestesia: "",
        endoscope: "",
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

    HTTP.get("users")
      .then((res) => {
        this.doctor = res.data;
        console.log(this.doctor)
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    setTab(tab) {
      this.currentProcedure = tab;
    },
    clearPatient() {
      if (localStorage.patient) {
        localStorage.patient = "";
      }

      this.patient = {
        patient: "",
        birth: "",
        complains: "",
        anamnesis: "",
        anestesia: "",
        endoscope: "",
      };
    },
  },
  watch: {
    isAuth() {
      if(!this.isAuth) {
        this.$router.push('/login')
      }
    }
  },
};
</script>

<style lang="scss">
.record {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto;
}

.title {
  margin-top: 40px;
}

.record__passport {
  width: 700px;
  margin-top: 80px;
}

.record__section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 1px 4px 0 #666666;


  &:last-child {
    flex-grow: 1;
  }
}

.record__file-link {
  margin-top: 20px;
  color: #000000;
  font-size: 16px;
}

.menu__title {
  padding: 20px;
  font-family: inherit;
  font-weight: normal;
  font-size: 20px;
  text-align: left;
  color: #ffffff;

  background-color: #03416a;
}

.record__tabs {
  display: flex;
  margin-top: 40px;
}
.record__tab {
  width: 160px;
  padding: 10px;

  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: none;
  outline: none;
  transform: scale(0.98);
  color: #2c3e50;
  font-family: inherit;
  background-color: #e2e2e2;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #88badb;
    transition: 0.3s ease-in-out;
  }

  &.active {
    border-color: #0a67a3;
    background-color: #65a6d1;
    color: #ffffff;
    transition: 0.3s ease-in-out;
    transform: scale(1.02);
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
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description__buttons {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
